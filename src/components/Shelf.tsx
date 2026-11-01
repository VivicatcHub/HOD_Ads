import logo from "../assets/logo.png";
import { POLES, type PoleId } from "../data/poles";

interface Props {
  value: PoleId;
  onChange: (id: PoleId) => void;
}

export function Shelf({ value, onChange }: Props) {
  return (
    <aside className="shelf">
      <div className="brand">
        <img src={logo} alt="" className="brand-logo" />
        <span className="brand-name">
          HOD <em>Ads</em>
        </span>
      </div>
      <div className="spines" role="radiogroup" aria-label="Pôle">
        {POLES.map((p) => (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={p.id === value}
            className="spine"
            data-pole={p.id}
            style={
              {
                "--spine": p.base,
                "--spine-ink": p.ink,
                "--spine-light": p.light,
              } as React.CSSProperties
            }
            onClick={() => onChange(p.id)}
          >
            <span className="spine-cap">HOD</span>
            <span className="spine-name" title={p.name}>
              {p.short}
            </span>
          </button>
        ))}
      </div>
    </aside>
  );
}
