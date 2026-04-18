import { T } from "../../theme.js";

export const melanom = {
  id:    "melanom",
  name:  "Melanom",
  icd10: "C43",
  icon:  "🖤",
  intro: "Melanom er den mest dødelige hudkræft. BRAF V600-mutation er til stede i ~45% og åbner for kombineret BRAF/MEK-hæmning. Immunterapi (checkpoint-hæmmere) har transformeret prognosen ved metastatisk sygdom.",

  groups: [
    {
      id: "kutan", name: "Kutant Melanom (hud)", color: T.muted2, pct: "~90% af melanomer",
      subtypes: [
        {
          id: "braf_v600e", name: "BRAF V600E-muteret", badge: "Targetbar — dabrafenib + trametinib", badgeColor: T.green,
          criteria: "Kutan melanom / BRAF V600E mutation (~40–45%) / metastatisk eller høj-risiko stadium III–IV",
          biology: {
            summary: "BRAF V600E giver konstitutiv MAPK-aktivering der driver proliferation ukontrolleret. Kombineret BRAF+MEK-hæmning (dabrafenib+trametinib) giver ~70% responsrate og forbedret OS ved metastatisk sygdom. Resistens er uundgåeligt i de fleste tilfælde og opstår via RAS-mutation, MEK-amplifikation eller BRAF-amplifikation. Immunterapi (pembrolizumab/nivolumab) kombineres nu med BRAF/MEK-hæmning.",
            pathways: [
              { name: "BRAF V600E/MAPK",   role: "Primær driver — konstitutiv ERK-aktivering",                   level: "Ekstremt høj" },
              { name: "RAS/MEK/ERK",       role: "Downstream — altid aktiveret ved BRAF V600E",                 level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",     role: "Ko-aktiveret via PTEN-tab (~30%)",                            level: "Moderat-høj" },
              { name: "PD-L1",            role: "Induktion ved MAPK-aktivering — immunflugt",                  level: "Moderat-høj" },
              { name: "Aerob glykolyse",   role: "Stærkt Warburg-præget — BRAF driver GLUT1 og LDHA",          level: "Høj" },
              { name: "Autopagi",          role: "Resistensmekanisme mod BRAF/MEK-hæmmere",                    level: "Moderat-høj" },
            ],
            mutations: ["BRAF V600E (~80% af BRAF+)", "BRAF V600K (~15%)", "PTEN-tab (~30%)", "CDKN2A (~30%)", "TP53 (~15%)", "NF1 mutation (~15%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer BRAF/MEK-drevet aerob glykolyse og mTOR. Reducerer BRAF-hæmmer-resistens via AMPK-medieret BRAF-bypass hæmning", note: "Fase 2: metformin + dabrafenib/trametinib igangværende. Observationsdata: melanom-patienter på metformin lever længere.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+BRAF+melanoma" },
            { name: "HCQ",        ev: "p12", mech: "Autopagi-hæmning — primær resistensmekanisme mod BRAF-hæmmere er autopagi-drevet. HCQ genopretter dabrafenib-sensitivitet", note: "Fase 1/2: HCQ + dabrafenib/trametinib ved BRAF+ metastatisk melanom. Lovende data.", inter: "⚠️ QT-forlængelse. EKG.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+BRAF+melanoma" },
            { name: "Aspirin",    ev: "p12", mech: "COX-2 hæmning → reducerer PGE2 der aktiverer BRAF/MAPK og immunsupprimerer mikromiljøet. Synergistisk med immunterapi", note: "Observationsstudier: aspirin-brugere med melanom har forbedret overlevelse.", inter: "Blødningsrisiko.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+melanoma" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer RAS/MAPK og GGPP. Synergistisk med MEK-hæmmere. Proapoptotisk i BRAF-hæmmer-resistente celler", note: "Retrospektive data: statin-brugere med melanom har bedre overlevelse.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+melanoma" },
            { name: "Itraconazol",ev: "p12", mech: "Hedgehog-hæmning og anti-VEGFR. Hæmmer den phenotypiske plasticitet der driver BRAF-hæmmer-resistens", note: "Præklinisk stærk evidens. Fase 2 ved recidiverende BRAF+ melanom.", inter: "⚠️ CYP3A4-hæmmer — interagerer med dabrafenib og trametinib.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=itraconazole+melanoma" },
          ],
          supplements: [
            { name: "Vitamin D3",         dose: "2.000–5.000 IE/dag",   ev: "p12", mech: "Anti-MAPK og anti-PD-L1 effekt via VDR. Lav D3 = dårligere melanom-prognose og immunterapi-respons",         inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)",  dose: "3–4 g/dag",            ev: "p12", mech: "Anti-inflammatorisk, reducerer PGE2 og BRAF-drevet immunsuppression. Forbedrer immunterapi-respons",          inter: "Let blødningsforstærkende" },
            { name: "Melatonin",          dose: "20 mg/aften",          ev: "p12", mech: "MT1 receptorer udtrykt i melanomceller. Anti-MAPK og anti-Warburg. Reducerer BRAF V600E-ekspression i cellelinjer", inter: "Sederende" },
            { name: "Quercetin",          dose: "500–1.000 mg/dag",     ev: "pre", mech: "BRAF/MEK/ERK hæmning og GLUT1-inhibition",                                                                   inter: "Kan hæmme CYP3A4" },
          ],
          biomarkers: [
            { name: "BRAF V600E/K (NGS + ctDNA)", why: "Definerer behandling. V600E og V600K → dabrafenib+trametinib. ctDNA monitorerer resistensudvikling", crit: true },
            { name: "NRAS mutation",              why: "BRAF-wildtype (~20%) — NRAS-muteret melanom har begrænset targetabilitet",                          crit: true },
            { name: "PD-L1 (TPS/CPS)",           why: "Forudsiger immunterapi-respons — men negativt udelukker ikke respons",                              crit: false },
            { name: "TMB",                        why: "Høj TMB (soleksponeret melanom typisk høj) = bedre immunterapi-respons",                           crit: false },
            { name: "LDH",                        why: "Forhøjet LDH = dårlig prognose. Baseline-markør i alle staging-protokoller",                       crit: true },
            { name: "PTEN (IHC/NGS)",            why: "PTEN-tab = PI3K-hæmmer-mulighed og dårligere BRAF-hæmmer-respons",                                crit: false },
          ],
          trials: [
            { name: "COMBI-v (Dabrafenib+Trametinib)",    phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT01597908" },
            { name: "HCQ + BRAF/MEK-hæmning",            phase: "Fase 1–2",status: "Rekrutterer",         url: "https://clinicaltrials.gov/search?cond=BRAF+melanoma&term=hydroxychloroquine" },
            { name: "Metformin + dabrafenib/trametinib",  phase: "Fase 2",  status: "Igangværende",        url: "https://clinicaltrials.gov/search?cond=BRAF+melanoma&term=metformin" },
            { name: "Alle aktive BRAF melanom studier",   phase: "Alle",    status: "–",                   url: "https://clinicaltrials.gov/search?cond=BRAF+melanoma&type=Interventional&recrs=a" },
          ],
        },
        {
          id: "braf_wt_nras", name: "BRAF-wildtype / NRAS-muteret", badge: "Begrænset targetabilitet", badgeColor: T.amber,
          criteria: "Kutan melanom / BRAF-wildtype / NRAS mutation Q61 (~20%) / NF1 mutation (~15%)",
          biology: {
            summary: "BRAF-wildtype melanom mangler den klare targetbare mutation. NRAS-muteret melanom aktiverer RAS/MAPK og PI3K konstant men NRAS er 'undruggable' direkte. MEK-hæmmere alene giver kun ~20% respons. Immunterapi (kombineret anti-PD-1 + anti-CTLA-4) er hjørnestenen med ~50–60% responsrate.",
            pathways: [
              { name: "NRAS/RAS/MAPK",   role: "Primær driver via konstitutiv NRAS",                        level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",  role: "Ko-aktiveret downstream af NRAS",                           level: "Høj" },
              { name: "PD-1/PD-L1",     role: "Immunflugt — angrebspunkt for checkpoint-hæmmere",          level: "Høj" },
              { name: "Aerob glykolyse", role: "Stærkt Warburg-præget via NRAS",                           level: "Høj" },
            ],
            mutations: ["NRAS Q61K/R (~20%)", "NF1 mutation (~15%)", "CDKN2A (~30%)", "TP53 (~20%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer NRAS-drevet RAS/MAPK og mTOR. Reducerer Warburg-afhængiged. Synergistisk med MEK-hæmmere", note: "Biologisk stærkt rationale ved NRAS-muteret melanom.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+NRAS+melanoma" },
            { name: "Aspirin",    ev: "p12", mech: "COX-2 hæmning → reducerer PGE2-drevet immunsuppression. Synergistisk med pembrolizumab/nivolumab", note: "Observationsdata: aspirin forbedrer immunterapi-respons ved melanom.", inter: "Blødningsrisiko.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+immunotherapy+melanoma" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer NRAS-membrananchoring direkte. Proapoptotisk. Synergistisk med MEK-hæmmer", note: "Biologisk stærkt rationale ved NRAS-mutation.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+NRAS+melanoma" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-NRAS/MAPK og immunmodulerende. Forbedrer immunterapi-respons", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "3–4 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, forbedrer immunterapi via mikrobiomsignalering", inter: "Let blødningsforstærkende" },
            { name: "Probiotika",        dose: "10–50 mia. CFU/dag", ev: "p12", mech: "Mikrobiomet er afgørende for anti-PD-1-respons ved melanom. Bifidobacterium specifikt vigtig", inter: "Ingen kendte alvorlige" },
          ],
          biomarkers: [
            { name: "BRAF wildtype bekræftelse",    why: "BRAF-negativ bekræfter at BRAF-hæmmere er irrelevante",                                       crit: true },
            { name: "NRAS mutation (NGS)",          why: "NRAS+ → binimetinib (MEK-hæmmer) indiceret. Ekskluderer BRAF-hæmmere",                       crit: true },
            { name: "PD-L1 + TMB",                 why: "Dobbelt høj = bedst immunterapi-respons ved pembrolizumab/nivolumab",                        crit: false },
            { name: "LDH",                         why: "Forhøjet LDH = dårlig prognose. Baseline obligatorisk",                                       crit: true },
          ],
          trials: [
            { name: "NEMO (Binimetinib NRAS melanom)", phase: "Fase 3",  status: "Positiv", url: "https://clinicaltrials.gov/study/NCT01763164" },
            { name: "Alle aktive BRAF-wildtype studier", phase: "Alle",  status: "–",       url: "https://clinicaltrials.gov/search?cond=melanoma+BRAF+wild&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    {
      id: "uveal", name: "Uvealt Melanom (øje)", color: T.purple, pct: "~5% af melanomer",
      subtypes: [
        {
          id: "uveal_main", name: "Uvealt Melanom", badge: "GNAQ/GNA11-muteret — sværest behandlelig", badgeColor: T.rose,
          criteria: "Melanom udgående fra uvea (koroid, corpus ciliare, iris) / GNAQ eller GNA11 mutation",
          biology: {
            summary: "Uvealt melanom er biologisk fundamentalt anderledes end kutant melanom — BRAF-mutation er sjælden. GNAQ/GNA11-mutationer aktiverer PKC og MAPK via phospholipase Cβ. Metastatisk uvealt melanom har ekstremt dårlig prognose (~6–12 mdr) og reagerer meget dårligt på immunterapi. Tebentafusp (TCR-bispesifikt antistof) er første godkendte behandling specifikt for HLA-A*02:01+ uvealt melanom.",
            pathways: [
              { name: "GNAQ/GNA11/PKC", role: "Primær driver — konstitutiv PLCβ-aktivering via GNAQ/GNA11",  level: "Ekstremt høj" },
              { name: "RAS/MAPK/ERK",   role: "Downstream af GNAQ via RasGRP3",                              level: "Høj" },
              { name: "PI3K/AKT",       role: "Ko-aktiveret",                                                level: "Moderat-høj" },
              { name: "YAP/Hippo",      role: "Aktiveret af GNAQ — driver stemness og resistens",            level: "Høj" },
              { name: "Aerob glykolyse", role: "Stærkt Warburg-præget",                                     level: "Høj" },
            ],
            mutations: ["GNAQ Q209L/P (~45%)", "GNA11 Q209L (~40%)", "BAP1 tab (~45% — dårligst prognose)", "SF3B1 mutation (~20% — relativt bedre prognose)", "EIF1AX (~15%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer GNAQ-drevet mTOR og YAP-aktivering. Reducerer PKC-signalering", note: "Præklinisk stærk evidens i uvealt melanom-modeller.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+uveal+melanoma" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer GNAQ-downstream RAS/RHO og mevalonsyre-afhængiged", note: "Biologisk rationale. Observationsdata ved uvealt melanom.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+uveal+melanoma" },
          ],
          supplements: [
            { name: "Omega-3 (EPA/DHA)", dose: "3–4 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, anti-VEGF effekt",    inter: "Let blødningsforstærkende" },
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-YAP og anti-PI3K effekt via VDR",     inter: "Ingen kendte alvorlige" },
          ],
          biomarkers: [
            { name: "GNAQ / GNA11 mutation (NGS)", why: "Bekræfter diagnosen og udelukker kutant melanom. Styrer behandlingsvalg", crit: true },
            { name: "BAP1 tab (IHC/NGS)",          why: "BAP1-tab = metastatisk risiko ~50% vs ~20% ved BAP1-intakt. Vigtigste prognostiske markør",   crit: true },
            { name: "SF3B1 mutation",              why: "SF3B1+ = bedre prognose og sen metastasering",                                                crit: false },
            { name: "HLA-A*02:01 typning",         why: "Nødvendig for tebentafusp-indikation — kun HLA-A*02:01+ patienter kan behandles",            crit: true },
          ],
          trials: [
            { name: "IMCgp100 (Tebentafusp, uvealt melanom)", phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT03070392" },
            { name: "Alle aktive uvealt melanom studier",     phase: "Alle",    status: "–",                   url: "https://clinicaltrials.gov/search?cond=uveal+melanoma&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};
