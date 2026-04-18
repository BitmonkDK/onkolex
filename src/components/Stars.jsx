import { EV } from "../data/evidence.js";

// ─── Stars ────────────────────────────────────────────────────────────────────
// Viser evidensniveau med stjerner og label.
// Props: level = "pre" | "p12" | "p3"

export function Stars({ level }) {
  const e = EV[level];
  if (!e) return null;

  return (
    <span
      title={e.full}
      style={{
        display:    "inline-flex",
        alignItems: "center",
        gap:        4,
        background: e.light,
        borderRadius: 5,
        padding:    "3px 9px",
        fontSize:   11,
        fontWeight: 700,
        color:      e.color,
        border:     `1px solid ${e.color}30`,
      }}
    >
      {"★".repeat(e.n)}{"☆".repeat(3 - e.n)} {e.label}
    </span>
  );
}
