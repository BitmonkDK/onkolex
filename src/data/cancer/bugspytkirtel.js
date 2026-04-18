import { T } from "../../theme.js";

// ─── Bugspytkirtelkræft (C25) ─────────────────────────────────────────────────

export const bugspytkirtel = {
  id:    "bugspytkirtel",
  name:  "Bugspytkirtelkræft",
  icd10: "C25",
  icon:  "🟡",
  intro: "Bugspytkirtelkræft har den dårligste prognose af alle solide tumorer — 5-årsoverlevelse under 12%. Sen diagnose, ekstremt desmoplatisk stroma og KRAS-afhængighed gør behandling særdeles vanskelig. Tidlig BRCA-testning kan åbne for PARP-hæmmere.",

  groups: [

    // ── PDAC ──────────────────────────────────────────────────────────────────
    {
      id:   "pdac",
      name: "Duktalt adenokarcinom (PDAC)",
      color: T.amber,
      pct:  "~90% af bugspytkirtelkræft",
      subtypes: [

        {
          id: "pdac_kras", name: "PDAC — KRAS-muteret (wildtype BRCA)", badge: "Hyppigst — begrænset targetabilitet", badgeColor: T.amber,
          criteria: "Duktalt adenokarcinom / KRAS mutation (G12D/V/R) / BRCA1/2 wildtype",
          biology: {
            summary: "PDAC er en af de mest behandlingsresistente kræftformer. KRAS er muteret i ~95% — historisk 'undruggable'. Det dysmoplatiske stroma udgør op til 90% af tumorens volumen og fungerer som en fysisk barriere mod lægemiddellevering og immunterapi. Metabolismen er ekstremt adaptiv — PDAC kan anvende makropinocytose til at optage næringsstoffer fra stroma og er afhængig af KRAS-drevet autopagi for overlevelse.",
            pathways: [
              { name: "KRAS/RAS/MAPK",      role: "Konstitutivt aktiv i ~95% — primær driver",                         level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",      role: "Ko-aktiveret downstream af KRAS",                                   level: "Høj" },
              { name: "Autopagi",           role: "Kritisk overlevelsesmekanisme — PDAC er ekstremt autopagi-afhængig", level: "Ekstremt høj" },
              { name: "Makropinocytose",    role: "Unik KRAS-drevet stromanæring-optagelse",                           level: "Høj" },
              { name: "Aerob glykolyse",    role: "Stærkt Warburg-præget — GLUT1 overudtrykt",                        level: "Høj" },
              { name: "Glutaminolyse",      role: "Afgørende TCA-kilde — target for glutaminase-hæmmere",              level: "Høj" },
              { name: "Stroma/desmoplasi",  role: "Massivt stroma reducerer immuncelle- og lægemiddel-adgang",         level: "Ekstremt høj" },
            ],
            mutations: ["KRAS G12D (~40%)", "KRAS G12V (~30%)", "KRAS G12R (~15%)", "TP53 (~75%)", "CDKN2A-tab (~90%)", "SMAD4-tab (~55%)", "ARID1A mutation"],
          },
          offLabel: [
            {
              name: "Metformin", ev: "p12",
              mech: "AMPK → hæmmer autopagi-afhængiged og KRAS-drevet makropinocytose. Reducerer mTOR og FASN. Svækker desmoplatisk stroma-produktion via CAF-hæmning",
              note: "Retrospektive studier: PDAC-patienter med diabetes på metformin lever markant længere. Fase 2: metformin + gemcitabin forbedret PFS. En af de bedst dokumenterede off-label muligheder i PDAC.",
              inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+pancreatic+cancer"
            },
            {
              name: "HCQ (Hydroxychloroquin)", ev: "p12",
              mech: "Autopagi-hæmning — PDAC er den mest autopagi-afhængige af alle solide tumorer. HCQ blokerer den primære overlevelsesmekanisme",
              note: "Fase 1/2: HCQ + gemcitabin/abraxane ved metastatisk PDAC — klinisk benefit hos ~30%. Fase 2/3 igangværende. Et af de stærkeste off-label rationale i PDAC.",
              inter: "⚠️ QT-forlængelse. EKG obligatorisk.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+pancreatic+cancer"
            },
            {
              name: "Statin (Simvastatin)", ev: "p12",
              mech: "Mevalonat-hæmning → reducerer KRAS-membrananchoring via GGPP. Svækker desmoplatisk stroma. Reducerer RAS/MAPK direkte",
              note: "Meta-analyse: statin-brugere med PDAC har bedre overlevelse. Lipofil statin foretrækkes.",
              inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+pancreatic+cancer"
            },
            {
              name: "Itraconazol", ev: "p12",
              mech: "Hedgehog-hæmning → reducerer desmoplatisk stroma-produktion. Anti-angiogenetisk. Stroma-blokade kan forbedre gemcitabin-levering til tumorceller",
              note: "Fase 2: itraconazol + gemcitabin ved avanceret PDAC — stroma-reduktion og forbedret drug delivery observeret.",
              inter: "⚠️ Stærk CYP3A4-hæmmer — interagerer med gemcitabin-metabolisme.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=itraconazole+pancreatic+cancer"
            },
            {
              name: "Ivermectin", ev: "pre",
              mech: "PAK1-hæmning → reducerer KRAS-downstream RAS/MAPK og WNT. Hæmmer makropinocytose direkte",
              note: "Præklinisk stærk evidens i PDAC-modeller. Fase 1/2 studier rekrutterer.",
              inter: "Lav toksicitet.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=ivermectin+pancreatic+cancer"
            },
            {
              name: "Mebendazol", ev: "pre",
              mech: "Tubulin-hæmmer → mitosestop. Reducerer VEGF-A og desmoplatisk stroma. Anti-KRAS downstream effekt",
              note: "Præklinisk evidens. Kombinationsstudier med gemcitabin igangværende.",
              inter: "God tolerabilitet. LFT-monitorering.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=mebendazole+pancreatic+cancer"
            },
          ],
          supplements: [
            { name: "Omega-3 (EPA/DHA)",    dose: "3–4 g/dag",             ev: "p12", mech: "Kritisk ved PDAC: kræft-kakeksi (muskel- og fedttab) er hyppig og livstruende. EPA specifikt reducerer kakeksi og inflammation", inter: "Let blødningsforstærkende" },
            { name: "Vitamin D3",           dose: "2.000–5.000 IE/dag",    ev: "p12", mech: "Reducerer desmoplatisk stroma via VDR-aktivering på stellatceller. SUNSHINE-PDAC-studier igangværende",                         inter: "Ingen kendte alvorlige" },
            { name: "Curcumin (liposomal)", dose: "500–2.000 mg/dag",      ev: "p12", mech: "NF-κB hæmning og KRAS-downstream ERK-hæmning. Fase 2 data ved PDAC",                                                           inter: "Let blødningsforstærkende" },
            { name: "Melatonin",            dose: "20–40 mg/aften",        ev: "p12", mech: "Anti-Warburg og anti-autopagi. Reducerer PDAC-invasivitet og gemcitabin-resistens i cellelinjer",                               inter: "Sederende" },
            { name: "Probiotika",           dose: "10–50 mia. CFU/dag",    ev: "p12", mech: "Mikrobiomet er afgørende for PDAC-prognose og kemo-tolerabilitet. Pancreas-specifik mikrobiom-dysbiose er hyppig",              inter: "Ingen kendte alvorlige" },
          ],
          biomarkers: [
            { name: "BRCA1/2 + HRR-panel (germline + somatisk)", why: "~8% BRCA-muteret — olaparib godkendt som vedligeholdelsesbehandling (POLO-studiet). VIGTIGSTE test",                    crit: true },
            { name: "KRAS G12C specifikt",    why: "~1–2% KRAS G12C i PDAC — åbner for sotorasib i kliniske studier",                                                                          crit: false },
            { name: "KRAS-wildtype (~5%)",    why: "KRAS-wildtype PDAC har fundamental anderledes biologi og bedre prognose. NGS kan identificere alternative drivere (BRAF, NTRK)",            crit: false },
            { name: "MSI-H / dMMR",          why: "~1–2% af PDAC — men åbner for pembrolizumab (tumor-agnostisk). Skal altid testes",                                                          crit: true },
            { name: "NTRK-fusion",           why: "Sjælden (<1%) men targetbar med larotrectinib uanset tumortype (tumor-agnostisk)",                                                           crit: false },
            { name: "CA 19-9",               why: "Tumormarkør til monitorering — ikke diagnostisk. Normal ved Lewis-antigen negativ (~10% af befolkningen)",                                   crit: false },
            { name: "TMB",                   why: "Høj TMB → immunterapi-mulighed. Sjælden men vigtig at identificere",                                                                         crit: false },
          ],
          trials: [
            { name: "HCQ + gemcitabin/abraxane (mPDAC)",  phase: "Fase 2–3", status: "Igangværende",         url: "https://clinicaltrials.gov/search?cond=pancreatic+cancer&term=hydroxychloroquine" },
            { name: "POLO (Olaparib vedligehold BRCA+ PDAC)", phase: "Fase 3", status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT02184195" },
            { name: "Metformin + gemcitabin (PDAC)",       phase: "Fase 2",   status: "Igangværende",         url: "https://clinicaltrials.gov/search?cond=pancreatic+cancer&term=metformin" },
            { name: "Alle aktive PDAC studier",            phase: "Alle",     status: "–",                    url: "https://clinicaltrials.gov/search?cond=pancreatic+ductal+adenocarcinoma&type=Interventional&recrs=a" },
          ],
        },

        {
          id: "pdac_brca", name: "PDAC — BRCA1/2-muteret", badge: "PARP-hæmmer indiceret", badgeColor: T.green,
          criteria: "Duktalt adenokarcinom / BRCA1 eller BRCA2 germline eller somatisk mutation",
          biology: {
            summary: "BRCA1/2-muteret PDAC udgør ~8% af tilfælde og har en biologisk fundamentalt anderledes DNA-reparationsdefekt. HRD (homologous recombination deficiency) giver ekstrem sensitivitet over for platinbaseret kemoterapi og PARP-hæmmere. Olaparib som vedligeholdelsesbehandling efter platinrespons er godkendt (POLO-studiet) og forbedrer PFS markant.",
            pathways: [
              { name: "HRD/BRCA-mangelfuld DNA-reparation", role: "Definerende — sensitivitet for platin og PARP-hæmmere", level: "Ekstremt høj" },
              { name: "KRAS/RAS/MAPK",                      role: "Fortsat primær driver (~95%)",                          level: "Høj" },
              { name: "Autopagi",                           role: "Kritisk overlevelsesmekanisme — som ved KRAS-PDAC",     level: "Høj" },
              { name: "Stroma/desmoplasi",                  role: "Fortsat massivt stroma",                                level: "Høj" },
            ],
            mutations: ["BRCA2 (~7%)", "BRCA1 (~1%)", "KRAS (~90% ko-mutation)", "TP53 (~75%)", "PALB2 (~1%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og autopagi. Synergi med olaparib via AMPK-BRCA2-interaktion",             note: "Kombinationsstudier med olaparib igangværende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+BRCA+pancreatic" },
            { name: "HCQ",        ev: "p12", mech: "Autopagi-hæmning synergistisk med olaparib — BRCA-muterede celler er ekstra autopagi-afhængige under PARP-hæmning", note: "Stærkt præklinisk rationale. Kliniske studier igangværende.", inter: "⚠️ QT-forlængelse.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+BRCA+pancreatic" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer KRAS-membrananchoring. Synergi med platinkemo", note: "Biologisk stærkt rationale.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+BRCA+pancreatic" },
          ],
          supplements: [
            { name: "Omega-3 (EPA/DHA)", dose: "3–4 g/dag",         ev: "p12", mech: "Kakeksi-forebyggelse og anti-inflammatorisk. Kritisk ved PDAC", inter: "Let blødningsforstærkende" },
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Stroma-reduktion via VDR. Synergi med olaparib præklinisk",  inter: "Ingen kendte alvorlige" },
          ],
          biomarkers: [
            { name: "BRCA1/2 (germline + somatisk)", why: "Definerer subtypen og olaparib-indikationen. Germline-test giver information til hele familien",  crit: true },
            { name: "HRD-score",                     why: "Positiv HRD uden BRCA-mutation = potentiel PARP-hæmmer-kandidat",                                 crit: false },
            { name: "PALB2, RAD51C/D",               why: "Andre HRR-gener med platin og PARP-hæmmer-sensitivitet",                                          crit: false },
            { name: "CA 19-9",                       why: "Monitoreringsmarkør under olaparib-behandling",                                                   crit: false },
          ],
          trials: [
            { name: "POLO (Olaparib vedligehold)",       phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT02184195" },
            { name: "HCQ + olaparib (BRCA+ PDAC)",      phase: "Fase 1–2",status: "Rekrutterer",          url: "https://clinicaltrials.gov/search?cond=BRCA+pancreatic&term=hydroxychloroquine" },
            { name: "Alle aktive BRCA PDAC studier",    phase: "Alle",    status: "–",                    url: "https://clinicaltrials.gov/search?cond=BRCA+pancreatic+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    // ── pNET ──────────────────────────────────────────────────────────────────
    {
      id:   "pnet",
      name: "Neuroendokrine tumorer (pNET)",
      color: T.purple,
      pct:  "~5–10% af bugspytkirtelkræft",
      subtypes: [
        {
          id: "pnet_main", name: "Neuroendokrin tumor (pNET grad 1–2)", badge: "Langsom vækst — god prognose", badgeColor: T.purple,
          criteria: "Neuroendokrin tumor / Ki-67 < 20% / Chromogranin A + / Synaptophysin +",
          biology: {
            summary: "pNET er biologisk fundamentalt anderledes end PDAC — langsom vækst, neuroendokrin oprindelse og mTOR-afhængighed. Everolimus (mTOR-hæmmer) og sunitinib er standardbehandlinger ved avanceret sygdom. Funktionelle pNET (insulinom, gastrinom) giver kliniske syndrom via hormonsekretion.",
            pathways: [
              { name: "mTOR",             role: "Primær driver — hyppigt aktiveret via PTEN/TSC-tab",        level: "Høj" },
              { name: "VEGFR/angiogenese",role: "Stærkt vaskulariseret — anti-VEGF effektivt",               level: "Høj" },
              { name: "PI3K/AKT",         role: "Ko-aktiveret med mTOR",                                     level: "Moderat-høj" },
              { name: "OXPHOS",           role: "Relativt høj OXPHOS — modsat PDAC",                        level: "Moderat-høj" },
              { name: "Aerob glykolyse",  role: "Lavere end PDAC",                                           level: "Lav-moderat" },
            ],
            mutations: ["MEN1 mutation (~40%)", "DAXX/ATRX (~40%)", "PTEN-tab (~15%)", "TSC1/2 mutation (~10%)", "PIK3CA (~10%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → direkte mTOR-hæmning. Synergi med everolimus — metformin og everolimus rammer mTOR fra to sider",                      note: "Fase 2: metformin + everolimus ved avanceret pNET. Lovende data.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+pancreatic+neuroendocrine" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer RAS-aktivering og VEGF-produktion. Synergi med sunitinib anti-VEGFR",                           note: "Observationsdata ved pNET lovende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+neuroendocrine+tumor" },
            { name: "Itraconazol",ev: "p12", mech: "Hedgehog-hæmning og anti-VEGFR-2 anti-angiogenetisk — direkte synergi med sunitinib. Kan potensere angiogenese-blokade",     note: "Observationsdata og præklinisk synergi med sunitinib.", inter: "⚠️ CYP3A4-hæmmer — interagerer med everolimus og sunitinib.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=itraconazole+neuroendocrine" },
          ],
          supplements: [
            { name: "Omega-3 (EPA/DHA)", dose: "3–4 g/dag",         ev: "p12", mech: "Anti-inflammatorisk, anti-VEGF effekt via EPA/DHA",   inter: "Let blødningsforstærkende" },
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-proliferativ via VDR — udtrykt i neuroendokrine celler", inter: "Ingen kendte alvorlige" },
            { name: "Melatonin",         dose: "20 mg/aften",        ev: "p12", mech: "MT1/MT2-receptorer i neuroendokrine celler. Antiproliferativ og regulerer hormonsekretion", inter: "Sederende" },
          ],
          biomarkers: [
            { name: "Chromogranin A (serum)",    why: "Primær tumormarkør ved pNET. Korrelerer med tumorvolumen og monitorerer behandlingsrespons",      crit: true },
            { name: "Ki-67 (%)",                 why: "Definerer grad (1: <3%, 2: 3–20%, 3: >20%). Afgørende for behandlingsstrategi",                  crit: true },
            { name: "Ga-68 DOTATATE PET/CT",     why: "Somatostatin-receptor-billeddannelse — bedste staging-metode. Nødvendig for PRRT-vurdering",     crit: true },
            { name: "MEN1 germline",             why: "~10% arvelige pNET via MEN1-mutation. Familietest vigtigt",                                      crit: false },
            { name: "Insulinom: insulin/C-peptid", why: "Bekræfter funktionelt insulinom — hypoglykæmi-styring prioriteres",                            crit: false },
          ],
          trials: [
            { name: "RADIANT-3 (Everolimus ved pNET)",  phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT00510068" },
            { name: "Metformin + everolimus (pNET)",    phase: "Fase 2",  status: "Igangværende",        url: "https://clinicaltrials.gov/search?cond=pancreatic+neuroendocrine&term=metformin" },
            { name: "Alle aktive pNET studier",        phase: "Alle",    status: "–",                   url: "https://clinicaltrials.gov/search?cond=pancreatic+neuroendocrine+tumor&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};
