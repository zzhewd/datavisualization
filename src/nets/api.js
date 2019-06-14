const PREFIX =
  process.env.NODE_ENV === "production"
    ? ""
    : "";
export const FIRSTCHART = `${PREFIX}/data/firstchart`;
export const GETLINECHART = `${PREFIX}/data/lineChart`;
