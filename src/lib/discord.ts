import { DISCORD } from "../config/discord";
import type { Partner } from "../data/partners";
import { HOD } from "../data/poles";
import { darken, relativeLuminance } from "./color";

export interface DiscordCode {
  id: string;
  label: string;
  name: string;
  url: string;
  color: string;
  ink: string;
}

const MAX_SCANNABLE_LUMINANCE = 0.05;
const DARKEN_STEP = 0.1;

const scannableInk = (color: string) => {
  let ink = color;
  for (
    let amount = DARKEN_STEP;
    relativeLuminance(ink) > MAX_SCANNABLE_LUMINANCE && amount < 1;
    amount += DARKEN_STEP
  )
    ink = darken(color, amount);
  return ink;
};

export function discordCodes(partners: Partner[]): DiscordCode[] {
  const associations = [
    { id: "hod", label: "HOD", name: "Heaven of Dice", color: HOD.electric },
    ...partners.map((p) => ({
      id: p.id,
      label: p.name,
      name: p.name,
      color: p.colors.main,
    })),
  ];
  return associations.flatMap((association) => {
    const url = DISCORD[association.id]?.trim();
    return url
      ? [{ ...association, url, ink: scannableInk(association.color) }]
      : [];
  });
}
