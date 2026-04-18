import { useState } from "react";
import { T } from "../theme.js";

// ─── Sidebar ──────────────────────────────────────────────────────────────────
// Venstre navigation med kollapsible grupper og subtyper.
// Props:
//   cancer      - det aktive cancer-objekt (fra CANCERS array)
//   activeSub   - id på den valgte subtype
//   onSelect    - callback(subtypeId) når bruger vælger en subtype

export function Sidebar({ cancer, activeSub, onSelect }) {
  const [expanded, setExpanded] = useState(
    Object.fromEntries(cancer.groups.map(g => [g.id, true]))
  );

  const toggleGroup = (id) =>
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

  return (
    <div style={{
      background: T.sidebar,
      borderRight: "1px solid rgba(255,255,255,0.08)",
      overflowY: "auto",
      padding: "8px 0",
      display: "flex",
      flexDirection: "column",
    }}>
      {cancer.groups.map(g => (
        <div key={g.id}>
          {/* Gruppe-header */}
          <button
            onClick={() => toggleGroup(g.id)}
            style={{
              width: "100%", background: "none", border: "none",
              cursor: "pointer", fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: 7,
              padding: "9px 14px", textAlign: "left",
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: g.color, flexShrink: 0 }} />
            <span style={{
              flex: 1, fontSize: 10, fontWeight: 700,
              textTransform: "uppercase", letterSpacing: 1,
              color: "rgba(255,255,255,0.6)",
            }}>
              {g.name}
            </span>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)" }}>
              {expanded[g.id] ? "▲" : "▼"}
            </span>
          </button>

          {/* Subtyper */}
          {expanded[g.id] && g.subtypes.map(s => {
            const active = activeSub === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelect(s.id)}
                style={{
                  width: "100%", border: "none",
                  borderLeft: `3px solid ${active ? g.color : "transparent"}`,
                  background: active ? "rgba(255,255,255,0.10)" : "none",
                  cursor: "pointer", fontFamily: "inherit",
                  padding: "9px 13px 9px 18px", textAlign: "left",
                  color: active ? "#ffffff" : "rgba(255,255,255,0.55)",
                  fontSize: 12, fontWeight: active ? 700 : 400, lineHeight: 1.4,
                }}
              >
                {s.name}
                {s.badge && (
                  <span style={{
                    display: "block", fontSize: 9, marginTop: 1,
                    color: active ? g.color : "rgba(255,255,255,0.35)",
                    fontWeight: 600,
                  }}>
                    {s.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      ))}

      {/* Ansvarsfraskrivelse */}
      <div style={{
        margin: "16px 12px 10px",
        padding: "10px 12px",
        background: "rgba(255,255,255,0.07)",
        borderRadius: 8,
        border: "1px solid rgba(255,255,255,0.1)",
      }}>
        <div style={{ fontSize: 9, color: T.rose, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>
          Ansvarsfraskrivelse
        </div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
          Off-label brug kræver altid samtale med onkolog og læge.
        </div>
      </div>
    </div>
  );
}
