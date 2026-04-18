import { T } from "../../theme.js";

// ─── Nyre- og Blærekræft (C64–C67) ───────────────────────────────────────────

export const urotelialkraeft = {
  id:    "urotelialkraeft",
  name:  "Nyre- og Blærekræft",
  icd10: "C64–C67",
  icon:  "🫘",
  intro: "Nyre- og blærekræft er to biologisk adskilte sygdomme der begge er stærkt angiogenetiske og immunterapi-responsive. VHL-mutation i nyrekræft og FGFR3-mutation i blærekræft er centrale targetbare mutationer.",

  groups: [
    {
      id: "rcc", name: "Nyrekræft (RCC)", color: T.blue, pct: "~3% af alle kræfttilfælde",
      subtypes: [
        {
          id: "ccrcc", name: "Klarcelle RCC (ccRCC)", badge: "VHL-muteret — mest aggressiv", badgeColor: T.blue,
          criteria: "Klarcellet nyrekarcinom / VHL-mutation eller methylering (~75%) / meget vaskulariseret",
          biology: {
            summary: "ccRCC er den hyppigste nyrekræftsubtype. VHL-tab er næsten universel og aktiverer HIF-1α/HIF-2α konstant der driver massiv VEGF-produktion og angiogenese. Belzutifan (HIF-2α-hæmmer) er et gennembrud specifikt for VHL-associeret sygdom. Kombineret immunterapi + anti-VEGFR er nuværende 1. linjestandardbehandling.",
            pathways: [
              { name: "VHL-tab → HIF-1α/HIF-2α", role: "Definerende — konstitutiv HIF-aktivering driver VEGF og vækst",  level: "Ekstremt høj" },
              { name: "VEGF/VEGFR/angiogenese",   role: "Massiv tumorangiogenese — primært behandlingstårget",           level: "Ekstremt høj" },
              { name: "mTOR/mTORC1",             role: "Ko-aktiveret — everolimus er godkendt",                         level: "Høj" },
              { name: "PI3K/AKT",                role: "Downstream af mTOR",                                            level: "Moderat-høj" },
              { name: "Aerob glykolyse",          role: "HIF-drevet Warburg — GLUT1 massivt overudtrykt",               level: "Høj" },
              { name: "Glutaminolyse",            role: "Sekundær energikilde",                                         level: "Moderat" },
            ],
            mutations: ["VHL-tab/mutation (~75%)", "PBRM1 (~40%)", "BAP1 (~10% — dårlig prognose)", "SETD2 (~12%)", "KDM5C (~8%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og HIF-1α-aktivering downstream af VHL-tab. Reducerer VEGF-produktion indirekte via AMPK-HIF aksen", note: "Observationsdata: ccRCC-patienter på metformin lever længere. Fase 2: metformin + sunitinib igangværende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+clear+cell+renal+cancer" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer RAS/RHO og VEGF-produktion. Mevalonsyre-hæmning reducerer HIF-1α stabilitet", note: "Retrospektive data: statin-brugere med RCC har bedre overlevelse.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+renal+cell+carcinoma" },
            { name: "Aspirin",    ev: "p12", mech: "COX-2 hæmning → reducerer PGE2 der stabiliserer HIF-1α. Anti-angiogenetisk via thrombocythæmning", note: "Observationsdata lovende.", inter: "Blødningsrisiko.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+renal+cell+carcinoma" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Hæmmer HIF-1α og VEGF via VDR. Anti-angiogenetisk effekt",       inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "3–4 g/dag",          ev: "p12", mech: "Anti-VEGF og anti-HIF via EPA/DHA. Anti-inflammatorisk",          inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "VHL mutation/methylering (NGS)", why: "Bekræfter ccRCC-diagnose og åbner for belzutifan ved VHL disease",                        crit: true },
            { name: "BAP1-tab (IHC/NGS)",            why: "BAP1-tab = dårligst prognose. Kræver intensiveret behandling",                             crit: false },
            { name: "PBRM1 vs BAP1",                 why: "PBRM1-muteret = bedre immunterapi-respons. BAP1-muteret = bedre VEGFR-hæmmer respons",     crit: false },
            { name: "PD-L1 (CPS/TPS)",               why: "Forudsiger immunterapi-respons i kombinationsregimer",                                    crit: false },
          ],
          trials: [
            { name: "CheckMate 9ER (Nivolumab+Cabozantinib)", phase: "Fase 3",  status: "Positiv", url: "https://clinicaltrials.gov/study/NCT03141177" },
            { name: "Metformin + sunitinib (ccRCC)",          phase: "Fase 2",  status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=renal+cell+carcinoma&term=metformin" },
            { name: "Alle aktive ccRCC studier",              phase: "Alle",    status: "–",           url: "https://clinicaltrials.gov/search?cond=clear+cell+renal+carcinoma&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    {
      id: "blaerekraeft", name: "Blærekræft (Urotelkarcinom)", color: T.purple, pct: "~3% af alle kræfttilfælde",
      subtypes: [
        {
          id: "mibc", name: "Muskelinvasiv blærekræft (MIBC)", badge: "PD-L1 + FGFR3 målretning", badgeColor: T.purple,
          criteria: "Urotelkarcinom / muskelinvasion (T2+) / MIBC",
          biology: {
            summary: "MIBC kræver radikal cystektomi eller kemoradiation. Neoadjuvant cisplatinbaseret kemo forbedrer OS markant. FGFR3-mutation (~15%) åbner for erdafitinib. Immunterapi (pembrolizumab) er godkendt ved metastatisk cisplatinineligibel sygdom og vedligeholdelse. Energistofskiftet er stærkt Warburg-præget.",
            pathways: [
              { name: "FGFR3 (mutation/fusion)", role: "Targetbar i ~15% — konstitutiv FGFR3-aktivering",        level: "Høj" },
              { name: "PI3K/AKT/mTOR",           role: "Aktiveret i ~45% via PIK3CA, PTEN-tab eller AKT",       level: "Høj" },
              { name: "PD-L1",                   role: "Overudtrykt — angrebspunkt for pembrolizumab",           level: "Moderat-høj" },
              { name: "Aerob glykolyse",          role: "Stærkt Warburg-præget",                                 level: "Høj" },
              { name: "ERBB2 (HER2)",            role: "Amplificeret i ~10% — potentiel target",                level: "Moderat" },
            ],
            mutations: ["TP53 (~50%)", "PIK3CA (~20%)", "FGFR3 (~15%)", "RB1-tab (~20%)", "ARID1A (~25%)", "ERBB2 amplifikation (~10%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og Warburg. Reducerer PD-L1-ekspression og MDSC — synergi med pembrolizumab", note: "Observationsdata: blærekræft-patienter på metformin lever længere. Kombinationsstudier igangværende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+bladder+cancer" },
            { name: "Aspirin",    ev: "p12", mech: "COX-2 hæmning → reducerer PGE2-drevet immunsuppression og neoangiogenese. Synergi med immunterapi", note: "Observationsdata lovende.", inter: "Blødningsrisiko.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+bladder+cancer" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer RAS og PI3K-aktivering. Synergistisk med cisplatinkemo", note: "Retrospektive data: bedre kemo-respons ved blærekræft på statin.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+bladder+cancer" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-PI3K og anti-Warburg via VDR",          inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, COX-2-hæmning",         inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "FGFR3 mutation/fusion (NGS)", why: "Åbner for erdafitinib ved metastatisk sygdom (~15%). Obligatorisk NGS",          crit: true },
            { name: "PD-L1 (CPS ≥ 10)",           why: "Indikerer pembrolizumab ved cisplatinineligibel metastatisk sygdom",             crit: true },
            { name: "MSI-H / TMB-høj",            why: "Åbner for pembrolizumab tumor-agnostisk",                                       crit: false },
            { name: "ERBB2 amplifikation",         why: "~10% — trastuzumab-kombinationsstudier",                                        crit: false },
          ],
          trials: [
            { name: "KEYNOTE-052 (Pembrolizumab, cisplatin-ineligibel)", phase: "Fase 2",  status: "Positiv", url: "https://clinicaltrials.gov/study/NCT02256436" },
            { name: "Alle aktive MIBC studier",                          phase: "Alle",    status: "–",       url: "https://clinicaltrials.gov/search?cond=muscle+invasive+bladder+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};

// ─── Lever- og Galdevejskræft (C22–C24) ──────────────────────────────────────

export const leverskraeft = {
  id:    "leverskraeft",
  name:  "Lever- og Galdevejskræft",
  icd10: "C22–C24",
  icon:  "🔴",
  intro: "Leverkræft opstår oftest på baggrund af kronisk leversygdom (HBV, HCV, cirrose, NASH). Galdevejskræft er opdelt i intrahepatisk og ekstrahepatisk — med vidt forskellig biologi og behandling.",

  groups: [
    {
      id: "hcc", name: "Hepatocellulært Karcinom (HCC)", color: T.amber, pct: "~75% af primær leverkræft",
      subtypes: [
        {
          id: "hcc_main", name: "HCC — Avanceret / Metastatisk", badge: "Sorafenib → atezolizumab + bevacizumab", badgeColor: T.amber,
          criteria: "HCC / Barcelona Clinic Liver Cancer (BCLC) C / Child-Pugh A-B",
          biology: {
            summary: "HCC opstår i ~80% på baggrund af skrumpelever og er en af de hyppigste kræftdødårsager globalt. Blodforsyningen er primært arteriel (modsat normalleveren) — TACE (arteriel kemoembolisering) udnytter dette. Atezolizumab + bevacizumab er nuværende 1. linjestandard og forbedrer OS markant vs. sorafenib. WGFR-drevet angiogenese og WNT/β-catenin er primære biologiske drivere.",
            pathways: [
              { name: "VEGF/VEGFR/angiogenese", role: "Massiv arteriel vaskularisering — primært behandlingstårget",   level: "Ekstremt høj" },
              { name: "WNT/β-catenin",          role: "CTNNB1-mutation i ~30% — primær proliferationsdrivkraft",      level: "Høj" },
              { name: "TP53",                   role: "Muteret i ~30% — tumor-supressor tab",                         level: "Høj" },
              { name: "PI3K/AKT/mTOR",          role: "Ko-aktiveret i ~50%",                                         level: "Moderat-høj" },
              { name: "Aerob glykolyse",         role: "Stærkt Warburg-præget",                                       level: "Høj" },
            ],
            mutations: ["CTNNB1 (~30%)", "TP53 (~30%)", "TERT-promoter (~60%)", "ARID1A (~10%)", "PIK3CA (~10%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og WNT/β-catenin. Reducerer leverinflammation og fibrose der driver HCC-progression. Anti-VEGF via AMPK", note: "Meta-analyse: HCC-patienter på metformin har signifikant bedre overlevelse. Særlig relevant ved NASH/diabetes-associeret HCC.", inter: "⚠️ Forsigtighed ved nedsat leverfunktion (Child-Pugh B–C). Reducér dosis.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+hepatocellular+carcinoma" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer WNT/β-catenin og RAS. Hæmmer leverinflammation og fibrose. Anti-VEGF-effekt", note: "Meta-analyse: lavere HCC-incidens og bedre overlevelse hos statin-brugere med kronisk leversygdom. Stærkest evidens for statin i HCC-prævention.", inter: "⚠️ Levermetabolisme — monitorér LFT ved cirrose.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+hepatocellular+carcinoma" },
            { name: "Aspirin",    ev: "p12", mech: "COX-2 hæmning → reducerer PGE2 der driver HCC-vækst og inflammatorisk mikromiljø. Reduktion af blodpladeaggregering reducerer HCC-metastase", note: "Observationsstudier: aspirin reducerer HCC-incidens hos cirrosepatienter.", inter: "⚠️ Blødningsrisiko — særlig varsomhed ved varicer og trombocytopeni.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+hepatocellular+carcinoma" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Antifibrotisk via VDR på lever-stellatceller. Reducerer cirrose-progression og HCC-risiko",    inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, reducerer leverfedt og fibrose. Reducerer HCC-recidivrisiko post-resektion", inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "AFP (alfaføtoprotein)",   why: "Primær HCC-markør. AFP > 400 ng/mL ved typisk billede er diagnostisk. Monitoreringsmarkør",   crit: true },
            { name: "Child-Pugh score",        why: "Leverfunktionsklassificering — afgørende for behandlingsvalg og dosis",                       crit: true },
            { name: "BCLC stadium",            why: "Primært staging-system for HCC. Styrer behandlingsstrategi fra resektion til palliation",    crit: true },
            { name: "CTNNB1 mutation",         why: "WNT+ HCC = anti-PD-1 lav responsrate. Påvirker immunterapi-beslutning",                    crit: false },
            { name: "HBV/HCV status",          why: "Aktiv HBV kræver antiviral behandling — HBV-reaktivering risiko under immunterapi",         crit: true },
          ],
          trials: [
            { name: "IMbrave150 (Atezolizumab+Bevacizumab)", phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT03434379" },
            { name: "Metformin + sorafenib (HCC)",           phase: "Fase 2",  status: "Igangværende",        url: "https://clinicaltrials.gov/search?cond=hepatocellular+carcinoma&term=metformin" },
            { name: "Alle aktive HCC studier",               phase: "Alle",    status: "–",                   url: "https://clinicaltrials.gov/search?cond=hepatocellular+carcinoma&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    {
      id: "cca", name: "Kolangiokarcinom (Galdeveje)", color: T.green, pct: "~20% af primær leverkræft",
      subtypes: [
        {
          id: "icca", name: "Intrahepatisk Kolangiokarcinom (iCCA)", badge: "FGFR2 og IDH1/2 targetbar", badgeColor: T.green,
          criteria: "Kolangiokarcinom / intrahepatisk lokalisering / NGS påkrævet",
          biology: {
            summary: "iCCA er karakteriseret ved et rigt mutationslandskab med FGFR2-fusioner (~15%) og IDH1/2-mutationer (~20%) som de vigtigste targetbare alterationer. Pemigatinib (FGFR2-hæmmer) og ivosidenib (IDH1-hæmmer) er godkendte. Desmoplatisk stroma analogt med PDAC. Standard 1. linje: gemcitabin + cisplatin + durvalumab.",
            pathways: [
              { name: "FGFR2/MAPK (fusion)",  role: "Targetbar i ~15% — konstitutiv FGFR2-aktivering",         level: "Høj" },
              { name: "IDH1/2 → 2-HG",        role: "Targetbar i ~20% — epigenetisk reprogrammering",          level: "Høj" },
              { name: "PI3K/AKT/mTOR",        role: "Ko-aktiveret i ~30%",                                     level: "Moderat-høj" },
              { name: "RAS/MAPK",             role: "KRAS muteret i ~20%",                                     level: "Moderat" },
              { name: "Aerob glykolyse",       role: "Stærkt Warburg-præget",                                  level: "Høj" },
            ],
            mutations: ["FGFR2-fusion (~15%)", "IDH1 mutation (~15%)", "IDH2 mutation (~5%)", "KRAS (~20%)", "TP53 (~25%)", "BAP1 (~15%)", "ARID1A (~10%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og 2-HG-produktion ved IDH-mutation. Reducerer Warburg", note: "Observationsdata ved kolangiokarcinom lovende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+cholangiocarcinoma" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer RAS/MAPK og stroma-produktion. Synergistisk med gemcitabin", note: "Retrospektive data lovende.", inter: "⚠️ LFT-monitorering ved leverkompliceret sygdom.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+cholangiocarcinoma" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-Warburg og anti-stroma via VDR. Reducerer fibrose", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, anti-Warburg",                     inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "FGFR2-fusion (NGS/FISH)",    why: "~15% — pemigatinib/infigratinib godkendt. Kræver NGS",                                       crit: true },
            { name: "IDH1/2 mutation (NGS)",      why: "~20% IDH1/IDH2 — ivosidenib godkendt ved IDH1+ recidiv",                                     crit: true },
            { name: "MSI-H / TMB-høj",            why: "Sjælden men åbner for pembrolizumab tumor-agnostisk",                                        crit: false },
            { name: "NTRK-fusion",                why: "Sjælden men targetbar med larotrectinib",                                                    crit: false },
            { name: "HER2 amplifikation",         why: "~5–10% — trastuzumab-kombinationsstudier",                                                   crit: false },
          ],
          trials: [
            { name: "TOPAZ-1 (Durvalumab+GemCis)", phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT03875209" },
            { name: "Alle aktive iCCA studier",    phase: "Alle",    status: "–",                   url: "https://clinicaltrials.gov/search?cond=intrahepatic+cholangiocarcinoma&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};

// ─── Skjoldbruskkirtelkræft (C73) ─────────────────────────────────────────────

export const skjoldbruskiraeft = {
  id:    "skjoldbruskiraeft",
  name:  "Skjoldbruskkirtelkræft",
  icd10: "C73",
  icon:  "⚪",
  intro: "Skjoldbruskkirtelkræft spænder fra ekstremt velbehandlelig (papillær) til en af de dødeligste kræftformer (anaplastisk). BRAF V600E og RET-mutationer er centrale targetbare alterationer.",

  groups: [
    {
      id: "differentieret", name: "Differentieret skjoldbruskkirtelkræft", color: T.green, pct: "~90% af tilfælde",
      subtypes: [
        {
          id: "ptc", name: "Papillært karcinom (PTC)", badge: "Bedst prognose — >95% 10-årsoverlevelse", badgeColor: T.green,
          criteria: "Papillær histologi / BRAF V600E (~60%) eller RET/PTC-fusion / >95% kurabel",
          biology: {
            summary: "PTC er den hyppigste skjoldbruskkirtelkræft og har ekstremt god prognose med standard behandling (thyroidektomi ± radioaktivt jod). BRAF V600E er den hyppigste mutation og driver MAPK-signalering. RAI (radioaktivt jod)-refraktær sygdom kræver BRAF/MEK-hæmmere. Energistofskiftet er moderat Warburg-præget.",
            pathways: [
              { name: "BRAF V600E/MAPK", role: "Primær driver i ~60% — konstitutiv ERK-aktivering",      level: "Høj" },
              { name: "RET/PTC-fusion",  role: "Alternativ driver i ~15%",                               level: "Moderat-høj" },
              { name: "PI3K/AKT",        role: "Ko-aktiveret i ~30%",                                   level: "Moderat" },
              { name: "Aerob glykolyse", role: "Moderat Warburg",                                        level: "Moderat" },
            ],
            mutations: ["BRAF V600E (~60%)", "RET/PTC-fusion (~15%)", "NRAS mutation (~10%)", "TERT-promoter (aggressiv variant, ~30%)", "TP53 (sjælden ved DTC)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer BRAF-drevet MAPK og mTOR. Relevant specifikt ved BRAF V600E PTC og metformin-sensitiv TSH-afhængiged", note: "Observationsdata: lavere recidivrisiko hos PTC-patienter på metformin.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+papillary+thyroid+cancer" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer BRAF-downstream RAS/MAPK. Anti-invasivt i PTC-cellelinjer", note: "Præklinisk og observationsdata.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+thyroid+cancer" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-BRAF/MAPK effekt via VDR. Lav D3 associeret med aggressiv PTC", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, reducerer BRAF-drevet COX-2",                  inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "BRAF V600E (NGS + IHC)",    why: "Forudsiger RAI-refraktæritet. Positiv → BRAF/MEK-hæmmer (dabrafenib+trametinib) ved metastatisk RAI-refraktær sygdom", crit: true },
            { name: "TERT-promoter mutation",    why: "Ko-mutation med BRAF = ekstremt aggressivt forløb. Kræver intensiveret opfølgning",                                    crit: false },
            { name: "RET/PTC-fusion (NGS/FISH)", why: "Åbner for RET-hæmmere (selpercatinib, pralsetinib) ved RAI-refraktær sygdom",                                         crit: false },
            { name: "Thyroglobulin (Tg) + TgAb", why: "Primær monitoreringsmarkør post-thyroidektomi. Stigende Tg = recidiv",                                               crit: true },
          ],
          trials: [
            { name: "NAVIGATE (Selpercatinib ved RET+ TC)", phase: "Fase 1–2", status: "Positiv", url: "https://clinicaltrials.gov/study/NCT03157128" },
            { name: "Alle aktive PTC studier",              phase: "Alle",     status: "–",       url: "https://clinicaltrials.gov/search?cond=papillary+thyroid+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    {
      id: "anaplastisk", name: "Anaplastisk skjoldbruskkirtelkræft (ATC)", color: T.rose, pct: "~2% — dødeligst",
      subtypes: [
        {
          id: "atc_main", name: "Anaplastisk Skjoldbruskkirtelkræft", badge: "Median OS < 6 mdr — BRAF target kritisk", badgeColor: T.rose,
          criteria: "Anaplastisk (udifferentieret) skjoldbruskkirtelkræft / ekstremt aggressivt / BRAF V600E ~45%",
          biology: {
            summary: "ATC er en af de dødeligste kræftformer med median OS på 3–6 måneder. BRAF V600E er til stede i ~45% og er et kritisk handlingspunkt — dabrafenib + trametinib giver ~69% responsrate og har forandret prognosen for BRAF+ ATC fra måneder til potentielt år. Hurtig BRAF-testning er en medicinsk nødsituation.",
            pathways: [
              { name: "BRAF V600E/MAPK",     role: "Til stede i ~45% — ekstremt aggressiv MAPK-aktivering",     level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",       role: "Aktiveret i ~40%",                                         level: "Høj" },
              { name: "WNT/β-catenin",       role: "Aktiveret — driver stamcelleegenskaber",                    level: "Høj" },
              { name: "Aerob glykolyse",     role: "Ekstremt Warburg-præget",                                   level: "Ekstremt høj" },
              { name: "Autopagi",            role: "Resistensmekanisme mod BRAF-hæmmere",                       level: "Høj" },
            ],
            mutations: ["BRAF V600E (~45%)", "TP53 (~70%)", "PIK3CA (~20%)", "TERT-promoter (~70%)", "RAS mutation (~20%)"],
          },
          offLabel: [
            { name: "HCQ",   ev: "p12", mech: "Autopagi-hæmning — ATC er stærkt autopagi-afhængig. Synergi med dabrafenib+trametinib mod BRAF+ ATC", note: "Fase 2: HCQ + dabrafenib/trametinib ved BRAF+ ATC igangværende.", inter: "⚠️ QT-forlængelse. EKG.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+anaplastic+thyroid" },
            { name: "Metformin", ev: "pre", mech: "AMPK → hæmmer mTOR og Warburg. Præklinisk synergi med BRAF-hæmmere", note: "Præklinisk evidens. Gives ofte som del af kombinationsprotokol.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+anaplastic+thyroid" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "pre", mech: "Anti-Warburg og anti-WNT",    inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "3–4 g/dag",          ev: "p12", mech: "Anti-inflammatorisk",         inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "BRAF V600E (AKUT NGS)", why: "⚠️ MEDICINSK NØDSITUATION — BRAF V600E+ → øjeblikkelig opstart af dabrafenib+trametinib. Kan ikke vente. Skal svar inden 48 timer.", crit: true },
            { name: "PD-L1 (CPS)",          why: "Immunterapi-mulighed ved BRAF-negativ ATC",                                                                                           crit: false },
            { name: "MSI-H",                why: "Sjælden men åbner for pembrolizumab tumor-agnostisk",                                                                                 crit: false },
          ],
          trials: [
            { name: "ROAR (Dabrafenib+Trametinib, BRAF+ ATC)", phase: "Fase 2",  status: "Positiv — 69% ORR", url: "https://clinicaltrials.gov/study/NCT02034110" },
            { name: "HCQ + BRAF/MEK (ATC)",                   phase: "Fase 2",  status: "Rekrutterer",       url: "https://clinicaltrials.gov/search?cond=anaplastic+thyroid&term=hydroxychloroquine" },
            { name: "Alle aktive ATC studier",                 phase: "Alle",    status: "–",                 url: "https://clinicaltrials.gov/search?cond=anaplastic+thyroid+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};

// ─── Sarkom (C40–C49) ─────────────────────────────────────────────────────────

export const sarkom = {
  id:    "sarkom",
  name:  "Sarkom",
  icd10: "C40–C49",
  icon:  "⚫",
  intro: "Sarkom er en sjælden, heterogen gruppe kræftformer der opstår i bindevæv, knogle og muskel. Subtypebestemmelse ved molekylær patologi er afgørende — GIST med KIT-mutation er et af onkologiens store behandlingssucceser.",

  groups: [
    {
      id: "bloeddelssarkom", name: "Bløddelessarkom", color: T.muted2, pct: "~75% af sarkom",
      subtypes: [
        {
          id: "gist", name: "GIST (Gastrointestinal Stromal Tumor)", badge: "KIT/PDGFRA — imatinib kurativt potentiale", badgeColor: T.green,
          criteria: "Gastrointestinal stromal tumor / KIT (CD117) eller DOG1 positiv / KIT eller PDGFRA mutation",
          biology: {
            summary: "GIST er et af onkologiens mest succesfulde behandlingseksempler. KIT-mutation er til stede i ~80% og driver konstitutiv KIT-kinaseaktivering. Imatinib giver dramatisk og varig respons — median OS er nu > 10 år ved avanceret sygdom. KIT exon 11-mutation har bedst prognose. Sunitinib er 2. linje og regorafenib 3. linje.",
            pathways: [
              { name: "KIT/PDGFRA-kinase", role: "Primær driver — konstitutiv kinaseaktivering",          level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",     role: "Downstream af KIT",                                    level: "Høj" },
              { name: "RAS/MAPK",          role: "Parallel downstream vej",                              level: "Moderat-høj" },
              { name: "Aerob glykolyse",   role: "KIT-drevet Warburg",                                   level: "Moderat-høj" },
            ],
            mutations: ["KIT exon 11 (~70% — bedst prognose)", "KIT exon 9 (~10% — kræver højere imatinib-dosis)", "PDGFRA exon 18 D842V (~8% — imatinib-resistent → avapritinib)", "NF1-associeret (~5%)", "SDH-deficient (~5%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR downstream af KIT. Synergi med imatinib via AMPK-KIT interaktion. Reducerer imatinib-resistens", note: "Observationsdata: GIST-patienter på metformin har bedre PFS på imatinib.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+GIST" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer RAS/MAPK downstream af KIT. Synergistisk med imatinib", note: "Præklinisk evidens og observationsdata.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+GIST" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-mTOR og anti-KIT downstream effekt", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk",                    inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "KIT mutation (NGS — exon 9/11/13/17)", why: "Afgørende for imatinib-dosis og prognose. Exon 9 kræver 800 mg imatinib", crit: true },
            { name: "PDGFRA exon 18 D842V mutation",        why: "Imatinib-resistent — avapritinib er specifikt effektivt",                  crit: true },
            { name: "KIT wildtype / SDH-deficient",         why: "SDH-deficient GIST = hereditary risk og sunitinib-responsivitet",          crit: false },
            { name: "KIT exon 17/18 (resistensmutation)",   why: "Erhvervet imatinib-resistens → sunitinib eller ripretinib",               crit: false },
          ],
          trials: [
            { name: "NAVIGATOR (Avapritinib PDGFRA D842V)", phase: "Fase 1",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT02508532" },
            { name: "Alle aktive GIST studier",             phase: "Alle",    status: "–",                   url: "https://clinicaltrials.gov/search?cond=GIST&type=Interventional&recrs=a" },
          ],
        },
        {
          id: "leiomyosarkom", name: "Leiomyosarkom (LMS)", badge: "Aggressivt — kompleks karyotype", badgeColor: T.amber,
          criteria: "Glat muskel-differentiering / hyppig i uterus, retroperitoneum / kompleks genomisk profil",
          biology: {
            summary: "LMS er et af de hyppigste bløddelessarkomer og opstår fra glat muskulatur — hyppigst i uterus og retroperitoneum. Genomisk profil er ekstremt kompleks uden klar drivermutation. Angiogenese er høj. Behandling er primært kirurgi + gemcitabin/docetaxel. Trabektedin og eribulin er godkendte 2. linjebehandlinger.",
            pathways: [
              { name: "RB1-tab/celledeling",  role: "Hyppig driver af dereguleret celledeling",          level: "Høj" },
              { name: "PI3K/AKT/mTOR",        role: "Ko-aktiveret i ~30%",                              level: "Moderat-høj" },
              { name: "VEGF/angiogenese",     role: "Høj vaskularisering — anti-VEGFR relevant",        level: "Høj" },
              { name: "Aerob glykolyse",      role: "Stærkt Warburg-præget",                            level: "Høj" },
            ],
            mutations: ["RB1-tab (~60%)", "TP53 (~50%)", "PTEN-tab (~20%)", "CDK4 amplifikation (~10%)", "MDM2 amplifikation (sjælden — adskiller fra liposarkom)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og Warburg. Reducerer VEGF-produktion", note: "Observationsdata ved uterint LMS lovende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+leiomyosarcoma" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer RAS/RHO og VEGF. Synergistisk med gemcitabin", note: "Biologisk rationale.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+leiomyosarcoma" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-proliferativ via VDR",    inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk og anti-VEGF", inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "NGS full panel",     why: "Udelukker GIST (KIT/DOG1) og liposarkom (MDM2). Kan identificere targetable alterationer", crit: true },
            { name: "PD-L1 (CPS)",       why: "Immunterapi-mulighed — pembrolizumab er godkendt ved TMB-høj sarkom",                      crit: false },
            { name: "TMB",               why: "Høj TMB → pembrolizumab tumor-agnostisk indikation",                                      crit: false },
          ],
          trials: [
            { name: "Alle aktive leiomyosarkom studier", phase: "Alle", status: "–", url: "https://clinicaltrials.gov/search?cond=leiomyosarcoma&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    {
      id: "knoglesarkom", name: "Knoglesarkom", color: T.blue, pct: "~25% af sarkom",
      subtypes: [
        {
          id: "osteosarkom", name: "Osteosarkom", badge: "Ung alder — høj kemosensitivitet", badgeColor: T.blue,
          criteria: "Primær knogletumor / osteoiddannelse / hyppigst ved knæ og skulder / unge 10–25 år",
          biology: {
            summary: "Osteosarkom er den hyppigste primære knogletumor og rammer primært unge. MAP-protokollen (methotrexat, adriamycin, cisplatin) giver 60–70% 5-årsoverlevelse ved lokaliseret sygdom. Genomisk profil er ekstremt kompleks med massiv genomisk ustabilitet. RB1-tab er universelt. Histologisk nekrose efter neoadjuvant kemo (Rosen-klassifikation) er den vigtigste prognostiske faktor.",
            pathways: [
              { name: "RB1-tab",          role: "Næsten universel (~90%) — dereguleret celledeling", level: "Ekstremt høj" },
              { name: "TP53 mutation",    role: "Hyppig ko-mutation (~50%)",                        level: "Høj" },
              { name: "VEGF/angiogenese", role: "Stærkt angiogenetisk — anti-VEGF relevant",       level: "Høj" },
              { name: "PI3K/AKT/mTOR",   role: "Aktiveret i ~35%",                                level: "Moderat-høj" },
              { name: "Aerob glykolyse",  role: "Stærkt Warburg-præget",                          level: "Høj" },
            ],
            mutations: ["RB1-tab (~90%)", "TP53 (~50%)", "DLG2 mutation", "CCNE1 amplifikation", "MYC amplifikation (~25%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og Warburg. Præklinisk synergi med methotrexat og cisplatin i osteosarkom", note: "Fase 2: metformin + MAP-kemo igangværende ved recidiverende osteosarkom.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+osteosarcoma" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer RAS/MAPK og MYC-amplifikation. Proapoptotisk i osteosarkomcellelinjer", note: "Præklinisk stærk evidens.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+osteosarcoma" },
            { name: "Itraconazol",ev: "p12", mech: "Hedgehog-hæmning → reducerer osteosarkom-stamcellerne. Anti-VEGFR anti-angiogenetisk", note: "Fase 2 ved recidiverende osteosarkom.", inter: "⚠️ CYP3A4-hæmmer.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=itraconazole+osteosarcoma" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-proliferativ og anti-VEGF. Knogle-metabolisme under behandling", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk og anti-VEGF. Reducerer kemo-bivirkninger",       inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "Histologisk nekrose (% post-neoadjuvant)", why: "≥90% nekrose = god prognose (Rosen grade III–IV). Primær prognostisk markør",          crit: true },
            { name: "NGS full panel",                          why: "Identificerer targetable alterationer ved recidiv",                                      crit: false },
            { name: "Alkalisk fosfatase (ALP)",                why: "Forhøjet ved aktiv osteosarkom. Monitoreringsmarkør",                                   crit: false },
          ],
          trials: [
            { name: "Metformin + MAP-kemo (osteosarkom)",   phase: "Fase 2",  status: "Rekrutterer", url: "https://clinicaltrials.gov/search?cond=osteosarcoma&term=metformin" },
            { name: "Alle aktive osteosarkom studier",      phase: "Alle",    status: "–",           url: "https://clinicaltrials.gov/search?cond=osteosarcoma&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};
