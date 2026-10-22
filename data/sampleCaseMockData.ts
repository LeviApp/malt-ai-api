export interface SampleCaseStudyOutput {
    id: number;
    mockOutput: any;
}

export const SAMPLE_CASE_STUDY_OUTPUT: SampleCaseStudyOutput[] = [
    // ---------------------------------------------------------------------------
    // CASE 1: 30-Med ICU Polypharmacy (Gold-Standard Comprehensive Review)
    // ---------------------------------------------------------------------------
    {
        id: 1,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: {
                timestamp: "2026-10-19T00:00:00.000Z",
                model: "malt-ai-clinical-v2"
            },
            inputSummary: {
                clinical: "30-agent continuous infusion and acute ICU polypharmacy regimen evaluated for HIT allergy contraindications, duplicate anticoagulation, IV ACE inhibitor shock exacerbation, empiric beta-lactam duplication in severe renal failure (CrCl ~25), and Y-site precipitation.",
                patientFriendly: "We conducted a comprehensive safety sweep of your complete 30-medication intensive care regimen to resolve allergy conflicts, duplicate treatments, blood pressure risks, antibiotic overlap, and IV line compatibility."
            },
            regimenInteractionNotes: [
                {
                    clinical: "CRITICAL ICU POLYPHARMACY ALERTS: 1) Active Heparin AND Enoxaparin orders represent therapeutic duplication while directly violating documented HIT history. 2) Enalaprilat IV risks severe renal hypoperfusion and refractory hypotension during septic shock vasopressor resuscitation. 3) Cefepime & Meropenem represent redundant broad-spectrum coverage in impaired renal clearance (CrCl 25 mL/min), elevating neurotoxicity risks. 4) Physical Y-site precipitation risk between Calcium Gluconate and Sodium Bicarbonate. 5) Intravenous Potassium Chloride infusion requires strict hyperkalemia protocol monitoring in oliguric renal failure.",
                    patientFriendly: "Our critical care analysis identified five vital safety targets: stopping overlapping blood thinners that conflict with your severe Heparin allergy record, pausing a blood pressure medication straining your kidneys during septic shock, streamlining redundant antibiotics to prevent toxicity, separating two IV drugs that crystallize when mixed, and closely monitoring kidney electrolyte clearance."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Heparin 5000 units SQ Q8H & Enoxaparin 40mg SQ QD",
                    reasonForSwitch: {
                        clinical: "Therapeutic duplication of parenteral anticoagulants directly contraindicating documented history of Heparin-Induced Thrombocytopenia (HIT).",
                        patientFriendly: "Two overlapping blood thinners were ordered simultaneously despite a recorded severe allergy history to Heparin."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Unfractionated Heparin & LMWHs (Enoxaparin / Dalteparin)",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "Absolute contraindication in history of HIT due to catastrophic risk of immune-mediated arterial and venous thrombosis.",
                                patientFriendly: "Triggers severe immune-mediated blood clotting complications based on your allergy history."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Argatroban IV Infusion",
                            drugClass: {
                                clinical: "Direct Thrombin Inhibitor",
                                patientFriendly: "Alternative Non-Heparin Blood Thinner"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Non-heparin direct thrombin inhibitor providing safe anticoagulation without cross-reactivity in HIT.",
                                patientFriendly: "Provides safe blood clot protection without using any Heparin-based products."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor aPTT continuously and evaluate hepatic clearance during infusion titration.",
                                patientFriendly: "Requires close blood test monitoring by the intensive care team."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Bivalirudin IV Infusion",
                            drugClass: {
                                clinical: "Direct Thrombin Inhibitor",
                                patientFriendly: "Alternative Non-Heparin Blood Thinner"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Short-acting direct thrombin inhibitor suitable for acute anticoagulation in HIT.",
                                patientFriendly: "Short-acting blood thinner alternative that does not trigger Heparin allergy reactions."
                            },
                            safetyConsiderations: {
                                clinical: "Dose adjustment required for renal dysfunction.",
                                patientFriendly: "Requires dose adjustments based on kidney function."
                            }
                        },
                        {
                            drugName: "Fondaparinux 2.5mg SQ QD",
                            drugClass: {
                                clinical: "Factor Xa Inhibitor (Synthetic)",
                                patientFriendly: "Targeted Synthetic Blood Thinner"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Synthetic pentasaccharide structure lacks cross-reactivity with HIT antibodies.",
                                patientFriendly: "A synthetic blood thinner option that does not trigger Heparin allergy reactions."
                            },
                            safetyConsiderations: {
                                clinical: "Use with extreme caution in CrCl ~25 mL/min due to renal clearance accumulation risks.",
                                patientFriendly: "Requires careful dose adjustment and kidney monitoring."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Enalaprilat 1.25mg IV Q6H",
                    reasonForSwitch: {
                        clinical: "Parenteral ACE inhibitor administration during acute septic shock with active vasopressor dependence (Norepinephrine + Vasopressin) exacerbates renal efferent arteriolar vasodilation and acute oliguric renal failure.",
                        patientFriendly: "Injectable blood pressure medication that drops kidney blood flow while on active life support for septic shock."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Parenteral ACE Inhibitors & ARBs",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "Causes severe refractory hypotension and renal hypoperfusion during active vasopressor resuscitation.",
                                patientFriendly: "Can cause sudden drops in blood pressure and severe kidney strain while requiring vasopressor support."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Discontinuing non-essential antihypertensives preserves mean arterial pressure (MAP >65 mmHg) and essential organ perfusion.",
                                patientFriendly: "Pausing blood pressure-lowering drugs helps maintain safe blood flow to vital organs."
                            },
                            safetyConsiderations: {
                                clinical: "Re-evaluate antihypertensive therapy only after complete shock resolution and vasopressor weaning.",
                                patientFriendly: "Re-evaluate blood pressure pills after full recovery from septic shock."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Cefepime 2g IV Q8H",
                    reasonForSwitch: {
                        clinical: "Redundant empiric gram-negative coverage when co-administered with Meropenem 1g Q8H; unadjusted dosing in CrCl ~25 mL/min carries significant neurotoxicity risk (encephalopathy/myoclonus).",
                        patientFriendly: "Duplicate antibiotic coverage when taken alongside Meropenem, with increased risk of brain and nerve side effects in reduced kidney clearance."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Duplicate Empiric Broad-Spectrum Beta-Lactams",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Unnecessary broad-spectrum duplication increases drug-induced neurotoxicity and Clostridioides difficile risk without therapeutic benefit.",
                                patientFriendly: "Overlapping antibiotic classes increase organ toxicity risk without added therapeutic gain."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Discontinuing Cefepime removes redundant beta-lactam exposure while Meropenem (dose-adjusted to 1g Q12H) maintains robust intra-abdominal pathogen coverage.",
                                patientFriendly: "Stopping duplicate Cefepime removes redundant antibiotic exposure while keeping full protection against severe abdominal infections."
                            },
                            safetyConsiderations: {
                                clinical: "Adjust concomitant Meropenem administration frequency to Q12H based on CrCl 25 mL/min renal threshold.",
                                patientFriendly: "Care team will adjust remaining antibiotic dosing frequency based on daily kidney lab results."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Aztreonam 1g IV Q12H + Metronidazole 500mg IV Q8H",
                            drugClass: {
                                clinical: "Monobactam & Antiprotozoal / Anaerobic Antimicrobial Combination",
                                patientFriendly: "Targeted Non-Penicillin Antibiotic Combination"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Provides targeted gram-negative aerobic and anaerobic coverage without beta-lactam cross-reactivity or carbapenem overuse.",
                                patientFriendly: "A safe secondary antibiotic combination if carbapenems need to be avoided or adjusted."
                            },
                            safetyConsiderations: {
                                clinical: "Requires explicit renal dose reduction for Aztreonam in CrCl < 30 mL/min.",
                                patientFriendly: "Doses must be tailored specifically to your daily kidney lab results."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Calcium Gluconate 1g IV",
                    reasonForSwitch: {
                        clinical: "Physical Y-site precipitation risk when co-administered in same venous line lumen with Sodium Bicarbonate 84 mEq IV.",
                        patientFriendly: "Can form insoluble chalky crystals if mixed directly in the same IV tube with Sodium Bicarbonate."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Sodium Bicarbonate IV (Co-Infusion in Same Lumen)",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "Direct lumen co-infusion causes chemical precipitation of calcium carbonate, leading to catastrophic line occlusion.",
                                patientFriendly: "Mixing in the same tube causes physical crystallization and tube blockage."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Schedule Optimization Only)",
                            drugClass: {
                                clinical: "Administration Route & Line Isolation Protocol",
                                patientFriendly: "Optimized IV Line Isolation"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Administering Calcium Gluconate through a dedicated, isolated venous lumen prevents physical Y-site precipitation with Sodium Bicarbonate without altering therapeutic dosing.",
                                patientFriendly: "Giving this medication through a separate IV line prevents dangerous crystallization and clogging without needing to change your medicine."
                            },
                            safetyConsiderations: {
                                clinical: "Ensure thorough line flushes with 0.9% Normal Saline before and after infusion.",
                                patientFriendly: "The care team will flush the line thoroughly before and after giving this medicine."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Staggered Intermittent Infusion Protocol",
                            drugClass: {
                                clinical: "Administration Timing Protocol",
                                patientFriendly: "Timed IV Administration"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "If dedicated venous lumens are unavailable, administer Calcium Gluconate as a discrete timed bolus with a 50mL normal saline flush before and after.",
                                patientFriendly: "If extra IV tubes are not available, give the medicines at completely different times with thorough line flushes."
                            },
                            safetyConsiderations: {
                                clinical: "Verify complete line clearance prior to resuming Sodium Bicarbonate infusion.",
                                patientFriendly: "Ensure the tube is completely cleared between medicines."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Potassium Chloride 20 mEq IV",
                    reasonForSwitch: {
                        clinical: "Exogenous potassium administration in impaired renal clearance (CrCl ~25 mL/min) risks acute hyperkalemia and life-threatening cardiac dysrhythmias.",
                        patientFriendly: "Potassium supplements require extra safety checks when kidney filtration is reduced to prevent dangerous heart rhythm spikes."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Empiric Potassium Boluses in Acute Oliguric Renal Failure",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Impairs cardiac conduction stability if baseline serum potassium is elevated or unmonitored.",
                                patientFriendly: "Can cause unsafe blood potassium buildup when kidney output is low."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Dose Reduction Only)",
                            drugClass: {
                                clinical: "Dose Reduction / Down-Titration",
                                patientFriendly: "Lowering the dose without changing the medicine"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Reducing the IV potassium dose accounts for decreased renal elimination (CrCl ~25 mL/min), preventing dangerous drug accumulation and hyperkalemia.",
                                patientFriendly: "Lowering your potassium dose protects against unsafe blood potassium buildup while your kidneys are under strain."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor serum potassium levels closely and maintain continuous ECG monitoring for dysrhythmias.",
                                patientFriendly: "Your care team will regularly test your blood potassium levels and monitor your heart rhythm."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Enteral / Oral Potassium Repletion (When Intestinal Perfusion Re-established)",
                            drugClass: {
                                clinical: "Oral Electrolyte Replacement",
                                patientFriendly: "Oral Potassium Supplement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Oral administration provides slower absorption kinetics, reducing transient systemic hyperkalemia spikes compared to IV boluses.",
                                patientFriendly: "Taking potassium by mouth or stomach tube provides a slower, safer absorption rate once digestion recovers."
                            },
                            safetyConsiderations: {
                                clinical: "Ensure bowel sounds and enteral tolerance prior to administration.",
                                patientFriendly: "Check stomach and bowel function before giving."
                            }
                        }
                    ]
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 2: Outpatient Polypharmacy & Drug Interactions (Multi-Target Review)
    // ---------------------------------------------------------------------------
    {
        id: 2,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: {
                timestamp: "2026-10-19T00:00:00.000Z",
                model: "malt-ai-clinical-v2"
            },
            inputSummary: {
                clinical: "6-agent outpatient regimen evaluated against Stage 3b CKD (eGFR 38 mL/min), acute hyperkalemia (K+ 5.6 mEq/L), and NSAID-induced nephrotoxicity risks.",
                patientFriendly: "Comprehensive safety sweep of your 6 daily medications addressing kidney strain, high potassium levels, pain relief choices, and diabetes dosing."
            },
            regimenInteractionNotes: [
                {
                    clinical: "MULTIPLE METABOLIC HAZARDS: 1) High-dose Ibuprofen combined with dual RAAS blockade (Lisinopril + Spironolactone) in Stage 3b CKD directly drives acute hyperkalemia (K+ 5.6 mEq/L) and renal vasoconstriction. 2) Exogenous Potassium Chloride supplementation in active hyperkalemia requires immediate discontinuation. 3) Metformin dose requires adjustment for eGFR 38 mL/min threshold.",
                    patientFriendly: "Our analysis identified three important medication safety targets: stopping Ibuprofen which strains your kidneys and raises potassium, holding your potassium supplement while your blood potassium is high, and adjusting your diabetes medicine dose to protect your kidneys."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Ibuprofen 800mg PO TID PRN",
                    reasonForSwitch: {
                        clinical: "Systemic NSAID administration inhibits renal prostaglandin synthesis, causing afferent arteriolar vasoconstriction, worsening eGFR (38 mL/min), and driving acute hyperkalemia (K+ 5.6 mEq/L) alongside Lisinopril and Spironolactone.",
                        patientFriendly: "High-dose prescription Ibuprofen severely strains kidney filtration and causes dangerous potassium buildup when taken with your blood pressure medicines."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Systemic NSAIDs (Naproxen, Meloxicam, Celecoxib, High-Dose Aspirin)",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "Exacerbates nephrotoxicity, blunts diuretic response, and worsens hyperkalemia in Stage 3b CKD.",
                                patientFriendly: "All oral anti-inflammatory pain pills worsen kidney function and potassium levels in this stage of kidney health."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Discontinuing systemic NSAIDs eliminates nephrotoxic vasoconstriction and allows renal autoregulation and serum potassium stabilization without introducing systemic drug burden.",
                                patientFriendly: "Stopping oral Ibuprofen completely is the single most important step to prevent further kidney strain and lower your potassium back to safe levels."
                            },
                            safetyConsiderations: {
                                clinical: "For non-pharmacologic or localized joint pain management, topical agents (e.g., Diclofenac 1% gel) or low-dose oral Acetaminophen (max 2g/day in CKD) can be considered.",
                                patientFriendly: "Your care team can discuss targeted pain creams or low-dose Tylenol for knee pain."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Topical Diclofenac Gel 1%",
                            drugClass: {
                                clinical: "Topical NSAID",
                                patientFriendly: "Targeted Joint Pain Cream"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Provides localized anti-inflammatory relief for osteoarthritis with minimal systemic absorption (~6% compared to oral dosing), reducing renal hemodynamics risk.",
                                patientFriendly: "A targeted pain cream that acts locally on the knee joint rather than circulating through your blood and kidneys."
                            },
                            safetyConsiderations: {
                                clinical: "Apply only to intact skin; avoid applying to multiple joints simultaneously.",
                                patientFriendly: "Apply only to closed, healthy skin on the affected joint."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Potassium Chloride 20 mEq PO QD",
                    reasonForSwitch: {
                        clinical: "Scheduled exogenous oral potassium supplementation during documented acute hyperkalemia (K+ 5.6 mEq/L) in Stage 3b CKD elevates cardiac dysrhythmia risks.",
                        patientFriendly: "Taking daily potassium pills while your blood test already shows high potassium (5.6 mEq/L) can cause unsafe heart rhythm complications."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Oral Potassium Supplements & Potassium-Containing Salt Substitutes",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "Sustains or worsens active hyperkalemia when renal clearance is reduced.",
                                patientFriendly: "Adds extra potassium to your body when your kidneys are already having trouble clearing it."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Withholding oral potassium supplementation allows serum potassium to drop below the 5.0 mEq/L safety threshold under routine dietary control.",
                                patientFriendly: "Pausing your potassium pill allows your body to naturally clear the excess potassium until your levels return to normal."
                            },
                            safetyConsiderations: {
                                clinical: "Recheck serum potassium level in 1 to 2 weeks.",
                                patientFriendly: "Schedule a follow-up blood test in 1 to 2 weeks to monitor your potassium level."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Metformin 1000mg PO BID",
                    reasonForSwitch: {
                        clinical: "Metformin total daily dose of 2000mg exceeds recommended renal dosing guidelines for eGFR 30–45 mL/min (Stage 3b CKD), increasing lactic acidosis risk.",
                        patientFriendly: "Your current Metformin dose is higher than recommended for your current level of kidney filtration (eGFR 38 mL/min)."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Unadjusted Metformin Dosing (Daily Dose >1000mg in eGFR <45)",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Reduced renal excretion leads to drug accumulation and heightened risk of Metformin-associated lactic acidosis (MALA).",
                                patientFriendly: "Higher doses can build up in your bloodstream when kidney filtration slows down."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Dose Reduction Only)",
                            drugClass: {
                                clinical: "Dose Reduction / Down-Titration",
                                patientFriendly: "Lowering the dose without changing the medicine"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Reducing the total daily Metformin dose to 1000mg (500mg BID) maintains glycemic efficacy while adhering to renal safety thresholds for eGFR 30–45 mL/min.",
                                patientFriendly: "Lowering your Metformin dose to 500mg twice daily keeps your blood sugar controlled while staying well within safe limits for your kidneys."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor eGFR and HbA1c every 3 to 6 months; discontinue if eGFR drops below 30 mL/min.",
                                patientFriendly: "Your care team will monitor routine blood tests every few months."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 3: Acute Trauma / Emergency (Actionable ACS Protocol)
    // ---------------------------------------------------------------------------
    {
        id: 3,
        mockOutput: {
            isValidInput: true,
            isEmergency: true,
            isHighAcuity: true,
            safety_modal_trigger: "CRITICAL_EMERGENCY",
            meta: { timestamp: "2026-10-21T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "High-acuity emergency presentation of suspected Acute Coronary Syndrome (ACS) with diaphoretic substernal pain in an outpatient setting.",
                patientFriendly: "Urgent evaluation of severe crushing chest pain radiating to the jaw with cold sweats."
            },
            regimenInteractionNotes: [
                {
                    alertDirective: "Call 911 or go to the nearest emergency room immediately. Crushing chest pain radiating to your arm or jaw is a sign of a life-threatening heart emergency. Do not attempt to take home medicines or drive yourself to the hospital."
                }
            ],
            medicationAnalyses: []
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 4: Post-Op High-Risk DIY Safety (Actionable Post-Op Warning)
    // ---------------------------------------------------------------------------
    {
        id: 4,
        mockOutput: {
            isValidInput: true,
            isEmergency: true,
            isHighAcuity: false,
            safety_modal_trigger: "POST_OP_HIGH_RISK",
            meta: { timestamp: "2026-10-21T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "First-person post-operative query regarding self-managed dose escalation of acetaminophen following dental extraction.",
                patientFriendly: "You are asking about taking extra over-the-counter pain medicine on top of your prescription pain pills after wisdom teeth surgery."
            },
            regimenInteractionNotes: [
                {
                    alertDirective: "Please contact your surgeon or dentist immediately before taking any additional pain medication. Combining prescription Percocet with extra over-the-counter Tylenol can lead to a dangerous liver-damaging overdose. Do not attempt to adjust your post-operative pain medication doses on your own."
                }
            ],
            medicationAnalyses: []
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 5: Low-Acuity First Aid
    // ---------------------------------------------------------------------------
    {
        id: 5,
        mockOutput: {
            isValidInput: true,
            isEmergency: true,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-21T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "First-person request for basic home wound care and first-aid guidance for a minor superficial toe scrape.",
                patientFriendly: "You are asking how to clean and care for a minor stubbed toe and skin scrape at home."
            },
            regimenInteractionNotes: [
                {
                    alertDirective: "Gently wash the scraped area with mild soap and warm water, then apply a clean bandage to protect it. Keep the toe elevated when resting and monitor for swelling as it heals over the next few days. Seek medical attention immediately if you notice spreading redness, pus, severe throbbing pain, or an inability to walk."
                }
            ],
            medicationAnalyses: []
        }
    },
    // ---------------------------------------------------------------------------
    // CASE 6: Clinical-Dietary Metabolic Management
    // ---------------------------------------------------------------------------
    {
        id: 6,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-19T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Clinical dietary review evaluating refined white sugar (canned sweetened teas) and sodium chloride in uncontrolled Type 2 Diabetes (HbA1c 8.9%) and Stage 2 Hypertension (148/92 mmHg).",
                patientFriendly: "Comprehensive dietary review of sugary beverages and high-sodium packaged snacks to support your blood sugar and blood pressure goals."
            },
            regimenInteractionNotes: [
                {
                    clinical: "METABOLIC DIETARY HAZARD: Daily consumption of sweetened canned teas drives postprandial hyperglycemia and exacerbates insulin resistance alongside Metformin 500mg BID. High dietary sodium counteracts Amlodipine 5mg efficacy.",
                    patientFriendly: "Critical insight: High-sugar canned teas and salty snacks directly undermine your blood sugar and blood pressure medications, making it harder to reach your health goals."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Refined White Sugar & Sweetened Canned Teas",
                    reasonForSwitch: {
                        clinical: "High glycemic index liquid carbohydrates trigger rapid hepatic glucose influx, worsening HbA1c (8.9%).",
                        patientFriendly: "Sweetened beverages cause rapid blood sugar spikes that overwhelm your diabetes medication."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Sugary Beverages & Refined Carbohydrates",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "Accelerates glycemic variability and promotes visceral adiposity.",
                                patientFriendly: "Quickly raises blood sugar levels and increases metabolic strain."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Unsweetened Herbal Infusions or Water-Rich Produce (e.g., Cucumber & Mint Infused Water, Lemon Water)",
                            drugClass: {
                                clinical: "Non-Glycemic Hydration Alternative",
                                patientFriendly: "Zero-Sugar Hydration"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Provides complete glycemic neutrality while satisfying beverage routines without caloric or insulinogenic burden.",
                                patientFriendly: "Satisfies your beverage habit with zero sugar or impact on your blood glucose."
                            },
                            safetyConsiderations: {
                                clinical: "Maintain adequate daily fluid intake of 2 to 2.5 liters.",
                                patientFriendly: "Drink plenty of water throughout the day."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 7: ICU Deprescribing & Toxicity De-escalation
    // ---------------------------------------------------------------------------
    {
        id: 7,
        mockOutput: {
            isValidInput: true,
            isEmergency: true,
            isHighAcuity: true,
            meta: { timestamp: "2026-10-21T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "High-acuity ICU/ED crisis: Severe QTc prolongation (512ms) and acute oliguric renal failure (Cr 3.8) driven by synergistic multi-drug nephrotoxicity and arrhythmogenic cardiotoxicity.",
                patientFriendly: "Urgent emergency room alert for severe heart rhythm changes and sudden kidney strain from critical IV medications."
            },
            regimenInteractionNotes: [
                {
                    alertDirective: "Combined acute Torsades de Pointes risk and nephrotoxic renal failure. PROVIDER DIRECTIVES: 1) IMMEDIATELY HOLD IV Gentamicin, Vancomycin, Haloperidol, Ondansetron, Levofloxacin, and Methadone. 2) Place patient on continuous cardiac telemetry; prepare IV Magnesium Sulfate for QTc >500ms. 3) Order STAT drug trough levels, serum electrolytes (K+, Mg++), and 12-lead EKG. 4) STAT Consults: Medical Toxicology, Nephrology, and Clinical Pharmacy for acute clearance and hemodialysis evaluation."
                }
            ],
            medicationAnalyses: []
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 8: Geriatric Beers Criteria & Fall Risk (Multi-Target Anticholinergic Deprescribing)
    // ---------------------------------------------------------------------------
    {
        id: 8,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-19T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "81-year-old male evaluated for severe cumulative Beers Criteria anticholinergic and sedative burden (Diphenhydramine, Oxybutynin, Zolpidem, Amitriptyline, Cyclobenzaprine) driving recurrent falls and acute delirium.",
                patientFriendly: "Comprehensive medication review of night-time sleep aids, bladder pills, and muscle relaxants to stop memory confusion and balance problems."
            },
            regimenInteractionNotes: [
                {
                    clinical: "SEVERE BEERS CRITERIA CUMULATIVE RISK: Concurrent use of multiple strong anticholinergic and central nervous system depressants creates profound cognitive impairment, urinary retention, and high-velocity fall risks in geriatric patients.",
                    patientFriendly: "Taking multiple sedating and drying medicines together heavily increases memory fog, daytime drowsiness, and dangerous night-time falls."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Diphenhydramine 50mg PO QHS",
                    reasonForSwitch: {
                        clinical: "Potent central anticholinergic effects cause acute confusion, cognitive decline, and increased fall hazard in older adults.",
                        patientFriendly: "Strong over-the-counter sleep aid that causes confusion and balance issues in seniors."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "First-Generation Antihistamines & Sedatives",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "High risk of confusion, dry mouth, blurred vision, and motor impairment.",
                                patientFriendly: "Unsafe for seniors due to high risk of grogginess and falls."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Complete discontinuation removes heavy anticholinergic load and immediately lowers fall risk.",
                                patientFriendly: "Stopping this sleep aid completely is the best way to clear your head and prevent further falls."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor sleep quality and cognitive alertness post-discontinuation.",
                                patientFriendly: "Your care team will monitor your alertness and balance as the medicine clears."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Melatonin 1mg - 3mg PO QHS",
                            drugClass: {
                                clinical: "Hormone Supplement",
                                patientFriendly: "Natural Sleep Support"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Supports circadian rhythm regulation without anticholinergic side effects or cognitive clouding.",
                                patientFriendly: "A gentle, natural supplement that encourages sleep without causing morning grogginess or confusion."
                            },
                            safetyConsiderations: {
                                clinical: "Use lowest effective dose under physician oversight.",
                                patientFriendly: "Check with your doctor on the appropriate starting dose."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Amitriptyline 25mg PO QHS",
                    reasonForSwitch: {
                        clinical: "Tricyclic antidepressant with profound anticholinergic and alpha-blocking properties causing sedation and orthostatic hypotension.",
                        patientFriendly: "Older antidepressant that contributes significantly to dizziness and memory confusion."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Tricyclic Antidepressants (TCAs)",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "High risk of anticholinergic toxicity, sedation, and cardiac conduction abnormalities.",
                                patientFriendly: "Unsafe for routine use in older adults due to high fall and confusion risks."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Tapering and discontinuing Amitriptyline eliminates orthostatic dizziness and cognitive sedation.",
                                patientFriendly: "Stopping this medication under medical supervision prevents dizziness and improves alertness."
                            },
                            safetyConsiderations: {
                                clinical: "Gradual taper required under physician guidance to avoid withdrawal symptoms.",
                                patientFriendly: "Always taper this medication slowly with your doctor's guidance."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 9: Oncology Supportive Care & Herbal Interaction
    // ---------------------------------------------------------------------------
    {
        id: 9,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-19T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Oncology supportive care review evaluating severe CYP3A4 and P-glycoprotein induction by St. John's Wort causing therapeutic failure of Warfarin anticoagulation (INR spike to 4.2).",
                patientFriendly: "Comprehensive review of cancer therapies, blood thinners, and herbal supplements to correct unexpected blood test spikes."
            },
            regimenInteractionNotes: [
                {
                    clinical: "CRITICAL CYP DRUG INTERACTION: St. John's Wort is a potent hepatic enzyme inducer that destabilizes Warfarin metabolism and risks severe bleeding complications or therapeutic failure of targeted oncologic agents.",
                    patientFriendly: "Critical warning: St. John's Wort heavily interferes with how your body processes prescription blood thinners and cancer treatments."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "St. John's Wort 300mg PO TID",
                    reasonForSwitch: {
                        clinical: "Induces CYP3A4 and P-glycoprotein, causing unpredictable fluctuations in Warfarin clearance and INR instability (4.2).",
                        patientFriendly: "This herbal supplement directly interferes with your prescription blood-thinning medication."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Herbal CYP Inducers (St. John's Wort)",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "Unpredictably alters anticoagulant blood levels and risks hemorrhage.",
                                patientFriendly: "Creates dangerous fluctuations in blood-thinning effectiveness."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Discontinuing the herbal supplement removes the metabolic inducer, allowing Warfarin levels and INR to stabilize.",
                                patientFriendly: "Stopping this supplement entirely is necessary to restore safe and predictable blood-thinning levels."
                            },
                            safetyConsiderations: {
                                clinical: "Recheck INR twice weekly following discontinuation until therapeutic range (2.0–3.0) is re-established.",
                                patientFriendly: "Your care team will schedule frequent blood tests to monitor your INR levels."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 10: Pediatric OTC Overlap & Dosing Safety
    // ---------------------------------------------------------------------------
    {
        id: 10,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-19T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Pediatric review evaluating multi-product active ingredient duplication (Acetaminophen overlap across Children's Tylenol and multi-symptom cold syrups) in a 4 y/o child (16 kg).",
                patientFriendly: "Safety review of your child's cold and fever medicines to prevent accidental duplicate dosing."
            },
            regimenInteractionNotes: [
                {
                    clinical: "TOXIC INGREDIENT DUPLICATION WARNING: Administering Children's Tylenol alongside multi-symptom cold formulations simultaneously risks acute pediatric acetaminophen overdose and hepatotoxicity.",
                    patientFriendly: "Critical safety warning: Giving multiple cold and fever products at the same time can accidentally double up on active ingredients and cause an overdose."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Little Remedies Multi-Symptom Cold & Dimetapp Nighttime Cold (Combination Products)",
                    reasonForSwitch: {
                        clinical: "Contains hidden Acetaminophen or redundant sedating antihistamines that duplicate single-agent therapy and violate pediatric weight-based safety limits.",
                        patientFriendly: "Contains hidden fever medicine and multiple ingredients, making it very easy to give your child too much medication."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Multi-Ingredient Pediatric Cold Syrups",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "High risk of accidental acetaminophen overdose and over-sedation in young children.",
                                patientFriendly: "Unsafe duplication of active ingredients for young children."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Single-Ingredient Children's Tylenol Oral Suspension (160mg/5mL)",
                            drugClass: {
                                clinical: "Analgesic / Antipyretic",
                                patientFriendly: "Single-Ingredient Fever Reliever"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Allows precise weight-based dosing (10-15 mg/kg every 4-6 hours) without overlapping active ingredients.",
                                patientFriendly: "Using a single fever medication measured precisely for your child's weight keeps treatment safe and effective."
                            },
                            safetyConsiderations: {
                                clinical: "Calculate exact dose based on current weight (16 kg); do not exceed 5 doses in 24 hours.",
                                patientFriendly: "Always use the dosing syringe provided and check the weight-based chart before each dose."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                }
            ]
        }
    },
    // ---------------------------------------------------------------------------
    // CASE 11: Non-Medical Input / Disallowed Prompt
    // ---------------------------------------------------------------------------
    {
        id: 11,
        mockOutput: {
            isValidInput: false,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-19T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Input evaluated as non-medical data (automotive transmission maintenance).",
                patientFriendly: "We could not find any medical or health information in your request."
            },
            regimenInteractionNotes: [
                {
                    alertDirective: "Please enter a medication, treatment, symptom, or health summary for analysis."
                }
            ],
            medicationAnalyses: []
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 12: Standalone Raw Symptoms (Actionable Red Flag Headache Gate)
    // ---------------------------------------------------------------------------
    {
        id: 12,
        mockOutput: {
            isValidInput: true,
            isEmergency: true,
            isHighAcuity: true,
            meta: { timestamp: "2026-10-19T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Acute presentation of sudden 'worst headache of my life' (thunderclap headache) with acute double vision (diplopia), neck stiffness (meningismus), and photophobia.",
                patientFriendly: "EMERGENCY NEUROLOGICAL RED FLAG: Sudden severe thunderclap headache detected."
            },
            regimenInteractionNotes: [
                {
                    alertDirective: "Call 911 or go to the nearest emergency room immediately. A sudden 'worst headache of your life' paired with double vision and a stiff neck is a critical medical emergency that can indicate bleeding around the brain. Do not drive yourself to the hospital or wait for symptoms to pass."
                }
            ],
            medicationAnalyses: []
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 13: Allergy Cross-Reactivity Matching (Minor Emergency / Caution Screen)
    // ---------------------------------------------------------------------------
    {
        id: 13,
        mockOutput: {
            isValidInput: true,
            isEmergency: true,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-21T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "High-priority allergy safety intercept: Active prescription for Bactrim DS in a patient with documented severe IgE-mediated sulfa anaphylaxis.",
                patientFriendly: "Urgent safety alert regarding a new antibiotic prescription that matches your severe documented allergic history."
            },
            regimenInteractionNotes: [
                {
                    alertDirective: "Please enter a medication, treatment, symptom, or health summary for analysis."
                }
            ],
            medicationAnalyses: []
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 14: Prompt Injection / Jailbreak Attack
    // ---------------------------------------------------------------------------
    {
        id: 14,
        mockOutput: {
            isValidInput: false,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-19T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "System security boundary filter triggered on adversarial override instruction.",
                patientFriendly: "Your entry contained unauthorized command parameters."
            },
            regimenInteractionNotes: [
                {
                    alertDirective: "Please enter a medication, treatment, symptom, or health summary for analysis."
                }
            ],
            medicationAnalyses: []
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 15: Low-Acuity Outpatient Routine (Heartburn Management)
    // ---------------------------------------------------------------------------
    {
        id: 15,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-19T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Outpatient review of episodic postprandial heartburn managed with Famotidine PRN and daily Omeprazole.",
                patientFriendly: "We reviewed your heartburn medications to optimize short-term and long-term relief."
            },
            regimenInteractionNotes: [
                {
                    clinical: "ACID SUPPRESSION EVALUATION: Combining daily Proton Pump Inhibitors (Omeprazole) with H2 blockers (Famotidine PRN) provides robust acid reduction for episodic postprandial symptoms.",
                    patientFriendly: "Your acid reflux medications provide dual coverage, but routine daily use should be evaluated periodically with your physician."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Omeprazole 20mg PO QD",
                    reasonForSwitch: {
                        clinical: "Appropriate first-line agent for persistent acid reflux; evaluate for intermittent step-down if symptoms become well-controlled.",
                        patientFriendly: "Effective daily protection against stomach acid production."
                    },
                    medicationsToAvoid: [],
                    primaryAlternatives: [
                        {
                            drugName: "Famotidine 20mg PO BID PRN (Step-down or Intermittent Strategy)",
                            drugClass: {
                                clinical: "H2 Receptor Antagonist",
                                patientFriendly: "Acid Reducer"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Intermittent H2 blocker therapy minimizes long-term PPI exposure while controlling 2-3x weekly postprandial flares.",
                                patientFriendly: "Using acid reducers on an as-needed basis can effectively manage reflux episodes while reducing daily medication load."
                            },
                            safetyConsiderations: {
                                clinical: "Re-evaluate if heartburn symptoms persist beyond 2 weeks of continuous self-treatment.",
                                patientFriendly: "Consult your doctor if reflux symptoms do not improve."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 16: Medium Polypharmacy & Metabolic De-escalation (3 Targets)
    // ---------------------------------------------------------------------------
    {
        id: 16,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-20T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Outpatient review of 4 agents managing hypertension, osteoarthritis, and hyperlipidemia, addressing diuretic-induced hypokalemia (K+ 3.3), ACE inhibitor-induced cough, and statin-associated myalgia.",
                patientFriendly: "Comprehensive review of your blood pressure, cholesterol, and pain medications to address muscle aches, cough, and low potassium."
            },
            regimenInteractionNotes: [
                {
                    clinical: "MULTIPLE PHARMACOLOGIC INTERACTIONS: 1) Hydrochlorothiazide drives mild hypokalemia (K+ 3.3 mEq/L). 2) Lisinopril induces chronic bradykinin-mediated dry cough. 3) High-dose Atorvastatin contributes to generalized muscle aches.",
                    patientFriendly: "We identified three key adjustments: managing low potassium from your water pill, addressing the dry cough from your blood pressure medicine, and reviewing your statin dose for muscle aches."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Hydrochlorothiazide 25mg PO QD",
                    reasonForSwitch: {
                        clinical: "Thiazide diuretic causing renal potassium wasting resulting in hypokalemia (K+ 3.3 mEq/L).",
                        patientFriendly: "Water pill is causing your blood potassium levels to drop below the normal range."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "High-Dose Thiazide Diuretics without Potassium Supplementation",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Sustains renal potassium wasting and cardiac irritability.",
                                patientFriendly: "Maintains low potassium levels."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Dose Reduction Only)",
                            drugClass: {
                                clinical: "Dose Reduction / Down-Titration",
                                patientFriendly: "Lowering the dose without changing the medicine"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Reducing the total daily Hydrochlorothiazide dose to 12.5mg QD maintains blood pressure control while mitigating urinary potassium excretion.",
                                patientFriendly: "Lowering your water pill dose helps normalize your potassium levels while keeping your blood pressure well controlled."
                            },
                            safetyConsiderations: {
                                clinical: "Recheck serum potassium and blood pressure in 2 weeks.",
                                patientFriendly: "Your doctor will schedule a follow-up blood test in two weeks."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Chlorthalidone 12.5mg PO QD",
                            drugClass: {
                                clinical: "Thiazide-like Diuretic",
                                patientFriendly: "Alternative Water Pill"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Provides potent 24-hour blood pressure control with a lower milligram-per-milligram metabolic footprint when dosed appropriately.",
                                patientFriendly: "An alternative water pill that controls blood pressure smoothly over 24 hours."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor serum electrolytes and renal function post-transition.",
                                patientFriendly: "Routine blood tests recommended after switching."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Lisinopril 20mg PO QD",
                    reasonForSwitch: {
                        clinical: "ACE inhibitor-induced accumulation of bradykinin producing persistent non-productive dry cough.",
                        patientFriendly: "Blood pressure medication is causing a persistent dry cough."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "ACE Inhibitors (upon persistent cough)",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Maintains chronic treatment-limiting adverse cough.",
                                patientFriendly: "Persists the chronic dry cough."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Losartan 50mg PO QD",
                            drugClass: {
                                clinical: "Angiotensin II Receptor Blocker (ARB)",
                                patientFriendly: "Blood Pressure Support"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "ARBs provide equivalent cardiovascular and renal protection without inhibiting bradykinin degradation, eliminating cough.",
                                patientFriendly: "An alternative blood pressure medication class that protects your organs without causing a chronic cough."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor blood pressure and renal function 2 weeks post-transition.",
                                patientFriendly: "Routine blood pressure checks are recommended after switching."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Amlodipine 5mg PO QD",
                            drugClass: {
                                clinical: "Calcium Channel Blocker",
                                patientFriendly: "Blood Pressure Relaxer"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Vasodilator alternative that does not act via the renin-angiotensin system, entirely avoiding bradykinin cough pathways.",
                                patientFriendly: "A different class of blood pressure medication that relaxes blood vessels without causing a cough."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor for peripheral ankle edema.",
                                patientFriendly: "Watch for minor ankle swelling."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Atorvastatin 80mg PO QD",
                    reasonForSwitch: {
                        clinical: "High-intensity statin therapy contributing to patient-reported generalized myalgias and muscle discomfort.",
                        patientFriendly: "High-dose cholesterol medication contributing to your muscle aches."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Unadjusted High-Intensity Statins during Myalgia",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Exacerbates treatment non-adherence and muscle degradation.",
                                patientFriendly: "Aggravates muscle discomfort."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Dose Reduction Only)",
                            drugClass: {
                                clinical: "Dose Reduction / Down-Titration",
                                patientFriendly: "Lowering the dose without changing the medicine"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Reducing Atorvastatin to moderate-intensity dosing (40mg PO QD) alleviates myalgia while preserving cardiovascular LDL reduction targets.",
                                patientFriendly: "Lowering your statin dose to 40mg daily relieves muscle aches while continuing to protect your heart."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor lipid panel and creatine kinase (CK) if myalgia persists.",
                                patientFriendly: "Your doctor will recheck your cholesterol levels."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Rosuvastatin 10mg PO QD",
                            drugClass: {
                                clinical: "Alternative Statins (Hydrophilic)",
                                patientFriendly: "Alternative Cholesterol Regimen"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Hydrophilic statins often exhibit different tissue penetration profiles, successfully resolving myalgias experienced on lipophilic statins like atorvastatin.",
                                patientFriendly: "Switching to a different statin type can successfully eliminate muscle aches while controlling cholesterol."
                            },
                            safetyConsiderations: {
                                clinical: "Recheck lipid panel in 6 to 12 weeks.",
                                patientFriendly: "Routine blood tests required."
                            }
                        }
                    ]
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 17: Large Complex Polypharmacy & Renal Protection (8 Targets)
    // ---------------------------------------------------------------------------
    {
        id: 17,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-21T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Routine outpatient polypharmacy review of 8 concurrent agents in Stage 3b CKD (eGFR 42 mL/min), identifying 6 actionable interventions: addressing NSAID-induced renal strain, duplicate gabapentinoid therapy, diuretic conversion, and glycemic/antihypertensive dose optimization. Lisinopril and Atorvastatin remain safe to continue without dose adjustment.",
                patientFriendly: "Routine review of your daily medications to make 6 safer adjustments for moderate kidney function, stop duplicate nerve pain pills, and update water/blood sugar pills. Your blood pressure and cholesterol medicines are safe to keep taking as prescribed."
            },
            regimenInteractionNotes: [
                {
                    clinical: "OUTPATIENT REGIMEN OPTIMIZATION (6 TARGETS): 1) PRN Ibuprofen antagonizes renal perfusion in Stage 3b CKD. 2) Concurrent Gabapentin and Pregabalin represent redundant gabapentinoid dosing driving somnolence. 3) Glyburide and Metformin require dosage adjustments/switches aligned with eGFR 42 mL/min. 4) Hydrochlorothiazide loses efficacy at eGFR < 45; convert to loop diuretic. Lisinopril and Atorvastatin are validated for continuation.",
                    patientFriendly: "We identified 6 routine updates: stopping over-the-counter Ibuprofen to protect your kidneys, eliminating duplicate nerve pain pills to clear fatigue, updating water pills to work better with kidney function, and adjusting blood sugar doses. Your cholesterol and blood pressure pills remain safe as-is."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Ibuprofen 400mg PO TID PRN",
                    reasonForSwitch: {
                        clinical: "Systemic NSAID causing renal afferent arteriolar vasoconstriction, accelerating eGFR decline in Stage 3b CKD.",
                        patientFriendly: "Over-the-counter pain reliever that causes gradual kidney strain when kidney filtration is moderately reduced."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Routine Systemic NSAIDs in Stage 3b CKD",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Accelerates renal function decline and elevates blood pressure.",
                                patientFriendly: "Increases kidney strain over time."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Acetaminophen 500mg PO TID PRN",
                            drugClass: {
                                clinical: "Non-Opioid Analgesic",
                                patientFriendly: "Renal-Safe Pain Reliever"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Provides non-nephrotoxic mild-to-moderate analgesia without impacting renal hemodynamics or eGFR.",
                                patientFriendly: "A safer pain reliever option that does not strain your kidneys."
                            },
                            safetyConsiderations: {
                                clinical: "Do not exceed 3000mg total daily dose.",
                                patientFriendly: "Do not take more than 6 pills per day."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Topical Diclofenac Gel 1%",
                            drugClass: {
                                clinical: "Topical NSAID",
                                patientFriendly: "Targeted Joint Pain Cream"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Delivers localized anti-inflammatory relief with minimal systemic absorption in Stage 3b CKD.",
                                patientFriendly: "Local pain cream that relieves joint stiffness without entering your bloodstream."
                            },
                            safetyConsiderations: {
                                clinical: "Apply only to affected peripheral joints.",
                                patientFriendly: "Apply directly to painful joints."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Pregabalin 75mg PO BID",
                    reasonForSwitch: {
                        clinical: "Redundant gabapentinoid agent duplicating Gabapentin mechanism of action, increasing daytime somnolence and ataxia.",
                        patientFriendly: "Duplicate nerve pain medication causing unnecessary daytime drowsiness."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Duplicate Gabapentinoid Therapy",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Multiplies sedating side effects without added therapeutic efficacy.",
                                patientFriendly: "Causes excessive daytime sleepiness."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Discontinuing Pregabalin eliminates duplicate central nervous system depression while maintaining nerve pain coverage via Gabapentin.",
                                patientFriendly: "Stopping Pregabalin while keeping Gabapentin simplifies your routine and clears brain fog."
                            },
                            safetyConsiderations: {
                                clinical: "Taper dosage over 1 week under physician direction.",
                                patientFriendly: "Taper slowly under doctor guidance."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Gabapentin 300mg PO TID",
                    reasonForSwitch: {
                        clinical: "Maintains primary nerve pain coverage, but schedule can be optimized to reduce daytime sedation in Stage 3b CKD.",
                        patientFriendly: "Primary nerve pain pill; dosing schedule can be optimized to keep you alert during the day."
                    },
                    medicationsToAvoid: [],
                    primaryAlternatives: [
                        {
                            drugName: "Gabapentin 300mg PO QHS (Evening-Skewed Dosing)",
                            drugClass: {
                                clinical: "Anticonvulsant / Schedule Optimization",
                                patientFriendly: "Optimized Nerve Medication Schedule"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Shifting dosing toward bedtime maintains overnight neuropathic relief while minimizing daytime grogginess.",
                                patientFriendly: "Taking your dose closer to bedtime improves nighttime sleep and keeps you alert during the day."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor pain control and daytime alertness.",
                                patientFriendly: "Track your pain relief and energy levels."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Metformin 1000mg PO BID",
                    reasonForSwitch: {
                        clinical: "Total daily dose of 2000mg exceeds recommended maintenance limits for eGFR 30-45 mL/min (max 1000mg/day).",
                        patientFriendly: "Dose is slightly higher than recommended for moderate kidney filtration levels."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Metformin > 1000mg/day in eGFR < 45",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Increases risk of gradual drug accumulation.",
                                patientFriendly: "Prevents drug accumulation."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Dose Reduction Only)",
                            drugClass: {
                                clinical: "Dose Reduction / Down-Titration",
                                patientFriendly: "Lowering the dose without changing the medicine"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Reducing the total daily Metformin dose to 1000mg (500mg PO BID) maintains glycemic control safely within Stage 3b CKD excretion limits.",
                                patientFriendly: "Lowering your dose to 500mg twice daily controls your blood sugar safely within moderate kidney limits."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor eGFR and HbA1c every 3 to 6 months.",
                                patientFriendly: "Routine blood tests every few months."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Linagliptin 5mg PO QD",
                            drugClass: {
                                clinical: "DPP-4 Inhibitor",
                                patientFriendly: "Renal-Safe Blood Sugar Pill"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Eliminated via non-renal bile excretion, serving as a safe alternative if metformin is not tolerated.",
                                patientFriendly: "Alternative diabetes pill that does not rely on kidneys for clearance."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor blood glucose levels.",
                                patientFriendly: "Routine blood sugar tracking."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Glyburide 5mg PO QD",
                    reasonForSwitch: {
                        clinical: "Long-acting sulfonylurea with active renally cleared metabolites posing hypoglycemia risk in moderate CKD.",
                        patientFriendly: "Diabetes pill that stays in the body longer when kidney filtration is moderate, increasing low blood sugar risks."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Long-Acting Sulfonylureas in CKD",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Increases risk of unpredictable low blood sugar.",
                                patientFriendly: "Increases low blood sugar risk."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Glipizide 2.5mg PO QD",
                            drugClass: {
                                clinical: "Short-Acting Sulfonylurea",
                                patientFriendly: "Short-Acting Diabetes Pill"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Short-acting sulfonylurea with inactive metabolites, preferred over glyburide in renal impairment.",
                                patientFriendly: "A shorter-acting diabetes pill that is safer for moderate kidney function."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor blood sugar levels daily.",
                                patientFriendly: "Check blood sugar regularly."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Hydrochlorothiazide 25mg PO QD",
                    reasonForSwitch: {
                        clinical: "Thiazide diuretic efficiency declines when eGFR falls below 45 mL/min; consider switching to a loop diuretic if fluid retention develops.",
                        patientFriendly: "Water pill becomes less effective as kidney filtration drops below 45."
                    },
                    medicationsToAvoid: [],
                    primaryAlternatives: [
                        {
                            drugName: "Torsemide 5mg PO QD",
                            drugClass: {
                                clinical: "Loop Diuretic",
                                patientFriendly: "Effective Water Pill"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Loop diuretics maintain reliable bioavailability and natriuresis in moderate-to-severe renal decline.",
                                patientFriendly: "A water pill that works consistently even with moderate kidney function."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor electrolytes and blood pressure.",
                                patientFriendly: "Routine blood pressure and electrolyte checks."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 18: Medium Geriatric Polypharmacy & Sleep (4 Targets)
    // ---------------------------------------------------------------------------
    {
        id: 18,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-20T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Geriatric evaluation of 4 sedating and vasodilating agents contributing to morning orthostatic lightheadedness, daytime lethargy, and fall hazards.",
                patientFriendly: "Review of sleep aids, dizziness medications, and blood pressure drugs to stop morning lightheadedness and grogginess."
            },
            regimenInteractionNotes: [
                {
                    clinical: "CUMULATIVE CNS & VASCULAR DEPRESSION: Concurrent Zolpidem, Trazodone, Amlodipine, and Meclizine produce severe central sedation, cognitive slowing, and synergistic orthostatic hypotension.",
                    patientFriendly: "Combining multiple sleep aids and blood pressure medications causes severe morning dizziness, brain fog, and a high risk of falls."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Zolpidem 5mg PO QHS",
                    reasonForSwitch: { clinical: "Sedative-hypnotic associated with next-day cognitive impairment, residual drowsiness, and nocturnal fall risk in older adults.", patientFriendly: "Prescription sleep aid that causes morning grogginess and increases fall risk." },
                    medicationsToAvoid: [{ drugOrClass: "Sedative Hypnotics in Seniors", severity: "High", reasonToAvoid: { clinical: "High risk of delirium and fractures.", patientFriendly: "Unsafe for older adults due to fall risks." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing sedative hypnotics restores next-day cognitive clarity and reduces nocturnal fall hazards.", patientFriendly: "Stopping this sleep medication entirely is the safest way to clear your head and protect against falls." }, safetyConsiderations: { clinical: "Taper gradually under physician supervision to prevent rebound insomnia.", patientFriendly: "Taper slowly with your doctor's guidance." } }],
                    secondaryAlternatives: [{ drugName: "Melatonin 1mg PO QHS", drugClass: { clinical: "Hormone Supplement", patientFriendly: "Natural Sleep Support" }, whyItIsTheBestAlternative: { clinical: "Physiologic sleep aid supporting circadian rhythm without next-day grogginess.", patientFriendly: "A gentle natural supplement that encourages sleep without residual morning drowsiness." }, safetyConsiderations: { clinical: "Use lowest effective dose.", patientFriendly: "Start with the lowest dose." } }]
                },
                {
                    targetDrug: "Trazodone 50mg PO QHS",
                    reasonForSwitch: { clinical: "Sedating antidepressant contributing to morning orthostatic hypotension and daytime somnolence in seniors.", patientFriendly: "Nighttime sleep medication that causes morning dizziness and daytime fatigue." },
                    medicationsToAvoid: [{ drugOrClass: "Sedating Antidepressants with orthostatic risk", severity: "Moderate", reasonToAvoid: { clinical: "Increases fall and dizziness hazards.", patientFriendly: "Causes morning lightheadedness." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Stopping Trazodone eliminates blood pressure drops upon standing and clears morning grogginess.", patientFriendly: "Stopping Trazodone stops morning dizziness and improves alertness." }, safetyConsiderations: { clinical: "Monitor blood pressure upon rising.", patientFriendly: "Rise slowly from bed." } }],
                    secondaryAlternatives: [{ drugName: "Ramelteon 8mg PO QHS", drugClass: { clinical: "Melatonin Receptor Agonist", patientFriendly: "Alternative Sleep Support" }, whyItIsTheBestAlternative: { clinical: "Promotes sleep without binding to GABA receptors or causing next-day hangover or orthostatic drops.", patientFriendly: "Prescription sleep aid that does not cause dizziness or grogginess." }, safetyConsiderations: { clinical: "Avoid co-administration with strong CYP1A2 inhibitors.", patientFriendly: "Check with your doctor." } }]
                },
                {
                    targetDrug: "Meclizine 25mg PO TID PRN",
                    reasonForSwitch: { clinical: "Strong anticholinergic antihistamine causing profound sedation, confusion, and urinary retention in geriatric patients.", patientFriendly: "Dizziness medication with strong drying side effects that causes daytime sleepiness and confusion." },
                    medicationsToAvoid: [{ drugOrClass: "Anticholinergic Antivertigo Agents", severity: "High", reasonToAvoid: { clinical: "Contributes heavily to Beers Criteria anticholinergic toxicity.", patientFriendly: "High risk of confusion and daytime sedation." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Removing anticholinergic vertigo pills eliminates excessive sedation and cognitive clouding.", patientFriendly: "Stopping unneeded dizziness medication immediately improves daytime alertness." }, safetyConsiderations: { clinical: "Investigate underlying vestibular etiology if symptoms persist.", patientFriendly: "Consult your doctor if dizziness continues." } }],
                    secondaryAlternatives: [{ drugName: "Vestibular Rehabilitation Therapy (VRT)", drugClass: { clinical: "Non-Pharmacologic Physical Therapy", patientFriendly: "Physical Therapy Exercises" }, whyItIsTheBestAlternative: { clinical: "Non-pharmacologic habituation exercises resolve vertigo without anticholinergic side effects.", patientFriendly: "Targeted physical therapy exercises resolve dizziness naturally." }, safetyConsiderations: { clinical: "Perform under certified physical therapist guidance.", patientFriendly: "Work with a specialist." } }]
                },
                {
                    targetDrug: "Amlodipine 10mg PO QD",
                    reasonForSwitch: { clinical: "Dihydropyridine calcium channel blocker contributing to peripheral edema and compounding orthostatic dizziness when combined with sedatives.", patientFriendly: "Blood pressure pill contributing to ankle swelling and dizziness." },
                    medicationsToAvoid: [{ drugOrClass: "High-Dose Vasodilators in orthostatic patients", severity: "Moderate", reasonToAvoid: { clinical: "Worsens lightheadedness upon standing.", patientFriendly: "Amplifies dizziness." } }],
                    primaryAlternatives: [
                        {
                            drugName: "None (Dose Reduction Only)",
                            drugClass: {
                                clinical: "Dose Reduction / Down-Titration",
                                patientFriendly: "Lowering the dose without changing the medicine"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Reducing the Amlodipine dose to 5mg PO QD provides adequate blood pressure control while mitigating peripheral edema and dizziness.",
                                patientFriendly: "Lowering your dose to 5mg daily controls your blood pressure while reducing ankle swelling and dizziness."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor blood pressure regularly and assess for peripheral swelling.",
                                patientFriendly: "Routine blood pressure checks and monitoring for swelling are recommended."
                            }
                        }
                    ],
                    secondaryAlternatives: [{ drugName: "Hydralazine 25mg PO TID", drugClass: { clinical: "Direct Vasodilator", patientFriendly: "Alternative Blood Pressure Pill" }, whyItIsTheBestAlternative: { clinical: "Alternative agent for refractory hypertension when adjusted carefully.", patientFriendly: "Alternative blood pressure medication." }, safetyConsiderations: { clinical: "Monitor for reflex tachycardia.", patientFriendly: "Routine monitoring required." } }]
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 19: Large Geriatric Deprescribing & Fall Prevention (Large - 9 Targets)
    // ---------------------------------------------------------------------------
    {
        id: 19,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-20T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Geriatric emergency deprescribing audit for 9-agent Beers Criteria polypharmacy causing acute delirium, urinary retention, and recurrent falls in an 84-year-old male.",
                patientFriendly: "Urgent senior safety audit of 9 medications causing severe confusion, inability to urinate, and dangerous falls."
            },
            regimenInteractionNotes: [
                {
                    clinical: "SEVERE GERIATRIC ANTICHOLINERGIC & SEDATIVE OVERLOAD: Concurrent Oxybutynin, Tolterodine, Amitriptyline, Diazepam, Zolpidem, Cyclobenzaprine, and Quetiapine produce catastrophic central nervous system depression, acute urinary retention, and high-velocity fall hazards.",
                    patientFriendly: "⚠️ CRITICAL URGENT WARNING: Taking multiple drying, sedating, and muscle-relaxing medications together is causing severe acute confusion, urinary retention, and dangerous falls. Immediate medical review required."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Oxybutynin 10mg PO QD",
                    reasonForSwitch: { clinical: "Potent anticholinergic bladder antispasmodic causing acute urinary retention and delirium in geriatric males.", patientFriendly: "Bladder medication with strong drying effects that causes acute urinary retention and confusion." },
                    medicationsToAvoid: [{ drugOrClass: "Potent Anticholinergic Bladder Meds in Seniors", severity: "High", reasonToAvoid: { clinical: "Causes acute urinary retention and delirium.", patientFriendly: "Blocks urination and causes confusion." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing Oxybutynin resolves acute urinary retention and clears central anticholinergic toxicity.", patientFriendly: "Stopping Oxybutynin immediately relieves urinary blockage and clears brain fog." }, safetyConsiderations: { clinical: "Evaluate post-void residual volume immediately.", patientFriendly: "Consult your doctor immediately if urinary symptoms persist." } }],
                    secondaryAlternatives: [{ drugName: "Pelvic Floor Physical Therapy", drugClass: { clinical: "Non-Pharmacologic Therapy", patientFriendly: "Physical Therapy" }, whyItIsTheBestAlternative: { clinical: "Strengthens pelvic floor musculature without anticholinergic side effects.", patientFriendly: "Natural alternative for bladder control." }, safetyConsiderations: { clinical: "Perform under specialist guidance.", patientFriendly: "Work with a specialist." } }]
                },
                {
                    targetDrug: "Tolterodine 4mg PO QD",
                    reasonForSwitch: { clinical: "Redundant anticholinergic bladder agent compounding urinary obstruction and cognitive impairment.", patientFriendly: "Duplicate bladder medication worsening urinary blockage and confusion." },
                    medicationsToAvoid: [{ drugOrClass: "Duplicate Anticholinergics", severity: "High", reasonToAvoid: { clinical: "Multiplies urinary retention risk.", patientFriendly: "Worsens urinary blockage." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Removing duplicate anticholinergic load restores normal bladder voiding and cognitive function.", patientFriendly: "Stopping duplicate bladder medications restores normal urination and alertness." }, safetyConsiderations: { clinical: "Monitor urinary output closely.", patientFriendly: "Care team will monitor urinary function." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Amitriptyline 50mg PO QHS",
                    reasonForSwitch: { clinical: "Potent tricyclic antidepressant with profound anticholinergic, sedative, and hypotensive properties.", patientFriendly: "Older antidepressant heavily contributing to dizziness, confusion, and falls." },
                    medicationsToAvoid: [{ drugOrClass: "Tricyclic Antidepressants in Seniors", severity: "High", reasonToAvoid: { clinical: "High risk of cardiac conduction delay, falls, and delirium.", patientFriendly: "Unsafe antidepressant in older adults." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Tapering and stopping Amitriptyline eliminates severe orthostatic dizziness and delirium.", patientFriendly: "Stopping Amitriptyline under medical supervision stops dizziness and prevents falls." }, safetyConsiderations: { clinical: "Gradual taper required under physician oversight.", patientFriendly: "Taper slowly under doctor guidance." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Diazepam 5mg PO QHS",
                    reasonForSwitch: { clinical: "Long-acting benzodiazepine with active metabolites causing prolonged sedation, ataxia, and severe fall risk in seniors.", patientFriendly: "Long-acting sedative causing severe daytime drowsiness, unsteadiness, and falls." },
                    medicationsToAvoid: [{ drugOrClass: "Benzodiazepines", severity: "High", reasonToAvoid: { clinical: "High risk of cognitive decline, dependence, and fractures in older adults.", patientFriendly: "Unsafe sedative in seniors due to high fall and fracture risks." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing Diazepam restores motor coordination and drastically reduces fall hazards.", patientFriendly: "Stopping Diazepam safely restores balance and prevents severe falls." }, safetyConsiderations: { clinical: "Strict medical supervision required for benzodiazepine tapering to prevent withdrawal seizures.", patientFriendly: "Must be tapered strictly under medical supervision." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Zolpidem 10mg PO QHS",
                    reasonForSwitch: { clinical: "Sedative-hypnotic compounding benzodiazepine central nervous system depression and morning ataxia.", patientFriendly: "Prescription sleep aid that increases morning grogginess and unsteadiness." },
                    medicationsToAvoid: [{ drugOrClass: "Z-drugs in seniors", severity: "High", reasonToAvoid: { clinical: "Causes daytime ataxia and falls.", patientFriendly: "Unsafe sleep aid for seniors." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Removing sedative hypnotics eliminates next-day impairment and accidental nocturnal falls.", patientFriendly: "Stopping this sleep aid clears morning brain fog and protects against falls." }, safetyConsiderations: { clinical: "Taper gradually.", patientFriendly: "Taper gradually with your doctor." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Cyclobenzaprine 10mg PO TID",
                    reasonForSwitch: { clinical: "Centrally acting skeletal muscle relaxant with marked tricyclic-like anticholinergic activity causing profound sedation.", patientFriendly: "Muscle relaxant with strong sedating properties that causes extreme drowsiness and confusion." },
                    medicationsToAvoid: [{ drugOrClass: "Muscle Relaxants in Seniors", severity: "High", reasonToAvoid: { clinical: "Causes severe sedation and fractures.", patientFriendly: "High fall risk." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing Cyclobenzaprine removes unnecessary central nervous system depression.", patientFriendly: "Stopping this muscle relaxant clears excessive daytime fatigue." }, safetyConsiderations: { clinical: "Evaluate non-pharmacologic physical therapy for musculoskeletal discomfort.", patientFriendly: "Consider physical therapy for muscle discomfort." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Quetiapine 25mg PO QHS",
                    reasonForSwitch: { clinical: "Atypical antipsychotic used off-label for sedation, contributing to orthostatic hypotension, extrapyramidal symptoms, and falls.", patientFriendly: "Antipsychotic used for sleep that increases dizziness and fall risk." },
                    medicationsToAvoid: [{ drugOrClass: "Antipsychotics for routine insomnia", severity: "Moderate", reasonToAvoid: { clinical: "Unsafe sedation and metabolic risks.", patientFriendly: "Not recommended for sleep." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing unindicated antipsychotic sedation improves cognitive clarity and motor stability.", patientFriendly: "Stopping unneeded antipsychotics clears confusion." }, safetyConsiderations: { clinical: "Monitor mental status.", patientFriendly: "Care team will monitor alertness." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Omeprazole 40mg PO QD",
                    reasonForSwitch: { clinical: "High-dose long-term PPI use in elderly patients increases risk of C. difficile infection, bone fractures, and micronutrient malabsorption.", patientFriendly: "High-dose acid blocker increases long-term risks like bone fractures in seniors." },
                    medicationsToAvoid: [{ drugOrClass: "High-Dose Long-Term PPIs in Seniors", severity: "Moderate", reasonToAvoid: { clinical: "Increases fracture risk.", patientFriendly: "Long-term bone health risks." } }],
                    primaryAlternatives: [
                        {
                            drugName: "None (Dose Reduction Only)",
                            drugClass: {
                                clinical: "Dose Reduction / Down-Titration",
                                patientFriendly: "Lowering the dose without changing the medicine"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Reducing Omeprazole to moderate dosing (20mg PO QD) provides sufficient acid control while reducing long-term adverse risks.",
                                patientFriendly: "Lowering your dose to 20mg daily protects your stomach while reducing long-term medication risks."
                            },
                            safetyConsiderations: {
                                clinical: "Evaluate periodic step-down or discontinuation.",
                                patientFriendly: "Discuss a long-term plan with your doctor."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Meloxicam 15mg PO QD",
                    reasonForSwitch: { clinical: "Systemic NSAID in advanced age causing occult GI bleeding, renal strain, and fluid retention.", patientFriendly: "Anti-inflammatory pain pill causes kidney strain and stomach risks in seniors." },
                    medicationsToAvoid: [{ drugOrClass: "All Systemic NSAIDs in Seniors", severity: "High", reasonToAvoid: { clinical: "High risk of bleeding and renal failure in geriatric patients.", patientFriendly: "Unsafe for routine use in older adults." } }],
                    primaryAlternatives: [{ drugName: "Topical Diclofenac Gel 1%", drugClass: { clinical: "Topical NSAID", patientFriendly: "Targeted Pain Cream" }, whyItIsTheBestAlternative: { clinical: "Provides local joint pain relief with minimal systemic exposure.", patientFriendly: "Targeted cream relieves joint pain locally without entering your bloodstream." }, safetyConsiderations: { clinical: "Apply only to intact skin.", patientFriendly: "Apply to healthy skin only." } }],
                    secondaryAlternatives: []
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 20: Medium Cardiovascular & Anticoagulant Safety (3 Targets)
    // ---------------------------------------------------------------------------
    {
        id: 20,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-21T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Cardiovascular safety and polypharmacy review evaluating concurrent Apixaban, Aspirin, OTC Naproxen, and high-dose Atorvastatin with Diltiazem. Identified 3 actionable targets: removing triple antithrombotic bleeding drivers and resolving statin-induced myalgia from CYP3A4 interaction.",
                patientFriendly: "Comprehensive review of your blood thinners, pain relievers, and cholesterol medication to prevent bleeding risks and resolve muscle aches caused by a drug interaction."
            },
            regimenInteractionNotes: [
                {
                    clinical: "CARDIOVASCULAR POLYPHARMACY (3 TARGETS): 1) Combining Apixaban with Aspirin and Naproxen creates high-risk hemorrhagic synergy. 2) High-dose Atorvastatin (80mg) combined with Diltiazem elevates statin blood levels via CYP3A4 inhibition, causing severe muscle toxicity. Discontinue Naproxen and Aspirin, and adjust statin regimen.",
                    patientFriendly: "We identified 3 safety updates: stopping over-the-counter Naproxen and unneeded Aspirin to protect against stomach bleeding, and adjusting your cholesterol medicine to eliminate muscle aches caused by an interaction with your heart pill."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Naproxen 500mg PO BID PRN",
                    reasonForSwitch: {
                        clinical: "Systemic NSAID combined with anticoagulation (Apixaban) and antiplatelet (Aspirin) causes severe GI ulceration and hemorrhage risk.",
                        patientFriendly: "Over-the-counter pain reliever heavily increases your risk of stomach bleeding and ulcers when combined with blood thinners."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "All Systemic NSAIDs (Ibuprofen, Meloxicam, Naproxen)",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "Compound antiplatelet activity and gastrointestinal mucosal damage.",
                                patientFriendly: "Unsafe when combined with prescription blood thinners."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Immediate discontinuation of systemic NSAIDs removes the primary driver of GI ulceration and severe bleeding.",
                                patientFriendly: "Stopping Naproxen immediately protects your stomach and prevents bleeding complications."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor for GI distress, dark stool, or abnormal bruising.",
                                patientFriendly: "Watch closely for dark stools or unusual bruising."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Topical Diclofenac Gel 1%",
                            drugClass: {
                                clinical: "Topical NSAID",
                                patientFriendly: "Targeted Joint Pain Cream"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Provides localized pain relief with minimal systemic absorption, avoiding severe bleeding synergy.",
                                patientFriendly: "A targeted topical cream that relieves joint pain locally without significantly entering your bloodstream."
                            },
                            safetyConsiderations: {
                                clinical: "Use sparingly and consult physician before application.",
                                patientFriendly: "Check with your doctor before starting any topical pain creams."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Aspirin 81mg PO QD",
                    reasonForSwitch: {
                        clinical: "Concomitant Aspirin with Apixaban requires explicit cardiology indication; unindicated dual therapy significantly increases major bleeding without benefit.",
                        patientFriendly: "Daily aspirin combined with your prescription blood thinner requires review, as stopping it reduces bleeding and bruising risks."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Unindicated Dual Antithrombotic Therapy",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Increases major bleeding without added cardiovascular benefit.",
                                patientFriendly: "Elevates bleeding risk without added benefit."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Dropping unindicated aspirin eliminates additive platelet inhibition and bleeding risk.",
                                patientFriendly: "Stopping unneeded daily aspirin significantly reduces bruising and bleeding risk."
                            },
                            safetyConsiderations: {
                                clinical: "Confirm absence of active coronary stent requirements with physician.",
                                patientFriendly: "Consult your doctor before stopping daily aspirin."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Atorvastatin 80mg PO QD",
                    reasonForSwitch: {
                        clinical: "High-dose Atorvastatin co-administered with CYP3A4 inhibitor Diltiazem increases statin AUC, causing muscle soreness and elevated rhabdomyolysis risk.",
                        patientFriendly: "High-dose cholesterol medication interacts with Diltiazem, raising statin levels in your body and causing muscle aches."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Atorvastatin > 20mg/day with Moderate CYP3A4 Inhibitors",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Increases risk of statin-induced myopathy and creatine kinase elevation.",
                                patientFriendly: "Increases risk of muscle pain and weakness."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Rosuvastatin 20mg PO QD",
                            drugClass: {
                                clinical: "Non-CYP3A4 High-Intensity Statin",
                                patientFriendly: "Non-Interacting Cholesterol Medication"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Rosuvastatin is metabolized primarily via CYP2C9, completely avoiding CYP3A4 inhibition by Diltiazem and resolving myalgia.",
                                patientFriendly: "Provides strong cholesterol control without interacting with Diltiazem, relieving muscle soreness."
                            },
                            safetyConsiderations: {
                                clinical: "Check lipid panel and liver enzymes in 6 to 8 weeks.",
                                patientFriendly: "Routine blood test scheduled in 6 to 8 weeks."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Pravastatin 40mg PO QD",
                            drugClass: {
                                clinical: "Non-CYP Hydrophilic Statin",
                                patientFriendly: "Gentle Cholesterol Medication"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Hydrophilic statin with zero CYP3A4 metabolism, suitable if myalgia persists.",
                                patientFriendly: "A gentle alternative that avoids liver enzyme interactions completely."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor LDL control.",
                                patientFriendly: "Check cholesterol levels periodically."
                            }
                        }
                    ]
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 21: Large Hospital Step-Down De-escalation (Large - 10 Targets)
    // ---------------------------------------------------------------------------
    {
        id: 21,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-21T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "General ward step-down de-escalation review for 10 concurrent agents addressing recovering renal function (Cr 1.6), normal cardiac intervals (QTc 440ms), oral antibiotic transitions, and IV-to-PO medication conversion.",
                patientFriendly: "Routine hospital review of 10 medications to transition from intravenous drugs to oral pills as you recover."
            },
            regimenInteractionNotes: [
                {
                    clinical: "ROUTINE STEP-DOWN DE-ESCALATION: 1) Transition IV antibiotics and PPIs to oral equivalents upon clinical stabilization. 2) Discontinue PRN IV sedatives and antiemetics no longer required on the general floor. 3) Adjust oral antihypertensive and antibiotic maintenance dosing for baseline Cr 1.6 mg/dL.",
                    patientFriendly: "Key step-down updates: switching IV medications to oral pills, stopping unneeded hospital nausea and sleep medications, and adjusting daily doses for your recovering kidneys."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Ketorolac 15mg IV Q6H",
                    reasonForSwitch: { clinical: "Parenteral NSAID short-course complete; transition to non-nephrotoxic oral analgesia to support ongoing renal recovery.", patientFriendly: "Intravenous pain reliever short-course complete; transitioning to safer oral options." },
                    medicationsToAvoid: [{ drugOrClass: "Continued IV NSAIDs beyond 5 days", severity: "Moderate", reasonToAvoid: { clinical: "Increases risk of renal strain and GI mucosal injury.", patientFriendly: "Long-term IV pain pills can strain kidneys." } }],
                    primaryAlternatives: [{ drugName: "Acetaminophen 650mg PO Q6H PRN", drugClass: { clinical: "Non-Opioid Analgesic", patientFriendly: "Oral Pain Reliever" }, whyItIsTheBestAlternative: { clinical: "Provides effective oral non-opioid analgesia without renal or gastrointestinal toxicity.", patientFriendly: "Safe oral pain relief option during recovery." }, safetyConsiderations: { clinical: "Do not exceed 3000mg/day total.", patientFriendly: "Do not exceed maximum daily limits." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Haloperidol 5mg IV Q4H PRN",
                    reasonForSwitch: { clinical: "PRN IV antipsychotic for acute ICU delirium no longer indicated on the general medical ward.", patientFriendly: "Hospital agitation medication no longer needed as your recovery progresses." },
                    medicationsToAvoid: [{ drugOrClass: "Unindicated Routine Antipsychotics", severity: "Moderate", reasonToAvoid: { clinical: "Causes unneeded sedating and extrapyramidal side effects.", patientFriendly: "Causes unnecessary drowsiness." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing unneeded IV haloperidol prevents extrapyramidal effects and excessive sedation.", patientFriendly: "Stopping this hospital medication clears unneeded sedation." }, safetyConsiderations: { clinical: "Monitor orientation and sleep-wake cycles.", patientFriendly: "Care team will monitor alertness." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Ondansetron 4mg IV Q8H PRN",
                    reasonForSwitch: { clinical: "Patient tolerating oral intake; transition from IV antiemetic to oral PRN formulation as needed.", patientFriendly: "Nausea medication can be converted from an IV line to an oral pill." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "Ondansetron 4mg PO ODT Q8H PRN", drugClass: { clinical: "Serotonin 5-HT3 Antagonist / Oral Transition", patientFriendly: "Oral Dissolving Nausea Tablet" }, whyItIsTheBestAlternative: { clinical: "Oral disintegrating tablet provides rapid antiemetic relief without requiring IV access.", patientFriendly: "Convenient oral tablet that dissolves on the tongue if nausea occurs." }, safetyConsiderations: { clinical: "Use PRN for active nausea only.", patientFriendly: "Take only as needed for nausea." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Metronidazole 500mg IV TID",
                    reasonForSwitch: { clinical: "Targeted culture results confirm resolution of anaerobic spectrum requirement; de-escalate triple antibiotic regimen.", patientFriendly: "Infection is resolving and targeted antibiotic coverage is no longer needed." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Antibiotic stewardship de-escalation reduces gut microbiome disruption and drug exposure.", patientFriendly: "Stopping unneeded antibiotics protects healthy gut bacteria and prevents resistance." }, safetyConsiderations: { clinical: "Monitor temperature and inflammatory markers.", patientFriendly: "Care team will track recovery." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Enalaprilat 1.25mg IV Q6H",
                    reasonForSwitch: { clinical: "Transition parenteral IV blood pressure agent to oral ACE inhibitor as patient tolerates diet and oral meds.", patientFriendly: "Intravenous blood pressure medicine can now be taken as a simple oral pill." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "Lisinopril 10mg PO QD", drugClass: { clinical: "Oral ACE Inhibitor / Conversion", patientFriendly: "Daily Blood Pressure Pill" }, whyItIsTheBestAlternative: { clinical: "Oral once-daily ACE inhibitor provides smooth 24-hour blood pressure control during step-down.", patientFriendly: "Once-daily blood pressure pill ideal for home recovery." }, safetyConsiderations: { clinical: "Check renal function and potassium in 1 week.", patientFriendly: "Routine blood test in one week." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Vancomycin 1.75g IV Q12H",
                    reasonForSwitch: { clinical: "MRSA cultures negative; step down broad-spectrum IV coverage to targeted oral antibiotic therapy.", patientFriendly: "Broad-spectrum IV antibiotic can be stepped down to targeted oral therapy." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "Cefdinir 300mg PO BID", drugClass: { clinical: "Oral Cephalosporin / Step-Down", patientFriendly: "Oral Antibiotic Pill" }, whyItIsTheBestAlternative: { clinical: "Provides targeted oral step-down coverage for resolving infection prior to discharge.", patientFriendly: "Targeted oral antibiotic pill to complete your treatment course." }, safetyConsiderations: { clinical: "Complete 7-day total course.", patientFriendly: "Take full course as directed." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Cefepime 2g IV Q8H",
                    reasonForSwitch: { clinical: "Pseudomonal coverage no longer required based on final culture sensitivities; step down to oral therapy.", patientFriendly: "Intravenous hospital antibiotic ready to transition to oral medication." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing broad-spectrum IV cefepime as targeted oral therapy (Cefdinir) takes over.", patientFriendly: "Stopping IV antibiotic as your oral antibiotic takes over." }, safetyConsiderations: { clinical: "Monitor clinical infection markers.", patientFriendly: "Care team will monitor recovery." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Fentanyl IV Infusion",
                    reasonForSwitch: { clinical: "Continuous IV opioid infusion discontinued upon transfer out of ICU; transition to oral PRN pain regimen.", patientFriendly: "Continuous IV pain pump discontinued; switching to as-needed pain pills." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "Oxycodone 5mg PO Q6H PRN", drugClass: { clinical: "Oral Opioid Analgesic / Step-Down", patientFriendly: "As-Needed Pain Pill" }, whyItIsTheBestAlternative: { clinical: "Provides predictable oral analgesia for moderate breakthrough pain during mobilization.", patientFriendly: "As-needed oral pain pill to keep you comfortable as you move around." }, safetyConsiderations: { clinical: "Monitor respiratory status and bowel regimen.", patientFriendly: "Take only as needed for significant pain." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Propofol IV Infusion",
                    reasonForSwitch: { clinical: "Sedative infusion discontinued upon extubation and transfer to step-down ward.", patientFriendly: "ICU sleep infusion stopped as you recover on the care floor." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing continuous IV sedation allows natural wakefulness and physical therapy participation.", patientFriendly: "Stopping IV sedation allows you to stay awake, alert, and active." }, safetyConsiderations: { clinical: "Assess sleep quality naturally.", patientFriendly: "Care team will support natural sleep cycles." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Pantoprazole 40mg IV QD",
                    reasonForSwitch: { clinical: "Convert IV proton pump inhibitor to oral formulation as patient transitions to full oral diet.", patientFriendly: "Stomach protection converted from IV line to an oral pill." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "Pantoprazole 20mg PO QD", drugClass: { clinical: "Proton Pump Inhibitor / Oral Conversion", patientFriendly: "Oral Stomach Protector" }, whyItIsTheBestAlternative: { clinical: "Oral PPI provides equivalent gastroprotection during hospital recovery.", patientFriendly: "Once-daily oral pill that protects your stomach lining." }, safetyConsiderations: { clinical: "Re-evaluate need prior to discharge.", patientFriendly: "Discuss discharge plan with your doctor." } }],
                    secondaryAlternatives: []
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 22: Medium Endocrine & Neuropathic Management (4 Targets)
    // ---------------------------------------------------------------------------
    {
        id: 22,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-21T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Endocrine and neuropathic polypharmacy review for 4 actionable targets in a 62 y/o patient with T2DM and painful peripheral neuropathy: deprescribing duplicate gabapentinoid therapy (Pregabalin), schedule-optimizing Gabapentin, de-escalating high-dose sulfonylurea hypoglycemia risks (Glipizide), and converting to supratherapeutic-corrected Duloxetine plus a cardiorenal-protective SGLT2 inhibitor (Empagliflozin). Metformin remains validated as safe baseline therapy.",
                patientFriendly: "Comprehensive review of your diabetes and nerve pain medications to make 4 important adjustments: stopping duplicate nerve pain pills to clear brain fog, updating your nerve medication dose, and switching blood sugar pills to stop low blood sugar crashes while protecting your heart and kidneys."
            },
            regimenInteractionNotes: [
                {
                    clinical: "ENDOCRINE & NEUROPATHIC OPTIMIZATION (4 TARGETS): 1) Concurrent Gabapentin and Pregabalin represent redundant calcium channel alpha-2-delta ligand dosing driving severe daytime cognitive slowing. Discontinue Pregabalin and optimize Gabapentin. 2) Glipizide 10mg BID drives recurrent hypoglycemia; replace with an SGLT2 inhibitor to improve HbA1c (8.8%) safely without low blood sugar crashes. 3) Duloxetine dosing exceeds standard FDA maximums (300mg vs 60mg QD); correct to recommended maintenance dose.",
                    patientFriendly: "We identified 4 safety updates: 1) Stopping Pregabalin to remove duplicate nerve medication causing daytime brain fog. 2) Adjusting your Gabapentin timing to evening hours. 3) Replacing Glipizide with a modern diabetes pill (Empagliflozin) to stop low blood sugar crashes while safely lowering your HbA1c. 4) Correcting your Duloxetine dose to the safe daily maximum."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Pregabalin 75mg PO BID",
                    reasonForSwitch: {
                        clinical: "Redundant gabapentinoid agent duplicating Gabapentin mechanism, compounding central nervous system depression without added analgesia.",
                        patientFriendly: "Duplicate nerve pain medication that causes heavy daytime tiredness and brain fog without providing extra pain relief."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Duplicate Gabapentinoid Therapy",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Multiplies central nervous system sedation and fall risk.",
                                patientFriendly: "Causes unnecessary daytime sleepiness and memory clouding."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Discontinuing duplicate gabapentinoid therapy eliminates unnecessary CNS depression while preserving neuropathic coverage via optimized Gabapentin and Duloxetine.",
                                patientFriendly: "Stopping Pregabalin completely clears daytime brain fog while your other medications handle nerve pain."
                            },
                            safetyConsiderations: {
                                clinical: "Taper Pregabalin dosage over 1 week under physician supervision.",
                                patientFriendly: "Taper down slowly under medical guidance."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Gabapentin 300mg PO TID",
                    reasonForSwitch: {
                        clinical: "Maintains primary neuropathic pain control, but daytime dosing schedule exacerbates somnolence and work-hour sedation.",
                        patientFriendly: "Primary nerve pain medication; dosing schedule can be shifted toward evening to improve daytime energy."
                    },
                    medicationsToAvoid: [],
                    primaryAlternatives: [
                        {
                            drugName: "Gabapentin 300mg PO QHS (Evening-Skewed Dosing)",
                            drugClass: {
                                clinical: "Anticonvulsant / Schedule Optimization",
                                patientFriendly: "Optimized Nerve Medication Schedule"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Shifting primary dosing toward bedtime preserves nocturnal pain relief and sleep quality while reducing daytime drowsiness.",
                                patientFriendly: "Taking your dose at bedtime keeps your nerve pain controlled overnight while keeping you awake and alert during the day."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor neuropathic pain control and daytime alertness.",
                                patientFriendly: "Track your pain relief and energy levels."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Glipizide 10mg PO BID",
                    reasonForSwitch: {
                        clinical: "High-dose sulfonylurea driving recurrent hypoglycemic episodes while failing to achieve overall HbA1c target (8.8%).",
                        patientFriendly: "Diabetes pill causing frequent shaky, sweaty low blood sugar drops while no longer adequately controlling overall blood sugar."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "High-Dose Sulfonylureas with Recurrent Hypoglycemia",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Triggers secretagogue-induced hypoglycemia and weight gain.",
                                patientFriendly: "Causes unpredictable blood sugar drops and weight gain."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Empagliflozin 10mg PO QD",
                            drugClass: {
                                clinical: "SGLT2 Inhibitor",
                                patientFriendly: "Cardiorenal-Protective Diabetes Pill"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Provides glucose-dependent urinary excretion to safely lower HbA1c without hypoglycemia risk, while providing cardiorenal protection.",
                                patientFriendly: "Lowers overall blood sugar safely through your urine without causing low blood sugar crashes."
                            },
                            safetyConsiderations: {
                                clinical: "Maintain hydration; counsel on genital hygiene to prevent mycotic infections.",
                                patientFriendly: "Drink plenty of water daily and maintain good personal hygiene."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Sitagliptin 100mg PO QD",
                            drugClass: {
                                clinical: "DPP-4 Inhibitor",
                                patientFriendly: "Low-Risk Blood Sugar Regulator"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Glucose-dependent incretin enhancer that improves glycemic control with negligible hypoglycemia risk.",
                                patientFriendly: "Gentle daily pill that helps control blood sugar without causing crashes."
                            },
                            safetyConsiderations: {
                                clinical: "Monitor renal function periodically.",
                                patientFriendly: "Routine kidney function monitoring."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Duloxetine 300mg PO QD",
                    reasonForSwitch: {
                        clinical: "Exceeds standard maximum recommended daily dosage (60mg QD for diabetic neuropathy; 120mg QD max in depression), increasing adrenergic side effects.",
                        patientFriendly: "Dose is higher than recommended daily limits for nerve pain."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Supratherapeutic SNRI Dosing (> 120mg/day)",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "Elevates risk of severe noradrenergic side effects, hypertension, and serotonin toxicity.",
                                patientFriendly: "Increases risk of high blood pressure, jitteriness, and side effects."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Dose Reduction Only)",
                            drugClass: {
                                clinical: "Dose Reduction / Down-Titration",
                                patientFriendly: "Lowering the dose without changing the medicine"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Tapering Duloxetine down to 60mg daily achieves evidence-based optimal diabetic peripheral neuropathy control while drastically reducing noradrenergic and serotonergic toxicity risk.",
                                patientFriendly: "Lowering your dose to 60mg daily gives you full nerve pain relief at a safer, proven level while eliminating jittery side effects."
                            },
                            safetyConsiderations: {
                                clinical: "Step down dose incrementally under clinical supervision to avoid withdrawal/discontinuation symptoms.",
                                patientFriendly: "Reduce your dose step-by-step under your doctor's guidance."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 23: Mega-Polypharmacy & High-Risk Regimen Audit (Large - 16 Targets)
    // ---------------------------------------------------------------------------
    {
        id: 23,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-21T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Comprehensive 16-agent polypharmacy audit for a 79-year-old female presenting with supratherapeutic INR (5.4), stage 4 CKD (eGFR 29), hyperkalemia (5.8 mEq/L), anticholinergic cognitive impairment, and severe drug-drug interactions.",
                patientFriendly: "In-depth safety review of 16 medications causing high bleeding risks, kidney strain, elevated potassium levels, and memory fog."
            },
            regimenInteractionNotes: [
                {
                    clinical: "CRITICAL MULTI-SYSTEM POLYPHARMACY HAZARD: Concurrent Warfarin, Aspirin, Ibuprofen, and St. John's Wort induce severe bleeding risk and metabolic enzyme induction/inhibition. Concurrent Lisinopril, Potassium Chloride, and Ibuprofen severely worsen acute kidney injury and hyperkalemia. Anticholinergic load (Diphenhydramine, Zolpidem) drives cognitive decline.",
                    patientFriendly: "⚠️ HIGH-RISK MEDICATION MIX: Taking multiple blood thinners, strong pain pills, potassium supplements, and sleep aids together is causing dangerous bleeding risks, kidney strain, high potassium, and severe confusion."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Warfarin 5mg PO QD",
                    reasonForSwitch: { clinical: "Supratherapeutic INR (5.4) exacerbated by metabolic interactions with St. John's Wort and concurrent NSAID/antiplatelet therapy.", patientFriendly: "Blood thinner level is dangerously high (INR 5.4), increasing severe bleeding risks." },
                    medicationsToAvoid: [{ drugOrClass: "Concurrent NSAIDs and Inducers", severity: "High", reasonToAvoid: { clinical: "Drastically elevates GI bleeding risk.", patientFriendly: "Causes severe stomach bleeding." } }],
                    primaryAlternatives: [{ drugName: "None (Dose Reduction Only)", drugClass: { clinical: "Dose Reduction / Down-Titration", patientFriendly: "Lowering the dose without changing the medicine" }, whyItIsTheBestAlternative: { clinical: "Temporarily hold and down-titrate Warfarin dose under strict protocol until INR returns to therapeutic range (2.0-3.0).", patientFriendly: "Hold doses as directed by your doctor to bring your blood thinning levels back into a safe range." }, safetyConsiderations: { clinical: "Recheck INR in 24-48 hours.", patientFriendly: "Requires frequent blood tests." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Ibuprofen 800mg PO TID",
                    reasonForSwitch: { clinical: "High-dose systemic NSAID causing acute kidney injury (eGFR 29), severe GI bleeding risk with Warfarin, and blunting antihypertensive therapy.", patientFriendly: "High-dose pain pill causing kidney damage, stomach bleeding, and high blood pressure." },
                    medicationsToAvoid: [{ drugOrClass: "Systemic NSAIDs in CKD / Anticoagulation", severity: "High", reasonToAvoid: { clinical: "Direct nephrotoxicity and severe hemorrhage hazard.", patientFriendly: "Unsafe with blood thinners and weak kidneys." } }],
                    primaryAlternatives: [{ drugName: "Topical Diclofenac Gel 1%", drugClass: { clinical: "Topical NSAID", patientFriendly: "Targeted Pain Cream" }, whyItIsTheBestAlternative: { clinical: "Provides localized joint pain relief with minimal systemic absorption, preserving renal function and bleeding safety.", patientFriendly: "Relieves local pain without going through your kidneys or stomach." }, safetyConsiderations: { clinical: "Apply only to affected joint.", patientFriendly: "Use on intact skin only." } }],
                    secondaryAlternatives: [{ drugName: "Acetaminophen 500mg PO TID", drugClass: { clinical: "Analgesic", patientFriendly: "Non-NSAID Pain Reliever" }, whyItIsTheBestAlternative: { clinical: "Non-nephrotoxic systemic analgesic option.", patientFriendly: "Safer pain relief option for kidneys." }, safetyConsiderations: { clinical: "Limit total daily dose to <2g in frail elderly.", patientFriendly: "Do not exceed recommended dose." } }]
                },
                {
                    targetDrug: "St. John's Wort 300mg PO TID",
                    reasonForSwitch: { clinical: "Potent CYP3A4 and P-glycoprotein inducer causing unpredictable Warfarin metabolism and widespread drug-drug interactions.", patientFriendly: "Herbal supplement interfering with prescription drug levels, including blood thinners." },
                    medicationsToAvoid: [{ drugOrClass: "Potent CYP Inducing Herbals", severity: "High", reasonToAvoid: { clinical: "Destabilizes critical narrow therapeutic index drugs.", patientFriendly: "Unpredictably alters prescription medicine levels." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing St. John's Wort stabilizes Warfarin kinetics and eliminates metabolic interference.", patientFriendly: "Stopping this supplement allows your prescription medicines to work safely and predictably." }, safetyConsiderations: { clinical: "Monitor INR closely during clearance.", patientFriendly: "Monitor blood tests closely with your care team." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Potassium Chloride 20 mEq PO QD",
                    reasonForSwitch: { clinical: "Exogenous potassium supplementation compounding Lisinopril-induced hyperkalemia (K+ 5.8 mEq/L) and impaired renal clearance.", patientFriendly: "Potassium supplement contributing to dangerously high blood potassium levels." },
                    medicationsToAvoid: [{ drugOrClass: "Exogenous Potassium in Hyperkalemia", severity: "High", reasonToAvoid: { clinical: "Risk of fatal cardiac arrhythmias.", patientFriendly: "High potassium can cause dangerous heart rhythms." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing exogenous potassium immediately addresses serum hyperkalemia.", patientFriendly: "Stopping potassium supplements normalizes your blood potassium level." }, safetyConsiderations: { clinical: "Recheck basic metabolic panel in 48 hours.", patientFriendly: "Requires repeat blood work in a few days." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Diphenhydramine 50mg PO QHS",
                    reasonForSwitch: { clinical: "Highly anticholinergic first-generation antihistamine causing severe daytime delirium, sedation, and fall risk in elderly adults.", patientFriendly: "Over-the-counter sleep medicine causing severe confusion, brain fog, and dizziness." },
                    medicationsToAvoid: [{ drugOrClass: "First-Generation Antihistamines in Seniors", severity: "High", reasonToAvoid: { clinical: "Beers Criteria strong avoid; causes delirium.", patientFriendly: "Unsafe for memory and balance in older adults." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Deprescribing Diphenhydramine resolves central anticholinergic toxicity and clears delirium.", patientFriendly: "Stopping this allergy/sleep medication clears brain fog and restores mental alertness." }, safetyConsiderations: { clinical: "Utilize non-pharmacologic sleep hygiene.", patientFriendly: "Practice good bedtime routines for sleep." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Zolpidem 10mg PO QHS",
                    reasonForSwitch: { clinical: "Sedative-hypnotic compounding central nervous system depression and morning ataxia in advanced age.", patientFriendly: "Prescription sleep aid adding to morning grogginess and fall risk." },
                    medicationsToAvoid: [{ drugOrClass: "Z-Drugs in Seniors", severity: "High", reasonToAvoid: { clinical: "Increases risk of fractures, motor vehicle accidents, and delirium.", patientFriendly: "High risk of falls and memory issues." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Gradually tapering Zolpidem restores motor coordination and prevents nocturnal falls.", patientFriendly: "Tapering off this sleep aid protects against balance issues and falls." }, safetyConsiderations: { clinical: "Taper over 2-4 weeks to avoid rebound insomnia.", patientFriendly: "Taper gradually with your doctor." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Aspirin 81mg PO QD",
                    reasonForSwitch: { clinical: "Concomitant antiplatelet therapy with Warfarin without established secondary vascular indication drastically multiplies GI bleeding risk.", patientFriendly: "Taking aspirin alongside Warfarin doubles your risk of severe stomach bleeding." },
                    medicationsToAvoid: [{ drugOrClass: "Unindicated Dual Anticoagulant-Antiplatelet Therapy", severity: "High", reasonToAvoid: { clinical: "Severe hemorrhage without proven ischemic benefit.", patientFriendly: "High bleeding risk without added benefit." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing unindicated Aspirin reduces major gastrointestinal bleeding risk by over 50%.", patientFriendly: "Stopping daily aspirin safely lowers your risk of stomach bleeding." }, safetyConsiderations: { clinical: "Re-evaluate cardiovascular indications.", patientFriendly: "Discuss heart risk factors with your doctor." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Metformin 1000mg PO BID",
                    reasonForSwitch: { clinical: "Full-dose Metformin contraindicated in severe renal impairment (eGFR 29 mL/min) due to risk of lactic acidosis.", patientFriendly: "Full-dose diabetes pill is unsafe when kidney function drops below 30." },
                    medicationsToAvoid: [{ drugOrClass: "Full-Dose Metformin in Advanced CKD", severity: "High", reasonToAvoid: { clinical: "Risk of fatal lactic acidosis when eGFR <30 mL/min.", patientFriendly: "High risk of dangerous acid buildup when kidneys are weak." } }],
                    primaryAlternatives: [{ drugName: "None (Deprescribing Only)", drugClass: { clinical: "Deprescribing / Pharmacologic Withholding", patientFriendly: "Stopping the medicine without a replacement" }, whyItIsTheBestAlternative: { clinical: "Discontinuing Metformin eliminates lactic acidosis risk while renal function is acutely depressed.", patientFriendly: "Stopping Metformin protects your body while your kidneys are under strain." }, safetyConsiderations: { clinical: "Monitor blood glucose closely; evaluate DPP-4 inhibitors.", patientFriendly: "Monitor blood sugar levels closely." } }],
                    secondaryAlternatives: [{ drugName: "Linagliptin 5mg PO QD", drugClass: { clinical: "DPP-4 Inhibitor", patientFriendly: "Kidney-Safe Diabetes Pill" }, whyItIsTheBestAlternative: { clinical: "Requires no dose adjustment in severe renal impairment.", patientFriendly: "Safe diabetes medication that does not rely on kidney clearance." }, safetyConsiderations: { clinical: "Monitor HbA1c.", patientFriendly: "Check regular blood sugar trends." } }]
                },
                {
                    targetDrug: "Lisinopril 20mg PO QD",
                    reasonForSwitch: { clinical: "ACE inhibitor contributing to hyperkalemia (5.8 mEq/L) and acute renal function decline (eGFR 29).", patientFriendly: "Blood pressure pill contributing to high blood potassium and kidney strain." },
                    medicationsToAvoid: [{ drugOrClass: "ACEi/ARB in Severe Acute Hyperkalemia", severity: "Moderate", reasonToAvoid: { clinical: "Worsens renal hemodynamics and potassium retention.", patientFriendly: "Keeps potassium levels too high when kidneys are strained." } }],
                    primaryAlternatives: [{ drugName: "None (Schedule Optimization Only)", drugClass: { clinical: "Schedule Optimization / Timing Adjustment", patientFriendly: "Adjusting when you take the medicine without changing the drug" }, whyItIsTheBestAlternative: { clinical: "Temporarily hold Lisinopril until serum potassium is <5.0 mEq/L and renal function stabilizes.", patientFriendly: "Temporarily pausing this pill allows your potassium and kidneys to stabilize." }, safetyConsiderations: { clinical: "Re-check BMP in 3-5 days.", patientFriendly: "Requires repeat blood test in a few days." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Glipizide 10mg PO BID",
                    reasonForSwitch: { clinical: "Sulfonylurea with prolonged clearance in renal impairment, posing high hypoglycemia risk.", patientFriendly: "Diabetes pill that can stay in the body too long and cause dangerously low blood sugar." },
                    medicationsToAvoid: [{ drugOrClass: "High-Dose Sulfonylureas in CKD", severity: "Moderate", reasonToAvoid: { clinical: "Severe prolonged hypoglycemia.", patientFriendly: "Causes low blood sugar when kidneys clear drugs slowly." } }],
                    primaryAlternatives: [{ drugName: "None (Dose Reduction Only)", drugClass: { clinical: "Dose Reduction / Down-Titration", patientFriendly: "Lowering the dose without changing the medicine" }, whyItIsTheBestAlternative: { clinical: "Reduce Glipizide dose to 2.5mg-5mg daily to reduce severe low blood sugar episodes in CKD.", patientFriendly: "Lowering your dose prevents dangerous low blood sugar drops." }, safetyConsiderations: { clinical: "Keep fast-acting glucose available.", patientFriendly: "Keep rapid glucose tabs or juice nearby." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Omeprazole 20mg PO QD",
                    reasonForSwitch: { clinical: "Clinically appropriate gastroprotection while patient remains on anticoagulation, but long-term use should be re-evaluated after deprescribing NSAIDs/Aspirin.", patientFriendly: "Stomach protection pill that is currently helpful while taking blood thinners." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "Omeprazole 20mg PO QD", drugClass: { clinical: "Proton Pump Inhibitor", patientFriendly: "Acid Reducer" }, whyItIsTheBestAlternative: { clinical: "Continue short-term for gastric mucosal protection until blood thinners and GI risks are stabilized.", patientFriendly: "Continue taking this as prescribed to protect your stomach lining." }, safetyConsiderations: { clinical: "Re-evaluate need after Aspirin/NSAID discontinuation.", patientFriendly: "Discuss long-term duration with your doctor." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Metoprolol Tartrate 50mg PO BID",
                    reasonForSwitch: { clinical: "Clinically appropriate rate control agent for cardiovascular history; maintain current regimen.", patientFriendly: "Heart and blood pressure pill that is working well and should be continued." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "Metoprolol Tartrate 50mg PO BID", drugClass: { clinical: "Beta-Blocker", patientFriendly: "Heart Rate & Blood Pressure Pill" }, whyItIsTheBestAlternative: { clinical: "Provides effective rate control and cardioprotection without worsening hyperkalemia or acute renal status.", patientFriendly: "Keep taking this medication as directed for heart health." }, safetyConsiderations: { clinical: "Monitor heart rate and blood pressure.", patientFriendly: "Check pulse and blood pressure regularly." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Amlodipine 10mg PO QD",
                    reasonForSwitch: { clinical: "Clinically appropriate dihydropyridine calcium channel blocker for blood pressure control with zero renal or potassium burden.", patientFriendly: "Blood pressure pill that is safe for your kidneys and potassium levels." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "Amlodipine 10mg PO QD", drugClass: { clinical: "Calcium Channel Blocker", patientFriendly: "Blood Pressure Pill" }, whyItIsTheBestAlternative: { clinical: "Maintains blood pressure control without affecting renal hemodynamics or electrolyte excretion.", patientFriendly: "Safe blood pressure pill to continue taking." }, safetyConsiderations: { clinical: "Monitor for peripheral edema.", patientFriendly: "Watch for mild ankle swelling." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Furosemide 40mg PO QD",
                    reasonForSwitch: { clinical: "Loop diuretic assisting with potassium excretion in hyperkalemia, but requires volume status monitoring in acute renal strain.", patientFriendly: "Water pill that helps lower high potassium, but requires fluid tracking." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "Furosemide 40mg PO QD", drugClass: { clinical: "Loop Diuretic", patientFriendly: "Water Pill" }, whyItIsTheBestAlternative: { clinical: "Helps promote urinary potassium excretion in severe hyperkalemia.", patientFriendly: "Continue taking to help your body clear excess potassium and fluids." }, safetyConsiderations: { clinical: "Monitor daily weights and volume status.", patientFriendly: "Track daily weight and fluid intake." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Atorvastatin 40mg PO QD",
                    reasonForSwitch: { clinical: "Clinically appropriate statin therapy for cardiovascular risk reduction; no active acute conflicts.", patientFriendly: "Cholesterol medication that is safe to continue." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "Atorvastatin 40mg PO QD", drugClass: { clinical: "HMG-CoA Reductase Inhibitor", patientFriendly: "Cholesterol Pill" }, whyItIsTheBestAlternative: { clinical: "Provides essential atherosclerotic cardiovascular disease protection with safe hepatic and renal safety profile.", patientFriendly: "Continue taking daily for heart and blood vessel protection." }, safetyConsiderations: { clinical: "Routine periodic LFT monitoring.", patientFriendly: "Standard routine lab checks." } }],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Multivitamin PO QD",
                    reasonForSwitch: { clinical: "Over-the-counter dietary supplement with no active adverse drug interactions.", patientFriendly: "Daily multivitamin that is safe to continue." },
                    medicationsToAvoid: [],
                    primaryAlternatives: [{ drugName: "Multivitamin PO QD", drugClass: { clinical: "Dietary Supplement", patientFriendly: "Daily Vitamin" }, whyItIsTheBestAlternative: { clinical: "Provides general micronutrient support without metabolic or electrolyte risks.", patientFriendly: "Safe general daily vitamin supplement." }, safetyConsiderations: { clinical: "Ensure non-potassium containing formulation.", patientFriendly: "Choose vitamins without added potassium." } }],
                    secondaryAlternatives: []
                }
            ]
        }
    },

    // ---------------------------------------------------------------------------
    // CASE 24: Medium Respiratory & Allergy De-escalation (3 Targets)
    // ---------------------------------------------------------------------------
    {
        id: 24,
        mockOutput: {
            isValidInput: true,
            isEmergency: false,
            isHighAcuity: false,
            meta: { timestamp: "2026-10-21T00:00:00.000Z", model: "malt-ai-clinical-v2" },
            inputSummary: {
                clinical: "Outpatient polypharmacy de-escalation for 6 actionable targets in a 69 y/o patient with asthma/COPD overlap, addressing narrow-therapeutic-index toxicity (Theophylline), heavy anticholinergic burden (Diphenhydramine + Hydroxyzine), and sympathomimetic cardiotoxicity (Pseudoephedrine).",
                patientFriendly: "Comprehensive safety review to update your respiratory inhalers and stop duplicate allergy and sleep medications causing tremors, racing heart, and dry mouth."
            },
            regimenInteractionNotes: [
                {
                    clinical: "OUTPATIENT RESPIRATORY DE-ESCALATION: 1) High-risk narrow-index systemic xanthine (Theophylline) drives tremor and tachyarrhythmia; replace with modern long-acting dual bronchodilator therapy. 2) Severe anticholinergic duplication (Diphenhydramine + Hydroxyzine) causes sedation, cognitive impairment, and urinary retention. 3) Systemic sympathomimetic decongestant (Pseudoephedrine) exacerbates cardiovascular strain.",
                    patientFriendly: "We identified key safety updates: replacing an old respiratory pill that causes heart palpitations with a modern combination inhaler, stopping duplicate sleep and allergy pills to clear confusion, and removing decongestants straining your heart."
                }
            ],
            medicationAnalyses: [
                {
                    targetDrug: "Theophylline 300mg PO BID",
                    reasonForSwitch: {
                        clinical: "Narrow therapeutic index methylxanthine causing tremors, sinus tachycardia, and drug interaction risks in an older adult.",
                        patientFriendly: "Older respiratory pill with high risk of side effects like hand tremors, rapid heartbeats, and nausea."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Systemic Methylxanthines in Senior Respiratory Care",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "High cardiac toxicity risk and narrow window between therapeutic benefit and severe toxicity.",
                                patientFriendly: "Narrow safety margin increases risk of heart rhythm problems."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Tiotropium / Olodaterol 2.5/2.5mcg Inhaler 2 puffs QD",
                            drugClass: {
                                clinical: "LAMA / LABA Combination Inhaler",
                                patientFriendly: "Long-Acting Dual Inhaler"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Delivers superior pulmonary bronchodilation directly to airway tissues without systemic cardiotoxicity or tremor.",
                                patientFriendly: "Provides effective 24-hour breathing support directly to your lungs without causing heart racing or body shakes."
                            },
                            safetyConsiderations: {
                                clinical: "Rinse mouth after use; monitor for dry mouth.",
                                patientFriendly: "Rinse and spit with water after inhaling."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Umeclidinium 62.5mcg Inhalation QD",
                            drugClass: {
                                clinical: "Long-Acting Muscarinic Antagonist (LAMA)",
                                patientFriendly: "Once-Daily Inhaled Respiratory Protector"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Targeted long-acting anticholinergic bronchodilation with minimal systemic side effects.",
                                patientFriendly: "Targeted daily inhaler focused on keeping airways open safely."
                            },
                            safetyConsiderations: {
                                clinical: "Verify correct inhaler technique.",
                                patientFriendly: "Ensure proper inhaler technique."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Diphenhydramine 50mg PO QHS PRN",
                    reasonForSwitch: {
                        clinical: "First-generation H1 antagonist on Beers Criteria causing severe sedation, morning grogginess, and urinary retention.",
                        patientFriendly: "Over-the-counter sleep and allergy aid that causes severe morning grogginess, dry mouth, and urinary difficulties."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "First-Generation Antihistamines in Older Adults",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "Strong central anticholinergic activity driving confusion, falls, and urinary retention.",
                                patientFriendly: "Increases risk of memory confusion, dry mouth, and accidental falls."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "None (Deprescribing Only)",
                            drugClass: {
                                clinical: "Deprescribing / Pharmacologic Withholding",
                                patientFriendly: "Stopping the medicine without a replacement"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Supports natural sleep architecture without anticholinergic burden, fall risk, or morning hangover effects.",
                                patientFriendly: "Stopping this medication prevents unnecessary grogginess, memory clouding, and dry mouth."
                            },
                            safetyConsiderations: {
                                clinical: "Encourage non-pharmacologic sleep hygiene measures.",
                                patientFriendly: "Maintain regular sleep hours and avoid screens before bed."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Hydroxyzine 25mg PO TID PRN",
                    reasonForSwitch: {
                        clinical: "Redundant first-generation antihistamine adding to total anticholinergic load and daytime somnolence.",
                        patientFriendly: "Duplicate allergy medication that causes heavy daytime tiredness and confusion."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Duplicate First-Generation Antihistamines",
                            severity: "High",
                            reasonToAvoid: {
                                clinical: "Multiplies anticholinergic toxicity and cognitive impairment.",
                                patientFriendly: "Dangerous duplication of sedating side effects."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Cetirizine 10mg PO QD",
                            drugClass: {
                                clinical: "Second-Generation Non-Drowsy Antihistamine",
                                patientFriendly: "Non-Drowsy Daily Allergy Pill"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Provides robust 24-hour peripheral allergy relief without crossing the blood-brain barrier.",
                                patientFriendly: "Provides non-drowsy, 24-hour allergy relief without clouding your thinking."
                            },
                            safetyConsiderations: {
                                clinical: "Take once daily in the morning.",
                                patientFriendly: "Take once every morning."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Loratadine 10mg PO QD",
                            drugClass: {
                                clinical: "Second-Generation Antihistamine",
                                patientFriendly: "Non-Drowsy Allergy Relief"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Non-sedating alternative for daily allergic rhinitis management.",
                                patientFriendly: "Clean, non-drowsy alternative for daily allergy control."
                            },
                            safetyConsiderations: {
                                clinical: "Take once daily.",
                                patientFriendly: "Take once daily."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Pseudoephedrine 60mg PO BID",
                    reasonForSwitch: {
                        clinical: "Systemic oral alpha/beta agonist elevating systemic vascular resistance and inducing sinus tachycardia.",
                        patientFriendly: "Oral decongestant pill that raises blood pressure and causes heart palpitations."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Systemic Decongestants in Older Adults",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Increases vascular resistance and heart rate while exacerbating insomnia.",
                                patientFriendly: "Elevates blood pressure and disrupts sleep patterns."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Fluticasone Propionate Nasal Spray 50mcg 1-2 sprays/nostril QD",
                            drugClass: {
                                clinical: "Intranasal Corticosteroid",
                                patientFriendly: "Targeted Allergy Nasal Spray"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Delivers potent anti-inflammatory nasal decongestion locally without systemic cardiovascular stimulation.",
                                patientFriendly: "Relieves nasal congestion directly at the source without affecting blood pressure or heart rate."
                            },
                            safetyConsiderations: {
                                clinical: "Direct spray slightly away from nasal septum.",
                                patientFriendly: "Point spray slightly away from the center line of your nose."
                            }
                        }
                    ],
                    secondaryAlternatives: [
                        {
                            drugName: "Saline Nasal Rinse BID",
                            drugClass: {
                                clinical: "Nasal Irrigation / Non-Pharmacologic",
                                patientFriendly: "Saline Nasal Flush"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Clears allergens and mucus mechanically with zero systemic absorption.",
                                patientFriendly: "Natural nasal wash that clears mucus and allergens safely."
                            },
                            safetyConsiderations: {
                                clinical: "Use distilled or sterile water only.",
                                patientFriendly: "Always use distilled or boiled water."
                            }
                        }
                    ]
                },
                {
                    targetDrug: "Fluticasone Propionate 220mcg Inhaler 2 puffs BID",
                    reasonForSwitch: {
                        clinical: "High-dose inhaled corticosteroid monotherapy lacks required long-acting bronchodilation for severe COPD/asthma overlap.",
                        patientFriendly: "Single-agent steroid inhaler can be upgraded to a convenient combination inhaler."
                    },
                    medicationsToAvoid: [],
                    primaryAlternatives: [
                        {
                            drugName: "Fluticasone / Salmeterol 250/50mcg DPI 1 puff BID",
                            drugClass: {
                                clinical: "ICS / LABA Combination Inhaler",
                                patientFriendly: "Combination Steroid & Bronchodilator Inhaler"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "Combines targeted airway anti-inflammatory therapy with long-acting bronchodilation in a single inhaler.",
                                patientFriendly: "Combines airway protection and lung relaxation in one easy-to-use inhaler."
                            },
                            safetyConsiderations: {
                                clinical: "Rinse and spit after each dose to prevent oral candidiasis.",
                                patientFriendly: "Rinse mouth thoroughly with water after each use."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                },
                {
                    targetDrug: "Albuterol MDI 2 puffs Q4H PRN",
                    reasonForSwitch: {
                        clinical: "Excessive short-acting beta-agonist reliance (used Q4H routinely) indicates uncontrolled underlying inflammation and drives tachycardia.",
                        patientFriendly: "Over-reliance on quick-relief rescue inhaler signals that daily baseline protection needs updating."
                    },
                    medicationsToAvoid: [
                        {
                            drugOrClass: "Overuse of Short-Acting Beta Agonists (SABA > 2 days/week)",
                            severity: "Moderate",
                            reasonToAvoid: {
                                clinical: "Indicates poor disease control and causes beta-receptor downregulation and cardiac palpitations.",
                                patientFriendly: "Using rescue inhaler frequently causes heart racing and means daily controller needs adjustment."
                            }
                        }
                    ],
                    primaryAlternatives: [
                        {
                            drugName: "Albuterol MDI 2 puffs Q4-6H PRN (Rescue Only)",
                            drugClass: {
                                clinical: "Short-Acting Beta Agonist (SABA) / Usage Reduction",
                                patientFriendly: "As-Needed Rescue Inhaler"
                            },
                            whyItIsTheBestAlternative: {
                                clinical: "With optimized background LAMA/LABA/ICS therapy, albuterol use should drop to occasional emergency rescue only.",
                                patientFriendly: "Optimizing your daily inhalers reduces how often you will need your rescue inhaler."
                            },
                            safetyConsiderations: {
                                clinical: "Track weekly canister usage; seek care if needing > 2 days/week.",
                                patientFriendly: "Keep track of how often you use your rescue inhaler."
                            }
                        }
                    ],
                    secondaryAlternatives: []
                }
            ]
        }
    }
];