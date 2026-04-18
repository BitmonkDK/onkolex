import { T } from "../../theme.js";

// ─── Kolorektal kræft (C18–C20) ───────────────────────────────────────────────

export const kolorektal = {
  id:    "kolorektal",
  name:  "Kolorektal kræft",
  icd10: "C18–C20",
  icon:  "🔵",
  intro: "Kolorektal kræft er den tredjehyppigste kræftform globalt. Molekylær subtyping er afgørende — MSI-H og BRAF-status er de vigtigste prognostiske og prediktive markører.",

  groups: [

    // ── KOLONKARCINOM ─────────────────────────────────────────────────────────
    {
      id:   "kolon",
      name: "Kolonkarcinom",
      color: T.blue,
      pct:  "~70% af kolorektal kræft",
      subtypes: [

        // MSI-H / dMMR
        {
          id: "kolon_msih", name: "MSI-H / dMMR", badge: "Immunterapi-responsiv", badgeColor: T.green,
          criteria: "Kolonkarcinom / Mismatch Repair-deficient (dMMR) eller Mikrosatellit-instabilitet-høj (MSI-H)",
          biology: {
            summary: "MSI-H kolorektal kræft udgør ~15% af alle tilfælde og ~25% af stadium II. Fejl i DNA mismatch repair-proteiner (MLH1, MSH2, MSH6, PMS2) giver ekstremt høj mutationsbyrde (TMB) og mange neoantigener. Dette gør MSI-H til den bedst immunterapi-responderende kolorektal subtype. Pembrolizumab er nu 1. linjestandardbehandling ved metastatisk MSI-H CRC. Warburg-effekten er moderat.",
            pathways: [
              { name: "MMR-mangelfuld",    role: "Definerende karakteristikum — massiv genominstabilitet og neoantigenbelastning", level: "Ekstremt høj" },
              { name: "PD-1/PD-L1",        role: "Primær immunflugtsmekanisme — angrebspunkt for pembrolizumab",                  level: "Høj" },
              { name: "WNT/β-catenin",     role: "Hyppigt aktiveret via APC-mutation",                                           level: "Høj" },
              { name: "PI3K/AKT/mTOR",     role: "Aktiveret i ~40%",                                                             level: "Moderat" },
              { name: "Aerob glykolyse",   role: "Moderat Warburg",                                                              level: "Moderat" },
            ],
            mutations: ["MLH1 promoter methylering (~80% af sporadisk MSI-H)", "BRAF V600E (~50% ved sporadisk MSI-H)", "PIK3CA (~40%)", "KRAS (~25%)", "Lynch syndrom: MLH1/MSH2/MSH6/PMS2 kimcellelinje"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → reducerer WNT/β-catenin-signalering og mTOR. Reducerer PD-L1-ekspression og MDSC — synergi med pembrolizumab", note: "Observationsstudier: forbedret overlevelse ved CRC på metformin. Kombinationsstudier med pembrolizumab igangværende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+MSI+colorectal+cancer" },
            { name: "Aspirin",    ev: "p3",  mech: "COX-2 hæmning → reducerer PGE2 der aktiverer WNT og immunsupprimerer tumor-mikroenvironment. Særlig stærk evidens ved MSI-H CRC", note: "Primærpræventionsstudier (ASPIRIN CRC): 20–40% recidivreduktion. Stærkest evidens netop ved MSI-H.", inter: "⚠️ Blødningsrisiko. Monitorér HB.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+MSI+colorectal+cancer" },
            { name: "Cimetidin",  ev: "p12", mech: "H2-receptor-antagonist → blokerer histaminmedieret immunsuppression og reducerer MDSC-rekruttering til tumoren", note: "Randomiseret studie (Matsumoto 2002): forbedret 10-årsoverlevelse ved CRC + cimetidin. 800 mg/dag.", inter: "Interagerer med CYP450 — tjek polyfarmaci.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=cimetidine+colorectal+cancer" },
            { name: "LDN",        ev: "p12", mech: "TLR4-antagonisme → øger NK-celleaktivitet og reducerer MDSC. Synergi med immunterapi ved MSI-H", note: "3–4,5 mg/aften. Observationsdata lovende.", inter: "⚠️ Opioid-medicin absolut kontraindiceret.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=low+dose+naltrexone+colorectal" },
          ],
          supplements: [
            { name: "Vitamin D3",         dose: "2.000–5.000 IE/dag",  ev: "p3",  mech: "Stærkest CRC-evidens af alle vitaminer. Reducerer WNT/β-catenin og COX-2. SUNSHINE RCT: forbedret PFS", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)",  dose: "2–3 g/dag",           ev: "p12", mech: "COX-2 hæmning, anti-inflammatorisk, modulerer immunmikromiljø",              inter: "Let blødningsforstærkende" },
            { name: "Probiotika",         dose: "10–50 mia. CFU/dag",  ev: "p12", mech: "Mikrobiomet afgørende for immunterapi-respons. Lav diversitet = dårligere pembrolizumab-outcome", inter: "Ingen kendte alvorlige" },
          ],
          biomarkers: [
            { name: "MMR (IHC: MLH1/MSH2/MSH6/PMS2)", why: "Bekræfter dMMR-status. Tab af et MMR-protein = immunterapi-indikation ved metastatisk CRC", crit: true },
            { name: "MSI (PCR eller NGS)",             why: "Bekræfter MSI-H. Kræves for pembrolizumab-godkendelse",                                        crit: true },
            { name: "Lynch syndrom screening",         why: "MLH1 methylering udelukker Lynch. Positiv IHC kræver kimcellelinje-test",                      crit: true },
            { name: "BRAF V600E",                      why: "Muteret i ~50% af sporadisk MSI-H — prognostisk markør. Lynch er BRAF-negativ",                crit: false },
            { name: "TMB (mut/Mb)",                    why: "Høj TMB understøtter immunterapi-respons ved tvivlsomme PD-L1 tilfælde",                       crit: false },
          ],
          trials: [
            { name: "KEYNOTE-177 (Pembrolizumab 1. linje MSI-H CRC)", phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT02563002" },
            { name: "Aspirin + immunterapi (CRC)",                     phase: "Fase 2",  status: "Igangværende",        url: "https://clinicaltrials.gov/search?cond=colorectal+cancer&term=aspirin+immunotherapy" },
            { name: "Alle aktive MSI-H CRC studier",                   phase: "Alle",    status: "–",                   url: "https://clinicaltrials.gov/search?cond=MSI+colorectal+cancer&type=Interventional&recrs=a" },
          ],
        },

        // MSS — KRAS/NRAS muteret
        {
          id: "kolon_mss_kras", name: "MSS — KRAS/NRAS-muteret", badge: "Anti-EGFR ineffektiv", badgeColor: T.rose,
          criteria: "Kolonkarcinom / MSS eller pMMR / KRAS eller NRAS mutation i codon 12/13/59/61/117/146",
          biology: {
            summary: "KRAS/NRAS-muteret MSS kolorektal kræft er den hyppigste subtype (~40%). Mutationerne giver konstitutiv RAS/MAPK-aktivering og gør anti-EGFR-behandling (cetuximab, panitumumab) virkningsløs. Energistofskiftet er stærkt glykolytisk. Immunmikromiljøet er typisk 'koldt' — immunterapi sjældent effektivt.",
            pathways: [
              { name: "KRAS/NRAS/RAS",    role: "Primær driver — konstitutiv RAS-aktivering",                    level: "Ekstremt høj" },
              { name: "RAS/MAPK/ERK",     role: "Konstant aktiveret downstream af muteret RAS",                  level: "Ekstremt høj" },
              { name: "WNT/β-catenin",    role: "Hyppigt ko-aktiveret via APC-mutation",                        level: "Høj" },
              { name: "PI3K/AKT/mTOR",    role: "Ko-aktiveret i ~30%",                                          level: "Moderat-høj" },
              { name: "Aerob glykolyse",  role: "Stærkt Warburg-præget — KRAS driver GLUT1-overekspression",    level: "Høj" },
              { name: "Autopagi",         role: "Overlevelsesmekanisme — angrebspunkt for HCQ",                 level: "Moderat-høj" },
            ],
            mutations: ["KRAS G12D (~35%)", "KRAS G12V (~20%)", "KRAS G12C (~5%)", "NRAS Q61K/R (~5%)", "APC (~80%)", "TP53 (~60%)"],
          },
          offLabel: [
            { name: "Metformin",    ev: "p12", mech: "AMPK → hæmmer RAS/MAPK og mTOR. Reducerer KRAS-drevet GLUT1-overekspression og aerob glykolyse", note: "Retrospektive studier: forbedret overlevelse hos CRC-patienter på metformin. Fase 2 igangværende ved KRAS-muteret CRC.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+KRAS+colorectal+cancer" },
            { name: "Aspirin",      ev: "p3",  mech: "COX-2 hæmning → reducerer KRAS-drevet PGE2-produktion. Observationsstudier: 30% recidivreduktion ved CRC generelt", note: "ADD-ASPIRIN RCT igangværende — størst RCT i CRC sekundærprævention.",         inter: "Blødningsrisiko. Monitorér HB.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+KRAS+colorectal" },
            { name: "HCQ",          ev: "p12", mech: "Autopagi-hæmning — KRAS-muterede tumorer er stærkt autopagi-afhængige. Synergi med FOLFOX", note: "Fase 2: HCQ + FOLFOX ved metastatisk KRAS-muteret CRC — lovende data.", inter: "⚠️ QT-forlængelse. EKG.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+KRAS+colorectal" },
            { name: "Statin",       ev: "p12", mech: "Mevalonat-hæmning → reducerer RAS-membrananchoring → svækker konstitutiv RAS/MAPK direkte", note: "Biologisk stærkt rationale ved KRAS-mutation. Retrospektive CRC-data lovende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+KRAS+colorectal+cancer" },
            { name: "Mebendazol",   ev: "p12", mech: "Tubulin-hæmmer → mitosestop. Reducerer VEGF og angiogenese. Anti-WNT-effekt via β-catenin", note: "Case serie ved metastatisk CRC. Kliniske studier igangværende.", inter: "God tolerabilitet. Monitorér LFT.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=mebendazole+colorectal+cancer" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag",  ev: "p3",  mech: "Stærkest CRC-evidens. SUNSHINE RCT: D3 tilskud + FOLFOX = forbedret PFS ved metastatisk CRC", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",           ev: "p12", mech: "COX-2 hæmning, anti-inflammatorisk, modulerer RAS-aktivering via lipid-rafts",              inter: "Let blødningsforstærkende" },
            { name: "Curcumin",          dose: "500–1.000 mg/dag",    ev: "p12", mech: "WNT/β-catenin hæmning, NF-κB hæmning og anti-glykolytisk. Godt dokumenteret i CRC",       inter: "Let blødningsforstærkende" },
            { name: "Quercetin",         dose: "500–1.000 mg/dag",    ev: "pre", mech: "KRAS-downstream MAPK-hæmning og GLUT1-inhibition → reducerer glykolyse",                   inter: "Kan hæmme CYP3A4" },
          ],
          biomarkers: [
            { name: "KRAS/NRAS extended RAS (exon 2/3/4)", why: "KRAS/NRAS mutation = anti-EGFR virkningsløst. Skal testes før enhver anti-EGFR overvejelse", crit: true },
            { name: "BRAF V600E",           why: "Ko-mutation i ~5% af KRAS-muterede — meget dårlig prognose. Udelukker anti-EGFR",                           crit: false },
            { name: "MSI/dMMR",             why: "MSS bekræftes — udelukker immunterapi som monoterapi",                                                       crit: true },
            { name: "PIK3CA mutation",      why: "Ko-mutation i ~30% — behandlingsresistens og potentiel target",                                              crit: false },
            { name: "KRAS G12C specifikt",  why: "Åbner for sotorasib/adagrasib ved metastatisk sygdom",                                                       crit: false },
          ],
          trials: [
            { name: "HCQ + FOLFOX (KRAS-muteret CRC)",    phase: "Fase 2",  status: "Igangværende",  url: "https://clinicaltrials.gov/search?cond=KRAS+colorectal&term=hydroxychloroquine" },
            { name: "ADD-ASPIRIN (sekundærprævention CRC)", phase: "Fase 3", status: "Igangværende",  url: "https://clinicaltrials.gov/search?cond=colorectal+cancer&term=aspirin+prevention" },
            { name: "Alle aktive KRAS CRC studier",        phase: "Alle",    status: "–",             url: "https://clinicaltrials.gov/search?cond=KRAS+colorectal+cancer&type=Interventional&recrs=a" },
          ],
        },

        // MSS — BRAF V600E muteret
        {
          id: "kolon_braf", name: "MSS — BRAF V600E-muteret", badge: "Dårligst prognose", badgeColor: T.rose,
          criteria: "Kolonkarcinom / MSS / BRAF V600E mutation (~8–10%)",
          biology: {
            summary: "BRAF V600E MSS kolorektal kræft har den dårligste prognose af alle CRC-subtyper — median OS under 1 år ved metastatisk sygdom. BRAF V600E giver konstitutiv MAPK-aktivering. I modsætning til BRAF-muteret melanom er BRAF-hæmmere alene ineffektive i CRC pga. EGFR-feedback-reaktivering — kombinationen encorafenib + cetuximab er standardbehandling.",
            pathways: [
              { name: "BRAF V600E/MAPK", role: "Primær driver — konstitutiv MEK/ERK aktivering",                level: "Ekstremt høj" },
              { name: "EGFR-feedback",   role: "EGFR reaktiveres ved BRAF-hæmning — kræver dobbelt blokade",  level: "Høj" },
              { name: "WNT/β-catenin",  role: "Ko-aktiveret via APC",                                         level: "Høj" },
              { name: "Aerob glykolyse", role: "Stærkt Warburg-præget",                                        level: "Høj" },
              { name: "mTOR",           role: "Aktiveret via RAS-uafhængig PI3K-aktivering",                  level: "Moderat-høj" },
            ],
            mutations: ["BRAF V600E (~10% CRC)", "APC (~60%)", "TP53 (~50%)", "PIK3CA (~20%)", "SMAD4 tab"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og reducerer BRAF/MAPK-drevet aerob glykolyse. Svækker EGFR-feedback-mekanisme", note: "Kombinationsstudier med encorafenib + cetuximab igangværende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+BRAF+colorectal" },
            { name: "Aspirin",    ev: "p12", mech: "COX-2 hæmning — BRAF V600E driver COX-2-overekspression. Aspirin blokerer dette direkte", note: "Biologisk stærkt rationale specifikt for BRAF V600E CRC.", inter: "Blødningsrisiko.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+BRAF+colorectal" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer MEK/ERK-signalering downstream. Synergi med BRAF-hæmning", note: "Retrospektive data: forbedret prognose ved CRC på statin.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+BRAF+colorectal" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Reducerer MAPK-aktivering og WNT. Vigtig anti-proliferativ effekt",    inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, COX-2 hæmning — reducerer PGE2-drevet vækst",     inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "BRAF V600E (NGS + IHC)",    why: "Bekræfter BRAF-status og indikerer encorafenib + cetuximab (BEACON CRC). Dårlig prognose-markør", crit: true },
            { name: "MSI/dMMR",                  why: "BRAF MSI-H = Lynch udelukket + bedre immunterapi-respons end BRAF MSS",                           crit: true },
            { name: "KRAS/NRAS extended RAS",    why: "BRAF V600E er RAS-wildtype — anti-EGFR del af standardkombination",                               crit: true },
            { name: "PIK3CA mutation",           why: "Ko-mutation øger behandlingsresistens",                                                            crit: false },
          ],
          trials: [
            { name: "BEACON CRC (Encorafenib + cetuximab)", phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT02928224" },
            { name: "Alle aktive BRAF CRC studier",         phase: "Alle",    status: "–",                   url: "https://clinicaltrials.gov/search?cond=BRAF+colorectal+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    // ── REKTALCANCER ──────────────────────────────────────────────────────────
    {
      id:   "rektal",
      name: "Rektalcancer",
      color: T.purple,
      pct:  "~30% af kolorektal kræft",
      subtypes: [
        {
          id: "rektal_lok", name: "Lokalt avanceret rektalcancer", badge: "Kemoradiation 1. linje", badgeColor: T.purple,
          criteria: "Rektalcancer / cT3–T4 eller N+ / neoadjuvant behandling indiceret",
          biology: {
            summary: "Lokalt avanceret rektalcancer behandles primært med neoadjuvant kemoradiation (capecitabin + stråling) efterfulgt af kirurgi. Total neoadjuvant terapi (TNT) med tilhørende immunterapi ved MSI-H er en vigtig ny strategi. Biologien ligner kolon CRC men med særlige karakteristika pga. det snævre bækken-anatomiske miljø.",
            pathways: [
              { name: "WNT/β-catenin",   role: "Primær driver via APC-mutation (~75%)",                level: "Høj" },
              { name: "RAS/MAPK",        role: "Aktiveret via KRAS (~40%) eller BRAF (~5%)",           level: "Høj" },
              { name: "TGF-β",          role: "Stroma-interaktion og immunsuppression i rektum",      level: "Moderat-høj" },
              { name: "HIF-1α",         role: "Hypoksi-drevet pga. bækken-anatomiens lave ilttension",level: "Moderat-høj" },
              { name: "Aerob glykolyse", role: "Moderat Warburg",                                     level: "Moderat" },
            ],
            mutations: ["APC (~75%)", "KRAS (~40%)", "TP53 (~60%)", "SMAD4 (~15%)", "PIK3CA (~10%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og WNT. Reducerer hypoksi-inducerbar HIF-1α — potentielt radiosensibiliserende", note: "Fase 2: metformin + kemoradiation ved lokalt avanceret rektalcancer. Observationsstudier: forbedret pCR.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+rectal+cancer+chemoradiation" },
            { name: "Aspirin",    ev: "p12", mech: "COX-2 hæmning → radiosensibiliserer tumorceller. Reducerer stråleresistens via PGE2-hæmning",      note: "Retrospektive studier: forbedret pCR ved aspirin + kemoradiation.", inter: "Blødningsrisiko.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+rectal+cancer" },
            { name: "Statin",     ev: "p12", mech: "Radiosensibiliserende effekt via RAS-hæmning og reduktion af DNA-reparationskapacitet i tumorceller", note: "Observationsstudier: forbedret pCR ved statin + kemoradiation.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+rectal+cancer+chemoradiation" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag",  ev: "p12", mech: "Radiosensibiliserende og anti-WNT effekt. Reducerer stråleinduceret inflammation", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",           ev: "p12", mech: "Anti-inflammatorisk — reducerer stråleinduceret mukositis",                        inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "MSI/dMMR",           why: "MSI-H → total neoadjuvant immunterapi (pembrolizumab monoterapi giver ~100% klinisk komplet respons!)", crit: true },
            { name: "KRAS/NRAS/BRAF",     why: "RAS/BRAF-status styrer adjuverende systembehandling",                                                   crit: true },
            { name: "MRI EMVI",           why: "Ekstramural vaskulær invasion — vigtigste lokale prognostiske markør ved staging",                      crit: false },
            { name: "HER2 amplifikation", why: "Sjælden (~3%) men targetbar. NGS anbefales",                                                            crit: false },
          ],
          trials: [
            { name: "Metformin + kemoradiation (rektal)", phase: "Fase 2",  status: "Igangværende", url: "https://clinicaltrials.gov/search?cond=rectal+cancer&term=metformin" },
            { name: "Pembrolizumab monoterapi (MSI-H rektal)", phase: "Fase 2", status: "Positiv",  url: "https://clinicaltrials.gov/search?cond=rectal+cancer+MSI&term=pembrolizumab" },
            { name: "Alle aktive rektalcancer studier",  phase: "Alle",    status: "–",             url: "https://clinicaltrials.gov/search?cond=rectal+cancer&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    // ── ARVELIGE FORMER ───────────────────────────────────────────────────────
    {
      id:   "arvelig",
      name: "Arvelige former",
      color: T.amber,
      pct:  "~5% af kolorektal kræft",
      subtypes: [
        {
          id: "lynch", name: "Lynch syndrom-relateret", badge: "Arvelig — immunterapi-responsiv", badgeColor: T.green,
          criteria: "CRC ved MLH1/MSH2/MSH6/PMS2 kimcellelinje-mutation / Altid MSI-H / BRAF V600E negativ",
          biology: {
            summary: "Lynch syndrom er den hyppigste arvelige kræftsyndrom (~1 ud af 400 i befolkningen) og forårsager ~3% af al CRC. Kimcellelinje-mutation i et MMR-gen giver massiv mutationsakkumulering i celler. CRC ved Lynch er altid MSI-H og reagerer fremragende på immunterapi. Pembrolizumab giver 60–70% responsrate.",
            pathways: [
              { name: "MMR-deficiens",   role: "Definerende — kimcellelinje MMR-mutation",                    level: "Ekstremt høj" },
              { name: "PD-1/PD-L1",     role: "Høj TIL-infiltration og PD-L1-ekspression",                  level: "Høj" },
              { name: "WNT/β-catenin",  role: "Sekundær driver via APC",                                     level: "Moderat-høj" },
              { name: "Frameshift-mutationer", role: "Massiv neoantigenbelastning pga. MMR-deficiens",       level: "Ekstremt høj" },
            ],
            mutations: ["MLH1 kimcellelinje (~40%)", "MSH2 kimcellelinje (~35%)", "MSH6 kimcellelinje (~15%)", "PMS2 kimcellelinje (~10%)", "EPCAM deletion"],
          },
          offLabel: [
            { name: "Aspirin",   ev: "p3",  mech: "COX-2 hæmning → reducerer Lynch-relateret CRC-risiko. Primærprævention ved Lynch syndrom", note: "CAPP2 RCT: 600 mg/dag aspirin reducerede CRC-incidensen med 60% hos Lynch-bærere. Stærkest aspirin-evidens i onkologi.", inter: "⚠️ Blødningsrisiko ved høje doser. 100 mg foretrækkes til primærprævention.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+Lynch+syndrome+CAPP2" },
            { name: "Metformin", ev: "p12", mech: "AMPK → reducerer IGF-1 og insulin der driver WNT/β-catenin og mutationsbyrde. Præklinisk: reducerer Lynch-relaterede tumorer", note: "CAPP3 RCT (metformin + aspirin ved Lynch syndrom) igangværende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+Lynch+syndrome+CAPP3" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-proliferativ og immunmodulerende — kan reducere Lynch-relateret CRC-risiko", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "COX-2-hæmning — synergi med aspirin ved Lynch præventionsstrategi",              inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "MLH1/MSH2/MSH6/PMS2 kimcellelinje", why: "Bekræfter Lynch syndrom-diagnosen. Afgørende for hele familiens genetiske rådgivning",         crit: true },
            { name: "MSI-H bekræftelse",                  why: "Alle Lynch CRC er MSI-H — pembrolizumab er 1. linjevalg ved metastatisk sygdom",               crit: true },
            { name: "BRAF V600E negativ",                  why: "BRAF V600E udelukker Lynch — sporadisk MSI-H via MLH1-methylering i stedet",                  crit: true },
            { name: "EPCAM deletion",                      why: "MSH2-inaktivering via EPCAM deletion — screenes for ved MSH2-negativ IHC uden mutation",      crit: false },
          ],
          trials: [
            { name: "CAPP2 (Aspirin ved Lynch)", phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/search?cond=Lynch+syndrome&term=aspirin" },
            { name: "CAPP3 (Metformin + aspirin)", phase: "Fase 3", status: "Igangværende",       url: "https://clinicaltrials.gov/search?cond=Lynch+syndrome&term=metformin" },
            { name: "Alle aktive Lynch studier",  phase: "Alle",    status: "–",                  url: "https://clinicaltrials.gov/search?cond=Lynch+syndrome&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};
