import type { Format } from "../data/formats";

export type ExportKind = "png" | "jpg" | "pdf";

const download = (href: string, name: string) => {
  const a = document.createElement("a");
  a.href = href;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
};

const JPEG_QUALITY = 0.95;

const renderAfterWarmup = async (render: () => Promise<string>) => {
  await render();
  return render();
};

export async function exportPoster(
  node: HTMLElement,
  format: Format,
  kind: ExportKind,
  baseName: string,
) {
  await document.fonts.ready;
  const { toJpeg, toPng } = await import("html-to-image");
  const options = {
    width: format.width,
    height: format.height,
    pixelRatio: format.pixelRatio,
    cacheBust: true,
    style: { transform: "none", margin: "0" },
  };

  if (kind === "png") {
    const url = await renderAfterWarmup(() => toPng(node, options));
    download(url, `${baseName}.png`);
    return;
  }

  const jpeg = await renderAfterWarmup(() =>
    toJpeg(node, { ...options, quality: JPEG_QUALITY }),
  );

  if (kind === "jpg") {
    download(jpeg, `${baseName}.jpg`);
    return;
  }

  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({
    orientation: format.pdf.orientation,
    unit: format.pdf.unit,
    format: format.pdf.format,
    compress: true,
  });
  const w = pdf.internal.pageSize.getWidth();
  const h = pdf.internal.pageSize.getHeight();
  pdf.addImage(jpeg, "JPEG", 0, 0, w, h, undefined, "FAST");
  pdf.save(`${baseName}.pdf`);
}
