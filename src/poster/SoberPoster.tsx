import {
  forwardRef,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import logo from "../assets/logo.png";
import { poleById, type PoleId } from "../data/poles";
import { formatById, type Shape } from "../data/formats";
import { partnersByIds } from "../data/partners";
import { timeLine, whenLine, type PosterState } from "../lib/poster-state";
import { D20Icon, SparkIcon } from "./icons";

const TITLE_MAX: Record<Shape, number> = {
  portrait: 13,
  story: 15,
  square: 10.5,
  landscape: 12,
};
const TITLE_ROOM: Record<Shape, number> = {
  portrait: 30,
  story: 44,
  square: 22,
  landscape: 36,
};
const STRETCHES = [125, 112, 100, 88, 78];

const SOBER_INK: Record<
  PoleId,
  { title: string; text: string; tint?: string }
> = {
  reflexion: { title: "#2b0a57", text: "#1c1426", tint: "#cfc4ad" },
  tcg: { title: "#1f5ad6", text: "#0c1f4f" },
  societe: { title: "#e2600c", text: "#4a1c05" },
  jdr: { title: "#0f8a7e", text: "#06322d" },
  wargames: { title: "#c41d29", text: "#3d060b" },
  poker: { title: "#0f7a43", text: "#06301b" },
  mensonges: { title: "#131016", text: "#131016" },
};

const mix = (a: string, b: string, t: number) => {
  const pa = [1, 3, 5].map((i) => parseInt(a.slice(i, i + 2), 16));
  const pb = [1, 3, 5].map((i) => parseInt(b.slice(i, i + 2), 16));
  return `rgb(${pa.map((v, i) => Math.round(v + (pb[i] - v) * t)).join(" ")})`;
};

const split = (colors: string[]) => {
  const n = colors.length;
  const stops = colors.flatMap((c, i) => {
    const tone = mix("#ffffff", c, 0.3);
    const from = (i / n) * 100 + (i ? 8 : 0);
    const to = ((i + 1) / n) * 100 - (i < n - 1 ? 8 : 0);
    return [`${tone} ${from}%`, `${tone} ${to}%`];
  });
  return `linear-gradient(var(--sb-angle), ${stops.join(", ")})`;
};

function useFontsTick() {
  const [tick, setTick] = useState(0);
  useLayoutEffect(() => {
    let alive = true;
    const bump = () => alive && setTick((t) => t + 1);
    document.fonts.ready.then(bump);
    document.fonts.addEventListener("loadingdone", bump);
    return () => {
      alive = false;
      document.fonts.removeEventListener("loadingdone", bump);
    };
  }, []);
  return tick;
}

export const SoberPoster = forwardRef<HTMLDivElement, { state: PosterState }>(
  function SoberPoster({ state }, ref) {
    const pole = poleById(state.pole);
    const format = formatById(state.format);
    const shape = format.shape;
    const special = state.edition === "special";
    const partners = partnersByIds(state.partners);
    const watermark = partners.find((p) => p.watermark)?.watermark;
    const u = Math.min(format.width, format.height) / 100;
    const ink = SOBER_INK[pole.id];
    const tint = ink.tint ?? pole.light;

    const titleRef = useRef<HTMLHeadingElement>(null);
    const fonts = useFontsTick();

    const title = state.eventName.trim() || "Nom de l’évènement";
    const tagline = state.description.trim();

    useLayoutEffect(() => {
      const el = titleRef.current;
      if (!el) return;
      const room = u * TITLE_ROOM[shape];
      const max = u * TITLE_MAX[shape];
      const min = u * 3;
      for (let size = max; size >= min; size *= 0.95) {
        for (const stretch of STRETCHES) {
          el.style.fontSize = `${size}px`;
          el.style.fontStretch = `${stretch}%`;
          if (el.scrollWidth <= el.clientWidth + 1 && el.offsetHeight <= room)
            return;
        }
      }
    }, [title, shape, u, fonts]);

    const when = whenLine(state) || "Date à définir";
    const lines = [
      state.place.trim() || "Lieu à définir",
      timeLine(state),
      state.price.trim(),
    ].filter(Boolean);

    const vars = {
      "--u": `${u}px`,
      "--sb-title": ink.title,
      "--sb-text": ink.text,
      "--sb-top": mix("#ffffff", tint, 0.12),
      "--sb-bottom": mix("#ffffff", tint, 0.34),
      "--sb-glow": mix("#ffffff", tint, 0.55),
      "--sb-split": partners.length
        ? split([ink.title, ...partners.map((p) => p.colors.main)])
        : undefined,
      "--sb-accent": partners[0]?.colors.main,
    } as CSSProperties;

    return (
      <div
        ref={ref}
        className="poster-sober"
        data-shape={shape}
        data-edition={state.edition}
        data-pole={pole.id}
        data-partners={partners.length || undefined}
        style={{ ...vars, width: format.width, height: format.height }}
      >
        {watermark && <img className="sb-watermark" src={watermark} alt="" />}

        <div className="sb-text">
          <header className="sb-lockup">
            <span className="sb-hod">
              <D20Icon className="sb-die" />
              <b>Heaven of Dice</b>
            </span>
            {partners.length > 0 ? (
              partners.map((p) => (
                <span key={p.id} className="sb-partner">
                  <span
                    className="sb-x"
                    style={{ color: p.colors.main }}
                    aria-hidden="true"
                  >
                    ×
                  </span>
                  <img
                    src={p.logoOnLight ?? p.logo}
                    alt={p.name}
                    data-chip={!p.logoOnLight || undefined}
                    style={{
                      background: p.logoOnLight
                        ? undefined
                        : (p.chip ?? p.colors.main),
                      filter: p.shadow
                        ? `drop-shadow(0 calc(var(--u) * 0.3) calc(var(--u) * 0.5) ${p.shadow}55)`
                        : undefined,
                    }}
                  />
                </span>
              ))
            ) : (
              <>
                <span className="sb-x" aria-hidden="true">
                  ×
                </span>
                <span className="sb-pole">{pole.short}</span>
              </>
            )}
          </header>

          {(special || partners.length > 0) && (
            <div className="sb-tags">
              {partners.length > 0 && (
                <span className="sb-pole">{pole.short}</span>
              )}
              {special && (
                <p className="sb-special">
                  <SparkIcon className="sb-spark" />
                  Édition spéciale
                  <SparkIcon className="sb-spark" />
                </p>
              )}
            </div>
          )}
          <p className="sb-kicker">{when}</p>
          <h1 className="sb-title" ref={titleRef}>
            {title}
          </h1>
          <ul className="sb-lines">
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          {tagline && <p className="sb-tagline">{tagline}</p>}
        </div>

        <img className="sb-phoenix" src={logo} alt="" />
      </div>
    );
  },
);
