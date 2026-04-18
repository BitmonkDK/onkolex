import { useState } from "react";
import { T } from "./theme.js";
import { EV } from "./data/evidence.js";
import { CANCERS } from "./data/cancer/index.js";
import { Sidebar } from "./components/Sidebar.jsx";
import { GlossaryPanel } from "./components/GlossaryPanel.jsx";
import { BiologyTab, OffLabelTab, SupplementsTab, BiomarkersTab, TrialsTab } from "./components/tabs/index.jsx";

const TABS = [
  { id: "bio", label: "🔬 Biologi",          color: T.amber  },
  { id: "med", label: "💊 Off-label",         color: T.blue   },
  { id: "sup", label: "🌿 Kosttilskud",       color: T.green  },
  { id: "bmk", label: "🧪 Biomarkører",       color: T.rose   },
  { id: "tri", label: "🏥 Kliniske studier",  color: T.purple },
];

export default function App() {
  const [activeCancerId, setActiveCancerId] = useState(CANCERS[0].id);
  const [activeSub,      setActiveSub]      = useState(CANCERS[0].groups[0].subtypes[0].id);
  const [activeTab,      setActiveTab]      = useState("bio");
  const [glossary,       setGlossary]       = useState(false);
  const [showCancerMenu, setShowCancerMenu] = useState(false);

  const cancer  = CANCERS.find(c => c.id === activeCancerId) || CANCERS[0];
  const allSubs = cancer.groups.flatMap(g => g.subtypes);
  const sub     = allSubs.find(s => s.id === activeSub) || allSubs[0];
  const grp     = cancer.groups.find(g => g.subtypes.some(s => s.id === activeSub));

  const selectCancer = (id) => {
    const c = CANCERS.find(x => x.id === id);
    if (!c) return;
    setActiveCancerId(id);
    setActiveSub(c.groups[0].subtypes[0].id);
    setActiveTab("bio");
    setShowCancerMenu(false);
  };

  const handleSelectSub = (id) => { setActiveSub(id); setActiveTab("bio"); };

  return (
    <div style={{ fontFamily:"'Segoe UI',system-ui,sans-serif", background:T.bg, minHeight:"100vh", color:T.text }}>

      {/* TOP BAR */}
      <div style={{ background:T.sidebar, padding:"11px 16px",
        display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>

        {/* Logo + navn */}
        <div style={{ display:"flex", alignItems:"center", gap:9, flexShrink:0 }}>
          <div style={{ width:34, height:34, borderRadius:10,
            background:"linear-gradient(135deg,#2060d8,#6040c0)",
            display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>
            🧬
          </div>
          <div>
            <div style={{ fontSize:16, fontWeight:800, color:"#ffffff", letterSpacing:-0.3 }}>
              Onkolex
            </div>
            <div style={{ fontSize:9, color:"#90b8e0", fontWeight:600, letterSpacing:2, textTransform:"uppercase" }}>
              Dansk Klinisk Kræftopslagsværk
            </div>
          </div>
        </div>

        {/* Separator */}
        <div style={{ width:1, height:30, background:"rgba(255,255,255,0.15)", flexShrink:0 }} />

        {/* Kræfttype-vælger */}
        <div style={{ position:"relative", flex:1 }}>
          <button onClick={() => setShowCancerMenu(v => !v)}
            style={{ background:"rgba(255,255,255,0.10)", border:"1px solid rgba(255,255,255,0.22)",
              borderRadius:8, padding:"7px 14px", color:"#ffffff", fontSize:13, fontWeight:600,
              cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:8 }}>
            <span>{cancer.icon}</span>
            {cancer.name}
            <span style={{ fontSize:10, opacity:0.6 }}>▼</span>
          </button>
          {showCancerMenu && (
            <div style={{ position:"absolute", top:"calc(100% + 6px)", left:0, zIndex:1000,
              background:T.surface, border:`1px solid ${T.border}`, borderRadius:10,
              boxShadow:"0 8px 32px rgba(26,40,72,0.18)", minWidth:230, overflow:"hidden" }}>
              {CANCERS.map(c => (
                <button key={c.id} onClick={() => selectCancer(c.id)}
                  style={{ width:"100%",
                    background: c.id === activeCancerId ? T.blueLight : "none",
                    border:"none", cursor:"pointer", fontFamily:"inherit",
                    padding:"10px 16px", textAlign:"left", fontSize:13,
                    fontWeight: c.id === activeCancerId ? 700 : 400,
                    color: c.id === activeCancerId ? T.blue : T.text,
                    display:"flex", alignItems:"center", gap:8 }}>
                  <span>{c.icon}</span>
                  {c.name}
                  <span style={{ fontSize:10, color:T.muted, marginLeft:"auto" }}>{c.icd10}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ fontSize:10, color:"#90b8e0", fontWeight:600,
          letterSpacing:1.5, textTransform:"uppercase", flexShrink:0 }}>
          {cancer.icd10} · {allSubs.length} subtyper
        </div>

        <button onClick={() => setGlossary(true)}
          style={{ display:"flex", alignItems:"center", gap:6,
            background:"rgba(255,255,255,0.12)", border:"1px solid rgba(255,255,255,0.25)",
            borderRadius:8, padding:"7px 13px", color:"#ffffff", fontSize:12, fontWeight:600,
            cursor:"pointer", fontFamily:"inherit", flexShrink:0 }}>
          📖 Ordbog
        </button>
      </div>

      {/* Luk menu ved klik udenfor */}
      {showCancerMenu && (
        <div style={{ position:"fixed", inset:0, zIndex:999 }}
          onClick={() => setShowCancerMenu(false)} />
      )}

      {/* TOOLTIP HINT */}
      <div style={{ background:T.blueLight, borderBottom:`1px solid ${T.blue}30`,
        padding:"7px 16px", fontSize:12, color:T.blue,
        display:"flex", alignItems:"center", gap:7 }}>
        <span>💡</span>
        <span>Ord med <span style={{ borderBottom:`1.5px dotted ${T.blue}`, fontWeight:700 }}>blå understregning</span> er forkortelser — hold musen over (pc) eller tryk (mobil) for forklaring på dansk.</span>
      </div>

      {/* HOVED-LAYOUT */}
      <div style={{ display:"grid", gridTemplateColumns:"215px 1fr",
        height:"calc(100vh - 92px)", overflow:"hidden" }}>

        <Sidebar cancer={cancer} activeSub={activeSub} onSelect={handleSelectSub} />

        <div style={{ overflowY:"auto", padding:"20px 24px", background:T.bg }}>

          {/* Subtype-header */}
          <div style={{ background:T.surface, borderRadius:12, padding:"20px 22px", marginBottom:14,
            border:`1px solid ${T.border}`, boxShadow:"0 2px 8px rgba(26,40,72,0.08)" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, flexWrap:"wrap" }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:grp?.color || T.rose }} />
                  <span style={{ fontSize:10, color:grp?.color||T.rose, fontWeight:700,
                    textTransform:"uppercase", letterSpacing:1.5 }}>{grp?.name}</span>
                </div>
                <h1 style={{ margin:"0 0 5px", fontSize:21, fontWeight:800, color:T.text, letterSpacing:-0.5 }}>
                  {sub.name}
                </h1>
                <div style={{ fontSize:12.5, color:T.muted, fontStyle:"italic" }}>
                  Kriterier: {sub.criteria}
                </div>
              </div>
              <span style={{ fontSize:11, fontWeight:700, color:T.white, background:sub.badgeColor,
                borderRadius:7, padding:"5px 13px", whiteSpace:"nowrap" }}>
                {sub.badge}
              </span>
            </div>
          </div>

          {/* Evidens-forklaring */}
          <div style={{ display:"flex", gap:7, marginBottom:14, flexWrap:"wrap" }}>
            {Object.values(EV).map((e, i) => (
              <div key={i} style={{ background:e.light, border:`1px solid ${e.color}30`,
                borderRadius:8, padding:"5px 11px", display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ color:e.color, fontSize:12 }}>{"★".repeat(e.n)}{"☆".repeat(3-e.n)}</span>
                <div>
                  <div style={{ fontSize:10, fontWeight:700, color:e.color }}>{e.label}</div>
                  <div style={{ fontSize:9.5, color:T.muted, maxWidth:170 }}>{e.full}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Faner */}
          <div style={{ display:"flex", gap:5, marginBottom:16, overflowX:"auto", paddingBottom:4 }}>
            {TABS.map(t => {
              const on = activeTab === t.id;
              return (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  style={{ background: on ? t.color : T.surface,
                    border: `1.5px solid ${on ? t.color : T.border}`,
                    borderRadius:8, padding:"8px 15px",
                    color: on ? T.white : T.muted,
                    fontSize:12.5, fontWeight: on ? 700 : 500,
                    cursor:"pointer", whiteSpace:"nowrap", fontFamily:"inherit",
                    boxShadow: on ? `0 2px 8px ${t.color}40` : "none" }}>
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Fane-indhold */}
          <div style={{ minHeight:400 }}>
            {activeTab === "bio" && <BiologyTab    data={sub.biology}      />}
            {activeTab === "med" && <OffLabelTab    items={sub.offLabel}    />}
            {activeTab === "sup" && <SupplementsTab items={sub.supplements} />}
            {activeTab === "bmk" && <BiomarkersTab  items={sub.biomarkers}  />}
            {activeTab === "tri" && <TrialsTab       items={sub.trials}     />}
          </div>
        </div>
      </div>

      {glossary && <GlossaryPanel onClose={() => setGlossary(false)} />}
    </div>
  );
}
