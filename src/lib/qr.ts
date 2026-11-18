import qrcode from "qrcode-generator";

export interface QrMatrix {
  size: number;
  path: string;
}

export function qrMatrix(text: string): QrMatrix {
  const qr = qrcode(0, "M");
  qr.addData(text);
  qr.make();
  const size = qr.getModuleCount();
  let path = "";
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!qr.isDark(row, col)) continue;
      let run = 1;
      while (col + run < size && qr.isDark(row, col + run)) run++;
      path += `M${col} ${row}h${run}v1h-${run}z`;
      col += run - 1;
    }
  }
  return { size, path };
}
