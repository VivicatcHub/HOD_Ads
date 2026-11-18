import qrcode from "qrcode-generator";
import { useMemo, type CSSProperties } from "react";
import type { DiscordCode } from "../lib/discord";
import { ScanIcon } from "./icons";

function QrCode({ url, ink }: { url: string; ink: string }) {
  const { n, d } = useMemo(() => {
    const qr = qrcode(0, "M");
    qr.addData(url);
    qr.make();
    const n = qr.getModuleCount();
    let d = "";
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (!qr.isDark(r, c)) continue;
        let run = 1;
        while (c + run < n && qr.isDark(r, c + run)) run++;
        d += `M${c} ${r}h${run}v1h-${run}z`;
        c += run - 1;
      }
    }
    return { n, d };
  }, [url]);

  return (
    <svg
      className="join-qr"
      viewBox={`-2 -2 ${n + 4} ${n + 4}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
    >
      <rect x={-2} y={-2} width={n + 4} height={n + 4} fill="#ffffff" />
      <path d={d} fill={ink} />
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
