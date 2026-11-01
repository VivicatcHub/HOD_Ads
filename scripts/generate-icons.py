#!/usr/bin/env python3
"""Derive every icon a web app ships from one source logo.

    python3 scripts/generate-icons.py > /tmp/splash-links.html
    python3 scripts/generate-icons.py --palette       # print brand colours only

Needs Pillow (pip install pillow). Writes into --out:

    favicon.ico (16/32/48), favicon-16x16.png, favicon-32x32.png   browser tab
    apple-touch-icon.png (180, opaque)                             iOS home screen
    icon-192.png, icon-512.png (transparent, purpose "any")        PWA / Android
    icon-maskable-192.png, icon-maskable-512.png (opaque, 70%)     Android adaptive
    logo-128.png                                                   small in-app logo
    splash/apple-splash-WxH.png                                    iOS launch screens

and prints the <link rel="apple-touch-startup-image"> tags for index.html on stdout.
Re-running regenerates everything, so it is safe to call after the logo changes.
"""

import argparse
import colorsys
import math
from collections import Counter
from pathlib import Path

from PIL import Image

# iOS launch screens, portrait: (px width, px height, css width, css height, pixel ratio).
IOS_SCREENS = [
    (1320, 2868, 440, 956, 3),  # iPhone 16 Pro Max
    (1206, 2622, 402, 874, 3),  # iPhone 16 Pro
    (1290, 2796, 430, 932, 3),  # iPhone 14 Pro Max / 15 Plus / 15 Pro Max / 16 Plus
    (1179, 2556, 393, 852, 3),  # iPhone 14 Pro / 15 / 15 Pro / 16
    (1284, 2778, 428, 926, 3),  # iPhone 12/13 Pro Max, 14 Plus
    (1170, 2532, 390, 844, 3),  # iPhone 12/13/14, 12/13 Pro
    (1125, 2436, 375, 812, 3),  # iPhone X/XS/11 Pro, 12/13 mini
    (1242, 2688, 414, 896, 3),  # iPhone XS Max / 11 Pro Max
    (828, 1792, 414, 896, 2),  # iPhone XR / 11
    (1242, 2208, 414, 736, 3),  # iPhone 8 Plus
    (750, 1334, 375, 667, 2),  # iPhone SE 2/3, 8
    (2048, 2732, 1024, 1366, 2),  # iPad Pro 12.9"
    (1668, 2388, 834, 1194, 2),  # iPad Pro 11"
    (1640, 2360, 820, 1180, 2),  # iPad Air
    (1620, 2160, 810, 1080, 2),  # iPad 10.2"
]


def hex_to_rgba(value: str) -> tuple[int, int, int, int]:
    value = value.lstrip("#")
    return (int(value[0:2], 16), int(value[2:4], 16), int(value[4:6], 16), 255)


def trimmed_square(path: Path) -> Image.Image:
    """The logo cropped to its visible pixels and centred on a square canvas."""
    logo = Image.open(path).convert("RGBA")
    # Generated art often has near-zero alpha noise around it; ignore it when trimming.
    mask = logo.getchannel("A").point(lambda a: 255 if a > 24 else 0)
    box = mask.getbbox()
    if box:
        logo = logo.crop(box)
    side = max(logo.size)
    square = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    square.paste(logo, ((side - logo.width) // 2, (side - logo.height) // 2))
    return square


def fit(
    logo: Image.Image, size: int, *, scale: float = 1.0, background=None
) -> Image.Image:
    """`logo` resized into a `size` square, occupying `scale` of it."""
    canvas = Image.new("RGBA", (size, size), background or (0, 0, 0, 0))
    inner = max(1, round(size * scale))
    resized = logo.resize((inner, inner), Image.LANCZOS)
    offset = (size - inner) // 2
    canvas.alpha_composite(resized, (offset, offset))
    return canvas


def opaque(image: Image.Image) -> Image.Image:
    return image.convert("RGB")


def to_oklch(rgb: tuple[int, int, int]) -> tuple[float, float, float]:
    def lin(c: float) -> float:
        c /= 255
        return c / 12.92 if c <= 0.04045 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (lin(c) for c in rgb)
    l = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3)
    m = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3)
    s = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)
    L = 0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s
    A = 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s
    B = 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s
    return L, math.hypot(A, B), math.degrees(math.atan2(B, A)) % 360


def print_palette(path: Path) -> None:
    """Dominant opaque colours of the logo, grouped by hue, with their OKLCH values."""
    image = Image.open(path).convert("RGBA")
    image.thumbnail((200, 200))
    pixels = [p[:3] for p in image.get_flattened_data() if p[3] > 200]
    buckets = Counter(tuple(c // 24 * 24 + 12 for c in p) for p in pixels)
    total = sum(buckets.values()) or 1
    print("share  hex      oklch                     saturation")
    for rgb, count in buckets.most_common(16):
        L, C, h = to_oklch(rgb)
        sat = colorsys.rgb_to_hls(*(c / 255 for c in rgb))[2]
        print(
            f"{count / total:5.1%}  #{rgb[0]:02x}{rgb[1]:02x}{rgb[2]:02x}  "
            f"oklch({L:.2f} {C:.3f} {h:5.1f})   {sat:.2f}"
        )


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter
    )
    parser.add_argument("--logo", type=Path, default=Path("logo.png"))
    parser.add_argument("--out", type=Path, default=Path("public"))
    parser.add_argument(
        "--background",
        default="#170830",
        help="opaque fill for iOS/maskable icons and splash screens; use the site background",
    )
    parser.add_argument(
        "--no-splash", action="store_true", help="skip the iOS launch screens"
    )
    parser.add_argument(
        "--palette", action="store_true", help="only print the logo's dominant colours"
    )
    args = parser.parse_args()

    if args.palette:
        print_palette(args.logo)
        return

    background = hex_to_rgba(args.background)
    logo = trimmed_square(args.logo)
    out = args.out
    out.mkdir(parents=True, exist_ok=True)

    fit(logo, 16).save(out / "favicon-16x16.png", optimize=True)
    fit(logo, 32).save(out / "favicon-32x32.png", optimize=True)
    fit(logo, 48).save(out / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])

    fit(logo, 128).save(out / "logo-128.png", optimize=True)

    fit(logo, 192).save(out / "icon-192.png", optimize=True)
    fit(logo, 512).save(out / "icon-512.png", optimize=True)
    # Maskable: Android crops to a circle/squircle; keep the art inside the 80% safe zone.
    opaque(fit(logo, 192, scale=0.7, background=background)).save(
        out / "icon-maskable-192.png", optimize=True
    )
    opaque(fit(logo, 512, scale=0.7, background=background)).save(
        out / "icon-maskable-512.png", optimize=True
    )

    # iOS fills transparency with black, so the touch icon is flattened on the brand background.
    opaque(fit(logo, 180, scale=0.84, background=background)).save(
        out / "apple-touch-icon.png", optimize=True
    )

    if args.no_splash:
        return

    splash = out / "splash"
    splash.mkdir(exist_ok=True)
    for width, height, *_ in IOS_SCREENS:
        screen = Image.new("RGBA", (width, height), background)
        side = round(min(width, height) * 0.4)
        mark = logo.resize((side, side), Image.LANCZOS)
        screen.alpha_composite(mark, ((width - side) // 2, (height - side) // 2))
        opaque(screen).save(
            splash / f"apple-splash-{width}x{height}.png", optimize=True
        )

    for width, height, css_w, css_h, ratio in IOS_SCREENS:
        print(
            f'    <link rel="apple-touch-startup-image" href="/splash/apple-splash-{width}x{height}.png" '
            f'media="(device-width: {css_w}px) and (device-height: {css_h}px) and '
            f'(-webkit-device-pixel-ratio: {ratio}) and (orientation: portrait)" />'
        )


if __name__ == "__main__":
    main()
