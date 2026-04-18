import { useState, useRef, useEffect } from "react";
import { ABBR } from "../data/abbreviations.js";
import { T } from "../theme.js";

// ─── AbbrTooltip ──────────────────────────────────────────────────────────────
// Viser en forklaring på en medicinsk forkortelse.
// Virker med hover på pc og tap på mobil.

export function AbbrTooltip({ term, definition }) {
  const [open, setOpen]   = useState(false);
  const wrapRef           = useRef(null);
  const isTouchRef        = useRef(false);

  // Luk tooltip ved klik/tap udenfor
  useEffect(() => {
    if (!open) return;
    const close = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown",  close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("mousedown",  close);
      document.removeEventListener("touchstart", close);
    };
  }, [open]);

  return (
    <span ref={wrapRef} style={{ position: "relative", display: "inline" }}>
      {/* Selve forkortelsen */}
      <span
        onMouseEnter={() => { if (!isTouchRef.current) setOpen(true);  }}
        onMouseLeave={() => { if (!isTouchRef.current) setOpen(false); }}
        onTouchStart={() => { isTouchRef.current = true; }}
        onClick={() => setOpen(v => !v)}
        style={{
          borderBottom: `1.5px dotted ${T.blue}`,
          color:  T.blue,
          cursor: "pointer",
          fontWeight: 700,
        }}
      >
        {term}
      </span>

      {/* Tooltip-boks */}
      {open && (
        <span style={{
          position: "absolute",
          bottom:   "calc(100% + 8px)",
          left:     "50%",
          transform:"translateX(-50%)",
          background: T.text,
          border:   `1.5px solid ${T.blue}`,
          borderRadius: 10,
          padding:  "11px 14px",
          width:    260,
          zIndex:   9999,
          boxShadow:"0 8px 32px rgba(26,40,72,0.2)",
          display:  "block",
          pointerEvents: "none",
        }}>
          <span style={{ display:"block", fontSize:12, fontWeight:800, color:T.blue, marginBottom:5 }}>
            {term}
          </span>
          <span style={{ display:"block", fontSize:12, color:"#eef2f8", lineHeight:1.65 }}>
            {definition}
          </span>
          <span style={{ display:"block", fontSize:10, color:"#8aa4c4", marginTop:6 }}>
            💡 Tryk et andet sted for at lukke
          </span>
        </span>
      )}
    </span>
  );
}

// ─── SmartText ────────────────────────────────────────────────────────────────
// Tager en tekststreng og wrapper automatisk kendte forkortelser i AbbrTooltip.
// Brug: <SmartText>{en tekst med AMPK og mTOR og PIK3CA}</SmartText>

const ABBR_KEYS  = Object.keys(ABBR).sort((a, b) => b.length - a.length);
const ABBR_REGEX = new RegExp(
  `(${ABBR_KEYS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
  "g"
);

export function SmartText({ children }) {
  if (typeof children !== "string") return <>{children}</>;

  const parts = [];
  let last = 0;
  let m;
  ABBR_REGEX.lastIndex = 0;

  while ((m = ABBR_REGEX.exec(children)) !== null) {
    if (m.index > last) parts.push(children.slice(last, m.index));
    parts.push(
      <AbbrTooltip key={m.index} term={m[0]} definition={ABBR[m[0]]} />
    );
    last = m.index + m[0].length;
  }
  if (last < children.length) parts.push(children.slice(last));

  return <>{parts}</>;
}
