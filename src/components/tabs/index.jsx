import { T, LEVEL_COLORS } from "../../theme.js";
import { SmartText } from "../SmartText.jsx";
import { Stars } from "../Stars.jsx";
import { EV } from "../../data/evidence.js";

// ─── BiologyTab ───────────────────────────────────────────────────────────────
export function BiologyTab({ data }) {
  return (
    <div>
      {/* Sammenfatning */}
      <div style={{
        background: T.blueLight, borderRadius: 10,
        padding: "16px 18px", marginBottom: 18,
        borderLeft: `4px solid ${T.blue}`,
      }}>
        <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.9, color: T.text }}>
          <SmartText>{data.summary}</SmartText>
        </p>
      </div>

      {/* Signalveje */}
      <SectionHead icon="⚡" title="Signalveje og energistofskifte" color={T.amber} />
      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 22 }}>
        {data.pathways.map((p, i) => {
          const l = LEVEL_COLORS[p.level] || LEVEL_COLORS["Lav"];
          return (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr 2fr auto",
              gap: 10, alignItems: "start",
              background: T.surface, borderRadius: 8,
              padding: "10px 14px", border: `1px solid ${T.border}`,
            }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: T.text }}>
                <SmartText>{p.name}</SmartText>
              </div>
              <div style={{ fontSize: 12, color: T.muted2, lineHeight: 1.5 }}>
                <SmartText>{p.role}</SmartText>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: l.c, background: l.bg,
                borderRadius: 4, padding: "2px 8px", whiteSpace: "nowrap",
                border: `1px solid ${l.c}20`,
              }}>
                {p.level}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mutationer */}
      <SectionHead icon="🧬" title="Hyppige drivermutationer" color={T.blue} />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
        {data.mutations.map((m, i) => (
          <span key={i} style={{
            background: T.blueLight, color: T.blue, borderRadius: 5,
            padding: "5px 12px", fontSize: 12, fontWeight: 600,
            border: `1px solid ${T.blue}30`,
          }}>
            <SmartText>{m}</SmartText>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── OffLabelTab ──────────────────────────────────────────────────────────────
export function OffLabelTab({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {items.map((med, i) => (
        <div key={i} style={{
          background: T.surface, borderRadius: 10,
          padding: "18px 20px", border: `1px solid ${T.border}`,
          boxShadow: "0 1px 4px rgba(26,40,72,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
            <div style={{ fontSize: 15, fontWeight: 800, color: T.text }}>{med.name}</div>
            <Stars level={med.ev} />
          </div>

          <FieldLabel>Virkningsmekanisme</FieldLabel>
          <div style={{ fontSize: 13, color: T.text2, lineHeight: 1.8, marginBottom: 12 }}>
            <SmartText>{med.mech}</SmartText>
          </div>

          <FieldLabel>Klinisk note</FieldLabel>
          <div style={{ fontSize: 12.5, color: T.muted2, lineHeight: 1.7, marginBottom: 12 }}>
            <SmartText>{med.note}</SmartText>
          </div>

          <Warning><SmartText>{med.inter}</SmartText></Warning>

          <a href={med.url} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: T.blue, textDecoration: "none", fontWeight: 600 }}>
            🔬 PubMed referencer →
          </a>
        </div>
      ))}
    </div>
  );
}

// ─── SupplementsTab ───────────────────────────────────────────────────────────
export function SupplementsTab({ items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {items.map((s, i) => (
        <div key={i} style={{
          background: T.surface, borderRadius: 10,
          padding: "16px 18px", border: `1px solid ${T.border}`,
          boxShadow: "0 1px 4px rgba(26,40,72,0.06)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{ fontSize: 14, fontWeight: 800, color: T.text }}>{s.name}</span>
            <Stars level={s.ev} />
          </div>
          <div style={{ fontSize: 12, color: T.green, fontWeight: 600, marginBottom: 7 }}>
            💊 Dosis: {s.dose}
          </div>
          <div style={{ fontSize: 12.5, color: T.text2, lineHeight: 1.7, marginBottom: 8 }}>
            <SmartText>{s.mech}</SmartText>
          </div>
          <Warning><SmartText>{s.inter}</SmartText></Warning>
        </div>
      ))}
    </div>
  );
}

// ─── BiomarkersTab ────────────────────────────────────────────────────────────
export function BiomarkersTab({ items }) {
  return (
    <div>
      <div style={{
        background: T.roseLight, borderRadius: 8,
        padding: "11px 14px", marginBottom: 14,
        border: `1px solid ${T.rose}30`,
        fontSize: 12.5, color: T.rose, lineHeight: 1.7,
      }}>
        💡 Spørg din onkolog om disse tests — de kan åbne for behandlingsmuligheder du ellers ikke ville få.
        Tests med <strong>rød markering</strong> er kritiske at bestille ved diagnose.
      </div>

      {items.map((b, i) => (
        <div key={i} style={{
          background: T.surface, borderRadius: 8,
          padding: "12px 15px", marginBottom: 8,
          border: `1px solid ${b.crit ? T.rose + "50" : T.border}`,
          borderLeft: `4px solid ${b.crit ? T.rose : T.border}`,
          boxShadow: "0 1px 3px rgba(26,40,72,0.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: b.crit ? T.rose : T.text }}>
              <SmartText>{b.name}</SmartText>
            </span>
            {b.crit && (
              <span style={{
                fontSize: 9, fontWeight: 800, color: "#fff",
                background: T.rose, borderRadius: 3,
                padding: "2px 6px", textTransform: "uppercase",
              }}>Kritisk</span>
            )}
          </div>
          <div style={{ fontSize: 12.5, color: T.muted2, lineHeight: 1.6 }}>
            <SmartText>{b.why}</SmartText>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── TrialsTab ────────────────────────────────────────────────────────────────
const STATUS_COLOR = {
  "Rekrutterer":        T.green,
  "Igangværende":       T.blue,
  "Afsluttet":          T.muted,
  "Positiv — afsluttet":T.green,
  "Data tilgængelig":   T.amber,
  "–":                  T.muted,
};

export function TrialsTab({ items }) {
  return (
    <div>
      <div style={{
        background: T.surface2, borderRadius: 8,
        padding: "11px 14px", marginBottom: 14,
        fontSize: 12.5, color: T.muted2, lineHeight: 1.7,
        border: `1px solid ${T.border}`,
      }}>
        Klik på et studie for at åbne det direkte på ClinicalTrials.gov — du kan se inklusionskriterier og finde den nærmeste deltagende klinik.
      </div>

      {items.map((t, i) => (
        <a key={i} href={t.url} target="_blank" rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: T.surface, borderRadius: 8,
            padding: "14px 16px", border: `1px solid ${T.border}`,
            marginBottom: 8, boxShadow: "0 1px 3px rgba(26,40,72,0.05)",
          }}
        >
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginBottom: 6 }}>{t.name}</div>
            <div style={{ display: "flex", gap: 7 }}>
              <Badge color={T.blue}>{t.phase}</Badge>
              <Badge color={STATUS_COLOR[t.status] || T.muted}>{t.status}</Badge>
            </div>
          </div>
          <span style={{ color: T.blue, fontSize: 18, marginLeft: 12 }}>→</span>
        </a>
      ))}
    </div>
  );
}

// ─── Delte hjælpekomponenter ──────────────────────────────────────────────────
function SectionHead({ icon, title, color }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <span>{icon}</span>
      <h3 style={{ margin: 0, fontSize: 12, fontWeight: 700, color, textTransform: "uppercase", letterSpacing: 0.8 }}>
        {title}
      </h3>
    </div>
  );
}

function FieldLabel({ children }) {
  return (
    <div style={{ fontSize: 10.5, color: T.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 5 }}>
      {children}
    </div>
  );
}

function Warning({ children }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 7,
      background: T.amberLight, borderRadius: 7,
      padding: "9px 12px", marginBottom: 12,
      border: `1px solid ${T.amber}30`,
    }}>
      <span style={{ fontSize: 14 }}>⚠️</span>
      <div style={{ fontSize: 12, color: T.amber, lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}

function Badge({ color, children }) {
  return (
    <span style={{
      fontSize: 10, background: `${color}15`, color,
      borderRadius: 4, padding: "2px 8px", fontWeight: 700,
    }}>
      {children}
    </span>
  );
}
