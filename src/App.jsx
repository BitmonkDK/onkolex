import React, { useState } from "react";

const BOOKS = [
  { id:"mclelland", cover:"📕", title:"How to Starve Cancer", subtitle:"…without starving yourself", author:"Jane McLelland", year:2018, isbn:"978-1916009462", amazon:"https://www.amazon.co.uk/How-Starve-Cancer-Without-Feeding/dp/1916009468", website:"https://www.janemc.com", controversy:false,
    summary:"Jane McLelland fik livmoderhalskræft stadium IV i 1999 og overlevede mod alle odds. Da kræften slog tilbage som leukæmi, udviklede hun selv et protokol baseret på repurposed lægemidler der sulter kræftceller ved at blokere alle brændstofkilder simultant. Hun er kræftfri i dag og hendes bog har inspireret tusindvis af patienter globalt.",
    approach:"McLellands Metro Map kortlægger kræftcellernes stofskifteafhængighed og blokerer alle veje på én gang: Glukose via Metformin+DCA. Glutamin via Mebendazol+Doxycyclin. Fedt via Statiner. Autopagi via Hydroxychloroquin. Inflammation via Aspirin+Celecoxib+Curcumin. Immunsuppression via Cimetidin+LDN. Metastase via Dipyridamol+Propranolol.",
    keyDrugs:["Metformin","Mebendazol","Doxycyclin","Statiner","Hydroxychloroquin","Cimetidin","Dipyridamol","Aspirin","DCA","LDN","Alpha-liponsyre","Celecoxib","Propranolol"],
    warning:"McLelland understreger at protokollen er adjuvant — tillæg til konventionel behandling. Bør implementeres i samråd med onkolog åben for repurposing. Interaktioner med kemoterapi skal vurderes individuelt.",
    hasMetroMap: true },
  { id:"clark", cover:"📗", title:"The Cure for All Cancers", subtitle:"Including over 100 Case Histories", author:"Hulda Regehr Clark, Ph.D.", year:1993, isbn:"978-0963632807", amazon:"https://www.amazon.com/Cure-All-Cancers-Hulda-Clark/dp/1890035017", controversy:true,
    summary:"Hulda Clark (1928-2009) hævdede at kræft skyldes parasitter kombineret med miljøgifte. Hendes protokol er kontroversiel og teorien er ikke videnskabeligt valideret. To af komponenterne — artemisinin og juglone — har dog selvstændig legitim forskning bag sig.",
    approach:"Tre-komponent parasitrensning: (1) Sort valnødskalleolie — juglone har dokumenteret anti-tumor aktivitet in vitro. (2) Wormwood/Malurt — artemisinin-relaterede stoffer med anti-kræft aktivitet. (3) Nellike — eugenol hæmmer COX-2 og inducerer apoptose in vitro.",
    keyDrugs:["Artemisinin/Wormwood","Sort Valnødskalle (juglone)","Nellike (eugenol)"],
    warning:"Clarks parasit-teori er ikke videnskabeligt valideret. Bogen bør ALDRIG erstatte konventionel behandling. Artemisinin-forskningen er selvstændig og solidt funderet." },
  { id:"tippens", cover:"📘", title:"My Cancer Story Rocks", subtitle:"Fenbendazol-protokollen", author:"Joe Tippens (blog)", year:2019, website:"https://www.mycancerstory.rocks", amazon:"https://www.amazon.com/s?k=joe+tippens+fenbendazole", controversy:false,
    summary:"Joe Tippens fik småcellet lungekræft stadium IV i 2016 med 3 måneders forventet levetid. En bekendt anbefalede Fenbendazol — et veterinært ormemiddel til hunde. Kombineret med kosttilskud opnåede han komplet remission dokumenteret ved scanninger.",
    approach:"Fenbendazol 222 mg (1 pose Panacur C) x 3 dage PÅ, 4 dage PAUSE (cyklisk). Kombineret med: Vitamin E succinat 800 mg/dag (IKKE standard alfa-tocopherol), Curcumin 600 mg/dag, CBD olie sublingualt.",
    keyDrugs:["Fenbendazol (Panacur)","Vitamin E Succinat","Curcumin","CBD olie"],
    warning:"Joe Tippens er et enkelt kasuistik og udgør ikke klinisk bevis alene. Sagen har dog udløst legitime kliniske studier og fenbendazol-familien har voksende videnskabelig evidens." },
  { id:"christofferson", cover:"📙", title:"Tripping over the Truth", subtitle:"How the Metabolic Theory of Cancer Is Overturning One of Medicine's Most Entrenched Paradigms", author:"Travis Christofferson", year:2014, isbn:"978-1603587297", amazon:"https://www.amazon.com/Tripping-over-Truth-Overturning-Entrenched/dp/1603587292", controversy:false,
    summary:"Travis Christofferson fortæller historien bag den metaboliske kræftteori — fra Otto Warburgs opdagelse i 1920erne til moderne forskning. En letlæselig og veldokumenteret gennemgang af hvorfor kræft måske primært er en stofskiftesygdom snarere end en genetisk sygdom.",
    approach:"Bogen forklarer Warburg-effekten (kræftcellers afhængighed af glykolyse) og argumenterer for at metaboliske interventioner — ketogen kost, DCA, metformin og faste — kan sulte kræftceller uden at skade normale celler.",
    keyDrugs:["DCA (Dichloroacetat)","Metformin","Ketogen kost","Faste/kalorirestriktion"],
    warning:"Bogen er journalistisk ikke medicinsk. Metaboliske interventioner bør altid koordineres med behandlende onkolog." },
  { id:"winters", cover:"📒", title:"The Metabolic Approach to Cancer", subtitle:"Integrating Deep Nutrition, the Ketogenic Diet, and Nontoxic Bio-Individualized Therapies", author:"Nasha Winters og Jess Higgins Kelley", year:2017, isbn:"978-1603587013", amazon:"https://www.amazon.com/Metabolic-Approach-Cancer-Nontoxic-Bio-Individualized/dp/1603587012", website:"https://www.metabolicterrain.com", controversy:false,
    summary:"Nasha Winters er naturopatisk onkolog der selv overlevede stadie IV æggestokkræft i 1991. Bogen kombinerer metabolisk terapi med epigenetik, kosttilskud og livsstilsfaktorer i en praktisk og konkret protokol. Stor international fanbase blandt patienter og integrativ medicin-praktikere.",
    approach:"Winters' Terrain Ten-model vurderer ti biologiske faktorer der driver kræft: blodsukker/insulin, immunfunktion, inflammation, tarm-mikrobiom, toksinbelastning, hormoner, stress, mitokondriefunktion, angiogenese og genetiske faktorer. Ketogen kost er hjørnestenen kombineret med målrettede kosttilskud.",
    keyDrugs:["Ketogen kost","Metformin","Berberine","Curcumin","Artemisinin","Melatonin (højdosis)","Vitamin D3","Boswellia"],
    warning:"Ketogen kost under kemoterapi kræver tæt lægelig opfølgning." },
  { id:"seyfried", cover:"📓", title:"Cancer as a Metabolic Disease", subtitle:"On the Origin, Management, and Prevention of Cancer", author:"Thomas N. Seyfried", year:2012, isbn:"978-0470584927", amazon:"https://www.amazon.com/Cancer-Metabolic-Disease-Management-Prevention/dp/0470584920", controversy:false,
    summary:"Thomas Seyfried er professor i biologi ved Boston College og den akademiske grundpille bag den metaboliske kræftteori. Bogen er den videnskabelige referencebog der dokumenterer at kræft primært er en mitokondrie-stofskiftesygdom. Tungere akademisk læsning men den mest autoritative kilde.",
    approach:"Seyfrieds Press-Pulse strategi: vedvarende metabolisk stress (Press) via ketogen kost + kalorirestriktion + metformin kombineret med periodiske terapeutiske pulser (Pulse) via DCA og andre metaboliske angribere.",
    keyDrugs:["Ketogen kost + kalorirestriktion","DCA (Dichloroacetat)","Metformin","Hyperbars ilt (HBO)","Glutamin-blokade"],
    warning:"Akademisk referencebog — ikke beregnet som selvbehandlingsguide. Press-Pulse protokollen kræver lægelig supervision." },
  { id:"servanschreiber", cover:"📔", title:"Anticancer: A New Way of Life", subtitle:"", author:"David Servan-Schreiber", year:2007, amazon:"https://www.amazon.com/Anticancer-New-Way-Life/dp/0670021644", controversy:false,
    summary:"David Servan-Schreiber var fransk hjerneforsker og psykiater der selv fik hjernetumor. Bogen om hans personlige rejse og forskning i livsstilsfaktorer er solgt i over 3 millioner eksemplarer på 35 sprog. Letlæselig og varmt personlig.",
    approach:"Fokus på fire livsområder: Anti-kræft kost (omega-3, grøn te, gurkemeje, broccoli, granatæble), reduktion af stress, regelmæssig motion, og eliminering af miljøgifte.",
    keyDrugs:["Omega-3 (EPA/DHA)","Grøn te (EGCG)","Curcumin/Gurkemeje","Sulforafan (broccoli)","Granatæble","Melatonin"],
    warning:"Bogen er primært om livsstil og kost som adjuvant støtte — udelukkende supplerende til konventionel behandling." },
  { id:"fung", cover:"📃", title:"The Cancer Code", subtitle:"A Revolutionary New Understanding of a Medical Mystery", author:"Jason Fung", year:2020, isbn:"978-0062894007", amazon:"https://www.amazon.com/Cancer-Code-Revolutionary-Understanding-Medical/dp/0062894005", controversy:false,
    summary:"Jason Fung er canadisk nefrolog og bestseller-forfatter der her anvender samme systemtænkning på kræft. Bogen er en af de mest letlæselige gennemgange af kræft som metabolisk sygdom — perfekt for patienter der vil forstå den biologiske baggrund.",
    approach:"Fung argumenterer for at kræft bedst forstås som et problem med cellesignalering og stofskifte. Faste, insulinreduktion og ketogen kost er centrale strategier.",
    keyDrugs:["Intermitterende faste","Ketogen kost","Metformin","Insulinreduktion (lav-kulhydrat kost)"],
    warning:"Fastekure under aktiv kræftbehandling kræver lægelig godkendelse." },
];

const METRO_LINES = [
  {
    id:"glucose", label:"Glukose-pathway", color:"#e06060", bg:"#fdf2f2",
    desc:"Kræftceller er afhængige af glukose (sukker) som primær energikilde — den såkaldte Warburg-effekt. Disse præparater blokerer kræftcellernes adgang til glukose.",
    drugs:[
      {name:"Metformin", note:"Blokerer mitokondrie-komplex I og GLUT-transportere. Hjørnestenen i McLellands protokol.", studies:"37261084,32860850"},
      {name:"DCA", note:"Reverter Warburg-effekten: tvinger kræftceller fra glykolyse tilbage til normal mitokondrieforbinding.", studies:"17051984,21383728"},
    ]
  },
  {
    id:"glutamine", label:"Glutamin-pathway", color:"#7b6fa0", bg:"#f0edf8",
    desc:"Glutamin er kræftcellernes sekundære brændstof. Disse præparater blokerer glutamin-optagelse og -forbrænding.",
    drugs:[
      {name:"Mebendazol", note:"Ormemiddel med identisk tubulin-mekanisme som taxaner. Blokerer glutamin-pathway.", studies:"31886060,25541231"},
      {name:"Fenbendazol", note:"Kemisk søster til mebendazol. Aktiverer p53 tumor-suppressor muteret i ca. 50% af alle kræfttyper.", studies:"29097407,33602073"},
      {name:"Doxycyclin", note:"Antibiotikum der slukker mitokondrie-kraftværket i kræftceller. Særlig potent mod cancer stem cells.", studies:"28034920,31485045"},
    ]
  },
  {
    id:"fat", label:"Fedt-pathway", color:"#b8904a", bg:"#fdf6e8",
    desc:"Kræftceller kan syntetisere og forbrænde fedt som alternativt brændstof. Statiner blokerer kolesterol- og lipidproduktionen.",
    drugs:[
      {name:"Statiner", note:"Lipofil statin (simvastatin/lovastatin) foretrækkes. Tages om aftenen. Blokerer kræftcellernes tredje brændstofkilde.", studies:"28456308,30213800"},
      {name:"Itraconazol", note:"Svampemiddel med anti-angiogen effekt via VEGFR2/AKT/mTOR-hæmning og Hedgehog-pathway.", studies:"24218511,28034920"},
    ]
  },
  {
    id:"autophagy", label:"Autopagi-flugt", color:"#4a8c84", bg:"#eaf5f3",
    desc:"Autopagi er kræftcellernes nødudgang — de æder sig selv for at overleve stress fra kemoterapi. Disse præparater blokerer denne flugtmekanisme.",
    drugs:[
      {name:"Hydroxychloroquin", note:"Malariamiddel. Alkaliserer lysosomer og blokerer autopagi-processen. Særlig vigtig ved bugspytkirtelkræft.", studies:"30337160,31886060"},
      {name:"Klorokin", note:"Stærkere version af HCQ med mere potent autopagi-hæmning. Højere toksicitetsprofil — kræver tæt monitorering.", studies:"30337160,17051984"},
    ]
  },
  {
    id:"inflammation", label:"Inflammation", color:"#5a8a6e", bg:"#eef6f1",
    desc:"Kronisk inflammation er kræftcellernes vækstmiljø. Disse præparater reducerer inflammationen der fremmer kræftvækst og spredning.",
    drugs:[
      {name:"Aspirin", note:"Reducerer inflammation og hæmmer blodpladerne der hjælper tumorceller med at metastasere.", studies:"28830014,23680940"},
      {name:"Celecoxib", note:"Selektiv COX-2-hæmmer. Kraftigere end aspirin. FDA-godkendt til FAP.", studies:"12750098,28830014"},
      {name:"Curcumin", note:"Naturlig NF-kB og COX-2 hæmmer. Tag med piperin eller som liposomal form for optimal biotilgængelighed.", studies:""},
    ]
  },
  {
    id:"immune", label:"Immunsuppression", color:"#5b8db8", bg:"#eef4fb",
    desc:"Kræftceller undertrykker aktivt immunforsvaret for at skjule sig. Disse præparater reaktiverer immunsystemets evne til at genkende og angribe kræftceller.",
    drugs:[
      {name:"Cimetidin", note:"Gammel mavesyremedicin med usædvanlig anti-metastase-effekt. Blokerer kræftcellers HSPG-adhesionsmolekyler og aktiverer NK-celler.", studies:"15481946,1493299"},
      {name:"LDN", note:"Naltrexon lav dosis (1,5-4,5 mg). Tages til natten. Stimulerer immunsystemet via OGF-pathway. ALDRIG kombiner med opioider.", studies:"28935922,20150494"},
    ]
  },
  {
    id:"metastasis", label:"Metastase", color:"#c47858", bg:"#fdf0eb",
    desc:"Metastase kræver at kræftcellerne løsriver sig, overlever i blodbanen og hæfter sig til nye steder. Disse præparater forstyrrer denne proces.",
    drugs:[
      {name:"Dipyridamol", note:"Blodfortyndende middel. Adenosin-boost hæmmer tumorcelles vækst og invasivitet. Hæmmer blodpladeaggregering der assisterer metastase.", studies:"28458121,2144290"},
      {name:"Propranolol", note:"Betablokker. Blokerer adrenalin/noradrenalins aktivering af beta-receptorer på kræftceller der fremmer metastase.", studies:"27062194,29320737"},
    ]
  },
];

const MetroMap = () => {
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
      <div style={{background:"#2e2a4a",borderRadius:14,padding:"16px",marginBottom:10}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
          {METRO_LINES.map(line => (
            <button key={line.id} onClick={() => setOpen(open===line.id?null:line.id)}
              style={{background:open===line.id?line.bg:"rgba(255,255,255,0.06)",border:"1.5px solid "+(open===line.id?line.color+"80":"rgba(255,255,255,0.1)"),borderRadius:10,padding:"10px 13px",cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.2s"}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:11,height:11,borderRadius:"50%",background:line.color,flexShrink:0}} />
                <span style={{fontSize:12,fontWeight:600,color:open===line.id?line.color:"rgba(255,255,255,0.85)"}}> {line.label}</span>
                <span style={{marginLeft:"auto",fontSize:10,color:open===line.id?line.color:"rgba(255,255,255,0.4)"}}>{line.drugs.length} {open===line.id?"▲":"▼"}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {open && (() => {
        const line = METRO_LINES.find(l => l.id === open);
        return (
          <div style={{background:line.bg,border:"1.5px solid "+line.color+"50",borderLeft:"4px solid "+line.color,borderRadius:12,padding:"16px 18px",marginBottom:10}}>
            <div style={{fontSize:13,color:"#5a5370",lineHeight:1.75,marginBottom:14}}> {line.desc}</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {line.drugs.map((drug, i) => (
                <div key={i} style={{background:"white",borderRadius:9,padding:"12px 15px",border:"1px solid "+line.color+"25",display:"flex",gap:10,alignItems:"flex-start"}}>
                  <div style={{width:8,height:8,borderRadius:"50%",background:line.color,flexShrink:0,marginTop:5}} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,color:"#2a2640",marginBottom:3}}> {drug.name}</div>
                    <div style={{fontSize:12,color:"#5a5370",lineHeight:1.65}}>{drug.note}</div>
                    {drug.studies && (
                      <div style={{display:"flex",gap:4,marginTop:6,flexWrap:"wrap"}}>
                        {drug.studies.split(",").map(p => (
                          <a key={p} href={"https://pubmed.ncbi.nlm.nih.gov/"+p.trim()+"/"} target="_blank" rel="noopener"
                            style={{fontSize:10,color:"#5b8db8",background:"#eef4fb",padding:"1px 6px",borderRadius:4,textDecoration:"none",border:"1px solid #b8d0e8"}}> {p.trim()} ↗</a>
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
        Princippet bag Metro Map: Kræftceller kan skifte brændstofkilde hvis én vej blokeres. McLellands strategi er at blokere ALLE veje simultant — kombinationseffekten er det centrale, ikke de enkelte præparater alene.
      </div>
    </div>
  );
};

const MED = {
  metformin:{name:"Metformin",type:"off-label",mechanism:"AMPK-aktivering, mTOR-hæmning, Warburg-effekt-interferens, GLUT-transporter-reduktion, insulin/IGF-1 reduktion, mitokondrie-komplex I-hæmning",dose:"500-2000 mg/dag fordelt på 2 doser med mad",studies:"37261084,32860850,31243680",src:["mclelland"],note:"Diabetesmedicin og hjørnesten i McLellands Metro Map som glukose-blokker. Diabetikere på metformin har signifikant lavere kræftdødelighed på tværs af næsten alle kræfttyper. Billig og veltolereret. Start lavt (500 mg) for at undgå mave-tarm bivirkninger."},
  mebendazol:{name:"Mebendazol",type:"off-label",mechanism:"Tubulin-polymerisationshæmning (identisk binding som vincristin/taxaner), BCL-2 reduktion, VEGFR2 reduktion (anti-angiogen), Hedgehog reduktion, GLUT1 reduktion",dose:"100-200 mg 2-3x/dag — SKAL tages med fedtholdigt måltid (biotilgængelighed øges 5-10x)",studies:"31886060,25541231,29451387,23281930",src:["mclelland","tippens"],note:"Ormemiddel med identisk tubulin-mekanisme som kemo-standarder vinca-alkaloider og taxaner. KRITISK: Tag ALTID med fedtholdigt måltid — biotilgængelighed er 5-10x bedre. Del af Care Oncology METRICS-protokol (UK)."},
  fenbendazol:{name:"Fenbendazol (Panacur)",type:"off-label",mechanism:"Tubulin-polymerisationshæmning (benzimidazol-klasse), p53-tumor-suppressor-aktivering, GLUT-transporter-reduktion, mitokondrie-apoptose",dose:"222 mg/dag (1 pose Panacur C hundepulver) x 3 dage PÅ + 4 dage PAUSE. Cyklisk.",studies:"29097407,33602073",src:["tippens"],note:"Veterinært ormemiddel — Joe Tippens protokollen. Kemisk søstermolekyle til mebendazol. Aktiverer p53 tumor-suppressor der er muteret i ca. 50 pct. af alle kræfttyper."},
  ivermectin:{name:"Ivermectin",type:"off-label",mechanism:"PAK1-hæmning (melanom, bryst, prostata), YAP/TAZ Hippo-pathway reduktion, WNT-beta-catenin reduktion, P-glycoprotein reduktion (MDR-revertering), mitokondrie-dysfunktion i tumorceller",dose:"0,2-0,6 mg/kg/dag. Tag med fedtholdigt måltid.",studies:"32533918,34665993,34091518,30654924,28974414",src:["mclelland","tippens"],note:"Antiparasitikum med bredt anti-kræft aktivitetsspektrum. Jane McLelland betragter det som et naturligt supplement til sin Metro Map-protokol. Hæmmer P-glycoprotein og kan modvirke kemo-resistens. Tag altid med fedtholdigt måltid."},
  doxycyclin:{name:"Doxycyclin",type:"off-label",mechanism:"Mitokondrie-ribosomhæmning (selektiv i kræftceller), MMP-2/9 reduktion (anti-metastatisk), cancer stem cell reduktion, anti-angiogen, anti-inflammatorisk",dose:"100-200 mg/dag (1-2x daglig med mad). Cyklisk brug anbefales.",studies:"28034920,31485045,29736988",src:["mclelland"],note:"Antibiotikum. McLelland: slukker kraftværket i kræftceller. Særlig potent mod cancer stem cells der driver recidiv. Fotosensitivitet — undgå intens sol."},
  statiner:{name:"Statiner (lipofil: Simvastatin/Lovastatin)",type:"off-label",mechanism:"HMG-CoA-reduktase hæmning, mevalonat-pathway hæmning, kolesterol/lipid-syntese hæmning, Rho/Ras-protein-geranylgeranylering hæmning, anti-proliferativ, pro-apoptotisk",dose:"40-80 mg/dag. Tages om AFTENEN. CoQ10 tilskud anbefales ved langvarig brug.",studies:"28456308,30213800,31437826",src:["mclelland"],note:"McLelland: blokerer fedt/kolesterol som kræftcellers tredje brændstofkilde. Lipofil statin (simvastatin, lovastatin) foretrækkes — bedre tumorpenetration. TAGES OM AFTENEN."},
  hydroxychloroquin:{name:"Hydroxychloroquin (HCQ)",type:"off-label",mechanism:"Autopagi-hæmning via lysosom-alkalisering, immunmodulering, anti-inflammatorisk",dose:"400-600 mg/dag. Kræver regelmæssig øjenundersøgelse ved langvarig brug.",studies:"30337160,31886060",src:["mclelland"],note:"Malariamiddel. McLelland: blokerer kræftcellernes autopagi-nødudgang ved kemoterapi-stress. Bugspytkirtelkræft er særligt autopagi-afhængig. Kræver øjenundersøgelse ved langvarig brug (retinopati-risiko)."},
  aspirin:{name:"Aspirin (lav dosis)",type:"off-label",mechanism:"COX-1/COX-2 hæmning, prostaglandin E2 reduktion, thromboxan A2 reduktion (anti-platelet, anti-metastatisk), NF-kB hæmning, anti-inflammatorisk",dose:"75-300 mg/dag (enterocoated tablet beskytter maveslimhinde)",studies:"28830014,23680940,15481946",src:["mclelland"],note:"McLelland-central: reducerer inflammation og hæmmer blodpladerne der hjælper tumorceller med at metastasere. Add-ASPIRIN fase III studie igangværende. Forsigtig ved mavesår og blødningstendens."},
  cimetidin:{name:"Cimetidin (Tagamet)",type:"off-label",mechanism:"H2-receptor-antagonisme, HSPG-hæmning (blokerer tumorcellers adhesion til blodkar-endotel), NK-celle-aktivering, histamin-modulering",dose:"400-800 mg/dag (fordelt 2x daglig)",studies:"15481946,1493299,8529464",src:["mclelland"],note:"Gammel billig mavesyremedicin med usædvanlig anti-metastase-effekt. Blokerer kræftcellers adhesionsmolekyler brugt til at hæfte sig til blodkar. NK-celle-aktivering. Kliniske studier ved kolorektal og mavekræft viser overlevelsesgevinst."},
  dipyridamol:{name:"Dipyridamol (Persantin)",type:"off-label",mechanism:"PDE hæmning, cAMP/cGMP stigning, adenosin-boost (anti-proliferativ, anti-metastatisk), anti-platelet, VEGF hæmning",dose:"200-400 mg retard-form/dag",studies:"28458121,2144290",src:["mclelland"],note:"Blodfortyndende middel. McLelland: adenosin-boost hæmmer tumorcelles vækst og invasivitet. Hæmmer blodpladeaggregering der hjælper tumorceller under metastase. Billig og veltolereret."},
  propranolol:{name:"Propranolol",type:"off-label",mechanism:"Beta-adrenerg-blokade, adrenalin/noradrenalin reduktion på tumorceller, VEGF reduktion (anti-angiogen), NK-celle-aktivering, EMT hæmning",dose:"40-80 mg/dag (ikke-selektiv beta-blokker). Reducer langsomt ved seponering.",studies:"27062194,29320737,30936136",src:["mclelland"],note:"Betablokker. Stresshormonerne adrenalin/noradrenalin aktiverer beta-receptorer på kræftceller og fremmer vækst og metastase. Retrospektive studier: overlevelsesgevinst ved melanom, bryst og bugspytkirtelkræft."},
  dca:{name:"DCA (Dichloroacetat)",type:"off-label",mechanism:"PDK1 hæmning, pyruvat-dehydrogenase-aktivering, Warburg-effekt-revertering, mitokondrie-apoptose-genaktivering i kræftceller",dose:"10-25 mg/kg/dag cyklisk (5 dage PÅ, 2 dage PAUSE). Plus B1-vitamin 100 mg/dag.",studies:"17051984,21383728",src:["mclelland"],note:"Industrielt kemikalie. University of Alberta-forskning. Reverter Warburg-effekten. RISIKO: Perifer neuropati ved høje doser — B1-thiamin 100 mg/dag anbefales. Importeres — fås ikke på dansk recept."},
  ldn:{name:"Naltrexon lav dosis (LDN)",type:"off-label",mechanism:"OGF/OGFr-pathway-modulering, endorfin-boost (nattigt rebound), TLR4-modulering, immunregulering",dose:"1,5-4,5 mg til natten kl. 22-24 (start 1,5 mg, øg gradvist over 3-4 uger)",studies:"28935922,20150494,33170578",src:["mclelland"],note:"McLelland: immunstimulering via OGF-pathway. Tages til natten for naturligt endorfin-boost. KRITISK: ALDRIG kombiner med opioide smertestillende."},
  celecoxib:{name:"Celecoxib",type:"off-label",mechanism:"Selektiv COX-2 hæmning, prostaglandin E2 reduktion, apoptose-induktion, anti-angiogen",dose:"400 mg 2x/dag",studies:"12750098,28830014",src:["mclelland"],note:"FDA-godkendt til FAP (familiær adenomatøs polypose). McLelland: kraftigere COX-2-variant end Aspirin. Forsigtig ved hjerte-kar-sygdom ved langvarig brug."},
  itraconazol:{name:"Itraconazol",type:"off-label",mechanism:"Anti-angiogen (VEGFR2/AKT/mTOR hæmning), Hedgehog-pathway hæmning, P-glycoprotein hæmning (MDR-revertering)",dose:"200-600 mg/dag med fedtholdigt måltid. Tjek CYP3A4-interaktioner.",studies:"24218511,28034920",src:[],note:"Svampemiddel med potent anti-angiogen effekt. Fase II ved NSCLC viste øget PFS. Interagerer med mange lægemidler via CYP3A4."},
  disulfiram:{name:"Disulfiram + Kobber (Antabuse)",type:"off-label",mechanism:"ALDH hæmning (cancer stem cells), dithiocarbamat-kobber-kompleks (NF-kB hæmning via IKK, proteasom hæmning), selektiv ROS i kræftceller",dose:"250-500 mg/dag + kobber 2 mg/dag. ABSOLUT ALKOHOL-ABSTINENS — inkl. i mad og mundskyl.",studies:"30936136,28743521,31437826",src:["mclelland"],note:"Alkohol-afvænning der med kobber danner selektivt cytotoksisk kompleks. Fase II studier ved glioblastom og levermetastaser. KRITISK: selv minimal alkohol giver voldsom reaktion."},
  niclosamid:{name:"Niclosamid",type:"off-label",mechanism:"STAT3 hæmning, WNT-beta-catenin hæmning, mTORC1 hæmning, Notch hæmning, mitokondrie-uncoupling, cancer stem cell hæmning",dose:"1000-2000 mg/dag (lav oral biotilgængelighed er udfordring)",studies:"32499290,27338789,29451387",src:[],note:"Tænia-ormemiddel med bredt anti-kræft spektrum. Lav oral biotilgængelighed (~10-15%) er den store kliniske udfordring. Fase I/II studier ved prostata og tarmkræft."},
  rapamycin:{name:"Rapamycin (Sirolimus)",type:"off-label",mechanism:"mTORC1-direkte og potent hæmning, autopagi-induktion, anti-angiogen (VEGF reduktion), immunmodulering",dose:"0,5-5 mg/uge pulsvis (undgår immunsuppression fra daglig dosering)",studies:"28591555,31886060",src:[],note:"Godkendt til organtransplantation og nyrekræft. Daglig dosering giver immunsuppression. Pulsvis (1x/uge) bruges i off-label protokoller."},
  valproat:{name:"Valproat",type:"off-label",mechanism:"HDAC-hæmning (klasse I/II), epigenetisk gen-reaktivering, tumor-suppressor-re-ekspression, differentiering",dose:"Serumspejl-styret (typisk 500-1500 mg/dag). Monitorér leverfunktion.",studies:"15201358,22496396",src:[],note:"Antiepileptikum med HDAC-hæmmende effekt der reaktiverer epigenetisk slukkede tumor-suppressor-gener. Kombinationsstudier ved AML og hjernetumorer."},
  losartan:{name:"Losartan",type:"off-label",mechanism:"AT1R-blokade, TGF-beta reduktion (anti-fibrotisk), desmoplasi-reduktion (blødgøring af tumor-stroma), forbedret kemo-penetration",dose:"50-100 mg/dag",studies:"28416612,31486401",src:[],note:"Blodtryksmedicin. Reducerer det stive stroma der omgiver tumorer og blokerer kemo-adgang. Særlig relevant ved bugspytkirtelkræft."},
  sildenafil:{name:"Sildenafil (Viagra)",type:"off-label",mechanism:"PDE5 hæmning, cGMP stigning, MDSC-reduktion (myeloid immunsuppressor-celler), immuncheckpoint-modulering",dose:"25-50 mg/dag",studies:"28432254,30936136",src:[],note:"Stigende evidens for anti-tumor immuneffekter. Kombinationsstudier med immunterapi igangværende."},
  clarithromycin:{name:"Clarithromycin",type:"off-label",mechanism:"Immunmodulering, NF-kB hæmning, autopagi-hæmning (komplementær til HCQ), anti-inflammatorisk",dose:"500 mg 2x/dag",studies:"22496396,1493299",src:[],note:"Antibiotikum. Japanske studier ved SCLC og myelomatose viser mulig overlevelsesgevinst. Autopagi-hæmning komplementerer HCQ. Husk interaktioner med statiner (myopati-risiko)."},
  artesunate:{name:"Artesunate",type:"off-label",mechanism:"Jern-aktiveret ROS-ferroptose (selektiv i jernrige tumorceller), HIF-1alfa reduktion, anti-angiogen, NF-kB reduktion",dose:"Oralt: 100-200 mg/dag. IV: specialbehandling på integrative onkologi-klinikker.",studies:"28034920,32533918",src:["clark"],note:"Semi-syntetisk artemisinin-derivat med bedre stabilitet. Anti-kræft mekanismen er selvstændig fra Hulda Clarks teori."},
  chloroquin:{name:"Klorokin",type:"off-label",mechanism:"Autopagi-hæmning (stærkere end HCQ), lysosomal disruption, DNA-intercalation, immunmodulering",dose:"250 mg/dag (lavere dosis end HCQ — mere potent og toksisk). Kræver tæt monitorering.",studies:"30337160,17051984",src:[],note:"Malariamiddel stærkere end HCQ men med højere toksicitetsprofil. Kræver tæt monitorering: hjerte-arytmier og øjenproblemer."},
};

const SUP = {
  artemisinin:{name:"Artemisinin (Malurt/Wormwood)",ev:3,mechanism:"Jern-aktiveret ROS-ferroptose (selektiv i jernrige tumorceller), NF-kB reduktion, angiogenesehæmning, apoptose, HIF-1alfa reduktion",dose:"200-400 mg 2x/dag på FASTENDE mave (øger jernoptag i tumorceller)",src:["clark"],note:"Et af de mest intenst forsked-ede naturlægemidler mod kræft. Reagerer med jern i kræftceller og genererer selektivt frie radikaler. Tag på tom mave."},
  sortvalnoedskalle:{name:"Sort Valnødskalle (Black Walnut Hull)",ev:2,mechanism:"Juglone: DNA-topoisomerase hæmning, oxidativt stress selektivt i kræftceller, mitokondrie-apoptose",dose:"Tinktur 20-30 dråber 3x/dag ELLER 500 mg kapsler 3x/dag",src:["clark"],note:"Hulda Clarks første parasitrensningskomponent. Aktivt juglone har præklinisk dokumenteret anti-tumor aktivitet i kræftcellelinjer."},
  malurt:{name:"Wormwood (Artemisia absinthium)",ev:2,mechanism:"Artemisinin-relaterede sesquiterpenlaktoner, absinthin, anti-parasitær og anti-proliferativ",dose:"200-500 mg kapsler 3x/dag",src:["clark"],note:"Hulda Clarks anden komponent. Ikke i store mængder over lang tid — absinthin kan være neurotoksisk i høje doser."},
  nellike:{name:"Nellike (Eugenol)",ev:2,mechanism:"COX-2 hæmning, apoptose via mitokondrie-pathway, anti-parasitær",dose:"500 mg kapsler 3x/dag ELLER 3-5 dråber nellikkeolie",src:["clark"],note:"Hulda Clarks tredje komponent. Eugenol er anti-inflammatorisk og pro-apoptotisk in vitro."},
  curcumin:{name:"Curcumin (liposomal eller med piperin/Bioperine)",ev:2,mechanism:"NF-kB reduktion, COX-2 reduktion, EGFR reduktion, apoptose, angiogenesehæmning, HDAC hæmning, anti-inflammatorisk",dose:"500-1000 mg 3x/dag med piperin (20 mg Bioperine) ELLER liposomal form 200-500 mg/dag",src:["mclelland","tippens"],note:"Et af de mest studerede naturlige anti-kræftforbindelser. Standard curcumin har kun 1 pct. biotilgængelighed — piperin øger 20x. Potentiel interaktion med tamoxifen ved høje doser."},
  vitamind:{name:"Vitamin D3 + K2 MK-7",ev:3,mechanism:"VDR-aktivering, anti-proliferativ, differentiering, immunmodulering, apoptose, anti-angiogen",dose:"2000-5000 IU D3 + 100-200 mikrogram K2 MK-7/dag. Mål P-vit D: 80-150 nmol/L.",src:[],note:"SUNSHINE-studiet ved metastatisk tarmkræft: højdosis D-vitamin forbedrede PFS markant. Tilsæt K2 MK-7 ved doser over 2000 IU."},
  melatonin:{name:"Melatonin (terapeutisk højdosis)",ev:2,mechanism:"Potent antioxidant, NK-celle-aktivering, kemo-sensibilisering, apoptose, VEGF reduktion, anti-østrogenisk",dose:"10-40 mg/aften (terapeutisk dosis — langt over søvn-dosis på 0,5-3 mg)",src:["mclelland"],note:"McLelland bruger melatonin i terapeutisk dosis. Kan reducere bivirkninger af kemoterapi og stråling. Kombiner IKKE med immunterapi (PD-1/PD-L1) uden lægekonsultation."},
  vitaminE:{name:"Vitamin E Succinat (d-alpha-tocopheryl succinate)",ev:2,mechanism:"Selektiv mitokondrie-apoptose i kræftceller — succinat-formen er specifik for denne effekt",dose:"800 mg/dag — SPECIFIKT succinat-form (IKKE standard alfa-tocopherol)",src:["tippens"],note:"Joe Tippens protokol. Pro-apoptotiske egenskaber er unikke for succinat-formen. Specificiteten på formen er kritisk — tjek etiketten."},
  cbd:{name:"CBD (cannabidiol) — fuld-spektrum",ev:2,mechanism:"CB1/CB2-aktivering, apoptose, anti-angiogen, autopagi-modulering, immunmodulering",dose:"Start 10-25 mg/dag sublingualt (60-90 sek). Titrér gradvist op mod 100-200 mg/dag.",src:["tippens"],note:"Joe Tippens protokol. KRITISK: CBD er CYP3A4/CYP2D6-hæmmer — påvirker metabolismen af mange kemoterapier. Tjek interaktioner med onkolog."},
  berberine:{name:"Berberine",ev:2,mechanism:"AMPK-aktivering (som metformin), STAT3 reduktion, tarm-mikrobiom-modulering, P-gp reduktion (MDR-revertering), NF-kB reduktion",dose:"500 mg 2-3x/dag med mad",src:[],note:"Naturlig AMPK-aktivator med mekanisme svarende til metformin. Kinesiske RCT ved tarmkræft viser reduceret adenomrecidiv."},
  omega3:{name:"Omega-3 (EPA/DHA høj-dosis)",ev:2,mechanism:"Prostaglandin E2 reduktion, COX-modulering, ferroptose-sensibilisering, apoptose, anti-inflammatorisk",dose:"2-4 g total EPA+DHA/dag",src:[],note:"Anti-inflammatorisk komplementerer aspirin. Forsigtig med højdosis under kemoterapi."},
  egcg:{name:"Grøn te ekstrakt (EGCG)",ev:2,mechanism:"EGFR reduktion, VEGF reduktion (anti-angiogen), apoptose, HDAC reduktion (epigenetisk), proteasom reduktion",dose:"400-800 mg EGCG/dag (caffein-fri ekstrakt). Tag på tom mave.",src:[],note:"Potentiel interaktion med bortezonib (Velcade) — forsigtig ved myelom."},
  quercetin:{name:"Quercetin",ev:2,mechanism:"PI3K/Akt reduktion, tyrosinkinase reduktion, senolytisk (med Dasatinib), P-gp reduktion (MDR-revertering), apoptose",dose:"500-1000 mg/dag med fedt",src:[],note:"Naturligt flavonoid. Senolytisk kombination Quercetin+Dasatinib undersøges intenst. Hæmmer P-gp og modvirker multiresistens."},
  resveratrol:{name:"Resveratrol (trans-form)",ev:2,mechanism:"SIRT1/3-aktivering, mitokondrie-apoptose, NF-kB reduktion, COX reduktion, CDK-regulering",dose:"500-1000 mg/dag (trans-resveratrol med piperin). 2x/dag opdelt.",src:[],note:"Vælg trans-form med piperin. Synergistisk med curcumin og quercetin."},
  sulforafan:{name:"Sulforafan (broccolispire-ekstrakt)",ev:2,mechanism:"Nrf2-aktivering (beskytter normalt væv), HDAC reduktion (epigenetisk), apoptose, cancer stem cell reduktion",dose:"Broccolispireekstrakt 100-400 mg/dag (vælg produkt med myrosinase)",src:[],note:"1 kop broccolispirer er lig med ca. 400 mg sulforafan. Undgå kogning (ødelægger myrosinase)."},
  ala:{name:"Alpha-Liponsyre (R-ALA)",ev:2,mechanism:"Potent antioxidant (vand- og fedtopløselig), PDK reduktion (DCA-overlap), mitokondrie-støtte, glukose-metabolism",dose:"300-600 mg 2x/dag (R-form er biologisk aktiv)",src:["mclelland"],note:"McLelland: naturlig supplement med DCA-overlap. R-ALA er biologisk aktiv form. Kan sænke blodsukkerniveau — forsigtig ved diabetes."},
  boswellia:{name:"Boswellia Serrata (AKBA)",ev:2,mechanism:"5-LOX reduktion (potent, selektiv), NF-kB reduktion, apoptose, anti-angiogen",dose:"300-500 mg AKBA (acetyl-11-keto-beta-boswellinsyre) 3x/dag",src:[],note:"Israelske kliniske studier. Særlig dokumenteret ved hjernetumorer (reducerer cerebral ødem) og leukæmi."},
  selen:{name:"Selen (selenomethionin)",ev:2,mechanism:"Selenoprotein-syntese, thioredoxin-reductase, antioxidant, apoptose, DNA-reparation, immunmodulering",dose:"100-200 mikrogram/dag. STOP ved over 400 mikrogram/dag — toksisk.",src:[],note:"Vigtig for thyroidea og immunsystem. Supplement KUN ved dokumenteret mangel. Overdosering giver hårtab og neurologiske symptomer."},
  mcp:{name:"Modificeret Citruspektin (MCP)",ev:2,mechanism:"Galectin-3 hæmning (anti-adhesion, anti-metastatisk), MDSC-reduktion, TLR4-aktivering",dose:"15 g/dag (pulver opløst i KOLDT vand — varme ødelægger struktur)",src:[],note:"Galectin-3 er centralt for kræftcellers evne til at metastasere og unddrage sig immunsystemet. God bivirkningsprofil."},
  psk:{name:"PSK / Coriolus (Tyrkehale-svamp)",ev:3,mechanism:"T-celle, NK-celle, dendritisk celle-aktivering, TLR2-agonist, MDSC reduktion",dose:"3 g PSK-standardiseret ekstrakt/dag",src:[],note:"Japansk FDA-godkendt kræft-adjuvant (Krestin). Kliniske studier publiceret i NEJM og Lancet ved mave- og tarmkræft kombineret med kemo. Godt tolereret."},
  astragalus:{name:"Astragalus (Huang Qi)",ev:2,mechanism:"NK-celle, T-celle, makrofag-aktivering, telomerase-aktivering, anti-inflammatorisk",dose:"9-30 g tørret rod/dag eller standardiseret ekstrakt",src:[],note:"Meta-analyser fra kinesiske kliniske studier ved NSCLC viser mulig overlevelsesgevinst kombineret med kemo."},
  lycopin:{name:"Lycopin",ev:2,mechanism:"Antioxidant (karotenoid), IGF-1 reduktion, gap junction-kommunikation, anti-angiogen",dose:"10-30 mg/dag (kogte tomatprodukter — lykopin frigives ved varme og fedt)",src:[],note:"Epidemiologisk dokumenteret ved prostatakræft. Kogte/bearbejdede tomatprodukter er langt bedre end rå tomater."},
  granataeble:{name:"Granatæble Ekstrakt",ev:2,mechanism:"Anti-androgenisk (aromatase reduktion), NF-kB reduktion, VEGF reduktion, urolithin-produktion (mikrobiomet), apoptose",dose:"1000 mg standardiseret ekstrakt/dag ELLER 240 ml 100 pct. juice/dag",src:[],note:"Fase II studier ved prostatakræft: forlænget PSA-fordobblingstid. Urolithiner dannet af tarm-mikrobiomet er anti-proliferative."},
  probiotika:{name:"Probiotika (multi-stamme, høj CFU)",ev:2,mechanism:"Mikrobiom-modulering, immunregulering, tarm-barriere, SCFA-produktion (butyrat), immunterapi-respons-modulering",dose:"Min. 50 mia. CFU multi-stamme produkt. Lactobacillus + Bifidobacterium stammer.",src:[],note:"Mikrobiomet påvirker effekten af PD-1/PD-L1-immunterapi markant. Akkermansia muciniphila korrelerer med bedre immunterapi-respons."},
  silymarin:{name:"Silymarin (Marietidsel/Milk Thistle)",ev:2,mechanism:"Hepatoprotektiv, NF-kB hæmning, anti-proliferativ ved HCC, antioxidant, anti-fibrotisk",dose:"140-420 mg/dag standardiseret ekstrakt (70-80 pct. silymarin). Del i 3 doser.",src:[],note:"Beskytter leveren under kemoterapi. Silibinin har præklinisk anti-tumor aktivitet ved HCC. Særlig relevant ved leverkræft."},
};

const CANCER_DATA = [
  {id:"breast",name:"Brystkræft",nameEn:"Breast Cancer",icd10:"C50",icon:"🎗️",dk:"~5.000/år",fy:"87%",organ:"Bryst",desc:"Brystkræft opstår når celler i brystvævet begynder at vokse ukontrolleret. Det er den hyppigste kræftform hos kvinder med ca. 5.000 nye tilfælde om året. Prognosen er god ved tidlig opdagelse. Kræftcellernes receptorer fungerer som nøgler der bestemmer hvilken medicin der virker bedst.",sub:["Luminalt A — hormonfølsom (ER+/PR+), langsom vækst og bedste prognose","Luminalt B — hormonfølsom og HER2+","HER2-overeksprimeret — vokser hurtigt men reagerer godt på Herceptin","Triple-negativ (TNBC) — ingen receptorer, kræver kemoterapi, kan kureres"],tx:"Kirurgi er typisk første skridt — fjernelse af knuden (brystbevarende) eller hele brystet, fulgt af strålebehandling. Hormonfølsom kræft (ER+) behandles med daglige hormontabletter i 5-10 år (tamoxifen eller aromatasehæmmere). HER2+ behandles med Herceptin-infusioner i et år. Triple-negativ kræft behandles med kemoterapi (AC + taxaner). CDK4/6-hæmmere (palbociclib) gives ved fremskreden hormonfølsom type.",meds:[MED.metformin,MED.aspirin,MED.statiner,MED.doxycyclin,MED.cimetidin,MED.dipyridamol,MED.propranolol,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.disulfiram,MED.ldn,MED.niclosamid,MED.hydroxychloroquin,MED.rapamycin,MED.artesunate],sups:[SUP.curcumin,SUP.vitamind,SUP.omega3,SUP.melatonin,SUP.egcg,SUP.artemisinin,SUP.berberine,SUP.ala,SUP.vitaminE,SUP.quercetin,SUP.mcp,SUP.boswellia,SUP.sulforafan,SUP.resveratrol]},
  {id:"lung",name:"Lungekræft",nameEn:"Lung Cancer",icd10:"C34",icon:"🫁",dk:"~4.800/år",fy:"20%",organ:"Lunge",desc:"Lungekræft er den kræftform der koster flest liv i Danmark. Den opdeles i ikke-småcellet (NSCLC, ca. 85%) og småcellet (SCLC, ca. 15%). Rygning er den vigtigste risikofaktor. Moderne gentesting åbner for målrettede behandlinger i tablet-form.",sub:["NSCLC Adenokarcinom — hyppigst, mutationsscreening vigtig","NSCLC Planocellulært — typisk rygere, central placering","NSCLC Storcellet — aggressiv, sjælden undertype","SCLC Småcellet — meget aggressiv, spreder sig hurtigt"],tx:"Tidlig lungekræft behandles med kirurgi (fjernelse af lungelap). Fremskreden NSCLC: mutationstest er afgørende — EGFR-mutation giver osimertinib-tabletter (Tagrisso), ALK-rearrangement giver alectinib, KRAS G12C giver sotorasib. Uden mutation: immunterapi (pembrolizumab) hvis PD-L1 er positivt, alternativt kemoterapi (carboplatin + taxaner). Småcellet: kemoterapi + stråling.",meds:[MED.metformin,MED.itraconazol,MED.hydroxychloroquin,MED.clarithromycin,MED.doxycyclin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.propranolol,MED.aspirin,MED.cimetidin,MED.disulfiram,MED.niclosamid,MED.dca,MED.artesunate,MED.valproat],sups:[SUP.curcumin,SUP.vitamind,SUP.sulforafan,SUP.astragalus,SUP.artemisinin,SUP.melatonin,SUP.egcg,SUP.berberine,SUP.boswellia,SUP.ala,SUP.omega3,SUP.quercetin,SUP.vitaminE,SUP.cbd]},
  {id:"colorectal",name:"Tarmkræft",nameEn:"Colorectal Cancer",icd10:"C18-C20",icon:"🔴",dk:"~5.000/år",fy:"65%",organ:"Tyktarm/Endetarm",desc:"Tarmkræft opstår i tyktarmen eller endetarmen og er en af de hyppigste kræftformer i Danmark. Mange tilfælde opdages via screeningsprogrammet (afføringsprøve til alle 50-74-årige). MSI-status afgør om immunterapi virker. Off-label evidensen er særlig stærk her.",sub:["Kolon karcinom (C18) — opstår i tyktarmen","Rektal karcinom (C20) — i endetarmen, anderledes behandling pga. beliggenhed","MSI-høj (ca. 15%) — reagerer godt på immunterapi","MSS/MSI-lav (ca. 85%) — immunterapi virker sjældent","FAP — familiær adenomatøs polypose (arvelig form)"],tx:"Kirurgi er hjørnestenen — fjernelse af den ramte tarmsektion. Rektalcancer behandles typisk med stråling og kemoterapi FØR operation. Adjuvant kemoterapi ved stadium III: FOLFOX i 6 måneder. Metastatisk sygdom: FOLFOX eller FOLFIRI plus biologisk medicin. Immunterapi (pembrolizumab) er meget effektiv ved MSI-H kræft.",meds:[MED.aspirin,MED.metformin,MED.celecoxib,MED.statiner,MED.cimetidin,MED.mebendazol,MED.ivermectin,MED.fenbendazol,MED.dipyridamol,MED.doxycyclin,MED.disulfiram,MED.niclosamid,MED.propranolol,MED.hydroxychloroquin,MED.losartan,MED.artesunate,MED.chloroquin],sups:[SUP.curcumin,SUP.vitamind,SUP.berberine,SUP.probiotika,SUP.artemisinin,SUP.egcg,SUP.sulforafan,SUP.melatonin,SUP.mcp,SUP.psk,SUP.quercetin,SUP.omega3,SUP.sortvalnoedskalle,SUP.boswellia,SUP.resveratrol]},
  {id:"prostate",name:"Prostatakræft",nameEn:"Prostate Cancer",icd10:"C61",icon:"🔵",dk:"~5.500/år",fy:"92%",organ:"Prostata",desc:"Prostatakræft er den hyppigste kræftform hos mænd med ca. 5.500 nye tilfælde om året. Mange tilfælde vokser meget langsomt og kræver ikke øjeblikkelig behandling. Kræftcellerne er afhængige af testosteron for at vokse — det udnyttes aktivt i behandlingen.",sub:["Lokaliseret lav-risiko — langsom vækst, aktiv overvågning er often rigtig valg","Lokaliseret høj-risiko — hurtigere vækst, kirurgi eller stråling anbefales","Metastatisk hormonsensitiv (mHSPC) — spredt, reagerer på hormonbehandling","Kastrations-resistent (CRPC) — vokser trods hormonbehandling"],tx:"Lav-risiko: Aktiv overvågning med regelmæssige PSA-målinger og biopsier. Høj-risiko lokaliseret: Radikal prostatektomi eller strålebehandling. Metastatisk: GnRH-agonister/-antagonister der sænker testosteron. Kastrations-resistent: enzalutamid (Xtandi) eller abirateron + prednison. Kemoterapi (docetaxel). PARP-hæmmere ved BRCA-mutation. Lutetium-PSMA radioligandterapi.",meds:[MED.metformin,MED.statiner,MED.itraconazol,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.propranolol,MED.disulfiram,MED.niclosamid,MED.cimetidin,MED.ldn,MED.sildenafil,MED.doxycyclin,MED.artesunate,MED.rapamycin],sups:[SUP.lycopin,SUP.granataeble,SUP.egcg,SUP.vitamind,SUP.selen,SUP.curcumin,SUP.artemisinin,SUP.quercetin,SUP.mcp,SUP.berberine,SUP.melatonin,SUP.boswellia,SUP.resveratrol,SUP.omega3,SUP.sulforafan]},
  {id:"melanoma",name:"Hudkræft (Melanom)",nameEn:"Melanoma",icd10:"C43",icon:"🌑",dk:"~2.200/år",fy:"St.I: 98%, St.IV: 25%",organ:"Hud",desc:"Melanom er den farligste form for hudkræft og opstår fra pigmentcellerne. Tidlig opdagelse er altafgørende. Immunterapi har revolutioneret behandlingen de seneste 10 år. BRAF-mutation (i ca. 50%) åbner for meget effektiv målrettet behandling.",sub:["BRAF V600E (ca. 50%) — mutation der muliggør effektiv kombinations-behandling","NRAS-muteret (ca. 20%) — immunterapi er primært valg","Wild-type — hverken BRAF eller NRAS mutation","Uveal melanom — opstår i øjet, anderledes biologi og behandling"],tx:"Lokaliseret melanom: Kirurgisk fjernelse med sikkerhedsmargin. Fremskreden melanom: Immunterapi er hjørnestenen — pembrolizumab eller nivolumab, eller kombinationen ipilimumab plus nivolumab. BRAF V600E-positiv: BRAF/MEK-hæmmere (dabrafenib plus trametinib) giver hurtige responser.",meds:[MED.metformin,MED.propranolol,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.aspirin,MED.hydroxychloroquin,MED.disulfiram,MED.cimetidin,MED.doxycyclin,MED.niclosamid,MED.artesunate,MED.sildenafil],sups:[SUP.vitamind,SUP.curcumin,SUP.melatonin,SUP.resveratrol,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.quercetin,SUP.ala,SUP.sulforafan,SUP.omega3,SUP.cbd]},
  {id:"bladder",name:"Blærekræft",nameEn:"Bladder Cancer",icd10:"C67",icon:"🫧",dk:"~2.600/år",fy:"Overfladisk >80%, MIBC ~50%",organ:"Urinblære",desc:"Blærekræft opstår i blærens slimhinde og er tæt forbundet med rygning og visse kemikalier. Blod i urinen er det klassiske første symptom. Kræftens dybde ind i blærevæggen er afgørende for behandlingen.",sub:["NMIBC Lav-risiko — overfladisk, lav sandsynlighed for tilbagefald","NMIBC Høj-risiko med CIS — carcinoma in situ, flat aggressiv form","MIBC — kræften vokser ind i muskelvæggen","Metastatisk urotelkarcinom — spredt til andre organer"],tx:"NMIBC: Skopisk fjernelse (TUR-B) af synlig tumor. Efterfølgende BCG-instillationer direkte i blæren aktiverer immunforsvaret mod kræftcellerne. MIBC: Radikal cystektomi (fjernelse af hele blæren) med urinafledning, alternativt blærebevarende stråling plus kemoterapi. Metastatisk: Kemoterapi (gemcitabin + cisplatin), immunterapi (atezolizumab, pembrolizumab).",meds:[MED.metformin,MED.statiner,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.cimetidin,MED.disulfiram,MED.doxycyclin,MED.propranolol,MED.niclosamid,MED.artesunate],sups:[SUP.egcg,SUP.vitamind,SUP.curcumin,SUP.artemisinin,SUP.sulforafan,SUP.berberine,SUP.melatonin,SUP.quercetin,SUP.omega3,SUP.sortvalnoedskalle]},
  {id:"lymphoma",name:"Lymfom",nameEn:"Lymphoma",icd10:"C81-C85",icon:"🟣",dk:"~2.000/år",fy:"Hodgkin 90%, DLBCL 65%",organ:"Lymfesystem",desc:"Lymfom er kræft i lymfesystemet — det netværk af lymfekirtler og -kar der er en vigtig del af immunforsvaret. Det opdeles i Hodgkin og non-Hodgkin lymfom. Hævede lymfeknuder, træthed, nattesvede og uforklaret vægttab er klassiske symptomer.",sub:["Hodgkin lymfom — typisk yngre patienter, helbredes i ca. 90%","DLBCL — diffust storcellet B-celle lymfom, hyppigst non-Hodgkin, aggressiv men kurabel","Follikulært lymfom — langsomt voksende, mange lever normalt med det i årevis","Mantle-celle lymfom — aggressiv, sjælden, typisk midaldrende mænd","T-celle lymfom — sjælden samlegruppe med mange undertyper"],tx:"Hodgkin: ABVD kemoterapi (4-6 kure) med eller uden strålebehandling. DLBCL: R-CHOP protokol (rituximab + kemoterapi, 6 kure) — kurabel i ca. 65%. Follikulær: Watch and wait ved asymptomatisk sygdom, rituximab ved symptomer. Venetoclax (BCL-2 hæmmer) ved tilbagefald. CAR-T cellebehandling og stamcelletransplantation ved tilbagefald.",meds:[MED.metformin,MED.hydroxychloroquin,MED.statiner,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.doxycyclin,MED.clarithromycin,MED.disulfiram,MED.cimetidin,MED.niclosamid,MED.artesunate,MED.valproat],sups:[SUP.curcumin,SUP.vitamind,SUP.melatonin,SUP.artemisinin,SUP.boswellia,SUP.egcg,SUP.psk,SUP.berberine,SUP.resveratrol,SUP.quercetin,SUP.sortvalnoedskalle,SUP.omega3]},
  {id:"leukemia",name:"Leukæmi",nameEn:"Leukemia",icd10:"C91-C95",icon:"🩸",dk:"~1.400/år",fy:"CML >90%, CLL 85%, AML 30%",organ:"Blod/Knoglemarv",desc:"Leukæmi er kræft i blodet og knoglemarven — der produceres for mange unormale blodceller der forstyrrer normal funktion. Der er fire hovedtyper: akut (AML og ALL, opstår hurtigt) og kronisk (CML og CLL, udvikler sig langsomt). Træthed, blødningstendens og hyppige infektioner er typiske symptomer.",sub:["AML — Akut myeloid leukæmi, hyppigst akut form, kræver omgående behandling","ALL — Akut lymfatisk leukæmi, hyppigst hos børn, god prognose","CML — Kronisk myeloid leukæmi (BCR-ABL mutation), næsten kurabel med tabletter","CLL — Kronisk lymfatisk leukæmi, langsom, mange lever normalt i mange år"],tx:"AML: Intensiv kemoterapi (7+3 protokol) fulgt af knoglemarvstransplantation ved høj-risiko. CML: TKI-tabletter dagligt — imatinib (Glivec), nilotinib eller dasatinib. CLL: Ibrutinib (BTK-hæmmer) eller venetoclax plus obinutuzumab. ALL: Protokolbaseret intensiv kemoterapi, CAR-T cellebehandling ved tilbagefald.",meds:[MED.metformin,MED.valproat,MED.hydroxychloroquin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.disulfiram,MED.doxycyclin,MED.niclosamid,MED.rapamycin,MED.clarithromycin,MED.artesunate,MED.chloroquin],sups:[SUP.curcumin,SUP.vitamind,SUP.resveratrol,SUP.artemisinin,SUP.boswellia,SUP.berberine,SUP.egcg,SUP.melatonin,SUP.quercetin,SUP.ala,SUP.sortvalnoedskalle,SUP.sulforafan]},
  {id:"pancreatic",name:"Bugspytkirtelkræft",nameEn:"Pancreatic Cancer",icd10:"C25",icon:"🟡",dk:"~1.000/år",fy:"12%",organ:"Bugspytkirtel",desc:"Bugspytkirtelkræft er en af de alvorligste kræftformer da symptomerne kommer sent og 80% er inoperable ved diagnosen. KRAS-mutation findes i over 90%. Kræften omgives af tæt arvæv der blokerer kemoterapi-adgang. Autopagi-afhængighed gør hydroxychloroquin mekanistisk vigtig.",sub:["Duktalt adenokarcinom (PDAC, over 90%) — den aggressive og hyppigste form","Neuroendokrin tumor (pNET) — vokser langsommere, væsentligt bedre prognose","Acinær celle-karcinom — sjælden undertype","Metastatisk PDAC — spredt til lever eller lunge ved diagnosen"],tx:"Whipple-operation er eneste kurerende behandling — men kun ca. 20% er operable. Kemoterapi: FOLFIRINOX (stærk, kræver god almentilstand) eller gemcitabin plus nab-paclitaxel. Losartan undersøges for at blødgøre arvævet og forbedre kemo-adgang. Immunterapi virker sjældent ved PDAC.",meds:[MED.metformin,MED.hydroxychloroquin,MED.itraconazol,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.propranolol,MED.losartan,MED.disulfiram,MED.doxycyclin,MED.niclosamid,MED.dca,MED.artesunate,MED.chloroquin,MED.celecoxib],sups:[SUP.curcumin,SUP.artemisinin,SUP.quercetin,SUP.vitamind,SUP.melatonin,SUP.sulforafan,SUP.omega3,SUP.boswellia,SUP.berberine,SUP.egcg,SUP.cbd,SUP.vitaminE,SUP.ala]},
  {id:"thyroid",name:"Skjoldbruskkirtalkræft",nameEn:"Thyroid Cancer",icd10:"C73",icon:"🦋",dk:"~800/år",fy:"PTC/FTC >95%, ATC <10%",organ:"Skjoldbruskkirtel",desc:"Kræft i skjoldbruskkirtlen opdages ofte tilfældigt ved ultralyd. Papillær og follikulær type er behandlingsresponsive med fremragende prognose. Medullær type skyldes RET-genmutation og kan være arvelig. LDN (naltrexon lav dosis) har bemærkelsesværdige anekdotiske resultater specifikt her.",sub:["Papillær (PTC, ca. 85%) — langsom vækst, fremragende prognose","Follikulær (FTC, ca. 10%) — god prognose, spreder via blodet","Medullær (MTC, ca. 3%) — RET-mutation, familietest anbefales ved arvelig form","Anaplastisk (ATC, ca. 2%) — ekstremt aggressiv, kræver øjeblikkelig intervention"],tx:"Thyroidektomi (fjernelse af hele skjoldbruskkirtlen) er standardbehandling, efterfulgt af radioaktivt jod (RAI). Livslang levothyroxin-tablet dagligt herefter. RAI-refraktær DTC: lenvatinib (Lenvima) eller sorafenib (Nexavar). Medullær: vandetanib eller cabozantinib. Anaplastisk med BRAF V600E: dabrafenib plus trametinib plus pembrolizumab.",meds:[MED.metformin,MED.aspirin,MED.hydroxychloroquin,MED.ldn,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.artesunate,MED.propranolol,MED.disulfiram,MED.doxycyclin,MED.niclosamid,MED.itraconazol],sups:[SUP.selen,SUP.vitamind,SUP.curcumin,SUP.quercetin,SUP.melatonin,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.boswellia,SUP.sortvalnoedskalle,SUP.nellike,SUP.malurt,SUP.omega3]},
  {id:"kidney",name:"Nyrekræft",nameEn:"Renal Cell Carcinoma",icd10:"C64",icon:"🫘",dk:"~1.000/år",fy:"Lokaliseret 93%, Metastatisk 12%",organ:"Nyre",desc:"Nyrekræft opstår oftest i den ene nyre og opdages i mange tilfælde tilfældigt ved scanning for noget andet. Rygning, overvægt og højt blodtryk øger risikoen. Metastatisk nyrekræft behandles med en ny generation af immunterapi og målrettede medikamenter der har ændret sygdommen til kronisk håndterbar.",sub:["Klarcelle karcinom (ca. 80%) — hyppigst, reagerer godt på immunterapi og TKI","Papillær RCC (ca. 15%) — to undertyper med lidt forskellig biologi","Kromofobt RCC (ca. 5%) — langsom vækst, generelt god prognose","Metastatisk RCC — spredt, behandles som kronisk sygdom med moderne medicin"],tx:"Lokaliseret: Radikal nefrektomi (fjernelse af nyre) eller nyre-bevarende partiel nefrektomi ved mindre tumorer. Metastatisk: Dual immunterapi (nivolumab plus ipilimumab) eller pembrolizumab plus axitinib er nu standard første-linje. TKI (tyrosinkinasehæmmere): sunitinib, pazopanib, kabozantinib som alternativer.",meds:[MED.metformin,MED.statiner,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.hydroxychloroquin,MED.propranolol,MED.aspirin,MED.disulfiram,MED.doxycyclin,MED.rapamycin,MED.itraconazol,MED.niclosamid,MED.artesunate],sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.melatonin,SUP.quercetin,SUP.omega3,SUP.sulforafan,SUP.boswellia,SUP.ala]},
  {id:"uterine",name:"Livmoderkræft",nameEn:"Endometrial Cancer",icd10:"C54",icon:"🔶",dk:"~1.200/år",fy:"~82%",organ:"Livmoder",desc:"Livmoderkræft opstår i livmoderslimhinden og er den hyppigste kræft i de kvindelige kønsorganer. Den opdages typisk tidligt da unormal blødning efter overgangsalderen er et tidligt advarselstegn. Metformin har særlig stærk evidens her da den adresserer sygdommens metaboliske drivkraft.",sub:["Type 1 — Endometrioidt karcinom (ca. 80%), hormonfølsomt, god prognose","Type 2 — Serøst eller klarcelle karcinom, aggressivt, opdages oftest sent","MMR-deficient / MSI-høj (ca. 25-30%) — god kandidat til immunterapi","HER2+ serøst (ca. 20%) — reagerer på trastuzumab","Metastatisk — spredt til lymfeknuder, lunge eller lever"],tx:"Hysterektomi (fjernelse af livmoder plus æggestokke plus nærliggende lymfeknuder) er standardbehandling og helbredende for de fleste. Adjuvant strålebehandling ved høj-risiko stadium I-II. Kemoterapi (carboplatin plus paclitaxel) ved avanceret sygdom. Immunterapi: pembrolizumab ved MSI-H/MMR-deficient type.",meds:[MED.metformin,MED.aspirin,MED.statiner,MED.mebendazol,MED.ivermectin,MED.fenbendazol,MED.propranolol,MED.hydroxychloroquin,MED.cimetidin,MED.doxycyclin,MED.disulfiram,MED.niclosamid,MED.artesunate,MED.ldn],sups:[SUP.curcumin,SUP.vitamind,SUP.berberine,SUP.artemisinin,SUP.melatonin,SUP.egcg,SUP.omega3,SUP.quercetin,SUP.sulforafan,SUP.resveratrol,SUP.mcp]},
  {id:"ovarian",name:"Æggestokkræft",nameEn:"Ovarian Cancer",icd10:"C56",icon:"🟠",dk:"~600/år",fy:"~47%",organ:"Æggestokke",desc:"Æggestokkræft er en af de sværeste gynækologiske kræftformer da symptomerne (oppustethed, mavesmerter, hyppig vandladning) er vage. Ca. 75% opdages i stadie III-IV. PARP-hæmmere har ændret prognosen markant for BRCA-positive patienter.",sub:["Høj-grad serøst (HGSOC, ca. 70%) — hyppigst, aggressiv, BRCA-mutation hyppig","Lav-grad serøst — langsomt voksende, kemo-resistent","Endometrioid (ca. 10%) — ligner livmoderkræft biologisk","Klarcelle (ca. 10%) — moderat aggressiv","Mucinøst — sjælden, ligner tarmkræft biologisk"],tx:"Primær cytoreduktion (debulking) — kirurgi for at fjerne alt synligt tumorvæv er afgørende for prognosen. Karboplatin plus paclitaxel kemoterapi i 6 kure som standard. Bevacizumab (VEGF-hæmmer) tilføjes ved fremskreden sygdom. PARP-hæmmere (olaparib/niraparib) som vedligeholdelsesbehandling ved BRCA+ giver markant forlænget overlevelse.",meds:[MED.metformin,MED.statiner,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.hydroxychloroquin,MED.doxycyclin,MED.disulfiram,MED.niclosamid,MED.propranolol,MED.artesunate,MED.losartan,MED.cimetidin],sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.melatonin,SUP.omega3,SUP.berberine,SUP.egcg,SUP.quercetin,SUP.sulforafan,SUP.mcp,SUP.vitaminE]},
  {id:"brain",name:"Hjernetumor",nameEn:"Brain Tumor",icd10:"C71",icon:"🧠",dk:"~800/år",fy:"GBM <5%, Grad II ~70%",organ:"Hjerne",desc:"Hjernetumorer opdeles i primære (opstår i hjernen selv) og sekundære (metastaser fra kræft andetsteds). Glioblastom (GBM) er den hyppigste og mest aggressive primære hjernetumor. Boswellia har den stærkeste kliniske dokumentation af naturpræparater ved hjernetumorer, bl.a. til reduktion af hjerneødem.",sub:["Glioblastom (GBM, grad IV) — hyppigst og mest aggressiv primær hjernetumor","Astrocytom (grad II-III) — langsommere vækst, IDH-mutation er god prognostisk faktor","Oligodendrogliom — langsom vækst, 1p/19q-kodeletion giver god kemorespons","Meningeom — typisk godartet, opstår i hjernehindens beskyttende lag","Hjernemetastaser — spredt fra bryst, lunge, melanom eller nyre"],tx:"Maximal sikker kirurgisk fjernelse er første skridt — jo mere der fjernes, jo bedre prognosen. GBM: Stupp-protokol — strålebehandling plus temozolomid kemoterapi simultant i 6 uger, herefter temozolomid i 6 måneder. Bevacizumab ved tilbagefald. TTFields (elektrisk felt-enhed på håret, Optune) forlænger overlevelse som tillæg til kemo.",meds:[MED.metformin,MED.disulfiram,MED.valproat,MED.mebendazol,MED.fenbendazol,MED.ivermectin,MED.hydroxychloroquin,MED.itraconazol,MED.dca,MED.artesunate,MED.losartan,MED.chloroquin,MED.celecoxib,MED.doxycyclin],sups:[SUP.boswellia,SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.melatonin,SUP.berberine,SUP.omega3,SUP.egcg,SUP.quercetin,SUP.ala,SUP.cbd]},
  {id:"liver",name:"Leverkræft",nameEn:"Liver Cancer (HCC)",icd10:"C22",icon:"🟤",dk:"~500/år",fy:"Tidlig ~40%, Fremskreden <5%",organ:"Lever",desc:"Primær leverkræft (HCC) opstår oftest hos mennesker med kronisk leversygdom — skrumpelever pga. hepatitis B/C, alkohol eller fedtlever. Regelmæssig halvårlig ultralyd anbefales til alle med skrumpelever. Propranolol (betablokker) har stærk klinisk evidens specifikt ved leverkræft.",sub:["Hepatocellulært karcinom (HCC, ca. 80%) — klassisk leverkræft ved skrumpelever","Kolangiokarcinom (galdeveje, ca. 15%) — aggressiv, i eller udenfor leveren","Levermetastaser — spredt fra tarm-, bryst- og lungekræft","Fibrolamellær HCC — sjælden, yngre patienter uden skrumpelever, bedre prognose"],tx:"Kurativt potentiale kun ved lokaliseret sygdom: Kirurgisk resektion eller levertransplantation (Milan-kriterier). Ablation (RFA — radiofrekvensablation, lokal varmebehandling) ved tumorer under 3 cm. TACE (transarteriel kemoembolisering) — kemo injiceres direkte i leverens blodkar. Systemisk: atezolizumab plus bevacizumab er nu standard. Alternativt sorafenib (Nexavar) eller lenvatinib.",meds:[MED.metformin,MED.statiner,MED.aspirin,MED.ivermectin,MED.mebendazol,MED.fenbendazol,MED.disulfiram,MED.doxycyclin,MED.hydroxychloroquin,MED.propranolol,MED.niclosamid,MED.artesunate,MED.rapamycin,MED.itraconazol,MED.cimetidin],sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.melatonin,SUP.omega3,SUP.quercetin,SUP.sulforafan,SUP.mcp,SUP.ala,SUP.silymarin]},
  {id:"gastric",name:"Mavekræft",nameEn:"Gastric Cancer",icd10:"C16",icon:"🫙",dk:"~500/år",fy:"Tidlig ~70%, Avanceret ~5%",organ:"Mave",desc:"Mavekræft opdages ofte sent da symptomerne let forveksles med harmløse maveproblemer. Helicobacter pylori-infektion er den vigtigste risikofaktor. HER2-positiv mavekræft (ca. 15-20%) reagerer godt på Herceptin. Cimetidin har dokumenteret anti-metastase-effekt specifikt ved mavekræft.",sub:["Intestinal type — ligner tarmkræft, bedre prognose, H. pylori-relateret","Diffus type (signetringsceller) — aggressiv, spreder sig tidligt, ses hos yngre","HER2-positiv (ca. 15-20%) — reagerer godt på trastuzumab","Gastrisk GIST — gastrointestinal stromaltumor, anderledes biologi, imatinib-følsom","Cardia-kræft — i overgangen mave-spiserør"],tx:"Kurativt: Gastrektomi (delvis eller total fjernelse af maven) med lymfeknudefjernelse. Perioperativ kemoterapi (FLOT-protokol: 4 kure FØR og 4 EFTER operation) er dansk standard. HER2+: trastuzumab tilføjes kemoterapi. Fremskreden sygdom: nivolumab plus kemoterapi (ny standard). PSK (Tyrkehale-svamp) er godkendt adjuvant i Japan.",meds:[MED.metformin,MED.aspirin,MED.statiner,MED.cimetidin,MED.mebendazol,MED.ivermectin,MED.fenbendazol,MED.doxycyclin,MED.hydroxychloroquin,MED.disulfiram,MED.propranolol,MED.artesunate,MED.niclosamid,MED.clarithromycin],sups:[SUP.curcumin,SUP.vitamind,SUP.artemisinin,SUP.egcg,SUP.berberine,SUP.melatonin,SUP.omega3,SUP.quercetin,SUP.sulforafan,SUP.probiotika,SUP.mcp,SUP.psk]},
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

const SrcTag = ({s=[]}) => s.length ? (
  <div style={{display:"flex",gap:4,flexWrap:"wrap",marginTop:6}}>
    {s.map(k => { const b = BK[k]; return b ? <span key={k} style={{fontSize:9.5,fontWeight:700,padding:"2px 8px",borderRadius:999,background:b.bg,color:b.c,border:"1px solid "+b.c+"30"}}>📖 {b.l}</span> : null; })}
  </div>
) : null;

const Card = ({d, isM}) => {
  const [o, sO] = useState(false);
  const ev = !isM && d.ev ? EV[d.ev] : null;
  return (
    <div style={{background:"#ffffff",border:"1.5px solid "+(o?"#6b5fa8":"#e4dff2"),borderRadius:12,overflow:"hidden",marginBottom:8,transition:"all 0.2s",boxShadow:o?"0 4px 16px rgba(107,95,168,0.1)":"none"}}>
      <button onClick={() => sO(x => !x)} style={{width:"100%",display:"flex",alignItems:"center",gap:9,padding:"12px 15px",background:o?"#ede9f8":"#ffffff",border:"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left"}}>
        <span style={{fontSize:16,flexShrink:0}}> {isM ? "💊" : "🌿"}</span>
        <span style={{fontSize:13.5,fontWeight:600,color:"#2a2640",flex:1,lineHeight:1.3}}> {d.name}</span>
        <div style={{display:"flex",gap:5,alignItems:"center",flexShrink:0}}>
          {isM && <span style={{fontSize:9,fontWeight:700,color:"#c4875a",background:"#fdf4ed",borderRadius:4,padding:"2px 6px",letterSpacing:0.3,border:"1px solid #e8c4a0"}}>off-label</span>}
          {ev && <span style={{fontSize:10,fontWeight:600,padding:"2px 8px",borderRadius:999,background:ev.bg,color:ev.c,border:"1px solid "+ev.c+"30"}}>{ev.l}</span>}
          {(d.src||d.sources||[]).length > 0 && <span style={{fontSize:10}}>📖</span>}
          <span style={{color:"#8c87a8",fontSize:11}}> {o ? "▲" : "▼"}</span>
        </div>
      </button>
      {o && (
        <div style={{padding:"14px 16px",background:"#fdfcff",borderTop:"1px solid #ede9f6",display:"flex",flexDirection:"column",gap:10}}>
          <div>
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:4}}>Mekanisme</div>
            <div style={{fontSize:12.5,color:"#5a5370",lineHeight:1.7}}> {d.mechanism}</div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
            <div>
              <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:4}}>Dosis (studier)</div>
              <div style={{fontSize:12,color:"#5a5370",lineHeight:1.6}}> {d.dose}</div>
            </div>
            <div>
              <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:4}}>PubMed</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:3}}>
                {d.studies && d.studies.split(",").map(p => p.trim() && (
                  <a key={p} href={"https://pubmed.ncbi.nlm.nih.gov/"+p.trim()+"/"} target="_blank" rel="noopener" style={{fontSize:10,color:"#5b8db8",background:"#eef4fb",padding:"2px 6px",borderRadius:4,textDecoration:"none",border:"1px solid #b8d0e8"}}> {p.trim()} ↗</a>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div style={{fontSize:9,fontWeight:700,textTransform:"uppercase",letterSpacing:1.5,color:"#8c87a8",marginBottom:4}}>Klinisk note</div>
            <div style={{fontSize:12.5,color:"#5a5370",lineHeight:1.75}}> {d.note}</div>
          </div>
          <SrcTag s={d.src||d.sources||[]} />
        </div>
      )}
    </div>
  );
};

const BookCard = ({b}) => (
  <div style={{background:"#ffffff",border:"1.5px solid #e4dff2",borderRadius:16,overflow:"hidden",marginBottom:20,boxShadow:"0 2px 16px rgba(107,95,168,0.08)"}}>
    <div style={{background:"#2e2a4a",padding:"22px 26px",display:"flex",gap:16,alignItems:"flex-start"}}>
      <div style={{fontSize:44}}> {b.cover}</div>
      <div style={{flex:1}}>
        <div style={{display:"flex",gap:7,marginBottom:8,flexWrap:"wrap"}}>
          {b.controversy && <span style={{fontSize:10.5,fontWeight:600,color:"#e8a87c",background:"rgba(232,168,124,0.15)",padding:"2px 10px",borderRadius:999,border:"1px solid rgba(232,168,124,0.3)"}}>Kontroversiel teori</span>}
          {b.isbn && <span style={{fontSize:10.5,color:"rgba(255,255,255,0.35)"}}>ISBN: {b.isbn}</span>}
        </div>
        <h3 style={{fontSize:20,fontWeight:700,color:"white",margin:"0 0 4px",letterSpacing:-0.3}}> {b.title}</h3>
        <div style={{fontSize:12,color:"rgba(255,255,255,0.5)",marginBottom:8}}> {b.subtitle}</div>
        <div style={{fontSize:13,fontWeight:600,color:"#6b5fa8",opacity:0.9}}> {b.author} · {b.year}</div>
      </div>
    </div>
    <div style={{padding:"22px 26px",display:"flex",flexDirection:"column",gap:16}}>
      <div>
        <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#5b8db8",marginBottom:8}}>Om bogen</div>
        <p style={{fontSize:13.5,color:"#5a5370",lineHeight:1.8,margin:0}}> {b.summary}</p>
      </div>
      <div>
        <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#4a8c84",marginBottom:8}}>Tilgang / Protokol</div>
        <p style={{fontSize:13.5,color:"#5a5370",lineHeight:1.8,margin:0}}> {b.approach}</p>
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
        {b.amazon && <a href={b.amazon} target="_blank" rel="noopener" style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:12,fontWeight:600,padding:"8px 16px",borderRadius:8,background:"#fdf6e8",color:"#b8904a",border:"1px solid #e0c88a",textDecoration:"none"}}>Køb på Amazon ↗</a>}
        {b.website && <a href={b.website} target="_blank" rel="noopener" style={{display:"inline-flex",alignItems:"center",gap:5,fontSize:12,fontWeight:600,padding:"8px 16px",borderRadius:8,background:"#eef4fb",color:"#5b8db8",border:"1px solid #b8d0e8",textDecoration:"none"}}>Hjemmeside ↗</a>}
      </div>
    </div>
  </div>
);

const Detail = ({c, back}) => {
  const [tab, sT] = useState("ov");
  return (
    <div style={{animation:"fadeIn 0.3s ease"}}>
      <button onClick={back} style={{display:"inline-flex",alignItems:"center",gap:6,background:"none",border:"none",color:"#8c87a8",cursor:"pointer",padding:"5px 0",marginBottom:18,fontSize:12.5,fontFamily:"inherit"}}>
        ← Tilbage til oversigt
      </button>
      <div style={{background:"#2e2a4a",borderRadius:16,padding:"24px 28px",marginBottom:18,border:"1px solid #5b4f8a30",position:"relative",overflow:"hidden",boxShadow:"0 4px 24px rgba(46,42,74,0.15)"}}>
        <div style={{position:"absolute",top:-30,right:-30,fontSize:120,opacity:0.06,userSelect:"none"}}> {c.icon}</div>
        <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          <div style={{fontSize:40}}> {c.icon}</div>
          <div style={{flex:1}}>
            <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:10,color:"#6b5fa8",fontWeight:700,letterSpacing:2.5,opacity:0.9}}> {c.icd10}</span>
              <span style={{color:"rgba(255,255,255,0.2)"}}>·</span>
              <span style={{fontSize:10.5,color:"rgba(255,255,255,0.45)"}}>{c.nameEn}</span>
            </div>
            <h1 style={{fontSize:25,fontWeight:700,color:"white",margin:"0 0 10px",letterSpacing:-0.5}}> {c.name}</h1>
            <p style={{color:"rgba(255,255,255,0.55)",fontSize:13.5,lineHeight:1.8,margin:"0 0 16px",maxWidth:540}}> {c.desc}</p>
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
        {[{id:"ov",l:"📋 Din diagnose"},{id:"meds",l:"💊 Off-label ("+c.meds.length+")"},{id:"sups",l:"🌿 Kosttilskud ("+c.sups.length+")"}].map(t => (
          <button key={t.id} onClick={() => sT(t.id)} style={{flex:1,padding:"9px 8px",border:"none",borderRadius:7,cursor:"pointer",fontFamily:"inherit",fontSize:12.5,fontWeight:600,background:tab===t.id?"#ffffff":"transparent",color:tab===t.id?"#2a2640":"#8c87a8",boxShadow:tab===t.id?"0 1px 6px rgba(107,95,168,0.1)":"none",transition:"all 0.2s"}}>{t.l}</button>
        ))}
      </div>
      {tab === "ov" && (
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          <div style={{background:"#eef4fb",border:"1.5px solid #b8d0e8",borderRadius:14,padding:"20px 24px"}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:14}}>
              <div style={{width:38,height:38,borderRadius:"50%",background:"#5b8db8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>🏥</div>
              <div>
                <div style={{fontSize:14,fontWeight:700,color:"#2a4a6e"}}>Hvad tilbyder din læge?</div>
                <div style={{fontSize:11,color:"#5b8db8",marginTop:2}}>Konventionel behandling i Danmark</div>
              </div>
            </div>
            <p style={{fontSize:13.5,color:"#3a5878",lineHeight:1.9,margin:0}}> {c.tx}</p>
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
            <div style={{fontSize:12.5,color:"#7a4a2a",lineHeight:1.7}}><strong>Medicinsk ansvarsfraskrivelse:</strong> Information er til faglig reference og erstatter ikke professionel medicinsk rådgivning. Off-label brug af medicin bør altid diskuteres med din onkolog.</div>
          </div>
        </div>
      )}
      {tab === "meds" && (
        <div>
          <div style={{background:"#fdf4ed",border:"1px solid #e8c4a0",borderRadius:9,padding:"10px 14px",fontSize:12.5,color:"#7a4a2a",marginBottom:14}}>💊 Off-label brug kræver lægelig vurdering. Diskutér med din onkolog.</div>
          {c.meds.map((m, i) => <Card key={i} d={m} isM={true} />)}
        </div>
      )}
      {tab === "sups" && (
        <div>
          <div style={{background:"#eaf5f3",border:"1px solid #a0cfc9",borderRadius:9,padding:"10px 14px",fontSize:12.5,color:"#2a5a54",marginBottom:12}}>🌿 Kosttilskud kan interagere med kemoterapi. Diskutér altid med din læge.</div>
          <div style={{display:"flex",gap:5,marginBottom:14,flexWrap:"wrap"}}>
            {Object.entries(EV).map(([k,v]) => (
              <div key={k} style={{display:"flex",alignItems:"center",gap:4,background:"#ffffff",border:"1px solid #e4dff2",borderRadius:7,padding:"5px 10px"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:v.c}} />
                <span style={{fontSize:10.5,color:"#5a5370"}}><strong style={{color:"#2a2640"}}> {v.l}</strong>: {v.d}</span>
              </div>
            ))}
          </div>
          {c.sups.map((s, i) => <Card key={i} d={s} isM={false} />)}
        </div>
      )}
    </div>
  );
};

export default function Onkolex() {
  const [view, sV] = useState("home");
  const [ac, sA] = useState(null);
  const [q, sQ] = useState("");
  const go = c => { sA(c); sV("cancer"); };
  const home = () => { sV("home"); sA(null); };
  const books = () => sV("books");
  const filt = CANCER_DATA.filter(c => {
    const s = q.toLowerCase();
    return !s || c.name.toLowerCase().includes(s) || c.nameEn.toLowerCase().includes(s) || c.organ.toLowerCase().includes(s) || c.icd10.includes(s);
  });
  const tM = new Set(CANCER_DATA.flatMap(c => c.meds.map(m => m.name))).size;
  const tS = new Set(CANCER_DATA.flatMap(c => c.sups.map(s => s.name))).size;
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
            <div style={{width:34,height:34,borderRadius:"50%",background:"linear-gradient(135deg,#6b5fa8,#5b8db8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🕊️</div>
            <div>
              <div style={{fontSize:17,fontWeight:800,color:"white",letterSpacing:-0.3}}>Onkolex</div>
              <div style={{fontSize:8,color:"#6b5fa8",opacity:0.9,letterSpacing:2.5,textTransform:"uppercase",fontWeight:600}}>Din guide til kræftbehandling</div>
            </div>
          </button>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={books} style={{display:"flex",alignItems:"center",gap:6,background:view==="books"?"rgba(107,95,168,0.2)":"rgba(255,255,255,0.05)",border:"1px solid "+(view==="books"?"#6b5fa8":"rgba(255,255,255,0.1)"),borderRadius:8,padding:"7px 14px",color:view==="books"?"#6b5fa8":"rgba(255,255,255,0.6)",fontSize:12.5,fontWeight:600,cursor:"pointer",fontFamily:"inherit"}}>📚 Protokol-bøger</button>
            <div style={{display:"flex",alignItems:"center",gap:6,background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:8,padding:"6px 12px"}}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              <input value={q} onChange={e => { sQ(e.target.value); if(view!=="home") home(); }} placeholder="Søg kræfttype…" style={{background:"none",border:"none",outline:"none",color:"white",fontSize:12.5,width:150,fontFamily:"inherit"}} />
            </div>
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.3)",display:"flex",gap:14}}>
            <span><span style={{color:"#4a8c84",fontWeight:700}}> {CANCER_DATA.length}</span> typer</span>
            <span><span style={{color:"#c4875a",fontWeight:700}}> {tM}</span> off-label</span>
            <span><span style={{color:"#6b5fa8",fontWeight:700}}> {tS}</span> kosttilskud</span>
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
        {view === "cancer" && (
          <nav style={{display:"flex",flexDirection:"column",gap:4}}>
            <div style={{fontSize:9.5,fontWeight:700,textTransform:"uppercase",letterSpacing:2,color:"#8c87a8",padding:"4px 8px",marginBottom:6}}>Kræfttyper</div>
            {CANCER_DATA.map(c => (
              <button key={c.id} onClick={() => go(c)} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:ac&&ac.id===c.id?"#2e2a4a":"#ffffff",border:"1.5px solid "+(ac&&ac.id===c.id?"#6b5fa8":"#e4dff2"),borderRadius:10,cursor:"pointer",textAlign:"left",fontFamily:"inherit",transition:"all 0.15s",boxShadow:ac&&ac.id===c.id?"0 4px 16px rgba(107,95,168,0.2)":"none"}}>
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
          {view === "cancer" && ac && <Detail c={ac} back={home} />}
          {view === "books" && (
            <div style={{animation:"fadeIn 0.3s ease",maxWidth:780}}>
              <div style={{marginBottom:24}}>
                <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:2.5,color:"#5b8db8",marginBottom:8}}>Protokol-bøger og Ressourcer</div>
                <h1 style={{fontSize:28,fontWeight:700,color:"#2a2640",letterSpacing:-0.5,marginBottom:8}}>Bøger der har inspireret off-label bevægelsen</h1>
                <p style={{fontSize:13.5,color:"#5a5370",lineHeight:1.75,maxWidth:580}}>Disse bøger og protokoller har spillet en central rolle i den globale patient-drevne repurposing-bevægelse. Alle præparater markeret med 📖 kan spores til én af disse protokoller.</p>
              </div>
              {BOOKS.map(b => <BookCard key={b.id} b={b} />)}
            </div>
          )}
          {view === "home" && (
            <div style={{animation:"fadeIn 0.35s ease"}}>
              <div style={{background:"#2e2a4a",borderRadius:18,padding:"36px 40px",marginBottom:22,position:"relative",overflow:"hidden",boxShadow:"0 8px 40px rgba(46,42,74,0.18)"}}>
                <div style={{position:"absolute",top:-60,right:-60,width:280,height:280,borderRadius:"50%",background:"radial-gradient(circle,rgba(107,95,168,0.18),transparent 70%)"}} />
                <div style={{position:"absolute",bottom:-40,left:-40,width:200,height:200,borderRadius:"50%",background:"radial-gradient(circle,rgba(91,141,184,0.12),transparent 70%)"}} />
                <div style={{position:"relative"}}>
                  <div style={{fontSize:11,color:"#6b5fa8",fontWeight:600,letterSpacing:3,textTransform:"uppercase",marginBottom:12,opacity:0.9}}>Dansk kræft opslagsværk</div>
                  <h1 style={{fontSize:33,fontWeight:700,color:"white",letterSpacing:-1,lineHeight:1.15,marginBottom:12}}>
                    Du er ikke alene.<br/>
                    <span style={{color:"#6b5fa8",opacity:0.9}}>Her finder du viden</span> der styrker dig.
                  </h1>
                  <p style={{color:"rgba(255,255,255,0.5)",fontSize:14,lineHeight:1.8,maxWidth:500,marginBottom:22}}>Onkolex samler evidensbaseret information om kræfttyper, konventionel behandling, repurposed lægemidler og kosttilskud — med PubMed-referencer og bogkilder. Alt til dig som vil vide mere.</p>
                  <button onClick={books} style={{display:"inline-flex",alignItems:"center",gap:7,background:"rgba(107,95,168,0.15)",border:"1.5px solid #6b5fa8",borderRadius:10,color:"#6b5fa8",padding:"10px 18px",fontSize:13,fontWeight:600,cursor:"pointer",fontFamily:"inherit",opacity:0.9}}>📚 Se McLelland, Clark og Tippens protokoller →</button>
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
              <div style={{display:"flex",gap:7,marginBottom:16,flexWrap:"wrap"}}>
                {Object.entries(EV).map(([k,v]) => (
                  <div key={k} style={{display:"flex",alignItems:"center",gap:5,background:"#ffffff",border:"1px solid #e4dff2",borderRadius:7,padding:"5px 10px"}}>
                    <div style={{width:7,height:7,borderRadius:"50%",background:v.c}} />
                    <span style={{fontSize:11,color:"#5a5370"}}><strong style={{color:"#2a2640"}}> {v.l}</strong> — {v.d}</span>
                  </div>
                ))}
              </div>
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
                {filt.map((c, i) => (
                  <button key={c.id} onClick={() => go(c)} style={{background:"#ffffff",border:"1.5px solid #e4dff2",borderRadius:14,padding:0,cursor:"pointer",textAlign:"left",fontFamily:"inherit",overflow:"hidden",animation:"fadeIn 0.35s ease "+(i*0.04)+"s both",transition:"all 0.2s"}}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="#6b5fa8"; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(107,95,168,0.14)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="#e4dff2"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}>
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
