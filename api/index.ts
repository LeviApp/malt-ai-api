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
function filterConflictingAvoidances(analysis: any): void {
    if (!analysis?.medicationsToAvoid?.length) return;

    // Explicitly type the accumulator array as string[]
    const recommendedClasses: string[] = [];
    
    const collectClasses = (alts: any[] | undefined): void => {
        if (!Array.isArray(alts)) return;
        for (const alt of alts) {
            const cls = alt?.drugClass?.clinical?.toLowerCase();
            if (cls && cls.length > 2) recommendedClasses.push(cls);
        }
    };

    collectClasses(analysis.primaryAlternatives);
    collectClasses(analysis.secondaryAlternatives);

    if (recommendedClasses.length === 0) return;

    // Filter avoidances with explicit parameter typing
    analysis.medicationsToAvoid = analysis.medicationsToAvoid.filter((avoid: any) => {
        const avoidTerm = avoid?.drugOrClass?.toLowerCase();
        if (!avoidTerm) return true;

        return !recommendedClasses.some((cls: string) => 
            avoidTerm === cls || (avoidTerm.length < cls.length && cls.includes(avoidTerm))
        );
    });
}

async function generateContentWithFallback(contents: any, config?: Record<string, any>): Promise<any> {
    const models = ['gemini-3.8-flash', 'gemini-3.5-flash-lite'];
    let lastError: unknown = null;

    const requestConfig = {
        maxOutputTokens: 8192,
        temperature: 0.1,
        ...config,
    };

    for (const modelName of models) {
        try {
            // Optional: Uncomment for local debugging, remove in high-perf production to cut I/O overhead
            // console.debug(`[Gemini API] Requesting ${modelName}...`);

            const response = await ai.models.generateContent({
                model: modelName,
                contents,
                config: requestConfig,
            });

            return response;
        } catch (error: any) {
            lastError = error;
            const status: number = error?.status || error?.code;
            const message: string = error?.message || String(error);

            // Fail fast on non-recoverable client/auth errors
            if (status === 401 || status === 403) {
                throw error;
            }

            const isTransient = status === 503 || status === 429 || status === 504 || message.includes('overloaded');
            
            if (!isTransient && status) {
                // If it's another hard API error (e.g., 400 Bad Request), falling back won't help either
                throw error;
            }

            console.warn(`[Gemini API] Model ${modelName} failed (status ${status || 'unknown'}). Falling back...`);
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
    - EXCEPTION: Skip if input provides a comprehensive medication regimen with a clinical case review.
    - If the input describes an active life-threatening emergency, acute physical trauma, uncontrolled bleeding, severe injury, or severe unexplained pain WITHOUT an existing home medication list:
        * Set 'isValidInput' = true, 'isEmergency' = true, 'isHighAcuity' = true.
        * Keep 'medicationAnalyses' = [].
        * Issue immediate emergency instructions in 'regimenInteractionNotes' ('clinical' and 'patientFriendly').
        * 'patientFriendly' Format: A single 2-to-3 sentence paragraph in simple 8th-grade language (no subheadings or asterisks). Sentence 1: Immediate action/stabilization. Sentence 2: Plain-language reason. Sentence 3: Safety warning.

2. POST-OPERATIVE & HIGH-RISK DIY SAFETY GUARD (CRITICAL HARD STOP):
    - EXCEPTION: Skip if input provides a comprehensive medication regimen for routine clinical review.
    - If the input describes a recent major surgery, acute trauma, unstable chronic condition, or high-risk clinical state (e.g., wisdom teeth extraction, dry socket, post-heart surgery, recent stroke, organ transplant, active bleeding) combined with a request for self-managed, over-the-counter, or DIY treatment:
        * Set 'safety_modal_trigger' = "POST_OP_HIGH_RISK", 'isValidInput' = true, 'isEmergency' = true, 'isHighAcuity' = false.
        * Keep 'medicationAnalyses' = []. Do NOT generate alternatives or dosing guidance.
        * Issue a calm, professional precautionary warning inside 'regimenInteractionNotes' ('clinical' and 'patientFriendly'), mandating immediate professional escalation (calling treating physician, specialist, or urgent care).

3. LOW-ACUITY FIRST AID GUARD:
    - EXCEPTION: Skip if input provides a comprehensive medication regimen for clinical review.
    - If the input describes a minor injury, shallow cut, scrape, stubbed toe, or minor strain WITHOUT a home medication list:        
        * Set 'isValidInput' = true, 'isEmergency' = true, 'isHighAcuity' = false.
        * Keep 'medicationAnalyses' = [].
        * Issue calm home care instructions in 'regimenInteractionNotes'.
        * 'patientFriendly' Format: A single 2-to-3 sentence paragraph (no asterisks). Sentence 1: Immediate self-care step. Sentence 2: Supportive recovery step. Sentence 3: Universal red-flag warning.

4. SCOPE AND CLINICAL STATEMENTS
   - Treat user allergies, medical history statements, or standalone drug mentions as valid clinical inputs. Acknowledge allergies and provide class-level alternative contexts.

5. INPUT VALIDATION & NON-MEDICAL DATA GUARD:
   - For standard medical cases, set 'isValidInput' = true, 'isEmergency' = false, 'isHighAcuity' = false.
   - Set 'isValidInput' = false ONLY for non-medical chit-chat, random gibberish, or non-health topics.
   - When 'isValidInput' is false, leave 'medicationAnalyses' = [] and provide:
     * 'clinical': "Input non-actionable. Please provide valid pharmacological, OTC, or clinical case data for analysis."
     * 'patientFriendly': "I can only analyze medical data, treatments, and clinical symptoms. Please enter a valid medication, treatment, or symptom to try again."

6. INPUT CONTEXT SUMMARY GENERATION:
   - Construct a mandatory 'inputSummary' object for every analysis request:
     * 'clinical': Dense 1-2 sentence medical recap using standard third-person clinical terminology (if provided).
     * 'patientFriendly': Warm, clear 1-2 sentence summary in direct second-person address ("you" / "your") at a 6th-8th grade reading level outlining review goals and target drugs.
   - Anti-Hallucination: Summarize ONLY explicitly provided inputs. Omit unstated demographics or background history entirely.

7. FOR VALID MEDICAL INPUTS (Set 'isValidInput' = true):
   - **Formulary & OTC Availability Transition EXCEPTION**: If an unavailable prescription switches to an exact OTC equivalent, treat that exact OTC active ingredient as the Primary Alternative.
   - Exhaustively evaluate all input medications against guidelines, labs, and allergies.
   - Create a Target Drug entry under 'medicationAnalyses' for medications requiring discontinuation/replacement due to safety, interactions, or user request, OR for single/sparse drug inputs to fulfill alternative discovery.
   - Format 'regimenInteractionNotes' as a dual-key object ('clinical' and 'patientFriendly').
   - For targeted drugs requiring replacement, include 'medicationsToAvoid', 'primaryAlternatives', and 'secondaryAlternatives' with dual explanations.
   - Treat OTC meds, herbs, and supplements as active target medications if they cause acute toxicity or severe interactions.
   - De-duplicate brand/generic name pairs into a single Target Drug analysis.
   - Reserve herbal/supplement options for 'secondaryAlternatives' rather than 'primaryAlternatives'.
   - 'reasonForSwitch': 'clinical' uses formal medical terminology; 'patientFriendly' uses plain 6th-grade English.
   - 'drugClass': 'clinical' uses formal medical classification; 'patientFriendly' uses simple 6th-grade descriptors.
   - Do NOT list a class in 'medicationsToAvoid' if you recommended a drug from that exact class.
   - Assign 'Contraindicated' (not 'Major') to any interaction posing an immediate severe safety hazard or worsening critical labs.
   - Patient-Facing Jargon Rule: Write in plain language (6th-8th grade level). Always state the everyday explanation first, followed by the clinical term in parentheses if medical context is necessary (e.g., "high blood potassium (hyperkalemia)"). Never output standalone unexplained jargon.

8. DEPRESCRIBING & NON-PHARMACOLOGIC GUIDANCE
   - **No Replacement Needed**: If a target drug should be stopped without adding a replacement, set "primaryAlternative.name" to "None (Deprescribing Only)".
   - **Explicit Rationale**: Clearly explain why stopping is sufficient in the "rationale" field.
   - **Strict Name Enforcement**: NEVER populate medication name fields with non-drug phrases, behavioral interventions, or environmental strategies.
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
        const medications = typeof req.body?.medications === 'string' ? req.body.medications.trim() : '';
        const allergies = typeof req.body?.allergies === 'string' ? req.body.allergies.trim() : '';
        const caseDetails = typeof req.body?.caseDetails === 'string' ? req.body.caseDetails.trim() : '';

        // Strict validation: Require at least one field to have content
        if (!medications && !allergies && !caseDetails) {
            return res.status(400).json({ 
                error: 'Please provide details in at least one field (Medications, Allergies, or Case Details) to run an analysis.' 
            });
        }

        const prompt = `Analyze the following patient scenario for drug-drug interactions and alternative options:
Medications: ${medications || 'None listed'}
Allergies: ${allergies || 'None listed'}
Case Details: ${caseDetails || 'None listed'}`;

        const response = await generateContentWithFallback(prompt, {
            systemInstruction: SYSTEM_INSTRUCTION,
            responseMimeType: 'application/json',
            responseSchema: analysisResponseSchema,
        });

        const responseText = response?.text?.trim();
        if (!responseText) {
            return res.status(502).json({ error: 'Model returned an empty response.' });
        }

        // Clean markdown block wrappers safely
        const cleanJson = responseText.replace(/^```(?:json)?\s*([\s\S]*?)\s*```$/i, '$1').trim();
        let data: any;
        
        try {
            data = JSON.parse(cleanJson);
        } catch (parseError) {
            console.error('[API Route] JSON Parse Failure. Raw text:', responseText);
            return res.status(502).json({ error: 'Model returned malformed JSON structure.' });
        }

        // Sanitize conflicting avoidances vs alternatives before returning
        if (data?.isValidInput && Array.isArray(data.medicationAnalyses)) {
            for (const analysis of data.medicationAnalyses) {
                filterConflictingAvoidances(analysis);
            }
        }

        return res.json(data);
    } catch (error: any) {
        console.error('API Handler Error:', error);
        return res.status(500).json({
            error: error?.message || 'Failed to generate clinical analysis.',
        });
    }
});

app.listen(PORT, () => {
    console.log(`Malt AI backend running on http://localhost:${PORT}`);
});