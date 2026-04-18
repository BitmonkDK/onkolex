import { T } from "../theme.js";

// ─── Evidensniveau-system ─────────────────────────────────────────────────────
// Bruges på tværs af alle off-label præparater og kosttilskud.
// For at tilføje et nyt niveau: tilføj en ny nøgle her.

export const EV = {
  pre: {
    n: 1,
    label: "Præklinisk",
    full:  "Lab- og dyreforsøg — ingen humane data endnu",
    color: T.amber,
    dim:   T.amberDim,
    light: T.amberLight,
  },
  p12: {
    n: 2,
    label: "Fase 1–2",
    full:  "Tidlige humane studier — lovende, ikke bekræftet",
    color: T.blue,
    dim:   T.blueDim,
    light: T.blueLight,
  },
  p3: {
    n: 3,
    label: "Fase 3+",
    full:  "Stærkeste evidens — randomiserede kliniske studier",
    color: T.green,
    dim:   T.greenDim,
    light: T.greenLight,
  },
};
