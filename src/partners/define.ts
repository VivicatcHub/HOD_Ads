export interface PartnerDef {
  name: string;
  colors: { main: string; soft: string };
  logo: string;
  logoOnLight?: string;
  chip?: string;
  shadow?: string;
  watermark?: string;
}

export const definePartner = (def: PartnerDef) => def;
