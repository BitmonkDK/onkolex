import { T } from "../../theme.js";

// ─── Prostatakræft (C61) ──────────────────────────────────────────────────────

export const prostatakraeft = {
  id:    "prostatakraeft",
  name:  "Prostatakræft",
  icd10: "C61",
  icon:  "🔵",
  intro: "Prostatakræft er den hyppigste kræftform hos mænd. Forløbet varierer fra meget langsomt til ekstremt aggressivt. Hormonresistens (kastration-resistens) er den centrale biologiske udfordring.",

  groups: [

    // ── LOKALISERET ───────────────────────────────────────────────────────────
    {
      id:   "lokaliseret",
      name: "Lokaliseret prostatakræft",
      color: T.blue,
      pct:  "~60% ved diagnose",
      subtypes: [

        {
          id: "lav_risiko", name: "Lav–intermediær risiko", badge: "Aktiv overvågning mulig", badgeColor: T.green,
          criteria: "Gleason ≤ 7 (3+4) / PSA < 20 / cT1–T2 / ISUP grade gruppe 1–2",
          biology: {
            summary: "Lav-risiko prostatakræft er typisk langsomt voksende og drevet af androgenreceptoren (AR). PTEN-tab forekommer i ~20% og signalerer mere aggressivt forløb. Metabolisk er energiforbruget domineret af lipidsyntetase (FASN) og oxidativ phosphorylering — modsat andre kræftformer anvender prostatakræft fedtsyrer som primær energikilde.",
            pathways: [
              { name: "AR-signalering",   role: "Primær driver — androgen-stimuleret proliferation",               level: "Høj" },
              { name: "PI3K/AKT/mTOR",   role: "Aktiveret ved PTEN-tab (~20% ved lav risiko)",                    level: "Moderat" },
              { name: "FASN (lipidsyntese)", role: "Overudtrykt — prostatakræft bruger fedtsyrer som primær energi", level: "Høj" },
              { name: "OXPHOS",           role: "Relativt høj afhængighed sammenlignet med Warburg",               level: "Moderat-høj" },
              { name: "Aerob glykolyse",  role: "Lav ved lav-risiko — øges ved progression",                      level: "Lav" },
            ],
            mutations: ["PTEN-tab (~20%)", "SPOP mutation (~10%)", "CHD1 deletion", "TP53 (~5% lav risiko)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer FASN-drevet lipidsyntese og mTOR. Reducerer IGF-1 og insulin der driver AR-signalering", note: "Epidemiologiske studier: mænd på metformin har 30–40% lavere prostatakræft-risiko. Fase 2 ved aktiv overvågning igangværende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+prostate+cancer+active+surveillance" },
            { name: "Aspirin",    ev: "p12", mech: "COX-2 hæmning → reducerer PGE2 og inflammatorisk tumor-mikroenvironment. Anti-proliferativ via thrombocytternes PDGF-frigivelse", note: "Observationsstudier: 20–30% reduceret risiko for aggressiv prostatakræft. Ikke bekræftet i RCT.", inter: "Blødningsrisiko.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+prostate+cancer" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer androgen-biosyntese fra kolesterol. FASN-hæmning via mevalonat-depletion", note: "Robuste epidemiologiske data: statin-brugere har lavere prostatakræft-mortalitet. Stærkest for lipofil statin.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+prostate+cancer+low+risk" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag",  ev: "p12", mech: "VDR-aktivering hæmmer AR-ekspression og celledeling. Mænd med lav D3 har øget risiko for aggressiv prostatakræft", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",           ev: "p12", mech: "Anti-inflammatorisk, COX-2-hæmning. Modulerer FASN-aktivitet",                                                      inter: "Let blødningsforstærkende" },
            { name: "Pomegranate (granatæble)", dose: "500 mg ekstrakt/dag", ev: "p12", mech: "Ellagsyre hæmmer AR-aktivitet, FASN og NF-κB. PSA-doblingstid forlænges i kliniske studier",               inter: "Ingen kendte alvorlige" },
            { name: "Grøn te (EGCG)",    dose: "400–800 mg/dag",      ev: "p12", mech: "EGCG hæmmer AR-aktivitet og mTOR. Reducerer PSA-stigning i fase 2",                                                inter: "Høje doser: let hepatotoksisk" },
          ],
          biomarkers: [
            { name: "PSA (total + fri %)",    why: "Basis for risikostratificering og monitorering. Fri PSA % < 10% = høj risiko for aggressiv sygdom",     crit: true },
            { name: "Gleason / ISUP grade",   why: "Vigtigste histologiske prognostiske markør. Grade 1 = lav risiko. Grade 4–5 = høj risiko",              crit: true },
            { name: "PTEN (IHC/FISH)",        why: "Tab = aggressivt forløb, øget risiko for biokemisk recidiv. Indikerer PI3K-hæmmer-relevans",           crit: false },
            { name: "Prolaris / Decipher",    why: "Genomiske risikotest — afgør om aktiv overvågning er forsvarlig vs. aktiv behandling",                 crit: false },
            { name: "mpMRI (multiparametrisk)", why: "PI-RADS score guider biopsi og staging. PI-RADS 4–5 = høj sandsynlighed for klinisk signifikant kræft", crit: true },
          ],
          trials: [
            { name: "Metformin ved aktiv overvågning",   phase: "Fase 2", status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=prostate+cancer&term=metformin+active+surveillance" },
            { name: "Alle aktive lav-risiko studier",    phase: "Alle",   status: "–",            url: "https://clinicaltrials.gov/search?cond=low+risk+prostate+cancer&type=Interventional&recrs=a" },
          ],
        },

        {
          id: "hoj_risiko", name: "Høj-risiko lokaliseret", badge: "Kurativt potentiale", badgeColor: T.amber,
          criteria: "Gleason ≥ 8 / PSA > 20 / cT3–T4 / ISUP grade gruppe 4–5",
          biology: {
            summary: "Høj-risiko lokaliseret prostatakræft har ~50% risiko for biokemisk recidiv efter radikal behandling. TP53-mutation og RB1-tab er hyppige og signalerer hormonresistens-potentiale. FASN overudtrykkes massivt og lipidmetabolisme er primær energikilde. AR-signalering er fortsat central.",
            pathways: [
              { name: "AR-signalering",   role: "Fortsat primær driver — men med tegn på ligand-uafhængig aktivering", level: "Ekstremt høj" },
              { name: "FASN/lipidsyntese",role: "Massivt overudtrykt — primær energikilde ved aggressiv prostatakræft", level: "Høj" },
              { name: "PI3K/AKT/mTOR",   role: "Aktiveret via PTEN-tab (~40% ved høj risiko)",                       level: "Høj" },
              { name: "RAS/MAPK",        role: "Øget aktivering ved aggressiv sygdom",                               level: "Moderat-høj" },
              { name: "Aerob glykolyse",  role: "Øges ved progression — GLUT1 opreguleret",                          level: "Moderat" },
            ],
            mutations: ["PTEN-tab (~40%)", "TP53 (~30%)", "RB1-tab (~15%)", "BRCA2 (~10%)", "CDK12 mutation"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer FASN, mTOR og AR-signaleringsnetværket. Reducerer anabolisme der driver aggressiv vækst", note: "Fase 2: metformin + hormonbehandling ved høj-risiko prostatakræft. Lovende data.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+high+risk+prostate+cancer" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer kolesterol-til-androgen-omdannelse. Reducerer FASN-afhængiged",            note: "Retrospektive data: lavere recidivrisiko hos høj-risiko patienter på statin.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+high+risk+prostate+cancer" },
            { name: "HCQ",        ev: "pre", mech: "Autopagi-hæmning synergistisk med strålebehandling — blokerer stråleresistensmekanisme via autopagi",    note: "Præklinisk synergi med strålebehandling. Kliniske studier mangler.", inter: "⚠️ QT-forlængelse. EKG.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+prostate+cancer+radiation" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag",  ev: "p12", mech: "Hæmmer AR-aktivitet og FASN. Radiosensibiliserende effekt via VDR",  inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",           ev: "p12", mech: "Anti-inflammatorisk, FASN-modulering",                                inter: "Let blødningsforstærkende" },
            { name: "Grøn te (EGCG)",    dose: "400–800 mg/dag",      ev: "p12", mech: "EGCG radiosensibiliserer og hæmmer AR-aktivitet",                    inter: "Høje doser: let hepatotoksisk" },
          ],
          biomarkers: [
            { name: "BRCA2 (germline + somatisk)", why: "~10% muteret — PARP-hæmmer (olaparib) indiceret ved metastatisk CRPC. Gentestning vigtig",         crit: true },
            { name: "CDK12 mutation",              why: "Biallel tab → høj TMB-lignende fænotype → immunterapi-respons mulig",                              crit: false },
            { name: "PTEN-tab (IHC/FISH)",         why: "Svækker kurativ behandling — PI3K-hæmmer relevant ved progression",                               crit: false },
            { name: "Decipher genomisk test",      why: "Forudsiger metastaserisiko og guider adjuverende behandlingsbeslutning",                           crit: true },
          ],
          trials: [
            { name: "Alle aktive høj-risiko studier", phase: "Alle", status: "–", url: "https://clinicaltrials.gov/search?cond=high+risk+prostate+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    // ── HORMON-SENSITIV METASTATISK ───────────────────────────────────────────
    {
      id:   "mhspc",
      name: "Hormon-sensitiv metastatisk (mHSPC)",
      color: T.amber,
      pct:  "~25% ved diagnose — stiger",
      subtypes: [
        {
          id: "mhspc_main", name: "Metastatisk hormon-sensitiv", badge: "Intensiveret kombinationsbehandling", badgeColor: T.amber,
          criteria: "Fjernmetastaser / endnu testosteron-sensitiv / kastrationsbehandling effektiv",
          biology: {
            summary: "mHSPC er stadie hvor tumoren stadig responderer på androgendeprivation (ADT). Men ADT-monoterapi er ikke tilstrækkeligt — dobbelt eller triple kombinationer (ADT + enzalutamid/apalutamid + docetaxel) er nuværende standard. AR-signalering er fortsat primær driver, men kloner med AR-amplifikation og ligand-uafhængig aktivering opstår løbende.",
            pathways: [
              { name: "AR-signalering",         role: "Primær driver — fortsat androgen-afhængig",                  level: "Ekstremt høj" },
              { name: "FASN/lipidsyntese",       role: "Driver androgen-biosyntese fra kolesterol in situ",          level: "Høj" },
              { name: "PI3K/AKT/mTOR",          role: "Ko-aktiveret — driver AR-uafhængig overlevelse",             level: "Moderat-høj" },
              { name: "Aerob glykolyse",         role: "Øget ved metastatisk sygdom",                               level: "Moderat-høj" },
              { name: "WNT/β-catenin",          role: "Aktiveres ved ADT — driver kastrations-tolerance",           level: "Moderat" },
            ],
            mutations: ["AR amplifikation (tidlig opstående)", "PTEN-tab (~35%)", "TP53 (~25%)", "BRCA2 (~10%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer FASN og in-situ androgen-biosyntese. Reducerer IGF-1/insulin der genaktiverer AR under ADT", note: "Randomiserede fase 2 data: metformin + ADT forbedrer PSA-respons og forlænger tid til kastrations-resistens.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+mHSPC+prostate" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → bloker kolesterol → reducerer FASN-drevet androgen-de-novo-syntese. Synergistisk med enzalutamid", note: "Retrospektive data: signifikant forbedret overlevelse ved mHSPC på statin + ADT.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+metastatic+hormone+sensitive+prostate" },
            { name: "Aspirin",    ev: "p12", mech: "COX-2 hæmning → reducerer PGE2 der stimulerer AR-signalering under ADT. Anti-platelet effekt reducerer metastase-vækst", note: "Observationsdata: lavere mortalitet ved mHSPC + aspirin.", inter: "Blødningsrisiko.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+metastatic+prostate+cancer" },
          ],
          supplements: [
            { name: "Vitamin D3",         dose: "2.000–5.000 IE/dag",  ev: "p12", mech: "ADT medfører D3-mangel og øget frakturrisiko. D3 er kritisk. Anti-AR effekt via VDR", inter: "Ingen kendte alvorlige — ANBEFALES til alle på ADT" },
            { name: "Calcium + K2",       dose: "1.000 mg Ca + 100 µg K2/dag", ev: "p12", mech: "ADT giver osteoporose — calcium og K2 dirigerer kalk til knogler frem for arterier", inter: "Ingen kendte alvorlige ved anbefalede doser" },
            { name: "Omega-3 (EPA/DHA)",  dose: "2–3 g/dag",           ev: "p12", mech: "Anti-inflammatorisk. Reducerer cardiovaskulær risiko der øges ved ADT",               inter: "Let blødningsforstærkende" },
            { name: "Pomegranate (granatæble)", dose: "500 mg/dag",    ev: "p12", mech: "Ellagsyre hæmmer AR direkte og reducerer androgen-biosyntese. PSA-stabiliserende",     inter: "Ingen kendte alvorlige" },
          ],
          biomarkers: [
            { name: "BRCA1/2 + HRR-panel (germline + somatisk)", why: "~15% HRR-muteret ved mHSPC — olaparib indiceret ved progression til mCRPC",          crit: true },
            { name: "AR-V7 (blod)",      why: "Splicingvariant der giver ligand-uafhængig AR-aktivering. Forudsiger enzalutamid-resistens",                  crit: false },
            { name: "PSA kinetik (PSADT)", why: "PSA-doblingstid < 6 mdr = aggressivt forløb der kræver intensiveret behandling",                           crit: true },
            { name: "ctDNA (NGS)",        why: "Monitorerer klonal evolution og resistensudvikling løbende under behandling",                                crit: false },
          ],
          trials: [
            { name: "ENZAMET (Enzalutamid + ADT)",     phase: "Fase 3",  status: "Positiv", url: "https://clinicaltrials.gov/study/NCT02446405" },
            { name: "Metformin + enzalutamid (mHSPC)", phase: "Fase 2",  status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=mHSPC&term=metformin" },
            { name: "Alle aktive mHSPC studier",       phase: "Alle",    status: "–",        url: "https://clinicaltrials.gov/search?cond=hormone+sensitive+metastatic+prostate&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    // ── KASTRATIONSRESISTENT ──────────────────────────────────────────────────
    {
      id:   "crpc",
      name: "Kastrationsresistent (CRPC)",
      color: T.rose,
      pct:  "Næsten alle metastatiske patienter progredierer hertil",
      subtypes: [

        {
          id: "mcrpc", name: "Metastatisk CRPC (mCRPC)", badge: "AR-resistent mekanisme", badgeColor: T.rose,
          criteria: "Kastreret testosteronniveau < 50 ng/dL / PSA-progression / klinisk progression",
          biology: {
            summary: "mCRPC er det stadie hvor prostatakræften er vokset til trods for kastreret testosteronniveau. Mekanismerne er mangfoldige: AR-amplifikation, AR-splicingvarianter (AR-V7), ligand-uafhængig AR-aktivering via kinaser, og intratumoral de-novo androgensyntese. FASN-aktiviteten er ekstremt høj. BRCA1/2-mutationer (~15%) åbner for PARP-hæmmere.",
            pathways: [
              { name: "AR-amplifikation/AR-V7", role: "Primær resistensmekanisme — AR aktiveres uden ligand",                level: "Ekstremt høj" },
              { name: "FASN/de novo androgen",  role: "Intratumoral androgen-syntese fra kolesterol opretholder AR",         level: "Ekstremt høj" },
              { name: "PI3K/AKT",              role: "PTEN-tab i ~50% mCRPC — AR-uafhængig overlevelse",                   level: "Høj" },
              { name: "Neuroendokrin trans.",  role: "Opstår som resistens mod AR-hæmmere (~20% ved sen CRPC)",             level: "Moderat-høj" },
              { name: "WNT/β-catenin",         role: "Aktiveres som AR-bypass-mekanisme",                                   level: "Moderat" },
            ],
            mutations: ["AR amplifikation (~60%)", "AR-V7 splicingvariant (~40%)", "PTEN-tab (~50%)", "BRCA2 (~15%)", "RB1-tab (~20%)", "TP53 (~40%)"],
          },
          offLabel: [
            { name: "Metformin",          ev: "p12", mech: "AMPK → hæmmer FASN-drevet de novo androgen-syntese og mTOR. Synergi med enzalutamid og kabazitaxel", note: "Randomiseret fase 2: metformin + enzalutamid ved mCRPC — forbedret PFS. Større fase 3 igangværende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+mCRPC+prostate+cancer" },
            { name: "Statin",             ev: "p12", mech: "Mevalonat → bloker kolesterol → reducerer FASN-drevet androgen-de-novo-syntese. Reducerer RAS/RHO-aktivering", note: "Robuste observationsdata: lavere mCRPC-mortalitet hos statin-brugere.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+mCRPC" },
            { name: "HCQ",                ev: "p12", mech: "Autopagi-hæmning — kritisk overlevelsesmekanisme i AR-V7+ celler under enzalutamid. Genopretter enzalutamid-sensitivitet", note: "Fase 1/2: HCQ + enzalutamid ved mCRPC. Tidlige data lovende.", inter: "⚠️ QT-forlængelse. EKG.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+castration+resistant+prostate" },
            { name: "Itraconazol",        ev: "p12", mech: "Hæmmer Hedgehog-signalvej og VEGFR-2 anti-angiogenetisk. Lavt kolesterol → reducerer FASN-adrogensyntese", note: "Fase 2: itraconazol ved mCRPC — PSA-respons og PFS-forbedring. 200–400 mg/dag.", inter: "⚠️ Stærk CYP3A4-hæmmer — tjek alle interaktioner nøje.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=itraconazole+castration+resistant+prostate+cancer" },
            { name: "Disulfiram (Antabus)", ev: "pre", mech: "Hæmmer NF-κB og proteasomet → reducerer AR-proteinstabilitet. Kræver kobbertilskud som kofaktor", note: "Præklinisk stærk evidens i AR-V7+ celler. Kliniske studier rekrutterer.", inter: "⚠️ ABSOLUT KI: alkohol. LFT-monitorering.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=disulfiram+prostate+cancer" },
          ],
          supplements: [
            { name: "Vitamin D3",         dose: "2.000–5.000 IE/dag",   ev: "p12", mech: "Hæmmer AR-ekspression. ADT-induceret osteoporose forebyggelse kritisk ved mCRPC",           inter: "Ingen kendte alvorlige — anbefales til alle" },
            { name: "Calcium + K2",       dose: "1.000 mg Ca + 100 µg K2", ev: "p12", mech: "Knogle-beskyttelse ved ADT og bone-targeting-behandling (radium-223)",                   inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)",  dose: "2–3 g/dag",            ev: "p12", mech: "Anti-inflammatorisk, reducerer kardiovaskulær risiko og modulerer AR-aktivitet",            inter: "Let blødningsforstærkende" },
            { name: "Melatonin",          dose: "10–20 mg/aften",        ev: "p12", mech: "Hæmmer AR-aktivitet og FASN-ekspression. Pro-apoptotisk i AR-V7+ cellelinjer",             inter: "Sederende effekt" },
          ],
          biomarkers: [
            { name: "AR-V7 (blod/cirkulerende tumorceller)", why: "AR-V7+ = enzalutamid og abirateron sjældent effektivt. Skift til taxan-kemoterapi anbefales", crit: true },
            { name: "BRCA1/2 + HRR-panel (germline + somatisk)", why: "~15% BRCA2-muteret → olaparib/rucaparib godkendt. Vigtigste biomarkør ved mCRPC",         crit: true },
            { name: "PTEN-tab (IHC/FISH)", why: "PTEN-tab → ipatasertib (AKT-hæmmer) studier. Kombineres med enzalutamid",                                      crit: false },
            { name: "CDK12 biallel tab",   why: "Høj neoantigenbelastning → immunterapi-respons mulig (pembrolizumab tumor-agnostisk)",                          crit: false },
            { name: "PSA-doblingstid",     why: "< 3 mdr = ekstremt aggressivt forløb. Kræver hurtig behandlingseskalering",                                    crit: true },
            { name: "LDH + ALP",           why: "Forhøjet LDH og ALP = dårlig prognose og knogle-progression. Basisblodprøver",                                 crit: false },
          ],
          trials: [
            { name: "PROfound (Olaparib ved HRR-muteret mCRPC)", phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT02987543" },
            { name: "Metformin + enzalutamid (mCRPC)",           phase: "Fase 2",  status: "Igangværende",        url: "https://clinicaltrials.gov/search?cond=mCRPC&term=metformin" },
            { name: "HCQ + enzalutamid (AR-V7+ mCRPC)",         phase: "Fase 1–2",status: "Rekrutterer",         url: "https://clinicaltrials.gov/search?cond=castration+resistant+prostate&term=hydroxychloroquine" },
            { name: "Itraconazol ved mCRPC",                     phase: "Fase 2",  status: "Igangværende",        url: "https://clinicaltrials.gov/search?cond=castration+resistant+prostate&term=itraconazole" },
            { name: "Alle aktive mCRPC studier",                 phase: "Alle",    status: "–",                   url: "https://clinicaltrials.gov/search?cond=metastatic+castration+resistant+prostate&type=Interventional&recrs=a" },
          ],
        },

        {
          id: "nepc", name: "Neuroendokrin prostatakræft (NEPC)", badge: "AR-negativ — ekstremt aggressiv", badgeColor: "#c0392b",
          criteria: "AR-negativ / neuroendokrin markører positive (Synaptophysin, Chromogranin A, NSE) / opstår som resistens mod AR-hæmmere",
          biology: {
            summary: "NEPC er en sjælden men ekstremt aggressiv trans-differentiering af prostatakræft der opstår under selektionspres fra potente AR-hæmmere (enzalutamid, apalutamid). Tumorcellerne mister AR-ekspression og aktiverer neuroendokrine overlevelsesprogrammer. N-MYC-amplifikation er en nøgledrivkraft. Median OS under 12 måneder. Cisplatinbaseret kemoterapi er eneste mulighed.",
            pathways: [
              { name: "AURKA/N-MYC",      role: "Primær driver af neuroendokrin trans-differentiering",            level: "Ekstremt høj" },
              { name: "EZH2 (epigenetisk)", role: "Epigenetisk repressor der slukker AR og luminal differentiering", level: "Høj" },
              { name: "SOX2/ASCL1",       role: "Neuroendokrin stamcellefaktorer — driver aggressiv fænotype",     level: "Høj" },
              { name: "BCL-2 anti-apoptose", role: "Overudtrykt — giver kemoresistens",                            level: "Høj" },
              { name: "mTOR",             role: "Konstitutivt aktiveret — driver neuroendokrin overlevelse",       level: "Moderat-høj" },
            ],
            mutations: ["RB1-tab (~70%)", "TP53 (~70%)", "AURKA/N-MYC amplifikation (~40%)", "EZH2-overekspression", "AR-tab"],
          },
          offLabel: [
            { name: "Metformin",  ev: "pre", mech: "AMPK → hæmmer N-MYC-drevet mTOR og EZH2-overekspression. Kan reducere neuroendokrin trans-differentiering", note: "Præklinisk evidens. Kliniske data mangler specifikt for NEPC.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+neuroendocrine+prostate" },
            { name: "Itraconazol", ev: "pre", mech: "Hedgehog-hæmning — Hedgehog-vejen driver NEPC-overlevelse. Anti-AURKA-effekt beskrevet", note: "Præklinisk rationale. Kliniske data meget begrænsede.", inter: "⚠️ Stærk CYP3A4-hæmmer.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=itraconazole+neuroendocrine+prostate" },
          ],
          supplements: [
            { name: "Melatonin",   dose: "10–20 mg/aften", ev: "pre", mech: "MT1/MT2-receptorer udtrykt i neuroendokrine celler — anti-proliferativ og pro-apoptotisk", inter: "Sederende effekt" },
            { name: "Omega-3",     dose: "2–3 g/dag",      ev: "p12", mech: "Anti-inflammatorisk — reducerer kemo-bivirkninger og inflammatorisk mikromiljø",         inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "Synaptophysin + Chromogranin A (IHC)", why: "Bekræfter neuroendokrin differentiering histologisk. Begge markører bør testes",                crit: true },
            { name: "N-MYC / AURKA (FISH)",                why: "Amplifikation hos ~40% — target for alisertib (Aurora kinase-hæmmer) i studier",                crit: false },
            { name: "AR-ekspression (IHC)",                why: "AR-negativitet bekræfter NEPC — enzalutamid/apalutamid er ineffektivt",                         crit: true },
            { name: "Serum Chromogranin A",                why: "Blodmarkør der monitorerer NEPC-aktivitet. Forhøjet = dårlig prognose",                         crit: false },
          ],
          trials: [
            { name: "Alisertib (Aurora hæmmer) ved NEPC", phase: "Fase 2",  status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=neuroendocrine+prostate&term=alisertib" },
            { name: "Alle aktive NEPC studier",           phase: "Alle",    status: "–",            url: "https://clinicaltrials.gov/search?cond=neuroendocrine+prostate+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};
