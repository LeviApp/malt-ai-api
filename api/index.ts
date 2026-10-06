import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('FATAL ERROR: GEMINI_API_KEY is not defined in environment variables.');
    process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

// Helper to sanitize conflicting avoidances vs alternatives
function filterConflictingAvoidances(analysis: any) {
    if (!analysis) return;

    // Extract all recommended alternative class names (clinical & patient friendly)
    const recommendedClasses: string[] = [
        ...(analysis.primaryAlternatives || []),
        ...(analysis.secondaryAlternatives || []),
    ]
        .map(alt => alt.drugClass?.clinical?.toLowerCase())
        .filter((cls): cls is string => Boolean(cls && cls.length > 2));

    // Filter out any avoidances that conflict with recommended drug classes
    if (Array.isArray(analysis.medicationsToAvoid)) {
        analysis.medicationsToAvoid = analysis.medicationsToAvoid.filter((avoid: any) => {
            const avoidTerm = avoid.drugOrClass?.toLowerCase() || '';

            const hasConflict = recommendedClasses.some(cls => {
                if (!cls || !avoidTerm) return false;
                // Check direct substring matches or common class acronyms like ARB
                return avoidTerm.includes(cls) || cls.includes(avoidTerm);
            });

            return !hasConflict;
        });
    }
}

async function generateContentWithFallback(contents: any, config?: any) {
    // Active production models
    const models = ['gemini-3.8-flash', 'gemini-3.5-flash-lite'];
    let lastError: any = null;

    // Safely merge incoming config, prioritizing maxOutputTokens and temperature defaults
    const requestConfig = {
        ...(config || {}),
        maxOutputTokens: config?.maxOutputTokens ?? 8192,
        temperature: config?.temperature ?? 0.1,
    };

    for (const modelName of models) {
        try {
            console.log(`[Gemini API] Attempting request using model: ${modelName}...`);

            const response = await ai.models.generateContent({
                model: modelName,
                contents,
                config: requestConfig,
            });

            console.log(`[Gemini API] Success with model: ${modelName}`);
            return response;
        } catch (error: any) {
            lastError = error;
            const status = error?.status || error?.code;

            console.warn(`[Gemini API] Call to ${modelName} failed (status ${status}): ${error?.message || error}`);

            // Break early on Auth/Permission issues
            if (status === 401 || status === 403) {
                throw error;
            }

            // --- ADDED: Check for transient/overload capacity issues ---
            const isTransient = status === 503 || status === 429 || status === 504 || (error?.message && error.message.includes('overloaded'));
            if (isTransient) {
                console.warn(`[Gemini API] Transient capacity issue on ${modelName}, rolling over to fallback...`);
            }
            // -----------------------------------------------------------

            console.warn(`[Gemini API] Retrying with secondary fallback model...`);
        }
    }

    throw lastError || new Error('All model endpoints failed to process request.');
}

// Define strict Gemini Response Schema
const analysisResponseSchema = {
    type: Type.OBJECT,
    properties: {
        isValidInput: { type: Type.BOOLEAN },
        isEmergency: { 
            type: Type.BOOLEAN, 
            description: "True if the input triggered an emergency guard, first-aid guard, or safety warning that blocks the standard medication dashboard." 
        },
        isHighAcuity: { 
            type: Type.BOOLEAN, 
            description: "Set to true for major/life-threatening emergencies requiring 911. Set to false for minor emergencies, first aid, or standard clinical cases." 
        },
        inputSummary: {
            type: Type.OBJECT,
            properties: {
                clinical: { type: Type.STRING },
                patientFriendly: { type: Type.STRING },
            },
            required: ['clinical', 'patientFriendly'],
        },
        meta: {
            type: Type.OBJECT,
            properties: {
                timestamp: { type: Type.STRING },
                model: { type: Type.STRING },
            },
            required: ['timestamp', 'model'],
        },
        medicationAnalyses: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    targetDrug: { type: Type.STRING },
                    reasonForSwitch: {
                        type: Type.OBJECT,
                        properties: {
                            clinical: { type: Type.STRING },
                            patientFriendly: { type: Type.STRING },
                        },
                        required: ['clinical', 'patientFriendly'],
                    },
                    medicationsToAvoid: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                drugOrClass: { type: Type.STRING },
                                severity: { type: Type.STRING },
                                reasonToAvoid: {
                                    type: Type.OBJECT,
                                    properties: {
                                        clinical: { type: Type.STRING },
                                        patientFriendly: { type: Type.STRING },
                                    },
                                    required: ['clinical', 'patientFriendly'],
                                },
                            },
                            required: ['drugOrClass', 'severity', 'reasonToAvoid'],
                        },
                    },
                    primaryAlternatives: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                drugName: { type: Type.STRING },
                                drugClass: {
                                    type: Type.OBJECT,
                                    properties: {
                                        clinical: { type: Type.STRING },
                                        patientFriendly: { type: Type.STRING }
                                    },
                                    required: ['clinical', 'patientFriendly']
                                },
                                whyItIsTheBestAlternative: {
                                    type: Type.OBJECT,
                                    properties: {
                                        clinical: { type: Type.STRING },
                                        patientFriendly: { type: Type.STRING },
                                    },
                                    required: ['clinical', 'patientFriendly'],
                                },
                                safetyConsiderations: {
                                    type: Type.OBJECT,
                                    properties: {
                                        clinical: { type: Type.STRING },
                                        patientFriendly: { type: Type.STRING },
                                    },
                                    required: ['clinical', 'patientFriendly'],
                                },
                            },
                            required: [
                                'drugName',
                                'drugClass',
                                'whyItIsTheBestAlternative',
                                'safetyConsiderations',
                            ],
                        },
                    },
                    secondaryAlternatives: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                drugName: { type: Type.STRING },
                                drugClass: {
                                    type: Type.OBJECT,
                                    properties: {
                                        clinical: { type: Type.STRING },
                                        patientFriendly: { type: Type.STRING }
                                    },
                                    required: ['clinical', 'patientFriendly']
                                },
                                whyItIsTheBestAlternative: {
                                    type: Type.OBJECT,
                                    properties: {
                                        clinical: { type: Type.STRING },
                                        patientFriendly: { type: Type.STRING },
                                    },
                                    required: ['clinical', 'patientFriendly'],
                                },
                                safetyConsiderations: {
                                    type: Type.OBJECT,
                                    properties: {
                                        clinical: { type: Type.STRING },
                                        patientFriendly: { type: Type.STRING },
                                    },
                                    required: ['clinical', 'patientFriendly'],
                                },
                            },
                            required: [
                                'drugName',
                                'drugClass',
                                'whyItIsTheBestAlternative',
                                'safetyConsiderations',
                            ],
                        },
                    },
                },
                required: [
                    'targetDrug',
                    'medicationsToAvoid',
                    'primaryAlternatives',
                ],
            },
        },
        regimenInteractionNotes: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    clinical: { type: Type.STRING },
                    patientFriendly: { type: Type.STRING },
                },
                required: ['clinical', 'patientFriendly'],
            },
        },
    },
    required: [
        'isValidInput',
        'isEmergency',
        'isHighAcuity',
        'inputSummary',
        'meta',
        'medicationAnalyses',
        'regimenInteractionNotes'
    ],
};

// System instruction string defining persona & input guardrails
const SYSTEM_INSTRUCTION = `You are Malt AI, an advanced clinical decision support system designed for licensed medical professionals and healthcare providers. 
When analyzing clinical case summaries, third-person patient notes, or professional treatment failures:
A. Maintain clinical objectivity and do not mistake professional medical terminology (such as "poisoning", "toxicity", "trauma", or "overdose") for a direct consumer emergency unless the input indicates an active, unmanaged, unmonitored home emergency.
B. Provide actionable pharmacological guidance, specialist escalation pathways (e.g., Toxicology, Poison Control), and drug-switching strategies tailored to provider workflows.

CRITICAL INSTRUCTIONS:

1. CRITICAL EMERGENCY & ACUTE TRAUMA GUARD:
    - EXCEPTION / OVERRIDE: Do NOT trigger this emergency guard if the input provides a comprehensive medication regimen (or chart details) alongside a clinical case review or retrospective patient scenario. In such cases, skip this guard entirely, set 'isEmergency' to false, and proceed to the standard medication analysis.
    - If the input describes an active life-threatening emergency, acute physical trauma, uncontrolled bleeding, severe injury, or severe unexplained pain (e.g., "I just gashed my leg and it's bleeding", "baseball to the head", "chest pain", "shoulder popped out", "severe right side pain") WITHOUT specifying an existing home medication list to analyze:
        * Set 'isValidInput' to true.
        * Set 'isEmergency' to true.
        * Set 'isHighAcuity' to true.
        * Keep 'medicationAnalyses' as an EMPTY array [].
        * Issue immediate emergency/stabilization instructions inside 'regimenInteractionNotes' ('clinical' and 'patientFriendly').
        * MANDATORY FORMAT FOR 'patientFriendly':
                You MUST output a single, direct, 2-to-3 sentence paragraph in simple 8th-grade language without subheadings or markdown asterisks. 

                Structure:
                1. Sentence 1: Direct emergency action or stabilization step (e.g., applying firm direct pressure for heavy bleeding or seeking immediate emergency care).
                2. Sentence 2: Plain-language explanation of why urgent care is needed.
                3. Sentence 3: Plain-language warning or safety threshold.

2. POST-OPERATIVE & HIGH-RISK DIY SAFETY GUARD (CRITICAL HARD STOP):
    - EXCEPTION / OVERRIDE: Do NOT trigger this guard if the input provides a comprehensive medication regimen for routine clinical review.
    - If the input describes a recent major surgery, acute trauma, unstable chronic condition, or high-risk clinical state (e.g., wisdom teeth extraction, dry socket, post-heart surgery, recent stroke, organ transplant, active bleeding) combined with a request for self-managed, over-the-counter, or DIY treatment:
        * Set 'safety_modal_trigger' to "POST_OP_HIGH_RISK".
        * Set 'isValidInput' to true.
        * Set 'isEmergency' to true.
        * Set 'isHighAcuity' to false.
        * Keep 'medicationAnalyses' as an EMPTY array [].
        * Do NOT generate any medication alternatives or dosing guidance. 
        * Issue a calm, professional precautionary warning inside 'regimenInteractionNotes' ('clinical' and 'patientFriendly') mirroring the minor advisory posture, mandating immediate professional escalation (calling your treating physician, specialist, or visiting an urgent care clinic appropriate to the condition).                    
3. LOW-ACUITY FIRST AID GUARD:
    - EXCEPTION / OVERRIDE: Do NOT trigger this first-aid guard if the input provides a comprehensive medication regimen for clinical review or pharmacological analysis. In such cases, skip this guard and proceed to the standard medication analysis dashboard.
    - Universal High-Acuity & Post-Operative DIY Safety EXCEPTION (CRITICAL HARD STOP):
        * If the input describes a recent major surgery, acute trauma, unstable chronic condition, or high-risk clinical state (e.g., wisdom teeth extraction, dry socket, post-heart surgery, recent stroke, organ transplant, active bleeding) combined with a request for self-managed, over-the-counter, or DIY treatment:
        * MODAL TRIGGER: You MUST immediately set your output flag safety_modal_trigger to "POST_OP_HIGH_RISK" and completely omit the standard drug recommendation table.
        * REQUIRED RESPONSE FORMAT: Do not generate any medication alternatives or dosing guidance. Instead, your response must consist solely of an urgent clinical safety notice stating that self-treatment in this acute post-operative or high-risk state risks dangerous complications, masking critical symptoms, or interacting with hidden regimens, and mandating immediate professional escalation (calling your surgeon, dentist, or physician).
    - If the input describes a minor injury, shallow cut, paper cut, scrape, stubbed toe, or minor strain (e.g., "minor cut from a razor", "scraped my knee", "stubbed my toe") WITHOUT specifying an existing home medication list to analyze:        
        * Set 'isValidInput' to true.
        * Set 'isEmergency' to true.
        * Set 'isHighAcuity' to false.
        * Keep 'medicationAnalyses' as an EMPTY array [].
        * Issue calm, standard home care instructions inside 'regimenInteractionNotes' ('clinical' and 'patientFriendly').
        * MANDATORY FORMAT FOR 'patientFriendly' (Low-Acuity):
          You MUST output a single, direct, 2-to-3 sentence paragraph in simple 8th-grade language using a calm, reassuring tone (no subheadings or markdown asterisks), tailored directly to the specific type of minor injury reported.

        Structure:
          1. Sentence 1: Immediate self-care step appropriate to the injury (e.g., cleaning/bandaging for cuts; ice/rest for bruises or stubbed toes).
          2. Sentence 2: Supportive recovery step (e.g., keeping the area protected or elevated).
          3. Sentence 3: Universal red-flag warning (e.g., "Seek professional medical attention if pain or swelling worsens significantly, if you cannot bear weight, or if signs of infection appear.")

4. SCOPE AND CLINCICAL STATEMENTS
   - Treat user-provided allergies, medical history statements, or standalone drug mentions as valid clinical inputs. If a user states an allergy, acknowledge it and provide class-level alternative contexts rather than rejecting the input as non-medical.

5. INPUT VALIDATION & NON-MEDICAL DATA GUARD:
   - For standard medical cases, set 'isValidInput' to true, 'isEmergency' to false, and 'isHighAcuity' to false (unless a severe drug interaction explicitly triggers a critical safety alert).
   - Carefully evaluate the user's input ('medications', 'allergies', 'caseDetails').
   - Set 'isValidInput' to false ONLY if the input consists purely of non-medical chit-chat, random gibberish, or completely non-health-related topics (in which case 'isEmergency' and 'isHighAcuity' should be false).
   - Always populate 'inputSummary' regardless of input validity.
   - When 'isValidInput' is false, leave 'medicationAnalyses' as an empty array and provide a polite explanation under 'regimenInteractionNotes':
     * 'clinical': "Input non-actionable. Please provide valid pharmacological, OTC, or clinical case data for analysis."
     * 'patientFriendly': "I can only analyze medical data, treatments, and clinical symptoms. Please enter a valid medication, treatment, or symptom to try again."

6. INPUT CONTEXT SUMMARY GENERATION:
   - For every analysis request, evaluate the user's raw input (e.g., patient details, medication lists, target drug swaps, and recorded allergies) and construct a mandatory 'inputSummary' object.
   
   - Object Schema & Requirements:
     * 'clinical': A dense 1-2 sentence medical recap using standard third-person clinical terminology (e.g., "[Age]yo [Gender] with [Condition] presenting with [Symptoms]...", IF provided).
     * 'patientFriendly': A warm, clear 1-2 sentence summary written in direct second-person address ("you" / "your") in everyday language (6th-8th grade reading level). Briefly outline the goal of the medication review, the drug(s) being evaluated, and any noted allergies in non-technical terms.

   - Strict Edge Case & Safety Rules:
     * Anti-Hallucination: Summarize ONLY the explicitly provided inputs. Do NOT infer, assume, or fabricate missing patient data (such as age, gender, labs, or unstated conditions). If demographics or background history are omitted by the user, omit them entirely from the recap.

7. FOR VALID MEDICAL INPUTS (Set 'isValidInput' to true):
   - **Formulary & OTC Availability Transition EXCEPTION**: 
     * If the input indicates that a prescription medication is becoming unavailable or discontinued, and the physician has explicitly suggested switching to an over-the-counter (OTC) equivalent of that exact same medication (e.g., prescription omeprazole to OTC omeprazole), you MUST NOT recommend a different drug class or a separate prescription drug as the primary alternative. 
     * Instead, treat the OTC equivalent of the exact same active ingredient as the **Primary Alternative**, emphasizing that it provides identical therapeutic action, and use the rationale to confirm dosage alignment with the provider. Reserve secondary alternatives for alternative classes (like H2 blockers) only if requested or clinically indicated.
   - Exhaustively evaluate ALL input medications against clinical guidelines, lab values, and recorded allergies.
   - Create a dedicated Target Drug entry under 'medicationAnalyses' ONLY for medications (prescription, OTC, or herbal) that require discontinuation, replacement, or dose adjustment due to safety hazards, interactions, or adverse effects, OR when explicitly requested by the user for replacement.
   - For medications that are safe to continue without changes OR are entered as a single/sparse drug name with zero clinical context, DO create an entry under 'medicationAnalyses' (or a dedicated 'medicationOverview' / exploratory card) to fulfill the app's core alternative discovery function. Explicitly state that the drug is safe to continue, but provide standard class-level exploratory alternatives (e.g., for variety, formulation, or preference) along with dual explanations.   - Always format 'regimenInteractionNotes' as a dual-key object containing both 'clinical' and 'patientFriendly' fields.
   - For every targeted drug requiring a replacement, provide 'medicationsToAvoid', 'primaryAlternatives', and 'secondaryAlternatives'.
   - Include dual explanations ('clinical' and 'patientFriendly') for every rationale, contraindication, and safety note.
   - Only suggest alternatives that are clinically indicated or standard-of-care for the user's specific symptom or condition.
   - Treat over-the-counter (OTC) medications, self-prescribed herbs, and supplements as active target medications if they cause acute toxicity, severe drug interactions, or organ harm.
   - De-duplicate duplicate submissions (e.g., brand and generic names for the same drug) into a single Target Drug analysis. Explicitly flag combination products that contain overlapping active ingredients.
   - If the user requests a specific number of alternatives (e.g., 'give me 4 options') but fewer safe, clinically appropriate options exist, return only the viable options and explain why.
   - Reserve non-pharmacologic or herbal/supplement options (e.g., Peppermint Oil, Magnesium) for 'secondaryAlternatives' rather than 'primaryAlternatives'.
   - For 'reasonForSwitch':
     * 'clinical': Use formal medical terminology (e.g., "Absolute contraindication due to ACE-inhibitor-induced angioedema").
     * 'patientFriendly': Plain, 6th-grade English explaining WHY the drug needs to change without medical jargon (e.g., "You need to stop taking this drug because it caused severe allergic swelling in the past").
   - For 'drugClass':
     * 'clinical': Use formal medical classification (e.g., "Dihydropyridine Calcium Channel Blocker", "Non-opioid Analgesic / Antipyretic").
     * 'patientFriendly': Use simple, 6th-grade descriptors (e.g., "Blood Vessel Relaxing Blood Pressure Pill", "Non-habit-forming Pain & Fever Reliever").
   - Do NOT list a drug class or medication in 'medicationsToAvoid' if you have recommended a drug from that exact same class as a 'primaryAlternative' or 'secondaryAlternative'. If a drug class carries a relative caution (e.g., ARBs after ACEi angioedema), explain the caution inside the 'safetyConsiderations' field of the recommended alternative instead.
   - Assign 'Contraindicated' (not 'Major') to any medication, supplement, or interaction where administration poses an immediate, severe safety hazard or directly worsens an existing dangerous lab value (e.g., Potassium supplements when serum potassium is ≥5.0 mEq/L).
   - Patient-Facing Jargon Rule:
     * In ANY 'patientFriendly' field, write in plain, everyday language (6th-8th grade reading level).
     * If a specific medical term is necessary for medical context, state the everyday explanation first, followed by the clinical term in parentheses (e.g., "high blood potassium (hyperkalemia)", "ankle & leg swelling (peripheral edema)", "water pill (diuretic)").
     * NEVER output standalone, unexplained medical jargon in patient-facing fields without a preceding plain-English translation.

8. Deprescribing & Non-Pharmacologic Guidance
   - **No Replacement Needed**: If a target drug (such as an OTC herbal, non-essential supplement, or unsafe medication) should be stopped without adding a replacement drug, set "primaryAlternative.name" to "None (Deprescribing Only)".
   - **Explicit Rationale**: In the "rationale" field, clearly explain why stopping the medication is sufficient and why no replacement drug is required.
   - **Strict Name Enforcement**: NEVER populate medication name fields ("primaryAlternative.name" or "secondaryAlternative.name") with non-drug phrases, behavioral interventions, or environmental strategies (e.g., "Discontinuation", "Quiet Environment", or "Positioning").
   `;

// Root route
app.get('/', (req, res) => {
    return res.status(200).json({
        status: 'ok',
        message: 'Malt AI API is active'
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    return res.status(200).json({
        status: 'ok',
        message: "Malt AI API health check!",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        geminiConfigured: Boolean(apiKey && apiKey.trim() !== ''),
        environment: process.env.NODE_ENV || 'development'
    });
});

app.post('/api/analyze', async (req, res) => {
    try {
        const { medications, allergies, caseDetails } = req.body;

        if (!medications.trim() && !allergies.trim() && !caseDetails.trim()) {
            return res.status(400).json({ error: 'Please provide details in at least one field (Medications, Allergies, or Case Details) to run an analysis.' });
        }

        const prompt = `Analyze the following patient scenario for drug-drug interactions and alternative options:
Medications: ${medications.trim()}
Allergies: ${typeof allergies === 'string' && allergies.trim() ? allergies.trim() : 'None listed'}
Case Details: ${typeof caseDetails === 'string' && caseDetails.trim() ? caseDetails.trim() : 'None listed'}`;

        const response = await generateContentWithFallback(prompt, {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: analysisResponseSchema,
        });

        const responseText = response.text?.trim() ?? "";

        if (!responseText) {
            return res.status(502).json({ error: 'Model returned an empty response.' });
        }

        const cleanJson = responseText.replace(/^```(?:json)?\s*|\s*```$/g, '').trim();
        const data = JSON.parse(cleanJson);

        // Sanitize conflicting avoidances vs alternatives before returning
        if (data.isValidInput && Array.isArray(data.medicationAnalyses)) {
            data.medicationAnalyses.forEach((analysis: any) => {
                filterConflictingAvoidances(analysis);
            });
        }

        return res.json(data);
    } catch (error: any) {
        console.error('API Handler Error:', error);
        return res.status(500).json({
            error: error.message || 'Failed to generate clinical analysis.',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Malt AI backend running on http://localhost:${PORT}`);
});