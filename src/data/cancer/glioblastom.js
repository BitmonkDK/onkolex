import { T } from "../../theme.js";

// ─── Hjernekræft / Gliomer (C71) ─────────────────────────────────────────────

export const glioblastom = {
  id:    "glioblastom",
  name:  "Hjernekræft (Gliomer)",
  icd10: "C71",
  icon:  "🧠",
  intro: "Gliomer er den hyppigste primære hjernetumor. IDH-mutationsstatus er den vigtigste biologiske skillelinje og adskiller tumorer med vidt forskellig prognose og behandlingsstrategi.",

  groups: [

    // ── GLIOBLASTOM ───────────────────────────────────────────────────────────
    {
      id:   "gbm",
      name: "Glioblastom (GBM, grad 4)",
      color: T.rose,
      pct:  "~45% af alle primære hjernetumorer — dårligst prognose",
      subtypes: [

        {
          id: "gbm_idh_wt", name: "Glioblastom — IDH-wildtype", badge: "Primær GBM — dårligst prognose", badgeColor: T.rose,
          criteria: "Grad 4 astrocytom / IDH-wildtype / TERT-promoter mutation og/eller EGFR-amplifikation og/eller +7/−10",
          biology: {
            summary: "IDH-wildtype GBM er den mest aggressive primære hjernetumor med median overlevelse på 12–15 måneder trods standardbehandling (Stupp-protokollen: resektion + temozolomid + stråling). Blod-hjerne-barrieren begrænser drastisk, hvilke lægemidler der kan nå tumoren. Energistofskiftet er ekstremt Warburg-præget kombineret med massiv glutaminolyse. MGMT-promoter methylering er afgørende for temozolomid-respons.",
            pathways: [
              { name: "EGFR/EGFRvIII",   role: "Amplificeret i ~50% — konstitutiv kinaseaktivering",              level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",   role: "PTEN-tab i ~40% — primær overlevelsessignalvej",                 level: "Høj" },
              { name: "RAS/MAPK",        role: "Ko-aktiveret med EGFR",                                          level: "Høj" },
              { name: "Aerob glykolyse", role: "Ekstremt Warburg-præget — GLUT3 overudtrykt (hjerne-specifik)",  level: "Ekstremt høj" },
              { name: "Glutaminolyse",   role: "Primær nitrogen- og TCA-kilde ved hurtig vækst",                 level: "Høj" },
              { name: "HIF-1α/hypoksi",  role: "Central driver — GBM har massivt hypoksiske nekrotiske kerneområder", level: "Høj" },
              { name: "Autopagi",        role: "Overlevelsesmekanisme under behandlingsstress",                  level: "Moderat-høj" },
            ],
            mutations: ["TERT-promoter (~72%)", "EGFR amplifikation (~50%)", "PTEN-tab (~40%)", "CDK4 amplifikation", "MDM2 amplifikation", "RB1-tab (~11%)", "NF1 mutation (~10%)"],
          },
          offLabel: [
            {
              name: "Metformin", ev: "p12",
              mech: "AMPK → hæmmer mTOR og aerob glykolyse. Passerer blod-hjerne-barrieren. Reducerer EGFR-signalering og GBM-stammecelle-populationen",
              note: "Retrospektive studier: GBM-patienter på metformin lever længere. Fase 2: metformin + temozolomid + stråling (MAGE-studiet) igangværende. En af de bedst dokumenterede off-label muligheder specifikt i GBM.",
              inter: "Standard. Undgå ved eGFR < 30 ml/min.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+glioblastoma"
            },
            {
              name: "Chloroquin / HCQ", ev: "p12",
              mech: "Lysosomhæmning → blokerer autopagi → GBM-celler kan ikke recycle under stråle- og kemo-stress. Krydser blod-hjerne-barrieren bedre end de fleste lægemidler",
              note: "Fase 2 (Sotelo 2006): chloroquin + stråling/kemo forbedret OS. Chloroquin foretrækkes over HCQ i GBM da det bedre passerer blod-hjerne-barrieren.",
              inter: "⚠️ QT-forlængelse. EKG obligatorisk. Øjenundersøgelse ved langtidsbrug.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=chloroquine+glioblastoma"
            },
            {
              name: "Mebendazol", ev: "p12",
              mech: "Tubulin-hæmmer → mitosestop. Hæmmer VEGF, angiogenese og blod-hjerne-barriere-overtrædelse. Passerer blod-hjerne-barrieren. Anti-EGFR downstream-effekt",
              note: "Fase 1/2: mebendazol ved recidiverende GBM — lovende responsdata. Case reports med langvarig overlevelse. Bruges i Vine-protokollen.",
              inter: "God tolerabilitet. Monitorér LFT.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=mebendazole+glioblastoma"
            },
            {
              name: "Itraconazol", ev: "p12",
              mech: "Hedgehog-signalvejshæmmer → reducerer GBM-stammecelle-populationen. Anti-angiogenetisk via VEGFR-2-hæmning. Passerer blod-hjerne-barrieren",
              note: "Fase 2: itraconazol ved recidiverende GBM — disease stabilization opnået. 200–400 mg/dag.",
              inter: "⚠️ Stærk CYP3A4-hæmmer — interagerer med temozolomid og andre GBM-midler. Tjek nøje.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=itraconazole+glioblastoma"
            },
            {
              name: "Disulfiram (Antabus) + kobber", ev: "p12",
              mech: "Disulfiram-kobber-kompleks hæmmer proteasomet og NF-κB. Passerer blod-hjerne-barrieren. Særlig aktiv mod GBM-stammeceller og temozolomid-resistente celler",
              note: "Fase 2: disulfiram + kobber + kemo ved recidiverende GBM — progressionsstabilisering. Kobber (1–2 mg/dag) er nødvendig kofaktor.",
              inter: "⚠️ ABSOLUT KI: alkohol. LFT-monitorering. Kobberstatus bør testes.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=disulfiram+copper+glioblastoma"
            },
            {
              name: "Doxycyclin", ev: "p12",
              mech: "Hæmmer mitokondrie-biogenese og MMP — reducerer GBM-invasion. Anti-angiogenetisk. Passerer blod-hjerne-barrieren",
              note: "Lisanti-gruppen: doxycyclin + vitamin C synergistisk i GBM-stamcelle-modeller. Kombinationsstudier igangværende.",
              inter: "Lysoverfølsomhed. Ikke under graviditet.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=doxycycline+glioblastoma"
            },
          ],
          supplements: [
            { name: "Omega-3 (EPA/DHA)",    dose: "3–4 g/dag",              ev: "p12", mech: "Anti-inflammatorisk, hæmmer HIF-1α og VEGF. Reducerer GBM-invasion via DHA-specifik DHA-synaptamid-mekanisme",   inter: "Let blødningsforstærkende" },
            { name: "Vitamin D3",           dose: "2.000–5.000 IE/dag",     ev: "p12", mech: "Hæmmer GBM-proliferation via VDR. Reducerer temozolomid-resistens i cellelinjer",                               inter: "Ingen kendte alvorlige" },
            { name: "Melatonin",            dose: "20–40 mg/aften",         ev: "p12", mech: "Passerer blod-hjerne-barrieren. Anti-GBM: reducerer VEGF, hæmmer Warburg og sensibiliserer for stråling",        inter: "Sederende — positivt ved GBM-relateret søvnforstyrrelse" },
            { name: "Curcumin (liposomal)", dose: "500–2.000 mg/dag",       ev: "pre", mech: "NF-κB og EGFR-hæmning i GBM-cellelinjer. Standard curcumin passerer IKKE blod-hjerne-barrieren — liposomal form nødvendig", inter: "Let blødningsforstærkende" },
            { name: "Vitamin C (IV høj)",   dose: "25–75 g IV (onkolog)",   ev: "p12", mech: "Pro-oxidant ROS-mekanisme i Warburg-afhængige GBM-celler. Combineres med doxycyclin i Lisanti-protokollen",      inter: "⚠️ Kontraindiceret ved G6PD-mangel. Ikke same dag som kemo." },
          ],
          biomarkers: [
            { name: "MGMT-promoter methylering", why: "Methyleret (~45%) = bedre respons på temozolomid og signifikant bedre prognose. Afgørende behandlingsbeslutning",                    crit: true },
            { name: "IDH1/2 mutation",           why: "IDH-wildtype bekræfter GBM-diagnosen. IDH-muteret = anderledes biologi og bedre prognose (se IDH-muteret astrocytom)",             crit: true },
            { name: "EGFR amplifikation / EGFRvIII", why: "EGFRvIII = konstitutiv aktivering. Target for rindopepimut-vaccine og bispecifikke antistoffer i studier",                    crit: false },
            { name: "TERT-promoter mutation",    why: "Bekræfter IDH-wildtype GBM-klassifikation (WHO 2021). Prognostisk markør",                                                         crit: false },
            { name: "PTEN-tab (IHC/FISH)",       why: "PTEN-tab → PI3K-hæmmer relevant i studier",                                                                                       crit: false },
            { name: "1p/19q kodeletion",         why: "Udelukker oligodendrogliom — er altid absent ved IDH-wildtype GBM",                                                               crit: false },
            { name: "CDKN2A/B homozygot tab",    why: "Ekstremt dårlig prognose ved IDH-muteret astrocytom — opklassificerer til grad 4",                                                crit: false },
          ],
          trials: [
            { name: "MAGE (Metformin + TMZ + stråling)", phase: "Fase 2",  status: "Igangværende",         url: "https://clinicaltrials.gov/search?cond=glioblastoma&term=metformin" },
            { name: "Chloroquin + Stupp-protokol",       phase: "Fase 2",  status: "Igangværende",         url: "https://clinicaltrials.gov/search?cond=glioblastoma&term=chloroquine" },
            { name: "Mebendazol + kemo (GBM)",           phase: "Fase 1–2",status: "Rekrutterer",          url: "https://clinicaltrials.gov/search?cond=glioblastoma&term=mebendazole" },
            { name: "Disulfiram + kobber (recidiv GBM)", phase: "Fase 2",  status: "Igangværende",         url: "https://clinicaltrials.gov/search?cond=glioblastoma&term=disulfiram" },
            { name: "Alle aktive GBM studier",           phase: "Alle",    status: "–",                    url: "https://clinicaltrials.gov/search?cond=glioblastoma&type=Interventional&recrs=a" },
          ],
        },

        {
          id: "gbm_idh_mut", name: "Grad 4 Astrocytom — IDH-muteret", badge: "Bedre prognose end IDH-wildtype", badgeColor: T.amber,
          criteria: "Grad 4 astrocytom / IDH1 R132H eller IDH2 R172K mutation / CDKN2A/B homozygot tab",
          biology: {
            summary: "IDH-muteret grad 4 astrocytom er biologisk fundamentalt anderledes end IDH-wildtype GBM. IDH-mutationen producerer 2-hydroxyglutaraat (2-HG) der hæmmer DNA-demetylaser og skaber CpG-island methylator phenotype (CIMP). Median OS er 20–30 måneder — markant bedre end IDH-wildtype. IDH-hæmmere (vorasidenib) er nu godkendt og ændrer behandlingslandskabet.",
            pathways: [
              { name: "IDH1/2 mutation → 2-HG", role: "Definerende — 2-HG inhiberer TET2 og ALKBH og driver epigenetisk reprogrammering", level: "Ekstremt høj" },
              { name: "PI3K/AKT/mTOR",          role: "Ko-aktiveret i ~40%",                                                              level: "Moderat-høj" },
              { name: "Aerob glykolyse",         role: "Moderat Warburg — lavere end IDH-wildtype",                                       level: "Moderat" },
              { name: "OXPHOS",                  role: "Relativt højere OXPHOS-afhængighed end IDH-wildtype",                             level: "Moderat-høj" },
              { name: "CDKN2A/B tab",            role: "Driver ukontrolleret celledeling — definerer grad 4",                             level: "Høj" },
            ],
            mutations: ["IDH1 R132H (~90% af IDH-mut)", "IDH2 R172K (~10%)", "ATRX-tab", "TP53 mutation", "CDKN2A/B homozygot tab (grad 4)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR og 2-HG-induceret glykolytisk omprogrammering. Synergi med IDH-hæmmere",              note: "Biologisk stærkt rationale ved IDH-muteret tumor.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+IDH+mutant+glioma" },
            { name: "HCQ",        ev: "p12", mech: "Autopagi-hæmning — IDH-muterede tumorer er stærkt afhængige af autopagi under 2-HG-stress",             note: "Synergi med vorasidenib præklinisk.", inter: "⚠️ QT-forlængelse. EKG.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+IDH+glioma" },
            { name: "Mebendazol", ev: "p12", mech: "Tubulin-hæmmer og anti-angiogenetisk. Passerer blod-hjerne-barrieren",                                   note: "Bruges i kombinationsprotokoller ved IDH-muteret grad 3–4.", inter: "God tolerabilitet. LFT.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=mebendazole+IDH+glioma" },
          ],
          supplements: [
            { name: "Omega-3 (EPA/DHA)", dose: "3–4 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, hæmmer 2-HG-induceret immunsuppression", inter: "Let blødningsforstærkende" },
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag",  ev: "p12", mech: "Anti-proliferativ via VDR",                                   inter: "Ingen kendte alvorlige" },
            { name: "Melatonin",         dose: "20–40 mg/aften",      ev: "p12", mech: "Passerer blod-hjerne-barrieren. Anti-proliferativ og strålesensibiliserende", inter: "Sederende" },
          ],
          biomarkers: [
            { name: "IDH1/2 mutation (IHC + NGS)", why: "Bekræfter IDH-muteret status — fundamentalt anderledes prognose og behandling end IDH-wildtype",  crit: true },
            { name: "MGMT-promoter methylering",   why: "Methyleret = bedre temozolomid-respons. Yderligere prognostisk markør",                           crit: true },
            { name: "CDKN2A/B homozygot tab",      why: "Opklassificerer IDH-muteret astrocytom til grad 4 (WHO 2021) — afgørende for behandlingsstrategi", crit: true },
            { name: "ATRX-tab (IHC)",              why: "Bekræfter astrocytom-linjage (udelukker oligodendrogliom)",                                       crit: false },
            { name: "1p/19q kodeletion",           why: "Absent ved astrocytom — tilstedeværelse = oligodendrogliom diagnose",                             crit: false },
          ],
          trials: [
            { name: "INDIGO (Vorasidenib ved IDH-muteret grad 2–3)", phase: "Fase 3",  status: "Positiv — afsluttet", url: "https://clinicaltrials.gov/study/NCT04164901" },
            { name: "Alle aktive IDH-muteret gliom studier",         phase: "Alle",    status: "–",                   url: "https://clinicaltrials.gov/search?cond=IDH+mutant+glioma&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    // ── LAVGRADIG GLIOM ───────────────────────────────────────────────────────
    {
      id:   "lavgradig",
      name: "Lavgradig Gliom (grad 2–3)",
      color: T.amber,
      pct:  "~20% af gliomer",
      subtypes: [

        {
          id: "oligo", name: "Oligodendrogliom (grad 2–3)", badge: "Bedst prognose — IDH + 1p/19q", badgeColor: T.green,
          criteria: "IDH-muteret / 1p/19q kodeletion / grad 2 eller 3",
          biology: {
            summary: "Oligodendrogliom er den mest gunstige gliom-subtype med median OS på 10–15 år ved grad 2 og 6–8 år ved grad 3. Den definerende kombination af IDH-mutation og 1p/19q-kodeletion giver ekstremt god kemoterapi-sensitivitet (PCV-regimen). 2-HG-produktion via IDH driver epigenetisk reprogrammering analogt med IDH-muteret astrocytom.",
            pathways: [
              { name: "IDH1/2 → 2-HG",       role: "Definerende — epigenetisk reprogrammering via 2-HG",         level: "Høj" },
              { name: "1p/19q kodeletion",    role: "Definerende — tab af tumor-suppressorer på 1p og 19q",      level: "Høj" },
              { name: "TERT-promoter",        role: "Aktiveret i ~90% — telomerlængde-vedligeholdelse",           level: "Moderat-høj" },
              { name: "PI3K/AKT",            role: "Moderat aktivering",                                         level: "Moderat" },
              { name: "Aerob glykolyse",     role: "Lavere end GBM — relativt indolent metabolisme",             level: "Lav-moderat" },
            ],
            mutations: ["IDH1/2 mutation", "1p/19q kodeletion (definerende)", "TERT-promoter mutation (~90%)", "CIC mutation (~70%)", "FUBP1 mutation (~20%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer mTOR. Reducerer 2-HG-drevet glykolytisk omprogrammering", note: "Biologisk rationale ved IDH-muteret tumor.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+oligodendroglioma" },
            { name: "Mebendazol", ev: "pre", mech: "Tubulin-hæmmer og VEGF-reduktion. Passerer blod-hjerne-barrieren",      note: "Bruges i kombinationsprotokoller.", inter: "God tolerabilitet.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=mebendazole+oligodendroglioma" },
          ],
          supplements: [
            { name: "Omega-3 (EPA/DHA)", dose: "3–4 g/dag",         ev: "p12", mech: "Anti-inflammatorisk, neuroprotektiv",        inter: "Let blødningsforstærkende" },
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-proliferativ via VDR",                  inter: "Ingen kendte alvorlige" },
            { name: "Melatonin",         dose: "10–20 mg/aften",     ev: "p12", mech: "Anti-proliferativ og neuroprotektiv",        inter: "Sederende" },
          ],
          biomarkers: [
            { name: "IDH1/2 + 1p/19q (FISH + NGS)", why: "Begge nødvendige for oligodendrogliom-diagnosen (WHO 2021). Definerer behandling og prognose", crit: true },
            { name: "MGMT-promoter methylering",    why: "Methyleret = bedre kemoterapi-respons (PCV/TMZ)",                                              crit: false },
            { name: "TERT-promoter mutation",       why: "Ko-faktor i oligodendrogliom-diagnosen",                                                       crit: false },
          ],
          trials: [
            { name: "CODEL (Stråling ± PCV vs TMZ)", phase: "Fase 3",  status: "Igangværende", url: "https://clinicaltrials.gov/study/NCT00887146" },
            { name: "Alle aktive oligodendrogliom studier", phase: "Alle", status: "–",        url: "https://clinicaltrials.gov/search?cond=oligodendroglioma&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};
