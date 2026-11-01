export type FormatId =
  | "ig-square"
  | "ig-portrait"
  | "ig-story"
  | "a4-portrait"
  | "a4-landscape"
  | "screen-hd"
  | "discord";
export type Shape = "square" | "portrait" | "story" | "landscape";

export interface Format {
  id: FormatId;
  group: "Instagram" | "Écran" | "Impression";
  label: string;
  detail: string;
  width: number;
  height: number;
  pixelRatio: number;
  shape: Shape;
  pdf: {
    unit: "px" | "mm";
    format: [number, number] | "a4";
    orientation: "portrait" | "landscape";
  };
}

export const FORMATS: Format[] = [
  {
    id: "ig-portrait",
    group: "Instagram",
    label: "Post 4:5",
    detail: "1080 × 1350",
    width: 1080,
    height: 1350,
    pixelRatio: 1,
    shape: "portrait",
    pdf: { unit: "px", format: [1080, 1350], orientation: "portrait" },
  },
  {
    id: "ig-square",
    group: "Instagram",
    label: "Post carré",
    detail: "1080 × 1080",
    width: 1080,
    height: 1080,
    pixelRatio: 1,
    shape: "square",
    pdf: { unit: "px", format: [1080, 1080], orientation: "portrait" },
  },
  {
    id: "ig-story",
    group: "Instagram",
    label: "Story 9:16",
    detail: "1080 × 1920",
    width: 1080,
    height: 1920,
    pixelRatio: 1,
    shape: "story",
    pdf: { unit: "px", format: [1080, 1920], orientation: "portrait" },
  },
  {
    id: "screen-hd",
    group: "Écran",
    label: "Full HD 16:9",
    detail: "1920 × 1080",
    width: 1920,
    height: 1080,
    pixelRatio: 1,
    shape: "landscape",
    pdf: { unit: "px", format: [1920, 1080], orientation: "landscape" },
  },
  {
    id: "discord",
    group: "Écran",
    label: "Embed Discord",
    detail: "1600 × 800",
    width: 1600,
    height: 800,
    pixelRatio: 1,
    shape: "landscape",
    pdf: { unit: "px", format: [1600, 800], orientation: "landscape" },
  },
  {
    id: "a4-portrait",
    group: "Impression",
    label: "A4 portrait",
    detail: "2480 × 3508",
    width: 1240,
    height: 1754,
    pixelRatio: 2,
    shape: "portrait",
    pdf: { unit: "mm", format: "a4", orientation: "portrait" },
  },
  {
    id: "a4-landscape",
    group: "Impression",
    label: "A4 paysage",
    detail: "3508 × 2480",
    width: 1754,
    height: 1240,
    pixelRatio: 2,
    shape: "landscape",
    pdf: { unit: "mm", format: "a4", orientation: "landscape" },
  },
];

export const formatById = (id: FormatId) =>
  FORMATS.find((f) => f.id === id) ?? FORMATS[0];
