import { useState } from "react";
import { ABBR } from "../data/abbreviations.js";
import { T } from "../theme.js";

// ─── GlossaryPanel ────────────────────────────────────────────────────────────
// Søgbar modal med alle medicinske forkortelser.
// Klik udenfor eller på ✕ for at lukke.

export function GlossaryPanel({ onClose }) {
  const [query, setQuery] = useState("");

  const results = Object.entries(ABBR).filter(([k, v]) =>
    k.toLowerCase().includes(query.toLowerCase()) ||
    v.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(26,40,72,0.5)",
        zIndex: 10000,
        display: "flex", alignItems: "flex-end", justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: T.surface,
          border: `1px solid ${T.border}`,
          borderRadius: "16px 16px 0 0",
          width: "100%", maxWidth: 680,
          maxHeight: "82vh",
          display: "flex", flexDirection: "column",
          boxShadow: "0 -8px 40px rgba(26,40,72,0.15)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 22px", borderBottom: `1px solid ${T.border}`,
        }}>
          <div style={{ fontSize: 15, fontWeight: 800, color: T.text }}>
            📖 Medicinsk Ordbog — {Object.keys(ABBR).length} forkortelser
          </div>
          <button
            onClick={onClose}
            style={{
              background: T.surface2, border: `1px solid ${T.border}`,
              color: T.muted2, borderRadius: 7, padding: "5px 12px",
              cursor: "pointer", fontSize: 14, fontFamily: "inherit",
            }}
          >✕</button>
        </div>

        {/* Søgefelt */}
        <div style={{ padding: "12px 22px", borderBottom: `1px solid ${T.border}` }}>
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Søg forkortelse eller søgeord..."
            autoFocus
            style={{
              width: "100%",
              background: T.surface2, border: `1px solid ${T.border}`,
              borderRadius: 8, padding: "10px 14px",
              color: T.text, fontSize: 13, outline: "none",
              fontFamily: "inherit", boxSizing: "border-box",
            }}
          />
        </div>

        {/* Resultater */}
        <div style={{ overflowY: "auto", padding: "14px 22px 32px" }}>
          {results.map(([k, v]) => (
            <div key={k} style={{
              marginBottom: 14, paddingBottom: 14,
              borderBottom: `1px solid ${T.border}`,
            }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: T.blue, marginBottom: 4 }}>{k}</div>
              <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.7 }}>{v}</div>
            </div>
          ))}
          {results.length === 0 && (
            <div style={{ color: T.muted, fontSize: 13, paddingTop: 10 }}>
              Ingen resultater for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
