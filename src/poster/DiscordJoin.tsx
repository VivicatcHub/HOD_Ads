import { useMemo, type CSSProperties } from "react";
import type { DiscordCode } from "../lib/discord";
import { qrMatrix } from "../lib/qr";
import { ScanIcon } from "./icons";

const QUIET_ZONE = 2;

function QrCode({ url, ink }: { url: string; ink: string }) {
  const { size, path } = useMemo(() => qrMatrix(url), [url]);
  const box = size + QUIET_ZONE * 2;

  return (
    <svg
      className="join-qr"
      viewBox={`${-QUIET_ZONE} ${-QUIET_ZONE} ${box} ${box}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect
        x={-QUIET_ZONE}
        y={-QUIET_ZONE}
        width={box}
        height={box}
        fill="#ffffff"
      />
      <path d={path} fill={ink} />
    </svg>
  );
}

export function DiscordJoin({ codes }: { codes: DiscordCode[] }) {
  if (!codes.length) return null;
  const sub =
    codes.length === 1
      ? `Scannez pour rejoindre ${codes[0].name}`
      : "Scannez pour rejoindre chaque asso";

  return (
    <aside className="join" data-count={codes.length}>
      <div className="join-text">
        <ScanIcon className="join-icon" />
        <span>
          <b>Rejoignez-nous sur Discord</b>
          <small>{sub}</small>
        </span>
      </div>
      <ul className="join-codes">
        {codes.map((c) => (
          <li
            key={c.id}
            className="join-code"
            style={
              {
                "--join-color": c.color,
                "--join-ink": c.ink,
              } as CSSProperties
            }
          >
            <QrCode url={c.url} ink={c.ink} />
            <span className="join-name">{c.label}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
