import { DISCORD } from "../config/discord";
import type { Partner } from "../data/partners";
import { HOD } from "../data/poles";

export interface DiscordCode {
  id: string;
  label: string;
  name: string;
  url: string;
  color: string;
  ink: string;
}

const channels = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);

const luminance = (hex: string) => {
  const [r, g, b] = channels(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const darken = (hex: string, t: number) =>
  "#" +
  channels(hex)
    .map((c) =>
      Math.round(c * (1 - t) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("");

const qrInk = (hex: string) => {
  let ink = hex;
  for (let t = 0.1; luminance(ink) > 0.05 && t < 1; t += 0.1)
    ink = darken(hex, t);
  return ink;
};

export function discordCodes(partners: Partner[]): DiscordCode[] {
  const entries = [
    { id: "hod", label: "HOD", name: "Heaven of Dice", color: HOD.electric },
    ...partners.map((p) => ({
      id: p.id,
      label: p.name,
      name: p.name,
      color: p.colors.main,
    })),
  ];
  return entries.flatMap((e) => {
    const url = DISCORD[e.id]?.trim();
    return url ? [{ ...e, url, ink: qrInk(e.color) }] : [];
  });
}
