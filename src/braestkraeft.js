import { T } from "../../theme.js";

// ─── Æggestokkræft (C56) ─────────────────────────────────────────────────────

export const aeggestokkraeft = {
  id:    "aeggestokkraeft",
  name:  "Æggestokkræft",
  icd10: "C56",
  icon:  "🟣",
  intro: "Æggestokkræft diagnosticeres oftest i avanceret stadie og har høj recidivrate. BRCA1/2-testning er afgørende — mutation åbner for PARP-hæmmere der har forandret behandlingen fundamentalt.",

  groups: [

    // ── EPITELIAL ─────────────────────────────────────────────────────────────
    {
      id:   "epitelial",
      name: "Epitelial æggestokkræft (~90%)",
      color: T.purple,
      pct:  "~90% af alle æggestokkræfttilfælde",
      subtypes: [

        // Højgradig serøs
        {
          id: "hgsoc", name: "Højgradig serøs (HGSOC)", badge: "Hyppigst og mest aggressiv", badgeColor: T.rose,
          criteria: "Serøs histologi / højgradig (grad 2–3) / TP53 mutation næsten universel",
          biology: {
            summary: "HGSOC udgør ~70% af epitelial æggestokkræft og er karakteriseret ved genomisk ustabilitet, næsten universel TP53-mutation og høj BRCA1/2-mutation-frekvens (~25%). HRD (homologous recombination deficiency) er til stede hos ~50% og åbner for PARP-hæmmere. Energistofskiftet er domineret af aerob glykolyse og lipidsyntetase. Standard er debulking-kirurgi + platinbaseret kemo + PARP-hæmmer vedligehold.",
            pathways: [
              { name: "HRD/BRCA-mangelfuld",  role: "Til stede i ~50% — primær angrebspunkt for PARP-hæmmere",          level: "Høj" },
              { name: "PI3K/AKT/mTOR",        role: "Aktiveret i ~45% via PIK3CA, PTEN-tab eller AKT",                  level: "Høj" },
              { name: "FASN/lipidsyntese",     role: "Overudtrykt — lipidsyntetase driver membranlipid-produktion",      level: "Høj" },
              { name: "Aerob glykolyse",       role: "Stærkt Warburg-præget — GLUT1 og LDHA overudtrykt",              level: "Høj" },
              { name: "WNT/β-catenin",         role: "Aktiveret i delmængde — driver stamcelleegenskaber",              level: "Moderat" },
              { name: "VEGF/angiogenese",      role: "Stærkt angiogenetisk — bevacizumab er standardtilføjelse",        level: "Høj" },
              { name: "Autopagi",              role: "Overlevelsesmekanisme under kemo-stress",                         level: "Moderat-høj" },
            ],
            mutations: ["TP53 mutation (~96%)", "BRCA1 (~15%)", "BRCA2 (~10%)", "CCNE1 amplifikation (~20%)", "RB1-tab (~15%)", "NF1 mutation (~5%)", "CDK12 mutation (~3%)"],
          },
          offLabel: [
            {
              name: "Metformin", ev: "p12",
              mech: "AMPK → hæmmer FASN-drevet lipidsyntese, mTOR og PI3K/AKT. Reducerer VEGF-produktion. Synergistisk med PARP-hæmmere via BRCA2-AMPK interaktion",
              note: "Fase 2: metformin + kemo ved HGSOC — forbedret PFS i observationsstudier. Kombinationsstudier med olaparib igangværende.",
              inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+ovarian+cancer+HGSOC"
            },
            {
              name: "HCQ", ev: "p12",
              mech: "Autopagi-hæmning — HGSOC er stærkt autopagi-afhængig under platinkemo og PARP-hæmmer-behandling. Genopretter platinsensitivitet ved erhvervet resistens",
              note: "Fase 1/2: HCQ + carboplatin ved platinresistent HGSOC. Responsrate ~25% ved ellers ubehandlelig sygdom.",
              inter: "⚠️ QT-forlængelse. EKG obligatorisk.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+ovarian+cancer"
            },
            {
              name: "Statin (Simvastatin)", ev: "p12",
              mech: "Mevalonat-hæmning → reducerer FASN-afhængiged og RAS/RHO-aktivering. Reducerer VEGF og pleural-ascites-produktion. Synergi med platinkemo",
              note: "Meta-analyse: statin-brugere med ovarialkræft har signifikant bedre overlevelse. Stærkest evidensbase for statin i gynækologisk kræft.",
              inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+ovarian+cancer"
            },
            {
              name: "Aspirin", ev: "p12",
              mech: "COX-2 hæmning → reducerer PGE2-drevet immunsuppression i ascites-væske. Anti-VEGF effekt via thrombocythæmning. Reducerer NF-κB",
              note: "Observationsstudier: aspirin-brugere har lavere risiko for ovarialkræft og bedre prognose ved diagnose.",
              inter: "Blødningsrisiko. Monitorér HB.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+ovarian+cancer"
            },
            {
              name: "Doxycyclin", ev: "p12",
              mech: "Hæmmer MMP-2 og MMP-9 der driver HGSOC-peritoneal disseminering. Anti-angiogenetisk. Modulerer ascites-inflammation",
              note: "Fase 2: doxycyclin + platinkemo ved avanceret HGSOC. Reduktion i ascites-produktion observeret.",
              inter: "Lysoverfølsomhed. Ikke under graviditet.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=doxycycline+ovarian+cancer"
            },
          ],
          supplements: [
            { name: "Vitamin D3",         dose: "2.000–5.000 IE/dag",   ev: "p12", mech: "VDR-ekspression høj i ovarialtumorer. Anti-VEGF, anti-PI3K og forbedrer platinsensitivitet",              inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)",  dose: "3–4 g/dag",            ev: "p12", mech: "Anti-VEGF, COX-2-hæmning, reducerer peritoneal inflammation og ascites-volumen",                          inter: "Let blødningsforstærkende" },
            { name: "Melatonin",          dose: "20–40 mg/aften",        ev: "p12", mech: "Anti-Warburg: reducerer LDHA og GLUT1. Pro-apoptotisk i platinresistente HGSOC-cellelinjer",              inter: "Sederende" },
            { name: "Curcumin (liposomal)", dose: "500–2.000 mg/dag",   ev: "p12", mech: "NF-κB hæmning, PI3K/AKT ↓, VEGF ↓. Fase 2-data ved ovarialcancer",                                       inter: "Let blødningsforstærkende" },
            { name: "Quercetin",          dose: "500–1.000 mg/dag",      ev: "pre", mech: "GLUT1-hæmmer og anti-FASN. Reducerer platinresistens via MDR-hæmning",                                   inter: "Kan hæmme CYP3A4" },
          ],
          biomarkers: [
            { name: "BRCA1/2 (germline + somatisk)", why: "~25% muteret — olaparib/niraparib/rucaparib indiceret. VIGTIGSTE test. Germline = information til familie",            crit: true },
            { name: "HRD-score (Myriad MyChoice)",   why: "HRD+ uden BRCA-mutation (~25% ekstra) → PARP-hæmmer-respons. Samlet ~50% HRD-positiv i HGSOC",                       crit: true },
            { name: "PALB2, RAD51C/D, BRIP1",        why: "Andre HRR-gener med PARP-sensitivitet. Del af udvidet HRR-panel",                                                    crit: false },
            { name: "CA-125",                        why: "Primær monitoreringsmarkør. Ikke diagnostisk ved tidlig sygdom. HE4 kan supplere",                                   crit: true },
            { name: "CCNE1 amplifikation",           why: "Associeret med platinresistens og PARP-hæmmer-resistens. Prognostisk markør",                                        crit: false },
            { name: "CDK12 biallel tab",             why: "Høj neoantigenbelastning → immunterapi-respons mulig uanset PD-L1",                                                  crit: false },
            { name: "PD-L1 (CPS)",                  why: "Immunterapi-mulighed ved platinresistent HGSOC — pembrolizumab tumor-agnostisk ved TMB-høj",                         crit: false },
          ],
          trials: [
            { name: "SOLO-1 (Olaparib vedligehold BRCA+)",       phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT01844986" },
            { name: "PRIMA (Niraparib vedligehold HRD+)",         phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT02655016" },
            { name: "HCQ + carboplatin (platinresistent HGSOC)", phase: "Fase 1–2",status: "Igangværende",         url: "https://clinicaltrials.gov/search?cond=ovarian+cancer&term=hydroxychloroquine" },
            { name: "Metformin + olaparib (HGSOC)",              phase: "Fase 2",  status: "Rekrutterer",          url: "https://clinicaltrials.gov/search?cond=ovarian+cancer&term=metformin+olaparib" },
            { name: "Alle aktive HGSOC studier",                 phase: "Alle",    status: "–",                    url: "https://clinicaltrials.gov/search?cond=high+grade+serous+ovarian&type=Interventional&recrs=a" },
          ],
        },

        // Lavgradig serøs
        {
          id: "lgsoc", name: "Lavgradig serøs (LGSOC)", badge: "Hormon-sensitiv — RAS-drevet", badgeColor: T.amber,
          criteria: "Serøs histologi / lavgradig (grad 1) / KRAS eller BRAF mutation / TP53 wildtype",
          biology: {
            summary: "LGSOC er biologisk fundamentalt anderledes end HGSOC — langsomt voksende, RAS/MAPK-drevet og hormon-sensitiv. TP53 er wildtype. KRAS/BRAF/NRAS-mutationer er til stede i ~30%. MEK-hæmmere (trametinib) viser respons. Østrogen fremmer væksten — hormonbehandling (letrozol, tamoxifen) er et vigtigt supplement.",
            pathways: [
              { name: "RAS/MAPK/ERK", role: "Primær driver i ~30% via KRAS/BRAF/NRAS",                       level: "Høj" },
              { name: "ER-signalering", role: "Primær driver ved KRAS-wildtype — østrogendrevet vækst",       level: "Høj" },
              { name: "PI3K/AKT",     role: "Ko-aktiveret i ~30%",                                           level: "Moderat" },
              { name: "OXPHOS",       role: "Relativt høj OXPHOS — lavere Warburg end HGSOC",                level: "Moderat-høj" },
              { name: "Aerob glykolyse", role: "Lav-moderat",                                                level: "Lav-moderat" },
            ],
            mutations: ["KRAS (~20%)", "BRAF V600E (~10%)", "NRAS (~5%)", "ERBB2 amplifikation (~10%)", "NF1 mutation", "TP53 wildtype"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer RAS/MAPK og ER-drevet mTOR. Reducerer IGF-1 der driver ER-signalering",                note: "Fase 2: metformin + letrozol ved LGSOC. Biologisk stærkt rationale.",   inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+low+grade+serous+ovarian" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer RAS-membrananchoring og ER-biosyntese fra kolesterol", note: "Dual hit på begge drivere.",         inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+low+grade+serous+ovarian" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-ER og anti-MAPK effekt via VDR",        inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, COX-2-hæmning",         inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "KRAS/BRAF/NRAS (NGS)",     why: "RAS/MAPK-mutation → MEK-hæmmer (trametinib) indikation. BRAF V600E → BRAF-hæmmer relevant", crit: true },
            { name: "ER / PR (IHC)",            why: "Positiv → hormonbehandling (letrozol, tamoxifen) som vedligeholdelse eller 1. linje",          crit: true },
            { name: "BRCA1/2",                  why: "Sjælden i LGSOC men vigtig at teste",                                                         crit: false },
            { name: "CA-125",                   why: "Monitorering",                                                                                crit: false },
          ],
          trials: [
            { name: "GOG-0239 (Trametinib LGSOC)",     phase: "Fase 2",  status: "Positiv", url: "https://clinicaltrials.gov/study/NCT02101788" },
            { name: "Alle aktive LGSOC studier",        phase: "Alle",    status: "–",       url: "https://clinicaltrials.gov/search?cond=low+grade+serous+ovarian&type=Interventional&recrs=a" },
          ],
        },

        // Klarcelle
        {
          id: "ccc_ovar", name: "Klarcelle-karcinom", badge: "Platinresistent — immunterapi-mulighed", badgeColor: T.blue,
          criteria: "Klarcelle histologi / ARID1A mutation hyppig / PIK3CA mutation",
          biology: {
            summary: "Klarcelle ovarialkarcinom er biologisk distinkt fra serøs HGSOC — primær platinresistens er hyppig (~50%). ARID1A-mutation er karakteristisk og driver kromoatinremodellering. PIK3CA er muteret i ~33%. Energistofskiftet er unikt præget af glykogen-akkumulering (deraf 'klarcelle'-udseendet). PD-L1-ekspression er relativt høj — immunterapi kan være effektiv.",
            pathways: [
              { name: "PI3K/AKT/mTOR",      role: "Primær driver via PIK3CA (~33%)",                              level: "Høj" },
              { name: "ARID1A-tab/SWI-SNF", role: "Definerende — epigenetisk driver via kromatinremodellering",   level: "Høj" },
              { name: "HIF-1α",             role: "Stærkt aktiveret — driver glykogen-akkumulering",              level: "Høj" },
              { name: "PD-L1",             role: "Relativt høj ekspression — immunterapi-mulighed",              level: "Moderat-høj" },
              { name: "Glykogen-syntese",   role: "Karakteristisk energilager — 'klarcelle'-fænotypen",          level: "Høj" },
            ],
            mutations: ["ARID1A (~50%)", "PIK3CA (~33%)", "PTEN-tab (~15%)", "TP53 (~15% — lavere end HGSOC)", "KRAS (~5%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og PI3K/AKT. Reducerer HIF-1α-drevet glykogen-akkumulering og platinresistens",  note: "Biologisk stærkt rationale specifikt for klarcelle.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+clear+cell+ovarian" },
            { name: "HCQ",        ev: "p12", mech: "Autopagi-hæmning synergistisk med platinkemo. Klarcelle er stærkt autopagi-afhængig under platinstress", note: "Fase 1/2 igangværende.", inter: "⚠️ QT-forlængelse.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+clear+cell+ovarian" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer PI3K/AKT og HIF-1α",  note: "Biologisk rationale.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+clear+cell+ovarian" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Hæmmer HIF-1α og PI3K. Anti-proliferativ", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "3–4 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, reducerer HIF-1α",    inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "ARID1A (IHC/NGS)",      why: "Tab af ARID1A-ekspression bekræfter diagnosen og åbner for EZH2-hæmmere (syntetisk letalitet)",      crit: true },
            { name: "PIK3CA mutation",        why: "Åbner for PI3K/AKT/mTOR-hæmmere og metformin-rationale",                                           crit: true },
            { name: "PD-L1 (CPS)",           why: "Relativt høj i klarcelle — pembrolizumab-mulighed ved recidiv",                                     crit: false },
            { name: "MSI-H",                 why: "Sjælden men åbner for pembrolizumab",                                                               crit: false },
            { name: "BRCA1/2",               why: "Sjælden i klarcelle men skal testes",                                                               crit: false },
          ],
          trials: [
            { name: "Pembrolizumab + kemo (klarcelle)", phase: "Fase 2",  status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=clear+cell+ovarian&term=pembrolizumab" },
            { name: "Alle aktive klarcelle studier",    phase: "Alle",    status: "–",            url: "https://clinicaltrials.gov/search?cond=clear+cell+ovarian+cancer&type=Interventional&recrs=a" },
          ],
        },

        // Endometrioid
        {
          id: "endometrioid_ovar", name: "Endometrioid æggestokkræft", badge: "ARID1A + PI3K drevet", badgeColor: T.purple,
          criteria: "Endometrioid histologi / lavere grad end HGSOC / ARID1A og PIK3CA mutation hyppig",
          biology: {
            summary: "Endometrioid ovarialkarcinom ligner biologisk endometriekarcinom — ARID1A og PIK3CA-mutationer er hyppige. Det er generelt mindre aggressivt end HGSOC med bedre prognose ved tidlig sygdom. MSI-H ses i ~10–15% og åbner for immunterapi. TP53 er sjældent muteret.",
            pathways: [
              { name: "PI3K/AKT/mTOR", role: "Primær driver — PIK3CA muteret i ~40%",                  level: "Høj" },
              { name: "ARID1A/SWI-SNF",role: "Epigenetisk driver — tab i ~30%",                        level: "Moderat-høj" },
              { name: "WNT/β-catenin", role: "Aktiveret via CTNNB1 mutation i ~20%",                   level: "Moderat" },
              { name: "ER-signalering", role: "Østrogendrevet i delmængde — hormonbehandling mulig",    level: "Moderat" },
              { name: "Aerob glykolyse",role: "Moderat",                                                level: "Moderat" },
            ],
            mutations: ["PIK3CA (~40%)", "ARID1A (~30%)", "CTNNB1 (~20%)", "PTEN-tab (~20%)", "MSI-H (~15%)", "TP53 (~15%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer PI3K/AKT/mTOR og ER-drevet vækst",         note: "Biologisk rationale analogt med endometriekarcinom.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+endometrioid+ovarian" },
            { name: "Aspirin",    ev: "p12", mech: "COX-2 hæmning og anti-WNT/β-catenin effekt",              note: "Biologisk rationale.", inter: "Blødningsrisiko.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+endometrioid+ovarian" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-PI3K og anti-ER effekt",      inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, COX-2-hæmning", inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "MSI-H / dMMR",     why: "~15% — pembrolizumab indiceret ved recidiv (tumor-agnostisk)",    crit: true },
            { name: "PIK3CA mutation",  why: "Åbner for mTOR-hæmmere og metformin-rationale",                   crit: false },
            { name: "BRCA1/2",         why: "Sjælden men skal testes",                                          crit: false },
            { name: "ER / PR (IHC)",   why: "Positiv → hormonbehandling som vedligeholdelse mulighed",          crit: false },
          ],
          trials: [
            { name: "Alle aktive endometrioid ovariale studier", phase: "Alle", status: "–", url: "https://clinicaltrials.gov/search?cond=endometrioid+ovarian+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    // ── NON-EPITELIAL ─────────────────────────────────────────────────────────
    {
      id:   "non_epitelial",
      name: "Non-epitelial æggestokkræft (~10%)",
      color: T.green,
      pct:  "~10% af æggestokkræft",
      subtypes: [
        {
          id: "germcelle", name: "Germcelle tumor", badge: "Ung kvinde — god prognose ved behandling", badgeColor: T.green,
          criteria: "Germcelle oprindelse / dysgerminoma, teratom, endodermalt sinustumor / ung alder",
          biology: {
            summary: "Germcelletumorer opstår typisk hos unge kvinder og piger. Dysgerminoma (mest hyppig) er ekstremt kemosensitiv analogt med testikelcancer. KIT-mutation er til stede i ~25% af dysgerminoma. AFP (alfaføtoprotein) og β-hCG er vigtige tumormarkører. Platinbaseret BEP-kemoterapi giver >90% kur ved stadie I–III.",
            pathways: [
              { name: "KIT/SCF",          role: "Primær driver i dysgerminoma (~25% KIT-mutation)",          level: "Høj" },
              { name: "PI3K/AKT/mTOR",   role: "Ko-aktiveret downstream af KIT",                            level: "Moderat-høj" },
              { name: "OCT4/NANOG",      role: "Stamcellemarkeere — opretholder germcelle-fænotypen",       level: "Høj" },
              { name: "Aerob glykolyse",  role: "Moderat Warburg",                                          level: "Moderat" },
            ],
            mutations: ["KIT exon 17 mutation (~25%)", "KRAS mutation (teratom)", "TP53 (sjælden)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "pre", mech: "AMPK → hæmmer mTOR downstream af KIT. Potentielt synergistisk med KIT-hæmmere", note: "Præklinisk rationale. Kliniske data mangler specifikt for germcelletumorer.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+germ+cell+tumor+ovarian" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-proliferativ via VDR",    inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk",          inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "AFP (alfaføtoprotein)",   why: "Forhøjet ved endodermalt sinus tumor (yolk sac tumor) — primær markør",           crit: true },
            { name: "β-hCG",                  why: "Forhøjet ved dysgerminoma og blandede germcelletumorer",                           crit: true },
            { name: "LDH",                    why: "Forhøjet ved dysgerminoma — monitoreringsmarkør",                                  crit: false },
            { name: "KIT mutation (NGS)",     why: "KIT-mutation → imatinib-mulighed ved recidiv",                                    crit: false },
            { name: "Fertilitetsbevarelse",   why: "Ung alder — fertilitetssparende kirurgi (unilateral adnexektomi) bør overvejes",  crit: false },
          ],
          trials: [
            { name: "Alle aktive germcelle ovariale studier", phase: "Alle", status: "–", url: "https://clinicaltrials.gov/search?cond=ovarian+germ+cell+tumor&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};
