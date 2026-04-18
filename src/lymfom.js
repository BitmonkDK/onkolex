import { T } from "../../theme.js";

// ─── Brystkræft (C50) ─────────────────────────────────────────────────────────
// For at tilføje en ny subtype:
//   1. Tilføj et nyt objekt i den relevante groups[].subtypes array
//   2. Følg samme struktur som de eksisterende subtyper
//
// For at tilføje en ny gruppe:
//   1. Tilføj et nyt objekt i groups arrayet

export const braestkraeft = {
  id:    "braestkraeft",
  name:  "Brystkræft",
  icd10: "C50",
  icon:  "🎗️",
  intro: "Brystkræft er den hyppigste kræftform hos kvinder. Biologien varierer drastisk — subtypeidentifikation er afgørende for at finde de rigtige behandlingsmuligheder.",

  groups: [
    // ── HR+ ──────────────────────────────────────────────────────────────────
    {
      id:    "hr",
      name:  "HR+ (Hormonreceptor-positiv)",
      color: T.rose,
      pct:   "~70% af tilfælde",
      subtypes: [
        {
          id:       "lumA",
          name:     "Luminal A",
          badge:    "Bedst prognose",
          badgeColor: T.green,
          criteria: "ER+ / PR+ høj / HER2− / Ki-67 < 14%",
          biology: {
            summary: "Luminal A er den mindst aggressive subtype. Væksten drives primært af østrogensignalering via ERα. Metabolisk foretrækkes OXPHOS frem for aerob glykolyse — Warburg-effekten er lav. PIK3CA er muteret i ~45%.",
            pathways: [
              { name: "ER/PR-signalering",         role: "Primær vækstdriver via ERα-aktivering",          level: "Meget høj" },
              { name: "PI3K/AKT/mTOR",             role: "Sekundær driver — PIK3CA muteret i ~45%",        level: "Moderat" },
              { name: "OXPHOS",                    role: "Primær energikilde — lav Warburg-aktivitet",     level: "Høj" },
              { name: "Aerob glykolyse (Warburg)", role: "Lav aktivitet",                                  level: "Lav" },
            ],
            mutations: ["PIK3CA (~45%)", "GATA3 (~15%)", "CDH1 (lobulær variant)", "MAP3K1"],
          },
          offLabel: [
            {
              name:  "Metformin",
              ev:    "p12",
              mech:  "Aktiverer AMPK → hæmmer mTORC1 og sænker insulin og IGF-1 → anti-proliferativ effekt",
              note:  "MA.32-studiet (n=3.649 RCT) viste forbedret DFS. Særlig relevant ved forhøjet BMI og insulinresistens. 500–2.000 mg/dag.",
              inter: "Lav risiko. Undgå ved eGFR < 30 ml/min.",
              url:   "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+luminal+breast+cancer",
            },
            {
              name:  "Aspirin (lav dosis)",
              ev:    "p12",
              mech:  "COX-2-hæmning → reducerer prostaglandiner og aromatase-aktivitet",
              note:  "Observationsstudier: 20–30% reduceret recidivrisiko. Ikke bekræftet i RCT endnu.",
              inter: "Øger blødningsrisiko. Varsomhed ved antikoagulationsbehandling.",
              url:   "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+hormone+receptor+breast+cancer",
            },
            {
              name:  "Statin (Simvastatin)",
              ev:    "p12",
              mech:  "Hæmmer mevalonat-vejen → reducerer Rho og Ras og celleproliferation",
              note:  "Epidemiologiske data lovende. Lipofil statin foretrækkes. LFT-monitorering.",
              inter: "Muskelsmerte-risiko.",
              url:   "https://pubmed.ncbi.nlm.nih.gov/?term=statin+breast+cancer+luminal",
            },
            {
              name:  "Berberine",
              ev:    "pre",
              mech:  "AMPK-aktivering (metformin-lignende), hæmmer aromatase-aktivitet",
              note:  "Kun prækliniske data i brystkræft.",
              inter: "⚠️ Kan hæmme CYP3A4 — tjek interaktioner med tamoxifen.",
              url:   "https://pubmed.ncbi.nlm.nih.gov/?term=berberine+breast+cancer",
            },
          ],
          supplements: [
            { name: "Vitamin D3",          dose: "2.000–5.000 IE/dag",                               ev: "p12", mech: "VDR-ekspression høj i HR+ — anti-proliferativ og pro-apoptotisk",            inter: "Ingen kendte alvorlige interaktioner med hormonbehandling" },
            { name: "DIM (Diindolylmethane)", dose: "100–200 mg/dag",                                ev: "pre", mech: "Fremmer 2-hydroxylering af østrogen → gunstigt østrogenmetabolit-forhold",     inter: "⚠️ Potentielt svagt østrogent ved høje doser — diskuter med onkolog" },
            { name: "Omega-3 (EPA/DHA)",   dose: "2–3 g/dag",                                        ev: "p12", mech: "Anti-inflammatorisk, COX-2-hæmning, modulerer lipid-raft-signalering",         inter: "Let blødningsforstærkende. Undgå høje doser perioperativt" },
            { name: "Melatonin",           dose: "3–20 mg/aften",                                    ev: "p12", mech: "Anti-proliferativ via MT1-receptor. Regulerer østrogenrespons",                inter: "Forstærker sederende medicin" },
          ],
          biomarkers: [
            { name: "ER (Allred score)",          why: "Bekræfter HR+ status. Score ≥ 3 nødvendig for hormonbehandling",                        crit: true },
            { name: "PR",                         why: "Lav PR trods ER+ er et Luminal B-tegn — prognosemarkør",                                 crit: false },
            { name: "Ki-67 (%)",                  why: "< 14% bekræfter Luminal A. Afgørende for at undgå unødvendig kemoterapi",                crit: true },
            { name: "HER2 (IHC + FISH)",          why: "Udelukker HER2+ subtype. Skal testes ved alle nye diagnoser",                           crit: true },
            { name: "BRCA1/2 (kimcellelinje)",    why: "Arvelig risiko. Påvirker PARP-hæmmer-valg og forebyggende kirurgi",                     crit: false },
            { name: "PIK3CA mutation",            why: "Forudsiger respons på alpelisib (Piqray) ved metastatisk sygdom",                       crit: false },
            { name: "Oncotype DX",                why: "21-gen-test afgør recidivrisiko og kemobehov. Undgår over-behandling",                  crit: true },
          ],
          trials: [
            { name: "MASTER (Metformin + anastrozol)",    phase: "Fase 2",  status: "Rekrutterer",   url: "https://clinicaltrials.gov/search?cond=luminal+breast+cancer&term=metformin" },
            { name: "Aspirin vs. placebo (post-diagnose)", phase: "Fase 3", status: "Igangværende",   url: "https://clinicaltrials.gov/search?cond=breast+cancer&term=aspirin" },
            { name: "Alle aktive Luminal A studier",       phase: "Alle",   status: "–",              url: "https://clinicaltrials.gov/search?cond=luminal+A+breast+cancer&type=Interventional&recrs=a" },
          ],
        },

        {
          id:       "lumB",
          name:     "Luminal B",
          badge:    "Intermediær prognose",
          badgeColor: T.amber,
          criteria: "ER+ / PR lav / HER2± / Ki-67 ≥ 20%",
          biology: {
            summary: "Luminal B er mere aggressiv end Luminal A pga. høj proliferationshastighed (Ki-67 ≥ 20%). mTOR-signalvejen er typisk hyperaktiveret og der ses øget aerob glykolyse. CCND1 er hyppigt amplificeret og driver CDK4/6-aktivering.",
            pathways: [
              { name: "ER-signalering",            role: "Primær driver, men lavere receptorrespons end Luminal A",  level: "Moderat-høj" },
              { name: "PI3K/AKT/mTOR",             role: "Hyperaktiveret — næsten universelt til stede",            level: "Høj" },
              { name: "CDK4/6-cykliner",           role: "Øget celledeling via CCND1-overekspression",              level: "Høj" },
              { name: "Aerob glykolyse",           role: "Moderat — højere end Luminal A",                          level: "Moderat" },
              { name: "OXPHOS",                    role: "Stadig til stede, suppleres af glykolyse",                level: "Moderat" },
            ],
            mutations: ["PIK3CA (~45%)", "ESR1 (metastatisk resistens)", "CCND1 amplifikation", "CDK4/6 amplifikation"],
          },
          offLabel: [
            { name: "Metformin",              ev: "p3",  mech: "AMPK → mTOR-hæmning. Stærkest rationale her pga. mTOR-hyperaktivering", note: "MA.32-studiet (n=3.649 RCT) — signifikant forbedret DFS hos postmenopausale.", inter: "Undgå ved eGFR < 30 ml/min.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+MA32+breast+cancer" },
            { name: "Hydroxychloroquin (HCQ)",ev: "p12", mech: "Lysosomhæmning → blokerer autopagi → øger kemosensitivitet",            note: "Autopagi er særlig aktiv ved endokrin resistens. Fase 2 igangværende.",    inter: "⚠️ QT-forlængelse mulig. EKG inden opstart.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+breast+cancer" },
            { name: "Statin (Atorvastatin)",  ev: "p12", mech: "Mevalonat-hæmning → reducerer GGPP → hæmmer RhoA og Ras",             note: "Kombinationsstudier med aromatasehæmmere igangværende.",                 inter: "Myopati-risiko.",  url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+luminal+B+breast" },
            { name: "Ivermectin",             ev: "pre", mech: "PAK1-hæmning → reducerer WNT og HIF",                                  note: "In vitro data på brystkræftcellelinjer.",                                inter: "Lav toksicitet.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=ivermectin+breast+cancer" },
          ],
          supplements: [
            { name: "Berberine",          dose: "500 mg 2–3x/dag",   ev: "p12", mech: "AMPK-aktivering, CDK-hæmning",          inter: "⚠️ Hæmmer CYP3A4 — mulig interaktion med tamoxifen-metabolisme" },
            { name: "Curcumin (liposomal)", dose: "500–1.000 mg/dag", ev: "pre", mech: "NF-κB hæmning, CDK-inhibition, mTOR",  inter: "Høje doser kan hæmme blodpladefunktion" },
            { name: "Vitamin D3",         dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-proliferativ via VDR",             inter: "Ingen kendte alvorlige" },
            { name: "EGCG (Grøn te)",     dose: "400–800 mg/dag",    ev: "pre", mech: "Hæmmer PI3K og AKT og aromatase",       inter: "OBS ved kemoterapi" },
          ],
          biomarkers: [
            { name: "Ki-67 (%)",              why: "≥ 20% definerer Luminal B. Bør gentestes ved recidiv",              crit: true },
            { name: "ER / PR (kvantitativ)",  why: "Lav PR trods ER+ signalerer Luminal B",                             crit: true },
            { name: "HER2 (IHC + FISH)",      why: "HER2+ Luminal B behandles fundamentalt anderledes",                 crit: true },
            { name: "PIK3CA mutation",        why: "Åbner for alpelisib ved metastatisk HR+/HER2−",                     crit: false },
            { name: "ESR1 mutation (ctDNA)",  why: "Opstår ved endokrin resistens — indikerer skift i behandling",      crit: false },
            { name: "BRCA1/2",                why: "Relevant for PARP-hæmmer",                                          crit: false },
            { name: "Oncotype DX / MammaPrint", why: "Afgørende for kemoterapi-beslutning",                             crit: true },
          ],
          trials: [
            { name: "Berberine + letrozol",  phase: "Fase 2", status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=breast+cancer&term=berberine" },
            { name: "HCQ + endokrin behandling", phase: "Fase 2", status: "Rekrutterer", url: "https://clinicaltrials.gov/search?cond=breast+cancer&term=hydroxychloroquine" },
            { name: "Alle Luminal B studier", phase: "Alle", status: "–", url: "https://clinicaltrials.gov/search?cond=luminal+B+breast+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    // ── HER2+ ─────────────────────────────────────────────────────────────────
    {
      id:   "her2",
      name: "HER2-positiv",
      color: T.amber,
      pct:  "~15–20% af tilfælde",
      subtypes: [
        {
          id: "her2enr", name: "HER2-enriched (HR−)", badge: "HER2+ / Hormon-negativ", badgeColor: T.amber,
          criteria: "HER2 amplificeret (IHC 3+ / FISH >2.0) / ER− / PR−",
          biology: {
            summary: "HER2-enriched drives udelukkende af HER2-amplifikation. PI3K/AKT/mTOR og MAPK/ERK er kraftigt aktiverede. FASN er overudtrykt. TP53 er muteret i ~75%.",
            pathways: [
              { name: "HER2/ErbB2",   role: "Primær driver — direkte gen-amplifikation",   level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",role: "Downstream af HER2",                          level: "Høj" },
              { name: "MAPK/ERK",     role: "Parallel HER2-downstream signalvej",           level: "Høj" },
              { name: "FASN",         role: "Overudtrykt — energi og membrankomponenter",   level: "Høj" },
              { name: "Aerob glykolyse", role: "Moderat-høj",                               level: "Moderat-høj" },
            ],
            mutations: ["HER2 amplifikation", "PIK3CA (~40%)", "TP53 (~75%)"],
          },
          offLabel: [
            { name: "Statin (Simvastatin)",   ev: "p12", mech: "Mevalonat-hæmning → reducerer HER2-membranlokalisering via lipid-rafts", note: "Synergistisk med trastuzumab i observationsstudier.", inter: "Myopati ved kombination med CYP3A4-hæmmere.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+HER2+breast+cancer" },
            { name: "Chloroquin / HCQ",       ev: "p12", mech: "Autopagi-hæmning synergistisk med trastuzumab", note: "Fase 1/2 studier igangværende.", inter: "⚠️ QT-forlængelse. EKG inden opstart.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=chloroquine+HER2+breast" },
            { name: "Metformin",              ev: "p12", mech: "AMPK → mTOR-hæmning downstream af HER2", note: "Kombinationsstudier med trastuzumab.", inter: "Undgå ved eGFR < 30.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+HER2+breast" },
            { name: "Disulfiram (Antabus)",   ev: "pre", mech: "Hæmmer NF-κB og ALDH → reducerer cancer stem cells", note: "Stærk præklinisk evidens.", inter: "⚠️ ABSOLUT KI: alkohol i enhver form. LFT-monitorering.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=disulfiram+breast+cancer" },
          ],
          supplements: [
            { name: "Omega-3 (EPA/DHA)",   dose: "2–3 g/dag",       ev: "p12", mech: "Hæmmer FASN-aktivitet og ændrer membran-lipid rafts", inter: "Let blødningsforstærkende" },
            { name: "EGCG (Grøn te)",      dose: "400–800 mg/dag",  ev: "pre", mech: "Hæmning af HER2-ekspression og PI3K",                 inter: "Timing ift. kemo vigtig" },
            { name: "Curcumin (liposomal)",dose: "500–1.000 mg/dag", ev: "pre", mech: "NF-κB og HER2-downregulering",                       inter: "Let blødningsrisiko" },
          ],
          biomarkers: [
            { name: "HER2 (IHC)",        why: "Score 3+ = positiv. Score 2+ kræver FISH-bekræftelse",          crit: true },
            { name: "HER2 (FISH/ISH)",   why: "Bekræfter amplifikation. Ratio ≥ 2.0 = amplificeret",           crit: true },
            { name: "PIK3CA mutation",   why: "Forudsiger reduceret trastuzumab-respons alene",                  crit: false },
            { name: "PD-L1 (CPS score)", why: "Relevant ved metastatisk HER2+ til immunterapi",                 crit: false },
            { name: "TP53 mutation",     why: "Hyppig prognosemarkør i HER2-enriched (~75%)",                   crit: false },
          ],
          trials: [
            { name: "Statin + trastuzumab",         phase: "Fase 2",  status: "Data tilgængelig", url: "https://clinicaltrials.gov/search?cond=HER2+breast+cancer&term=statin" },
            { name: "HCQ + pertuzumab/trastuzumab", phase: "Fase 1–2",status: "Rekrutterer",       url: "https://clinicaltrials.gov/search?cond=HER2+breast+cancer&term=chloroquine" },
            { name: "Alle aktive HER2 studier",     phase: "Alle",    status: "–",                 url: "https://clinicaltrials.gov/search?cond=HER2+positive+breast+cancer&type=Interventional&recrs=a" },
          ],
        },
        {
          id: "her2hr", name: "HER2+ / HR+ (Dobbeltpositiv)", badge: "Dobbelt driver", badgeColor: T.purple,
          criteria: "HER2 amplificeret / ER+ og/eller PR+",
          biology: {
            summary: "Dobbeltpositiv kombinerer HER2- og østrogendrevet proliferation med aktiv crosstalk. ER og HER2 forstærker hinanden — hormonbehandling alene er utilstrækkelig. PIK3CA muteret i ~50%.",
            pathways: [
              { name: "HER2-signalering",         role: "Primær driver",                                         level: "Høj" },
              { name: "ER-signalering",           role: "Parallel driver — crosstalk skaber resistens",          level: "Moderat-høj" },
              { name: "PI3K/AKT/mTOR",           role: "Aktiveret af begge signalveje",                         level: "Høj" },
              { name: "Blandet OXPHOS/glykolyse", role: "Kombineret energiprofil",                               level: "Moderat" },
            ],
            mutations: ["HER2 amplifikation", "PIK3CA (~50%)", "ESR1 (ved metastase)"],
          },
          offLabel: [
            { name: "Metformin", ev: "p12", mech: "AMPK → dual mTOR-hæmning downstream af både ER og HER2", note: "Særlig rationel pga. dobbelt mTOR-aktivering.", inter: "eGFR > 30 nødvendig.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+HER2+HR+breast" },
            { name: "Statin",    ev: "p12", mech: "Kombineret effekt på HER2-membranfunktion og ER-signalering", note: "Kombineret hit på begge drivere.", inter: "Standard statin-interaktioner.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+HER2+positive+hormone+receptor" },
          ],
          supplements: [
            { name: "Vitamin D3", dose: "2.000–5.000 IE/dag", ev: "p12", mech: "VDR anti-proliferativ",           inter: "Ingen kendte alvorlige" },
            { name: "Omega-3",    dose: "2–3 g/dag",           ev: "p12", mech: "FASN-hæmning og anti-inflammatorisk", inter: "Let blødningsrisiko perioperativt" },
          ],
          biomarkers: [
            { name: "HER2 (IHC + FISH)",     why: "Bekræft HER2-positivitet med begge metoder",              crit: true },
            { name: "ER / PR (kvantitativ)", why: "Graden af HR-positivitet styrer behandlingsrækkefølge",    crit: true },
            { name: "PIK3CA mutation",       why: "~50% muteret — alpelisib-indikation",                      crit: true },
            { name: "ESR1 mutation (ctDNA)", why: "Resistensmarkør ved endokrin behandling",                  crit: false },
          ],
          trials: [
            { name: "Alle HER2+/HR+ studier", phase: "Alle", status: "–", url: "https://clinicaltrials.gov/search?cond=HER2+positive+hormone+receptor+positive+breast+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    // ── TNBC ──────────────────────────────────────────────────────────────────
    {
      id:   "tnbc",
      name: "Trippel-negativ (TNBC)",
      color: T.rose,
      pct:  "~15% — højest mortalitet",
      subtypes: [
        {
          id: "tnbc_bl", name: "Basallignende", badge: "Mest aggressiv", badgeColor: T.rose,
          criteria: "ER− / PR− / HER2− / CK5/6+ og/eller EGFR+",
          biology: {
            summary: "Basallignende TNBC er den mest aggressive subtype. BRCA1-mutationer er hyppige (~25%). Energistofskiftet domineres af ekstrem aerob glykolyse, høj glutaminolyse og massiv ROS-produktion — disse tre metaboliske kendetegn er primære angrebspunkter. TP53 er muteret i ~80%.",
            pathways: [
              { name: "Aerob glykolyse (Warburg)", role: "Dominerende — GLUT1 og LDHA stærkt overudtrykt",        level: "Ekstremt høj" },
              { name: "Glutaminolyse",             role: "Sekundær energikilde — glutamin til TCA-cyklus",         level: "Høj" },
              { name: "PI3K/AKT/mTOR",             role: "Hyperaktiveret via PTEN-tab i ~35%",                    level: "Høj" },
              { name: "Autopagi",                  role: "Overlevelsesmekanisme under stress — target for HCQ",   level: "Høj" },
              { name: "WNT/β-catenin",             role: "Stemness og kemoresistens. Hæmmes af ivermectin",       level: "Moderat-høj" },
              { name: "OXPHOS",                    role: "Reduceret men til stede — target for doxycyclin",       level: "Lav-moderat" },
            ],
            mutations: ["TP53 (~80%)", "BRCA1 (~25%)", "PTEN-tab (~35%)", "EGFR amplifikation (~14%)", "RB1-tab"],
          },
          offLabel: [
            { name: "Metformin",              ev: "p3",  mech: "AMPK → hæmmer aerob glykolyse og mTOR. Stærkest evidensbase i TNBC",      note: "Signifikant forbedret pCR i neoadjuvant setting. Multiple fase 2+3 studier.",  inter: "Undgå ved eGFR < 30 ml/min.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+triple+negative+breast+cancer" },
            { name: "Ivermectin",             ev: "p12", mech: "PAK1-hæmning → WNT og β-catenin ↓ og HIF-1α ↓",                          note: "Fase 2 pilot (Retsky et al.) — 12 mg/dag kombineret med neoadjuvant kemo.",    inter: "Lav toksicitet.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=ivermectin+triple+negative+breast+cancer" },
            { name: "Doxycyclin",             ev: "p12", mech: "Hæmmer mitokondrie-biogenese → rammer energiproduktionen i stammeceller", note: "Doxycyclin + vitamin C synergistisk (Lisanti-gruppen). Fase 2 igangværende.",  inter: "Lysoverfølsomhed. Ikke under graviditet.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=doxycycline+triple+negative+breast+cancer+stem" },
            { name: "Hydroxychloroquin (HCQ)",ev: "p12", mech: "Lysosomhæmning → blokerer autopagi",                                      note: "Synergistisk med kemo og metformin. Fase 2: HCQ + abraxane ved metastatisk TNBC.", inter: "⚠️ QT-forlængelse. EKG obligatorisk inden opstart.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+TNBC" },
            { name: "Mebendazol",             ev: "pre", mech: "Tubulin-polymerisationshæmmer → mitosehæmning → apoptose. Reducerer VEGF-A", note: "Stærk præklinisk evidens. Isolerede case reports med respons.",              inter: "God tolerabilitet. Monitorér LFT.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=mebendazole+triple+negative+breast" },
            { name: "2-DG (2-Deoxyglukose)", ev: "pre", mech: "Kompetitiv glykolysehæmmer — særlig relevant pga. ekstrem Warburg",       note: "Fase 1 data tilgængeligt.",                                                     inter: "⚠️ Hypoglykæmi-risiko. Tæt blodsukker-monitorering.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=2-deoxyglucose+triple+negative+breast" },
          ],
          supplements: [
            { name: "Curcumin (liposomal/nano)", dose: "500–2.000 mg/dag",                       ev: "p12", mech: "NF-κB hæmning, PI3K og AKT ↓, apoptose-induktion",                    inter: "Let blødningsforstærkende" },
            { name: "Vitamin C (IV høj dosis)",  dose: "25–75 g IV 2–3x/uge (onkolog-supervision)", ev: "p12", mech: "Pro-oxidant via ROS → selektiv celledød mod glykolytiske celler",  inter: "⚠️ Kontraindiceret ved G6PD-mangel" },
            { name: "Quercetin",                 dose: "500–1.000 mg/dag",                       ev: "pre", mech: "GLUT1-hæmmer → reducerer glukoseoptagelse i TNBC-celler",              inter: "Kan hæmme CYP3A4" },
            { name: "Melatonin",                 dose: "10–40 mg/aften",                         ev: "p12", mech: "Anti-Warburg: reducerer LDHA og GLUT1-ekspression",                    inter: "Sederende. Ingen alvorlige kendte interaktioner" },
            { name: "Omega-3 (EPA/DHA)",         dose: "2–3 g/dag",                              ev: "p12", mech: "Anti-inflammatorisk, modulerer tumor-mikroenvironment",                 inter: "Let blødningsforstærkende perioperativt" },
          ],
          biomarkers: [
            { name: "BRCA1/2 (germline + somatisk)", why: "~25% BRCA1-muteret → olaparib godkendt. VIGTIGSTE test — bør bestilles straks",        crit: true },
            { name: "PD-L1 (CPS score)",             why: "CPS ≥ 10 → pembrolizumab indiceret (KEYNOTE-522). Kan være livsforlængende",           crit: true },
            { name: "TIL (%)",                        why: "TIL ≥ 30% = bedre prognose og immunterapi-respons",                                    crit: false },
            { name: "HRD-score",                      why: "Åbner for PARP-hæmmer selv uden BRCA-mutation",                                       crit: false },
            { name: "PALB2 og RAD51C/D",              why: "Andre HRD-gener — samme PARP-implikationer som BRCA1/2",                              crit: false },
            { name: "EGFR amplifikation",             why: "Potentielt target i basallignende TNBC (~14%)",                                        crit: false },
            { name: "PIK3CA og PTEN-tab",             why: "PTEN-tab hyppigt (~35%) — relevant for PI3K-hæmmer-studier",                         crit: false },
          ],
          trials: [
            { name: "Metformin + neoadjuvant kemo", phase: "Fase 2–3", status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=triple+negative+breast+cancer&term=metformin" },
            { name: "Ivermectin + kemo",            phase: "Fase 2",   status: "Rekrutterer",  url: "https://clinicaltrials.gov/search?cond=triple+negative+breast+cancer&term=ivermectin" },
            { name: "HCQ + abraxane (mTNBC)",       phase: "Fase 2",   status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=triple+negative+breast+cancer&term=hydroxychloroquine" },
            { name: "Alle aktive TNBC studier",     phase: "Alle",     status: "–",            url: "https://clinicaltrials.gov/search?cond=triple+negative+breast+cancer&type=Interventional&recrs=a" },
          ],
        },
        {
          id: "tnbc_im", name: "Immunomodulatorisk", badge: "Høj TIL — immunresponsiv", badgeColor: T.green,
          criteria: "ER− / PR− / HER2− / TIL ≥ 30% / PD-L1 ekspression",
          biology: {
            summary: "Immunomodulatorisk TNBC er kendetegnet ved høj infiltration af T-celler og NK-celler og udtryk af PD-L1. Disse tumorer responderer bedst på immunterapi.",
            pathways: [
              { name: "PD-1/PD-L1",   role: "Primær immunflugtsmekanisme — angrebspunkt for checkpoint-hæmmere", level: "Høj" },
              { name: "JAK/STAT",     role: "Aktiveret af det inflammatoriske cytokinmiljø",                      level: "Moderat-høj" },
              { name: "cGAS/STING",   role: "Immunaktivering — kan moduleres farmakologisk",                      level: "Moderat" },
              { name: "Aerob glykolyse", role: "Moderat — lavere end basallignende",                              level: "Moderat" },
            ],
            mutations: ["TP53 (~70%)", "TMB-høj i delmængde", "PD-L1-amplifikation"],
          },
          offLabel: [
            { name: "Low Dose Naltrexon (LDN)", ev: "p12", mech: "TLR4-antagonisme → øger NK-celleaktivitet, reducerer MDSC",           note: "3–4,5 mg/aften. Fase 2 igangværende.",   inter: "⚠️ Opioid-medicin absolut kontraindiceret.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=low+dose+naltrexone+cancer" },
            { name: "Cimetidin",                ev: "p12", mech: "H2-receptor-antagonist → reducerer MDSC → øger anti-tumor immunrespons", note: "800 mg/dag brugt i studier.",            inter: "Interagerer med CYP450 — tjek polyfarmaci.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=cimetidine+cancer+immune" },
            { name: "Metformin",                ev: "p12", mech: "Reducerer MDSC og nedregulerer PD-L1-ekspression",                     note: "Synergistisk med pembrolizumab præklinisk.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+immunotherapy+breast+cancer" },
          ],
          supplements: [
            { name: "Reishi (Ganoderma lucidum)",              dose: "1.000–2.000 mg/dag",   ev: "pre", mech: "Aktiverer NK-celler og dendritiske celler via beta-glucaner", inter: "Let blødningsforstærkende" },
            { name: "Vitamin D3",                              dose: "2.000–5.000 IE/dag",   ev: "p12", mech: "Modulerer T-celledifferentiering og PD-L1-regulering",         inter: "Ingen kendte alvorlige" },
            { name: "Probiotika (Lactobacillus/Bifidobacterium)", dose: "10–50 mia. CFU/dag", ev: "p12", mech: "Mikrobiomet er afgørende for immunterapi-respons",             inter: "Ingen kendte alvorlige" },
          ],
          biomarkers: [
            { name: "TIL (%)",           why: "≥ 30% definerer subtypen og forudsiger immunterapi-respons",      crit: true },
            { name: "PD-L1 (CPS score)", why: "CPS ≥ 10 = pembrolizumab indiceret (KEYNOTE-522)",               crit: true },
            { name: "TMB",               why: "Høj TMB → bedre immunterapi-respons",                             crit: false },
            { name: "MSI-status",        why: "MSI-H åbner for pembrolizumab uanset tumortype",                  crit: false },
          ],
          trials: [
            { name: "KEYNOTE-522 (Pembrolizumab + kemo)", phase: "Fase 3", status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT03036488" },
            { name: "LDN + immunterapi",                  phase: "Fase 2", status: "Rekrutterer",         url: "https://clinicaltrials.gov/search?cond=triple+negative+breast&term=naltrexone" },
            { name: "Alle immunterapi TNBC studier",      phase: "Alle",   status: "–",                   url: "https://clinicaltrials.gov/search?cond=triple+negative+breast+cancer&term=immunotherapy&type=Interventional&recrs=a" },
          ],
        },
        {
          id: "tnbc_lar", name: "LAR (Androgenreceptor-positiv)", badge: "AR+ — hormon-sensitivt TNBC", badgeColor: T.purple,
          criteria: "ER− / PR− / HER2− / AR+ (≥10% ekspression)",
          biology: {
            summary: "LAR-TNBC er paradoksalt hormon-sensitiv via androgenreceptoren (AR). AR erstatter ER som proliferationsdrivende receptor. PIK3CA er muteret i ~50%.",
            pathways: [
              { name: "AR-signalering",    role: "Primær driver — analogt med ER i Luminal",          level: "Høj" },
              { name: "PI3K/AKT",         role: "Hyppigt ko-aktiveret — ~50% PIK3CA-mutation",        level: "Høj" },
              { name: "WNT/β-catenin",    role: "Sekundær aktivering",                                level: "Moderat" },
              { name: "Aerob glykolyse",  role: "Lavere end basallignende",                           level: "Lav-moderat" },
            ],
            mutations: ["PIK3CA (~50%)", "AR amplifikation", "PTEN-tab"],
          },
          offLabel: [
            { name: "Bicalutamid",  ev: "p12", mech: "AR-antagonist → blokerer androgendriven proliferation direkte",      note: "Fase 2 (TBCRC011): klinisk benefit rate 19%.",    inter: "LFT-monitorering. Let QT-forlængende.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=bicalutamide+triple+negative+breast+cancer" },
            { name: "Enzalutamid",  ev: "p12", mech: "Næste-generations AR-antagonist. Markant stærkere AR-blokade",       note: "Fase 2 (TBCRC023): benefit rate 25% ved AR+ TNBC.", inter: "⚠️ Stærk CYP3A4-inducer — tjek alle interaktioner.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=enzalutamide+AR+triple+negative+breast" },
            { name: "Metformin",    ev: "p12", mech: "AMPK og mTOR-hæmning — supplerer AR-blokade",                        note: "Kombinationsstudier igangværende.",               inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+LAR+TNBC" },
          ],
          supplements: [
            { name: "Omega-3",    dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk",             inter: "Let blødningsrisiko perioperativt" },
            { name: "Vitamin D3", dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-proliferativ via VDR",       inter: "Ingen kendte alvorlige" },
          ],
          biomarkers: [
            { name: "AR (IHC)",          why: "≥ 10% nukleær ekspression definerer LAR-subtypen og forudsiger AR-antagonist-respons", crit: true },
            { name: "PIK3CA mutation",   why: "~50% muteret — kombinationsstudier med PI3K-hæmmer + enzalutamid",                    crit: true },
            { name: "PTEN-tab",          why: "Alternativ PI3K-aktiveringsmekanisme",                                                 crit: false },
          ],
          trials: [
            { name: "Enzalutamid + PI3K-hæmmer — LAR", phase: "Fase 2", status: "Afsluttet", url: "https://clinicaltrials.gov/search?cond=AR+triple+negative+breast&term=enzalutamide" },
            { name: "Alle AR+ TNBC studier",           phase: "Alle",   status: "–",         url: "https://clinicaltrials.gov/search?cond=triple+negative+breast+cancer&term=androgen+receptor" },
          ],
        },
      ],
    },

    // ── IBC ───────────────────────────────────────────────────────────────────
    {
      id:   "ibc",
      name: "Inflammatorisk (IBC)",
      color: "#c0392b",
      pct:  "~1–5% — sjælden, meget aggressiv",
      subtypes: [
        {
          id: "ibc_main", name: "Inflammatorisk Brystkræft", badge: "Sjælden — ekstremt aggressiv", badgeColor: "#c0392b",
          criteria: "Klinisk diagnose: erytem ≥ 1/3 af brystet, peau d'orange, hurtig debut < 6 måneder",
          biology: {
            summary: "IBC er defineret klinisk, ikke histologisk. RhoC-GTPase er markant overudtrykt og driver invasion i dermale lymfekarre. CDH1 overudtrykkes paradoksalt og muliggør lymfekar-tumorboli. COX-2/PGE2 opretholder det inflammatoriske mikromiljø. Median overlevelse 2–4 år.",
            pathways: [
              { name: "RhoC og ROCK",  role: "Central driver for invasion af dermale lymfekarre",              level: "Ekstremt høj" },
              { name: "COX-2/PGE2",   role: "Opretholder inflammatorisk mikromiljø og lymfangiogenese",       level: "Høj" },
              { name: "EGFR og HER2", role: "Overudtrykt i ~40% — primært behandlingstårget",                 level: "Høj" },
              { name: "WNT/β-catenin",role: "Stemness og invasivitet",                                        level: "Høj" },
              { name: "Aerob glykolyse", role: "Høj proliferationsdrevet Warburg",                            level: "Høj" },
            ],
            mutations: ["RhoC overekspression", "CDH1 overekspression", "HER2 amplifikation (~40%)", "TP53", "MYC amplifikation"],
          },
          offLabel: [
            { name: "Celecoxib",         ev: "p12", mech: "Selektiv COX-2-hæmmer → reducerer PGE2, VEGF og lymfangiogenese", note: "Stærkt biologisk rationale for IBC. Fase 2 studier igangværende. 400 mg/dag.", inter: "⚠️ Kardiovaskulær risiko ved langtidsbrug. GI-beskyttelse anbefales.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=celecoxib+inflammatory+breast+cancer" },
            { name: "Statin (Simvastatin)", ev: "pre", mech: "Hæmmer RhoC-GTPase via GGPP-hæmning — direkte hit på IBC's drivermolekyle", note: "Stærkt præklinisk rationale.", inter: "Standard statin-forholdsregler.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+RhoC+breast+cancer" },
            { name: "Metformin",          ev: "p12", mech: "AMPK → reducerer energiaftryk og modulerer RhoC-relaterede veje",              note: "Inkluderet i IBC-kombinationsprotokoller.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+inflammatory+breast+cancer" },
          ],
          supplements: [
            { name: "Omega-3 (EPA/DHA)",   dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk — modvirker COX-2/PGE2",           inter: "Let blødningsforstærkende" },
            { name: "Curcumin (liposomal)", dose: "500–1.000 mg/dag",   ev: "pre", mech: "NF-κB og COX-2 hæmning synergistisk med celecoxib", inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "HER2 (IHC + FISH)",     why: "HER2+ IBC (~40%) behandles med trastuzumab — afgørende at teste straks", crit: true },
            { name: "ER / PR",               why: "Afgør om endokrin behandling er relevant",                               crit: true },
            { name: "CDH1 (E-cadherin, IHC)",why: "Overekspression bekræfter IBC-diagnose histologisk",                     crit: false },
            { name: "PD-L1 (CPS)",           why: "Relevant ved TNBC-IBC til immunterapi",                                 crit: false },
            { name: "RhoC ekspression",      why: "Central i IBC-biologi. Ikke rutine endnu men bør efterspørges",         crit: false },
          ],
          trials: [
            { name: "Celecoxib + neoadjuvant kemo (IBC)", phase: "Fase 2", status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=inflammatory+breast+cancer&term=celecoxib" },
            { name: "Alle aktive IBC studier",            phase: "Alle",   status: "–",            url: "https://clinicaltrials.gov/search?cond=inflammatory+breast+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};
