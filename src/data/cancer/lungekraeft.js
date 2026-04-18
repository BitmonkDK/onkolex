import { T } from "../../theme.js";

// ─── Lungekræft (C34) ─────────────────────────────────────────────────────────

export const lungekraeft = {
  id:    "lungekraeft",
  name:  "Lungekræft",
  icd10: "C34",
  icon:  "🫁",
  intro: "Lungekræft er den hyppigste kræftdødsårsag på verdensplan. Biologien adskiller sig drastisk mellem NSCLC og SCLC — og inden for NSCLC er drivermutationen afgørende for behandlingsvalg.",

  groups: [

    // ── NSCLC ─────────────────────────────────────────────────────────────────
    {
      id:   "nsclc",
      name: "NSCLC (Ikke-småcellet)",
      color: T.blue,
      pct:  "~85% af alle lungekræfttilfælde",
      subtypes: [

        // Adenokarcinom — EGFR-muteret
        {
          id: "adeno_egfr", name: "Adenokarcinom — EGFR-muteret", badge: "Targetbar mutation", badgeColor: T.green,
          criteria: "Adenokarcinom / EGFR exon 19 deletion eller exon 21 L858R mutation",
          biology: {
            summary: "EGFR-muteret adenokarcinom er den hyppigste drivermutation i vestlig NSCLC (~15%) og endnu hyppigere i asiatisk befolkning (~50%). EGFR-mutationen aktiverer PI3K/AKT/mTOR og RAS/MAPK konstant uden ligandbinding. Energistofskiftet er moderat Warburg-præget med høj OXPHOS-aktivitet. Osimertinib (3. gen. EGFR-hæmmer) er standardbehandling ved tidlig og avanceret sygdom.",
            pathways: [
              { name: "EGFR/ErbB1",     role: "Primær driver — konstitutiv aktivering via exon 19/21 mutation",  level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",  role: "Downstream af EGFR — næsten universelt aktiveret",               level: "Høj" },
              { name: "RAS/MAPK/ERK",   role: "Parallel EGFR-downstream vej",                                   level: "Høj" },
              { name: "OXPHOS",         role: "Relativt høj OXPHOS-afhængighed sammenlignet med andre NSCLC",    level: "Moderat-høj" },
              { name: "Aerob glykolyse", role: "Moderat Warburg-effekt",                                         level: "Moderat" },
            ],
            mutations: ["EGFR exon 19 del (~45% af EGFR+)", "EGFR L858R (~40% af EGFR+)", "TP53 (~50%)", "PIK3CA (~5%)", "T790M (erhvervet resistens mod 1.-2. gen.)"],
          },
          offLabel: [
            { name: "Metformin",       ev: "p12", mech: "AMPK → mTOR-hæmning downstream af EGFR. Reducerer insulinniveauer der ellers aktiverer IGF-1R og omgår EGFR-blokade", note: "Observationsstudier viser forbedret overlevelse ved EGFR+ NSCLC på osimertinib + metformin. Fase 2 studier igangværende.", inter: "Undgå ved eGFR < 30 ml/min.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+EGFR+lung+cancer" },
            { name: "Statin (Simvastatin)", ev: "p12", mech: "Mevalonat-hæmning → reducerer RAS-membrananchoring → svækker RAS/MAPK-signalering downstream af EGFR", note: "Retrospektive studier: forbedret overlevelse ved NSCLC på EGFR-hæmmere + statin.", inter: "Myopati-risiko. LFT-monitorering.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+EGFR+lung+cancer" },
            { name: "Hydroxychloroquin (HCQ)", ev: "p12", mech: "Autopagi-hæmning — autopagi er primær resistensmekanisme mod EGFR-hæmmere. HCQ genopretter følsomhed", note: "Fase 1/2 kombinationsstudier med osimertinib igangværende ved erhvervet resistens.", inter: "⚠️ QT-forlængelse. EKG inden opstart.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+EGFR+lung" },
            { name: "Doxycyclin",      ev: "pre", mech: "Hæmmer mitokondrie-biogenese og matrix metalloproteinaser (MMP) → reducerer invasion og metastase", note: "Præklinisk synergi med EGFR-hæmmere i resistente cellelinjer.", inter: "Lysoverfølsomhed. Ikke under graviditet.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=doxycycline+NSCLC+EGFR" },
          ],
          supplements: [
            { name: "Vitamin D3",       dose: "2.000–5.000 IE/dag",  ev: "p12", mech: "VDR-aktivering hæmmer EGFR-ekspression og øger apoptose i EGFR+ celler",        inter: "Ingen kendte alvorlige interaktioner" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, modulerer lipid-rafts og EGFR-membranfunktion",             inter: "Let blødningsforstærkende perioperativt" },
            { name: "Quercetin",        dose: "500–1.000 mg/dag",    ev: "pre", mech: "Hæmmer EGFR-kinaseaktivitet direkte og reducerer PI3K-aktivering",               inter: "Kan hæmme CYP3A4 — tjek interaktioner" },
            { name: "Curcumin (liposomal)", dose: "500–1.000 mg/dag", ev: "pre", mech: "NF-κB hæmning og direkte EGFR-downregulering i cellelinjer",                   inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "EGFR mutation (tumor + ctDNA)", why: "Afgørende for EGFR-hæmmer-valg. Exon 19 del og L858R = osimertinib. ctDNA til monitorering af resistens", crit: true },
            { name: "T790M mutation (ctDNA)",        why: "Erhvervet resistens mod 1.-2. gen. EGFR-hæmmere. Indikerer skift til osimertinib",                          crit: true },
            { name: "C797S mutation (ctDNA)",        why: "Erhvervet resistens mod osimertinib — kræver ny behandlingsstrategi",                                        crit: false },
            { name: "MET amplifikation",             why: "Hyppig resistensmekanisme mod EGFR-hæmmere. Åbner for MET-hæmmer + EGFR-hæmmer kombination",               crit: false },
            { name: "PD-L1 (TPS %)",                 why: "Relevant ved resistens — immunterapi-mulighed hvis TPS ≥ 50%",                                              crit: false },
            { name: "ALK / ROS1 (FISH + NGS)",       why: "Udelukker overlappende driver-mutationer — kritisk for korrekt behandlingsvalg",                            crit: true },
          ],
          trials: [
            { name: "Metformin + osimertinib (EGFR+)", phase: "Fase 2",  status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=EGFR+lung+cancer&term=metformin" },
            { name: "HCQ + osimertinib (resistens)",   phase: "Fase 1–2",status: "Rekrutterer",   url: "https://clinicaltrials.gov/search?cond=EGFR+lung+cancer&term=hydroxychloroquine" },
            { name: "Alle aktive EGFR NSCLC studier",  phase: "Alle",    status: "–",             url: "https://clinicaltrials.gov/search?cond=EGFR+non-small+cell+lung&type=Interventional&recrs=a" },
          ],
        },

        // Adenokarcinom — ALK-rearrangeret
        {
          id: "adeno_alk", name: "Adenokarcinom — ALK-rearrangeret", badge: "Targetbar fusion", badgeColor: T.green,
          criteria: "Adenokarcinom / ALK-fusionsgen (EML4-ALK hyppigst) påvist ved FISH eller NGS",
          biology: {
            summary: "ALK-rearrangeret NSCLC udgør ~5% af NSCLC og rammer typisk yngre, ikke-rygere. EML4-ALK fusionsproteinet aktiverer PI3K/AKT, MAPK og JAK/STAT konstant. Alectinib (2. gen.) og lorlatinib (3. gen.) er standardbehandlinger. Energistofskiftet er domineret af aerob glykolyse og lipidsyntetase-aktivitet.",
            pathways: [
              { name: "ALK-fusionsprotein",  role: "Primær driver — konstitutiv kinaseaktivering via EML4-ALK",  level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",       role: "Downstream af ALK",                                          level: "Høj" },
              { name: "JAK/STAT3",           role: "Aktiveres direkte af ALK-fusion",                            level: "Høj" },
              { name: "RAS/MAPK/ERK",        role: "Parallel ALK-downstream vej",                                level: "Moderat-høj" },
              { name: "Aerob glykolyse",     role: "Moderat-høj Warburg",                                        level: "Moderat-høj" },
            ],
            mutations: ["ALK-rearrangement (EML4-ALK ~75%)", "TP53 (~25%)", "ALK G1202R (erhvervet resistens)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → mTOR-hæmning downstream af ALK. Reducerer IGF-1R cross-aktivering der driver ALK-hæmmer resistens", note: "Kombinationsstudier med alectinib igangværende.", inter: "Undgå ved eGFR < 30.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+ALK+lung+cancer" },
            { name: "Statin",     ev: "pre", mech: "Mevalonat-hæmning → reducerer RAS-aktivering downstream af ALK-fusion", note: "Præklinisk synergi med crizotinib.", inter: "Standard statin-forholdsregler.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+ALK+lung" },
            { name: "HCQ",        ev: "pre", mech: "Autopagi-hæmning synergistisk med ALK-hæmmere — blokerer resistensmekanisme", note: "Præklinisk evidens. Kliniske studier mangler.", inter: "⚠️ QT-forlængelse. EKG inden opstart.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=autophagy+ALK+lung" },
          ],
          supplements: [
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",         ev: "p12", mech: "Anti-inflammatorisk, modulerer JAK/STAT-signalering", inter: "Let blødningsforstærkende" },
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Hæmmer JAK/STAT og PI3K i ALK+ cellelinjer",          inter: "Ingen kendte alvorlige" },
          ],
          biomarkers: [
            { name: "ALK (FISH + IHC + NGS)", why: "Bekræfter ALK-rearrangement. NGS foretrækkes — identificerer fusionspartner og resistensmutationer",  crit: true },
            { name: "ALK G1202R / I1171N (ctDNA)", why: "Erhvervede resistensmutationer mod 2. gen. → skift til lorlatinib",                               crit: false },
            { name: "EGFR / KRAS / ROS1",    why: "Udelukker overlappende drivere — kritisk for korrekt behandling",                                       crit: true },
            { name: "PD-L1 (TPS)",           why: "Generelt lavt i ALK+ men relevant ved resistens",                                                       crit: false },
          ],
          trials: [
            { name: "Alle aktive ALK NSCLC studier", phase: "Alle", status: "–", url: "https://clinicaltrials.gov/search?cond=ALK+non-small+cell+lung&type=Interventional&recrs=a" },
          ],
        },

        // Adenokarcinom — KRAS G12C
        {
          id: "adeno_kras", name: "Adenokarcinom — KRAS G12C", badge: "Ny targetbar mutation", badgeColor: T.amber,
          criteria: "Adenokarcinom / KRAS G12C mutation (~13% af NSCLC)",
          biology: {
            summary: "KRAS G12C er den hyppigste KRAS-mutation i NSCLC og historisk 'undruggable'. Sotorasib og adagrasib er de første godkendte KRAS G12C-hæmmere. KRAS G12C er konstitutivt aktiv i GDP-bundet form og driver RAS/MAPK og PI3K massivt. Energistofskiftet er stærkt Warburg-præget med høj glykolyse.",
            pathways: [
              { name: "KRAS G12C/RAS",    role: "Primær driver — konstitutiv RAS-aktivering",             level: "Ekstremt høj" },
              { name: "RAS/MAPK/ERK",     role: "Primær downstream vej",                                  level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",    role: "Parallel downstream aktivering",                         level: "Høj" },
              { name: "Aerob glykolyse",  role: "Stærkt Warburg-præget",                                  level: "Høj" },
              { name: "Autopagi",         role: "Overlevelsesmekanisme — angrebspunkt for HCQ",           level: "Høj" },
            ],
            mutations: ["KRAS G12C (~13% af NSCLC)", "STK11/LKB1 (~30% ko-mutation — resistens)", "KEAP1 (~20% ko-mutation — resistens)", "TP53 (~50%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK aktivering → hæmmer mTOR og RAS-signalering. STK11-muterede tumorer mister LKB1-AMPK-akse — metformin kan genoprette AMPK-signalering", note: "Særlig relevant ved STK11/LKB1 ko-mutation som driver resistens mod sotorasib.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+KRAS+lung+cancer" },
            { name: "HCQ",        ev: "p12", mech: "Autopagi-hæmning — KRAS-muterede tumorer er stærkt autopagi-afhængige for overlevelse under sotorasib-behandling", note: "Fase 1/2: HCQ + sotorasib ved KRAS G12C NSCLC igangværende.", inter: "⚠️ QT-forlængelse. EKG.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+KRAS+lung" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer GGPP → hæmmer RAS-membrananchoring direkte", note: "Biologisk stærkt rationale ved KRAS-mutation.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+KRAS+lung+cancer" },
            { name: "Ivermectin", ev: "pre", mech: "PAK1-hæmning → reducerer RAS/MAPK-signalering og WNT", note: "Præklinisk evidens i KRAS-muterede NSCLC-cellelinjer.", inter: "Lav toksicitet.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=ivermectin+KRAS+lung" },
          ],
          supplements: [
            { name: "Quercetin",         dose: "500–1.000 mg/dag",   ev: "pre", mech: "Hæmmer RAS-MAPK-signalering og reducerer aerob glykolyse via GLUT1",  inter: "Kan hæmme CYP3A4" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, modulerer RAS-membranlokalisering via lipid-rafts", inter: "Let blødningsforstærkende" },
            { name: "Curcumin",          dose: "500–1.000 mg/dag",   ev: "pre", mech: "RAS/MAPK og NF-κB hæmning i KRAS-muterede cellelinjer",                inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "KRAS G12C (NGS + ctDNA)", why: "Bekræfter mutation og åbner for sotorasib/adagrasib. ctDNA monitorerer behandlingsrespons",      crit: true },
            { name: "STK11/LKB1 mutation",     why: "Ko-mutation hos ~30% — driver primær resistens mod sotorasib OG immunterapi. Kritisk prognostisk", crit: true },
            { name: "KEAP1 mutation",           why: "Ko-mutation hos ~20% — driver resistens. Dobbelt STK11+KEAP1 = meget dårlig prognose",           crit: false },
            { name: "PD-L1 (TPS)",             why: "STK11-muterede tumorer er typisk PD-L1 lave — immunterapi sjældent effektivt",                   crit: false },
            { name: "TMB",                     why: "Høj TMB kan indikere immunterapi-respons ved KRAS G12C uanset PD-L1",                            crit: false },
          ],
          trials: [
            { name: "HCQ + sotorasib (KRAS G12C)",    phase: "Fase 1–2", status: "Rekrutterer",   url: "https://clinicaltrials.gov/search?cond=KRAS+G12C+lung&term=hydroxychloroquine" },
            { name: "Alle aktive KRAS G12C studier",  phase: "Alle",     status: "–",             url: "https://clinicaltrials.gov/search?cond=KRAS+G12C+non-small+cell+lung&type=Interventional&recrs=a" },
          ],
        },

        // Planocellulært karcinom
        {
          id: "plano", name: "Planocellulært karcinom", badge: "PD-L1 målretning vigtig", badgeColor: T.blue,
          criteria: "Planocellulært karcinom / EGFR-ALK-KRAS negativ / hyppigt hos rygere",
          biology: {
            summary: "Planocellulært NSCLC udgør ~25–30% af NSCLC og ses næsten udelukkende hos rygere. Karakteristisk er FGFR1-amplifikation, PIK3CA-mutation og høj SOX2-ekspression. Energistofskiftet er stærkt glykolytisk. Targetbare mutationer er sjældne — immunterapi (pembrolizumab) er hjørnestenen ved høj PD-L1.",
            pathways: [
              { name: "FGFR1/MAPK",       role: "Hyppigt amplificeret (~20%) — driver proliferation",            level: "Moderat-høj" },
              { name: "PI3K/AKT/mTOR",    role: "PIK3CA muteret i ~15%",                                        level: "Moderat-høj" },
              { name: "PD-1/PD-L1",       role: "Hyppigt overudtrykt — primær immunflugtsmekanisme",            level: "Høj" },
              { name: "Aerob glykolyse",  role: "Stærkt Warburg-præget — højere end adenokarcinom",             level: "Høj" },
              { name: "NF-κB",            role: "Konstitutivt aktiveret — driver overlevelse og resistens",     level: "Moderat-høj" },
            ],
            mutations: ["TP53 (~80%)", "FGFR1 amplifikation (~20%)", "PIK3CA (~15%)", "SOX2 amplifikation", "CDKN2A tab", "NFE2L2/KEAP1"],
          },
          offLabel: [
            { name: "Metformin",            ev: "p12", mech: "AMPK → hæmmer aerob glykolyse og mTOR. Reducerer PD-L1-ekspression på tumorceller → synergi med pembrolizumab", note: "Kombinationsstudier med pembrolizumab igangværende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+squamous+cell+lung" },
            { name: "Aspirin",              ev: "p12", mech: "COX-2 hæmning → reducerer PGE2 der immunsupprimerer tumor-mikroenvironment", note: "Observationsdata: forbedret overlevelse ved NSCLC på immuncheckpoint + aspirin.", inter: "Blødningsrisiko.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+immunotherapy+lung" },
            { name: "Statin",              ev: "p12", mech: "Mevalonat-hæmning → reducerer NF-κB og RAS/MAPK signalering", note: "Epidemiologiske data lovende i planocellulært NSCLC.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+squamous+lung+cancer" },
            { name: "Mebendazol",          ev: "pre", mech: "Tubulin-hæmmer → mitosestop → apoptose. Reducerer VEGF-A og angiogenese", note: "Præklinisk evidens i NSCLC. Case reports med klinisk respons.", inter: "God tolerabilitet. LFT-monitorering.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=mebendazole+non-small+cell+lung" },
          ],
          supplements: [
            { name: "Vitamin D3",         dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-proliferativ, modulerer PD-L1-ekspression og immunmikromiljø",    inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)",  dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, hæmmer COX-2/PGE2 i tumor-mikroenvironment",       inter: "Let blødningsforstærkende" },
            { name: "Curcumin",           dose: "500–1.000 mg/dag",   ev: "pre", mech: "NF-κB hæmning, reducerer glykolyse og VEGF",                           inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "PD-L1 (TPS %)",         why: "TPS ≥ 50% = pembrolizumab monoterapi. TPS 1–49% = kombination. Vigtigste biomarkør i planocellulært", crit: true },
            { name: "TMB",                   why: "Høj TMB (~10 mut/Mb) → bedre immunterapi-respons uafhængigt af PD-L1",                                 crit: false },
            { name: "FGFR1 amplifikation",   why: "Åbner for FGFR-hæmmere i kliniske studier",                                                            crit: false },
            { name: "PIK3CA mutation",       why: "Potentiel target for PI3K-hæmmere",                                                                    crit: false },
            { name: "NGS full panel",        why: "Udelukker EGFR/ALK/ROS1/KRAS — sjældne men targetbare i planocellulært",                              crit: true },
          ],
          trials: [
            { name: "Metformin + pembrolizumab (NSCLC)",  phase: "Fase 2", status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=squamous+cell+lung&term=metformin" },
            { name: "Alle aktive planocellulære studier", phase: "Alle",   status: "–",            url: "https://clinicaltrials.gov/search?cond=squamous+cell+lung+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    // ── SCLC ──────────────────────────────────────────────────────────────────
    {
      id:   "sclc",
      name: "SCLC (Småcellet)",
      color: T.rose,
      pct:  "~15% af alle lungekræfttilfælde",
      subtypes: [

        {
          id: "sclc_es", name: "SCLC — Udbredt stadium", badge: "Dårligst prognose", badgeColor: T.rose,
          criteria: "Småcellet lungekræft / metastaser uden for ipsilateral hemithorax (ES-SCLC)",
          biology: {
            summary: "SCLC er den mest aggressive lungetumor med neuroendokrin oprindelse. RB1- og TP53-tab er næsten universelle (~90%). Energistofskiftet er ekstremt glykolytisk og glutaminolytisk — cellerne er stærkt afhængige af hurtig ATP-produktion. Initialrespons på platinbaseret kemoterapi er god, men recidiv er næsten uundgåeligt inden for 6–12 måneder. Atezolizumab til PD-L1+ patienter forbedrer overlevelse moderat.",
            pathways: [
              { name: "MYC-amplifikation",  role: "Driver massiv proliferation — MYC, MYCL eller MYCN",            level: "Ekstremt høj" },
              { name: "Aerob glykolyse",    role: "Ekstremt Warburg-præget — GLUT1 og LDHA massivt overudtrykt",   level: "Ekstremt høj" },
              { name: "Glutaminolyse",      role: "Sekundær energikilde — afgørende for TCA-cyklus",               level: "Høj" },
              { name: "Aurora kinase",      role: "Overudtrykt — driver genominstabilitet og hurtig deling",       level: "Høj" },
              { name: "BCL-2 anti-apoptose",role: "Overudtrykt — forhindrer programmeret celledød",               level: "Høj" },
              { name: "Autopagi",           role: "Survival-mekanisme under kemo-stress",                          level: "Moderat-høj" },
            ],
            mutations: ["TP53 (~90%)", "RB1 (~90%)", "MYC amplifikation (~20%)", "CREBBP/EP300", "NOTCH-vej inaktivering"],
          },
          offLabel: [
            { name: "Metformin",        ev: "p12", mech: "AMPK → hæmmer MYC-drevet aerob glykolyse og mTOR. Reducerer glutaminolyse indirekte via AMPK-aktivering", note: "Observationsstudier: forbedret overlevelse hos SCLC-patienter på metformin. Fase 2 igangværende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+small+cell+lung+cancer" },
            { name: "HCQ",              ev: "p12", mech: "Lysosomhæmning → blokerer autopagi → celler kan ikke recycle under kemo-stress. Synergi med platinkemo", note: "Fase 1/2: HCQ + carboplatin/etoposid ved ES-SCLC. Data lovende.", inter: "⚠️ QT-forlængelse. EKG obligatorisk.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+small+cell+lung" },
            { name: "Disulfiram (Antabus)", ev: "pre", mech: "Hæmmer NF-κB og ALDH (kræftstammeceller). Kobberkompleks forstærker effekten. Særlig aktiv i SCLC-stamceller", note: "Præklinisk stærk evidens. Kræver absolut alkohol-afholdenhed.", inter: "⚠️ ABSOLUT KI: alkohol. LFT-monitorering.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=disulfiram+small+cell+lung" },
            { name: "Itraconazol",      ev: "p12", mech: "Hedgehog-signalvejshæmmer → reducerer SCLC-stamcelle-populationen. Anti-angiogenetisk via VEGFR-hæmning", note: "Fase 2 data: itraconazol + kemo forbedret respons ved ES-SCLC.", inter: "⚠️ Stærk CYP3A4-hæmmer — tjek alle interaktioner. Leverskadelig ved høje doser.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=itraconazole+small+cell+lung+cancer" },
          ],
          supplements: [
            { name: "Melatonin",         dose: "10–40 mg/aften",       ev: "p12", mech: "Anti-MYC: reducerer MYC-ekspression og aerob glykolyse. Pro-apoptotisk i SCLC",      inter: "Sederende. Ingen alvorlige kendte interaktioner" },
            { name: "Vitamin C (IV)",    dose: "25–75 g IV (onkolog)", ev: "p12", mech: "Pro-oxidant via ROS → selektiv celledød i ekstremt glykolytiske SCLC-celler",       inter: "⚠️ Kontraindiceret ved G6PD-mangel" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",            ev: "p12", mech: "Anti-inflammatorisk, modulerer tumor-mikroenvironment og kemo-sensitivitet",         inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "PD-L1 (SP142)",      why: "PD-L1+ → atezolizumab + kemo (IMpower133). Moderat men signifikant OS-gevinst",                   crit: true },
            { name: "DLL3-ekspression",   why: "DLL3 overudtrykt i ~80% SCLC — target for rovalpituzumab og bispecifikke antistoffer (studier)", crit: false },
            { name: "MYC amplifikation",  why: "Ekstremt aggressivt forløb. Aurora kinase-hæmmere særlig relevante",                              crit: false },
            { name: "BCL-2 (IHC)",        why: "Overekspression → venetoclax-studier. Meget lovende i SCLC",                                     crit: false },
            { name: "RB1 / TP53 (NGS)",   why: "Bekræfter SCLC-diagnose molekylært. Relevant for subtypeidentifikation",                         crit: false },
          ],
          trials: [
            { name: "IMpower133 (Atezolizumab + kemo)",  phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT02763579" },
            { name: "HCQ + platinkemo (ES-SCLC)",        phase: "Fase 1–2",status: "Rekrutterer",         url: "https://clinicaltrials.gov/search?cond=small+cell+lung&term=hydroxychloroquine" },
            { name: "Itraconazol + kemo (SCLC)",         phase: "Fase 2",  status: "Igangværende",        url: "https://clinicaltrials.gov/search?cond=small+cell+lung&term=itraconazole" },
            { name: "Alle aktive SCLC studier",          phase: "Alle",    status: "–",                   url: "https://clinicaltrials.gov/search?cond=small+cell+lung+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};
