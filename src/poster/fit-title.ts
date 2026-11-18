import { useLayoutEffect, useState } from "react";

const FONT_STRETCHES = [125, 112, 100, 88, 78];
const SHRINK_FACTOR = 0.95;

interface FitOptions {
  maxSize: number;
  minSize: number;
  maxHeight: number;
  letterSpacing?: (stretch: number) => string;
}

const fits = (title: HTMLElement, maxHeight: number) =>
  title.scrollWidth <= title.clientWidth + 1 && title.offsetHeight <= maxHeight;

export function fitTitle(
  title: HTMLElement,
  { maxSize, minSize, maxHeight, letterSpacing }: FitOptions,
) {
  for (let size = maxSize; size >= minSize; size *= SHRINK_FACTOR) {
    for (const stretch of FONT_STRETCHES) {
      title.style.fontSize = `${size}px`;
      title.style.fontStretch = `${stretch}%`;
      if (letterSpacing) title.style.letterSpacing = letterSpacing(stretch);
      if (fits(title, maxHeight)) return;
    }
  }
}

export function useFontsVersion() {
  const [version, setVersion] = useState(0);
  useLayoutEffect(() => {
    let mounted = true;
    const bump = () => mounted && setVersion((v) => v + 1);
    document.fonts.ready.then(bump);
    document.fonts.addEventListener("loadingdone", bump);
    return () => {
      mounted = false;
      document.fonts.removeEventListener("loadingdone", bump);
    };
  }, []);
  return version;
}
