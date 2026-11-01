import { useLayoutEffect, useRef, useState, type Ref } from "react";
import { formatById } from "../data/formats";
import { poleById } from "../data/poles";
import type { PosterState } from "../lib/poster-state";
import { Poster } from "../poster/Poster";
import { SoberPoster } from "../poster/SoberPoster";

interface Props {
  state: PosterState;
  posterRef: Ref<HTMLDivElement>;
}

export function Stage({ state, posterRef }: Props) {
  const format = formatById(state.format);
  const pole = poleById(state.pole);
  const areaRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.4);

  useLayoutEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      setScale(Math.min(w / format.width, h / format.height, 1));
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [format.width, format.height]);

  return (
    <main className="table">
      <div className="table-head">
        <p className="table-caption">
          <b>{pole.name}</b>
          <span aria-hidden="true">·</span>
          {state.edition === "special" ? "Édition spéciale" : "Édition hebdo"}
          {state.style === "sober" && (
            <>
              <span aria-hidden="true">·</span>
              Sobre
            </>
          )}
          <span aria-hidden="true">·</span>
          {format.group} {format.label}
          <span className="table-px">{format.detail}</span>
        </p>
      </div>
      <div
        className="stage"
        ref={areaRef}
        style={
          {
            "--ar": `${format.width} / ${format.height + 40}`,
          } as React.CSSProperties
        }
      >
        <div
          className="lid-frame"
          style={{ width: format.width * scale, height: format.height * scale }}
        >
          <div
            key={`${state.pole}-${state.style}-${state.edition}-${state.format}`}
            className="lid-print"
            style={{
              transform: `scale(${scale})`,
              width: format.width,
              height: format.height,
            }}
          >
            {state.style === "sober" ? (
              <SoberPoster ref={posterRef} state={state} />
            ) : (
              <Poster ref={posterRef} state={state} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
