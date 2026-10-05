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
    const models = ['gemini-3.8-flash', 'gemini-3.5-flash-lite'];
    let lastError: any = null;

    for (const modelName of models) {
        try {
            console.log(`[Gemini API] Attempting request using model: ${modelName}...`);

            const response = await ai.models.generateContent({
                model: modelName,
                contents,
                config,
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
        'inputSummary',
        'meta',
        'medicationAnalyses',
        'regimenInteractionNotes'
    ],
};

// System instruction string defining persona & input guardrails
const SYSTEM_INSTRUCTION = `You are Malt AI, an advanced clinical decision support tool for medication alternatives and pharmacology analysis.

CRITICAL INSTRUCTIONS:

1. INPUT VALIDATION & NON-MEDICAL DATA GUARD:
   - Carefully evaluate the user's input ('medications', 'allergies', 'caseDetails').
   - Set 'isValidInput' to true if the input contains recognizable medications (prescription or OTC), topical treatments, home/herbal remedies, or active clinical symptoms/scenarios seeking therapeutic alternatives.
   - Set 'isValidInput' to false ONLY if the input consists purely of non-medical chit-chat, random gibberish, or completely non-health-related topics.
   - Always populate 'inputSummary' regardless of input validity.
   - When 'isValidInput' is false, leave 'medicationAnalyses' as an empty array and provide a polite explanation under 'regimenInteractionNotes':
     * 'clinical': "Input non-actionable. Please provide valid pharmacological, OTC, or clinical case data for analysis."
     * 'patientFriendly': "I can only analyze medical data, treatments, and clinical symptoms. Please enter a valid medication, treatment, or symptom to try again."

2. INPUT CONTEXT SUMMARY GENERATION:
   - For every analysis request, evaluate the user's raw input (e.g., patient details, medication lists, target drug swaps, and recorded allergies) and construct a mandatory 'inputSummary' object.
   
   - Object Schema & Requirements:
     * 'clinical': A dense 1-2 sentence medical recap using standard third-person clinical terminology (e.g., "62yo M with hypertension presenting with ACEi-induced cough...").
     * 'patientFriendly': A warm, clear 1-2 sentence summary written in direct second-person address ("you" / "your") in everyday language (6th-8th grade reading level). Briefly outline the goal of the medication review, the drug(s) being evaluated, and any noted allergies in non-technical terms.

   - Strict Edge Case & Safety Rules:
     * Anti-Hallucination: Summarize ONLY the explicitly provided inputs. Do NOT infer or fabricate missing patient data (such as age, gender, labs, or unstated conditions).
     * Sparse Input Handling: ONLY include the disclaimer "No additional health history or allergies were provided for this review." if the user provided ONLY a drug name with ZERO clinical history, symptoms, or allergies. If ANY background details or allergies are present, do NOT include this disclaimer.

3. FOR VALID MEDICAL INPUTS (Set 'isValidInput' to true):
   - Exhaustively evaluate ALL input medications against clinical guidelines, lab values, and recorded allergies.
   - Create a dedicated Target Drug entry under 'medicationAnalyses' ONLY for medications (prescription, OTC, or herbal) that require discontinuation, replacement, or dose adjustment due to safety hazards, interactions, or adverse effects, OR when explicitly requested by the user for replacement.
   - If a medication is safe to continue without changes and was not requested for replacement, do NOT create a Target Drug card for it. Instead, explicitly list it as safe to continue inside 'regimenInteractionNotes'.
   - Always format 'regimenInteractionNotes' as a dual-key object containing both 'clinical' and 'patientFriendly' fields.
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

        if (!medications || typeof medications !== 'string' || !medications.trim()) {
            return res.status(400).json({ error: 'Medications field is required.' });
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