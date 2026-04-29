import React, { useState, useRef, useEffect } from "react";

// ─── MEDICINSK ORDBOG ─────────────────────────────────────────────────────────
const ABBR = {
  "ER":      "Estrogen Receptor — protein on cancer cells that binds estrogen and drives growth.",
  "PR":      "Progesterone Receptor — similar to ER but binds progesterone.",
  "HR+":     "Hormone Receptor-positive — the tumor has ER and/or PR. Can be treated with hormone-suppressing medication.",
  "HER2":    "Human Epidermal growth factor Receptor 2 — protein driving aggressive cell growth. Overexpressed in ~20% of breast cancer. Can be targeted with trastuzumab (Herceptin).",
  "TNBC":    "Triple-Negative Breast Cancer — neither ER, PR nor HER2 are positive. Hardest to treat.",
  "Ki-67":   "Protein measuring cell division rate. The higher %, the faster the tumor grows. Under 14% = slow growth.",
  "mTOR":    "Signaling protein acting as the cell's growth accelerator. Inhibited by metformin among others.",
  "AMPK":    "Enzyme acting as the cell's energy sensor. Activated by metformin and slows cancer cell growth.",
  "PI3K":    "Signaling protein activating cell growth. Frequently mutated in cancer.",
  "PIK3CA":  "Gene encoding PI3K. Mutation in ~45% of breast cancer — opens for treatment with alpelisib.",
  "PTEN":    "Tumor-suppressing gene that brakes PI3K. Loss leads to uncontrolled growth.",
  "BRCA1":   "Gene that repairs DNA damage. Mutation increases risk of breast and ovarian cancer and is hereditary.",
  "BRCA2":   "Sister gene to BRCA1 with similar DNA repair function.",
  "BRCA1/2": "Collective term for hereditary cancer risk genes BRCA1 and BRCA2.",
  "PARP":    "Enzyme helping cells repair DNA. PARP inhibitors (e.g. olaparib) block this.",
  "PD-L1":   "Protein on cancer cell surface that camouflages them from the immune system. Can be blocked with immunotherapy.",
  "TIL":     "Tumor-Infiltrating Lymphocytes — immune cells fighting inside the tumor.",
  "TMB":     "Tumor Mutational Burden — number of mutations in the tumor. High TMB gives better immunotherapy response.",
  "MSI-H":   "High Microsatellite Instability — many errors in DNA repair. Good candidate for immunotherapy.",
  "HRD":     "Homologous Recombination Deficiency — faulty DNA repair. Opens for PARP inhibitors.",
  "EGFR":    "Epidermal Growth Factor Receptor — receptor stimulating cell growth. Targetable mutation in lung cancer.",
  "KRAS":    "One of the most common oncogenes in cancer. Mutated in ~95% of pancreatic cancer and ~40% of colorectal cancer.",
  "BRAF":    "Signaling protein in the MAPK pathway. BRAF V600E mutation is targetable with dabrafenib.",
  "ALK":     "Gene that can fuse and drive cancer growth. Targetable in ~5% of lung cancer with alectinib.",
  "OXPHOS":  "Oxidative Phosphorylation — the cell's normal energy production via mitochondria. Opposite of Warburg effect.",
  "VEGF":    "Vascular Endothelial Growth Factor — protein stimulating formation of new blood vessels to the tumor.",
  "NF-κB":   "Transcription factor activating inflammation genes and inhibiting cell death. Frequently overactivated in cancer.",
  "COX-2":   "Enzyme producing pro-inflammatory substances. Inhibited by aspirin and celecoxib.",
  "eGFR":    "Estimated Glomerular Filtration Rate — blood test measuring kidney function. Metformin requires eGFR > 30.",
  "IHC":     "Immunohistochemistry — laboratory method using antibodies to detect proteins in tissue samples.",
  "FISH":    "Fluorescence In Situ Hybridization — method to confirm gene amplification e.g. HER2.",
  "ctDNA":   "Circulating tumor DNA in the bloodstream — enables blood test-based cancer monitoring.",
  "pCR":     "Pathological Complete Response — no living cancer cells seen after treatment. Very good sign.",
  "LFT":     "Liver Function Tests — blood tests measuring whether the liver is functioning normally.",
  "EKG":     "Electrocardiogram — measurement of the heart's electrical activity. Required before certain medications.",
  "QT":      "QT interval on ECG. Prolonged QT can cause dangerous heart rhythm disturbance.",
  "HCQ":     "Hydroxychloroquine — antimalarial drug that blocks cellular waste management (autophagy).",
  "LDN":     "Low Dose Naltrexone — naltrexone in low dose (3–4.5 mg). Used for immune modulation.",
  "TP53":    "Tumor Protein 53 — guardian of the genome. Mutated in many aggressive cancers.",
  "MYC":     "Oncogene driving massive cell proliferation. Amplified in aggressive cancers.",
  "CDK4/6":  "Enzymes driving cell division rate. Inhibitors (palbociclib, ribociclib) are standard in HR+ breast cancer.",
  "FASN":    "Fatty Acid Synthase — enzyme producing fatty acids for cancer cell membranes.",
  "GLUT1":   "Glucose Transporter 1 — massively overexpressed in many Warburg-dependent cancers.",
  "HIF-1α":  "Hypoxia-Inducible Factor — protein activated by oxygen deprivation, driving aggressive cancer behavior.",
  "PAK1":    "Signaling protein promoting cancer cell division. Ivermectin's primary target.",
  "WNT":     "Signaling pathway controlling stem cell properties and cell division. Overactivated in aggressive cancer cells.",
  "AR":      "Androgen Receptor — binds male sex hormones. Drives prostate cancer.",
  "VDR":     "Vitamin D Receptor — binds vitamin D and regulates cell growth.",
  "G6PD":    "Glucose-6-Phosphate Dehydrogenase — deficiency is a contraindication for IV vitamin C.",
  "MGMT":    "DNA repair gene. Methylated MGMT = better response to temozolomide in glioblastoma.",
  "IDH1":    "Isocitrate dehydrogenase 1 — mutation gives better prognosis in brain tumors.",
  "IDH2":    "Isocitrate dehydrogenase 2 — sister gene to IDH1.",
  "BCR-ABL": "Fusion protein in CML created by the Philadelphia chromosome. Imatinib is the direct antidote.",
  "BTK":     "Bruton Tyrosine Kinase — drives B-cell leukemia. Blocked by ibrutinib.",
  "BCL-2":   "Anti-apoptotic protein preventing cancer cell suicide. Blocked by venetoclax.",
  "PDAC":    "Pancreatic Ductal Adenocarcinoma — accounts for ~90% of pancreatic cancer.",
  "HGSOC":   "High-Grade Serous Ovarian Carcinoma — the most common and aggressive form.",
  "GBM":     "Glioblastoma Multiforme — the most aggressive primary brain tumor.",
  "NSCLC":   "Non-Small Cell Lung Cancer — ~85% of all lung cancer cases.",
  "SCLC":    "Small Cell Lung Cancer — ~15% of lung cancer. Extremely aggressive.",
  "RCT":     "Randomized Controlled Trial — the gold standard in medical research.",
  "OS":      "Overall Survival — total survival. The most important clinical measure.",
  "PFS":     "Progression-Free Survival — time until disease worsens.",
  "DFS":     "Disease-Free Survival — disease-free survival after treatment.",
  "CCND1":   "Cyclin D1 gene. Amplification drives excessive cell division.",
  "RB1":     "Retinoblastoma 1 — tumor-suppressing gene that brakes cell division.",
  "2-HG":    "2-Hydroxyglutarate — metabolite produced by IDH-mutated tumor cells.",
};
const ABBR_KEYS  = Object.keys(ABBR).sort((a, b) => b.length - a.length);
const ABBR_REGEX = new RegExp(
  "(" + ABBR_KEYS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")",
  "g"
);

function AbbrTooltip({ term, definition }) {
  const [open, setOpen] = useState(false);
  const isTouch = useRef(false);

  useEffect(() => {
    if (!open) return;
    const close = e => {
      if (!e.target.closest("[data-abbr-modal]")) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [open]);

  return (
    <span style={{ position: "relative", display: "inline" }}>
      <span
        onMouseEnter={() => { if (!isTouch.current) setOpen(true); }}
        onMouseLeave={() => { if (!isTouch.current) setOpen(false); }}
        onTouchStart={() => { isTouch.current = true; }}
        onClick={e => { e.stopPropagation(); setOpen(v => !v); }}
        style={{ borderBottom: "1.5px dotted #5b8db8", color: "#5b8db8", cursor: "pointer", fontWeight: 700 }}
      >{term}</span>
      {open && (
        <>
          <span
            style={{
              position: "fixed", inset: 0, zIndex: 99990,
              background: "rgba(0,0,0,0.35)",
              display: "block",
            }}
            onClick={() => setOpen(false)}
          />
          <span
            data-abbr-modal="1"
            style={{
              position: "fixed",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#2e2a4a", border: "1.5px solid #5b8db8",
              borderRadius: 14, padding: "20px 20px 16px",
              width: "min(90vw, 320px)", zIndex: 99999,
              boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
              display: "flex", flexDirection: "column", gap: 10,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 800, color: "#5b8db8" }}>{term}</span>
            <span style={{ fontSize: 13, color: "#c4b8ea", lineHeight: 1.7 }}>{definition}</span>
            <span
              onClick={() => setOpen(false)}
              style={{
                display: "block", textAlign: "center",
                fontSize: 12, color: "#8c87a8",
                marginTop: 4, cursor: "pointer",
                paddingTop: 10, borderTop: "1px solid rgba(255,255,255,0.08)",
              }}
            >Tap to close ✕</span>
          </span>
        </>
      )}
    </span>
  );
}

function ST({ children }) {
  if (typeof children !== "string") return <>{children}</>;
  const parts = []; let last = 0; let m;
  ABBR_REGEX.lastIndex = 0;
  while ((m = ABBR_REGEX.exec(children)) !== null) {
    if (m.index > last) parts.push(children.slice(last, m.index));
    parts.push(<AbbrTooltip key={m.index} term={m[0]} definition={ABBR[m[0]]} />);
    last = m.index + m[0].length;
  }
  if (last < children.length) parts.push(children.slice(last));
  return <>{parts}</>;
}


// ─── PROTOKOL-BØGER ───────────────────────────────────────────────────────────
const BOOKS = [
  { id:"mclelland", cover:"📕", title:"How to Starve Cancer", subtitle:"…without starving yourself",
    author:"Jane McLelland", year:2018, isbn:"978-1916009462",
    amazon:"https://www.amazon.co.uk/How-Starve-Cancer-Without-Feeding/dp/1916009468",
    website:"https://www.janemc.com", controversy:false, hasMetroMap:true,
    summary:"Jane McLelland fik livmoderhalskræft stadium IV i 1999 og overlevede mod alle odds. Da kræften slog tilbage som leukæmi udviklede hun selv et protokol baseret på repurposed lægemidler der sulter kræftceller ved at blokere alle brændstofkilder simultant.",
    approach:"McLelland's Metro Map maps cancer cells' metabolic dependencies: Glucose via Metformin and DCA. Glutamine via Mebendazole and Doxycycline. Fat via Statins. Autophagy via Hydroxychloroquine. Inflammation via Aspirin, Celecoxib and Curcumin. Immunosuppression via Cimetidine and LDN. Metastasis via Dipyridamole and Propranolol.",
    keyDrugs:["Metformin","Mebendazol","Doxycyclin","Statiner","Hydroxychloroquin","Cimetidin","Dipyridamol","Aspirin","DCA","LDN","Alpha-liponsyre","Celecoxib","Propranolol"],
    warning:"McLelland emphasizes that the protocol is adjuvant — supplementary to conventional treatment. Should be implemented in consultation with an oncologist open to repurposing." },
  { id:"clark", cover:"📗", title:"The Cure for All Cancers", subtitle:"Including over 100 Case Histories",
    author:"Hulda Regehr Clark, Ph.D.", year:1993, isbn:"978-0963632807",
    amazon:"https://www.amazon.com/Cure-All-Cancers-Hulda-Clark/dp/1890035017",
    controversy:true, hasMetroMap:false,
    summary:"Hulda Clark (1928–2009) claimed that cancer is caused by parasites combined with environmental toxins. Her protocol is controversial and the theory is not scientifically validated. Two of the components — artemisinin and juglone — do however have independent legitimate research behind them.",
    approach:"Three-component parasite cleanse: Black walnut hull oil (juglone), Wormwood (artemisinin-related compounds) and Cloves (eugenol inhibits COX-2).",
    keyDrugs:["Artemisinin/Wormwood","Sort Valnødskalle (juglone)","Nellike (eugenol)"],
    warning:"Clark's parasite theory is not scientifically validated. The book should NEVER replace conventional treatment." },
  { id:"tippens", cover:"📘", title:"My Cancer Story Rocks", subtitle:"Fenbendazol-protokollen",
    author:"Joe Tippens (blog)", year:2019,
    website:"https://www.mycancerstory.rocks",
    amazon:"https://www.amazon.com/s?k=joe+tippens+fenbendazole",
    controversy:false, hasMetroMap:false,
    summary:"Joe Tippens was diagnosed with stage IV small cell lung cancer in 2016 with 3 months expected survival. An acquaintance recommended Fenbendazole — a veterinary anthelmintic. Combined with supplements he achieved complete remission documented by scans.",
    approach:"Fenbendazole 222 mg x 3 days ON, 4 days OFF (cyclic). Combined with: Vitamin E succinate 800 mg/day, Curcumin 600 mg/day, CBD oil sublingually.",
    keyDrugs:["Fenbendazol (Panacur)","Vitamin E Succinat","Curcumin","CBD olie"],
    warning:"Joe Tippens is a single case report and does not constitute clinical evidence alone. The case has however triggered legitimate clinical studies." },
  { id:"christofferson", cover:"📙", title:"Tripping over the Truth",
    subtitle:"How the Metabolic Theory of Cancer Is Overturning One of Medicine's Most Entrenched Paradigms",
    author:"Travis Christofferson", year:2014,
    amazon:"https://www.amazon.com/Tripping-over-Truth-Overturning-Entrenched/dp/1603587292",
    controversy:false, hasMetroMap:false,
    summary:"Travis Christofferson tells the story behind the metabolic cancer theory — from Otto Warburg's discovery in the 1920s to modern research. A highly readable overview of why cancer may primarily be a metabolic disease.",
    approach:"The book explains the Warburg effect and argues that metabolic interventions — ketogenic diet, DCA, metformin and fasting — can starve cancer cells.",
    keyDrugs:["DCA (Dichloroacetat)","Metformin","Ketogen kost","Faste/kalorirestriktion"],
    warning:"The book is journalistic not medical. Metabolic interventions should always be coordinated with the treating oncologist." },
  { id:"winters", cover:"📒", title:"The Metabolic Approach to Cancer",
    subtitle:"Integrating Deep Nutrition, the Ketogenic Diet, and Nontoxic Bio-Individualized Therapies",
    author:"Nasha Winters og Jess Higgins Kelley", year:2017,
    amazon:"https://www.amazon.com/Metabolic-Approach-Cancer-Nontoxic-Bio-Individualized/dp/1603587012",
    website:"https://www.metabolicterrain.com", controversy:false, hasMetroMap:false,
    summary:"Nasha Winters is a naturopathic oncologist who herself survived stage IV ovarian cancer in 1991. The book combines metabolic therapy with epigenetics and supplements in a practical protocol.",
    approach:"Winters' Terrain Ten model evaluates ten biological factors: blood sugar and insulin, immune function, inflammation, gut microbiome, toxin burden, hormones, stress, mitochondrial function, angiogenesis and genetic factors.",
    keyDrugs:["Ketogen kost","Metformin","Berberine","Curcumin","Artemisinin","Melatonin (højdosis)","Vitamin D3","Boswellia"],
    warning:"Ketogenic diet during chemotherapy requires close medical supervision." },
  { id:"seyfried", cover:"📓", title:"Cancer as a Metabolic Disease",
    subtitle:"On the Origin, Management, and Prevention of Cancer",
    author:"Thomas N. Seyfried", year:2012,
    amazon:"https://www.amazon.com/Cancer-Metabolic-Disease-Management-Prevention/dp/0470584920",
    controversy:false, hasMetroMap:false,
    summary:"Thomas Seyfried is a professor of biology at Boston College and the academic cornerstone behind the metabolic cancer theory. The book documents that cancer is primarily a mitochondrial metabolic disease.",
    approach:"Seyfried's Press-Pulse strategy: sustained metabolic stress via ketogenic diet and caloric restriction combined with periodic pulses via DCA and other metabolic attackers.",
    keyDrugs:["Ketogen kost + kalorirestriktion","DCA (Dichloroacetat)","Metformin","Hyperbars ilt (HBO)","Glutamin-blokade"],
    warning:"Academic reference book — not intended as a self-treatment guide. The Press-Pulse protocol requires medical supervision." },
  { id:"servan", cover:"📔", title:"Anticancer: A New Way of Life", subtitle:"",
    author:"David Servan-Schreiber", year:2007,
    amazon:"https://www.amazon.com/Anticancer-New-Way-Life/dp/0670021644",
    controversy:false, hasMetroMap:false,
    summary:"David Servan-Schreiber var fransk hjerneforsker og psykiater der selv fik hjernetumor. Bogen er solgt i over 3 millioner eksemplarer på 35 sprog og handler om livsstilsfaktorers rolle.",
    approach:"Focus on four life areas: Anti-cancer diet (omega-3, green tea, turmeric, broccoli, pomegranate), stress reduction, regular exercise and elimination of environmental toxins.",
    keyDrugs:["Omega-3 (EPA/DHA)","Grøn te (EGCG)","Curcumin/Gurkemeje","Sulforafan (broccoli)","Granatæble","Melatonin"],
    warning:"The book is primarily about lifestyle and diet as adjuvant support — solely supplementary to conventional treatment." },
  { id:"fung", cover:"📃", title:"The Cancer Code",
    subtitle:"A Revolutionary New Understanding of a Medical Mystery",
    author:"Jason Fung", year:2020,
    amazon:"https://www.amazon.com/Cancer-Code-Revolutionary-Understanding-Medical/dp/0062894005",
    controversy:false, hasMetroMap:false,
    summary:"Jason Fung is a Canadian nephrologist and bestselling author. One of the most readable overviews of cancer as a metabolic disease — perfect for patients who want to understand the biological background.",
    approach:"Fung argues that cancer is best understood as a problem with cell signaling and metabolism. Fasting, insulin reduction and ketogenic diet are central strategies.",
    keyDrugs:["Intermitterende faste","Ketogen kost","Metformin","Insulinreduktion (lav-kulhydrat kost)"],
    warning:"Fasting protocols during active cancer treatment require medical approval." },,
  { id:"raymond", cover:"📗", title:"Never Fear Cancer Again", subtitle:"How to Prevent and Reverse Cancer",
    author:"Raymond Francis", year:2011, isbn:"978-0757315367",
    amazon:"https://www.amazon.com/Never-Fear-Cancer-Again-Prevent/dp/0757315364",
    website:"https://www.beyondhealth.com", controversy:false, hasMetroMap:false,
    summary:"Raymond Francis is an MIT-trained biochemist and founder of the Beyond Health movement. His core thesis is radically simple: cancer is not a random disease but the result of cells that are not functioning properly — and this can be corrected. The book presents a systematic model for cancer prevention and reversal based on six disease pathways.",
    approach:"Francis' Six Pathways model identifies the root causes of all disease: Nutrition (deficiency of required nutrients), Toxins (environmental toxins disrupting cell biology), Psychology (chronic stress and negative thought patterns), Genetics (epigenetic regulation rather than fate), Medical care (iatrogenic harm from over-medication), Epigenetics (how lifestyle activates or deactivates cancer genes).",
    keyDrugs:["Curcumin","Vitamin D","Omega-3","Green Tea (EGCG)","Selenium","Probiotics"],
    warning:"Francis is a biochemist, not a physician. The book is a supplement to — not a replacement for — conventional cancer treatment." }
];

const METRO_LINES = [
  { id:"glucose", label:"Glukose-pathway", color:"#e06060", bg:"#fdf2f2",
    desc:"Cancer cells depend on glucose as the primary energy source — the so-called Warburg effect.",
    drugs:[
      {name:"Metformin",note:"Blocks mitochondrial complex I and GLUT transporters. The cornerstone of McLelland's protocol.",studies:"37261084,32860850"},
      {name:"DCA",note:"Reverses the Warburg effect: forces cancer cells from glycolysis back to normal mitochondrial respiration.",studies:"17051984,21383728"},
    ]},
  { id:"glutamine", label:"Glutamin-pathway", color:"#7b6fa0", bg:"#f0edf8",
    desc:"Glutamine is cancer cells' secondary fuel.",
    drugs:[
      {name:"Mebendazol",note:"Anthelmintic with identical tubulin mechanism to taxanes.",studies:"31886060,25541231"},
      {name:"Fenbendazol",note:"Chemical sister to mebendazole. Activates p53 tumor suppressor mutated in ~50% of all cancer types.",studies:"29097407,33602073"},
      {name:"Doxycyclin",note:"Antibiotic that shuts down the mitochondrial power plant in cancer cells.",studies:"28034920,31485045"},
    ]},
  { id:"fat", label:"Fedt-pathway", color:"#b8904a", bg:"#fdf6e8",
    desc:"Cancer cells can synthesize and burn fat as alternative fuel. Statins block cholesterol and lipid production.",
    drugs:[
      {name:"Statiner",note:"Lipophilic statin (simvastatin/lovastatin) preferred. Taken in the evening.",studies:"28456308,30213800"},
      {name:"Itraconazol",note:"Antifungal with anti-angiogenic effect via VEGFR2/AKT/mTOR inhibition.",studies:"24218511,28034920"},
    ]},
  { id:"autophagy", label:"Autopagi-flugt", color:"#4a8c84", bg:"#eaf5f3",
    desc:"Autophagy is cancer cells' emergency exit under stress from chemotherapy.",
    drugs:[
      {name:"Hydroxychloroquin (HCQ)",note:"Antimalarial drug. Alkalinizes lysosomes and blocks autophagy.",studies:"30337160,31886060"},
      {name:"Klorokin",note:"Stronger version of HCQ with more potent autophagy inhibition.",studies:"30337160,17051984"},
    ]},
  { id:"inflammation", label:"Inflammation", color:"#5a8a6e", bg:"#eef6f1",
    desc:"Chronic inflammation is cancer cells' growth environment.",
    drugs:[
      {name:"Aspirin",note:"Reduces inflammation and inhibits platelets that help tumor cells metastasize.",studies:"28830014,23680940"},
      {name:"Celecoxib",note:"Selective COX-2 inhibitor. Stronger than aspirin.",studies:"12750098,28830014"},
      {name:"Curcumin",note:"Natural NF-κB and COX-2 inhibitor. Take with piperine or as liposomal form.",studies:""},
    ]},
  { id:"immune", label:"Immunsuppression", color:"#5b8db8", bg:"#eef4fb",
    desc:"Cancer cells actively suppress the immune system to hide themselves.",
    drugs:[
      {name:"Cimetidin",note:"Gammel mavesyremedicin med anti-metastase-effekt. Blokerer kræftcellers adhesionsmolekyler.",studies:"15481946,1493299"},
      {name:"LDN",note:"Low dose naltrexone (1.5–4.5 mg). Taken at night. NEVER combine with opioids.",studies:"28935922,20150494"},
    ]},
  { id:"metastasis", label:"Metastase", color:"#c47858", bg:"#fdf0eb",
    desc:"Metastasis requires cancer cells to detach and adhere to new sites.",
    drugs:[
      {name:"Dipyridamol",note:"Blood-thinning medication. Adenosine boost inhibits tumor cell growth and invasiveness.",studies:"28458121,2144290"},
      {name:"Propranolol",note:"Beta-blocker. Blocks adrenaline/noradrenaline's activation of beta-receptors on cancer cells.",studies:"27062194,29320737"},
    ]},
];

function MetroMap() {
  const [open, setOpen] = useState(null);
  return (
    <div style={{marginTop:24}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:16}}>
        <div style={{width:38,height:38,borderRadius:"50%",background:"linear-gradient(135deg,#6b5fa8,#5b8db8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🗺️</div>
        <div>
          <div style={{fontSize:15,fontWeight:700,color:"#2a2640",letterSpacing:-0.3}}>McLellands Metro Map</div>
          <div style={{fontSize:11,color:"#5a5370",marginTop:1}}>Kræftcellernes brændstofveje og blokader — klik på en linje for at se præparaterne</div>
        </div>
      </div>
      <div style={{background:"#2e2a4a",borderRadius:14,padding:16,marginBottom:10}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
          {METRO_LINES.map(line => (
            <button key={line.id} onClick={() => setOpen(open===line.id?null:line.id)}
              style={{background:open===line.id?line.bg:"rgba(255,255,255,0.06)",border:"1.5px solid "+(open===line.id?line.color+"80":"rgba(255,255,255,0.1)"),borderRadius:10,padding:"10px 13px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.2s"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:11,height:11,borderRadius:"50%",background:line.color,flexShrink:0}} />
                <span style={{fontSize:12,fontWeight:600,color:open===line.id?line.color:"rgba(255,255,255,0.85)"}}>{line.label}</span>
                <span style={{marginLeft:"auto",fontSize:10,color:open===line.id?line.color:"rgba(255,255,255,0.4)"}}>{line.drugs.length} {open===line.id?"▲":"▼"}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {open && (() => {
        const line = METRO_LINES.find(l => l.id===open);
        return (
          <div style={{background:line.bg,border:"1.5px solid "+line.color+"50",borderLeft:"4px solid "+line.color,borderRadius:12,padding:"16px 18px",marginBottom:10}}>
            <div style={{fontSize:13,color:"#5a5370",lineHeight:1.75,marginBottom:14}}>{line.desc}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {line.drugs.map((drug,i) => (
                <div key={i} style={{background:"white",borderRadius:9,padding:"12px 15px",border:"1px solid "+line.color+"25",display:"flex",gap:10,alignItems:"flex-start"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:line.color,flexShrink:0,marginTop:5}} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#2a2640",marginBottom:3}}>{drug.name}</div>
                    <div style={{fontSize:12,color:"#5a5370",lineHeight:1.65}}>{drug.note}</div>
                    {drug.studies && (
                      <div style={{display:"flex",gap:4,marginTop:6,flexWrap:"wrap"}}>
                        {drug.studies.split(",").map(p => p.trim() && (
                          <a key={p} href={"https://pubmed.ncbi.nlm.nih.gov/"+p.trim()+"/"} target="_blank" rel="noopener noreferrer"
                            style={{fontSize:10,color:"#5b8db8",background:"#eef4fb",padding:"1px 6px",borderRadius:4,textDecoration:"none",border:"1px solid #b8d0e8"}}>{p.trim()} ↗</a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}
      <div style={{background:"#fdf6e8",border:"1px solid #e0c88a",borderRadius:9,padding:"11px 15px",fontSize:12,color:"#7a6030",lineHeight:1.65}}>
        The Metro Map principle: Cancer cells can switch fuel source if one pathway is blocked. McLelland's strategy is to block ALL pathways simultaneously.
      </div>
    </div>
  );
}


// ─── OFF-LABEL MEDICIN ────────────────────────────────────────────────────────
const MED = {
  metformin:{name:"Metformin",mechanism:"AMPK activation, mTOR inhibition, Warburg effect interference, GLUT transporter reduction, insulin/IGF-1 reduction",dose:"500–2000 mg/day divided into 2 doses with food",studies:"37261084,32860850,31243680",src:["mclelland"],note:"Diabetes medication and cornerstone of McLelland's Metro Map. Diabetics on metformin have significantly lower cancer mortality across nearly all cancer types. Start low (500 mg) to avoid gastrointestinal side effects."},
  mebendazol:{name:"Mebendazol",mechanism:"Tubulin polymerization inhibition (identical binding to vincristine/taxanes), BCL-2 reduction, VEGF reduction, GLUT1 reduction",dose:"100–200 mg 2–3x/day — MUST be taken with a fatty meal (bioavailability increases 5–10x)",studies:"31886060,25541231,23281930",src:["mclelland","tippens"],note:"Anthelmintic with identical tubulin mechanism as chemo standards. CRITICAL: ALWAYS take with a fatty meal."},
  fenbendazol:{name:"Fenbendazol (Panacur)",mechanism:"Tubulin polymerization inhibition (benzimidazole class), p53 tumor suppressor activation, GLUT transporter reduction",dose:"222 mg/day (1 sachet Panacur C dog powder) x 3 days ON + 4 days OFF. Cyclic.",studies:"29097407,33602073",src:["tippens"],note:"Veterinary anthelmintic — Joe Tippens protocol. Activates p53 tumor suppressor which is mutated in ~50% of all cancer types."},
  ivermectin:{name:"Ivermectin",mechanism:"PAK1 inhibition, WNT-β-catenin reduction, P-glycoprotein reduction (MDR reversal), mitochondrial dysfunction in tumor cells",dose:"0.2–0.6 mg/kg/day. Take with a fatty meal.",studies:"32533918,34665993,28974414",src:["mclelland"],note:"Antiparasitic with broad anti-cancer activity spectrum. Inhibits P-glycoprotein and can counteract chemo-resistance."},
  doxycyclin:{name:"Doxycyclin",mechanism:"Mitochondrial ribosome inhibition (selective in cancer cells), MMP-2/9 reduction (anti-metastatic), cancer stem cell reduction",dose:"100–200 mg/day (1–2x daily with food). Cyclic use recommended.",studies:"28034920,31485045",src:["mclelland"],note:"Antibiotic. Particularly potent against cancer stem cells driving recurrence. Photosensitivity — avoid intense sun."},
  statiner:{name:"Statiner (lipofil: Simvastatin/Lovastatin)",mechanism:"HMG-CoA reductase inhibition, mevalonate pathway inhibition, cholesterol/lipid synthesis inhibition, Rho/Ras protein inhibition",dose:"40–80 mg/day. Taken in the EVENING. CoQ10 supplement recommended.",studies:"28456308,30213800",src:["mclelland"],note:"McLelland: blocks fat/cholesterol as cancer cells' third fuel source. Lipophilic statin preferred. TAKEN IN THE EVENING."},
  hydroxychloroquin:{name:"Hydroxychloroquin (HCQ)",mechanism:"Autophagy inhibition via lysosomal alkalinization, immunomodulation, anti-inflammatory",dose:"400–600 mg/day. Requires regular eye examination with long-term use.",studies:"30337160,31886060",src:["mclelland"],note:"Antimalarial drug. Blocks cancer cells' autophagy escape route under chemotherapy stress. Requires eye examination with long-term use."},
  aspirin:{name:"Aspirin (lav dosis)",mechanism:"COX-1/COX-2 inhibition, prostaglandin E2 reduction, thromboxane A2 reduction (anti-platelet, anti-metastatic), NF-κB inhibition",dose:"75–300 mg/day (enteric-coated tablet protects gastric mucosa)",studies:"28830014,23680940",src:["mclelland"],note:"McLelland central: reduces inflammation and inhibits platelets that help tumor cells metastasize."},
  cimetidin:{name:"Cimetidin (Tagamet)",mechanism:"H2-receptor antagonism, HSPG inhibition (blocks tumor cell adhesion to blood vessels), NK cell activation",dose:"400–800 mg/day (divided 2x daily)",studies:"15481946,1493299",src:["mclelland"],note:"Old inexpensive stomach acid medication with unusual anti-metastatic effect. NK cell activation. Clinical studies in colorectal and gastric cancer show survival benefit."},
  dipyridamol:{name:"Dipyridamol (Persantin)",mechanism:"PDE inhibition, cAMP/cGMP increase, adenosine boost (anti-proliferative), anti-platelet, VEGF inhibition",dose:"200–400 mg sustained-release form/day",studies:"28458121,2144290",src:["mclelland"],note:"Blood-thinning medication. Adenosine boost inhibits tumor cell growth and invasiveness."},
  propranolol:{name:"Propranolol",mechanism:"Beta-adrenergic blockade, adrenaline/noradrenaline reduction on tumor cells, VEGF reduction, NK cell activation",dose:"40–80 mg/day. Taper slowly when discontinuing.",studies:"27062194,29320737",src:["mclelland"],note:"Beta-blocker. Stress hormones adrenaline/noradrenaline activate beta-receptors on cancer cells and promote growth and metastasis."},
  dca:{name:"DCA (Dichloroacetat)",mechanism:"PDK1 inhibition, pyruvate dehydrogenase activation, Warburg effect reversal, mitochondrial apoptosis",dose:"10–25 mg/kg/day cyclic (5 days ON, 2 days OFF). Plus B1-thiamine 100 mg/day.",studies:"17051984,21383728",src:["mclelland"],note:"Reverses the Warburg effect. RISK: Peripheral neuropathy at high doses — B1-thiamine 100 mg/day recommended."},
  ldn:{name:"Naltrexon lav dosis (LDN)",mechanism:"OGF/OGFr pathway modulation, endorphin boost (nocturnal rebound), TLR4 modulation, immune regulation",dose:"1.5–4.5 mg at night (start 1.5 mg, increase gradually)",studies:"28935922,20150494",src:["mclelland"],note:"Taken at night for natural endorphin boost. CRITICAL: NEVER combine with opioid pain medications."},
  celecoxib:{name:"Celecoxib",mechanism:"Selective COX-2 inhibition, prostaglandin E2 reduction, apoptosis induction, anti-angiogenic",dose:"400 mg 2x/day",studies:"12750098,28830014",src:["mclelland"],note:"FDA-approved for FAP (familial adenomatous polyposis). Stronger COX-2 inhibitor than aspirin."},
  itraconazol:{name:"Itraconazol",mechanism:"Anti-angiogenic (VEGFR2/AKT/mTOR inhibition), Hedgehog pathway inhibition, P-glycoprotein inhibition (MDR reversal)",dose:"200–600 mg/day with fatty meal. Check CYP3A4 interactions.",studies:"24218511,28034920",src:[],note:"Antifungal with potent anti-angiogenic effect. Phase II in NSCLC showed increased PFS."},
  disulfiram:{name:"Disulfiram + Kobber (Antabuse)",mechanism:"ALDH inhibition (cancer stem cells), dithiocarbamate-copper complex (NF-κB inhibition), proteasome inhibition",dose:"250–500 mg/day + copper 2 mg/day. ABSOLUTE ALCOHOL ABSTINENCE.",studies:"30936136,28743521",src:["mclelland"],note:"With copper forms selectively cytotoxic complex. Phase II studies in glioblastoma. CRITICAL: even minimal alcohol causes violent reaction."},
  niclosamid:{name:"Niclosamid",mechanism:"STAT3 inhibition, WNT-β-catenin inhibition, mTORC1 inhibition, cancer stem cell inhibition",dose:"1000–2000 mg/day (low oral bioavailability is the challenge)",studies:"32499290,27338789",src:[],note:"Tapeworm medication with broad anti-cancer spectrum. Low oral bioavailability is the major clinical challenge."},
  losartan:{name:"Losartan",mechanism:"AT1R blockade, TGF-beta reduction (anti-fibrotic), desmoplasia reduction, improved chemo penetration",dose:"50–100 mg/day",studies:"28416612,31486401",src:[],note:"Blood pressure medication. Reduces the stiff stroma surrounding tumors and blocking chemo access. Particularly relevant in pancreatic cancer."},
  artesunate:{name:"Artesunate",mechanism:"Iron-activated ROS ferroptosis (selective in iron-rich tumor cells), HIF-1α reduction, anti-angiogenic",dose:"Oral: 100–200 mg/day.",studies:"28034920,32533918",src:["clark"],note:"Semi-synthetic artemisinin derivative with better stability. The anti-cancer mechanism is independent of Hulda Clark's theory."},
};

// ─── KOSTTILSKUD ──────────────────────────────────────────────────────────────
const SUP = {
  artemisinin:{name:"Artemisinin (Malurt/Wormwood)",ev:3,mechanism:"Jern-aktiveret ROS-ferroptose (selektiv i jernrige tumorceller), NF-κB reduktion, HIF-1α reduktion",dose:"200–400 mg twice daily on EMPTY stomach",src:["clark"],note:"One of the most intensively researched natural cancer agents. Reacts with iron in cancer cells generating selective free radicals."},
  curcumin:{name:"Curcumin (liposomal eller med piperin)",ev:2,mechanism:"NF-κB reduktion, COX-2 reduktion, EGFR reduktion, apoptose, anti-inflammatorisk",dose:"500–1000 mg 3x/dag med piperin ELLER liposomal form 200–500 mg/dag",src:["mclelland","tippens"],note:"Standard curcumin has only ~1% bioavailability — piperine increases this 20x."},
  vitamind:{name:"Vitamin D3 + K2 MK-7",ev:3,mechanism:"VDR-aktivering, anti-proliferativ, differentiering, immunmodulering, apoptose",dose:"2000–5000 IU D3 + 100–200 μg K2 MK-7/day. Target serum vit D: 80–150 nmol/L.",src:[],note:"SUNSHINE trial: high-dose vitamin D in metastatic colorectal cancer significantly improved PFS."},
  melatonin:{name:"Melatonin (terapeutisk højdosis)",ev:2,mechanism:"Potent antioxidant, NK-celle-aktivering, kemo-sensibilisering, apoptose, VEGF reduktion",dose:"10–40 mg/evening (therapeutic dose — far above sleep dose of 0.5–3 mg)",src:["mclelland"],note:"Can reduce side effects of chemotherapy and radiation. Do NOT combine with immunotherapy without medical consultation."},
  vitaminE:{name:"Vitamin E Succinat",ev:2,mechanism:"Selektiv mitokondrie-apoptose i kræftceller — succinat-formen er specifik for denne effekt",dose:"800 mg/day — SPECIFICALLY succinate form (NOT standard alpha-tocopherol)",src:["tippens"],note:"Joe Tippens protocol. Pro-apoptotic properties are unique to the succinate form."},
  cbd:{name:"CBD (cannabidiol) — fuld-spektrum",ev:2,mechanism:"CB1/CB2-aktivering, apoptose, anti-angiogen, autopagi-modulering",dose:"Start 10–25 mg/day sublingually. Titrate gradually up to 100–200 mg/day.",src:["tippens"],note:"CRITICAL: CBD is a CYP3A4/CYP2D6 inhibitor — affects the metabolism of many chemotherapies."},
  berberine:{name:"Berberine",ev:2,mechanism:"AMPK-aktivering (som metformin), STAT3 reduktion, tarm-mikrobiom-modulering, NF-κB reduktion",dose:"500 mg 2–3x/day with food",src:[],note:"Natural AMPK activator with mechanism similar to metformin."},
  omega3:{name:"Omega-3 (EPA/DHA høj-dosis)",ev:2,mechanism:"Prostaglandin E2 reduktion, COX-modulering, ferroptose-sensibilisering, anti-inflammatorisk",dose:"2–4 g total EPA+DHA/day",src:[],note:"Anti-inflammatory complements aspirin. Caution with high doses during chemotherapy."},
  egcg:{name:"Grøn te ekstrakt (EGCG)",ev:2,mechanism:"EGFR reduktion, VEGF reduktion (anti-angiogen), apoptose, HDAC reduktion",dose:"400–800 mg EGCG/day (caffeine-free extract). Take on empty stomach.",src:[],note:"Potential interaction with bortezomib — caution in myeloma."},
  quercetin:{name:"Quercetin",ev:2,mechanism:"PI3K/AKT reduktion, tyrosinkinase reduktion, senolytisk, P-gp reduktion (MDR-revertering)",dose:"500–1000 mg/day with fat",src:[],note:"Natural flavonoid. Inhibits P-gp and counteracts multi-drug resistance."},
  resveratrol:{name:"Resveratrol (trans-form)",ev:2,mechanism:"SIRT1/3-aktivering, mitokondrie-apoptose, NF-κB reduktion, COX reduktion",dose:"500–1000 mg/day (trans-resveratrol with piperine).",src:[],note:"Choose trans-form with piperine. Synergistic with curcumin and quercetin."},
  sulforafan:{name:"Sulforafan (broccolispire-ekstrakt)",ev:2,mechanism:"Nrf2-aktivering, HDAC reduktion, apoptose, cancer stem cell reduktion",dose:"Broccoli sprout extract 100–400 mg/day",src:[],note:"1 cup broccoli sprouts = ~400 mg sulforaphane. Avoid cooking."},
  ala:{name:"Alpha-Liponsyre (R-ALA)",ev:2,mechanism:"Potent antioxidant (vand- og fedtopløselig), PDK reduktion (DCA-overlap), mitokondrie-støtte",dose:"300–600 mg 2x/day (R-form is biologically active)",src:["mclelland"],note:"McLelland: natural supplement with DCA overlap. Can lower blood sugar levels."},
  boswellia:{name:"Boswellia Serrata (AKBA)",ev:2,mechanism:"5-LOX reduktion (potent, selektiv), NF-κB reduktion, apoptose, anti-angiogen",dose:"300–500 mg AKBA 3x/day",src:[],note:"Particularly documented in brain tumors (reduces cerebral edema) and leukemia."},
  selen:{name:"Selen (selenomethionin)",ev:2,mechanism:"Selenoprotein-syntese, antioxidant, apoptose, DNA-reparation, immunmodulering",dose:"100–200 μg/day. STOP above 400 μg/day — toxic.",src:[],note:"Supplement ONLY with documented deficiency. Overdose causes hair loss and neurological symptoms."},
  mcp:{name:"Modificeret Citruspektin (MCP)",ev:2,mechanism:"Galectin-3 hæmning (anti-adhesion, anti-metastatisk), MDSC-reduktion",dose:"15 g/day (powder dissolved in COLD water)",src:[],note:"Galectin-3 is central to cancer cells' ability to metastasize."},
  psk:{name:"PSK / Coriolus (Tyrkehale-svamp)",ev:3,mechanism:"T-celle, NK-celle, dendritisk celle-aktivering, TLR2-agonist",dose:"3 g PSK-standardized extract/day",src:[],note:"Japanese FDA-approved cancer adjuvant (Krestin). Studies published in NEJM and Lancet."},
  astragalus:{name:"Astragalus (Huang Qi)",ev:2,mechanism:"NK-celle, T-celle, makrofag-aktivering, anti-inflammatorisk",dose:"9–30 g dried root/day or standardized extract",src:[],note:"Meta-analyses in NSCLC show possible survival benefit combined with chemo."},
  lycopin:{name:"Lycopin",ev:2,mechanism:"Antioxidant, IGF-1 reduktion, anti-angiogen",dose:"10–30 mg/day (cooked tomato products)",src:[],note:"Epidemiologically documented in prostate cancer. Cooked tomato products are far better than raw."},
  granataeble:{name:"Granatæble Ekstrakt",ev:2,mechanism:"Anti-androgenisk (aromatase reduktion), NF-κB reduktion, VEGF reduktion, apoptose",dose:"1000 mg standardized extract/day OR 240 ml 100% juice/day",src:[],note:"Phase II studies in prostate cancer: prolonged PSA doubling time."},
  probiotika:{name:"Probiotika (multi-stamme, høj CFU)",ev:2,mechanism:"Mikrobiom-modulering, immunregulering, SCFA-produktion (butyrat)",dose:"Min. 50 billion CFU multi-strain product.",src:[],note:"The microbiome significantly affects the efficacy of PD-1/PD-L1 immunotherapy."},
  silymarin:{name:"Silymarin (Marietidsel/Milk Thistle)",ev:2,mechanism:"Hepatoprotektiv, NF-κB hæmning, anti-proliferativ ved HCC, anti-fibrotisk",dose:"140–420 mg/day standardized extract. Divide into 3 doses.",src:[],note:"Protects the liver during chemotherapy. Particularly relevant in liver cancer."},
};


// ─── KLINISK DYBDE PER SUBTYPE ────────────────────────────────────────────────
const DEPTH = {
  melanoma:[
    { name:"BRAF V600E-muteret", criteria:"Kutan melanom / BRAF V600E mutation (~40–45%) / metastatisk eller stadium III–IV", badge:"Targetbar — dabrafenib + trametinib", badgeColor:"#4a8c84",
      biology:"BRAF V600E gives constitutive MAPK activation driving uncontrolled proliferation. Combined BRAF+MEK inhibition (dabrafenib+trametinib) gives ~70% response rate. Resistance almost always arises via RAS mutation, MEK amplification or autophagy. Energy metabolism is strongly Warburg-dominated.",
      pathways:[{n:"BRAF V600E/MAPK",l:"Extremely high"},{n:"RAS/MEK/ERK",l:"Extremely high"},{n:"PI3K/AKT/mTOR",l:"Moderate-high"},{n:"PD-L1",l:"Moderate-high"},{n:"Aerobic Glycolysis",l:"High"},{n:"Autopagi",l:"Moderate-high"}],
      biomarkers:[
        {name:"BRAF V600E/K (NGS + ctDNA)",note:"Defines treatment. V600E and V600K → dabrafenib+trametinib. ctDNA monitors resistance development",crit:true},
        {name:"PD-L1 (TPS/CPS)",note:"Predicts immunotherapy response — but negative does not exclude response",crit:false},
        {name:"TMB",note:"High TMB (sun-exposed melanoma) = better immunotherapy response",crit:false},
        {name:"LDH",note:"Elevated LDH = poor prognosis. Baseline mandatory at all stages",crit:true},
        {name:"PTEN (IHC/NGS)",note:"PTEN loss = PI3K inhibitor relevant and poorer BRAF inhibitor response",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits BRAF/MEK-driven aerobic glycolysis and mTOR. Reduces BRAF inhibitor resistance. Observational data: melanoma patients on metformin live longer."},
        {name:"HCQ",ev:"Fase 1–2",note:"Autophagy is the primary resistance mechanism against BRAF inhibitors. HCQ restores dabrafenib sensitivity. Phase 1/2 ongoing."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2 inhibition → reduces PGE2 that activates BRAF/MAPK and immunosuppresses the microenvironment. Synergistic with immunotherapy."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonate → reduces RAS/MAPK and synergistic with MEK inhibitors. Pro-apoptotic in BRAF inhibitor-resistant cells."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=BRAF+melanoma&type=Interventional&recrs=a" },
    { name:"BRAF-wildtype / NRAS-muteret", criteria:"Kutan melanom / BRAF-wildtype / NRAS mutation Q61 (~20%) / NF1 mutation (~15%)", badge:"Immunterapi er hjørnestenen", badgeColor:"#b8904a",
      biology:"BRAF-wildtype melanoma lacks the clear targetable mutation. NRAS-mutated melanoma constantly activates RAS/MAPK and PI3K but NRAS is directly undruggable. Immunotherapy (combined anti-PD-1 + anti-CTLA-4) is the cornerstone with ~50–60% response rate.",
      pathways:[{n:"NRAS/RAS/MAPK",l:"Extremely high"},{n:"PI3K/AKT/mTOR",l:"High"},{n:"PD-1/PD-L1",l:"High"},{n:"Aerobic Glycolysis",l:"High"}],
      biomarkers:[
        {name:"BRAF wildtype bekræftelse",note:"BRAF-negative confirms that BRAF inhibitors are irrelevant",crit:true},
        {name:"NRAS mutation (NGS)",note:"NRAS+ → binimetinib (MEK inhibitor) indicated. Excludes BRAF inhibitors",crit:true},
        {name:"PD-L1 + TMB",note:"Both high = best immunotherapy response",crit:false},
        {name:"LDH",note:"Elevated LDH = poor prognosis",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits NRAS-driven RAS/MAPK and mTOR. Synergistic with MEK inhibitors."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2 inhibition synergistic with pembrolizumab/nivolumab. Observational data: improved immunotherapy response."},
        {name:"Probiotika",ev:"Fase 1–2",note:"The microbiome is crucial for anti-PD-1 response in melanoma. Bifidobacterium specifically important."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=melanoma&type=Interventional&recrs=a" },
    { name:"Uvealt Melanom", criteria:"Melanom udgående fra uvea (koroid, corpus ciliare, iris) / GNAQ eller GNA11 mutation", badge:"GNAQ/GNA11 — sværest behandlelig", badgeColor:"#e06060",
      biology:"Uveal melanoma is biologically fundamentally different from cutaneous melanoma. GNAQ/GNA11 mutations activate PKC and MAPK. Metastatic uveal melanoma has extremely poor prognosis (~6–12 months) and responds poorly to immunotherapy. Tebentafusp is the first approved treatment specifically for HLA-A*02:01+ patients.",
      pathways:[{n:"GNAQ/GNA11/PKC",l:"Extremely high"},{n:"RAS/MAPK/ERK",l:"High"},{n:"YAP/Hippo",l:"High"},{n:"PI3K/AKT",l:"Moderate-high"}],
      biomarkers:[
        {name:"GNAQ / GNA11 mutation (NGS)",note:"Confirms diagnosis and excludes cutaneous melanoma",crit:true},
        {name:"BAP1-tab (IHC/NGS)",note:"BAP1 loss = metastatic risk ~50% vs ~20% with BAP1-intact. Most important prognostic marker",crit:true},
        {name:"HLA-A*02:01 typning",note:"Required for tebentafusp indication — only HLA-A*02:01+ patients can be treated",crit:true},
        {name:"SF3B1 mutation",note:"SF3B1+ = better prognosis and late metastasis",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Præklinisk",note:"AMPK → inhibits GNAQ-driven mTOR and YAP activation. Strong preclinical evidence."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonate → reduces GNAQ-downstream RAS/RHO. Observational data in uveal melanoma."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=uveal+melanoma&type=Interventional&recrs=a" },
  ],

  bladder:[
    { name:"Muskelinvasiv blærekræft (MIBC)", criteria:"Urotelkarcinom / muskelinvasion (T2+) / MIBC", badge:"PD-L1 + FGFR3 målretning", badgeColor:"#7b6fa0",
      biology:"MIBC requires radical cystectomy or chemoradiation. Neoadjuvant cisplatin-based chemo markedly improves OS. FGFR3 mutation (~15%) opens for erdafitinib. Immunotherapy is approved for metastatic cisplatin-ineligible disease. Energy metabolism is strongly Warburg-dominated.",
      pathways:[{n:"FGFR3 (Mutation/Fusion)",l:"High"},{n:"PI3K/AKT/mTOR",l:"High"},{n:"PD-L1",l:"Moderate-high"},{n:"Aerobic Glycolysis",l:"High"},{n:"ERBB2 (HER2)",l:"Moderate"}],
      biomarkers:[
        {name:"FGFR3 mutation/fusion (NGS)",note:"~15% — erdafitinib approved in metastatic disease. Mandatory NGS",crit:true},
        {name:"PD-L1 (CPS ≥ 10)",note:"Indicates pembrolizumab in cisplatin-ineligible metastatic disease",crit:true},
        {name:"MSI-H / TMB-høj",note:"Opens for tumor-agnostic pembrolizumab",crit:false},
        {name:"ERBB2 amplifikation",note:"~10% — trastuzumab combination studies ongoing",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits mTOR and Warburg. Reduces PD-L1 expression — synergy with pembrolizumab. Observational data: bladder cancer patients on metformin live longer."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2 inhibition → reduces PGE2-driven immunosuppression and neoangiogenesis. Synergy with immunotherapy."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonate inhibition → reduces RAS and PI3K activation. Synergistic with cisplatin chemo."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=muscle+invasive+bladder+cancer&type=Interventional&recrs=a" },
    { name:"Ikke-muskelinvasiv blærekræft (NMIBC) — høj risiko", criteria:"Urotelkarcinom / overfladisk / CIS og/eller T1 høj grad / BCG-behandlet", badge:"BCG-resistens er central udfordring", badgeColor:"#b8904a",
      biology:"NMIBC high-risk including carcinoma in situ (CIS) is treated with BCG instillations activating local immune defense in the bladder. BCG resistance occurs in ~30–40% requiring a new strategy. Pembrolizumab is approved for BCG-refractory NMIBC.",
      pathways:[{n:"PD-1/PD-L1",l:"High"},{n:"PI3K/AKT/mTOR",l:"Moderate-high"},{n:"FGFR3",l:"Moderate"},{n:"Aerobic Glycolysis",l:"Moderate-high"}],
      biomarkers:[
        {name:"PD-L1 (CPS)",note:"Predicts pembrolizumab response in BCG-refractory CIS",crit:true},
        {name:"FGFR3 mutation",note:"FGFR3-mutated NMIBC generally has better prognosis and lower progression risk",crit:false},
        {name:"TERT-promoter mutation",note:"Frequent in NMIBC — prognostic marker",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → reduces Warburg and mTOR. Biological rationale in BCG resistance."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2 inhibition synergistic with BCG immune activation in the bladder."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=non-muscle+invasive+bladder+cancer&type=Interventional&recrs=a" },
  ],

  lymphoma:[
    { name:"Klassisk Hodgkin Lymfom", criteria:"CD30+ Reed-Sternberg celler / nodulær sklerose (hyppigst) / PD-L1 overudtrykt", badge:"Kurativt ~85–90%", badgeColor:"#4a8c84",
      biology:"Classic HL is characterized by Reed-Sternberg cells comprising only 1–2% of the tumor mass surrounded by massive inflammatory microenvironment. CD30 and PD-L1 are constitutively overexpressed. JAK/STAT signaling is central. ~85–90% are curable with ABVD or BrECADD.",
      pathways:[{n:"JAK/STAT",l:"Extremely high"},{n:"NF-κB",l:"High"},{n:"PD-L1/CD30",l:"Extremely high"},{n:"PI3K/AKT",l:"Moderate-high"},{n:"Aerobic Glycolysis",l:"Moderate"}],
      biomarkers:[
        {name:"CD30 (IHC)",note:"Positive in almost all cHL — indicates brentuximab vedotin at relapse",crit:true},
        {name:"PD-L1 (IHC)",note:"Overexpressed on RS cells — pembrolizumab/nivolumab indicated at relapse",crit:true},
        {name:"PET-CT (Deauville score)",note:"Interim PET crucial for treatment intensification. Deauville 4–5 = escalation",crit:true},
        {name:"EBV-status (EBER ISH)",note:"EBV+ cHL = different microenvironment and prognosis",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits JAK/STAT and mTOR. Reduces PD-L1 expression on RS cells — synergy with pembrolizumab."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2 inhibition → reduces PGE2 in the inflammatory microenvironment maintaining RS cells."},
        {name:"Statin",ev:"Præklinisk",note:"Mevalonate inhibition → reduces NF-κB and RAS/MAPK. Pro-apoptotic in RS cell lines."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=Hodgkin+lymphoma&type=Interventional&recrs=a" },
    { name:"DLBCL (Diffust Storcellet B-celle)", criteria:"DLBCL / CD20+ / aggressivt Non-Hodgkin lymfom / GCB eller ABC subtype", badge:"Kurativt ~60% med R-CHOP", badgeColor:"#5b8db8",
      biology:"DLBCL is the most common aggressive lymphoma. The GCB subtype is BCL-2 rearranged and PI3K-driven. The ABC subtype is NF-κB and BCR/BTK-dependent with worse prognosis. Double-hit (MYC + BCL-2) is extremely aggressive. R-CHOP is 1st line standard treatment.",
      pathways:[{n:"BCR/BTK (ABC subtype)",l:"High"},{n:"PI3K/AKT (GCB subtype)",l:"High"},{n:"NF-κB (ABC subtype)",l:"High"},{n:"MYC Amplification",l:"Extremely high"},{n:"BCL-2 Anti-apoptosis",l:"High"},{n:"Aerobic Glycolysis",l:"High"}],
      biomarkers:[
        {name:"COO subtype (GCB vs ABC)",note:"Crucial for prognosis and new treatment. ABC = ibrutinib combination benefit in studies",crit:true},
        {name:"MYC + BCL-2 + BCL-6 FISH",note:"Double/triple-hit = extremely aggressive. Requires R-DA-EPOCH over R-CHOP",crit:true},
        {name:"IPI score",note:"International Prognostic Index — crucial for risk stratification",crit:true},
        {name:"TP53 Mutation",note:"TP53+ = poor prognosis and shorter PFS with R-CHOP",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits MYC-driven aerobic glycolysis and mTOR. Observational data: DLBCL patients on metformin have better response to R-CHOP."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonate → reduces RAS/RHO and NF-κB. Pro-apoptotic via BCL-2 reduction. Synergistic with rituximab."},
        {name:"HCQ",ev:"Fase 1–2",note:"Autophagy inhibition — double-hit DLBCL is strongly autophagy-dependent. Phase 1/2 ongoing."},
        {name:"Disulfiram + kobber",ev:"Præklinisk",note:"Inhibits NF-κB and proteasome — direct attack on the ABC subtype's NF-κB dependence."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=diffuse+large+B+cell+lymphoma&type=Interventional&recrs=a" },
    { name:"Follikulært Lymfom (grad 1–2)", criteria:"Follikulært lymfom / CD20+ / BCL-2 t(14;18) / grad 1–2 (lavgradig)", badge:"Indolent — kronisk sygdom", badgeColor:"#7b6fa0",
      biology:"Follicular lymphoma is the most common indolent lymphoma. t(14;18) gives BCL-2 overexpression blocking apoptosis. The disease is typically chronically recurring but rarely curative. Transformation to DLBCL occurs in ~3%/year.",
      pathways:[{n:"BCL-2 Overexpression",l:"Extremely high"},{n:"PI3K/AKT",l:"High"},{n:"BCR Signaling",l:"Moderate-high"},{n:"NF-κB",l:"Moderate"},{n:"Aerobic Glycolysis",l:"Low-moderate"}],
      biomarkers:[
        {name:"BCL-2 t(14;18) (FISH)",note:"Confirms diagnosis. Negative at grade 3B — treated as DLBCL",crit:true},
        {name:"FLIPI score",note:"Follicular Lymphoma International Prognostic Index — guides treatment need",crit:true},
        {name:"EZH2 mutation",note:"Opens for tazemetostat (EZH2 inhibitor) at relapse",crit:false},
        {name:"Transformationsbiopi",note:"Rapidly growing node = transformation biopsy mandatory (MYC, BCL-2)",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → reduces BCL-2 dependence and mTOR. Synergistic with rituximab."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonate → reduces BCL-2 dependence and NF-κB. Synergistic with rituximab."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=follicular+lymphoma&type=Interventional&recrs=a" },
  ],

  leukemia:[
    { name:"AML — FLT3-muteret", criteria:"AML / FLT3-ITD eller FLT3-TKD mutation / ~30% af AML", badge:"Targetbar — midostaurin/gilteritinib", badgeColor:"#b8904a",
      biology:"FLT3-mutated AML has historically had poor prognosis but FLT3 inhibitors (midostaurin, gilteritinib) have markedly improved survival. FLT3-ITD gives constitutive kinase activation massively driving PI3K/AKT, MAPK and STAT5. Energy metabolism is extremely glycolytic.",
      pathways:[{n:"FLT3/STAT5",l:"Extremely high"},{n:"PI3K/AKT/mTOR",l:"High"},{n:"RAS/MAPK",l:"High"},{n:"Aerobic Glycolysis",l:"Extremely high"},{n:"Autopagi",l:"Moderate-high"}],
      biomarkers:[
        {name:"FLT3-ITD / FLT3-TKD (NGS)",note:"Defines the subtype. FLT3-ITD allele ratio prognostic. Crucial for midostaurin/gilteritinib",crit:true},
        {name:"NPM1 mutation",note:"Co-mutation with FLT3 — NPM1+/FLT3-ITD low = good prognosis",crit:true},
        {name:"IDH1/2 mutation",note:"Opens for ivosidenib/enasidenib as addition in IDH+ AML",crit:false},
        {name:"MRD (NGS/flow cytometri)",note:"Minimal residual disease — crucial for treatment decision",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits mTOR and aerobic glycolysis. Synergy with midostaurin. Observational data: AML patients on metformin have better response."},
        {name:"HCQ",ev:"Fase 1–2",note:"Autophagy inhibition — blocks primary resistance mechanism against FLT3 inhibitors. Phase 1/2 ongoing."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonate → reduces RAS membrane anchoring downstream of FLT3. Pro-apoptotic in AML blasts."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=FLT3+acute+myeloid+leukemia&type=Interventional&recrs=a" },
    { name:"AML — IDH1/2-muteret", criteria:"AML / IDH1 R132 eller IDH2 R140/R172 mutation / ~20% af AML", badge:"IDH-hæmmer indiceret", badgeColor:"#4a8c84",
      biology:"IDH1/2-mutated AML produces 2-HG blocking myeloid differentiation and locking cells in blast stage. Ivosidenib (IDH1) and enasidenib (IDH2) are approved and can induce differentiation. Differentiation syndrome is an important side effect.",
      pathways:[{n:"IDH1/2 → 2-HG",l:"Extremely high"},{n:"Epigenetic Lock",l:"High"},{n:"PI3K/AKT/mTOR",l:"Moderate-high"},{n:"Aerobic Glycolysis",l:"High"},{n:"Glutaminolysis",l:"High"}],
      biomarkers:[
        {name:"IDH1 / IDH2 mutation (NGS)",note:"Defines the subtype. IDH1 → ivosidenib, IDH2 → enasidenib. Both approved in relapsed AML",crit:true},
        {name:"2-HG (serum/urin)",note:"Monitors IDH inhibitor response. Fall in 2-HG confirms biological activity",crit:false},
        {name:"MRD",note:"Minimal residual disease — crucial for treatment decision",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits mTOR and glutaminolysis. Indirectly reduces 2-HG production. Synergistic with ivosidenib."},
        {name:"HCQ",ev:"Præklinisk",note:"Autophagy inhibition — IDH-mutated AML cells are strongly autophagy-dependent during differentiation treatment."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=IDH+acute+myeloid+leukemia&type=Interventional&recrs=a" },
    { name:"CML — BCR-ABL positiv", criteria:"CML / BCR-ABL1 fusionsgen (Philadelphia-kromosom) / t(9;22)", badge:"Philadelphia-kromosom — TKI kurativt potentiale", badgeColor:"#4a8c84",
      biology:"CML is one of the most treatment-successful cancers — TKI (imatinib, dasatinib, nilotinib) gives >85% long-term survival. The BCR-ABL1 fusion protein constantly activates ABL kinase activity driving PI3K/AKT, RAS/MAPK and STAT5.",
      pathways:[{n:"BCR-ABL1/ABL Kinase",l:"Extremely high"},{n:"PI3K/AKT/mTOR",l:"High"},{n:"RAS/MAPK",l:"High"},{n:"STAT5",l:"High"},{n:"Aerobic Glycolysis",l:"High"}],
      biomarkers:[
        {name:"BCR-ABL1 (FISH + PCR)",note:"Diagnostic and monitoring marker. BCR-ABL quantification (IS scale) determines treatment status and discontinuation strategy",crit:true},
        {name:"ABL1 T315I mutation",note:"Resistance to all 1st–2nd gen. TKI. Requires ponatinib or asciminib",crit:true},
        {name:"Sokal/ELTS risikoescore",note:"Crucial for initial TKI selection",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits mTOR downstream of BCR-ABL. Reduces CML stem cells that survive imatinib."},
        {name:"HCQ",ev:"Fase 1–2",note:"CML stem cells are strongly autophagy-dependent and survive TKI via autophagy. ATLAs phase 2: HCQ + imatinib improved deep molecular remission."},
        {name:"Grøn te (EGCG)",ev:"Fase 1–2",note:"EGCG directly inhibits BCR-ABL and reduces leukemia stem cells. Clinical phase 2 study: EGCG + imatinib improved response."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=chronic+myeloid+leukemia&type=Interventional&recrs=a" },
    { name:"CLL — IGHV-umuteret / TP53-muteret", criteria:"CLL / IGHV-umuteret og/eller del(17p)/TP53-muteret / kræver behandling", badge:"Høj risiko — BTK-hæmmer", badgeColor:"#e06060",
      biology:"CLL is the most common leukemia in the West. BCR signaling is the primary survival driver. Ibrutinib and acalabrutinib (BTK inhibitors) have revolutionized treatment. IGHV-unmutated and TP53-mutated/del(17p) are the most important high-risk markers.",
      pathways:[{n:"BCR/BTK Signaling",l:"Extremely high"},{n:"PI3K/AKT",l:"High"},{n:"BCL-2 Anti-apoptosis",l:"Extremely high"},{n:"NF-κB",l:"High"},{n:"Aerobic Glycolysis",l:"Moderate"}],
      biomarkers:[
        {name:"IGHV mutationsstatus",note:"Unmutated = poor prognosis and shorter time to treatment. Crucial for strategy selection",crit:true},
        {name:"del(17p) / TP53 mutation",note:"del(17p)/TP53+ = BTK inhibitor or venetoclax mandatory. Chemo-immunotherapy is contraindicated",crit:true},
        {name:"BTK C481S mutation (ctDNA)",note:"Acquired ibrutinib resistance — requires switch to acalabrutinib or venetoclax",crit:false},
        {name:"ZAP-70 / CD38",note:"Surrogate markers for IGHV status. Positive = aggressive course",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits mTOR and BCL-2-driven anti-apoptosis. Observational data: CLL patients on metformin have lower treatment need."},
        {name:"Statin",ev:"Fase 1–2",note:"Lipophilic statin → reduces RAS/RHO and NF-κB. Pro-apoptotic in CLL cells."},
        {name:"Curcumin",ev:"Fase 1–2",note:"NF-κB and BCL-2 downregulation in CLL cell lines. Clinical phase 2 data in CLL."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=chronic+lymphocytic+leukemia&type=Interventional&recrs=a" },
  ],

  thyroid:[
    { name:"Papillært karcinom (PTC) — BRAF V600E", criteria:"Papillær histologi / BRAF V600E (~60%) / >95% kurabel", badge:"Bedst prognose — >95% 10-årsoverlevelse", badgeColor:"#4a8c84",
      biology:"PTC is the most common thyroid cancer with extremely good prognosis with standard treatment. BRAF V600E drives MAPK signaling and reduces RAI uptake (radioactive iodine). TERT promoter co-mutation = aggressive course.",
      pathways:[{n:"BRAF V600E/MAPK",l:"High"},{n:"RET/PTC-fusion",l:"Moderate-high"},{n:"PI3K/AKT",l:"Moderate"},{n:"Aerobic Glycolysis",l:"Moderate"}],
      biomarkers:[
        {name:"BRAF V600E (NGS + IHC)",note:"Predicts RAI-refractoriness. Positive → dabrafenib+trametinib in metastatic RAI-refractory disease",crit:true},
        {name:"TERT-promoter mutation",note:"Co-mutation with BRAF = extremely aggressive course. Intensified follow-up",crit:false},
        {name:"RET/PTC-fusion (NGS/FISH)",note:"Opens for RET inhibitors (selpercatinib, pralsetinib) in RAI-refractory disease",crit:false},
        {name:"Thyroglobulin (Tg) + TgAb",note:"Primary monitoring marker post-thyroidektomi. Stigende Tg = recidiv",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits BRAF-driven MAPK and mTOR. Observational data: lower recurrence risk in PTC patients on metformin."},
        {name:"Statin",ev:"Præklinisk",note:"Mevalonate → reduces BRAF-downstream RAS/MAPK. Anti-invasive in PTC cell lines."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=papillary+thyroid+cancer&type=Interventional&recrs=a" },
    { name:"Anaplastisk Skjoldbruskkirtelkræft (ATC)", criteria:"Anaplastisk (udifferentieret) / ekstremt aggressivt / BRAF V600E ~45%", badge:"Median OS < 6 mdr — BRAF AKUT kritisk", badgeColor:"#e06060",
      biology:"ATC is one of the deadliest cancers with median OS of 3–6 months. BRAF V600E is present in ~45% and is a critical action point — dabrafenib + trametinib gives ~69% response rate. RAPID BRAF testing is a medical emergency.",
      pathways:[{n:"BRAF V600E/MAPK",l:"Extremely high"},{n:"PI3K/AKT/mTOR",l:"High"},{n:"WNT/β-catenin",l:"High"},{n:"Aerobic Glycolysis",l:"Extremely high"},{n:"Autopagi",l:"High"}],
      biomarkers:[
        {name:"BRAF V600E (AKUT NGS)",note:"⚠️ MEDICAL EMERGENCY — BRAF V600E+ → immediate start of dabrafenib+trametinib. Result required within 48 hours",crit:true},
        {name:"PD-L1 (CPS)",note:"Immunotherapy option in BRAF-negative ATC",crit:false},
        {name:"MSI-H",note:"Rare but opens for tumor-agnostic pembrolizumab",crit:false},
      ],
      offlabel:[
        {name:"HCQ",ev:"Fase 1–2",note:"Autophagy inhibition synergistic with dabrafenib+trametinib against BRAF+ ATC. Phase 2 recruiting."},
        {name:"Metformin",ev:"Præklinisk",note:"AMPK → inhibits mTOR and Warburg. Preclinical synergy with BRAF inhibitors."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=anaplastic+thyroid+cancer&type=Interventional&recrs=a" },
  ],

  kidney:[
    { name:"Klarcelle RCC (ccRCC)", criteria:"Klarcellet nyrekarcinom / VHL-mutation eller methylering (~75%) / meget vaskulariseret", badge:"VHL-muteret — mest aggressiv RCC", badgeColor:"#5b8db8",
      biology:"ccRCC is the most common kidney cancer subtype. VHL loss constantly activates HIF-1α/HIF-2α driving massive VEGF production and angiogenesis. Belzutifan (HIF-2α inhibitor) is a breakthrough. Combined immunotherapy + anti-VEGFR is the current 1st line standard.",
      pathways:[{n:"VHL Loss → HIF-1α/HIF-2α",l:"Extremely high"},{n:"VEGF/VEGFR/Angiogenesis",l:"Extremely high"},{n:"mTOR/mTORC1",l:"High"},{n:"PI3K/AKT",l:"Moderate-high"},{n:"Aerobic Glycolysis",l:"High"}],
      biomarkers:[
        {name:"VHL mutation/methylering (NGS)",note:"Confirms ccRCC diagnosis and opens for belzutifan in VHL disease",crit:true},
        {name:"BAP1-tab (IHC/NGS)",note:"BAP1 loss = worst prognosis. Requires intensified treatment",crit:false},
        {name:"PBRM1 vs BAP1",note:"PBRM1-mutated = better immunotherapy response. BAP1-mutated = better VEGFR inhibitor response",crit:false},
        {name:"PD-L1 (CPS/TPS)",note:"Predicts immunotherapy response in combination regimens",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits mTOR and HIF-1α activation downstream of VHL loss. Observational data: ccRCC patients on metformin live longer."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonate → reduces RAS/RHO and VEGF production. Retrospective data: better survival in RCC on statin."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2 inhibition → reduces PGE2 that stabilizes HIF-1α. Anti-angiogenic."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=clear+cell+renal+carcinoma&type=Interventional&recrs=a" },
    { name:"Metastatisk RCC", criteria:"RCC med fjernmetastaser / behandles som kronisk sygdom", badge:"Immunterapi + TKI standard", badgeColor:"#b8904a",
      biology:"Metastatic RCC is now treated with combinations of immunotherapy and anti-VEGFR TKI. Nivolumab + ipilimumab or pembrolizumab + axitinib are 1st line standards. The disease is rarely curable but can be controlled for years.",
      pathways:[{n:"VEGF/VEGFR/Angiogenesis",l:"Extremely high"},{n:"PD-1/PD-L1",l:"High"},{n:"mTOR",l:"High"},{n:"HIF-1α",l:"High"}],
      biomarkers:[
        {name:"IMDC risikoescore",note:"International Metastatic RCC Database Consortium — crucial for treatment strategy",crit:true},
        {name:"PD-L1 (TPS/CPS)",note:"High PD-L1 = benefit of nivolumab monotherapy in 2nd line",crit:false},
        {name:"BAP1 / PBRM1 mutation",note:"Guides choice between immunotherapy vs VEGFR inhibitor",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits mTOR and HIF-1α. Synergistic with sunitinib and pembrolizumab."},
        {name:"Statin",ev:"Fase 1–2",note:"Anti-VEGF effect and mTOR inhibition. Synergistic with sunitinib."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=metastatic+renal+cell+carcinoma&type=Interventional&recrs=a" },
  ],

  uterine:[
    { name:"Endometrioidt karcinom — Type 1", criteria:"Endometrioidt karcinom / grad 1–2 / hormonfølsomt / god prognose", badge:"Hormonfølsomt — god prognose", badgeColor:"#4a8c84",
      biology:"Type 1 endometrial carcinoma is estrogen-driven and has good prognosis when detected early. PIK3CA mutation is frequent (~40%). Energy metabolism is dominated by aerobic glycolysis and fatty acid synthase. Metformin has particularly strong biological rationale here as insulin resistance and obesity are primary risk factors.",
      pathways:[{n:"PI3K/AKT/mTOR",l:"High"},{n:"ER Signaling",l:"High"},{n:"WNT/β-catenin",l:"Moderate-high"},{n:"FASN/Lipid Synthesis",l:"Moderate-high"},{n:"Aerobic Glycolysis",l:"Moderate"}],
      biomarkers:[
        {name:"MMR / MSI-H (IHC + PCR)",note:"~25–30% MSI-H → pembrolizumab indicated. Most important test",crit:true},
        {name:"PIK3CA mutation",note:"Opens for mTOR/PI3K inhibitors. Frequent co-mutation",crit:false},
        {name:"ER / PR (IHC)",note:"Positive → hormone treatment (megestrol acetate, tamoxifen) as maintenance option",crit:false},
        {name:"POLE exonuklease mutation",note:"POLE-ultramutated = extremely good prognosis. Chemotherapy can be omitted",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 2–3",note:"Strongest rationale of all cancer types — insulin and IGF-1 directly drive ER signaling. Multiple phase 2 studies: markedly reduces tumor proliferation with neoadjuvant administration."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2 inhibition → reduces estrogen biosynthesis via aromatase. Observational data: lower recurrence risk."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonate → reduces PI3K/AKT and ER biosynthesis from cholesterol."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=endometrial+cancer+type+1&type=Interventional&recrs=a" },
    { name:"Serøst / Klarcelle — Type 2", criteria:"Serøst eller klarcelle karcinom / grad 3 / aggressivt / TP53 mutation hyppig", badge:"Aggressivt — dårligere prognose", badgeColor:"#e06060",
      biology:"Type 2 endometrial carcinoma biologically resembles HGSOC ovarian cancer with TP53 mutation as an almost universal factor. HER2 amplification is seen in ~20% of serous type. POLE mutation is rare. Treated with platinum-based chemo + pembrolizumab for MSI-H.",
      pathways:[{n:"TP53 Mutation",l:"Extremely high"},{n:"PI3K/AKT/mTOR",l:"High"},{n:"ERBB2/HER2",l:"Moderate-high"},{n:"Aerobic Glycolysis",l:"High"}],
      biomarkers:[
        {name:"HER2 (IHC + FISH)",note:"~20% HER2+ serous type → trastuzumab added to chemo. Crucial test",crit:true},
        {name:"MMR / MSI-H",note:"Rare in type 2 but opens for pembrolizumab",crit:true},
        {name:"TP53 Mutation",note:"Almost universal — confirms type 2 diagnosis",crit:false},
        {name:"POLE mutation",note:"Rare in type 2 but extremely good prognosis if present",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits mTOR and HER2-downstream PI3K. Biological rationale."},
        {name:"HCQ",ev:"Præklinisk",note:"Autophagy inhibition synergistic with platinum chemo in serous type."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonate → reduces HER2 membrane localization and RAS/MAPK."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=uterine+serous+carcinoma&type=Interventional&recrs=a" },
  ],

  liver:[
    { name:"Hepatocellulært Karcinom (HCC) — Avanceret", criteria:"HCC / Barcelona Clinic Liver Cancer (BCLC) C / Child-Pugh A-B", badge:"Atezolizumab + bevacizumab standard", badgeColor:"#b8904a",
      biology:"HCC arises in ~80% on the basis of cirrhosis and is one of the most common cancer death causes globally. VHL loss massively activates HIF-1α driving VEGF production. Atezolizumab + bevacizumab is the current 1st line standard markedly improving OS vs sorafenib.",
      pathways:[{n:"VEGF/VEGFR/Angiogenesis",l:"Extremely high"},{n:"WNT/β-catenin",l:"High"},{n:"PI3K/AKT/mTOR",l:"Moderate-high"},{n:"TP53",l:"High"},{n:"Aerobic Glycolysis",l:"High"}],
      biomarkers:[
        {name:"AFP (alfaføtoprotein)",note:"Primary HCC marker. AFP > 400 ng/mL with typical imaging is diagnostic. Monitoring marker",crit:true},
        {name:"Child-Pugh score",note:"Liver function classification — crucial for treatment selection and dosing",crit:true},
        {name:"BCLC stadium",note:"Primary staging system for HCC. Guides treatment strategy",crit:true},
        {name:"CTNNB1 mutation",note:"WNT+ HCC = anti-PD-1 low response rate. Affects immunotherapy decision",crit:false},
        {name:"HBV/HCV status",note:"Active HBV requires antiviral treatment — HBV reactivation risk during immunotherapy",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits mTOR and WNT/β-catenin. Reduces liver inflammation and fibrosis driving HCC progression. Meta-analysis: significantly better survival. Particularly relevant in NASH/diabetes-associated HCC."},
        {name:"Statin",ev:"Fase 1–2",note:"Meta-analysis: lower HCC incidence and better survival in statin users with chronic liver disease. Strongest statin evidence in HCC prevention."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2 inhibition → reduces PGE2 driving HCC growth. Observational studies: aspirin reduces HCC incidence in cirrhosis patients."},
        {name:"Propranolol",ev:"Fase 2",note:"Beta-blocker reducing portal hypertension and VEGF. Synergistic with TACE. Clinical data promising in advanced HCC."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=hepatocellular+carcinoma&type=Interventional&recrs=a" },
    { name:"Intrahepatisk Kolangiokarcinom (iCCA)", criteria:"Kolangiokarcinom / intrahepatisk lokalisering / FGFR2 og IDH1/2 targetbar", badge:"FGFR2 og IDH1/2 targetbar", badgeColor:"#4a8c84",
      biology:"iCCA is characterized by FGFR2 fusions (~15%) and IDH1/2 mutations (~20%) as the most important targetable alterations. Pemigatinib (FGFR2 inhibitor) and ivosidenib (IDH1 inhibitor) are approved. Desmoplastic stroma analogous to PDAC. Standard 1st line: gemcitabine + cisplatin + durvalumab.",
      pathways:[{n:"FGFR2/MAPK (Fusion)",l:"High"},{n:"IDH1/2 → 2-HG",l:"High"},{n:"PI3K/AKT/mTOR",l:"Moderate-high"},{n:"RAS/MAPK",l:"Moderate"},{n:"Aerobic Glycolysis",l:"High"}],
      biomarkers:[
        {name:"FGFR2-fusion (NGS/FISH)",note:"~15% — pemigatinib/infigratinib approved. Requires NGS",crit:true},
        {name:"IDH1/2 mutation (NGS)",note:"~20% IDH1/IDH2 — ivosidenib approved in IDH1+ relapse",crit:true},
        {name:"MSI-H / TMB-høj",note:"Rare but opens for tumor-agnostic pembrolizumab",crit:false},
        {name:"NTRK-fusion",note:"Rare but targetable with larotrectinib",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits mTOR and 2-HG production in IDH mutation. Reduces Warburg."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonate → reduces RAS/MAPK and stroma production. Synergistic with gemcitabine."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=intrahepatic+cholangiocarcinoma&type=Interventional&recrs=a" },
  ],

  gastric:[
    { name:"HER2-positiv Mavekræft", criteria:"Gastrisk adenokarcinom / HER2 IHC 3+ eller IHC 2+/FISH+ / ~15–20%", badge:"HER2+ — trastuzumab standard", badgeColor:"#4a8c84",
      biology:"HER2-positive gastric cancer accounts for ~15–20% and has fundamentally different biology from HER2-negative. Trastuzumab added to chemo markedly improves OS (ToGA trial). PI3K/AKT/mTOR is strongly activated downstream of HER2. Energy metabolism is strongly Warburg-dominated.",
      pathways:[{n:"HER2/ErbB2",l:"Extremely high"},{n:"PI3K/AKT/mTOR",l:"High"},{n:"RAS/MAPK",l:"High"},{n:"PD-L1",l:"Moderate"},{n:"Aerobic Glycolysis",l:"High"}],
      biomarkers:[
        {name:"HER2 (IHC + FISH)",note:"Score 3+ = positive. Score 2+ requires FISH confirmation. Afgørende for trastuzumab-indikation",crit:true},
        {name:"PD-L1 (CPS ≥ 5)",note:"CPS ≥ 5 → nivolumab tilføjes kemo + trastuzumab (CheckMate 811)",crit:true},
        {name:"MMR / MSI-H",note:"~5% af gastrisk kræft — pembrolizumab indiceret",crit:true},
        {name:"ERBB2 amplifikation (ctDNA)",note:"Monitorerer HER2-status under behandling — HER2-tab er resistensmekanisme",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits HER2-downstream mTOR and PI3K. Synergistic with trastuzumab."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonate → reduces HER2 membrane localization and RAS/MAPK."},
        {name:"Cimetidin",ev:"Fase 2",note:"Anti-HSPG and NK cell activation. Randomized study in gastric cancer: improved 10-year survival."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=HER2+gastric+cancer&type=Interventional&recrs=a" },
    { name:"MSI-H / dMMR Mavekræft", criteria:"Gastrisk adenokarcinom / MSI-H eller dMMR / ~5–10%", badge:"Immunterapi-responsiv", badgeColor:"#4a8c84",
      biology:"MSI-H gastric cancer accounts for ~5–10% and has massive mutation burden providing many neoantigens. Pembrolizumab is extremely effective — response rate ~40–60% in metastatic MSI-H gastric cancer. EBV-positive gastric cancer overlaps biologically with MSI-H.",
      pathways:[{n:"MMR-deficient",l:"Extremely high"},{n:"PD-1/PD-L1",l:"High"},{n:"PI3K/AKT",l:"Moderate-high"},{n:"WNT/β-catenin",l:"Moderate"}],
      biomarkers:[
        {name:"MMR (IHC) / MSI (PCR eller NGS)",note:"Confirms MSI-H status. Required for pembrolizumab indication",crit:true},
        {name:"EBV-status (EBER ISH)",note:"EBV+ gastric cancer biologically resembles MSI-H and responds well to immunotherapy",crit:false},
        {name:"PD-L1 (CPS)",note:"CPS ≥ 5 = pembrolizumab 1st line standard",crit:true},
        {name:"TMB",note:"High TMB supports immunotherapy response",crit:false},
      ],
      offlabel:[
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2 inhibition → reduces PGE2-driven immunosuppression. Synergy with pembrolizumab."},
        {name:"Metformin",ev:"Fase 1–2",note:"Reduces PD-L1 expression and MDSC — synergy with pembrolizumab."},
        {name:"Probiotika",ev:"Fase 1–2",note:"The microbiome is crucial for immunotherapy response. Akkermansia muciniphila correlates with better response."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=MSI+gastric+cancer&type=Interventional&recrs=a" },
    { name:"Diffus type / Signetringscelle", criteria:"Gastrisk adenokarcinom / diffus histologi / signetringsceller / Laurén diffus type", badge:"Aggressiv — tidlig spredning", badgeColor:"#e06060",
      biology:"Diffuse gastric cancer is biologically fundamentally different from intestinal type. E-cadherin loss (CDH1 mutation) is characteristic and drives invasiveness and peritoneal spread. Energy metabolism is extremely Warburg-dominated. Hereditary diffuse gastric cancer (HDGC) is caused by CDH1 germline mutation.",
      pathways:[{n:"CDH1 Loss/E-cadherin",l:"Extremely high"},{n:"RHO/ROCK Invasion Pathway",l:"High"},{n:"PI3K/AKT/mTOR",l:"Moderate-high"},{n:"Aerobic Glycolysis",l:"High"}],
      biomarkers:[
        {name:"CDH1 germline mutation",note:"Hereditary diffuse gastric cancer (HDGC) — family testing and prophylactic gastrectomy for carriers",crit:true},
        {name:"HER2 (IHC + FISH)",note:"Rare in diffuse type (~5%) but must be tested",crit:true},
        {name:"MMR / MSI-H",note:"Rare in diffuse type but opens for pembrolizumab",crit:false},
        {name:"FGFR2 amplifikation",note:"~5–10% in diffuse type — opens for FGFR inhibitors in studies",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → inhibits mTOR and Warburg. Biological rationale in diffuse type."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer RHO/ROCK-invasionsvejen der er central ved diffus type."},
        {name:"Cimetidin",ev:"Fase 2",note:"Anti-adhesion via HSPG inhibition — particularly relevant in the diffuse type's invasive character."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=diffuse+gastric+cancer&type=Interventional&recrs=a" },
  ],
  myeloma:[
    { name:"Standard-Risk Myeloma (IgG/IgA)", criteria:"MM / FISH: no del(17p), t(4;14), t(14;16) / ISS stage I–II", badge:"Targetable — IMiD + PI standard", badgeColor:"#4a8c84",
      biology:"Standard-risk MM is driven by BCL-2 dependence and PI3K/AKT/mTOR. CRBN (cereblon) is the direct target for IMiD agents (lenalidomide, pomalidomide). Energy metabolism is strongly dependent on glutaminolysis and fatty acid synthase. The proteasome is overloaded by massive immunoglobulin production — this is the basis for proteasome inhibitor efficacy.",
      pathways:[{name:"NF-κB",level:"Very high"},{name:"PI3K/AKT/mTOR",level:"High"},{name:"CRBN/IMiD Target",level:"High"},{name:"BCL-2 Anti-apoptosis",level:"High"},{name:"Glutaminolysis",level:"Moderate-high"},{name:"FASN/Lipid Synthesis",level:"Moderate"}],
      biomarkers:[
        {name:"M-protein (IgG/IgA)",note:"Primary monitoring marker. Fall ≥ 50% = partial response",crit:true},
        {name:"Free light chains (kappa/lambda)",note:"Sensitive marker for treatment response — more important than M-protein in non-secretory MM",crit:true},
        {name:"Beta-2-mikroglobulin",note:"ISS staging and prognostic marker",crit:false},
        {name:"LDH",note:"Elevated = aggressive disease course",crit:false},
        {name:"FISH-panel",note:"del(17p), t(4;14), t(14;16), t(11;14) — crucial for risk stratification and venetoclax indication",crit:true},
        {name:"t(11;14)",note:"BCL-2-dependent subtype → venetoclax extremely effective",crit:true}
      ],
      offlabel:[
        {name:"Metformin",ev:"Preclinical",note:"AMPK → inhibits mTOR and NF-κB. Reduces CXCL12-driven bone marrow migration. Preclinical synergy with bortezomib."},
        {name:"Curcumin",ev:"Phase 1–2",note:"NF-κB inhibition and proteasome inhibition. Phase 2 study: curcumin monotherapy reduced M-protein in smoldering MM. 8 g/day liposomal form under investigation."},
        {name:"EGCG",ev:"Preclinical",note:"BCL-2 reduction and proteasome inhibition synergistic with bortezomib. Clinical phase 2 data in CLL/lymphoma."},
        {name:"Disulfiram + kobber",ev:"Preclinical",note:"Proteasome inhibition via NF-κB/ALDH — direct overlap with bortezomib mechanism. Strong preclinical evidence in MM cell lines."},
        {name:"Statin",ev:"Observational",note:"Mevalonate → reduces geranylgeranylation of RAS and RHO which is central to MM survival. Retrospective data: lower MM mortality."},
        {name:"Resveratrol",ev:"Preclinical",note:"SIRT1 activation, NF-κB inhibition and apoptosis induction in MM cell lines. Synergistic with bortezomib."}
      ]
    },
    { name:"High-Risk Myeloma", criteria:"MM / FISH: del(17p) and/or t(4;14) and/or t(14;16) / ISS stage III / R-ISS III", badge:"High risk — aggressive course", badgeColor:"#e06060",
      biology:"High-risk MM is biologically fundamentally different. del(17p) eliminates TP53 giving extremely aggressive course with median OS under 2 years. t(4;14) activates FGFR3 and MMSET. These subtypes are generally IMiD-resistant and require early ASCT. Autophagy is a central resistance mechanism.",
      pathways:[{name:"TP53 Loss (del17p)",level:"Very high"},{name:"FGFR3/MMSET (t4;14)",level:"High"},{name:"NF-κB",level:"Very high"},{name:"Autophagy",level:"High"},{name:"BCL-2 Anti-apoptosis",level:"Moderate"}],
      biomarkers:[
        {name:"del(17p) FISH",note:"Most important negative prognostic marker. Requires intensified treatment and early ASCT",crit:true},
        {name:"t(4;14) FISH",note:"FGFR3 activation → opens for FGFR inhibitors in studies",crit:true},
        {name:"t(14;16) FISH",note:"MAF activation — worst prognosis in the high-risk group",crit:true},
        {name:"Ki-67",note:"High proliferation rate confirms high-risk biology",crit:false},
        {name:"LDH",note:"Elevated LDH = extremely aggressive course",crit:true}
      ],
      offlabel:[
        {name:"HCQ",ev:"Preclinical",note:"Autophagy is the primary resistance mechanism against proteasome inhibitors. HCQ restores bortezomib sensitivity in resistant MM cell lines."},
        {name:"Metformin",ev:"Preclinical",note:"AMPK → inhibits mTOR-dependent autophagy and reduces NF-κB. Particularly relevant in del(17p) as metformin activates TP53-independent apoptosis."},
        {name:"Disulfiram + kobber",ev:"Preclinical",note:"NF-κB inhibition and ALDH blocking is critical in high-risk subtype that is IMiD-refractory."},
        {name:"Curcumin",ev:"Phase 1–2",note:"NF-κB inhibition circumvents IMiD resistance mechanisms. Combination studies with pomalidomide ongoing."}
      ]
    }
  ],

  headneck:[
    { name:"HPV-Positive Oropharyngeal Cancer (OPSCC)", criteria:"Squamous cell carcinoma / oropharynx (tonsil, tongue base) / HPV16+ / p16 IHC+", badge:"Best prognosis — immunotherapy sensitive", badgeColor:"#4a8c84",
      biology:"HPV-positive OPSCC is biologically fundamentally different from HPV-negative. E6/E7 oncoproteins inactivate TP53 and RB1 — but paradoxically this gives better immune response. PI3K is mutated in ~60%. Energy metabolism is strongly Warburg-dominated. PD-L1 is consistently overexpressed and pembrolizumab is approved as 1st line in metastatic disease.",
      pathways:[{name:"HPV E6/E7 → TP53/RB1 Loss",level:"Very high"},{name:"PI3K/AKT/mTOR",level:"High"},{name:"PD-1/PD-L1",level:"High"},{name:"EGFR",level:"Moderate-high"},{name:"Aerobic Glycolysis",level:"High"}],
      biomarkers:[
        {name:"p16 IHC",note:"Surrogate for HPV status. Positive = HPV-positive OPSCC with significantly better prognosis",crit:true},
        {name:"PD-L1 (CPS)",note:"CPS ≥ 1 = pembrolizumab 1st line standard in metastatic/recurrent disease",crit:true},
        {name:"HPV16 DNA",note:"Confirms HPV etiology. Used in ctDNA monitoring",crit:false},
        {name:"PIK3CA mutation",note:"~60% mutated → opens for PI3K inhibitor studies",crit:false},
        {name:"TMB",note:"High TMB = better immunotherapy response",crit:false}
      ],
      offlabel:[
        {name:"Metformin",ev:"Observational",note:"Retrospective data: OPSCC patients on metformin have significantly better locoregional control during chemoradiation. AMPK → inhibits mTOR and aerobic glycolysis."},
        {name:"Aspirin",ev:"Preclinical",note:"COX-2 is overexpressed in HPV+ OPSCC. Aspirin reduces PGE2 that immunosuppresses the microenvironment and synergizes with pembrolizumab."},
        {name:"Celecoxib",ev:"Phase 1–2",note:"Selective COX-2 inhibition — phase 2 combination study with cisplatin and radiation showed improved local control."},
        {name:"Statin",ev:"Observational",note:"Retrospective data: statin users with HNSCC have 20% lower recurrence risk. Mevalonate → reduces RAS and EGFR downstream."},
        {name:"HCQ",ev:"Preclinical",note:"Autophagy is a central resistance mechanism against cetuximab. HCQ restores cetuximab sensitivity in EGFR-overexpressing HNSCC."}
      ]
    },
    { name:"HPV-Negative Head and Neck Cancer (HNSCC)", criteria:"Squamous cell carcinoma / larynx, hypopharynx, oral cavity / HPV-negative / smoking and/or alcohol", badge:"Aggressive — TP53-mutated", badgeColor:"#e06060",
      biology:"HPV-negative HNSCC is characterized by TP53 mutation in ~85% and is biologically far more aggressive than HPV-positive. EGFR is overexpressed in >90% and is the primary target for cetuximab. NF-κB signaling is constitutively activated. Energy metabolism is extremely Warburg-dominated with high glutaminolysis. Prognosis is significantly worse than HPV-positive type.",
      pathways:[{name:"EGFR/RAS/MAPK",level:"Very high"},{name:"TP53-mutation",level:"Very high"},{name:"NF-κB",level:"High"},{name:"PI3K/AKT",level:"High"},{name:"Aerobic Glycolysis",level:"Very high"},{name:"Glutaminolysis",level:"High"}],
      biomarkers:[
        {name:"EGFR IHC/FISH",note:"Overexpressed in >90% — target for cetuximab. Amplification = potentially better response",crit:true},
        {name:"PD-L1 (CPS)",note:"CPS ≥ 1 → pembrolizumab indicated. CPS ≥ 20 = best response",crit:true},
        {name:"TP53 mutation",note:"~85% TP53-mutated — confirms HPV-negative biology and aggressive course",crit:false},
        {name:"CCND1 amplifikation",note:"~30% — drives excessive cell division. Associated with resistance to EGFR inhibitors",crit:false},
        {name:"TMB",note:"Generally lower than HPV+ — but high TMB supports immunotherapy",crit:false}
      ],
      offlabel:[
        {name:"Metformin",ev:"Observational",note:"AMPK → inhibits NF-κB and EGFR-downstream mTOR. Meta-analysis: significantly better OS in HNSCC patients on metformin."},
        {name:"Statin",ev:"Observational",note:"Mevalonate → reduces RAS membrane anchoring and EGFR signaling. Preclinical: synergistic with cetuximab."},
        {name:"Celecoxib",ev:"Phase 1–2",note:"COX-2 massively overexpressed in HPV-negative HNSCC. Phase 2: celecoxib + chemoradiation improved local control and reduction in TP53-mutated cells."},
        {name:"Disulfiram + kobber",ev:"Preclinical",note:"ALDH inhibition targets cancer stem cells driving recurrence in HNSCC. Strong preclinical evidence."},
        {name:"HCQ",ev:"Preclinical",note:"Autophagy is the primary resistance mechanism against cetuximab and cisplatin. HCQ combined with cisplatin increases apoptosis in HNSCC cell lines."}
      ]
    }
  ],

  net:[
    { name:"Gastrointestinal NET (GI-NET) — Low Grade (G1/G2)", criteria:"Neuroendocrine tumor / GI tract (appendix, ileum, rectum, pancreas) / Ki-67 < 20% / grade 1–2", badge:"Slow growth — somatostatin analog standard", badgeColor:"#4a8c84",
      biology:"Low-grade GI-NET is driven by somatostatin receptor (SSTR2/5) overexpression which actually limits growth — this is the basis for octreotide/lanreotide treatment. mTOR is almost universally activated (~80%) and is the target for everolimus. Energy metabolism is relatively low-glycolytic compared to other solid tumors. Carcinoid syndrome (flushing, diarrhea) is caused by serotonin secretion.",
      pathways:[{name:"mTOR/PI3K",level:"Very high"},{name:"SSTR2/5 Signaling",level:"High"},{name:"VEGF/angiogenese",level:"High"},{name:"MEN1 (tumor suppressor)",level:"Moderate"},{name:"Warburg (low)",level:"Low"}],
      biomarkers:[
        {name:"Ki-67 proliferationsindeks",note:"< 3% = G1, 3–20% = G2. Crucial for treatment strategy and prognosis",crit:true},
        {name:"Chromogranin A (CgA)",note:"Primary monitoring marker. Rise = progression. False positive with PPI use",crit:true},
        {name:"24-timers urin-5-HIAA",note:"Serotonin marker. Elevated in carcinoid syndrome and liver metastases",crit:true},
        {name:"SSTR-scintigrafi (Ga-68 DOTATATE PET)",note:"Crucial for staging and PRRT indication. SSTR+ opens for peptide receptor radiotherapy",crit:true},
        {name:"MEN1/VHL/SDH mutation",note:"Hereditary NET — family investigation indicated. MEN1 in pancreatic NET",crit:false}
      ],
      offlabel:[
        {name:"Metformin",ev:"Observational",note:"mTOR is almost universally activated in NET. AMPK → direct mTOR inhibition synergistic with everolimus. Retrospective data: better PFS in NET patients on metformin."},
        {name:"Aspirin",ev:"Preclinical",note:"COX-2 inhibition reduces prostaglandin production driving carcinoid syndrome. Synergistic with octreotide."},
        {name:"Curcumin",ev:"Preclinical",note:"NF-κB and mTOR inhibition. Reduces serotonin secretion in NET cell lines. Preclinical synergy with octreotide."},
        {name:"Berberine",ev:"Preclinical",note:"Natural AMPK activator with mTOR inhibition — equivalent to metformin. Combination studies with everolimus ongoing."},
        {name:"Omega-3",ev:"Observational",note:"Anti-inflammatory and anti-angiogenic. Epidemiological data shows lower NET incidence in high fish oil intake populations."}
      ]
    },
    { name:"High-Grade NEC / Pancreatic NET (pNET)", criteria:"Neuroendocrine carcinoma (NEC) Ki-67 > 20% (G3) / or pancreatic NET (pNET) / SSTR+ or SSTR−", badge:"Aggressive — platinum chemo for NEC", badgeColor:"#b8904a",
      biology:"G3 NEC is biologically close to SCLC with TP53 and RB1 mutation in >90%. pNET G3 (Ki-67 20–55%) is biologically different and retains SSTR expression and better prognosis than NEC. DAXX/ATRX mutation is specific to pNET and associated with alternative telomere lengthening (ALT). VHL mutation is found in ~10% of pNET and opens for belzutifan.",
      pathways:[{name:"TP53/RB1 (NEC)",level:"Very high"},{name:"mTOR/PI3K",level:"High"},{name:"DAXX/ATRX (pNET)",level:"Moderate"},{name:"VEGF/angiogenese",level:"High"},{name:"MYC Amplification (NEC)",level:"Moderate-high"}],
      biomarkers:[
        {name:"Ki-67 > 55%",note:"Likely NEC biology — treated as SCLC (platinum chemo). Ki-67 20–55% = pNET G3 with better prognosis",crit:true},
        {name:"DAXX/ATRX mutation",note:"Specific to pNET. Associated with ALT and metastatic risk. Most important prognostic marker",crit:true},
        {name:"VHL mutation",note:"~10% pNET → belzutifan studies ongoing",crit:false},
        {name:"TP53/RB1 mutation",note:"Confirms NEC biology over NET — switch to platinum chemo",crit:true},
        {name:"Chromogranin A",note:"Low/negative in NEC — positive in SSTR-expressing pNET",crit:false}
      ],
      offlabel:[
        {name:"Metformin",ev:"Preclinical",note:"AMPK → inhibits mTOR which is activated in both pNET and NEC. Synergistic with everolimus in pNET."},
        {name:"Statin",ev:"Preclinical",note:"Mevalonate → reduces RAS and MYC-driven proliferation. Anti-angiogenic effect via VEGF reduction."},
        {name:"HCQ",ev:"Preclinical",note:"NEC is strongly autophagy-dependent analogous to SCLC. HCQ + platinum chemo increases apoptosis in NEC cell lines."},
        {name:"Disulfiram + kobber",ev:"Preclinical",note:"ALDH inhibition targets stem cells driving NEC recurrence. NF-κB inhibition synergistic with platinum chemo."}
      ]
    }
  ],

  cervical:[
    { name:"Locally Advanced Cervical Cancer (LACC)", criteria:"Squamous cell carcinoma or adenocarcinoma / stage IB2–IVA / HPV-related (>99%) / chemoradiation", badge:"Chemoradiation + pembrolizumab", badgeColor:"#4a8c84",
      biology:"Cervical cancer is in >99% caused by persistent HPV infection (primarily HPV16 and HPV18). HPV E6 inactivates TP53 and E7 inactivates RB1 — analogous to HPV+ OPSCC. PI3K is mutated in ~30%. PD-L1 is consistently overexpressed. Chemoradiation (cisplatin + radiation) is the standard treatment for locally advanced disease. VEGF-driven angiogenesis is massive and bevacizumab improves OS in metastatic disease.",
      pathways:[{name:"HPV E6/E7 → TP53/RB1",level:"Very high"},{name:"PI3K/AKT/mTOR",level:"High"},{name:"PD-1/PD-L1",level:"High"},{name:"VEGF/angiogenese",level:"High"},{name:"Aerobic Glycolysis",level:"High"}],
      biomarkers:[
        {name:"HPV-genotype (16/18)",note:"HPV16 = highest cancer risk and best immunotherapy response. HPV18 = adenocarcinoma-associated",crit:true},
        {name:"PD-L1 (CPS)",note:"CPS ≥ 1 → pembrolizumab added to chemoradiation (KEYNOTE-A18). Crucial test",crit:true},
        {name:"PIK3CA mutation",note:"~30% mutated → PI3K inhibitor studies. Associated with radiation resistance",crit:false},
        {name:"VEGF/bevacizumab indikation",note:"Metastatic disease: bevacizumab + chemo markedly improves OS (GOG-240)",crit:false},
        {name:"HER2 amplifikation",note:"~5–10% — opens for trastuzumab studies in metastatic disease",crit:false}
      ],
      offlabel:[
        {name:"Metformin",ev:"Observational",note:"Retrospective data: diabetics with cervical cancer on metformin have significantly better local control during chemoradiation. AMPK → inhibits mTOR and reduces radiation resistance."},
        {name:"Aspirin",ev:"Preclinical",note:"COX-2 is massively overexpressed in cervical cancer. Aspirin reduces PGE2-driven immunosuppression and synergizes with pembrolizumab."},
        {name:"Celecoxib",ev:"Phase 1–2",note:"Phase 2: celecoxib + chemoradiation showed increased complete response rate. COX-2 overexpression provides biologically strong rationale."},
        {name:"Curcumin",ev:"Preclinical",note:"NF-κB inhibition and HPV E6/E7 reduction in cervical cancer cell lines. Reduces cisplatin resistance. Preclinical synergy with cisplatin."},
        {name:"Statin",ev:"Observational",note:"Retrospective data: lower cervical cancer incidence and better survival in statin users. Mevalonate → reduces RAS and VEGF."},
        {name:"Propranolol",ev:"Preclinical",note:"Beta-adrenergic signaling drives VEGF and immunosuppression in cervical cancer. Combination studies with pembrolizumab ongoing."}
      ]
    },
    { name:"Metastatic / Recurrent Cervical Cancer", criteria:"Stage IVB or recurrence after primary treatment / squamous cell or adenocarcinoma / distant metastases", badge:"Pembrolizumab + bevacizumab", badgeColor:"#b8904a",
      biology:"Metastatic cervical cancer has extremely poor prognosis with median OS of 10–17 months. VEGF-driven angiogenesis is massive — bevacizumab is a crucial addition. PD-L1 expression is high and pembrolizumab is now standard. Resistance to cisplatin is driven by activated autophagy and ALDH-positive stem cells. Targetable alterations are rare but PIK3CA and HER2 occur.",
      pathways:[{name:"VEGF/angiogenese",level:"Very high"},{name:"PD-1/PD-L1",level:"High"},{name:"Autopagi (resistens)",level:"High"},{name:"PI3K/AKT (resistens)",level:"Moderate-high"},{name:"ALDH/stamceller",level:"Moderate"}],
      biomarkers:[
        {name:"PD-L1 (CPS)",note:"CPS ≥ 1 = pembrolizumab + kemo standard (KEYNOTE-826). CPS ≥ 10 = greatest benefit",crit:true},
        {name:"MSI-H / TMB-high",note:"Rare (~5%) but opens for tumor-agnostic pembrolizumab",crit:false},
        {name:"HER2 amplifikation",note:"~10% — trastuzumab studies ongoing. Important to test",crit:false},
        {name:"PIK3CA mutation",note:"Opens for alpelisib studies in platinum-resistant disease",crit:false}
      ],
      offlabel:[
        {name:"HCQ",ev:"Preclinical",note:"Autophagy is the primary cisplatin resistance mechanism in cervical cancer cells. HCQ + cisplatin increases apoptosis in resistant cell lines."},
        {name:"Metformin",ev:"Preclinical",note:"AMPK → inhibits mTOR and PI3K which are active in cisplatin resistance. Reduces ALDH-positive stem cells."},
        {name:"Disulfiram + kobber",ev:"Preclinical",note:"ALDH inhibition targets cisplatin-resistant stem cells. NF-κB inhibition combined with pembrolizumab has biological rationale."},
        {name:"Artesunate",ev:"Preclinical",note:"Ferroptosis induction in iron-loaded cervical cancer cells. Reduces VEGF and HIF-1α. Preclinical synergy with cisplatin."}
      ]
    }
  ],

  esophageal:[
    { name:"Esophageal Adenocarcinoma (EAC) / GEJ", criteria:"Adenocarcinoma / esophagus or gastroesophageal junction (GEJ) / typically Barrett esophagus background", badge:"HER2 + PD-L1 crucial", badgeColor:"#4a8c84",
      biology:"Esophageal adenocarcinoma typically arises on a background of Barrett esophagus via a chronic inflammation-dysplasia-carcinoma sequence. HER2 amplification is seen in ~15–20% and is the most important targetable alteration. PI3K and VEGF are hyperactivated. Energy metabolism is strongly Warburg-dominated. The immune microenvironment is generally cold but PD-L1 overexpression opens for immunotherapy.",
      pathways:[{name:"HER2/ErbB2",level:"High (subset)"},{name:"PI3K/AKT/mTOR",level:"High"},{name:"VEGF/angiogenese",level:"High"},{name:"NF-κB",level:"Moderate-high"},{name:"Aerobic Glycolysis",level:"High"}],
      biomarkers:[
        {name:"HER2 (IHC/FISH)",note:"~15–20% positive → trastuzumab added to chemo (ToGA analogy). MOST IMPORTANT test",crit:true},
        {name:"PD-L1 (CPS)",note:"CPS ≥ 5 → nivolumab + chemo (CheckMate-649). CPS ≥ 10 = greatest benefit",crit:true},
        {name:"MSI-H",note:"~3–5% — tumor-agnostic pembrolizumab",crit:false},
        {name:"VEGFR2 ekspression",note:"Target for ramucirumab in 2nd line metastatic disease",crit:false},
        {name:"FGFR2 amplifikation",note:"~5% — opens for FGFR inhibitors in studies",crit:false}
      ],
      offlabel:[
        {name:"Metformin",ev:"Observational",note:"Retrospective data: esophageal cancer patients on metformin have better OS. AMPK → inhibits mTOR and HER2-downstream PI3K. Reduces VEGF expression."},
        {name:"Statin",ev:"Observational",note:"Meta-analysis: lower incidence of esophageal cancer in statin users. Mevalonate → reduces RAS/MAPK and HER2 membrane localization."},
        {name:"Aspirin",ev:"Observational",note:"Multiple cohort studies: aspirin reduces risk of Barrett esophagus progression to carcinoma. COX-2 inhibition central to the inflammatory etiology."},
        {name:"Curcumin",ev:"Preclinical",note:"NF-κB and HER2-downstream inhibition. Reduces chemotherapy resistance. Pilot phase 1 data in esophageal cancer."},
        {name:"Cimetidin",ev:"Observational",note:"Anti-adhesion via HSPG inhibition. Case series suggest anti-metastatic effect in esophageal cancer analogous to gastric cancer."}
      ]
    },
    { name:"Esophageal Squamous Cell Carcinoma (ESCC)", criteria:"Squamous cell carcinoma / esophagus / typically middle or upper third / smoking and alcohol", badge:"Immunotherapy sensitive — PD-L1", badgeColor:"#b8904a",
      biology:"ESCC is biologically very similar to HPV-negative HNSCC. TP53 mutation is almost universal (>85%). EGFR amplification is seen in ~30%. Energy metabolism is extremely Warburg-dominated with high glycolysis and glutaminolysis. PD-L1 overexpression is frequent and pembrolizumab + chemo is now 1st line standard. CD274 amplification (PD-L1 gene) drives immunotherapy response.",
      pathways:[{name:"TP53-mutation",level:"Very high"},{name:"EGFR/RAS/MAPK",level:"High"},{name:"NF-κB",level:"High"},{name:"PD-1/PD-L1",level:"High"},{name:"Aerobic Glycolysis",level:"Very high"},{name:"Glutaminolysis",level:"High"}],
      biomarkers:[
        {name:"PD-L1 (CPS)",note:"CPS ≥ 10 → pembrolizumab + chemo 1st line standard (KEYNOTE-590)",crit:true},
        {name:"EGFR amplifikation/overekspression",note:"~30% — cetuximab studies ongoing. Associated with resistance",crit:false},
        {name:"TP53 mutation",note:"Almost universal — confirms ESCC biology",crit:false},
        {name:"TMB",note:"High TMB = better immunotherapy response",crit:false},
        {name:"MSI-H",note:"Rare in ESCC but opens for tumor-agnostic pembrolizumab",crit:false}
      ],
      offlabel:[
        {name:"Metformin",ev:"Preclinical",note:"AMPK → inhibits NF-κB and aerobic glycolysis. Reduces PD-L1 expression and synergy with pembrolizumab. Clinical observational data promising."},
        {name:"Disulfiram + kobber",ev:"Preclinical",note:"ALDH is overexpressed in ESCC stem cells driving chemotherapy resistance. Disulfiram + copper is particularly potent against ALDH-positive cells."},
        {name:"Mebendazol",ev:"Preclinical",note:"Tubulin inhibition and VEGF reduction. EGFR inhibition overlaps biologically with cetuximab mechanism. Preclinical evidence in ESCC cell lines."},
        {name:"Celecoxib",ev:"Phase 1–2",note:"COX-2 is massively overexpressed in ESCC. Phase 2: celecoxib + chemoradiation showed increased pathological complete response."},
        {name:"Aspirin",ev:"Observational",note:"Population-based studies: aspirin reduces ESCC risk by ~30%. Anti-inflammatory mechanism particularly relevant in alcohol/smoking-related etiology."}
      ]
    }
  ]

};


// ─── KRÆFTTYPE DATA ───────────────────────────────────────────────────────────
const CANCER_DATA = [
  {id:"breast",dk_key:"breast",name:"Breast Cancer",nameEn:"Breast Cancer",icd10:"C50",icon:"🎗️",dk:"~5.000/år",fy:"87%",organ:"Breast",
   desc:"Breast cancer occurs when cells in breast tissue begin to grow uncontrollably. It is the most common cancer in women. The cancer cells' receptors act as keys determining which medication works best.",
   sub:["Luminal A — hormone-sensitive (ER+/PR+), slow growth and best prognosis","Luminal B — hormone-sensitive and HER2+","HER2-overexpressed — grows rapidly but responds well to Herceptin","Triple-negative (TNBC) — no receptors, requires chemotherapy, can be cured"],
   tx:"Surgery is typically the first step. Hormone-sensitive cancer (ER+) is treated with daily hormone tablets for 5–10 years (tamoxifen or aromatase inhibitors). HER2+ is treated with Herceptin infusions for one year. Triple-negative cancer is treated with chemotherapy (AC + taxanes). CDK4/6 inhibitors (palbociclib) are given for advanced hormone-sensitive type.",
   meds:[MED.metformin,MED.aspirin,MED.statiner,MED.doxycyclin,MED.cimetidin,MED.dipyridamol,MED.propranolol,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.disulfiram,MED.ldn,MED.niclosamid,MED.hydroxychloroquin,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.omega3,SUP.melatonin,SUP.egcg,SUP.artemisinin,SUP.berberine,SUP.ala,SUP.vitaminE,SUP.quercetin,SUP.mcp,SUP.boswellia,SUP.sulforafan,SUP.resveratrol]},

  {id:"lung",dk_key:"lung",name:"Lung Cancer",nameEn:"Lung Cancer",icd10:"C34",icon:"🫁",dk:"~4.800/år",fy:"20%",organ:"Lung",
   desc:"Lung cancer causes the most cancer deaths. It is divided into non-small cell (NSCLC, ~85%) and small cell (SCLC, ~15%). Modern genetic testing opens for targeted treatments in tablet form.",
   sub:["NSCLC Adenocarcinoma — most common, mutation screening important","NSCLC Squamous cell — typically smokers, central location","NSCLC Large cell — aggressive, rare subtype","SCLC Small cell — very aggressive, spreads rapidly"],
   tx:"Early lung cancer is treated with surgery. Advanced NSCLC: mutation testing is crucial — EGFR mutation gives osimertinib tablets, ALK rearrangement gives alectinib, KRAS G12C gives sotorasib. Without mutation: immunotherapy (pembrolizumab) if PD-L1 is positive. Small cell: chemotherapy + radiation.",
   meds:[MED.metformin,MED.itraconazol,MED.hydroxychloroquin,MED.doxycyclin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.propranolol,MED.aspirin,MED.cimetidin,MED.disulfiram,MED.niclosamid,MED.dca,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.sulforafan,SUP.astragalus,SUP.artemisinin,SUP.melatonin,SUP.egcg,SUP.berberine,SUP.boswellia,SUP.ala,SUP.omega3,SUP.quercetin,SUP.vitaminE,SUP.cbd]},

  {id:"colorectal",dk_key:"colorectal",name:"Colorectal Cancer",nameEn:"Colorectal Cancer",icd10:"C18-C20",icon:"🔴",dk:"~5.000/år",fy:"65%",organ:"Colon/Rectum",
   desc:"Colorectal cancer arises in the colon or rectum and is one of the most common cancers. MSI status determines whether immunotherapy works. The off-label evidence is particularly strong here.",
   sub:["Colon carcinoma (C18) — arising in the colon","Rectal carcinoma (C20) — in the rectum, different treatment approach","MSI-high (~15%) — responds well to immunotherapy","MSS/MSI-low (~85%) — immunotherapy rarely effective"],
   tx:"Surgery is the cornerstone. Rectal cancer is typically treated with radiation and chemotherapy BEFORE surgery. Adjuvant chemotherapy at stage III: FOLFOX for 6 months. Metastatic disease: FOLFOX or FOLFIRI plus biological agents. Immunotherapy (pembrolizumab) is very effective in MSI-H cancer.",
   meds:[MED.aspirin,MED.metformin,MED.celecoxib,MED.statiner,MED.cimetidin,MED.mebendazol,MED.ivermectin,MED.fenbendazol,MED.dipyridamol,MED.doxycyclin,MED.disulfiram,MED.niclosamid,MED.propranolol,MED.hydroxychloroquin,MED.losartan,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.berberine,SUP.probiotika,SUP.artemisinin,SUP.egcg,SUP.sulforafan,SUP.melatonin,SUP.mcp,SUP.psk,SUP.quercetin,SUP.omega3,SUP.boswellia,SUP.resveratrol]},

  {id:"prostate",dk_key:"prostate",name:"Prostate Cancer",nameEn:"Prostate Cancer",icd10:"C61",icon:"🔵",dk:"~5.500/år",fy:"92%",organ:"Prostate",
   desc:"Prostate cancer is the most common cancer in men. Many cases grow very slowly and do not require immediate treatment. Cancer cells depend on testosterone to grow.",
   sub:["Localized low-risk — active surveillance often the right choice","Localized high-risk — surgery or radiation recommended","Metastatic hormone-sensitive (mHSPC) — responds to hormone therapy","Castration-resistant (CRPC) — grows despite hormone therapy"],
   tx:"Low-risk: Active surveillance with regular PSA measurements. High-risk localized: Radical prostatectomy or radiotherapy. Metastatic: GnRH agonists lowering testosterone plus enzalutamide or abiraterone. PARP inhibitors for BRCA mutation.",
   meds:[MED.metformin,MED.statiner,MED.itraconazol,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.propranolol,MED.disulfiram,MED.niclosamid,MED.cimetidin,MED.ldn,MED.doxycyclin,MED.artesunate],
   sups:[SUP.lycopin,SUP.granataeble,SUP.egcg,SUP.vitamind,SUP.selen,SUP.curcumin,SUP.artemisinin,SUP.quercetin,SUP.mcp,SUP.berberine,SUP.melatonin,SUP.boswellia,SUP.resveratrol,SUP.omega3,SUP.sulforafan]},

  {id:"melanoma",dk_key:"melanoma",name:"Skin Cancer (Melanoma)",nameEn:"Melanoma",icd10:"C43",icon:"🌑",dk:"~2.200/år",fy:"St.I: 98%, St.IV: 25%",organ:"Skin",
   desc:"Melanoma is the most dangerous form of skin cancer. Early detection is critical. Immunotherapy has revolutionized treatment over the past 10 years. BRAF mutation (in ~50%) opens for highly effective targeted treatment.",
   sub:["BRAF V600E (~50%) — mutation enabling effective combination treatment","NRAS-mutated (~20%) — immunotherapy is primary choice","Wild-type — neither BRAF nor NRAS mutation","Uveal melanoma — arises in the eye, different biology"],
   tx:"Localized melanoma: Surgical excision with safety margin. Advanced melanoma: Immunotherapy is the cornerstone — pembrolizumab or nivolumab, or the combination ipilimumab plus nivolumab. BRAF V600E-positive: BRAF/MEK inhibitors (dabrafenib plus trametinib).",
   meds:[MED.metformin,MED.propranolol,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.aspirin,MED.hydroxychloroquin,MED.disulfiram,MED.cimetidin,MED.doxycyclin,MED.niclosamid,MED.artesunate],
   sups:[SUP.vitamind,SUP.curcumin,SUP.melatonin,SUP.resveratrol,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.quercetin,SUP.ala,SUP.sulforafan,SUP.omega3,SUP.cbd]},

  {id:"bladder",dk_key:"bladder",name:"Bladder Cancer",nameEn:"Bladder Cancer",icd10:"C67",icon:"🫧",dk:"~2.600/år",fy:"Overfladisk >80%, MIBC ~50%",organ:"Bladder",
   desc:"Bladder cancer arises in the bladder lining and is closely linked to smoking. Blood in the urine is the classic first symptom. The cancer's depth into the bladder wall determines treatment.",
   sub:["NMIBC Low-risk — superficial, low likelihood of recurrence","NMIBC High-risk with CIS — carcinoma in situ, aggressive flat form","MIBC — cancer grows into the muscle wall","Metastatic urothelial carcinoma — spread to other organs"],
   tx:"NMIBC: Endoscopic resection (TUR-B) followed by BCG instillations directly into the bladder. MIBC: Radical cystectomy or bladder-preserving radiation plus chemotherapy. Metastatic: Chemotherapy (gemcitabine + cisplatin), immunotherapy (atezolizumab, pembrolizumab).",
   meds:[MED.metformin,MED.statiner,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.cimetidin,MED.disulfiram,MED.doxycyclin,MED.propranolol,MED.niclosamid,MED.artesunate],
   sups:[SUP.egcg,SUP.vitamind,SUP.curcumin,SUP.artemisinin,SUP.sulforafan,SUP.berberine,SUP.melatonin,SUP.quercetin,SUP.omega3]},

  {id:"lymphoma",dk_key:"lymphoma",name:"Lymphoma",nameEn:"Lymphoma",icd10:"C81-C85",icon:"🟣",dk:"~2.000/år",fy:"Hodgkin 90%, DLBCL 65%",organ:"Lymphatic system",
   desc:"Lymphoma is cancer of the lymphatic system. It is divided into Hodgkin and non-Hodgkin lymphoma. Swollen lymph nodes, fatigue, night sweats and unexplained weight loss are classic symptoms.",
   sub:["Hodgkin lymphoma — typically younger patients, cured in ~90%","DLBCL — diffuse large B-cell lymphoma, most common non-Hodgkin","Follicular lymphoma — slow-growing, good prognosis","Mantle cell lymphoma — aggressive, rare"],
   tx:"Hodgkin: ABVD chemotherapy (4–6 cycles) with or without radiation. DLBCL: R-CHOP protocol (rituximab + chemotherapy, 6 cycles). Follicular: Watch and wait for asymptomatic disease. CAR-T cell therapy and stem cell transplantation for relapse.",
   meds:[MED.metformin,MED.hydroxychloroquin,MED.statiner,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.doxycyclin,MED.disulfiram,MED.cimetidin,MED.niclosamid,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.melatonin,SUP.artemisinin,SUP.boswellia,SUP.egcg,SUP.psk,SUP.berberine,SUP.resveratrol,SUP.quercetin,SUP.omega3]},

  {id:"leukemia",dk_key:"leukemia",name:"Leukemia",nameEn:"Leukemia",icd10:"C91-C95",icon:"🩸",dk:"~1.400/år",fy:"CML >90%, CLL 85%, AML 30%",organ:"Blood/Bone marrow",
   desc:"Leukemia is cancer of the blood and bone marrow. There are four main types: acute (AML and ALL) and chronic (CML and CLL). Fatigue, bleeding tendency and frequent infections are typical symptoms.",
   sub:["AML — Acute myeloid leukemia, requires immediate treatment","ALL — Acute lymphoblastic leukemia, most common in children, good prognosis","CML — Chronic myeloid leukemia (BCR-ABL), nearly curable with tablets","CLL — Chronic lymphocytic leukemia, slow, many live normally for many years"],
   tx:"AML: Intensive chemotherapy (7+3 protocol) followed by bone marrow transplantation in high-risk. CML: TKI tablets daily — imatinib (Gleevec), nilotinib or dasatinib. CLL: Ibrutinib (BTK inhibitor) or venetoclax plus obinutuzumab.",
   meds:[MED.metformin,MED.hydroxychloroquin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.disulfiram,MED.doxycyclin,MED.niclosamid,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.resveratrol,SUP.artemisinin,SUP.boswellia,SUP.berberine,SUP.egcg,SUP.melatonin,SUP.quercetin,SUP.ala]},

  {id:"pancreatic",dk_key:"pancreatic",name:"Pancreatic Cancer",nameEn:"Pancreatic Cancer",icd10:"C25",icon:"🟡",dk:"~1.000/år",fy:"12%",organ:"Pancreas",
   desc:"Pancreatic cancer has the worst prognosis of all solid tumors. Late diagnosis and extremely desmoplastic stroma make treatment particularly difficult. Early BRCA testing is critical.",
   sub:["Ductal adenocarcinoma (PDAC, >90%) — the aggressive and most common form","Neuroendocrine tumor (pNET) — grows slower, substantially better prognosis","Metastatic PDAC — spread to liver or lung at diagnosis"],
   tx:"Whipple surgery is the only curative treatment — but only ~20% are operable. Chemotherapy: FOLFIRINOX or gemcitabine plus nab-paclitaxel. Losartan is being studied to soften the stroma. Immunotherapy rarely works in PDAC.",
   meds:[MED.metformin,MED.hydroxychloroquin,MED.itraconazol,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.propranolol,MED.losartan,MED.disulfiram,MED.doxycyclin,MED.niclosamid,MED.dca,MED.artesunate,MED.celecoxib],
   sups:[SUP.curcumin,SUP.artemisinin,SUP.quercetin,SUP.vitamind,SUP.melatonin,SUP.sulforafan,SUP.omega3,SUP.boswellia,SUP.berberine,SUP.egcg,SUP.cbd,SUP.vitaminE,SUP.ala]},

  {id:"thyroid",dk_key:"thyroid",name:"Thyroid Cancer",nameEn:"Thyroid Cancer",icd10:"C73",icon:"🦋",dk:"~800/år",fy:"PTC/FTC >95%, ATC <10%",organ:"Thyroid",
   desc:"Thyroid cancer is often detected incidentally on ultrasound. Papillary and follicular types are treatment-responsive with excellent prognosis. Anaplastic is extremely aggressive.",
   sub:["Papillary (PTC, ~85%) — slow growth, excellent prognosis","Follicular (FTC, ~10%) — good prognosis","Medullary (MTC, ~3%) — RET mutation, family testing recommended","Anaplastic (ATC, ~2%) — extremely aggressive"],
   tx:"Thyroidectomy followed by radioactive iodine (RAI). Lifelong levothyroxine thereafter. RAI-refractory DTC: lenvatinib or sorafenib. Anaplastic with BRAF V600E: dabrafenib plus trametinib plus pembrolizumab.",
   meds:[MED.metformin,MED.aspirin,MED.hydroxychloroquin,MED.ldn,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.artesunate,MED.propranolol,MED.disulfiram,MED.doxycyclin,MED.niclosamid,MED.itraconazol],
   sups:[SUP.selen,SUP.vitamind,SUP.curcumin,SUP.quercetin,SUP.melatonin,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.boswellia,SUP.omega3]},

  {id:"kidney",dk_key:"kidney",name:"Kidney Cancer",nameEn:"Renal Cell Carcinoma",icd10:"C64",icon:"🫘",dk:"~1.000/år",fy:"Lokaliseret 93%, Metastatisk 12%",organ:"Kidney",
   desc:"Kidney cancer most often arises in one kidney and is frequently detected incidentally on scanning. Metastatic kidney cancer is treated with a new generation of immunotherapy and targeted agents.",
   sub:["Clear cell carcinoma (~80%) — most common, responds well to immunotherapy","Papillary RCC (~15%) — two subtypes with slightly different biology","Chromophobe RCC (~5%) — slow growth, generally good prognosis","Metastatic RCC — treated as chronic disease"],
   tx:"Localized: Radical nephrectomy or kidney-sparing partial nephrectomy. Metastatic: Dual immunotherapy (nivolumab plus ipilimumab) or pembrolizumab plus axitinib is now standard. TKI: sunitinib, pazopanib, cabozantinib.",
   meds:[MED.metformin,MED.statiner,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.hydroxychloroquin,MED.propranolol,MED.aspirin,MED.disulfiram,MED.doxycyclin,MED.itraconazol,MED.niclosamid,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.melatonin,SUP.quercetin,SUP.omega3,SUP.sulforafan,SUP.boswellia,SUP.ala]},

  {id:"uterine",dk_key:"uterine",name:"Endometrial Cancer",nameEn:"Endometrial Cancer",icd10:"C54",icon:"🔶",dk:"~1.200/år",fy:"~82%",organ:"Uterus",
   desc:"Endometrial cancer arises in the uterine lining and is the most common cancer of the female genital tract. It is typically detected early. Metformin has particularly strong evidence here.",
   sub:["Type 1 — Endometrioid carcinoma (~80%), hormone-sensitive, good prognosis","Type 2 — Serous or clear cell carcinoma, aggressive","MMR-deficient / MSI-high (~25–30%) — good candidate for immunotherapy","HER2+ serous (~20%) — responds to trastuzumab"],
   tx:"Hysterectomy is standard treatment and curative for most. Adjuvant radiotherapy for high-risk. Chemotherapy for advanced disease. Immunotherapy: pembrolizumab for MSI-H/MMR-deficient type.",
   meds:[MED.metformin,MED.aspirin,MED.statiner,MED.mebendazol,MED.ivermectin,MED.fenbendazol,MED.propranolol,MED.hydroxychloroquin,MED.cimetidin,MED.doxycyclin,MED.disulfiram,MED.niclosamid,MED.artesunate,MED.ldn],
   sups:[SUP.curcumin,SUP.vitamind,SUP.berberine,SUP.artemisinin,SUP.melatonin,SUP.egcg,SUP.omega3,SUP.quercetin,SUP.sulforafan,SUP.resveratrol,SUP.mcp]},

  {id:"ovarian",dk_key:"ovarian",name:"Ovarian Cancer",nameEn:"Ovarian Cancer",icd10:"C56",icon:"🟠",dk:"~600/år",fy:"~47%",organ:"Ovaries",
   desc:"Ovarian cancer is one of the most difficult gynecological cancers because symptoms are vague. ~75% are detected at stage III–IV. PARP inhibitors have markedly changed the prognosis for BRCA-positive patients.",
   sub:["High-grade serous (HGSOC, ~70%) — most common, aggressive, BRCA mutation frequent","Low-grade serous — slow-growing, chemo-resistant","Endometrioid (~10%) — biologically similar to endometrial cancer","Clear cell (~10%) — moderately aggressive"],
   tx:"Primary cytoreduction (debulking) — surgery to remove all visible tumor tissue. Carboplatin plus paclitaxel chemotherapy for 6 cycles. Bevacizumab for advanced disease. PARP inhibitors (olaparib/niraparib) as maintenance therapy in BRCA+ provides markedly prolonged survival.",
   meds:[MED.metformin,MED.statiner,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.hydroxychloroquin,MED.doxycyclin,MED.disulfiram,MED.niclosamid,MED.propranolol,MED.artesunate,MED.losartan,MED.cimetidin],
   sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.melatonin,SUP.omega3,SUP.berberine,SUP.egcg,SUP.quercetin,SUP.sulforafan,SUP.mcp,SUP.vitaminE]},

  {id:"brain",dk_key:"brain",name:"Brain Tumor",nameEn:"Brain Tumor",icd10:"C71",icon:"🧠",dk:"~800/år",fy:"GBM <5%, Grad II ~70%",organ:"Brain",
   desc:"Brain tumors are divided into primary (arising in the brain itself) and secondary (metastases from cancer elsewhere). Glioblastoma (GBM) is the most common and aggressive primary brain tumor.",
   sub:["Glioblastoma (GBM, grade IV) — most common and aggressive primary brain tumor","Astrocytoma (grade II–III) — slower growth, IDH mutation is a good prognostic factor","Oligodendroglioma — slow growth, 1p/19q co-deletion gives good chemo response","Brain metastases — spread from breast, lung, melanoma or kidney"],
   tx:"Maximal safe surgical resection. GBM: Stupp protocol — radiotherapy plus temozolomide chemotherapy simultaneously for 6 weeks, then temozolomide for 6 months. Bevacizumab for relapse. TTFields (electric field device) prolongs survival.",
   meds:[MED.metformin,MED.disulfiram,MED.mebendazol,MED.fenbendazol,MED.ivermectin,MED.hydroxychloroquin,MED.itraconazol,MED.dca,MED.artesunate,MED.losartan,MED.celecoxib,MED.doxycyclin],
   sups:[SUP.boswellia,SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.melatonin,SUP.berberine,SUP.omega3,SUP.egcg,SUP.quercetin,SUP.ala,SUP.cbd]},

  {id:"liver",dk_key:"liver",name:"Liver Cancer",nameEn:"Liver Cancer (HCC)",icd10:"C22",icon:"🟤",dk:"~500/år",fy:"Tidlig ~40%, Fremskreden <5%",organ:"Liver",
   desc:"Primary liver cancer (HCC) most often arises in people with chronic liver disease — cirrhosis due to hepatitis B/C, alcohol or fatty liver.",
   sub:["Hepatocellular carcinoma (HCC, ~80%) — classic liver cancer in cirrhosis","Cholangiocarcinoma (bile ducts, ~15%) — aggressive","Liver metastases — spread from colorectal, breast and lung cancer","Fibrolamellar HCC — rare, younger patients, better prognosis"],
   tx:"Curative potential only with localized disease: Surgical resection or liver transplantation. TACE (transarterial chemoembolization). Systemic: atezolizumab plus bevacizumab is now standard.",
   meds:[MED.metformin,MED.statiner,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.disulfiram,MED.doxycyclin,MED.hydroxychloroquin,MED.propranolol,MED.niclosamid,MED.artesunate,MED.itraconazol,MED.cimetidin],
   sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.melatonin,SUP.omega3,SUP.quercetin,SUP.sulforafan,SUP.mcp,SUP.ala,SUP.silymarin]},

  {id:"gastric",dk_key:"gastric",name:"Gastric Cancer",nameEn:"Gastric Cancer",icd10:"C16",icon:"🫙",dk:"~500/år",fy:"Tidlig ~70%, Avanceret <5%",organ:"Stomach",
   desc:"Gastric cancer is often detected late as symptoms are easily confused with benign stomach problems. Helicobacter pylori infection is the most important risk factor.",
   sub:["Intestinal type — similar to colorectal cancer, better prognosis, H. pylori-related","Diffuse type (signet ring cells) — aggressive, spreads early","HER2-positive (~15–20%) — responds well to trastuzumab","Gastric GIST — gastrointestinal stromal tumor, imatinib-sensitive"],
   tx:"Curative: Gastrectomy with lymph node dissection. Perioperative chemotherapy (FLOT protocol) is standard. HER2+: trastuzumab is added. Advanced disease: nivolumab plus chemotherapy.",
   meds:[MED.metformin,MED.aspirin,MED.statiner,MED.cimetidin,MED.mebendazol,MED.ivermectin,MED.fenbendazol,MED.doxycyclin,MED.hydroxychloroquin,MED.disulfiram,MED.propranolol,MED.artesunate,MED.niclosamid],
   sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.melatonin,SUP.omega3,SUP.quercetin,SUP.sulforafan,SUP.probiotika,SUP.mcp,SUP.psk]},
  {id:"myeloma",dk_key:"myeloma",name:"Multiple Myeloma",nameEn:"Multiple Myeloma",icd10:"C90",icon:"🦴",dk:"~600/year",fy:"5-yr survival ~55%",organ:"Bone Marrow",
   desc:"Multiple myeloma is cancer of the bone marrow's plasma cells that produce antibodies. The disease is not curable but can be controlled as a chronic condition for many years. The off-label evidence is particularly strong here — metformin and curcumin have documented effects directly in myeloma cells.",
   sub:["IgG myeloma (~50%) — most common, relatively good prognosis","IgA myeloma (~20%) — higher risk of hyperviscosity","Light chain myeloma (~20%) — light chains only, higher kidney damage risk","Non-secretory myeloma (~3%) — no measurable M-protein production"],
   tx:"Autologous stem cell transplantation is the cornerstone for eligible patients. Induction chemo: VRd (bortezomib + lenalidomide + dexamethasone) for 4–6 cycles. Anti-CD38 antibody (daratumumab) is now added to many regimens. Maintenance with lenalidomide after transplantation. BCMA-targeted therapy (belantamab, teclistamab) at relapse.",
   meds:[MED.metformin,MED.hydroxychloroquin,MED.statiner,MED.ivermectin,MED.doxycyclin,MED.disulfiram,MED.aspirin,MED.niclosamid,MED.artesunate,MED.mebendazol],
   sups:[SUP.curcumin,SUP.egcg,SUP.resveratrol,SUP.vitamind,SUP.boswellia,SUP.quercetin,SUP.artemisinin,SUP.omega3,SUP.berberine,SUP.melatonin]},

  {id:"headneck",dk_key:"headneck",name:"Head and Neck Cancer",nameEn:"Head and Neck Cancer",icd10:"C00-C14",icon:"🗣️",dk:"~1,000/year",fy:"~65%",organ:"Mouth/Throat/Larynx",
   desc:"Head and neck cancer arises in the oral cavity, throat, larynx and salivary glands. HPV-related oropharyngeal cancer is a distinct biological subtype with markedly better prognosis and good immunotherapy response. Smoking and alcohol are the most important risk factors for the non-HPV type.",
   sub:["HPV-related oropharyngeal cancer — younger age, better prognosis, good immunotherapy response","Oral cavity cancer — smoking/alcohol, typically older patients","Laryngeal cancer — smokers, hoarseness is an early symptom","Salivary gland cancer — rare, many histological subtypes"],
   tx:"Surgery and/or radiotherapy is the cornerstone. Platinum-based chemotherapy (cisplatin) is given simultaneously with radiation in locally advanced disease. Cetuximab (anti-EGFR) is an alternative to cisplatin. Immunotherapy: pembrolizumab and nivolumab are approved in metastatic disease.",
   meds:[MED.metformin,MED.aspirin,MED.celecoxib,MED.statiner,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.hydroxychloroquin,MED.doxycyclin,MED.disulfiram,MED.artesunate,MED.niclosamid],
   sups:[SUP.curcumin,SUP.egcg,SUP.vitamind,SUP.sulforafan,SUP.omega3,SUP.quercetin,SUP.berberine,SUP.melatonin,SUP.artemisinin,SUP.boswellia]},

  {id:"net",dk_key:"net",name:"Neuroendocrine Tumors",nameEn:"Neuroendocrine Tumors",icd10:"C7A",icon:"⚡",dk:"~500/år",fy:"Grade 1–2 >70%, Grade 3 ~25%",organ:"Gut/Pancreas/Lung",
   desc:"Neuroendocrine tumors arise in hormone-producing cells throughout the body — most commonly in the gut and pancreas. Low-grade NETs grow very slowly and can be controlled for many years. The patient community is extremely active in off-label research. Metformin and mTOR inhibition are central.",
   sub:["Gastrointestinal NET (GI-NET, ~65%) — most common in appendix, small intestine and rectum","Pancreatic NET (pNET, ~25%) — functional (insulinoma, gastrinoma) and non-functional","Lung NET (~10%) — typically carcinoid, low grade","High-grade NEC (neuroendocrine carcinoma) — aggressive, treated like SCLC"],
   tx:"Somatostatin analogues (octreotide, lanreotide) are the cornerstone — slowing hormone production and tumor growth. Everolimus (mTOR inhibitor) and sunitinib are approved for pNET. PRRT (peptide receptor radionuclide therapy with lutetium-177) is a breakthrough therapy. Surgery for localized disease.",
   meds:[MED.metformin,MED.aspirin,MED.statiner,MED.ivermectin,MED.hydroxychloroquin,MED.mebendazol,MED.fenbendazol,MED.doxycyclin,MED.artesunate,MED.losartan],
   sups:[SUP.vitamind,SUP.curcumin,SUP.berberine,SUP.omega3,SUP.melatonin,SUP.egcg,SUP.quercetin,SUP.artemisinin,SUP.sulforafan,SUP.boswellia]},

  {id:"cervical",dk_key:"cervical",name:"Cervical Cancer",nameEn:"Cervical Cancer",icd10:"C53",icon:"🌸",dk:"~400/year",fy:"~70%",organ:"Cervix",
   desc:"Cervical cancer is in almost all cases caused by persistent infection with human papillomavirus (HPV). HPV vaccination has dramatically reduced the incidence in vaccinated generations. Detected early via the screening program the prognosis is excellent. Immunotherapy has opened new possibilities in advanced disease.",
   sub:["Squamous cell carcinoma (~70%) — HPV-related, most common","Adenocarcinoma (~25%) — HPV-related, harder to detect by screening","Adenosquamous carcinoma (~5%) — mixed type, aggressive","Stage IV with metastases — primarily systemic treatment"],
   tx:"Early cervical cancer: radical hysterectomy or radiotherapy with equivalent results. Locally advanced disease: concurrent chemoradiation (cisplatin + radiation) is the standard treatment. Metastatic: pembrolizumab + chemotherapy is now standard. Bevacizumab (anti-VEGF) is added for metastatic disease.",
   meds:[MED.metformin,MED.aspirin,MED.hydroxychloroquin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.statiner,MED.celecoxib,MED.doxycyclin,MED.artesunate,MED.disulfiram,MED.niclosamid],
   sups:[SUP.curcumin,SUP.vitamind,SUP.egcg,SUP.sulforafan,SUP.omega3,SUP.quercetin,SUP.berberine,SUP.melatonin,SUP.artemisinin,SUP.resveratrol]},

  {id:"esophageal",dk_key:"esophageal",name:"Esophageal Cancer",nameEn:"Esophageal Cancer",icd10:"C15",icon:"🌊",dk:"~500/year",fy:"~20%",organ:"Esophagus",
   desc:"Esophageal cancer has two biologically very different subtypes: squamous cell carcinoma (related to smoking and alcohol) and adenocarcinoma (related to Barrett's esophagus and obesity/acid reflux). Late diagnosis is a major problem — over 70% are detected at advanced stage.",
   sub:["Adenocarcinoma (~45%) — Barrett's, GERD, obesity-related, distal location","Squamous cell carcinoma (~55%) — smoking/alcohol, cervical and mid-segment location","HER2-positive (~20% of adenocarcinoma) — trastuzumab indicated","MSI-H/dMMR (~5%) — pembrolizumab very effective"],
   tx:"Curative: neoadjuvant chemoradiation (CROSS protocol) followed by surgery (esophagectomy). Definitive chemoradiation for squamous cell carcinoma. Metastatic: nivolumab + chemotherapy is now 1st line standard. HER2+: trastuzumab is added. MSI-H: pembrolizumab monotherapy very effective.",
   meds:[MED.metformin,MED.aspirin,MED.statiner,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.hydroxychloroquin,MED.doxycyclin,MED.artesunate,MED.disulfiram,MED.cimetidin,MED.niclosamid],
   sups:[SUP.curcumin,SUP.vitamind,SUP.egcg,SUP.omega3,SUP.sulforafan,SUP.quercetin,SUP.berberine,SUP.melatonin,SUP.artemisinin,SUP.probiotika]},

  {id:"myeloma",dk_key:"myeloma",name:"Multiple Myeloma",nameEn:"Multiple Myeloma",icd10:"C90",icon:"🦴",dk:"~600/year",fy:"~55%",organ:"Bone marrow",
   desc:"Multiple myeloma is cancer of the plasma cell-producing cells in the bone marrow. The disease is characterized by abnormal antibodies (M-protein) in the blood. Bone pain, fatigue and frequent infections are classic symptoms. The disease is rarely curable but is managed as a chronic condition.",
   sub:["Standard-risk (IgG/IgA, no high-risk FISH) — good response to IMiD + PI treatment","High-risk (del17p, t4;14, t14;16) — aggressive course, requires intensified treatment","t(11;14) — BCL-2-dependent subtype, venetoclax extremely effective","Smoldering myeloma — not treatment-requiring, active surveillance"],
   tx:"Triple therapy: IMiD (lenalidomide) + proteasome inhibitor (bortezomib) + dexamethasone is standard. Autologous stem cell transplantation (ASCT) is offered to eligible patients. CD38 antibody (daratumumab) is added as 4th component. Maintenance lenalidomide after ASCT markedly prolongs PFS. CAR-T (idecabtagene vicleucel) for relapse.",
   meds:[MED.metformin,MED.disulfiram,MED.statiner,MED.hydroxychloroquin,MED.aspirin,MED.ldn],
   sups:[SUP.curcumin,SUP.egcg,SUP.resveratrol,SUP.vitamind,SUP.boswellia,SUP.omega3,SUP.quercetin]},

  {id:"headneck",dk_key:"headneck",name:"Head and Neck Cancer",nameEn:"Head and Neck Cancer",icd10:"C00-C14",icon:"🗣️",dk:"~1,000/year",fy:"~65% (HPV+), ~45% (HPV−)",organ:"Head/Neck",
   desc:"Head and neck cancer encompasses cancers of the oral cavity, pharynx, larynx and salivary glands. HPV-related oropharyngeal cancer (tongue, tonsils) has a markedly better prognosis than tobacco-alcohol related type. HPV vaccination is the most important prevention.",
   sub:["HPV-positive oropharyngeal cancer (OPSCC) — best prognosis, immunotherapy sensitive","HPV-negative (larynx, oral cavity, hypopharynx) — smoking/alcohol related, aggressive","Nasopharyngeal cancer (EBV-related) — geographic variation, sensitive to chemoradiation","Salivary gland cancer — rare, HER2+ and AR+ subtypes targetable"],
   tx:"Early disease: surgery or radiotherapy alone. Locally advanced: chemoradiation (cisplatin + radiation) is standard. HPV+ OPSCC: de-escalation under investigation. Metastatic: pembrolizumab (PD-L1 CPS ≥ 1) is 1st line standard. Cetuximab added to chemoradiation for cisplatin-ineligible patients.",
   meds:[MED.metformin,MED.celecoxib,MED.statiner,MED.disulfiram,MED.hydroxychloroquin,MED.aspirin,MED.mebendazol],
   sups:[SUP.curcumin,SUP.vitamind,SUP.egcg,SUP.omega3,SUP.quercetin,SUP.sulforafan,SUP.probiotika]},

  {id:"net",dk_key:"net",name:"Neuroendocrine Tumors",nameEn:"Neuroendocrine Tumors",icd10:"C7A",icon:"⚡",dk:"~500/year",fy:"~75% (G1/G2), ~20% (G3)",organ:"GI tract/Pancreas",
   desc:"Neuroendocrine tumors (NET) arise in hormone-producing cells primarily in the gastrointestinal tract and pancreas. Most grow slowly but can spread to the liver. Carcinoid syndrome (episodes of flushing and diarrhea) occurs with liver metastases. Incidence is rising markedly in recent decades.",
   sub:["Gastrointestinal NET G1 (Ki-67 < 3%) — extremely slow growth, good prognosis","GI-NET G2 (Ki-67 3–20%) — slow but progressive","Pancreatic NET (pNET) — insulinoma, glucagonoma, VIPoma","High-grade NEC (Ki-67 > 20%) — aggressive, treated as SCLC"],
   tx:"Somatostatin analogs (octreotide LAR, lanreotide) are the cornerstone for functional NETs and control symptoms and growth. PRRT (lutetium-177 DOTATATE) for SSTR+ metastatic NET is a breakthrough. Everolimus (mTOR inhibitor) and sunitinib for pNET. Chemotherapy (streptozocin + 5-FU) for advanced pNET.",
   meds:[MED.metformin,MED.aspirin,MED.statiner,MED.dipyridamol,MED.hydroxychloroquin],
   sups:[SUP.curcumin,SUP.berberine,SUP.vitamind,SUP.omega3,SUP.boswellia,SUP.quercetin]},

  {id:"cervical",dk_key:"cervical",name:"Cervical Cancer",nameEn:"Cervical Cancer",icd10:"C53",icon:"🌸",dk:"~400/year",fy:"~70%",organ:"Cervix",
   desc:"Cervical cancer is caused in over 99% of cases by persistent infection with human papillomavirus (HPV). HPV vaccination is the most important prevention. Regular cervical smears detect precancerous changes early. The disease affects relatively young women and the diagnosis can be a crisis in a family's life.",
   sub:["Squamous cell carcinoma (~70%) — HPV16-related, chemoradiation sensitive","Adenocarcinoma (~25%) — HPV18-related, more aggressive","Locally advanced (stage IB2–IVA) — chemoradiation + pembrolizumab standard","Metastatic/recurrent — bevacizumab + pembrolizumab"],
   tx:"Early disease (IA–IB1): surgery (trachelectomy or hysterectomy) or radiotherapy. Locally advanced: chemoradiation (cisplatin + radiation) + pembrolizumab (KEYNOTE-A18). Metastatic: pembrolizumab + paclitaxel/cisplatin + bevacizumab (KEYNOTE-826). PARP inhibitors under investigation for BRCA-mutated type.",
   meds:[MED.metformin,MED.aspirin,MED.celecoxib,MED.propranolol,MED.disulfiram,MED.artesunate,MED.statiner],
   sups:[SUP.curcumin,SUP.vitamind,SUP.egcg,SUP.omega3,SUP.quercetin,SUP.artemisinin,SUP.melatonin]},

  {id:"esophageal",dk_key:"esophageal",name:"Esophageal Cancer",nameEn:"Esophageal Cancer",icd10:"C15",icon:"🌊",dk:"~500/year",fy:"~20%",organ:"Esophagus",
   desc:"Esophageal cancer is divided into adenocarcinoma (Barrett esophagus background, GERD) and squamous cell carcinoma (smoking/alcohol). Both types are typically detected late as symptoms — difficulty swallowing and weight loss — appear late. Immunotherapy has markedly improved treatment options in recent years.",
   sub:["Adenocarcinoma (EAC) — Barrett esophagus background, HER2+ in ~15–20%","Squamous cell carcinoma (ESCC) — upper/middle esophagus, smoking/alcohol","HER2-positive EAC — trastuzumab added to chemotherapy","Metastatic disease — pembrolizumab + chemo as standard"],
   tx:"Resectable disease: perioperative chemotherapy (FLOT) + surgery (esophagectomy). Locally advanced: chemoradiation followed by surgery. Metastatic EAC: pembrolizumab + chemo (CheckMate-649). HER2+: trastuzumab added. Metastatic ESCC: pembrolizumab + chemo (KEYNOTE-590). Ramucirumab for 2nd line.",
   meds:[MED.metformin,MED.aspirin,MED.statiner,MED.celecoxib,MED.disulfiram,MED.mebendazol,MED.cimetidin],
   sups:[SUP.curcumin,SUP.vitamind,SUP.omega3,SUP.egcg,SUP.quercetin,SUP.sulforafan,SUP.boswellia]}
];

const EV = {
  1:{l:"Præklinisk",c:"#9b8ec4",bg:"#f0edf8",d:"In vitro / dyremodel"},
  2:{l:"Observationel",c:"#b8904a",bg:"#fdf6e8",d:"Kohorte / retrospektive"},
  3:{l:"Klinisk",c:"#4a8c84",bg:"#eaf5f3",d:"RCT / prospektive studier"}
};
const BK = {
  mclelland:{l:"McLelland",c:"#8a6030",bg:"#fdf3e3"},
  clark:{l:"H. Clark",c:"#3a6e4a",bg:"#edf7f0"},
  tippens:{l:"J. Tippens",c:"#3d5ea0",bg:"#edf2fb"}
};


// ─── SUBKOMPONENTER ───────────────────────────────────────────────────────────

function SrcTag({s=[]}) {
  return s.length ? (
    <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:6}}>
      {s.map(k => { const b=BK[k]; return b ? <span key={k} style={{fontSize:9.5,fontWeight:700,padding:"2px 8px",borderRadius:999,background:b.bg,color:b.c,border:"1px solid "+b.c+"30"}}>📖 {b.l}</span> : null; })}
    </div>
  ) : null;
}

// Accordion-kort (off-label og kosttilskud)
function Card({d, isM}) {
  const [o, sO] = useState(false);
  const ev = !isM && d.ev ? EV[d.ev] : null;
  return (
    <div style={{background:"#ffffff",border:"1.5px solid "+(o?"#6b5fa8":"#e4dff2"),borderRadius:12,overflow:"visible",marginBottom:8,transition:"all 0.2s",boxShadow:o?"0 4px 16px rgba(107,95,168,0.1)":"none"}}>
      <button onClick={() => sO(x=>!x)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"12px 15px",background:o?"#ede9f8":"#ffffff",border:"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
        <span style={{fontSize:16,flexShrink:0}}>{isM ? "💊" : "🌿"}</span>
        <span style={{fontSize:13.5,fontWeight:600,color:"#2a2640",flex:1,lineHeight:1.3}}>{d.name}</span>
        <div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}>
          {isM && <span style={{fontSize:9,fontWeight:700,color:"#c4875a",background:"#fdf4ed",borderRadius:4,padding:"2px 6px",border:"1px solid #e8c4a0"}}>off-label</span>}
          {ev && <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:999,background:ev.bg,color:ev.c,border:"1px solid "+ev.c+"30"}}>{ev.l}</span>}
          {(d.src||[]).length > 0 && <span style={{fontSize:10}}>📖</span>}
          <span style={{color:"#8c87a8",fontSize:11}}>{o?"▲":"▼"}</span>
        </div>
      </button>
      {o && (
        <div style={{padding:"14px 16px",background:"#fdfcff",borderTop:"1px solid #ede9f6",display:"flex",flexDirection:"column",gap:10}}>
          <div>
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:4}}>Mekanisme</div>
            <div style={{fontSize:12.5,color:"#5a5370",lineHeight:1.7}}><ST>{d.mechanism}</ST></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:4}}>Dosis (studier)</div>
              <div style={{fontSize:12,color:"#5a5370",lineHeight:1.6}}>{d.dose}</div>
            </div>
            <div>
              <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:4}}>PubMed</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                {d.studies && d.studies.split(",").map(p => p.trim() && (
                  <a key={p} href={"https://pubmed.ncbi.nlm.nih.gov/"+p.trim()+"/"} target="_blank" rel="noopener noreferrer"
                    style={{fontSize:10,color:"#5b8db8",background:"#eef4fb",padding:"2px 6px",borderRadius:4,textDecoration:"none",border:"1px solid #b8d0e8"}}>{p.trim()} ↗</a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:4}}>Klinisk note</div>
            <div style={{fontSize:12.5,color:"#5a5370",lineHeight:1.75}}><ST>{d.note}</ST></div>
          </div>
          <SrcTag s={d.src||[]} />
        </div>
      )}
    </div>
  );
}

// Klinisk dybde — subtype accordion
function SubtypeCard({s}) {
  const [o, sO] = useState(false);
  const lvlColor = {"Extremely high":"#c0392b","Very high":"#bf360c","High":"#e65100","Moderate-high":"#2e7d32","Moderate":"#1565c0","Low-moderate":"#4a148c","Low":"#607d8b"};
  return (
    <div style={{background:"#ffffff",border:"1.5px solid "+(o?"#5b8db8":"#e4dff2"),borderRadius:12,overflow:"visible",marginBottom:10,boxShadow:o?"0 4px 16px rgba(91,141,184,0.12)":"none"}}>
      <button onClick={() => sO(x=>!x)} style={{width:"100%",display:"flex",alignItems:"center",gap:10,padding:"14px 16px",background:o?"#eef4fb":"#ffffff",border:"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
        <div style={{flex:1}}>
          <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:3}}>
            <span style={{fontSize:14,fontWeight:700,color:"#2a2640"}}>{s.name}</span>
            <span style={{fontSize:10,fontWeight:700,color:"#ffffff",background:s.badgeColor,borderRadius:4,padding:"2px 8px"}}>{s.badge}</span>
          </div>
          <div style={{fontSize:11.5,color:"#8c87a8",fontStyle:"italic"}}>{s.criteria}</div>
        </div>
        <span style={{color:"#5b8db8",fontSize:13,flexShrink:0}}>{o?"▲":"▼"}</span>
      </button>
      {o && (
        <div style={{padding:"16px 18px",background:"#fdfcff",borderTop:"1px solid #ddeaf8"}}>
          <div style={{background:"#eef4fb",borderRadius:9,padding:"12px 14px",marginBottom:14,borderLeft:"4px solid #5b8db8"}}>
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#5b8db8",marginBottom:6}}>Biologisk profil</div>
            <div style={{fontSize:12.5,color:"#3a5878",lineHeight:1.8}}><ST>{s.biology}</ST></div>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:8}}>Vigtigste signalveje</div>
            <div style={{display:"flex",flexDirection:"column",gap:5}}>
              {s.pathways.map((p,i) => (
                <div key={i} style={{display:"flex",alignItems:"center",justifyContent:"space-between",background:"#f5f3f8",borderRadius:7,padding:"7px 11px"}}>
                  <span style={{fontSize:12.5,color:"#2a2640",fontWeight:600}}><ST>{p.n}</ST></span>
                  <span style={{fontSize:10,fontWeight:700,color:lvlColor[p.l]||"#607d8b",background:(lvlColor[p.l]||"#607d8b")+"18",borderRadius:4,padding:"2px 8px"}}>{p.l}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:8}}>🧪 Biomarkers the patient should test</div>
            <div style={{background:"#fff8f3",border:"1px solid #e8c4a0",borderRadius:7,padding:"8px 12px",marginBottom:8,fontSize:12,color:"#7a4a2a"}}>
              💡 Ask your oncologist about these tests. <strong>Red</strong> = critical.
            </div>
            {s.biomarkers.map((b,i) => (
              <div key={i} style={{display:"flex",alignItems:"flex-start",gap:8,padding:"8px 10px",borderRadius:7,marginBottom:5,background:b.crit?"#fff5f5":"#f9f7ff",border:"1px solid "+(b.crit?"#f0a0a0":"#e4dff2"),borderLeft:"3px solid "+(b.crit?"#c0392b":"#c4b8ea")}}>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:3}}>
                    <span style={{fontSize:12.5,fontWeight:700,color:b.crit?"#c0392b":"#2a2640"}}><ST>{b.name}</ST></span>
                    {b.crit && <span style={{fontSize:9,fontWeight:800,color:"#fff",background:"#c0392b",borderRadius:3,padding:"1px 5px"}}>KRITISK</span>}
                  </div>
                  <div style={{fontSize:12,color:"#5a5370",lineHeight:1.5}}><ST>{b.note}</ST></div>
                </div>
              </div>
            ))}
          </div>
          <div style={{marginBottom:14}}>
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:8}}>💊 Off-label specific to this subtype</div>
            {s.offlabel.map((m,i) => (
              <div key={i} style={{background:"#ffffff",border:"1px solid #e4dff2",borderRadius:8,padding:"10px 13px",marginBottom:6}}>
                <div style={{display:"flex",alignItems:"center",gap:7,marginBottom:5}}>
                  <span style={{fontSize:13,fontWeight:700,color:"#2a2640"}}>{m.name}</span>
                  <span style={{fontSize:9.5,fontWeight:600,color:"#5b8db8",background:"#eef4fb",borderRadius:4,padding:"2px 7px",border:"1px solid #b8d0e8"}}>{m.ev}</span>
                </div>
                <div style={{fontSize:12,color:"#5a5370",lineHeight:1.65}}><ST>{m.note}</ST></div>
              </div>
            ))}
          </div>
          <a href={s.trials} target="_blank" rel="noopener noreferrer"
            style={{display:"inline-flex",alignItems:"center",gap:6,background:"#eef4fb",border:"1px solid #b8d0e8",borderRadius:8,padding:"9px 16px",fontSize:12.5,fontWeight:600,color:"#5b8db8",textDecoration:"none"}}>
            🏥 See active clinical trials on ClinicalTrials.gov →
          </a>
        </div>
      )}
    </div>
  );
}

function BookCard({b}) {
  return (
    <div style={{background:"#ffffff",border:"1.5px solid #e4dff2",borderRadius:16,overflow:"hidden",marginBottom:20,boxShadow:"0 2px 16px rgba(107,95,168,0.08)"}}>
      <div style={{background:"#2e2a4a",padding:"22px 26px",display:"flex",gap:16,alignItems:"flex-start"}}>
        <div style={{fontSize:44}}>{b.cover}</div>
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:7,marginBottom:8,flexWrap:"wrap"}}>
            {b.controversy && <span style={{fontSize:10.5,fontWeight:600,color:"#e8a87c",background:"rgba(232,168,124,0.15)",padding:"2px 10px",borderRadius:999,border:"1px solid rgba(232,168,124,0.3)"}}>Kontroversiel teori</span>}
            {b.isbn && <span style={{fontSize:10.5,color:"rgba(255,255,255,0.35)"}}>ISBN: {b.isbn}</span>}
          </div>
          <h3 style={{fontSize:20,fontWeight:700,color:"white",margin:"0 0 4px",letterSpacing:-0.3}}>{b.title}</h3>
          {b.subtitle && <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:8}}>{b.subtitle}</div>}
          <div style={{fontSize:13,fontWeight:600,color:"#6b5fa8",opacity:0.9}}>{b.author} · {b.year}</div>
        </div>
      </div>
      <div style={{padding:"22px 26px",display:"flex",flexDirection:"column",gap:16}}>
        <div>
          <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#5b8db8",marginBottom:8}}>Om bogen</div>
          <p style={{fontSize:13.5,color:"#5a5370",lineHeight:1.8,margin:0}}>{b.summary}</p>
        </div>
        <div>
          <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#4a8c84",marginBottom:8}}>Tilgang / Protokol</div>
          <p style={{fontSize:13.5,color:"#5a5370",lineHeight:1.8,margin:0}}>{b.approach}</p>
        </div>
        <div>
          <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#b8904a",marginBottom:8}}>Nøglepræparater</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
            {b.keyDrugs && b.keyDrugs.map(d => <span key={d} style={{fontSize:12,fontWeight:500,padding:"4px 12px",borderRadius:999,background:"#ede9f8",color:"#6b5fa8",border:"1px solid #c4b8ea"}}>{d}</span>)}
          </div>
        </div>
        {b.hasMetroMap && <MetroMap />}
        {b.warning && <div style={{background:"#fdf4ed",border:"1px solid #e8c4a0",borderLeft:"4px solid #c4875a",borderRadius:8,padding:"13px 17px",fontSize:12.5,color:"#7a4a2a",lineHeight:1.7}}><strong>Important:</strong> {b.warning}</div>}
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {b.amazon && <a href={b.amazon} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:12,fontWeight:600,padding:"8px 16px",borderRadius:8,background:"#fdf6e8",color:"#b8904a",border:"1px solid #e0c88a",textDecoration:"none"}}>Køb på Amazon ↗</a>}
          {b.website && <a href={b.website} target="_blank" rel="noopener noreferrer" style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:12,fontWeight:600,padding:"8px 16px",borderRadius:8,background:"#eef4fb",color:"#5b8db8",border:"1px solid #b8d0e8",textDecoration:"none"}}>Hjemmeside ↗</a>}
        </div>
      </div>
    </div>
  );
}

function Detail({c, back}) {
  const [tab, sT] = useState("ov");
  const depthData = c.dk_key ? DEPTH[c.dk_key] : null;
  const tabs = [
    {id:"ov",l:"📋 Diagnosis"},
    {id:"meds",l:"💊 Off-label ("+c.meds.length+")"},
    {id:"sups",l:"🌿 Supplements ("+c.sups.length+")"},
    ...(depthData ? [{id:"depth",l:"🔬 Clinical Depth"}] : []),
  ];
  return (
    <div style={{animation:"fadeIn 0.3s ease"}}>
      <button onClick={back} style={{display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#8c87a8",cursor:"pointer",padding:"5px 0",marginBottom:18,fontSize:12.5,fontFamily:"inherit"}}>← Back to overview</button>
      <div style={{background:"#2e2a4a",borderRadius:16,padding:"24px 28px",marginBottom:18,position:"relative",overflow:"hidden",boxShadow:"0 4px 24px rgba(46,42,74,0.15)"}}>
        <div style={{position:"absolute",top:-30,right:-30,fontSize:120,opacity:0.06,userSelect:"none"}}>{c.icon}</div>
        <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          <div style={{fontSize:40}}>{c.icon}</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:10,color:"#6b5fa8",fontWeight:700,letterSpacing:2.5}}>{c.icd10}</span>
              <span style={{color:"rgba(255,255,255,0.2)"}}>·</span>
              <span style={{fontSize:10.5,color:"rgba(255,255,255,0.45)"}}>{c.nameEn}</span>
            </div>
            <h1 style={{fontSize:25,fontWeight:700,color:"white",margin:"0 0 10px",letterSpacing:-0.5}}>{c.name}</h1>
            <p style={{color:"rgba(255,255,255,0.55)",fontSize:13.5,lineHeight:1.8,margin:"0 0 16px",maxWidth:540}}><ST>{c.desc}</ST></p>
            <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
              {[["Incidens DK",c.dk],["5-årsoverl.",c.fy],["Off-label",c.meds.length],["Supplements",c.sups.length]].map(([l,v]) => (
                <div key={l}>
                  <div style={{color:"rgba(255,255,255,0.3)",fontSize:9,textTransform:"uppercase",letterSpacing:1.5,marginBottom:3}}>{l}</div>
                  <div style={{color:"white",fontSize:16,fontWeight:700}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div style={{display:"flex",gap:3,marginBottom:16,background:"#e4dff240",borderRadius:10,padding:4}}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => sT(t.id)}
            style={{flex:1,padding:"9px 6px",border:"none",borderRadius:7,cursor:"pointer",fontFamily:"inherit",fontSize:12,fontWeight:600,
              background:tab===t.id?"#ffffff":"transparent",
              color:tab===t.id?(t.id==="depth"?"#5b8db8":"#2a2640"):"#8c87a8",
              boxShadow:tab===t.id?"0 1px 6px rgba(107,95,168,0.1)":"none",transition:"all 0.2s"}}>{t.l}</button>
        ))}
      </div>
      {tab==="ov" && (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#eef4fb",border:"1.5px solid #b8d0e8",borderRadius:14,padding:"20px 24px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:38,height:38,borderRadius:"50%",background:"#5b8db8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🏥</div>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"#2a4a6e"}}>Hvad tilbyder din læge?</div>
                <div style={{fontSize:11,color:"#5b8db8",marginTop:2}}>Konventionel behandling i Danmark</div>
              </div>
            </div>
            <p style={{fontSize:13.5,color:"#3a5878",lineHeight:1.9,margin:0}}><ST>{c.tx}</ST></p>
          </div>
          <div style={{background:"#ffffff",borderRadius:14,padding:"20px 22px",border:"1px solid #e4dff2"}}>
            <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#6b5fa8",marginBottom:14}}>Undertyper og varianter</div>
            {c.sub.map(s => (
              <div key={s} style={{display:"flex",alignItems:"flex-start",gap:11,padding:"9px 0",borderBottom:"1px solid #ede9f6",fontSize:13.5,color:"#5a5370",lineHeight:1.7}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:"#c4b8ea",border:"2px solid #6b5fa8",flexShrink:0,marginTop:6}} />
                <span><ST>{s}</ST></span>
              </div>
            ))}
          </div>
          <div style={{background:"#fdf4ed",border:"1px solid #e8c4a0",borderLeft:"4px solid #c4875a",borderRadius:10,padding:16,display:"flex",gap:12}}>
            <div style={{fontSize:18,flexShrink:0}}>💛</div>
            <div style={{fontSize:12.5,color:"#7a4a2a",lineHeight:1.7}}><strong>Medical disclaimer:</strong> Information is for reference only and does not replace professional medical advice. Off-label use should always be discussed with your oncologist.</div>
          </div>
        </div>
      )}
      {tab==="meds" && (
        <div>
          <div style={{background:"#fdf4ed",border:"1px solid #e8c4a0",borderRadius:9,padding:"10px 14px",fontSize:12.5,color:"#7a4a2a",marginBottom:14}}>
            💊 Off-label use requires medical evaluation. Discuss with your oncologist. Words with <span style={{borderBottom:"1.5px dotted #5b8db8",color:"#5b8db8",fontWeight:700}}>blue underline</span> are abbreviations — click for explanation.
          </div>
          {c.meds.map((m,i) => <Card key={i} d={m} isM={true} />)}
        </div>
      )}
      {tab==="sups" && (
        <div>
          <div style={{background:"#eaf5f3",border:"1px solid #a0cfc9",borderRadius:9,padding:"10px 14px",fontSize:12.5,color:"#2a5a54",marginBottom:12}}>
            🌿 Supplements may interact with chemotherapy. Always discuss with your doctor.
          </div>
          <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
            {Object.entries(EV).map(([k,v]) => (
              <div key={k} style={{display:"flex",alignItems:"center",gap:4,background:"#ffffff",border:"1px solid #e4dff2",borderRadius:7,padding:"5px 10px"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:v.c}} />
                <span style={{fontSize:10.5,color:"#5a5370"}}><strong style={{color:"#2a2640"}}>{v.l}</strong>: {v.d}</span>
              </div>
            ))}
          </div>
          {c.sups.map((s,i) => <Card key={i} d={s} isM={false} />)}
        </div>
      )}
      {tab==="depth" && depthData && (
        <div>
          <div style={{background:"#eef4fb",border:"1px solid #b8d0e8",borderRadius:9,padding:"12px 16px",fontSize:13,color:"#3a5878",lineHeight:1.75,marginBottom:18}}>
            🔬 Click on a subtype for biological profile, signaling pathways, critical biomarkers and the most relevant off-label agents specifically for that subtype.
          </div>
          {depthData.map((s,i) => <SubtypeCard key={i} s={s} />)}
        </div>
      )}
    </div>
  );
}


// ─── HOVED APP ────────────────────────────────────────────────────────────────
const tM = new Set(CANCER_DATA.flatMap(c => c.meds.map(m => m.name))).size;
const tS = new Set(CANCER_DATA.flatMap(c => c.sups.map(s => s.name))).size;

export default function Onkolex({ onLangChange }) {
  const [view, sV] = useState("home");
  const [ac, sA]   = useState(null);
  const [q, sQ]    = useState("");
  const go   = c => { sA(c); sV("cancer"); };
  const home = ()  => { sV("home"); sA(null); };
  const books = () => sV("books");
  const filt = CANCER_DATA.filter(c => {
    const s = q.toLowerCase();
    return !s || c.name.toLowerCase().includes(s) || c.nameEn.toLowerCase().includes(s) || c.organ.toLowerCase().includes(s) || c.icd10.includes(s);
  });

  return (
    <div style={{minHeight:"100vh",background:"#f5f3f8",fontFamily:"'DM Sans',system-ui,sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #e4dff2; border-radius: 4px; }
      `}</style>

      <header style={{background:"#2e2a4a",borderBottom:"2px solid #5b4f8a",position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 20px rgba(46,42,74,0.2)"}}>
        <div style={{maxWidth:1380,margin:"0 auto",padding:"0 24px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <button onClick={home} style={{display:"flex",alignItems:"center",gap:10,background:"none",border:"none",cursor:"pointer",padding:0}}>
            <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#6b5fa8,#5b8db8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🧬</div>
            <div>
              <div style={{fontSize:17,fontWeight:800,color:"white",letterSpacing:-0.3}}>Onkolex</div>
              <div style={{fontSize:8,color:"#6b5fa8",opacity:0.9,letterSpacing:2.5,textTransform:"uppercase",fontWeight:600}}>Dansk Klinisk Kræftopslagsværk</div>
            </div>
          </button>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={books}
              style={{display:"flex",alignItems:"center",gap:6,background:view==="books"?"rgba(107,95,168,0.2)":"rgba(255,255,255,0.05)",border:"1px solid "+(view==="books"?"#6b5fa8":"rgba(255,255,255,0.1)"),borderRadius:8,padding:"7px 14px",color:view==="books"?"#6b5fa8":"rgba(255,255,255,0.6)",fontSize:12.5,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
              📚 Protocol Books
            </button>
            <button onClick={() => onLangChange && onLangChange("da")}
              style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"7px 14px",color:"rgba(255,255,255,0.6)",fontSize:12.5,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>
              🇩🇰 Dansk
            </button>
            <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"6px 12px"}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input value={q} onChange={e => { sQ(e.target.value); if(view!=="home") home(); }}
                placeholder="Search cancer type…"
                style={{background:"none",border:"none",outline:"none",color:"white",fontSize:12.5,width:150,fontFamily:"inherit"}} />
            </div>
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",display:"flex",gap:14}}>
            <span><span style={{color:"#4a8c84",fontWeight:700}}>{CANCER_DATA.length}</span> types</span>
            <span><span style={{color:"#c4875a",fontWeight:700}}>{tM}</span> off-label</span>
            <span><span style={{color:"#6b5fa8",fontWeight:700}}>{tS}</span> supplements</span>
          </div>
        </div>
      </header>

      <div style={{background:"#fdf4ed",borderBottom:"1px solid #e8c4a0",padding:"8px 24px"}}>
        <div style={{maxWidth:1380,margin:"0 auto",fontSize:11.5,color:"#7a5a3a",display:"flex",alignItems:"center",gap:8}}>
          <span>💛</span>
          <span><strong>Medical disclaimer:</strong> Onkolex is for information and guidance only. Content does not replace medical advice. Off-label use requires a prescription and oncologist consultation.</span>
        </div>
      </div>

      <div style={{maxWidth:1380,margin:"0 auto",padding:"22px 24px",display:"grid",gridTemplateColumns:view==="cancer"?"260px 1fr":"1fr",gap:20}}>
        {view==="cancer" && (
          <nav style={{display:"flex",flexDirection:"column",gap:4}}>
            <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#8c87a8",padding:"4px 8px",marginBottom:6}}>Kræfttyper</div>
            {CANCER_DATA.map(c => (
              <button key={c.id} onClick={() => go(c)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",
                  background:ac&&ac.id===c.id?"#2e2a4a":"#ffffff",
                  border:"1.5px solid "+(ac&&ac.id===c.id?"#6b5fa8":"#e4dff2"),
                  borderRadius:10,cursor:"pointer",textAlign:"left",fontFamily:"inherit",
                  transition:"all 0.15s",boxShadow:ac&&ac.id===c.id?"0 4px 16px rgba(107,95,168,0.2)":"none"}}>
                <span style={{fontSize:18}}>{c.icon}</span>
                <div>
                  <div style={{fontSize:12.5,fontWeight:600,color:ac&&ac.id===c.id?"white":"#2a2640"}}>{c.name}</div>
                  <div style={{fontSize:10,color:ac&&ac.id===c.id?"rgba(255,255,255,0.4)":"#8c87a8"}}>{c.meds.length+c.sups.length} agents</div>
                </div>
              </button>
            ))}
          </nav>
        )}

        <main>
          {view==="cancer" && ac && <Detail c={ac} back={home} />}
          {view==="books" && (
            <div style={{animation:"fadeIn 0.3s ease",maxWidth:780}}>
              <div style={{marginBottom:24}}>
                <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:2.5,color:"#5b8db8",marginBottom:8}}>Protokol-bøger og Ressourcer</div>
                <h1 style={{fontSize:28,fontWeight:700,color:"#2a2640",letterSpacing:-0.5,marginBottom:8}}>Books that inspired the off-label movement</h1>
                <p style={{fontSize:13.5,color:"#5a5370",lineHeight:1.75,maxWidth:580}}>These books and protocols have played a central role in the global patient-driven repurposing movement. All agents marked with 📖 can be traced to one of these protocols.</p>
              </div>
              {BOOKS.map(b => <BookCard key={b.id} b={b} />)}
            </div>
          )}
          {view==="home" && (
            <div style={{animation:"fadeIn 0.35s ease"}}>
              <div style={{background:"#2e2a4a",borderRadius:18,padding:"36px 40px",marginBottom:22,position:"relative",overflow:"hidden",boxShadow:"0 8px 40px rgba(46,42,74,0.18)"}}>
                <div style={{position:"absolute",top:-60,right:-60,width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,rgba(107,95,168,0.18),transparent 70%)"}} />
                <div style={{position:"absolute",bottom:-40,left:-40,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(91,141,184,0.12),transparent 70%)"}} />
                <div style={{position:"relative"}}>
                  <div style={{fontSize:11,color:"#6b5fa8",fontWeight:600,letterSpacing:3,textTransform:"uppercase",marginBottom:12,opacity:0.9}}>Dansk klinisk kræftopslagsværk</div>
                  <h1 style={{fontSize:33,fontWeight:700,color:"white",letterSpacing:-1,lineHeight:1.15,marginBottom:12}}>
                    You are not alone.<br/>
                    <span style={{color:"#6b5fa8",opacity:0.9}}>Here you find knowledge</span> that empowers you.
                  </h1>
                  <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.8,maxWidth:500,marginBottom:22}}>
                    Onkolex brings together evidence-based information on cancer types, conventional treatment, repurposed drugs and supplements. Everything for those who want to know more and improve their odds.
                  </p>
                  <button onClick={books}
                    style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(107,95,168,0.15)",border:"1.5px solid #6b5fa8",borderRadius:10,color:"#6b5fa8",padding:"10px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",opacity:0.9}}>
                    📚 See McLelland, Clark and Tippens protocols →
                  </button>
                  <div style={{display:"flex",gap:28,marginTop:26,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                    {[[CANCER_DATA.length,"Cancer Types","#4a8c84"],[tM,"Off-label præparater","#c4875a"],[tS,"Supplements","#6b5fa8"],[BOOKS.length,"Protokol-bøger","#5b8db8"]].map(([n,l,c]) => (
                      <div key={l}>
                        <div style={{fontSize:27,fontWeight:700,color:c,lineHeight:1,opacity:0.9}}>{n}</div>
                        <div style={{fontSize:9.5,color:"rgba(255,255,255,0.3)",marginTop:4,textTransform:"uppercase",letterSpacing:1.5}}>{l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div style={{display:"flex",gap:7,marginBottom:16,flexWrap:"wrap",alignItems:"center"}}>
                <span style={{fontSize:11,color:"#8c87a8",marginRight:4}}>Evidensniveau:</span>
                {Object.entries(EV).map(([k,v]) => (
                  <div key={k} style={{display:"flex",alignItems:"center",gap:5,background:"#ffffff",border:"1px solid #e4dff2",borderRadius:7,padding:"5px 10px"}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:v.c}} />
                    <span style={{fontSize:11,color:"#5a5370"}}><strong style={{color:"#2a2640"}}>{v.l}</strong> — {v.d}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
                {filt.map((c,i) => (
                  <button key={c.id} onClick={() => go(c)}
                    style={{background:"#ffffff",border:"1.5px solid #e4dff2",borderRadius:14,padding:0,cursor:"pointer",textAlign:"left",fontFamily:"inherit",overflow:"hidden",animation:"fadeIn 0.35s ease "+(i*0.04)+"s both",transition:"all 0.2s"}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor="#6b5fa8";e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(107,95,168,0.14)";}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor="#e4dff2";e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
                    <div style={{padding:"16px 18px 12px"}}>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
                        <span style={{fontSize:32}}>{c.icon}</span>
                        <div style={{textAlign:"right"}}>
                          <div style={{fontSize:9,color:"#8c87a8",fontWeight:600,letterSpacing:1}}>{c.icd10}</div>
                          <div style={{fontSize:11,color:"#4a8c84",fontWeight:700,marginTop:2}}>{c.fy.split(",")[0]}</div>
                        </div>
                      </div>
                      <div style={{fontSize:15.5,fontWeight:700,color:"#2a2640",marginTop:9,letterSpacing:-0.2}}>{c.name}</div>
                      <div style={{fontSize:11,color:"#8c87a8",marginTop:3}}>{c.organ} · {c.dk}</div>
                    </div>
                    <div style={{padding:"9px 18px 14px",display:"flex",gap:7}}>
                      <div style={{flex:1,background:"#fdf4ed",borderRadius:7,padding:"6px 8px",textAlign:"center",border:"1px solid #e8c4a0"}}>
                        <div style={{fontSize:16,fontWeight:700,color:"#c4875a"}}>{c.meds.length}</div>
                        <div style={{fontSize:9,color:"#c4875a",opacity:0.7}}>Off-label</div>
                      </div>
                      <div style={{flex:1,background:"#eaf5f3",borderRadius:7,padding:"6px 8px",textAlign:"center",border:"1px solid #a0cfc9"}}>
                        <div style={{fontSize:16,fontWeight:700,color:"#4a8c84"}}>{c.sups.length}</div>
                        <div style={{fontSize:9,color:"#4a8c84",opacity:0.7}}>Kosttilskud</div>
                      </div>
                      {c.dk_key && (
                        <div style={{flex:1,background:"#eef4fb",borderRadius:7,padding:"6px 8px",textAlign:"center",border:"1px solid #b8d0e8"}}>
                          <div style={{fontSize:14,color:"#5b8db8"}}>🔬</div>
                          <div style={{fontSize:9,color:"#5b8db8",opacity:0.7}}>Kl. dybde</div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

