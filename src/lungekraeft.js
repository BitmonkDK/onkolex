import { T } from "../../theme.js";

export const lymfom = {
  id:    "lymfom",
  name:  "Lymfom",
  icd10: "C81–C86",
  icon:  "🫀",
  intro: "Lymfomer er en heterogen gruppe lymfesystemkræftformer. Hodgkin lymfom er næsten altid kurativt behandlelig. Non-Hodgkin lymfom spænder fra meget indolente former til ekstremt aggressive.",

  groups: [
    {
      id: "hodgkin", name: "Hodgkin Lymfom (HL)", color: T.green, pct: "~10% af lymfomer",
      subtypes: [
        {
          id: "chl", name: "Klassisk Hodgkin Lymfom", badge: "Kurativt ~85–90%", badgeColor: T.green,
          criteria: "CD30+ Reed-Sternberg celler / nodulær sklerose (hyppigst) / blandet cellularitet / PD-L1 overudtrykt",
          biology: {
            summary: "Klassisk HL er karakteriseret ved Reed-Sternberg-celler der udgør kun 1–2% af tumormassen og er omgivet af massivt inflammatorisk mikromiljø. CD30 og PD-L1 er konstitutivt overudtrykt. JAK/STAT-signalering er central. Heldigvis er ~85–90% kurerbare med ABVD eller BrECADD. Pembrolizumab og nivolumab er godkendt ved recidiverende sygdom.",
            pathways: [
              { name: "JAK/STAT",      role: "Konstitutivt aktiveret — primær overlevelsessignalvej i RS-celler", level: "Ekstremt høj" },
              { name: "NF-κB",         role: "Konstitutivt aktiveret — anti-apoptotisk driver",                  level: "Høj" },
              { name: "PD-L1/CD30",    role: "Massivt overudtrykt — immunflugt og immunterapi-mål",             level: "Ekstremt høj" },
              { name: "PI3K/AKT",      role: "Ko-aktiveret",                                                    level: "Moderat-høj" },
              { name: "Aerob glykolyse",role: "Moderat Warburg",                                                level: "Moderat" },
            ],
            mutations: ["JAK2 amplifikation (~50%)", "TNFAIP3/A20 mutation (~25%)", "B2M mutation (~25%)", "PD-L1/PD-L2 amplifikation (~35%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer JAK/STAT og mTOR. Reducerer PD-L1-ekspression på RS-celler → synergi med pembrolizumab", note: "Observationsdata: HL-patienter på metformin har bedre respons på behandling.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+Hodgkin+lymphoma" },
            { name: "Aspirin",    ev: "p12", mech: "COX-2 hæmning → reducerer PGE2 i det inflammatoriske mikromiljø der opretholder RS-celler", note: "Biologisk rationale ved PGE2-drevet HL-mikromiljø.", inter: "Blødningsrisiko.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+Hodgkin+lymphoma" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat-hæmning → reducerer NF-κB og RAS/MAPK. Proapoptotisk i RS-cellelinjer", note: "Præklinisk evidens. Observationsdata lovende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+Hodgkin+lymphoma" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-JAK/STAT og immunmodulerende. Lav D3 = dårligere HL-prognose", inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk — reducerer det PGE2-drevne inflammatoriske mikromiljø", inter: "Let blødningsforstærkende" },
            { name: "Curcumin",          dose: "500–1.000 mg/dag",   ev: "pre", mech: "NF-κB og JAK/STAT hæmning i RS-cellelinjer", inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "CD30 (IHC)",           why: "Positivt i næsten alle cHL — indikerer brentuximab vedotin ved recidiv/refraktær sygdom",         crit: true },
            { name: "PD-L1 (IHC)",          why: "Overudtrykt ved RS-celler — pembrolizumab/nivolumab indiceret ved recidiv",                       crit: true },
            { name: "EBV-status (EBER ISH)", why: "EBV+ cHL = anderledes mikromiljø og prognose. Relevant for behandlingsstrategi",                crit: false },
            { name: "PET-CT (Deauville)",   why: "Interim PET afgørende for behandlingsintensivering. Deauville score 4–5 = eskalering",           crit: true },
          ],
          trials: [
            { name: "KEYNOTE-204 (Pembrolizumab recidiv cHL)", phase: "Fase 3",  status: "Positiv",      url: "https://clinicaltrials.gov/study/NCT02684292" },
            { name: "Alle aktive Hodgkin studier",             phase: "Alle",    status: "–",            url: "https://clinicaltrials.gov/search?cond=Hodgkin+lymphoma&type=Interventional&recrs=a" },
          ],
        },
      ],
    },

    {
      id: "nhl_b", name: "Non-Hodgkin B-celle lymfom", color: T.blue, pct: "~70% af lymfomer",
      subtypes: [
        {
          id: "dlbcl", name: "DLBCL (Diffust Storcellet B-celle)", badge: "Kurativt ~60% — GCB vs ABC vigtig", badgeColor: T.blue,
          criteria: "DLBCL / CD20+ / aggressivt Non-Hodgkin lymfom / GCB eller ABC subtype",
          biology: {
            summary: "DLBCL er det hyppigste aggressive lymfom. GCB-subtypen er BCL-2 rearrangeret og PI3K-drevet med bedre prognose. ABC-subtypen er NF-κB og BCR/BTK-afhængig med dårligere prognose. 'Double-hit' (MYC + BCL-2 og/eller BCL-6 rearrangement) er ekstremt aggressivt med median OS under 1 år uden intensiveret behandling. R-CHOP er 1. linjestandardbehandling.",
            pathways: [
              { name: "BCR/BTK (ABC-subtype)", role: "Primær driver i ABC — konstitutiv BCR-signalering",     level: "Høj" },
              { name: "PI3K/AKT (GCB-subtype)",role: "Primær driver i GCB — BCL-2 og PI3K co-aktiveret",    level: "Høj" },
              { name: "NF-κB (ABC-subtype)",   role: "Konstitutivt aktiveret via MYD88/CD79B mutation",      level: "Høj" },
              { name: "MYC-amplifikation",     role: "Double-hit: massiv proliferationsdrivkraft",           level: "Ekstremt høj" },
              { name: "Aerob glykolyse",       role: "MYC-drevet Warburg — stærkt Warburg-præget",          level: "Høj" },
              { name: "BCL-2 anti-apoptose",   role: "Overudtrykt i GCB via t(14;18) og ABC via NF-κB",     level: "Høj" },
            ],
            mutations: ["BCL-2 rearrangement (GCB ~20–30%)", "MYC rearrangement (double-hit ~10%)", "MYD88 L265P (ABC ~30%)", "CD79B mutation (ABC ~20%)", "TP53 (~20%)", "CREBBP/EP300"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → hæmmer MYC-drevet aerob glykolyse og mTOR. Reducerer BCL-2 anti-apoptose via AMPK. Synergistisk med R-CHOP", note: "Observationsdata: DLBCL-patienter på metformin har bedre respons på R-CHOP.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+DLBCL" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer RAS/RHO og NF-κB. Proapoptotisk via BCL-2-reduktion. Synergistisk med rituximab", note: "Fase 2: statin + R-CHOP. Retrospektive data lovende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+DLBCL" },
            { name: "HCQ",        ev: "p12", mech: "Autopagi-hæmning — double-hit DLBCL er stærkt autopagi-afhængige. Genopretter rituximab-sensitivitet", note: "Fase 1/2: HCQ + R-CHOP ved DLBCL igangværende.", inter: "⚠️ QT-forlængelse. EKG.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=hydroxychloroquine+DLBCL" },
            { name: "Disulfiram + kobber", ev: "pre", mech: "Hæmmer NF-κB og proteasomet — direkte angrebspunkt på ABC-subtypens NF-κB-afhængiged", note: "Stærk præklinisk evidens i ABC-DLBCL.", inter: "⚠️ ABSOLUT KI: alkohol. LFT.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=disulfiram+DLBCL" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-NF-κB og anti-MYC effekt. Lav D3 associeret med dårligere DLBCL-prognose",    inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, reducerer NF-κB og mikromiljø-inflammatorisk aktivitet",      inter: "Let blødningsforstærkende" },
            { name: "Curcumin",          dose: "500–1.000 mg/dag",   ev: "p12", mech: "NF-κB og BCL-2 hæmning. Klinisk fase 2-data ved DLBCL",                           inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "COO subtype (GCB vs ABC)",  why: "Afgørende for prognose og ny behandling. ABC = ibrutinib-kombination benefit i studier",            crit: true },
            { name: "MYC + BCL-2 + BCL-6 FISH", why: "Double/triple-hit = ekstremt aggressivt. Kræver R-DA-EPOCH frem for R-CHOP",                       crit: true },
            { name: "MYD88 L265P mutation",      why: "ABC-subtype markør — ibrutinib-kombination benefit",                                               crit: false },
            { name: "TP53 mutation",             why: "TP53+ = dårlig prognose og kortere PFS med R-CHOP",                                               crit: false },
            { name: "IPI score",                 why: "International Prognostic Index — afgørende for risikostratificering og intensitet",                crit: true },
          ],
          trials: [
            { name: "PHOENIX (Ibrutinib + R-CHOP, ABC-DLBCL)", phase: "Fase 3",  status: "Igangværende",  url: "https://clinicaltrials.gov/study/NCT01855750" },
            { name: "HCQ + R-CHOP (DLBCL)",                   phase: "Fase 1–2",status: "Rekrutterer",   url: "https://clinicaltrials.gov/search?cond=DLBCL&term=hydroxychloroquine" },
            { name: "Alle aktive DLBCL studier",               phase: "Alle",    status: "–",            url: "https://clinicaltrials.gov/search?cond=diffuse+large+B+cell+lymphoma&type=Interventional&recrs=a" },
          ],
        },
        {
          id: "follicular", name: "Follikulært Lymfom (grad 1–2)", badge: "Indolent — ikke kurativt", badgeColor: T.purple,
          criteria: "Follikulært lymfom / CD20+ / BCL-2 t(14;18) / grad 1–2 (lavgradig)",
          biology: {
            summary: "Follikulært lymfom er det hyppigste indolente lymfom. t(14;18) giver BCL-2-overekspression og blokerer apoptose. Sygdommen er typisk kronisk tilbagevendende men sjældent kurativ (grad 1–2). Transformation til DLBCL sker i ~3%/år. PI3K-hæmmere (idelalisib, copanlisib) og venetoclax er godkendte ved recidiv.",
            pathways: [
              { name: "BCL-2 overekspression",  role: "Definerende via t(14;18) — blokerer apoptose",          level: "Ekstremt høj" },
              { name: "PI3K/AKT",              role: "Primær proliferationssignalvej",                        level: "Høj" },
              { name: "BCR-signalering",        role: "Opretholder B-celle-overlevelse",                       level: "Moderat-høj" },
              { name: "NF-κB",                 role: "Anti-apoptotisk co-driver",                             level: "Moderat" },
              { name: "Aerob glykolyse",        role: "Lav-moderat — indolent metabolisme",                   level: "Lav-moderat" },
            ],
            mutations: ["BCL-2 t(14;18) (~85%)", "EZH2 mutation (~20%)", "CREBBP mutation (~30%)", "KMT2D mutation (~70%)", "TNFAIP3 mutation (~10%)"],
          },
          offLabel: [
            { name: "Metformin",  ev: "p12", mech: "AMPK → reducerer BCL-2-afhængiged og mTOR. Synergistisk med rituximab via AMPK-medieret BCL-2-downregulering", note: "Observationsdata ved follikulært lymfom lovende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=metformin+follicular+lymphoma" },
            { name: "Statin",     ev: "p12", mech: "Mevalonat → reducerer BCL-2-afhængiged og NF-κB. Synergistisk med rituximab", note: "Retrospektive data lovende.", inter: "Standard.", url: "https://pubmed.ncbi.nlm.nih.gov/?term=statin+follicular+lymphoma" },
          ],
          supplements: [
            { name: "Vitamin D3",        dose: "2.000–5.000 IE/dag", ev: "p12", mech: "Anti-BCL-2 effekt via VDR. Lav D3 associeret med kortere PFS",     inter: "Ingen kendte alvorlige" },
            { name: "Omega-3 (EPA/DHA)", dose: "2–3 g/dag",          ev: "p12", mech: "Anti-inflammatorisk, modulerer lymfom-mikromiljø",                  inter: "Let blødningsforstærkende" },
          ],
          biomarkers: [
            { name: "BCL-2 t(14;18) (FISH)", why: "Bekræfter diagnose. Negativ ved grad 3B — behandles som DLBCL",                                     crit: true },
            { name: "FLIPI score",           why: "Follikulær Lymfom International Prognostisk Indeks — styrer behandlingsbehov",                      crit: true },
            { name: "EZH2 mutation",         why: "Åbner for tazemetostat (EZH2-hæmmer) ved recidiv",                                                  crit: false },
            { name: "Transformationsbiopi",  why: "Hastigt voksende knude = transformationsbiopi obligatorisk (MYC, BCL-2)",                           crit: true },
          ],
          trials: [
            { name: "Alle aktive follikulære lymfom studier", phase: "Alle", status: "–", url: "https://clinicaltrials.gov/search?cond=follicular+lymphoma&type=Interventional&recrs=a" },
          ],
        },
      ],
    },
  ],
};
