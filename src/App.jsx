import React, { useState, useRef, useEffect } from "react";

// ─── MEDICINSK ORDBOG ─────────────────────────────────────────────────────────
const ABBR = {
  "ER":      "Østrogenreceptor — protein på kræftcellerne der binder østrogen og driver vækst.",
  "PR":      "Progesteronreceptor — ligner ER men binder progesteron.",
  "HR+":     "Hormonreceptor-positiv — tumoren har ER og/eller PR. Kan behandles med hormondæmpende medicin.",
  "HER2":    "Human Epidermal growth factor Receptor 2 — protein der driver aggressiv cellevækst. Overudtrykt i ~20% af brystkræft. Kan angribes med trastuzumab (Herceptin).",
  "TNBC":    "Trippel-negativ brystkræft — hverken ER, PR eller HER2 er positive. Sværest at behandle.",
  "Ki-67":   "Protein der måler celledelningstakt. Jo højere %, jo hurtigere vokser tumoren. Under 14% = langsom vækst.",
  "mTOR":    "Signalprotein der fungerer som cellens gasgpedal for vækst. Hæmmes bl.a. af metformin.",
  "AMPK":    "Enzym der fungerer som cellens energimåler. Aktiveres af metformin og bremser kræftcellevækst.",
  "PI3K":    "Signalprotein der aktiverer cellevækst. Hyppigt muteret i kræft.",
  "PIK3CA":  "Genet der koder for PI3K. Mutation i ~45% af brystkræft.",
  "PTEN":    "Tumorundertrykkende gen der bremser PI3K. Tab giver ukontrolleret vækst.",
  "BRCA1":   "Gen der reparerer DNA-skader. Mutation giver øget risiko for bryst- og æggestokkræft og er arvelig.",
  "BRCA2":   "Søstergen til BRCA1 med lignende DNA-reparationsfunktion.",
  "BRCA1/2": "Samlet betegnelse for arvelige kræftrisikogener BRCA1 og BRCA2.",
  "PARP":    "Enzym der hjælper celler med at reparere DNA. PARP-hæmmere (fx olaparib) blokerer dette.",
  "PD-L1":   "Protein på kræftcellernes overflade der camouflerer dem for immunforsvaret.",
  "TIL":     "Tumor-Infiltrerende Lymfocytter — immunceller der kæmper inde i tumoren.",
  "TMB":     "Tumor Mutational Burden — antal mutationer i tumoren. Høj TMB giver bedre immunterapi-respons.",
  "MSI-H":   "Høj mikrosatellit-instabilitet — mange fejl i DNA-reparation. God kandidat til immunterapi.",
  "HRD":     "Homologous Recombination Deficiency — fejl i DNA-reparation. Åbner for PARP-hæmmere.",
  "EGFR":    "Epidermal Growth Factor Receptor — receptor der stimulerer cellevækst. Targetbar mutation i lungekræft.",
  "KRAS":    "Et af de hyppigste onkogener i kræft. Muteret i ~95% af bugspytkirtelkræft.",
  "BRAF":    "Signalprotein i MAPK-vejen. BRAF V600E-mutation er targetbar med dabrafenib.",
  "ALK":     "Gen der kan fusionere og drive kræftvækst. Targetbar i ~5% af lungekræft med alectinib.",
  "OXPHOS":  "Oxidativ phosphorylering — cellens normale energiproduktion via mitokondrierne.",
  "VEGF":    "Vaskulær endotel vækstfaktor — stimulerer nye blodkar til tumoren.",
  "NF-κB":   "Transskriptionsfaktor der aktiverer betændelsegener. Hyppigt overaktiveret i kræft.",
  "COX-2":   "Enzym der producerer betændelsesfremkaldende stoffer. Hæmmes af aspirin og celecoxib.",
  "eGFR":    "Estimeret Glomerulær Filtrationshastighed — blodprøve der måler nyrefunktion. Metformin kræver eGFR > 30.",
  "IHC":     "Immunohistokemi — laboratoriemetode der bruger antistoffer til at påvise proteiner i vævsprøver.",
  "FISH":    "Fluorescence In Situ Hybridization — metode til at bekræfte genamplifikation fx HER2.",
  "ctDNA":   "Cirkulerende tumor-DNA i blodbanen — muliggør blodprøve-baseret kræftmonitorering.",
  "pCR":     "Patologisk komplet respons — ingen levende kræftceller ses efter behandling.",
  "LFT":     "Leverfunction Tests — blodprøver der måler om leveren fungerer normalt.",
  "EKG":     "Elektrokardiogram — måling af hjertets elektriske aktivitet.",
  "QT":      "QT-interval på EKG. For langt QT kan give farlig hjerterytmeforstyrrelse.",
  "HCQ":     "Hydroxychloroquin — malariamiddel der blokerer cellernes affaldshåndtering (autopagi).",
  "LDN":     "Low Dose Naltrexon — naltrexon i lav dosis (3–4,5 mg). Bruges til immunmodulering.",
  "TP53":    "Tumor Protein 53 — genomets vogter. Muteret i mange aggressive kræftformer.",
  "MYC":     "Onkogen der driver massiv celleproliferation. Amplificeret i aggressive kræftformer.",
  "CDK4/6":  "Enzymer der driver cellernes delingstakt. Hæmmere (palbociclib, ribociclib) er standard ved HR+ brystkræft.",
  "FASN":    "Fedtsyre-syntase — enzym der producerer fedtsyrer til kræftcellernes membraner.",
  "GLUT1":   "Glukosetransporter 1 — massivt overudtrykt i mange Warburg-afhængige kræftformer.",
  "HIF-1α":  "Hypoxia-Inducible Factor — protein der aktiveres ved iltmangel og driver aggressiv kræftadfærd.",
  "PAK1":    "Signalprotein der fremmer kræftcelledeling. Ivermectins primære angrebspunkt.",
  "WNT":     "Signalvej der styrer stamcelleegenskaber og celledeling. Overaktiveret i aggressive kræftceller.",
  "AR":      "Androgenreceptor — binder mandlige kønshormoner. Driver prostatakræft.",
  "VDR":     "Vitamin D-receptor — binder vitamin D og regulerer cellevækst.",
  "G6PD":    "Glucose-6-Phosphat Dehydrogenase — mangel er kontraindikation for IV vitamin C.",
  "MGMT":    "DNA-reparationsgen. Methyleret MGMT = bedre respons på temozolomid ved glioblastom.",
  "IDH1":    "Isocitrat dehydrogenase 1 — mutation giver bedre prognose ved hjernetumorer.",
  "IDH2":    "Isocitrat dehydrogenase 2 — søstergen til IDH1.",
  "BCR-ABL": "Fusionsprotein i CML skabt af Philadelphia-kromosomet. Imatinib er direkte antidot.",
  "BTK":     "Bruton Tyrosin Kinase — driver B-celle-leukæmi. Blokeres af ibrutinib.",
  "BCL-2":   "Anti-apoptotisk protein der forhindrer kræftcellers selvmord. Blokeres af venetoclax.",
  "PDAC":    "Pancreatic Ductal Adenocarcinoma — udgør ~90% af bugspytkirtelkræft.",
  "HGSOC":   "Højgradig serøs æggestokkræft — den hyppigste og mest aggressive form.",
  "GBM":     "Glioblastom multiforme — den mest aggressive primære hjernetumor.",
  "NSCLC":   "Ikke-småcellet lungekræft — ~85% af alle lungekræfttilfælde.",
  "SCLC":    "Småcellet lungekræft — ~15% af lungekræft. Ekstremt aggressiv.",
  "RCT":     "Randomiseret Kontrolleret Studie — guldstandarden i medicinsk forskning.",
  "OS":      "Overall Survival — samlet overlevelse. Den vigtigste kliniske måleenhed.",
  "PFS":     "Progression-Free Survival — tid til sygdommen forværres.",
  "DFS":     "Disease-Free Survival — sygdomsfri overlevelse efter behandling.",
  "CCND1":   "Cyclin D1-genet. Amplifikation driver overdreven celledeling.",
  "RB1":     "Retinoblastoma 1 — tumorundertrykkende gen der bremser celledelingen.",
  "2-HG":    "2-Hydroxyglutarat — metabolit produceret af IDH-muterede tumorceller.",
};

const ABBR_KEYS  = Object.keys(ABBR).sort((a, b) => b.length - a.length);
const ABBR_REGEX = new RegExp(
  "(" + ABBR_KEYS.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|") + ")",
  "g"
);

function AbbrTooltip({ term, definition }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const wrapRef = useRef(null);
  const isTouch = useRef(false);

  const calcPos = () => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    setPos({
      top: r.top + window.scrollY - 8,
      left: r.left + r.width / 2 + window.scrollX,
    });
  };

  useEffect(() => {
    if (!open) return;
    const close = e => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("touchstart", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("touchstart", close);
    };
  }, [open]);

  return (
    <span ref={wrapRef} style={{ position: "relative", display: "inline" }}>
      <span
        ref={triggerRef}
        onMouseEnter={() => { if (!isTouch.current) { calcPos(); setOpen(true); } }}
        onMouseLeave={() => { if (!isTouch.current) setOpen(false); }}
        onTouchStart={() => { isTouch.current = true; }}
        onClick={() => { calcPos(); setOpen(v => !v); }}
        style={{ borderBottom: "1.5px dotted #5b8db8", color: "#5b8db8", cursor: "pointer", fontWeight: 700 }}
      >{term}</span>
      {open && (
        <span style={{
          position: "fixed",
          top: pos.top - 4,
          left: pos.left,
          transform: "translate(-50%, -100%)",
          background: "#2e2a4a", border: "1.5px solid #5b8db8", borderRadius: 10,
          padding: "11px 14px", width: 260, zIndex: 99999,
          boxShadow: "0 8px 32px rgba(46,42,74,0.5)", display: "block", pointerEvents: "none",
        }}>
          <span style={{ display: "block", fontSize: 12, fontWeight: 800, color: "#5b8db8", marginBottom: 5 }}>{term}</span>
          <span style={{ display: "block", fontSize: 12, color: "#c4b8ea", lineHeight: 1.65 }}>{definition}</span>
          <span style={{ display: "block", fontSize: 10, color: "#8c87a8", marginTop: 6 }}>
            Tryk et andet sted for at lukke
          </span>
        </span>
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
    approach:"McLellands Metro Map kortlægger kræftcellernes stofskifteafhængighed: Glukose via Metformin og DCA. Glutamin via Mebendazol og Doxycyclin. Fedt via Statiner. Autopagi via Hydroxychloroquin. Inflammation via Aspirin, Celecoxib og Curcumin. Immunsuppression via Cimetidin og LDN. Metastase via Dipyridamol og Propranolol.",
    keyDrugs:["Metformin","Mebendazol","Doxycyclin","Statiner","Hydroxychloroquin","Cimetidin","Dipyridamol","Aspirin","DCA","LDN","Alpha-liponsyre","Celecoxib","Propranolol"],
    warning:"McLelland understreger at protokollen er adjuvant — tillæg til konventionel behandling. Bør implementeres i samråd med onkolog åben for repurposing." },
  { id:"clark", cover:"📗", title:"The Cure for All Cancers", subtitle:"Including over 100 Case Histories",
    author:"Hulda Regehr Clark, Ph.D.", year:1993, isbn:"978-0963632807",
    amazon:"https://www.amazon.com/Cure-All-Cancers-Hulda-Clark/dp/1890035017",
    controversy:true, hasMetroMap:false,
    summary:"Hulda Clark (1928–2009) hævdede at kræft skyldes parasitter kombineret med miljøgifte. Hendes protokol er kontroversiel og teorien er ikke videnskabeligt valideret. To af komponenterne — artemisinin og juglone — har dog selvstændig legitim forskning bag sig.",
    approach:"Tre-komponent parasitrensning: Sort valnødskalleolie (juglone), Wormwood/Malurt (artemisinin-relaterede stoffer) og Nellike (eugenol hæmmer COX-2).",
    keyDrugs:["Artemisinin/Wormwood","Sort Valnødskalle (juglone)","Nellike (eugenol)"],
    warning:"Clarks parasit-teori er ikke videnskabeligt valideret. Bogen bør ALDRIG erstatte konventionel behandling." },
  { id:"tippens", cover:"📘", title:"My Cancer Story Rocks", subtitle:"Fenbendazol-protokollen",
    author:"Joe Tippens (blog)", year:2019,
    website:"https://www.mycancerstory.rocks",
    amazon:"https://www.amazon.com/s?k=joe+tippens+fenbendazole",
    controversy:false, hasMetroMap:false,
    summary:"Joe Tippens fik småcellet lungekræft stadium IV i 2016 med 3 måneders forventet levetid. En bekendt anbefalede Fenbendazol — et veterinært ormemiddel. Kombineret med kosttilskud opnåede han komplet remission dokumenteret ved scanninger.",
    approach:"Fenbendazol 222 mg x 3 dage PÅ, 4 dage PAUSE (cyklisk). Kombineret med: Vitamin E succinat 800 mg/dag, Curcumin 600 mg/dag, CBD olie sublingualt.",
    keyDrugs:["Fenbendazol (Panacur)","Vitamin E Succinat","Curcumin","CBD olie"],
    warning:"Joe Tippens er et enkelt kasuistik og udgør ikke klinisk bevis alene. Sagen har dog udløst legitime kliniske studier." },
  { id:"christofferson", cover:"📙", title:"Tripping over the Truth",
    subtitle:"How the Metabolic Theory of Cancer Is Overturning One of Medicine's Most Entrenched Paradigms",
    author:"Travis Christofferson", year:2014,
    amazon:"https://www.amazon.com/Tripping-over-Truth-Overturning-Entrenched/dp/1603587292",
    controversy:false, hasMetroMap:false,
    summary:"Travis Christofferson fortæller historien bag den metaboliske kræftteori — fra Otto Warburgs opdagelse i 1920erne til moderne forskning. En letlæselig gennemgang af hvorfor kræft måske primært er en stofskiftesygdom.",
    approach:"Bogen forklarer Warburg-effekten og argumenterer for at metaboliske interventioner — ketogen kost, DCA, metformin og faste — kan sulte kræftceller.",
    keyDrugs:["DCA (Dichloroacetat)","Metformin","Ketogen kost","Faste/kalorirestriktion"],
    warning:"Bogen er journalistisk ikke medicinsk. Metaboliske interventioner bør altid koordineres med behandlende onkolog." },
  { id:"winters", cover:"📒", title:"The Metabolic Approach to Cancer",
    subtitle:"Integrating Deep Nutrition, the Ketogenic Diet, and Nontoxic Bio-Individualized Therapies",
    author:"Nasha Winters og Jess Higgins Kelley", year:2017,
    amazon:"https://www.amazon.com/Metabolic-Approach-Cancer-Nontoxic-Bio-Individualized/dp/1603587012",
    website:"https://www.metabolicterrain.com", controversy:false, hasMetroMap:false,
    summary:"Nasha Winters er naturopatisk onkolog der selv overlevede stadie IV æggestokkræft i 1991. Bogen kombinerer metabolisk terapi med epigenetik og kosttilskud i en praktisk protokol.",
    approach:"Winters Terrain Ten-model vurderer ti biologiske faktorer: blodsukker og insulin, immunfunktion, inflammation, tarm-mikrobiom, toksinbelastning, hormoner, stress, mitokondriefunktion, angiogenese og genetiske faktorer.",
    keyDrugs:["Ketogen kost","Metformin","Berberine","Curcumin","Artemisinin","Melatonin (højdosis)","Vitamin D3","Boswellia"],
    warning:"Ketogen kost under kemoterapi kræver tæt lægelig opfølgning." },
  { id:"seyfried", cover:"📓", title:"Cancer as a Metabolic Disease",
    subtitle:"On the Origin, Management, and Prevention of Cancer",
    author:"Thomas N. Seyfried", year:2012,
    amazon:"https://www.amazon.com/Cancer-Metabolic-Disease-Management-Prevention/dp/0470584920",
    controversy:false, hasMetroMap:false,
    summary:"Thomas Seyfried er professor i biologi ved Boston College og den akademiske grundpille bag den metaboliske kræftteori. Bogen dokumenterer at kræft primært er en mitokondrie-stofskiftesygdom.",
    approach:"Seyfrieds Press-Pulse strategi: vedvarende metabolisk stress via ketogen kost og kalorirestriktion kombineret med periodiske pulser via DCA og andre metaboliske angribere.",
    keyDrugs:["Ketogen kost + kalorirestriktion","DCA (Dichloroacetat)","Metformin","Hyperbars ilt (HBO)","Glutamin-blokade"],
    warning:"Akademisk referencebog — ikke beregnet som selvbehandlingsguide. Press-Pulse protokollen kræver lægelig supervision." },
  { id:"servan", cover:"📔", title:"Anticancer: A New Way of Life", subtitle:"",
    author:"David Servan-Schreiber", year:2007,
    amazon:"https://www.amazon.com/Anticancer-New-Way-Life/dp/0670021644",
    controversy:false, hasMetroMap:false,
    summary:"David Servan-Schreiber var fransk hjerneforsker og psykiater der selv fik hjernetumor. Bogen er solgt i over 3 millioner eksemplarer på 35 sprog og handler om livsstilsfaktorers rolle.",
    approach:"Fokus på fire livsområder: Anti-kræft kost (omega-3, grøn te, gurkemeje, broccoli, granatæble), reduktion af stress, regelmæssig motion og eliminering af miljøgifte.",
    keyDrugs:["Omega-3 (EPA/DHA)","Grøn te (EGCG)","Curcumin/Gurkemeje","Sulforafan (broccoli)","Granatæble","Melatonin"],
    warning:"Bogen er primært om livsstil og kost som adjuvant støtte — udelukkende supplerende til konventionel behandling." },
  { id:"fung", cover:"📃", title:"The Cancer Code",
    subtitle:"A Revolutionary New Understanding of a Medical Mystery",
    author:"Jason Fung", year:2020,
    amazon:"https://www.amazon.com/Cancer-Code-Revolutionary-Understanding-Medical/dp/0062894005",
    controversy:false, hasMetroMap:false,
    summary:"Jason Fung er canadisk nefrolog og bestseller-forfatter. En af de mest letlæselige gennemgange af kræft som metabolisk sygdom — perfekt for patienter der vil forstå den biologiske baggrund.",
    approach:"Fung argumenterer for at kræft bedst forstås som et problem med cellesignalering og stofskifte. Faste, insulinreduktion og ketogen kost er centrale strategier.",
    keyDrugs:["Intermitterende faste","Ketogen kost","Metformin","Insulinreduktion (lav-kulhydrat kost)"],
    warning:"Fastekure under aktiv kræftbehandling kræver lægelig godkendelse." },
];

const METRO_LINES = [
  { id:"glucose", label:"Glukose-pathway", color:"#e06060", bg:"#fdf2f2",
    desc:"Kræftceller er afhængige af glukose som primær energikilde — den såkaldte Warburg-effekt.",
    drugs:[
      {name:"Metformin",note:"Blokerer mitokondrie-komplex I og GLUT-transportere. Hjørnestenen i McLellands protokol.",studies:"37261084,32860850"},
      {name:"DCA",note:"Reverter Warburg-effekten: tvinger kræftceller fra glykolyse tilbage til normal mitokondrieforbinding.",studies:"17051984,21383728"},
    ]},
  { id:"glutamine", label:"Glutamin-pathway", color:"#7b6fa0", bg:"#f0edf8",
    desc:"Glutamin er kræftcellernes sekundære brændstof.",
    drugs:[
      {name:"Mebendazol",note:"Ormemiddel med identisk tubulin-mekanisme som taxaner.",studies:"31886060,25541231"},
      {name:"Fenbendazol",note:"Kemisk søster til mebendazol. Aktiverer p53 tumor-suppressor muteret i ~50% af alle kræfttyper.",studies:"29097407,33602073"},
      {name:"Doxycyclin",note:"Antibiotikum der slukker mitokondrie-kraftværket i kræftceller.",studies:"28034920,31485045"},
    ]},
  { id:"fat", label:"Fedt-pathway", color:"#b8904a", bg:"#fdf6e8",
    desc:"Kræftceller kan syntetisere og forbrænde fedt som alternativt brændstof. Statiner blokerer kolesterol- og lipidproduktionen.",
    drugs:[
      {name:"Statiner",note:"Lipofil statin (simvastatin/lovastatin) foretrækkes. Tages om aftenen.",studies:"28456308,30213800"},
      {name:"Itraconazol",note:"Svampemiddel med anti-angiogen effekt via VEGFR2/AKT/mTOR-hæmning.",studies:"24218511,28034920"},
    ]},
  { id:"autophagy", label:"Autopagi-flugt", color:"#4a8c84", bg:"#eaf5f3",
    desc:"Autopagi er kræftcellernes nødudgang under stress fra kemoterapi.",
    drugs:[
      {name:"Hydroxychloroquin (HCQ)",note:"Malariamiddel. Alkaliserer lysosomer og blokerer autopagi.",studies:"30337160,31886060"},
      {name:"Klorokin",note:"Stærkere version af HCQ med mere potent autopagi-hæmning.",studies:"30337160,17051984"},
    ]},
  { id:"inflammation", label:"Inflammation", color:"#5a8a6e", bg:"#eef6f1",
    desc:"Kronisk inflammation er kræftcellernes vækstmiljø.",
    drugs:[
      {name:"Aspirin",note:"Reducerer inflammation og hæmmer blodpladerne der hjælper tumorceller med at metastasere.",studies:"28830014,23680940"},
      {name:"Celecoxib",note:"Selektiv COX-2-hæmmer. Kraftigere end aspirin.",studies:"12750098,28830014"},
      {name:"Curcumin",note:"Naturlig NF-κB og COX-2 hæmmer. Tag med piperin eller som liposomal form.",studies:""},
    ]},
  { id:"immune", label:"Immunsuppression", color:"#5b8db8", bg:"#eef4fb",
    desc:"Kræftceller undertrykker aktivt immunforsvaret for at skjule sig.",
    drugs:[
      {name:"Cimetidin",note:"Gammel mavesyremedicin med anti-metastase-effekt. Blokerer kræftcellers adhesionsmolekyler.",studies:"15481946,1493299"},
      {name:"LDN",note:"Naltrexon lav dosis (1,5–4,5 mg). Tages til natten. ALDRIG kombiner med opioider.",studies:"28935922,20150494"},
    ]},
  { id:"metastasis", label:"Metastase", color:"#c47858", bg:"#fdf0eb",
    desc:"Metastase kræver at kræftcellerne løsriver sig og hæfter til nye steder.",
    drugs:[
      {name:"Dipyridamol",note:"Blodfortyndende middel. Adenosin-boost hæmmer tumorcelles vækst og invasivitet.",studies:"28458121,2144290"},
      {name:"Propranolol",note:"Betablokker. Blokerer adrenalin/noradrenalins aktivering af beta-receptorer på kræftceller.",studies:"27062194,29320737"},
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
        Princippet bag Metro Map: Kræftceller kan skifte brændstofkilde hvis én vej blokeres. McLellands strategi er at blokere ALLE veje simultant.
      </div>
    </div>
  );
}


// ─── OFF-LABEL MEDICIN ────────────────────────────────────────────────────────
const MED = {
  metformin:{name:"Metformin",mechanism:"AMPK-aktivering, mTOR-hæmning, Warburg-effekt-interferens, GLUT-transporter-reduktion, insulin/IGF-1 reduktion",dose:"500–2000 mg/dag fordelt på 2 doser med mad",studies:"37261084,32860850,31243680",src:["mclelland"],note:"Diabetesmedicin og hjørnesten i McLellands Metro Map. Diabetikere på metformin har signifikant lavere kræftdødelighed på tværs af næsten alle kræfttyper. Start lavt (500 mg) for at undgå mave-tarm bivirkninger."},
  mebendazol:{name:"Mebendazol",mechanism:"Tubulin-polymerisationshæmning (identisk binding som vincristin/taxaner), BCL-2 reduktion, VEGF reduktion, GLUT1 reduktion",dose:"100–200 mg 2–3x/dag — SKAL tages med fedtholdigt måltid (biotilgængelighed øges 5–10x)",studies:"31886060,25541231,23281930",src:["mclelland","tippens"],note:"Ormemiddel med identisk tubulin-mekanisme som kemo-standarder. KRITISK: Tag ALTID med fedtholdigt måltid."},
  fenbendazol:{name:"Fenbendazol (Panacur)",mechanism:"Tubulin-polymerisationshæmning (benzimidazol-klasse), p53-tumor-suppressor-aktivering, GLUT-transporter-reduktion",dose:"222 mg/dag (1 pose Panacur C hundepulver) x 3 dage PÅ + 4 dage PAUSE. Cyklisk.",studies:"29097407,33602073",src:["tippens"],note:"Veterinært ormemiddel — Joe Tippens protokollen. Aktiverer p53 tumor-suppressor der er muteret i ca. 50% af alle kræfttyper."},
  ivermectin:{name:"Ivermectin",mechanism:"PAK1-hæmning, WNT-β-catenin reduktion, P-glycoprotein reduktion (MDR-revertering), mitokondrie-dysfunktion i tumorceller",dose:"0,2–0,6 mg/kg/dag. Tag med fedtholdigt måltid.",studies:"32533918,34665993,28974414",src:["mclelland"],note:"Antiparasitikum med bredt anti-kræft aktivitetsspektrum. Hæmmer P-glycoprotein og kan modvirke kemo-resistens."},
  doxycyclin:{name:"Doxycyclin",mechanism:"Mitokondrie-ribosomhæmning (selektiv i kræftceller), MMP-2/9 reduktion (anti-metastatisk), cancer stem cell reduktion",dose:"100–200 mg/dag (1–2x daglig med mad). Cyklisk brug anbefales.",studies:"28034920,31485045",src:["mclelland"],note:"Antibiotikum. Særlig potent mod cancer stem cells der driver recidiv. Fotosensitivitet — undgå intens sol."},
  statiner:{name:"Statiner (lipofil: Simvastatin/Lovastatin)",mechanism:"HMG-CoA-reduktase hæmning, mevalonat-pathway hæmning, kolesterol/lipid-syntese hæmning, Rho/Ras-protein-hæmning",dose:"40–80 mg/dag. Tages om AFTENEN. CoQ10 tilskud anbefales.",studies:"28456308,30213800",src:["mclelland"],note:"McLelland: blokerer fedt/kolesterol som kræftcellers tredje brændstofkilde. Lipofil statin foretrækkes. TAGES OM AFTENEN."},
  hydroxychloroquin:{name:"Hydroxychloroquin (HCQ)",mechanism:"Autopagi-hæmning via lysosom-alkalisering, immunmodulering, anti-inflammatorisk",dose:"400–600 mg/dag. Kræver regelmæssig øjenundersøgelse ved langvarig brug.",studies:"30337160,31886060",src:["mclelland"],note:"Malariamiddel. Blokerer kræftcellernes autopagi-nødudgang ved kemoterapi-stress. Kræver øjenundersøgelse ved langvarig brug."},
  aspirin:{name:"Aspirin (lav dosis)",mechanism:"COX-1/COX-2 hæmning, prostaglandin E2 reduktion, thromboxan A2 reduktion (anti-platelet, anti-metastatisk), NF-κB hæmning",dose:"75–300 mg/dag (enterocoated tablet beskytter maveslimhinde)",studies:"28830014,23680940",src:["mclelland"],note:"McLelland-central: reducerer inflammation og hæmmer blodpladerne der hjælper tumorceller med at metastasere."},
  cimetidin:{name:"Cimetidin (Tagamet)",mechanism:"H2-receptor-antagonisme, HSPG-hæmning (blokerer tumorcellers adhesion til blodkar), NK-celle-aktivering",dose:"400–800 mg/dag (fordelt 2x daglig)",studies:"15481946,1493299",src:["mclelland"],note:"Gammel billig mavesyremedicin med usædvanlig anti-metastase-effekt. NK-celle-aktivering. Kliniske studier ved kolorektal og mavekræft viser overlevelsesgevinst."},
  dipyridamol:{name:"Dipyridamol (Persantin)",mechanism:"PDE hæmning, cAMP/cGMP stigning, adenosin-boost (anti-proliferativ), anti-platelet, VEGF hæmning",dose:"200–400 mg retard-form/dag",studies:"28458121,2144290",src:["mclelland"],note:"Blodfortyndende middel. Adenosin-boost hæmmer tumorcelles vækst og invasivitet."},
  propranolol:{name:"Propranolol",mechanism:"Beta-adrenerg-blokade, adrenalin/noradrenalin reduktion på tumorceller, VEGF reduktion, NK-celle-aktivering",dose:"40–80 mg/dag. Reducer langsomt ved seponering.",studies:"27062194,29320737",src:["mclelland"],note:"Betablokker. Stresshormonerne adrenalin/noradrenalin aktiverer beta-receptorer på kræftceller og fremmer vækst og metastase."},
  dca:{name:"DCA (Dichloroacetat)",mechanism:"PDK1 hæmning, pyruvat-dehydrogenase-aktivering, Warburg-effekt-revertering, mitokondrie-apoptose",dose:"10–25 mg/kg/dag cyklisk (5 dage PÅ, 2 dage PAUSE). Plus B1-vitamin 100 mg/dag.",studies:"17051984,21383728",src:["mclelland"],note:"Reverter Warburg-effekten. RISIKO: Perifer neuropati ved høje doser — B1-thiamin 100 mg/dag anbefales."},
  ldn:{name:"Naltrexon lav dosis (LDN)",mechanism:"OGF/OGFr-pathway-modulering, endorfin-boost (nattigt rebound), TLR4-modulering, immunregulering",dose:"1,5–4,5 mg til natten kl. 22–24 (start 1,5 mg, øg gradvist)",studies:"28935922,20150494",src:["mclelland"],note:"Tages til natten for naturligt endorfin-boost. KRITISK: ALDRIG kombiner med opioide smertestillende."},
  celecoxib:{name:"Celecoxib",mechanism:"Selektiv COX-2 hæmning, prostaglandin E2 reduktion, apoptose-induktion, anti-angiogen",dose:"400 mg 2x/dag",studies:"12750098,28830014",src:["mclelland"],note:"FDA-godkendt til FAP (familiær adenomatøs polypose). Kraftigere COX-2-variant end Aspirin."},
  itraconazol:{name:"Itraconazol",mechanism:"Anti-angiogen (VEGFR2/AKT/mTOR hæmning), Hedgehog-pathway hæmning, P-glycoprotein hæmning (MDR-revertering)",dose:"200–600 mg/dag med fedtholdigt måltid. Tjek CYP3A4-interaktioner.",studies:"24218511,28034920",src:[],note:"Svampemiddel med potent anti-angiogen effekt. Fase II ved NSCLC viste øget PFS."},
  disulfiram:{name:"Disulfiram + Kobber (Antabuse)",mechanism:"ALDH hæmning (cancer stem cells), dithiocarbamat-kobber-kompleks (NF-κB hæmning), proteasom hæmning",dose:"250–500 mg/dag + kobber 2 mg/dag. ABSOLUT ALKOHOL-ABSTINENS.",studies:"30936136,28743521",src:["mclelland"],note:"Med kobber danner selektivt cytotoksisk kompleks. Fase II studier ved glioblastom. KRITISK: selv minimal alkohol giver voldsom reaktion."},
  niclosamid:{name:"Niclosamid",mechanism:"STAT3 hæmning, WNT-β-catenin hæmning, mTORC1 hæmning, cancer stem cell hæmning",dose:"1000–2000 mg/dag (lav oral biotilgængelighed er udfordring)",studies:"32499290,27338789",src:[],note:"Tænia-ormemiddel med bredt anti-kræft spektrum. Lav oral biotilgængelighed er den store kliniske udfordring."},
  losartan:{name:"Losartan",mechanism:"AT1R-blokade, TGF-beta reduktion (anti-fibrotisk), desmoplasi-reduktion, forbedret kemo-penetration",dose:"50–100 mg/dag",studies:"28416612,31486401",src:[],note:"Blodtryksmedicin. Reducerer det stive stroma der omgiver tumorer og blokerer kemo-adgang. Særlig relevant ved bugspytkirtelkræft."},
  artesunate:{name:"Artesunate",mechanism:"Jern-aktiveret ROS-ferroptose (selektiv i jernrige tumorceller), HIF-1α reduktion, anti-angiogen",dose:"Oralt: 100–200 mg/dag.",studies:"28034920,32533918",src:["clark"],note:"Semi-syntetisk artemisinin-derivat med bedre stabilitet. Anti-kræft mekanismen er selvstændig fra Hulda Clarks teori."},
};

// ─── KOSTTILSKUD ──────────────────────────────────────────────────────────────
const SUP = {
  artemisinin:{name:"Artemisinin (Malurt/Wormwood)",ev:3,mechanism:"Jern-aktiveret ROS-ferroptose (selektiv i jernrige tumorceller), NF-κB reduktion, HIF-1α reduktion",dose:"200–400 mg 2x/dag på FASTENDE mave",src:["clark"],note:"Et af de mest intenst forsket-ede naturlægemidler mod kræft. Reagerer med jern i kræftceller og genererer selektivt frie radikaler."},
  curcumin:{name:"Curcumin (liposomal eller med piperin)",ev:2,mechanism:"NF-κB reduktion, COX-2 reduktion, EGFR reduktion, apoptose, anti-inflammatorisk",dose:"500–1000 mg 3x/dag med piperin ELLER liposomal form 200–500 mg/dag",src:["mclelland","tippens"],note:"Standard curcumin har kun ~1% biotilgængelighed — piperin øger 20x."},
  vitamind:{name:"Vitamin D3 + K2 MK-7",ev:3,mechanism:"VDR-aktivering, anti-proliferativ, differentiering, immunmodulering, apoptose",dose:"2000–5000 IU D3 + 100–200 μg K2 MK-7/dag. Mål P-vit D: 80–150 nmol/L.",src:[],note:"SUNSHINE-studiet: højdosis D-vitamin ved metastatisk tarmkræft forbedrede PFS markant."},
  melatonin:{name:"Melatonin (terapeutisk højdosis)",ev:2,mechanism:"Potent antioxidant, NK-celle-aktivering, kemo-sensibilisering, apoptose, VEGF reduktion",dose:"10–40 mg/aften (terapeutisk dosis — langt over søvn-dosis på 0,5–3 mg)",src:["mclelland"],note:"Kan reducere bivirkninger af kemoterapi og stråling. Kombiner IKKE med immunterapi uden lægekonsultation."},
  vitaminE:{name:"Vitamin E Succinat",ev:2,mechanism:"Selektiv mitokondrie-apoptose i kræftceller — succinat-formen er specifik for denne effekt",dose:"800 mg/dag — SPECIFIKT succinat-form (IKKE standard alfa-tocopherol)",src:["tippens"],note:"Joe Tippens protokol. Pro-apoptotiske egenskaber er unikke for succinat-formen."},
  cbd:{name:"CBD (cannabidiol) — fuld-spektrum",ev:2,mechanism:"CB1/CB2-aktivering, apoptose, anti-angiogen, autopagi-modulering",dose:"Start 10–25 mg/dag sublingualt. Titrér gradvist op mod 100–200 mg/dag.",src:["tippens"],note:"KRITISK: CBD er CYP3A4/CYP2D6-hæmmer — påvirker metabolismen af mange kemoterapier."},
  berberine:{name:"Berberine",ev:2,mechanism:"AMPK-aktivering (som metformin), STAT3 reduktion, tarm-mikrobiom-modulering, NF-κB reduktion",dose:"500 mg 2–3x/dag med mad",src:[],note:"Naturlig AMPK-aktivator med mekanisme svarende til metformin."},
  omega3:{name:"Omega-3 (EPA/DHA høj-dosis)",ev:2,mechanism:"Prostaglandin E2 reduktion, COX-modulering, ferroptose-sensibilisering, anti-inflammatorisk",dose:"2–4 g total EPA+DHA/dag",src:[],note:"Anti-inflammatorisk komplementerer aspirin. Forsigtig med højdosis under kemoterapi."},
  egcg:{name:"Grøn te ekstrakt (EGCG)",ev:2,mechanism:"EGFR reduktion, VEGF reduktion (anti-angiogen), apoptose, HDAC reduktion",dose:"400–800 mg EGCG/dag (caffein-fri ekstrakt). Tag på tom mave.",src:[],note:"Potentiel interaktion med bortezomib — forsigtig ved myelom."},
  quercetin:{name:"Quercetin",ev:2,mechanism:"PI3K/AKT reduktion, tyrosinkinase reduktion, senolytisk, P-gp reduktion (MDR-revertering)",dose:"500–1000 mg/dag med fedt",src:[],note:"Naturligt flavonoid. Hæmmer P-gp og modvirker multiresistens."},
  resveratrol:{name:"Resveratrol (trans-form)",ev:2,mechanism:"SIRT1/3-aktivering, mitokondrie-apoptose, NF-κB reduktion, COX reduktion",dose:"500–1000 mg/dag (trans-resveratrol med piperin).",src:[],note:"Vælg trans-form med piperin. Synergistisk med curcumin og quercetin."},
  sulforafan:{name:"Sulforafan (broccolispire-ekstrakt)",ev:2,mechanism:"Nrf2-aktivering, HDAC reduktion, apoptose, cancer stem cell reduktion",dose:"Broccolispireekstrakt 100–400 mg/dag",src:[],note:"1 kop broccolispirer = ~400 mg sulforafan. Undgå kogning."},
  ala:{name:"Alpha-Liponsyre (R-ALA)",ev:2,mechanism:"Potent antioxidant (vand- og fedtopløselig), PDK reduktion (DCA-overlap), mitokondrie-støtte",dose:"300–600 mg 2x/dag (R-form er biologisk aktiv)",src:["mclelland"],note:"McLelland: naturlig supplement med DCA-overlap. Kan sænke blodsukkerniveau."},
  boswellia:{name:"Boswellia Serrata (AKBA)",ev:2,mechanism:"5-LOX reduktion (potent, selektiv), NF-κB reduktion, apoptose, anti-angiogen",dose:"300–500 mg AKBA 3x/dag",src:[],note:"Særlig dokumenteret ved hjernetumorer (reducerer cerebral ødem) og leukæmi."},
  selen:{name:"Selen (selenomethionin)",ev:2,mechanism:"Selenoprotein-syntese, antioxidant, apoptose, DNA-reparation, immunmodulering",dose:"100–200 μg/dag. STOP ved over 400 μg/dag — toksisk.",src:[],note:"Supplement KUN ved dokumenteret mangel. Overdosering giver hårtab og neurologiske symptomer."},
  mcp:{name:"Modificeret Citruspektin (MCP)",ev:2,mechanism:"Galectin-3 hæmning (anti-adhesion, anti-metastatisk), MDSC-reduktion",dose:"15 g/dag (pulver opløst i KOLDT vand)",src:[],note:"Galectin-3 er centralt for kræftcellers evne til at metastasere."},
  psk:{name:"PSK / Coriolus (Tyrkehale-svamp)",ev:3,mechanism:"T-celle, NK-celle, dendritisk celle-aktivering, TLR2-agonist",dose:"3 g PSK-standardiseret ekstrakt/dag",src:[],note:"Japansk FDA-godkendt kræft-adjuvant (Krestin). Studier publiceret i NEJM og Lancet."},
  astragalus:{name:"Astragalus (Huang Qi)",ev:2,mechanism:"NK-celle, T-celle, makrofag-aktivering, anti-inflammatorisk",dose:"9–30 g tørret rod/dag eller standardiseret ekstrakt",src:[],note:"Meta-analyser ved NSCLC viser mulig overlevelsesgevinst kombineret med kemo."},
  lycopin:{name:"Lycopin",ev:2,mechanism:"Antioxidant, IGF-1 reduktion, anti-angiogen",dose:"10–30 mg/dag (kogte tomatprodukter)",src:[],note:"Epidemiologisk dokumenteret ved prostatakræft. Kogte tomatprodukter er langt bedre end rå."},
  granataeble:{name:"Granatæble Ekstrakt",ev:2,mechanism:"Anti-androgenisk (aromatase reduktion), NF-κB reduktion, VEGF reduktion, apoptose",dose:"1000 mg standardiseret ekstrakt/dag ELLER 240 ml 100% juice/dag",src:[],note:"Fase II studier ved prostatakræft: forlænget PSA-fordobblingstid."},
  probiotika:{name:"Probiotika (multi-stamme, høj CFU)",ev:2,mechanism:"Mikrobiom-modulering, immunregulering, SCFA-produktion (butyrat)",dose:"Min. 50 mia. CFU multi-stamme produkt.",src:[],note:"Mikrobiomet påvirker effekten af PD-1/PD-L1-immunterapi markant."},
  silymarin:{name:"Silymarin (Marietidsel/Milk Thistle)",ev:2,mechanism:"Hepatoprotektiv, NF-κB hæmning, anti-proliferativ ved HCC, anti-fibrotisk",dose:"140–420 mg/dag standardiseret ekstrakt. Del i 3 doser.",src:[],note:"Beskytter leveren under kemoterapi. Særlig relevant ved leverkræft."},
};


// ─── KLINISK DYBDE PER SUBTYPE ────────────────────────────────────────────────
const DEPTH = {
  melanoma:[
    { name:"BRAF V600E-muteret", criteria:"Kutan melanom / BRAF V600E mutation (~40–45%) / metastatisk eller stadium III–IV", badge:"Targetbar — dabrafenib + trametinib", badgeColor:"#4a8c84",
      biology:"BRAF V600E giver konstitutiv MAPK-aktivering der driver proliferation ukontrolleret. Kombineret BRAF+MEK-hæmning (dabrafenib+trametinib) giver ~70% responsrate. Resistens opstår næsten altid via RAS-mutation, MEK-amplifikation eller autopagi. Energistofskiftet er stærkt Warburg-præget.",
      pathways:[{n:"BRAF V600E/MAPK",l:"Ekstremt høj"},{n:"RAS/MEK/ERK",l:"Ekstremt høj"},{n:"PI3K/AKT/mTOR",l:"Moderat-høj"},{n:"PD-L1",l:"Moderat-høj"},{n:"Aerob glykolyse",l:"Høj"},{n:"Autopagi",l:"Moderat-høj"}],
      biomarkers:[
        {name:"BRAF V600E/K (NGS + ctDNA)",note:"Definerer behandling. V600E og V600K → dabrafenib+trametinib. ctDNA monitorerer resistensudvikling",crit:true},
        {name:"PD-L1 (TPS/CPS)",note:"Forudsiger immunterapi-respons — men negativt udelukker ikke respons",crit:false},
        {name:"TMB",note:"Høj TMB (soleksponeret melanom) = bedre immunterapi-respons",crit:false},
        {name:"LDH",note:"Forhøjet LDH = dårlig prognose. Baseline obligatorisk ved alle stadier",crit:true},
        {name:"PTEN (IHC/NGS)",note:"PTEN-tab = PI3K-hæmmer relevant og dårligere BRAF-hæmmer-respons",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer BRAF/MEK-drevet aerob glykolyse og mTOR. Reducerer BRAF-hæmmer-resistens. Observationsdata: melanom-patienter på metformin lever længere."},
        {name:"HCQ",ev:"Fase 1–2",note:"Autopagi er primær resistensmekanisme mod BRAF-hæmmere. HCQ genopretter dabrafenib-sensitivitet. Fase 1/2 igangværende."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2-hæmning → reducerer PGE2 der aktiverer BRAF/MAPK og immunsupprimerer mikromiljøet. Synergistisk med immunterapi."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer RAS/MAPK og synergistisk med MEK-hæmmere. Proapoptotisk i BRAF-hæmmer-resistente celler."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=BRAF+melanoma&type=Interventional&recrs=a" },
    { name:"BRAF-wildtype / NRAS-muteret", criteria:"Kutan melanom / BRAF-wildtype / NRAS mutation Q61 (~20%) / NF1 mutation (~15%)", badge:"Immunterapi er hjørnestenen", badgeColor:"#b8904a",
      biology:"BRAF-wildtype melanom mangler den klare targetbare mutation. NRAS-muteret melanom aktiverer RAS/MAPK og PI3K konstant men NRAS er undruggable direkte. Immunterapi (kombineret anti-PD-1 + anti-CTLA-4) er hjørnestenen med ~50–60% responsrate.",
      pathways:[{n:"NRAS/RAS/MAPK",l:"Ekstremt høj"},{n:"PI3K/AKT/mTOR",l:"Høj"},{n:"PD-1/PD-L1",l:"Høj"},{n:"Aerob glykolyse",l:"Høj"}],
      biomarkers:[
        {name:"BRAF wildtype bekræftelse",note:"BRAF-negativ bekræfter at BRAF-hæmmere er irrelevante",crit:true},
        {name:"NRAS mutation (NGS)",note:"NRAS+ → binimetinib (MEK-hæmmer) indiceret. Ekskluderer BRAF-hæmmere",crit:true},
        {name:"PD-L1 + TMB",note:"Dobbelt høj = bedst immunterapi-respons",crit:false},
        {name:"LDH",note:"Forhøjet LDH = dårlig prognose",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer NRAS-drevet RAS/MAPK og mTOR. Synergistisk med MEK-hæmmere."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2-hæmning synergistisk med pembrolizumab/nivolumab. Observationsdata: forbedret immunterapi-respons."},
        {name:"Probiotika",ev:"Fase 1–2",note:"Mikrobiomet er afgørende for anti-PD-1-respons ved melanom. Bifidobacterium specifikt vigtig."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=melanoma&type=Interventional&recrs=a" },
    { name:"Uvealt Melanom", criteria:"Melanom udgående fra uvea (koroid, corpus ciliare, iris) / GNAQ eller GNA11 mutation", badge:"GNAQ/GNA11 — sværest behandlelig", badgeColor:"#e06060",
      biology:"Uvealt melanom er biologisk fundamentalt anderledes end kutant melanom. GNAQ/GNA11-mutationer aktiverer PKC og MAPK. Metastatisk uvealt melanom har ekstremt dårlig prognose (~6–12 mdr) og reagerer dårligt på immunterapi. Tebentafusp er første godkendte behandling specifikt for HLA-A*02:01+ patienter.",
      pathways:[{n:"GNAQ/GNA11/PKC",l:"Ekstremt høj"},{n:"RAS/MAPK/ERK",l:"Høj"},{n:"YAP/Hippo",l:"Høj"},{n:"PI3K/AKT",l:"Moderat-høj"}],
      biomarkers:[
        {name:"GNAQ / GNA11 mutation (NGS)",note:"Bekræfter diagnosen og udelukker kutant melanom",crit:true},
        {name:"BAP1-tab (IHC/NGS)",note:"BAP1-tab = metastatisk risiko ~50% vs ~20% ved BAP1-intakt. Vigtigste prognostiske markør",crit:true},
        {name:"HLA-A*02:01 typning",note:"Nødvendig for tebentafusp-indikation — kun HLA-A*02:01+ patienter kan behandles",crit:true},
        {name:"SF3B1 mutation",note:"SF3B1+ = bedre prognose og sen metastasering",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Præklinisk",note:"AMPK → hæmmer GNAQ-drevet mTOR og YAP-aktivering. Præklinisk stærk evidens."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer GNAQ-downstream RAS/RHO. Observationsdata ved uvealt melanom."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=uveal+melanoma&type=Interventional&recrs=a" },
  ],

  bladder:[
    { name:"Muskelinvasiv blærekræft (MIBC)", criteria:"Urotelkarcinom / muskelinvasion (T2+) / MIBC", badge:"PD-L1 + FGFR3 målretning", badgeColor:"#7b6fa0",
      biology:"MIBC kræver radikal cystektomi eller kemoradiation. Neoadjuvant cisplatinbaseret kemo forbedrer OS markant. FGFR3-mutation (~15%) åbner for erdafitinib. Immunterapi er godkendt ved metastatisk cisplatinineligibel sygdom. Energistofskiftet er stærkt Warburg-præget.",
      pathways:[{n:"FGFR3 (mutation/fusion)",l:"Høj"},{n:"PI3K/AKT/mTOR",l:"Høj"},{n:"PD-L1",l:"Moderat-høj"},{n:"Aerob glykolyse",l:"Høj"},{n:"ERBB2 (HER2)",l:"Moderat"}],
      biomarkers:[
        {name:"FGFR3 mutation/fusion (NGS)",note:"~15% — erdafitinib godkendt ved metastatisk sygdom. Obligatorisk NGS",crit:true},
        {name:"PD-L1 (CPS ≥ 10)",note:"Indikerer pembrolizumab ved cisplatinineligibel metastatisk sygdom",crit:true},
        {name:"MSI-H / TMB-høj",note:"Åbner for pembrolizumab tumor-agnostisk",crit:false},
        {name:"ERBB2 amplifikation",note:"~10% — trastuzumab-kombinationsstudier igangværende",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer mTOR og Warburg. Reducerer PD-L1-ekspression — synergi med pembrolizumab. Observationsdata: blærekræft-patienter på metformin lever længere."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2-hæmning → reducerer PGE2-drevet immunsuppression og neoangiogenese. Synergi med immunterapi."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat-hæmning → reducerer RAS og PI3K-aktivering. Synergistisk med cisplatinkemo."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=muscle+invasive+bladder+cancer&type=Interventional&recrs=a" },
    { name:"Ikke-muskelinvasiv blærekræft (NMIBC) — høj risiko", criteria:"Urotelkarcinom / overfladisk / CIS og/eller T1 høj grad / BCG-behandlet", badge:"BCG-resistens er central udfordring", badgeColor:"#b8904a",
      biology:"NMIBC høj-risiko inklusiv carcinoma in situ (CIS) behandles med BCG-instillationer der aktiverer lokalt immunforsvar i blæren. BCG-resistens opstår hos ~30–40% og kræver ny strategi. Pembrolizumab er godkendt ved BCG-refraktær NMIBC.",
      pathways:[{n:"PD-1/PD-L1",l:"Høj"},{n:"PI3K/AKT/mTOR",l:"Moderat-høj"},{n:"FGFR3",l:"Moderat"},{n:"Aerob glykolyse",l:"Moderat-høj"}],
      biomarkers:[
        {name:"PD-L1 (CPS)",note:"Forudsiger pembrolizumab-respons ved BCG-refraktær CIS",crit:true},
        {name:"FGFR3 mutation",note:"FGFR3-muteret NMIBC har generelt bedre prognose og lavere progressionsrisiko",crit:false},
        {name:"TERT-promoter mutation",note:"Hyppig i NMIBC — prognostisk markør",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → reducerer Warburg og mTOR. Biologisk rationale ved BCG-resistens."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2-hæmning synergistisk med BCG-immunaktivering i blæren."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=non-muscle+invasive+bladder+cancer&type=Interventional&recrs=a" },
  ],

  lymphoma:[
    { name:"Klassisk Hodgkin Lymfom", criteria:"CD30+ Reed-Sternberg celler / nodulær sklerose (hyppigst) / PD-L1 overudtrykt", badge:"Kurativt ~85–90%", badgeColor:"#4a8c84",
      biology:"Klassisk HL er karakteriseret ved Reed-Sternberg-celler der udgør kun 1–2% af tumormassen omgivet af massivt inflammatorisk mikromiljø. CD30 og PD-L1 er konstitutivt overudtrykt. JAK/STAT-signalering er central. ~85–90% er kurerbare med ABVD eller BrECADD.",
      pathways:[{n:"JAK/STAT",l:"Ekstremt høj"},{n:"NF-κB",l:"Høj"},{n:"PD-L1/CD30",l:"Ekstremt høj"},{n:"PI3K/AKT",l:"Moderat-høj"},{n:"Aerob glykolyse",l:"Moderat"}],
      biomarkers:[
        {name:"CD30 (IHC)",note:"Positivt i næsten alle cHL — indikerer brentuximab vedotin ved recidiv",crit:true},
        {name:"PD-L1 (IHC)",note:"Overudtrykt ved RS-celler — pembrolizumab/nivolumab indiceret ved recidiv",crit:true},
        {name:"PET-CT (Deauville score)",note:"Interim PET afgørende for behandlingsintensivering. Deauville 4–5 = eskalering",crit:true},
        {name:"EBV-status (EBER ISH)",note:"EBV+ cHL = anderledes mikromiljø og prognose",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer JAK/STAT og mTOR. Reducerer PD-L1-ekspression på RS-celler — synergi med pembrolizumab."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2-hæmning → reducerer PGE2 i det inflammatoriske mikromiljø der opretholder RS-celler."},
        {name:"Statin",ev:"Præklinisk",note:"Mevalonat-hæmning → reducerer NF-κB og RAS/MAPK. Proapoptotisk i RS-cellelinjer."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=Hodgkin+lymphoma&type=Interventional&recrs=a" },
    { name:"DLBCL (Diffust Storcellet B-celle)", criteria:"DLBCL / CD20+ / aggressivt Non-Hodgkin lymfom / GCB eller ABC subtype", badge:"Kurativt ~60% med R-CHOP", badgeColor:"#5b8db8",
      biology:"DLBCL er det hyppigste aggressive lymfom. GCB-subtypen er BCL-2 rearrangeret og PI3K-drevet. ABC-subtypen er NF-κB og BCR/BTK-afhængig med dårligere prognose. Double-hit (MYC + BCL-2) er ekstremt aggressivt. R-CHOP er 1. linjestandardbehandling.",
      pathways:[{n:"BCR/BTK (ABC-subtype)",l:"Høj"},{n:"PI3K/AKT (GCB-subtype)",l:"Høj"},{n:"NF-κB (ABC-subtype)",l:"Høj"},{n:"MYC-amplifikation",l:"Ekstremt høj"},{n:"BCL-2 anti-apoptose",l:"Høj"},{n:"Aerob glykolyse",l:"Høj"}],
      biomarkers:[
        {name:"COO subtype (GCB vs ABC)",note:"Afgørende for prognose og ny behandling. ABC = ibrutinib-kombination benefit i studier",crit:true},
        {name:"MYC + BCL-2 + BCL-6 FISH",note:"Double/triple-hit = ekstremt aggressivt. Kræver R-DA-EPOCH frem for R-CHOP",crit:true},
        {name:"IPI score",note:"International Prognostic Index — afgørende for risikostratificering",crit:true},
        {name:"TP53 mutation",note:"TP53+ = dårlig prognose og kortere PFS med R-CHOP",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer MYC-drevet aerob glykolyse og mTOR. Observationsdata: DLBCL-patienter på metformin har bedre respons på R-CHOP."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer RAS/RHO og NF-κB. Proapoptotisk via BCL-2-reduktion. Synergistisk med rituximab."},
        {name:"HCQ",ev:"Fase 1–2",note:"Autopagi-hæmning — double-hit DLBCL er stærkt autopagi-afhængige. Fase 1/2 igangværende."},
        {name:"Disulfiram + kobber",ev:"Præklinisk",note:"Hæmmer NF-κB og proteasomet — direkte angrebspunkt på ABC-subtypens NF-κB-afhængiged."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=diffuse+large+B+cell+lymphoma&type=Interventional&recrs=a" },
    { name:"Follikulært Lymfom (grad 1–2)", criteria:"Follikulært lymfom / CD20+ / BCL-2 t(14;18) / grad 1–2 (lavgradig)", badge:"Indolent — kronisk sygdom", badgeColor:"#7b6fa0",
      biology:"Follikulært lymfom er det hyppigste indolente lymfom. t(14;18) giver BCL-2-overekspression og blokerer apoptose. Sygdommen er typisk kronisk tilbagevendende men sjældent kurativ. Transformation til DLBCL sker i ~3%/år.",
      pathways:[{n:"BCL-2 overekspression",l:"Ekstremt høj"},{n:"PI3K/AKT",l:"Høj"},{n:"BCR-signalering",l:"Moderat-høj"},{n:"NF-κB",l:"Moderat"},{n:"Aerob glykolyse",l:"Lav-moderat"}],
      biomarkers:[
        {name:"BCL-2 t(14;18) (FISH)",note:"Bekræfter diagnose. Negativ ved grad 3B — behandles som DLBCL",crit:true},
        {name:"FLIPI score",note:"Follikulær Lymfom International Prognostisk Indeks — styrer behandlingsbehov",crit:true},
        {name:"EZH2 mutation",note:"Åbner for tazemetostat (EZH2-hæmmer) ved recidiv",crit:false},
        {name:"Transformationsbiopi",note:"Hastigt voksende knude = transformationsbiopi obligatorisk (MYC, BCL-2)",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → reducerer BCL-2-afhængiged og mTOR. Synergistisk med rituximab."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer BCL-2-afhængiged og NF-κB. Synergistisk med rituximab."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=follicular+lymphoma&type=Interventional&recrs=a" },
  ],

  leukemia:[
    { name:"AML — FLT3-muteret", criteria:"AML / FLT3-ITD eller FLT3-TKD mutation / ~30% af AML", badge:"Targetbar — midostaurin/gilteritinib", badgeColor:"#b8904a",
      biology:"FLT3-muteret AML har historisk haft dårlig prognose men FLT3-hæmmere (midostaurin, gilteritinib) har forbedret overlevelsen markant. FLT3-ITD giver konstitutiv kinaseaktivering der driver PI3K/AKT, MAPK og STAT5 massivt. Energistofskiftet er ekstremt glykolytisk.",
      pathways:[{n:"FLT3/STAT5",l:"Ekstremt høj"},{n:"PI3K/AKT/mTOR",l:"Høj"},{n:"RAS/MAPK",l:"Høj"},{n:"Aerob glykolyse",l:"Ekstremt høj"},{n:"Autopagi",l:"Moderat-høj"}],
      biomarkers:[
        {name:"FLT3-ITD / FLT3-TKD (NGS)",note:"Definerer subtypen. FLT3-ITD allele ratio prognostisk. Afgørende for midostaurin/gilteritinib",crit:true},
        {name:"NPM1 mutation",note:"Ko-mutation med FLT3 — NPM1+/FLT3-ITD lav = god prognose",crit:true},
        {name:"IDH1/2 mutation",note:"Åbner for ivosidenib/enasidenib som tillæg ved IDH+ AML",crit:false},
        {name:"MRD (NGS/flow cytometri)",note:"Minimal residual disease — afgørende for behandlingsbeslutning",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer mTOR og aerob glykolyse. Synergi med midostaurin. Observationsdata: AML-patienter på metformin har bedre respons."},
        {name:"HCQ",ev:"Fase 1–2",note:"Autopagi-hæmning — blokerer primær resistensmekanisme mod FLT3-hæmmere. Fase 1/2 igangværende."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer RAS-membrananchoring downstream af FLT3. Proapoptotisk i AML-blaster."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=FLT3+acute+myeloid+leukemia&type=Interventional&recrs=a" },
    { name:"AML — IDH1/2-muteret", criteria:"AML / IDH1 R132 eller IDH2 R140/R172 mutation / ~20% af AML", badge:"IDH-hæmmer indiceret", badgeColor:"#4a8c84",
      biology:"IDH1/2-muteret AML producerer 2-HG der blokerer myeloid differentiering og låser celler i blaststadie. Ivosidenib (IDH1) og enasidenib (IDH2) er godkendte og kan inducere differentiering. Differentieringssyndrom er vigtig bivirkning.",
      pathways:[{n:"IDH1/2 → 2-HG",l:"Ekstremt høj"},{n:"Epigenetisk lås",l:"Høj"},{n:"PI3K/AKT/mTOR",l:"Moderat-høj"},{n:"Aerob glykolyse",l:"Høj"},{n:"Glutaminolyse",l:"Høj"}],
      biomarkers:[
        {name:"IDH1 / IDH2 mutation (NGS)",note:"Definerer subtypen. IDH1 → ivosidenib, IDH2 → enasidenib. Begge godkendt ved recidiverende AML",crit:true},
        {name:"2-HG (serum/urin)",note:"Monitorerer IDH-hæmmer-respons. Fald i 2-HG bekræfter biologisk aktivitet",crit:false},
        {name:"MRD",note:"Minimal residual disease — afgørende for behandlingsbeslutning",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer mTOR og glutaminolyse. Reducerer 2-HG-produktion indirekte. Synergistisk med ivosidenib."},
        {name:"HCQ",ev:"Præklinisk",note:"Autopagi-hæmning — IDH-muterede AML-celler er stærkt autopagi-afhængige under differentieringsbehandling."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=IDH+acute+myeloid+leukemia&type=Interventional&recrs=a" },
    { name:"CML — BCR-ABL positiv", criteria:"CML / BCR-ABL1 fusionsgen (Philadelphia-kromosom) / t(9;22)", badge:"Philadelphia-kromosom — TKI kurativt potentiale", badgeColor:"#4a8c84",
      biology:"CML er en af de mest behandlingssuccesrige kræftformer — TKI (imatinib, dasatinib, nilotinib) giver >85% langtidsoverlevelse. BCR-ABL1-fusionsproteinet aktiverer konstant ABL-kinaseaktivitet der driver PI3K/AKT, RAS/MAPK og STAT5.",
      pathways:[{n:"BCR-ABL1/ABL-kinase",l:"Ekstremt høj"},{n:"PI3K/AKT/mTOR",l:"Høj"},{n:"RAS/MAPK",l:"Høj"},{n:"STAT5",l:"Høj"},{n:"Aerob glykolyse",l:"Høj"}],
      biomarkers:[
        {name:"BCR-ABL1 (FISH + PCR)",note:"Diagnostisk og monitoreringsmarkør. BCR-ABL kvantificering (IS-skala) afgør behandlingsstatus og seponeringsstrategi",crit:true},
        {name:"ABL1 T315I mutation",note:"Resistens mod alle 1.–2. gen. TKI. Kræver ponatinib eller asciminib",crit:true},
        {name:"Sokal/ELTS risikoescore",note:"Afgørende for initial TKI-valg",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer mTOR downstream af BCR-ABL. Reducerer CML-stammeceller som overlever imatinib."},
        {name:"HCQ",ev:"Fase 1–2",note:"CML-stammeceller er stærkt autopagi-afhængige og overlever TKI via autopagi. ATLAs fase 2: HCQ + imatinib forbedret dyb molekylær remission."},
        {name:"Grøn te (EGCG)",ev:"Fase 1–2",note:"EGCG hæmmer BCR-ABL direkte og reducerer leukæmi-stamceller. Klinisk fase 2-studie: EGCG + imatinib forbedret respons."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=chronic+myeloid+leukemia&type=Interventional&recrs=a" },
    { name:"CLL — IGHV-umuteret / TP53-muteret", criteria:"CLL / IGHV-umuteret og/eller del(17p)/TP53-muteret / kræver behandling", badge:"Høj risiko — BTK-hæmmer", badgeColor:"#e06060",
      biology:"CLL er den hyppigste leukæmi i Vesten. BCR-signalering er den primære overlevelsesdrivkraft. Ibrutinib og acalabrutinib (BTK-hæmmere) har revolutioneret behandlingen. IGHV-umuteret og TP53-muteret/del(17p) er de vigtigste høj-risiko markører.",
      pathways:[{n:"BCR/BTK-signalering",l:"Ekstremt høj"},{n:"PI3K/AKT",l:"Høj"},{n:"BCL-2 anti-apoptose",l:"Ekstremt høj"},{n:"NF-κB",l:"Høj"},{n:"Aerob glykolyse",l:"Moderat"}],
      biomarkers:[
        {name:"IGHV mutationsstatus",note:"Umuteret = dårlig prognose og kortere tid til behandling. Afgørende for strategi-valg",crit:true},
        {name:"del(17p) / TP53 mutation",note:"del(17p)/TP53+ = BTK-hæmmer eller venetoclax obligatorisk. Kemo-immunterapi er kontraindiceret",crit:true},
        {name:"BTK C481S mutation (ctDNA)",note:"Erhvervet ibrutinib-resistens — kræver skift til acalabrutinib eller venetoclax",crit:false},
        {name:"ZAP-70 / CD38",note:"Surrogatmarkører for IGHV-status. Positive = aggressivt forløb",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer mTOR og BCL-2-drevet anti-apoptose. Observationsdata: CLL-patienter på metformin har lavere behandlingsbehov."},
        {name:"Statin",ev:"Fase 1–2",note:"Lipofil statin → reducerer RAS/RHO og NF-κB. Proapoptotisk i CLL-celler."},
        {name:"Curcumin",ev:"Fase 1–2",note:"NF-κB og BCL-2-downregulering i CLL-cellelinjer. Klinisk fase 2-data ved CLL."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=chronic+lymphocytic+leukemia&type=Interventional&recrs=a" },
  ],

  thyroid:[
    { name:"Papillært karcinom (PTC) — BRAF V600E", criteria:"Papillær histologi / BRAF V600E (~60%) / >95% kurabel", badge:"Bedst prognose — >95% 10-årsoverlevelse", badgeColor:"#4a8c84",
      biology:"PTC er den hyppigste skjoldbruskkirtelkræft og har ekstremt god prognose med standard behandling. BRAF V600E driver MAPK-signalering og reducerer RAI-uptake (radioaktivt jod). TERT-promoter ko-mutation = aggressivt forløb.",
      pathways:[{n:"BRAF V600E/MAPK",l:"Høj"},{n:"RET/PTC-fusion",l:"Moderat-høj"},{n:"PI3K/AKT",l:"Moderat"},{n:"Aerob glykolyse",l:"Moderat"}],
      biomarkers:[
        {name:"BRAF V600E (NGS + IHC)",note:"Forudsiger RAI-refraktæritet. Positiv → dabrafenib+trametinib ved metastatisk RAI-refraktær sygdom",crit:true},
        {name:"TERT-promoter mutation",note:"Ko-mutation med BRAF = ekstremt aggressivt forløb. Intensiveret opfølgning",crit:false},
        {name:"RET/PTC-fusion (NGS/FISH)",note:"Åbner for RET-hæmmere (selpercatinib, pralsetinib) ved RAI-refraktær sygdom",crit:false},
        {name:"Thyroglobulin (Tg) + TgAb",note:"Primær monitoreringsmarkør post-thyroidektomi. Stigende Tg = recidiv",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer BRAF-drevet MAPK og mTOR. Observationsdata: lavere recidivrisiko hos PTC-patienter på metformin."},
        {name:"Statin",ev:"Præklinisk",note:"Mevalonat → reducerer BRAF-downstream RAS/MAPK. Anti-invasivt i PTC-cellelinjer."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=papillary+thyroid+cancer&type=Interventional&recrs=a" },
    { name:"Anaplastisk Skjoldbruskkirtelkræft (ATC)", criteria:"Anaplastisk (udifferentieret) / ekstremt aggressivt / BRAF V600E ~45%", badge:"Median OS < 6 mdr — BRAF AKUT kritisk", badgeColor:"#e06060",
      biology:"ATC er en af de dødeligste kræftformer med median OS på 3–6 måneder. BRAF V600E er til stede i ~45% og er et kritisk handlingspunkt — dabrafenib + trametinib giver ~69% responsrate. HURTIG BRAF-testning er en medicinsk nødsituation.",
      pathways:[{n:"BRAF V600E/MAPK",l:"Ekstremt høj"},{n:"PI3K/AKT/mTOR",l:"Høj"},{n:"WNT/β-catenin",l:"Høj"},{n:"Aerob glykolyse",l:"Ekstremt høj"},{n:"Autopagi",l:"Høj"}],
      biomarkers:[
        {name:"BRAF V600E (AKUT NGS)",note:"⚠️ MEDICINSK NØDSITUATION — BRAF V600E+ → øjeblikkelig opstart af dabrafenib+trametinib. Svar kræves inden 48 timer",crit:true},
        {name:"PD-L1 (CPS)",note:"Immunterapi-mulighed ved BRAF-negativ ATC",crit:false},
        {name:"MSI-H",note:"Sjælden men åbner for pembrolizumab tumor-agnostisk",crit:false},
      ],
      offlabel:[
        {name:"HCQ",ev:"Fase 1–2",note:"Autopagi-hæmning synergistisk med dabrafenib+trametinib mod BRAF+ ATC. Fase 2 rekrutterer."},
        {name:"Metformin",ev:"Præklinisk",note:"AMPK → hæmmer mTOR og Warburg. Præklinisk synergi med BRAF-hæmmere."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=anaplastic+thyroid+cancer&type=Interventional&recrs=a" },
  ],

  kidney:[
    { name:"Klarcelle RCC (ccRCC)", criteria:"Klarcellet nyrekarcinom / VHL-mutation eller methylering (~75%) / meget vaskulariseret", badge:"VHL-muteret — mest aggressiv RCC", badgeColor:"#5b8db8",
      biology:"ccRCC er den hyppigste nyrekræftsubtype. VHL-tab aktiverer HIF-1α/HIF-2α konstant der driver massiv VEGF-produktion og angiogenese. Belzutifan (HIF-2α-hæmmer) er et gennembrud. Kombineret immunterapi + anti-VEGFR er nuværende 1. linjestandardbehandling.",
      pathways:[{n:"VHL-tab → HIF-1α/HIF-2α",l:"Ekstremt høj"},{n:"VEGF/VEGFR/angiogenese",l:"Ekstremt høj"},{n:"mTOR/mTORC1",l:"Høj"},{n:"PI3K/AKT",l:"Moderat-høj"},{n:"Aerob glykolyse",l:"Høj"}],
      biomarkers:[
        {name:"VHL mutation/methylering (NGS)",note:"Bekræfter ccRCC-diagnose og åbner for belzutifan ved VHL disease",crit:true},
        {name:"BAP1-tab (IHC/NGS)",note:"BAP1-tab = dårligst prognose. Kræver intensiveret behandling",crit:false},
        {name:"PBRM1 vs BAP1",note:"PBRM1-muteret = bedre immunterapi-respons. BAP1-muteret = bedre VEGFR-hæmmer respons",crit:false},
        {name:"PD-L1 (CPS/TPS)",note:"Forudsiger immunterapi-respons i kombinationsregimer",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer mTOR og HIF-1α-aktivering downstream af VHL-tab. Observationsdata: ccRCC-patienter på metformin lever længere."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer RAS/RHO og VEGF-produktion. Retrospektive data: bedre overlevelse ved RCC på statin."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2-hæmning → reducerer PGE2 der stabiliserer HIF-1α. Anti-angiogenetisk."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=clear+cell+renal+carcinoma&type=Interventional&recrs=a" },
    { name:"Metastatisk RCC", criteria:"RCC med fjernmetastaser / behandles som kronisk sygdom", badge:"Immunterapi + TKI standard", badgeColor:"#b8904a",
      biology:"Metastatisk RCC behandles nu med kombinationer af immunterapi og anti-VEGFR TKI. Nivolumab + ipilimumab eller pembrolizumab + axitinib er 1. linjestandardbehandlinger. Sygdommen er sjældent kurabel men kan kontrolleres i årevis.",
      pathways:[{n:"VEGF/VEGFR/angiogenese",l:"Ekstremt høj"},{n:"PD-1/PD-L1",l:"Høj"},{n:"mTOR",l:"Høj"},{n:"HIF-1α",l:"Høj"}],
      biomarkers:[
        {name:"IMDC risikoescore",note:"International Metastatic RCC Database Consortium — afgørende for behandlingsstrategi",crit:true},
        {name:"PD-L1 (TPS/CPS)",note:"Høj PD-L1 = benefit af nivolumab monoterapi i 2. linje",crit:false},
        {name:"BAP1 / PBRM1 mutation",note:"Styrer valg mellem immunterapi vs VEGFR-hæmmer",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer mTOR og HIF-1α. Synergistisk med sunitinib og pembrolizumab."},
        {name:"Statin",ev:"Fase 1–2",note:"Anti-VEGF effekt og mTOR-hæmning. Synergistisk med sunitinib."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=metastatic+renal+cell+carcinoma&type=Interventional&recrs=a" },
  ],

  uterine:[
    { name:"Endometrioidt karcinom — Type 1", criteria:"Endometrioidt karcinom / grad 1–2 / hormonfølsomt / god prognose", badge:"Hormonfølsomt — god prognose", badgeColor:"#4a8c84",
      biology:"Type 1 endometriekarcinom er østrogendrevet og har god prognose ved tidlig diagnose. PIK3CA-mutation er hyppig (~40%). Energistofskiftet er domineret af aerob glykolyse og lipidsyntetase. Metformin har særlig stærk biologisk rationale her da insulinresistens og overvægt er primære risikofaktorer.",
      pathways:[{n:"PI3K/AKT/mTOR",l:"Høj"},{n:"ER-signalering",l:"Høj"},{n:"WNT/β-catenin",l:"Moderat-høj"},{n:"FASN/lipidsyntese",l:"Moderat-høj"},{n:"Aerob glykolyse",l:"Moderat"}],
      biomarkers:[
        {name:"MMR / MSI-H (IHC + PCR)",note:"~25–30% MSI-H → pembrolizumab indiceret. Vigtigste test",crit:true},
        {name:"PIK3CA mutation",note:"Åbner for mTOR/PI3K-hæmmere. Hyppig ko-mutation",crit:false},
        {name:"ER / PR (IHC)",note:"Positiv → hormonbehandling (megestrolacetat, tamoxifen) som vedligeholdelse mulighed",crit:false},
        {name:"POLE exonuklease mutation",note:"POLE-ultramuteret = ekstremt god prognose. Kemoterapi kan undlades",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 2–3",note:"Stærkest rationale af alle kræfttyper — insulin og IGF-1 driver direkte ER-signalering. Multiple fase 2 studier: reducerer tumorproliferation markant ved neoadjuvant administration."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2-hæmning → reducerer østrogen-biosyntese via aromatase. Observationsdata: lavere recidivrisiko."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer PI3K/AKT og ER-biosyntese fra kolesterol."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=endometrial+cancer+type+1&type=Interventional&recrs=a" },
    { name:"Serøst / Klarcelle — Type 2", criteria:"Serøst eller klarcelle karcinom / grad 3 / aggressivt / TP53 mutation hyppig", badge:"Aggressivt — dårligere prognose", badgeColor:"#e06060",
      biology:"Type 2 endometriekarcinom ligner biologisk HGSOC-æggestokkræft med TP53-mutation som næsten universel faktor. HER2-amplifikation ses i ~20% af serøs type. POLE-mutation sjælden. Behandles med platinbaseret kemo + pembrolizumab ved MSI-H.",
      pathways:[{n:"TP53 mutation",l:"Ekstremt høj"},{n:"PI3K/AKT/mTOR",l:"Høj"},{n:"ERBB2/HER2",l:"Moderat-høj"},{n:"Aerob glykolyse",l:"Høj"}],
      biomarkers:[
        {name:"HER2 (IHC + FISH)",note:"~20% HER2+ serøs type → trastuzumab tilføjes kemo. Afgørende test",crit:true},
        {name:"MMR / MSI-H",note:"Sjælden ved type 2 men åbner for pembrolizumab",crit:true},
        {name:"TP53 mutation",note:"Næsten universel — bekræfter type 2 diagnosen",crit:false},
        {name:"POLE mutation",note:"Sjælden ved type 2 men ekstremt god prognose hvis tilstede",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer mTOR og HER2-downstream PI3K. Biologisk rationale."},
        {name:"HCQ",ev:"Præklinisk",note:"Autopagi-hæmning synergistisk med platinkemo ved serøs type."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer HER2-membranlokalisering og RAS/MAPK."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=uterine+serous+carcinoma&type=Interventional&recrs=a" },
  ],

  liver:[
    { name:"Hepatocellulært Karcinom (HCC) — Avanceret", criteria:"HCC / Barcelona Clinic Liver Cancer (BCLC) C / Child-Pugh A-B", badge:"Atezolizumab + bevacizumab standard", badgeColor:"#b8904a",
      biology:"HCC opstår i ~80% på baggrund af skrumpelever og er en af de hyppigste kræftdødårsager globalt. VHL-tab aktiverer HIF-1α massivt og driver VEGF-produktion. Atezolizumab + bevacizumab er nuværende 1. linjestandard og forbedrer OS markant vs. sorafenib.",
      pathways:[{n:"VEGF/VEGFR/angiogenese",l:"Ekstremt høj"},{n:"WNT/β-catenin",l:"Høj"},{n:"PI3K/AKT/mTOR",l:"Moderat-høj"},{n:"TP53",l:"Høj"},{n:"Aerob glykolyse",l:"Høj"}],
      biomarkers:[
        {name:"AFP (alfaføtoprotein)",note:"Primær HCC-markør. AFP > 400 ng/mL ved typisk billede er diagnostisk. Monitoreringsmarkør",crit:true},
        {name:"Child-Pugh score",note:"Leverfunktionsklassificering — afgørende for behandlingsvalg og dosis",crit:true},
        {name:"BCLC stadium",note:"Primært staging-system for HCC. Styrer behandlingsstrategi",crit:true},
        {name:"CTNNB1 mutation",note:"WNT+ HCC = anti-PD-1 lav responsrate. Påvirker immunterapi-beslutning",crit:false},
        {name:"HBV/HCV status",note:"Aktiv HBV kræver antiviral behandling — HBV-reaktivering risiko under immunterapi",crit:true},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer mTOR og WNT/β-catenin. Reducerer leverinflammation og fibrose der driver HCC-progression. Meta-analyse: signifikant bedre overlevelse. Særlig relevant ved NASH/diabetes-associeret HCC."},
        {name:"Statin",ev:"Fase 1–2",note:"Meta-analyse: lavere HCC-incidens og bedre overlevelse hos statin-brugere med kronisk leversygdom. Stærkest statin-evidens i HCC-prævention."},
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2-hæmning → reducerer PGE2 der driver HCC-vækst. Observationsstudier: aspirin reducerer HCC-incidens hos cirrosepatienter."},
        {name:"Propranolol",ev:"Fase 2",note:"Betablokker der reducerer portal hypertension og VEGF. Synergistisk med TACE. Kliniske data lovende ved avanceret HCC."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=hepatocellular+carcinoma&type=Interventional&recrs=a" },
    { name:"Intrahepatisk Kolangiokarcinom (iCCA)", criteria:"Kolangiokarcinom / intrahepatisk lokalisering / FGFR2 og IDH1/2 targetbar", badge:"FGFR2 og IDH1/2 targetbar", badgeColor:"#4a8c84",
      biology:"iCCA er karakteriseret ved FGFR2-fusioner (~15%) og IDH1/2-mutationer (~20%) som de vigtigste targetbare alterationer. Pemigatinib (FGFR2-hæmmer) og ivosidenib (IDH1-hæmmer) er godkendte. Desmoplatisk stroma analogt med PDAC. Standard 1. linje: gemcitabin + cisplatin + durvalumab.",
      pathways:[{n:"FGFR2/MAPK (fusion)",l:"Høj"},{n:"IDH1/2 → 2-HG",l:"Høj"},{n:"PI3K/AKT/mTOR",l:"Moderat-høj"},{n:"RAS/MAPK",l:"Moderat"},{n:"Aerob glykolyse",l:"Høj"}],
      biomarkers:[
        {name:"FGFR2-fusion (NGS/FISH)",note:"~15% — pemigatinib/infigratinib godkendt. Kræver NGS",crit:true},
        {name:"IDH1/2 mutation (NGS)",note:"~20% IDH1/IDH2 — ivosidenib godkendt ved IDH1+ recidiv",crit:true},
        {name:"MSI-H / TMB-høj",note:"Sjælden men åbner for pembrolizumab tumor-agnostisk",crit:false},
        {name:"NTRK-fusion",note:"Sjælden men targetbar med larotrectinib",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer mTOR og 2-HG-produktion ved IDH-mutation. Reducerer Warburg."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer RAS/MAPK og stroma-produktion. Synergistisk med gemcitabin."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=intrahepatic+cholangiocarcinoma&type=Interventional&recrs=a" },
  ],

  gastric:[
    { name:"HER2-positiv Mavekræft", criteria:"Gastrisk adenokarcinom / HER2 IHC 3+ eller IHC 2+/FISH+ / ~15–20%", badge:"HER2+ — trastuzumab standard", badgeColor:"#4a8c84",
      biology:"HER2-positiv mavekræft udgør ~15–20% og har fundamentalt anderledes biologi end HER2-negativ. Trastuzumab tilføjet kemo forbedrer OS markant (ToGA-studiet). PI3K/AKT/mTOR er kraftigt aktiveret downstream af HER2. Energistofskiftet er stærkt Warburg-præget.",
      pathways:[{n:"HER2/ErbB2",l:"Ekstremt høj"},{n:"PI3K/AKT/mTOR",l:"Høj"},{n:"RAS/MAPK",l:"Høj"},{n:"PD-L1",l:"Moderat"},{n:"Aerob glykolyse",l:"Høj"}],
      biomarkers:[
        {name:"HER2 (IHC + FISH)",note:"Score 3+ = positiv. Score 2+ kræver FISH-bekræftelse. Afgørende for trastuzumab-indikation",crit:true},
        {name:"PD-L1 (CPS ≥ 5)",note:"CPS ≥ 5 → nivolumab tilføjes kemo + trastuzumab (CheckMate 811)",crit:true},
        {name:"MMR / MSI-H",note:"~5% af gastrisk kræft — pembrolizumab indiceret",crit:true},
        {name:"ERBB2 amplifikation (ctDNA)",note:"Monitorerer HER2-status under behandling — HER2-tab er resistensmekanisme",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer HER2-downstream mTOR og PI3K. Synergistisk med trastuzumab."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer HER2-membranlokalisering og RAS/MAPK."},
        {name:"Cimetidin",ev:"Fase 2",note:"Anti-HSPG og NK-celle-aktivering. Randomiseret studie ved mavekræft: forbedret 10-årsoverlevelse."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=HER2+gastric+cancer&type=Interventional&recrs=a" },
    { name:"MSI-H / dMMR Mavekræft", criteria:"Gastrisk adenokarcinom / MSI-H eller dMMR / ~5–10%", badge:"Immunterapi-responsiv", badgeColor:"#4a8c84",
      biology:"MSI-H mavekræft udgør ~5–10% og har massiv mutationsbyrde der giver mange neoantigener. Pembrolizumab er ekstremt effektivt — responsrate ~40–60% ved metastatisk MSI-H mavekræft. EBV-positiv mavekræft overlapper biologisk med MSI-H.",
      pathways:[{n:"MMR-mangelfuld",l:"Ekstremt høj"},{n:"PD-1/PD-L1",l:"Høj"},{n:"PI3K/AKT",l:"Moderat-høj"},{n:"WNT/β-catenin",l:"Moderat"}],
      biomarkers:[
        {name:"MMR (IHC) / MSI (PCR eller NGS)",note:"Bekræfter MSI-H status. Kræves for pembrolizumab-indikation",crit:true},
        {name:"EBV-status (EBER ISH)",note:"EBV+ mavekræft ligner MSI-H biologisk og reagerer godt på immunterapi",crit:false},
        {name:"PD-L1 (CPS)",note:"CPS ≥ 5 = pembrolizumab 1. linje standard",crit:true},
        {name:"TMB",note:"Høj TMB understøtter immunterapi-respons",crit:false},
      ],
      offlabel:[
        {name:"Aspirin",ev:"Fase 1–2",note:"COX-2-hæmning → reducerer PGE2-drevet immunsuppression. Synergi med pembrolizumab."},
        {name:"Metformin",ev:"Fase 1–2",note:"Reducerer PD-L1-ekspression og MDSC — synergi med pembrolizumab."},
        {name:"Probiotika",ev:"Fase 1–2",note:"Mikrobiomet er afgørende for immunterapi-respons. Akkermansia muciniphila korrelerer med bedre respons."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=MSI+gastric+cancer&type=Interventional&recrs=a" },
    { name:"Diffus type / Signetringscelle", criteria:"Gastrisk adenokarcinom / diffus histologi / signetringsceller / Laurén diffus type", badge:"Aggressiv — tidlig spredning", badgeColor:"#e06060",
      biology:"Diffus mavekræft er biologisk fundamentalt anderledes end intestinal type. E-cadherin-tab (CDH1-mutation) er karakteristisk og driver invasivitet og peritoneal spredning. Energistofskiftet er ekstremt Warburg-præget. Arvelig diffus mavekræft (HDGC) skyldes CDH1-kimcellelinje-mutation.",
      pathways:[{n:"CDH1-tab/E-cadherin",l:"Ekstremt høj"},{n:"RHO/ROCK invasionsvejen",l:"Høj"},{n:"PI3K/AKT/mTOR",l:"Moderat-høj"},{n:"Aerob glykolyse",l:"Høj"}],
      biomarkers:[
        {name:"CDH1 germline mutation",note:"Arvelig diffus mavekræft (HDGC) — familietest og profylaktisk gastrektomi ved bærere",crit:true},
        {name:"HER2 (IHC + FISH)",note:"Sjælden ved diffus type (~5%) men skal testes",crit:true},
        {name:"MMR / MSI-H",note:"Sjælden ved diffus type men åbner for pembrolizumab",crit:false},
        {name:"FGFR2 amplifikation",note:"~5–10% ved diffus type — åbner for FGFR-hæmmere i studier",crit:false},
      ],
      offlabel:[
        {name:"Metformin",ev:"Fase 1–2",note:"AMPK → hæmmer mTOR og Warburg. Biologisk rationale ved diffus type."},
        {name:"Statin",ev:"Fase 1–2",note:"Mevalonat → reducerer RHO/ROCK-invasionsvejen der er central ved diffus type."},
        {name:"Cimetidin",ev:"Fase 2",note:"Anti-adhesion via HSPG-hæmning — særlig relevant ved diffus types invasive karakter."},
      ],
      trials:"https://clinicaltrials.gov/search?cond=diffuse+gastric+cancer&type=Interventional&recrs=a" },
  ],
};


// ─── KRÆFTTYPE DATA ───────────────────────────────────────────────────────────
const CANCER_DATA = [
  {id:"breast",dk_key:"breast",name:"Brystkræft",nameEn:"Breast Cancer",icd10:"C50",icon:"🎗️",dk:"~5.000/år",fy:"87%",organ:"Bryst",
   desc:"Brystkræft opstår når celler i brystvævet begynder at vokse ukontrolleret. Det er den hyppigste kræftform hos kvinder. Kræftcellernes receptorer fungerer som nøgler der bestemmer hvilken medicin der virker bedst.",
   sub:["Luminalt A — hormonfølsom (ER+/PR+), langsom vækst og bedste prognose","Luminalt B — hormonfølsom og HER2+","HER2-overeksprimeret — vokser hurtigt men reagerer godt på Herceptin","Triple-negativ (TNBC) — ingen receptorer, kræver kemoterapi, kan kureres"],
   tx:"Kirurgi er typisk første skridt. Hormonfølsom kræft (ER+) behandles med daglige hormontabletter i 5–10 år (tamoxifen eller aromatasehæmmere). HER2+ behandles med Herceptin-infusioner i et år. Triple-negativ kræft behandles med kemoterapi (AC + taxaner). CDK4/6-hæmmere (palbociclib) gives ved fremskreden hormonfølsom type.",
   meds:[MED.metformin,MED.aspirin,MED.statiner,MED.doxycyclin,MED.cimetidin,MED.dipyridamol,MED.propranolol,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.disulfiram,MED.ldn,MED.niclosamid,MED.hydroxychloroquin,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.omega3,SUP.melatonin,SUP.egcg,SUP.artemisinin,SUP.berberine,SUP.ala,SUP.vitaminE,SUP.quercetin,SUP.mcp,SUP.boswellia,SUP.sulforafan,SUP.resveratrol]},

  {id:"lung",dk_key:"lung",name:"Lungekræft",nameEn:"Lung Cancer",icd10:"C34",icon:"🫁",dk:"~4.800/år",fy:"20%",organ:"Lunge",
   desc:"Lungekræft er den kræftform der koster flest liv i Danmark. Den opdeles i ikke-småcellet (NSCLC, ca. 85%) og småcellet (SCLC, ca. 15%). Moderne gentesting åbner for målrettede behandlinger i tablet-form.",
   sub:["NSCLC Adenokarcinom — hyppigst, mutationsscreening vigtig","NSCLC Planocellulært — typisk rygere, central placering","NSCLC Storcellet — aggressiv, sjælden undertype","SCLC Småcellet — meget aggressiv, spreder sig hurtigt"],
   tx:"Tidlig lungekræft behandles med kirurgi. Fremskreden NSCLC: mutationstest er afgørende — EGFR-mutation giver osimertinib-tabletter, ALK-rearrangement giver alectinib, KRAS G12C giver sotorasib. Uden mutation: immunterapi (pembrolizumab) hvis PD-L1 er positivt. Småcellet: kemoterapi + stråling.",
   meds:[MED.metformin,MED.itraconazol,MED.hydroxychloroquin,MED.doxycyclin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.propranolol,MED.aspirin,MED.cimetidin,MED.disulfiram,MED.niclosamid,MED.dca,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.sulforafan,SUP.astragalus,SUP.artemisinin,SUP.melatonin,SUP.egcg,SUP.berberine,SUP.boswellia,SUP.ala,SUP.omega3,SUP.quercetin,SUP.vitaminE,SUP.cbd]},

  {id:"colorectal",dk_key:"colorectal",name:"Tarmkræft",nameEn:"Colorectal Cancer",icd10:"C18-C20",icon:"🔴",dk:"~5.000/år",fy:"65%",organ:"Tyktarm/Endetarm",
   desc:"Tarmkræft opstår i tyktarmen eller endetarmen og er en af de hyppigste kræftformer i Danmark. MSI-status afgør om immunterapi virker. Off-label evidensen er særlig stærk her.",
   sub:["Kolon karcinom (C18) — opstår i tyktarmen","Rektal karcinom (C20) — i endetarmen, anderledes behandling","MSI-høj (ca. 15%) — reagerer godt på immunterapi","MSS/MSI-lav (ca. 85%) — immunterapi virker sjældent"],
   tx:"Kirurgi er hjørnestenen. Rektalcancer behandles typisk med stråling og kemoterapi FØR operation. Adjuvant kemoterapi ved stadium III: FOLFOX i 6 måneder. Metastatisk sygdom: FOLFOX eller FOLFIRI plus biologisk medicin. Immunterapi (pembrolizumab) er meget effektiv ved MSI-H kræft.",
   meds:[MED.aspirin,MED.metformin,MED.celecoxib,MED.statiner,MED.cimetidin,MED.mebendazol,MED.ivermectin,MED.fenbendazol,MED.dipyridamol,MED.doxycyclin,MED.disulfiram,MED.niclosamid,MED.propranolol,MED.hydroxychloroquin,MED.losartan,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.berberine,SUP.probiotika,SUP.artemisinin,SUP.egcg,SUP.sulforafan,SUP.melatonin,SUP.mcp,SUP.psk,SUP.quercetin,SUP.omega3,SUP.boswellia,SUP.resveratrol]},

  {id:"prostate",dk_key:"prostate",name:"Prostatakræft",nameEn:"Prostate Cancer",icd10:"C61",icon:"🔵",dk:"~5.500/år",fy:"92%",organ:"Prostata",
   desc:"Prostatakræft er den hyppigste kræftform hos mænd. Mange tilfælde vokser meget langsomt og kræver ikke øjeblikkelig behandling. Kræftcellerne er afhængige af testosteron for at vokse.",
   sub:["Lokaliseret lav-risiko — aktiv overvågning er often rigtig valg","Lokaliseret høj-risiko — kirurgi eller stråling anbefales","Metastatisk hormonsensitiv (mHSPC) — reagerer på hormonbehandling","Kastrations-resistent (CRPC) — vokser trods hormonbehandling"],
   tx:"Lav-risiko: Aktiv overvågning med regelmæssige PSA-målinger. Høj-risiko lokaliseret: Radikal prostatektomi eller strålebehandling. Metastatisk: GnRH-agonister der sænker testosteron plus enzalutamid eller abiraterone. PARP-hæmmere ved BRCA-mutation.",
   meds:[MED.metformin,MED.statiner,MED.itraconazol,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.propranolol,MED.disulfiram,MED.niclosamid,MED.cimetidin,MED.ldn,MED.doxycyclin,MED.artesunate],
   sups:[SUP.lycopin,SUP.granataeble,SUP.egcg,SUP.vitamind,SUP.selen,SUP.curcumin,SUP.artemisinin,SUP.quercetin,SUP.mcp,SUP.berberine,SUP.melatonin,SUP.boswellia,SUP.resveratrol,SUP.omega3,SUP.sulforafan]},

  {id:"melanoma",dk_key:"melanoma",name:"Hudkræft (Melanom)",nameEn:"Melanoma",icd10:"C43",icon:"🌑",dk:"~2.200/år",fy:"St.I: 98%, St.IV: 25%",organ:"Hud",
   desc:"Melanom er den farligste form for hudkræft. Tidlig opdagelse er altafgørende. Immunterapi har revolutioneret behandlingen de seneste 10 år. BRAF-mutation (i ca. 50%) åbner for meget effektiv målrettet behandling.",
   sub:["BRAF V600E (ca. 50%) — mutation der muliggør effektiv kombinations-behandling","NRAS-muteret (ca. 20%) — immunterapi er primært valg","Wild-type — hverken BRAF eller NRAS mutation","Uveal melanom — opstår i øjet, anderledes biologi"],
   tx:"Lokaliseret melanom: Kirurgisk fjernelse med sikkerhedsmargin. Fremskreden melanom: Immunterapi er hjørnestenen — pembrolizumab eller nivolumab, eller kombinationen ipilimumab plus nivolumab. BRAF V600E-positiv: BRAF/MEK-hæmmere (dabrafenib plus trametinib).",
   meds:[MED.metformin,MED.propranolol,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.aspirin,MED.hydroxychloroquin,MED.disulfiram,MED.cimetidin,MED.doxycyclin,MED.niclosamid,MED.artesunate],
   sups:[SUP.vitamind,SUP.curcumin,SUP.melatonin,SUP.resveratrol,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.quercetin,SUP.ala,SUP.sulforafan,SUP.omega3,SUP.cbd]},

  {id:"bladder",dk_key:"bladder",name:"Blærekræft",nameEn:"Bladder Cancer",icd10:"C67",icon:"🫧",dk:"~2.600/år",fy:"Overfladisk >80%, MIBC ~50%",organ:"Urinblære",
   desc:"Blærekræft opstår i blærens slimhinde og er tæt forbundet med rygning. Blod i urinen er det klassiske første symptom. Kræftens dybde ind i blærevæggen er afgørende for behandlingen.",
   sub:["NMIBC Lav-risiko — overfladisk, lav sandsynlighed for tilbagefald","NMIBC Høj-risiko med CIS — carcinoma in situ, aggressiv flat form","MIBC — kræften vokser ind i muskelvæggen","Metastatisk urotelkarcinom — spredt til andre organer"],
   tx:"NMIBC: Skopisk fjernelse (TUR-B) efterfulgt af BCG-instillationer direkte i blæren. MIBC: Radikal cystektomi eller blærebevarende stråling plus kemoterapi. Metastatisk: Kemoterapi (gemcitabin + cisplatin), immunterapi (atezolizumab, pembrolizumab).",
   meds:[MED.metformin,MED.statiner,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.cimetidin,MED.disulfiram,MED.doxycyclin,MED.propranolol,MED.niclosamid,MED.artesunate],
   sups:[SUP.egcg,SUP.vitamind,SUP.curcumin,SUP.artemisinin,SUP.sulforafan,SUP.berberine,SUP.melatonin,SUP.quercetin,SUP.omega3]},

  {id:"lymphoma",dk_key:"lymphoma",name:"Lymfom",nameEn:"Lymphoma",icd10:"C81-C85",icon:"🟣",dk:"~2.000/år",fy:"Hodgkin 90%, DLBCL 65%",organ:"Lymfesystem",
   desc:"Lymfom er kræft i lymfesystemet. Det opdeles i Hodgkin og non-Hodgkin lymfom. Hævede lymfeknuder, træthed, nattesvede og uforklaret vægttab er klassiske symptomer.",
   sub:["Hodgkin lymfom — typisk yngre patienter, helbredes i ca. 90%","DLBCL — diffust storcellet B-celle lymfom, hyppigst non-Hodgkin","Follikulært lymfom — langsomt voksende, god prognose","Mantle-celle lymfom — aggressiv, sjælden"],
   tx:"Hodgkin: ABVD kemoterapi (4–6 kure) med eller uden strålebehandling. DLBCL: R-CHOP protokol (rituximab + kemoterapi, 6 kure). Follikulær: Watch and wait ved asymptomatisk sygdom. CAR-T cellebehandling og stamcelletransplantation ved tilbagefald.",
   meds:[MED.metformin,MED.hydroxychloroquin,MED.statiner,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.doxycyclin,MED.disulfiram,MED.cimetidin,MED.niclosamid,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.melatonin,SUP.artemisinin,SUP.boswellia,SUP.egcg,SUP.psk,SUP.berberine,SUP.resveratrol,SUP.quercetin,SUP.omega3]},

  {id:"leukemia",dk_key:"leukemia",name:"Leukæmi",nameEn:"Leukemia",icd10:"C91-C95",icon:"🩸",dk:"~1.400/år",fy:"CML >90%, CLL 85%, AML 30%",organ:"Blod/Knoglemarv",
   desc:"Leukæmi er kræft i blodet og knoglemarven. Der er fire hovedtyper: akut (AML og ALL) og kronisk (CML og CLL). Træthed, blødningstendens og hyppige infektioner er typiske symptomer.",
   sub:["AML — Akut myeloid leukæmi, kræver omgående behandling","ALL — Akut lymfatisk leukæmi, hyppigst hos børn, god prognose","CML — Kronisk myeloid leukæmi (BCR-ABL), næsten kurabel med tabletter","CLL — Kronisk lymfatisk leukæmi, langsom, mange lever normalt i mange år"],
   tx:"AML: Intensiv kemoterapi (7+3 protokol) fulgt af knoglemarvstransplantation ved høj-risiko. CML: TKI-tabletter dagligt — imatinib (Glivec), nilotinib eller dasatinib. CLL: Ibrutinib (BTK-hæmmer) eller venetoclax plus obinutuzumab.",
   meds:[MED.metformin,MED.hydroxychloroquin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.disulfiram,MED.doxycyclin,MED.niclosamid,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.resveratrol,SUP.artemisinin,SUP.boswellia,SUP.berberine,SUP.egcg,SUP.melatonin,SUP.quercetin,SUP.ala]},

  {id:"pancreatic",dk_key:"pancreatic",name:"Bugspytkirtelkræft",nameEn:"Pancreatic Cancer",icd10:"C25",icon:"🟡",dk:"~1.000/år",fy:"12%",organ:"Bugspytkirtel",
   desc:"Bugspytkirtelkræft har den dårligste prognose af alle solide tumorer. Sen diagnose og ekstremt desmoplatisk stroma gør behandling særdeles vanskelig. Tidlig BRCA-testning er afgørende.",
   sub:["Duktalt adenokarcinom (PDAC, over 90%) — den aggressive og hyppigste form","Neuroendokrin tumor (pNET) — vokser langsommere, væsentligt bedre prognose","Metastatisk PDAC — spredt til lever eller lunge ved diagnosen"],
   tx:"Whipple-operation er eneste kurerende behandling — men kun ca. 20% er operable. Kemoterapi: FOLFIRINOX eller gemcitabin plus nab-paclitaxel. Losartan undersøges for at blødgøre arvævet. Immunterapi virker sjældent ved PDAC.",
   meds:[MED.metformin,MED.hydroxychloroquin,MED.itraconazol,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.propranolol,MED.losartan,MED.disulfiram,MED.doxycyclin,MED.niclosamid,MED.dca,MED.artesunate,MED.celecoxib],
   sups:[SUP.curcumin,SUP.artemisinin,SUP.quercetin,SUP.vitamind,SUP.melatonin,SUP.sulforafan,SUP.omega3,SUP.boswellia,SUP.berberine,SUP.egcg,SUP.cbd,SUP.vitaminE,SUP.ala]},

  {id:"thyroid",dk_key:"thyroid",name:"Skjoldbruskkirtalkræft",nameEn:"Thyroid Cancer",icd10:"C73",icon:"🦋",dk:"~800/år",fy:"PTC/FTC >95%, ATC <10%",organ:"Skjoldbruskkirtel",
   desc:"Kræft i skjoldbruskkirtlen opdages ofte tilfældigt ved ultralyd. Papillær og follikulær type er behandlingsresponsive med fremragende prognose. Anaplastisk er ekstremt aggressiv.",
   sub:["Papillær (PTC, ca. 85%) — langsom vækst, fremragende prognose","Follikulær (FTC, ca. 10%) — god prognose","Medullær (MTC, ca. 3%) — RET-mutation, familietest anbefales","Anaplastisk (ATC, ca. 2%) — ekstremt aggressiv"],
   tx:"Thyroidektomi efterfulgt af radioaktivt jod (RAI). Livslang levothyroxin herefter. RAI-refraktær DTC: lenvatinib eller sorafenib. Anaplastisk med BRAF V600E: dabrafenib plus trametinib plus pembrolizumab.",
   meds:[MED.metformin,MED.aspirin,MED.hydroxychloroquin,MED.ldn,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.artesunate,MED.propranolol,MED.disulfiram,MED.doxycyclin,MED.niclosamid,MED.itraconazol],
   sups:[SUP.selen,SUP.vitamind,SUP.curcumin,SUP.quercetin,SUP.melatonin,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.boswellia,SUP.omega3]},

  {id:"kidney",dk_key:"kidney",name:"Nyrekræft",nameEn:"Renal Cell Carcinoma",icd10:"C64",icon:"🫘",dk:"~1.000/år",fy:"Lokaliseret 93%, Metastatisk 12%",organ:"Nyre",
   desc:"Nyrekræft opstår oftest i den ene nyre og opdages i mange tilfælde tilfældigt ved scanning. Metastatisk nyrekræft behandles med en ny generation af immunterapi og målrettede medikamenter.",
   sub:["Klarcelle karcinom (ca. 80%) — hyppigst, reagerer godt på immunterapi","Papillær RCC (ca. 15%) — to undertyper med lidt forskellig biologi","Kromofobt RCC (ca. 5%) — langsom vækst, generelt god prognose","Metastatisk RCC — behandles som kronisk sygdom"],
   tx:"Lokaliseret: Radikal nefrektomi eller nyre-bevarende partiel nefrektomi. Metastatisk: Dual immunterapi (nivolumab plus ipilimumab) eller pembrolizumab plus axitinib er nu standard. TKI: sunitinib, pazopanib, kabozantinib.",
   meds:[MED.metformin,MED.statiner,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.hydroxychloroquin,MED.propranolol,MED.aspirin,MED.disulfiram,MED.doxycyclin,MED.itraconazol,MED.niclosamid,MED.artesunate],
   sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.melatonin,SUP.quercetin,SUP.omega3,SUP.sulforafan,SUP.boswellia,SUP.ala]},

  {id:"uterine",dk_key:"uterine",name:"Livmoderkræft",nameEn:"Endometrial Cancer",icd10:"C54",icon:"🔶",dk:"~1.200/år",fy:"~82%",organ:"Livmoder",
   desc:"Livmoderkræft opstår i livmoderslimhinden og er den hyppigste kræft i de kvindelige kønsorganer. Den opdages typisk tidligt. Metformin har særlig stærk evidens her.",
   sub:["Type 1 — Endometrioidt karcinom (ca. 80%), hormonfølsomt, god prognose","Type 2 — Serøst eller klarcelle karcinom, aggressivt","MMR-deficient / MSI-høj (ca. 25–30%) — god kandidat til immunterapi","HER2+ serøst (ca. 20%) — reagerer på trastuzumab"],
   tx:"Hysterektomi er standardbehandling og helbredende for de fleste. Adjuvant strålebehandling ved høj-risiko. Kemoterapi ved avanceret sygdom. Immunterapi: pembrolizumab ved MSI-H/MMR-deficient type.",
   meds:[MED.metformin,MED.aspirin,MED.statiner,MED.mebendazol,MED.ivermectin,MED.fenbendazol,MED.propranolol,MED.hydroxychloroquin,MED.cimetidin,MED.doxycyclin,MED.disulfiram,MED.niclosamid,MED.artesunate,MED.ldn],
   sups:[SUP.curcumin,SUP.vitamind,SUP.berberine,SUP.artemisinin,SUP.melatonin,SUP.egcg,SUP.omega3,SUP.quercetin,SUP.sulforafan,SUP.resveratrol,SUP.mcp]},

  {id:"ovarian",dk_key:"ovarian",name:"Æggestokkræft",nameEn:"Ovarian Cancer",icd10:"C56",icon:"🟠",dk:"~600/år",fy:"~47%",organ:"Æggestokke",
   desc:"Æggestokkræft er en af de sværeste gynækologiske kræftformer da symptomerne er vage. Ca. 75% opdages i stadie III–IV. PARP-hæmmere har ændret prognosen markant for BRCA-positive patienter.",
   sub:["Høj-grad serøs (HGSOC, ca. 70%) — hyppigst, aggressiv, BRCA-mutation hyppig","Lav-grad serøs — langsomt voksende, kemo-resistent","Endometrioid (ca. 10%) — ligner livmoderkræft biologisk","Klarcelle (ca. 10%) — moderat aggressiv"],
   tx:"Primær cytoreduktion (debulking) — kirurgi for at fjerne alt synligt tumorvæv. Karboplatin plus paclitaxel kemoterapi i 6 kure. Bevacizumab ved fremskreden sygdom. PARP-hæmmere (olaparib/niraparib) som vedligeholdelsesbehandling ved BRCA+ giver markant forlænget overlevelse.",
   meds:[MED.metformin,MED.statiner,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.hydroxychloroquin,MED.doxycyclin,MED.disulfiram,MED.niclosamid,MED.propranolol,MED.artesunate,MED.losartan,MED.cimetidin],
   sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.melatonin,SUP.omega3,SUP.berberine,SUP.egcg,SUP.quercetin,SUP.sulforafan,SUP.mcp,SUP.vitaminE]},

  {id:"brain",dk_key:"brain",name:"Hjernetumor",nameEn:"Brain Tumor",icd10:"C71",icon:"🧠",dk:"~800/år",fy:"GBM <5%, Grad II ~70%",organ:"Hjerne",
   desc:"Hjernetumorer opdeles i primære (opstår i hjernen selv) og sekundære (metastaser fra kræft andetsteds). Glioblastom (GBM) er den hyppigste og mest aggressive primære hjernetumor.",
   sub:["Glioblastom (GBM, grad IV) — hyppigst og mest aggressiv primær hjernetumor","Astrocytom (grad II–III) — langsommere vækst, IDH-mutation er god prognostisk faktor","Oligodendrogliom — langsom vækst, 1p/19q-kodeletion giver god kemorespons","Hjernemetastaser — spredt fra bryst, lunge, melanom eller nyre"],
   tx:"Maximal sikker kirurgisk fjernelse. GBM: Stupp-protokol — strålebehandling plus temozolomid kemoterapi simultant i 6 uger, herefter temozolomid i 6 måneder. Bevacizumab ved tilbagefald. TTFields (elektrisk felt-enhed) forlænger overlevelse.",
   meds:[MED.metformin,MED.disulfiram,MED.mebendazol,MED.fenbendazol,MED.ivermectin,MED.hydroxychloroquin,MED.itraconazol,MED.dca,MED.artesunate,MED.losartan,MED.celecoxib,MED.doxycyclin],
   sups:[SUP.boswellia,SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.melatonin,SUP.berberine,SUP.omega3,SUP.egcg,SUP.quercetin,SUP.ala,SUP.cbd]},

  {id:"liver",dk_key:"liver",name:"Leverkræft",nameEn:"Liver Cancer (HCC)",icd10:"C22",icon:"🟤",dk:"~500/år",fy:"Tidlig ~40%, Fremskreden <5%",organ:"Lever",
   desc:"Primær leverkræft (HCC) opstår oftest hos mennesker med kronisk leversygdom — skrumpelever pga. hepatitis B/C, alkohol eller fedtlever.",
   sub:["Hepatocellulært karcinom (HCC, ca. 80%) — klassisk leverkræft ved skrumpelever","Kolangiokarcinom (galdeveje, ca. 15%) — aggressiv","Levermetastaser — spredt fra tarm-, bryst- og lungekræft","Fibrolamellær HCC — sjælden, yngre patienter, bedre prognose"],
   tx:"Kurativt potentiale kun ved lokaliseret sygdom: Kirurgisk resektion eller levertransplantation. TACE (transarteriel kemoembolisering). Systemisk: atezolizumab plus bevacizumab er nu standard.",
   meds:[MED.metformin,MED.statiner,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.disulfiram,MED.doxycyclin,MED.hydroxychloroquin,MED.propranolol,MED.niclosamid,MED.artesunate,MED.itraconazol,MED.cimetidin],
   sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.melatonin,SUP.omega3,SUP.quercetin,SUP.sulforafan,SUP.mcp,SUP.ala,SUP.silymarin]},

  {id:"gastric",dk_key:"gastric",name:"Mavekræft",nameEn:"Gastric Cancer",icd10:"C16",icon:"🫙",dk:"~500/år",fy:"Tidlig ~70%, Avanceret <5%",organ:"Mave",
   desc:"Mavekræft opdages ofte sent da symptomerne let forveksles med harmløse maveproblemer. Helicobacter pylori-infektion er den vigtigste risikofaktor.",
   sub:["Intestinal type — ligner tarmkræft, bedre prognose, H. pylori-relateret","Diffus type (signetringsceller) — aggressiv, spreder sig tidligt","HER2-positiv (ca. 15–20%) — reagerer godt på trastuzumab","Gastrisk GIST — gastrointestinal stromaltumor, imatinib-følsom"],
   tx:"Kurativt: Gastrektomi med lymfeknudefjernelse. Perioperativ kemoterapi (FLOT-protokol) er dansk standard. HER2+: trastuzumab tilføjes. Fremskreden sygdom: nivolumab plus kemoterapi.",
   meds:[MED.metformin,MED.aspirin,MED.statiner,MED.cimetidin,MED.mebendazol,MED.ivermectin,MED.fenbendazol,MED.doxycyclin,MED.hydroxychloroquin,MED.disulfiram,MED.propranolol,MED.artesunate,MED.niclosamid],
   sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.melatonin,SUP.omega3,SUP.quercetin,SUP.sulforafan,SUP.probiotika,SUP.mcp,SUP.psk]},
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
    <div style={{background:"#ffffff",border:"1.5px solid "+(o?"#6b5fa8":"#e4dff2"),borderRadius:12,overflow:"hidden",marginBottom:8,transition:"all 0.2s",boxShadow:o?"0 4px 16px rgba(107,95,168,0.1)":"none"}}>
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
  const lvlColor = {"Ekstremt høj":"#c0392b","Meget høj":"#bf360c","Høj":"#e65100","Moderat-høj":"#2e7d32","Moderat":"#1565c0","Lav-moderat":"#4a148c","Lav":"#607d8b"};
  return (
    <div style={{background:"#ffffff",border:"1.5px solid "+(o?"#5b8db8":"#e4dff2"),borderRadius:12,overflow:"hidden",marginBottom:10,boxShadow:o?"0 4px 16px rgba(91,141,184,0.12)":"none"}}>
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
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:8}}>🧪 Biomarkører patienten bør teste</div>
            <div style={{background:"#fff8f3",border:"1px solid #e8c4a0",borderRadius:7,padding:"8px 12px",marginBottom:8,fontSize:12,color:"#7a4a2a"}}>
              💡 Spørg din onkolog om disse tests. <strong>Røde</strong> er kritiske.
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
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:8}}>💊 Off-label specifikt for denne subtype</div>
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
            🏥 Se aktive kliniske studier på ClinicalTrials.gov →
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
        {b.warning && <div style={{background:"#fdf4ed",border:"1px solid #e8c4a0",borderLeft:"4px solid #c4875a",borderRadius:8,padding:"13px 17px",fontSize:12.5,color:"#7a4a2a",lineHeight:1.7}}><strong>Vigtigt:</strong> {b.warning}</div>}
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
    {id:"ov",l:"📋 Din diagnose"},
    {id:"meds",l:"💊 Off-label ("+c.meds.length+")"},
    {id:"sups",l:"🌿 Kosttilskud ("+c.sups.length+")"},
    ...(depthData ? [{id:"depth",l:"🔬 Klinisk dybde"}] : []),
  ];
  return (
    <div style={{animation:"fadeIn 0.3s ease"}}>
      <button onClick={back} style={{display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#8c87a8",cursor:"pointer",padding:"5px 0",marginBottom:18,fontSize:12.5,fontFamily:"inherit"}}>← Tilbage til oversigt</button>
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
            <p style={{color:"rgba(255,255,255,0.55)",fontSize:13.5,lineHeight:1.8,margin:"0 0 16px",maxWidth:540}}>{c.desc}</p>
            <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
              {[["Incidens DK",c.dk],["5-årsoverl.",c.fy],["Off-label",c.meds.length],["Kosttilskud",c.sups.length]].map(([l,v]) => (
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
            <p style={{fontSize:13.5,color:"#3a5878",lineHeight:1.9,margin:0}}>{c.tx}</p>
          </div>
          <div style={{background:"#ffffff",borderRadius:14,padding:"20px 22px",border:"1px solid #e4dff2"}}>
            <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#6b5fa8",marginBottom:14}}>Undertyper og varianter</div>
            {c.sub.map(s => (
              <div key={s} style={{display:"flex",alignItems:"flex-start",gap:11,padding:"9px 0",borderBottom:"1px solid #ede9f6",fontSize:13.5,color:"#5a5370",lineHeight:1.7}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:"#c4b8ea",border:"2px solid #6b5fa8",flexShrink:0,marginTop:6}} />
                <span>{s}</span>
              </div>
            ))}
          </div>
          <div style={{background:"#fdf4ed",border:"1px solid #e8c4a0",borderLeft:"4px solid #c4875a",borderRadius:10,padding:16,display:"flex",gap:12}}>
            <div style={{fontSize:18,flexShrink:0}}>💛</div>
            <div style={{fontSize:12.5,color:"#7a4a2a",lineHeight:1.7}}><strong>Medicinsk ansvarsfraskrivelse:</strong> Information er til faglig reference og erstatter ikke professionel medicinsk rådgivning. Off-label brug bør altid diskuteres med din onkolog.</div>
          </div>
        </div>
      )}
      {tab==="meds" && (
        <div>
          <div style={{background:"#fdf4ed",border:"1px solid #e8c4a0",borderRadius:9,padding:"10px 14px",fontSize:12.5,color:"#7a4a2a",marginBottom:14}}>
            💊 Off-label brug kræver lægelig vurdering. Diskutér med din onkolog. Ord med <span style={{borderBottom:"1.5px dotted #5b8db8",color:"#5b8db8",fontWeight:700}}>blå understregning</span> er forkortelser — klik for forklaring.
          </div>
          {c.meds.map((m,i) => <Card key={i} d={m} isM={true} />)}
        </div>
      )}
      {tab==="sups" && (
        <div>
          <div style={{background:"#eaf5f3",border:"1px solid #a0cfc9",borderRadius:9,padding:"10px 14px",fontSize:12.5,color:"#2a5a54",marginBottom:12}}>
            🌿 Kosttilskud kan interagere med kemoterapi. Diskutér altid med din læge.
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
            🔬 Klik på en subtype for biologisk profil, signalveje, kritiske biomarkører og de mest relevante off-label præparater specifikt for den subtype.
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

export default function Onkolex() {
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
              📚 Protokol-bøger
            </button>
            <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"6px 12px"}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input value={q} onChange={e => { sQ(e.target.value); if(view!=="home") home(); }}
                placeholder="Søg kræfttype…"
                style={{background:"none",border:"none",outline:"none",color:"white",fontSize:12.5,width:150,fontFamily:"inherit"}} />
            </div>
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",display:"flex",gap:14}}>
            <span><span style={{color:"#4a8c84",fontWeight:700}}>{CANCER_DATA.length}</span> typer</span>
            <span><span style={{color:"#c4875a",fontWeight:700}}>{tM}</span> off-label</span>
            <span><span style={{color:"#6b5fa8",fontWeight:700}}>{tS}</span> kosttilskud</span>
          </div>
        </div>
      </header>

      <div style={{background:"#fdf4ed",borderBottom:"1px solid #e8c4a0",padding:"8px 24px"}}>
        <div style={{maxWidth:1380,margin:"0 auto",fontSize:11.5,color:"#7a5a3a",display:"flex",alignItems:"center",gap:8}}>
          <span>💛</span>
          <span><strong>Medicinsk ansvarsfraskrivelse:</strong> Onkolex er til information og vejledning. Indholdet erstatter ikke lægelig rådgivning. Off-label brug kræver lægeordination og onkolog-samtale.</span>
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
                  <div style={{fontSize:10,color:ac&&ac.id===c.id?"rgba(255,255,255,0.4)":"#8c87a8"}}>{c.meds.length+c.sups.length} præparater</div>
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
                <h1 style={{fontSize:28,fontWeight:700,color:"#2a2640",letterSpacing:-0.5,marginBottom:8}}>Bøger der har inspireret off-label bevægelsen</h1>
                <p style={{fontSize:13.5,color:"#5a5370",lineHeight:1.75,maxWidth:580}}>Disse bøger og protokoller har spillet en central rolle i den globale patient-drevne repurposing-bevægelse. Alle præparater markeret med 📖 kan spores til én af disse protokoller.</p>
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
                    Du er ikke alene.<br/>
                    <span style={{color:"#6b5fa8",opacity:0.9}}>Her finder du viden</span> der styrker dig.
                  </h1>
                  <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.8,maxWidth:500,marginBottom:22}}>
                    Onkolex samler evidensbaseret information om kræfttyper, konventionel behandling, repurposed lægemidler og kosttilskud. Alt til dig som vil vide mere og ønsker bedre odds.
                  </p>
                  <button onClick={books}
                    style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(107,95,168,0.15)",border:"1.5px solid #6b5fa8",borderRadius:10,color:"#6b5fa8",padding:"10px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",opacity:0.9}}>
                    📚 Se McLelland, Clark og Tippens protokoller →
                  </button>
                  <div style={{display:"flex",gap:28,marginTop:26,paddingTop:20,borderTop:"1px solid rgba(255,255,255,0.06)"}}>
                    {[[CANCER_DATA.length,"Kræfttyper","#4a8c84"],[tM,"Off-label præparater","#c4875a"],[tS,"Kosttilskud","#6b5fa8"],[BOOKS.length,"Protokol-bøger","#5b8db8"]].map(([n,l,c]) => (
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

