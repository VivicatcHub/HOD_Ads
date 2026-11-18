import { formatById } from "../data/formats";
import { partnersByIds } from "../data/partners";
import { poleById } from "../data/poles";
import { discordCodes } from "../lib/discord";
import { whenLine, type PosterState } from "../lib/poster-state";

export const PLACEHOLDERS = {
  title: "Nom de l’évènement",
  when: "Date à définir",
  place: "Lieu à définir",
};

export function posterData(state: PosterState) {
  const format = formatById(state.format);
  const partners = partnersByIds(state.partners);
  return {
    pole: poleById(state.pole),
    format,
    shape: format.shape,
    special: state.edition === "special",
    partners,
    codes: format.qr ? discordCodes(partners) : [],
    unit: Math.min(format.width, format.height) / 100,
    title: state.eventName.trim() || PLACEHOLDERS.title,
    tagline: state.description.trim(),
    when: whenLine(state) || PLACEHOLDERS.when,
    place: state.place.trim() || PLACEHOLDERS.place,
    price: state.price.trim(),
  };
}
