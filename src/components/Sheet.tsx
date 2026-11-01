import { useId, type ReactNode } from "react";
import { FORMATS, type FormatId } from "../data/formats";
import { PARTNERS } from "../data/partners";
import { poleById } from "../data/poles";
import type { ExportKind } from "../lib/export";
import {
  RHYTHMS,
  WEEKDAYS,
  WEEKDAY_ORDER,
  type Edition,
  type PosterState,
  type PosterStyle,
  type WhenMode,
} from "../lib/poster-state";
import {
  BoxIcon,
  DownloadIcon,
  RepeatIcon,
  ResetIcon,
  SparkIcon,
  TypeIcon,
} from "../poster/icons";

interface Props {
  state: PosterState;
  set: <K extends keyof PosterState>(key: K, value: PosterState[K]) => void;
  onExport: (kind: ExportKind) => void;
  onReset: () => void;
  busy: ExportKind | null;
  error: string | null;
  fileName: string;
}

const Field = ({
  label,
  hint,
  children,
  htmlFor,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  htmlFor?: string;
}) => (
  <div className="field">
    <label className="field-label" htmlFor={htmlFor}>
      {label}
      {hint && <span className="field-hint">{hint}</span>}
    </label>
    {children}
  </div>
);

const Chips = ({
  items,
  onPick,
  current,
}: {
  items: string[];
  onPick: (v: string) => void;
  current: string;
}) => (
  <div className="chips">
    {items.map((it) => (
      <button
        key={it}
        type="button"
        className="chip"
        aria-pressed={current === it}
        onClick={() => onPick(it)}
      >
        {it}
      </button>
    ))}
  </div>
);

const PRICE_CHIPS = [
  "Gratuit",
  "Gratuit pour les adhérents",
  "Prix libre",
  "2 €",
];
const WHEN_MODES: { id: WhenMode; label: string }[] = [
  { id: "recurrence", label: "Récurrent" },
  { id: "date", label: "Date unique" },
  { id: "free", label: "Texte libre" },
];

export function Sheet({
  state,
  set,
  onExport,
  onReset,
  busy,
  error,
  fileName,
}: Props) {
  const pole = poleById(state.pole);
  const id = useId();
  const f = (name: string) => `${id}-${name}`;

  return (
    <section className="sheet" aria-label="Fiche de l’affiche">
      <div className="sheet-scroll">
        <header className="sheet-head">
          <h2>Fiche de règles</h2>
          <button type="button" className="ghost" onClick={onReset}>
            <ResetIcon width={16} height={16} />
            Réinitialiser
          </button>
        </header>

        <fieldset className="block">
          <legend>Le jeu</legend>
          <Field label="Nom de l’évènement" htmlFor={f("name")}>
            <input
              id={f("name")}
              type="text"
              value={state.eventName}
              maxLength={60}
              placeholder={pole.examples[0]}
              onChange={(e) => set("eventName", e.target.value)}
            />
          </Field>
          <Chips
            items={pole.examples}
            current={state.eventName}
            onPick={(v) => set("eventName", v)}
          />
        </fieldset>

        <fieldset className="block">
          <legend>Style</legend>
          <div className="editions" role="radiogroup" aria-label="Style">
            {(
              [
                {
                  id: "box",
                  title: "Boîte",
                  text: "Le couvercle illustré, plein de matière.",
                  Icon: BoxIcon,
                },
                {
                  id: "sober",
                  title: "Sobre",
                  text: "Fond clair, gros titre, l’essentiel en trois lignes.",
                  Icon: TypeIcon,
                },
              ] as {
                id: PosterStyle;
                title: string;
                text: string;
                Icon: typeof BoxIcon;
              }[]
            ).map(({ id: sid, title, text, Icon }) => (
              <button
                key={sid}
                type="button"
                role="radio"
                aria-checked={state.style === sid}
                className="edition"
                onClick={() => set("style", sid)}
              >
                <Icon width={20} height={20} />
                <b>{title}</b>
                <span>{text}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {PARTNERS.length > 0 && (
          <fieldset className="block">
            <legend>Partenariat</legend>
            <div className="chips" role="group" aria-label="Assos partenaires">
              {PARTNERS.map((p) => {
                const on = state.partners.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    className="chip partner-chip"
                    aria-pressed={on}
                    onClick={() =>
                      set(
                        "partners",
                        on
                          ? state.partners.filter((id) => id !== p.id)
                          : [...state.partners, p.id],
                      )
                    }
                  >
                    <span
                      className="partner-dot"
                      style={{ background: p.colors.main }}
                    />
                    {p.name}
                  </button>
                );
              })}
            </div>
          </fieldset>
        )}

        <fieldset className="block">
          <legend>Édition</legend>
          <div className="editions" role="radiogroup" aria-label="Édition">
            {(
              [
                {
                  id: "weekly",
                  title: "Hebdo",
                  text: "La boîte classique, pour le rendez-vous régulier.",
                  Icon: RepeatIcon,
                },
                {
                  id: "special",
                  title: "Spéciale",
                  text: "L’édition collector, pour l’évènement exceptionnel.",
                  Icon: SparkIcon,
                },
              ] as {
                id: Edition;
                title: string;
                text: string;
                Icon: typeof RepeatIcon;
              }[]
            ).map(({ id: eid, title, text, Icon }) => (
              <button
                key={eid}
                type="button"
                role="radio"
                aria-checked={state.edition === eid}
                className="edition"
                data-edition={eid}
                onClick={() => {
                  set("edition", eid);
                  if (eid === "special" && state.whenMode === "recurrence")
                    set("whenMode", "date");
                  if (eid === "weekly" && state.whenMode === "date")
                    set("whenMode", "recurrence");
                }}
              >
                <Icon width={20} height={20} />
                <b>{title}</b>
                <span>{text}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="block">
          <legend>Quand et où</legend>
          <div
            className="segmented"
            role="radiogroup"
            aria-label="Type de date"
          >
            {WHEN_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={state.whenMode === m.id}
                onClick={() => set("whenMode", m.id)}
              >
                {m.label}
              </button>
            ))}
          </div>

          {state.whenMode === "recurrence" && (
            <>
              <div className="days" role="radiogroup" aria-label="Jour">
                {WEEKDAY_ORDER.map((d) => (
                  <button
                    key={d}
                    type="button"
                    role="radio"
                    aria-checked={state.weekday === d}
                    aria-label={WEEKDAYS[d]}
                    onClick={() => set("weekday", d)}
                  >
                    {WEEKDAYS[d].slice(0, 3)}
                  </button>
                ))}
              </div>
              <Field label="Rythme" htmlFor={f("rhythm")}>
                <select
                  id={f("rhythm")}
                  value={state.rhythm}
                  onChange={(e) =>
                    set("rhythm", e.target.value as PosterState["rhythm"])
                  }
                >
                  {RHYTHMS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.label}
                    </option>
                  ))}
                </select>
              </Field>
            </>
          )}

          {state.whenMode === "date" && (
            <Field label="Date" htmlFor={f("date")}>
              <input
                id={f("date")}
                type="date"
                value={state.date}
                onChange={(e) => set("date", e.target.value)}
              />
            </Field>
          )}

          {state.whenMode === "free" && (
            <Field label="Date ou période" htmlFor={f("free")}>
              <input
                id={f("free")}
                type="text"
                maxLength={48}
                value={state.freeWhen}
                placeholder="Du 12 au 14 décembre"
                onChange={(e) => set("freeWhen", e.target.value)}
              />
            </Field>
          )}

          <div className="row">
            <Field label="Début" hint="optionnel" htmlFor={f("start")}>
              <input
                id={f("start")}
                type="time"
                value={state.timeStart}
                onChange={(e) => set("timeStart", e.target.value)}
              />
            </Field>
            <Field label="Fin" hint="optionnel" htmlFor={f("end")}>
              <input
                id={f("end")}
                type="time"
                value={state.timeEnd}
                onChange={(e) => set("timeEnd", e.target.value)}
              />
            </Field>
          </div>

          <Field label="Lieu" htmlFor={f("place")}>
            <input
              id={f("place")}
              type="text"
              maxLength={48}
              value={state.place}
              placeholder="Salle, bâtiment…"
              onChange={(e) => set("place", e.target.value)}
            />
          </Field>
        </fieldset>

        <fieldset className="block">
          <legend>Détails</legend>
          <Field
            label="Description courte"
            hint={`${state.description.length}/120 · optionnel`}
            htmlFor={f("desc")}
          >
            <textarea
              id={f("desc")}
              rows={2}
              maxLength={120}
              value={state.description}
              placeholder="Débutants bienvenus, on vous explique les règles."
              onChange={(e) => set("description", e.target.value)}
            />
          </Field>
          <Field label="Prix / entrée" hint="optionnel" htmlFor={f("price")}>
            <input
              id={f("price")}
              type="text"
              maxLength={36}
              value={state.price}
              placeholder="Gratuit"
              onChange={(e) => set("price", e.target.value)}
            />
          </Field>
          <Chips
            items={PRICE_CHIPS}
            current={state.price}
            onPick={(v) => set("price", v)}
          />
        </fieldset>

        <fieldset className="block">
          <legend>Format</legend>
          {(["Instagram", "Écran", "Impression"] as const).map((group) => (
            <div key={group} className="formats">
              <span className="formats-group">
                {group === "Impression" ? "Impression · 300 dpi" : group}
              </span>
              <div
                className="formats-list"
                role="radiogroup"
                aria-label={group}
              >
                {FORMATS.filter((fm) => fm.group === group).map((fm) => {
                  const k = 30 / Math.max(fm.width, fm.height);
                  return (
                    <button
                      key={fm.id}
                      type="button"
                      role="radio"
                      aria-checked={state.format === fm.id}
                      className="format"
                      onClick={() => set("format", fm.id as FormatId)}
                    >
                      <span
                        className="format-shape"
                        style={{ width: fm.width * k, height: fm.height * k }}
                      />
                      <b>{fm.label}</b>
                      <small>{fm.detail}</small>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </fieldset>
      </div>

      <footer className="export">
        <div className="export-buttons">
          {(["png", "jpg", "pdf"] as ExportKind[]).map((k) => (
            <button
              key={k}
              type="button"
              className={k === "png" ? "primary" : "secondary"}
              onClick={() => onExport(k)}
              disabled={busy !== null}
              aria-busy={busy === k}
            >
              <DownloadIcon width={18} height={18} />
              {busy === k ? "Impression…" : k.toUpperCase()}
            </button>
          ))}
        </div>
        {error ? (
          <p className="export-note export-error" role="alert">
            {error}
          </p>
        ) : (
          <p className="export-note">{fileName}</p>
        )}
      </footer>
    </section>
  );
}
