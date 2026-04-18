import { T } from "../../theme.js";

export const leukemi = {
  id:    "leukemi",
  name:  "Leukæmi",
  icd10: "C91–C95",
  icon:  "🩸",
  intro: "Leukæmi er en heterogen gruppe blodkræftformer. Drivermutationen er afgørende — FLT3, IDH1/2 og BCR-ABL er eksempler på præcise mål der har forvandlet behandlingen fuldstændigt.",

  groups: [
    {
      id: "aml", name: "AML (Akut Myeloid Leukæmi)", color: T.rose, pct: "~35% af leukæmi",
      subtypes: [
        {
          id: "aml_flt3", name: "AML — FLT3-muteret", badge: "Targetbar — midostaurin/gilteritinib", badgeColor: T.amber,
          criteria: "AML / FLT3-ITD eller FLT3-TKD mutation / ~30% af AML",
          biology: {
            summary: "FLT3-muteret AML har historisk haft dårlig prognose men FLT3-hæmmere (midostaurin, gilteritinib) har forbedret overlevelsen markant. FLT3-ITD giver konstitutiv kinaseaktivering der driver PI3K/AKT, MAPK og STAT5 massivt. Energistofskiftet er ekstremt glykolytisk og glutaminolytisk — leukæmiceller er afhængige af hurtig ATP-produktion for proliferation.",
            pathways: [
              { name: "FLT3/STAT5",      role: "Primær driver — konstitutiv aktivering via ITD/TKD",      level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",   role: "Downstream af FLT3",                                     level: "Høj" },
              { name: "RAS/MAPK",        role: "Parallel downstream vej",                                level: "Høj" },
              { name: "Aerob glykolyse", role: "Ekstremt Warburg-præget",                                level: "Ekstremt høj" },
              { name: "Glutaminolyse",   role: "Afgørende energikilde under FLT3-aktivering",            level: "Høj" },
              { name: "Autopagi",        role: "Resistensmekanisme mod FLT3-hæmmere",                    level: "Moderat-høj" },
            ],
            mutations: ["FLT3-ITD (~25%)", "FLT3-TKD (~5%)", "NPM1 (~35% ko-mutation)", "DNMT3A (~20%)", "TP53 (~10%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og aerob glykolyse. Synergi med midostaurin via AMPK-FLT3 crosstalk. Reducerer leukæmi-stammeceller", note: "Fase 2: metformin + kemo ved AML igangværende. Observationsdata: AML-patienter på metformin har bedre respons.", inter: "Standard. eGFR > 30.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+AML+FLT3" },
            { name: "HCQ",        ev: "p12", mech: "Autopagi-hæmning — blokerer primær resistensmekanisme mod FLT3-hæmmere. Genopretter gilteritinib-sensitivitet", note: "Fase 1/2: HCQ + gilteritinib ved FLT3+ recidiverende AML.", inter: "⚠️ QT-forlængelse. EKG obligatorisk.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+FLT3+AML" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer RAS-membrananchoring downstream af FLT3. Proapoptotisk i AML-blaster", note: "Retrospektive studier: statin-brugere med AML har bedre komplet remissionrate.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+AML" },
            { name: "Itraconazol",ev: "p12", mech: "Hedgehog-hæmning → reducerer AML-stammecelle-populationen. Anti-FLT3-downstream effekt beskrevet", note: "Præklinisk stærk evidens. Fase 2 igangværende.", inter: "⚠️ CYP3A4-hæmmer — interagerer med midostaurin og gilteritinib.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=itraconazole+AML" },
          ],
          supplements: [
            { name: "Vitamin D3",  dose: "2.000–5.000 IE/dag",  ev: "p12", mech: "Fremmer myeloid differentiering og reducerer leukæmi-blaster-proliferation. VDR udtrykt i AML-celler", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3",     dose: "2–3 g/dag",           ev: "p12", mech: "Anti-inflammatorisk, modulerer leukæmi-mikromiljø i knoglemarv", inter: "Let blødningsforstærkende — OBS ved trombocytopeni" },
            { name: "Melatonin",   dose: "20 mg/aften",         ev: "pre", mech: "Anti-Warburg og pro-apoptotisk i AML-cellelinjer. Synergistisk med cytarabin", inter: "Sederende" },
          ],
          biomarkers: [
            { name: "FLT3-ITD / FLT3-TKD (NGS)",  why: "Definerer subtypen. FLT3-ITD allele ratio prognostisk. Afgørende for midostaurin/gilteritinib-indikation", crit: true },
            { name: "NPM1 mutation",               why: "Ko-mutation med FLT3 — NPM1+/FLT3-ITD lav = god prognose. NPM1+/FLT3-ITD høj = dårlig", crit: true },
            { name: "DNMT3A mutation",             why: "Epigenetisk driver — relevant for venetoclax-kombinationer", crit: false },
            { name: "IDH1/2 mutation",             why: "Åbner for ivosidenib/enasidenib som tillæg ved IDH+ AML", crit: false },
            { name: "WT1 / MRD-målinger",          why: "Monitorerer minimal residual disease under og efter behandling", crit: true },
          ],
          trials: [
            { name: "HCQ + gilteritinib (FLT3+ AML)",    phase: "Fase 1–2", status: "Rekrutterer",         url: "https://clinicaltrials.gov/search?cond=FLT3+AML&term=hydroxychloroquine" },
            { name: "Metformin + kemo (AML)",             phase: "Fase 2",   status: "Igangværende",        url: "https://clinicaltrials.gov/search?cond=AML&term=metformin" },
            { name: "Alle aktive FLT3 AML studier",       phase: "Alle",     status: "–",                   url: "https://clinicaltrials.gov/search?cond=FLT3+acute+myeloid+leukemia&type=Interventional&recrs=a" },
          ],
        },
        {
          id: "aml_idh", name: "AML — IDH1/2-muteret", badge: "IDH-hæmmer indiceret", badgeColor: T.green,
          criteria: "AML / IDH1 R132 eller IDH2 R140/R172 mutation / ~20% af AML",
          biology: {
            summary: "IDH1/2-muteret AML producerer 2-HG der blokerer myeloid differentiering og låser celler i blaststadie. Ivosidenib (IDH1) og enasidenib (IDH2) er godkendte og kan inducere differentiering i stedet for at dræbe celler. Differentieringssyndrom er en vigtig bivirkning at kende. Energistofskiftet er Warburg-præget med unikt metabolisk aftryk fra 2-HG-produktion.",
            pathways: [
              { name: "IDH1/2 → 2-HG",    role: "Definerende — 2-HG blokerer TET2 og KDM og låser differentiering", level: "Ekstremt høj" },
              { name: "Epigenetisk lås",   role: "2-HG hæmmer α-ketoglutarat-afhængige enzymer globalt",            level: "Høj" },
              { name: "PI3K/AKT/mTOR",    role: "Ko-aktiveret i ~40%",                                             level: "Moderat-høj" },
              { name: "Aerob glykolyse",  role: "Stærkt Warburg-præget",                                           level: "Høj" },
              { name: "Glutaminolyse",    role: "Afgørende — glutamin er substrat for 2-HG-syntese",               level: "Høj" },
            ],
            mutations: ["IDH1 R132H/C/S (~8%)", "IDH2 R140Q/R172K (~12%)", "NPM1 (~30% ko-mutation)", "DNMT3A", "SRSF2"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og glutaminolyse. Reducerer 2-HG-produktion indirekte via AMPK-IDH2 interaktion", note: "Synergistisk med ivosidenib/enasidenib præklinisk.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+IDH+AML" },
            { name: "HCQ",        ev: "pre", mech: "Autopagi-hæmning — IDH-muterede AML-celler er stærkt autopagi-afhængige under differentieringsbehandling", note: "Præklinisk synergi med enasidenib.", inter: "⚠️ QT-forlængelse.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+IDH+leukemia" },
          ],
          supplements: [
            { name: "Vitamin D3", dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Fremmer myeloid differentiering synergistisk med IDH-hæmmere", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3",    dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk — reducerer differentieringssyndrom-risiko", inter: "OBS ved trombocytopeni" },
          ],
          biomarkers: [
            { name: "IDH1 / IDH2 mutation (NGS)", why: "Definerer subtypen. IDH1 → ivosidenib, IDH2 → enasidenib. Begge godkendt ved recidiverende/refraktær AML", crit: true },
            { name: "2-HG (serum/urin)",          why: "Monitorerer IDH-hæmmer-respons. Fald i 2-HG bekræfter biologisk aktivitet",                               crit: false },
            { name: "MRD (NGS/flow cytometri)",   why: "Minimal residual disease — afgørende for behandlingsbeslutning",                                          crit: true },
          ],
          trials: [
            { name: "AGILE (Ivosidenib + azacitidin, IDH1+ AML)", phase: "Fase 3",  status: "Positiv", url: "https://clinicaltrials.gov/study/NCT03173248" },
            { name: "Alle aktive IDH AML studier",                phase: "Alle",    status: "–",       url: "https://clinicaltrials.gov/search?cond=IDH+acute+myeloid+leukemia&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    {
      id: "cml", name: "CML (Kronisk Myeloid Leukæmi)", color: T.blue, pct: "~15% af leukæmi",
      subtypes: [
        {
          id: "cml_main", name: "CML — BCR-ABL positiv", badge: "Philadelphia-kromosom — TKI kurativt potentiale", badgeColor: T.green,
          criteria: "CML / BCR-ABL1 fusionsgen (Philadelphia-kromosom) / t(9;22)",
          biology: {
            summary: "CML er en af de mest behandlingssuccesrige kræftformer — TKI (imatinib, dasatinib, nilotinib) giver >85% langtidsoverlevelse. BCR-ABL1-fusionsproteinet aktiverer konstant ABL-kinaseaktivitet der driver PI3K/AKT, RAS/MAPK og STAT5. Energistofskiftet er domineret af aerob glykolyse. Dyb molekylær remission (DMR) er målet og åbner for TKI-seponering.",
            pathways: [
              { name: "BCR-ABL1/ABL-kinase", role: "Eneste primære driver — konstitutiv kinaseaktivering",  level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",       role: "Primær downstream overlevelsessignalvej",               level: "Høj" },
              { name: "RAS/MAPK",            role: "Parallel downstream proliferationssignalvej",           level: "Høj" },
              { name: "STAT5",              role: "Direkte aktiveret af BCR-ABL — driver anti-apoptose",    level: "Høj" },
              { name: "Aerob glykolyse",     role: "Stærkt Warburg-præget",                                 level: "Høj" },
            ],
            mutations: ["BCR-ABL1 t(9;22) (definerende)", "ABL1 T315I (TKI-resistens)", "ABL1 E255K/V (resistens mod 1-2. gen.)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR downstream af BCR-ABL. Reducerer CML-stammeceller som overlever imatinib via AMPK-uafhængige veje", note: "Fase 2: metformin + nilotinib ved CML i dyb remission — forbedret DMR-rate.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+CML+imatinib" },
            { name: "HCQ",        ev: "p12", mech: "Autopagi-hæmning — CML-stammeceller er stærkt autopagi-afhængige og overlever TKI via autopagi. HCQ genopretter imatinib-sensitivitet i stamceller", note: "Randomiseret fase 2 (ATLAs): HCQ + imatinib forbedret DMR. Et af de bedst designede off-label studier i CML.", inter: "⚠️ QT-forlængelse. EKG.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+CML+imatinib" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer RAS-membrananchoring og synergistisk med imatinib mod BCR-ABL", note: "Observationsdata lovende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+CML" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Fremmer myeloid differentiering og reducerer CML-stammecelle-pool", inter: "Ingen kendte alvorlige" },
            { name: "Grøn te (EGCG)",    dose: "400–800 mg/dag",    ev: "p12", mech: "EGCG hæmmer BCR-ABL direkte og reducerer leukæmi-stamceller. Klinisk studie: EGCG + imatinib forbedret respons", inter: "Højre doser: let hepatotoksisk" },
            { name: "Omega-3",           dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk", inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "BCR-ABL1 (FISH + PCR)",    why: "Diagnostisk og monitoreringsmarkør. BCR-ABL kvantificering (IS-skala) afgør behandlingsstatus og seponeringsstrategi", crit: true },
            { name: "ABL1 T315I mutation",      why: "Resistens mod alle 1.-2. gen. TKI. Kræver ponatinib eller asciminib",                                              crit: true },
            { name: "ABL1 mutationsanalyse",    why: "Ved behandlingssvigt: fuld ABL1 mutationsscreening afgør TKI-skifte",                                              crit: false },
            { name: "Sokal/ELTS risikoescore",  why: "Afgørende for initial TKI-valg (imatinib vs. nilotinib/dasatinib)",                                               crit: false },
          ],
          trials: [
            { name: "ATLAs (HCQ + imatinib ved CML)", phase: "Fase 2",  status: "Positiv data",  url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+imatinib+CML+ATLAS" },
            { name: "Alle aktive CML studier",        phase: "Alle",    status: "–",             url: "https://clinicaltrials.gov/search?cond=chronic+myeloid+leukemia&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    {
      id: "cll", name: "CLL (Kronisk Lymfatisk Leukæmi)", color: T.purple, pct: "~35% af leukæmi",
      subtypes: [
        {
          id: "cll_main", name: "CLL — IGHV-umuteret / TP53-muteret", badge: "Høj risiko — BTK-hæmmer", badgeColor: T.rose,
          criteria: "CLL / IGHV-umuteret og/eller del(17p)/TP53-muteret / kræver behandling",
          biology: {
            summary: "CLL er den hyppigste leukæmi i Vesten. BCR-signalering er den primære overlevelsesdrivkraft. Ibrutinib og acalabrutinib (BTK-hæmmere) har revolutioneret behandlingen. IGHV-umuteret og TP53-muteret/del(17p) er de vigtigste høj-risiko markører. Tumorcellerne er dybt afhængige af overlevelsessignaler fra lymfeknude-mikromiljøet.",
            pathways: [
              { name: "BCR/BTK-signalering", role: "Primær driver — B-celle-receptor aktiverer BTK konstant",     level: "Ekstremt høj" },
              { name: "PI3K/AKT",           role: "Downstream af BTK",                                           level: "Høj" },
              { name: "BCL-2 anti-apoptose", role: "Overudtrykt — venetoclax er direkte antagonist",             level: "Ekstremt høj" },
              { name: "NF-κB",              role: "Konstitutivt aktiveret via mikromiljø-signaler",              level: "Høj" },
              { name: "Aerob glykolyse",    role: "Moderat — lavere end akutte leukæmier",                      level: "Moderat" },
            ],
            mutations: ["IGHV-umuteret (~50% — dårlig prognose)", "del(17p)/TP53 (~10%)", "del(11q)/ATM (~15%)", "NOTCH1 mutation (~10%)", "SF3B1 mutation (~10%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og BCL-2-drevet anti-apoptose. Reducerer NF-κB og mikromiljø-signalering",       note: "Observationsdata: CLL-patienter på metformin har lavere behandlingsbehov. Fase 2 igangværende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+CLL" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer RAS/RHO og NF-κB. Proapoptotisk i CLL-celler. Lipofil statin foretrækkes", note: "Retrospektive studier: lavere behandlingsbehov hos CLL-patienter på statin.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+CLL" },
            { name: "Cimetidin",  ev: "p12", mech: "H2-receptor-antagonist → reducerer MDSC og immunsuppression i CLL-mikromiljøet. Kan reducere behandlingstrængende transformation", note: "Biologisk rationale ved immunsupprimeret CLL.", inter: "Interagerer med CYP450.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=cimetidine+CLL" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag",  ev: "p12", mech: "VDR fremmer apoptose og hæmmer BCL-2. Lav D3 associeret med aggressive CLL", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",           ev: "p12", mech: "Anti-inflammatorisk. DHA inducerer apoptose i CLL-celler via mitokondrie-vej", inter: "Let blødningsforstærkende" },
            { name: "Curcumin",          dose: "500–1.000 mg/dag",    ev: "p12", mech: "NF-κB hæmning og BCL-2-downregulering i CLL-cellelinjer", inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "IGHV mutationsstatus",   why: "Umuteret = dårlig prognose og kortere tid til behandling. Afgørende for behandlingsstrategi-valg", crit: true },
            { name: "del(17p) / TP53 mutation", why: "del(17p)/TP53+ = BTK-hæmmer eller venetoclax obligatorisk. Kemo-immunterapi er kontraindiceret", crit: true },
            { name: "del(11q) / ATM",         why: "Intermediær risiko. Kræver anthracyclin-baseret kemo + CD20-antistof",                             crit: false },
            { name: "BTK C481S mutation (ctDNA)", why: "Erhvervet ibrutinib-resistens — kræver skift til acalabrutinib eller venetoclax",              crit: false },
            { name: "ZAP-70 / CD38",          why: "Surrogatmarkører for IGHV-status. Positive = aggressivt forløb",                                  crit: false },
          ],
          trials: [
            { name: "RESONATE-2 (Ibrutinib 1. linje CLL)", phase: "Fase 3",  status: "Positiv",      url: "https://clinicaltrials.gov/study/NCT01722487" },
            { name: "Metformin + ibrutinib (CLL)",         phase: "Fase 2",  status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=CLL&term=metformin" },
            { name: "Alle aktive CLL studier",             phase: "Alle",    status: "–",            url: "https://clinicaltrials.gov/search?cond=chronic+lymphocytic+leukemia&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};
