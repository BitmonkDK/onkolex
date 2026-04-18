// ─── Onkolex — Komplet Kræfttype-register ───────────────────────────────────
// Alle kræfttyper er aktiverede. For at tilføje en ny type:
//   1. Opret fil: src/data/cancer/[navn].js
//   2. Tilføj import herunder
//   3. Tilføj til CANCERS-arrayet

// ── Batch 1 ───────────────────────────────────────────────────────────────────
import { braestkraeft }                              from "./braestkraeft.js";

// ── Batch 2 ───────────────────────────────────────────────────────────────────
import { lungekraeft }                              from "./lungekraeft.js";
import { kolorektal }                               from "./kolorektal.js";
import { prostatakraeft }                           from "./prostatakraeft.js";

// ── Batch 3 ───────────────────────────────────────────────────────────────────
import { glioblastom }                              from "./glioblastom.js";
import { bugspytkirtel }                            from "./bugspytkirtel.js";
import { aeggestokkraeft }                          from "./aeggestokkraeft.js";

// ── Batch 4 ───────────────────────────────────────────────────────────────────
import { leukemi }                                  from "./leukemi.js";
import { lymfom }                                   from "./lymfom.js";
import { melanom }                                  from "./melanom.js";

// ── Batch 5 ───────────────────────────────────────────────────────────────────
import { urotelialkraeft, leverskraeft, skjoldbruskiraeft, sarkom } from "./batch5.js";

export const CANCERS = [
  braestkraeft,
  lungekraeft,
  kolorektal,
  prostatakraeft,
  glioblastom,
  bugspytkirtel,
  aeggestokkraeft,
  leukemi,
  lymfom,
  melanom,
  urotelialkraeft,
  leverskraeft,
  skjoldbruskiraeft,
  sarkom,
];
