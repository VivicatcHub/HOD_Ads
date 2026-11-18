import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import logo from "../assets/logo.png";
import type { Shape } from "../data/formats";
import { HOD } from "../data/poles";
import { badgeFor, timeLine, type PosterState } from "../lib/poster-state";
import { DiscordJoin } from "./DiscordJoin";
import { fitTitle, useFontsVersion } from "./fit-title";
import {
  CalendarIcon,
  ClockIcon,
  D20Icon,
  PinIcon,
  SparkIcon,
  TicketIcon,
} from "./icons";
import { CrystalBurst, Medallion, PoleMotif } from "./motifs";
import { PartnerRibbon } from "./PartnerRibbon";
import { posterData } from "./poster-data";

const TITLE_MAX_SIZE: Record<Shape, number> = {
  portrait: 15,
  story: 17,
  square: 13,
  landscape: 12.5,
};
const TITLE_COVER_SHARE: Record<Shape, number> = {
  portrait: 0.44,
  story: 0.4,
  square: 0.42,
  landscape: 0.5,
};
const TITLE_MIN_SIZE = 3;

const titleLetterSpacing = (stretch: number) =>
  stretch < 100 ? "0.012em" : "-0.01em";

export const Poster = forwardRef<HTMLDivElement, { state: PosterState }>(
  function Poster({ state }, ref) {
    const {
      pole,
      format,
      shape,
      special,
      partners,
      codes,
      unit: u,
      title,
      tagline,
      when,
      place,
      price,
    } = posterData(state);

    const coverRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const taglineRef = useRef<HTMLParagraphElement>(null);
    const [cover, setCover] = useState({ w: 0, h: 0 });
    const fontsVersion = useFontsVersion();

    useLayoutEffect(() => {
      const el = coverRef.current;
      if (!el) return;
      const measure = () => setCover({ w: el.clientWidth, h: el.clientHeight });
      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(el);
      return () => ro.disconnect();
    }, []);

    useLayoutEffect(() => {
      const el = titleRef.current;
      if (!el || !cover.h) return;
      const taglineHeight = taglineRef.current?.offsetHeight ?? 0;
      fitTitle(el, {
        maxSize: u * TITLE_MAX_SIZE[shape],
        minSize: u * TITLE_MIN_SIZE,
        maxHeight: cover.h * TITLE_COVER_SHARE[shape] - taglineHeight,
        letterSpacing: titleLetterSpacing,
      });
    }, [
      title,
      tagline,
      shape,
      special,
      cover.w,
      cover.h,
      u,
      fontsVersion,
      codes.length,
    ]);

    const badge = badgeFor(state);
    const time = timeLine(state);

    const pictos = [
      { key: "when", label: "Quand", value: when, Icon: CalendarIcon },
      time && { key: "time", label: "Horaires", value: time, Icon: ClockIcon },
      { key: "place", label: "Lieu", value: place, Icon: PinIcon },
      price && {
        key: "price",
        label: "Entrée",
        value: price,
        Icon: TicketIcon,
      },
    ].filter(Boolean) as {
      key: string;
      label: string;
      value: string;
      Icon: typeof CalendarIcon;
    }[];

    const vars = {
      "--u": `${u}px`,
      "--pw": `${format.width}px`,
      "--ph": `${format.height}px`,
      "--pole": pole.base,
      "--pole-deep": pole.deep,
      "--pole-light": pole.light,
      "--pole-line": pole.line,
      "--pole-ink": pole.ink,
      "--pole-ink-soft": pole.inkSoft,
      "--hod-night": HOD.night,
      "--hod-deep": HOD.deep,
      "--hod-royal": HOD.royal,
      "--hod-electric": HOD.electric,
      "--hod-orchid": HOD.orchid,
      "--hod-lilac": HOD.lilac,
      "--hod-gold": HOD.gold,
    } as CSSProperties;

    const burstCenter = {
      x: cover.w * (shape === "landscape" ? 0.66 : 0.5),
      y: cover.h * (shape === "story" ? 0.36 : 0.4),
    };

    return (
      <div
        ref={ref}
        className="poster"
        data-shape={shape}
        data-edition={state.edition}
        data-pole={pole.id}
        data-qr={codes.length || undefined}
        style={{ ...vars, width: format.width, height: format.height }}
      >
        <header className="maker">
          <span className="maker-mark">
            <D20Icon className="maker-die" />
            <span>
              <b>Heaven of Dice</b>
              <small>
                {partners.length ? "présentent" : "présente"}
                {special && " une édition spéciale"}
              </small>
            </span>
            {partners.map((p) => (
              <span key={p.id} className="maker-partner">
                <span
                  className="maker-x"
                  style={{ color: p.colors.soft }}
                  aria-hidden="true"
                >
                  ×
                </span>
                <img
                  src={p.logo}
                  alt={p.name}
                  style={{
                    background: p.chip ?? p.colors.main,
                    boxShadow: `inset 0 0 0 calc(var(--u) * 0.25) ${p.colors.main}`,
                  }}
                />
              </span>
            ))}
          </span>
          <span className="maker-pole">
            {partners.length ? pole.short : pole.name}
          </span>
        </header>

        <section className="cover" ref={coverRef}>
          {cover.w > 0 &&
            (special ? (
              <>
                <CrystalBurst
                  pole={pole}
                  w={cover.w}
                  h={cover.h}
                  cx={burstCenter.x}
                  cy={burstCenter.y}
                />
                <div className="special-motif">
                  <PoleMotif pole={pole} w={cover.w} h={cover.h} special />
                </div>
                <Medallion
                  pole={pole}
                  w={cover.w}
                  h={cover.h}
                  cx={burstCenter.x}
                  cy={burstCenter.y}
                />
              </>
            ) : (
              <PoleMotif pole={pole} w={cover.w} h={cover.h} special={false} />
            ))}
          <img className="phoenix" src={logo} alt="" />
          {special && (
            <div className="sash">
              <span>
                <SparkIcon className="sash-spark" />
                Édition spéciale
                <SparkIcon className="sash-spark" />
              </span>
            </div>
          )}
          {badge && (
            <div className="badge">
              <b>{badge.big}</b>
              <span>{badge.small}</span>
            </div>
          )}
          <div className="title-block">
            <h1 className="title" ref={titleRef}>
              {title}
            </h1>
            {tagline && (
              <p className="tagline" ref={taglineRef}>
                {tagline}
              </p>
            )}
          </div>
        </section>

        <div className="side-face">
          <img src={logo} alt="" />
          <b>{pole.name}</b>
          <small>Collection Heaven of Dice</small>
        </div>

        <ul className="pictos" data-count={pictos.length}>
          {pictos.map(({ key, label, value, Icon }) => (
            <li key={key} className={`picto picto-${key}`}>
              <span className="picto-icon" title={label}>
                <Icon />
              </span>
              <b className="picto-text">{value}</b>
            </li>
          ))}
        </ul>

        <DiscordJoin codes={codes} />

        <footer className="lip">
          <span>HOD · Association de jeux de société</span>
          <span className="lip-ref">
            Réf. HOD-{pole.code}-{special ? "SPE" : "HEB"}
          </span>
        </footer>
        <PartnerRibbon pole={pole.base} partners={partners} />
      </div>
    );
  },
);
