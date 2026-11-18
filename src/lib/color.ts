const hexChannels = (hex: string) =>
  [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));

const unitChannels = (hex: string) => hexChannels(hex).map((v) => v / 255);

const toHexByte = (unit: number) =>
  Math.round(unit * 255)
    .toString(16)
    .padStart(2, "0");

export const relativeLuminance = (hex: string) => {
  const [r, g, b] = unitChannels(hex).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const darken = (hex: string, amount: number) =>
  "#" +
  unitChannels(hex)
    .map((c) => toHexByte(c * (1 - amount)))
    .join("");

export const mix = (from: string, to: string, amount: number) => {
  const a = hexChannels(from);
  const b = hexChannels(to);
  return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * amount)).join(" ")})`;
};
