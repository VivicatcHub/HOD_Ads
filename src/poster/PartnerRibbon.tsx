import type { Partner } from "../data/partners";

export function PartnerRibbon({
  pole,
  partners,
}: {
  pole: string;
  partners: Partner[];
}) {
  if (!partners.length) return null;
  return (
    <div className="partner-ribbon" aria-hidden="true">
      <span style={{ background: pole }} />
      {partners.map((p) => (
        <span key={p.id} style={{ background: p.colors.main }} />
      ))}
    </div>
  );
}
