// ─── Onkolex Design Tokens ───────────────────────────────────────────────────
// Ændring af farver: rediger kun her — påvirker hele appen automatisk.

export const T = {
  // Baggrunde
  bg:          "#eef2f8",   // Blød blå-grå sidebaggund
  surface:     "#ffffff",   // Hvide kort
  surface2:    "#f4f7fb",   // Lys grå til indre sektioner
  surface3:    "#e8eef7",   // Fremhævede rækker
  sidebar:     "#1e3a5f",   // Mørk navy sidebar
  sidebarItem: "#253f68",   // Hover i sidebar
  border:      "#d0dae8",
  borderLight: "#e2e8f2",

  // Accent — tydelige på lys baggrund
  rose:        "#d63870",
  roseDim:     "rgba(214,56,112,0.10)",
  roseLight:   "#fce8f1",

  green:       "#0a8f62",
  greenDim:    "rgba(10,143,98,0.10)",
  greenLight:  "#e4f7ef",

  blue:        "#2060d8",
  blueDim:     "rgba(32,96,216,0.10)",
  blueLight:   "#e8f0fd",

  amber:       "#b86800",
  amberDim:    "rgba(184,104,0,0.10)",
  amberLight:  "#fef3e2",

  purple:      "#6040c0",
  purpleDim:   "rgba(96,64,192,0.10)",
  purpleLight: "#f0ecfd",

  // Tekst
  text:        "#1a2848",
  text2:       "#384e72",
  muted:       "#7a90b0",
  muted2:      "#5a70a0",
  white:       "#ffffff",
};

// Aktivitetsniveau-farver til signalveje
export const LEVEL_COLORS = {
  "Ekstremt høj": { c: "#b71c1c", bg: "#fdecea" },
  "Meget høj":    { c: "#bf360c", bg: "#fef3e8" },
  "Høj":          { c: "#e65100", bg: "#fff3e0" },
  "Moderat-høj":  { c: "#1b5e20", bg: "#e8f5e9" },
  "Moderat":      { c: "#1565c0", bg: "#e3f2fd" },
  "Lav-moderat":  { c: "#4a148c", bg: "#f3e5f5" },
  "Lav":          { c: "#7a90b0", bg: "#e8eef7" },
};
