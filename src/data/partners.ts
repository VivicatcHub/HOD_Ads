import type { PartnerDef } from "../partners/define";

export interface Partner extends PartnerDef {
  id: string;
}

const modules = import.meta.glob<{ default: PartnerDef }>(
  "../partners/*/partner.ts",
  { eager: true },
);

export const PARTNERS: Partner[] = Object.entries(modules)
  .map(([path, mod]) => ({ id: path.split("/").at(-2)!, ...mod.default }))
  .sort((a, b) => a.name.localeCompare(b.name, "fr"));

export const partnersByIds = (ids: string[]) =>
  ids
    .map((id) => PARTNERS.find((p) => p.id === id))
    .filter((p): p is Partner => !!p);
