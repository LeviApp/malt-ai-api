import express from 'express';
import cors from 'cors';
import { GoogleGenAI, Type } from '@google/genai';

const app = express();
app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY ?? '' });

// Define strict Gemini Response Schema
const analysisResponseSchema = {
    type: Type.OBJECT,
    properties: {
        isValidInput: { type: Type.BOOLEAN },
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
                    reasonForSwitch: { type: Type.STRING }, // 👈 Added explicit property
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
                                drugClass: { type: Type.STRING },
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
                                drugClass: { type: Type.STRING },
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
    required: ['isValidInput', 'meta', 'medicationAnalyses', 'regimenInteractionNotes'],
};

app.post('/api/analyze', async (req, res) => {
    try {
        const { medications, allergies, caseDetails } = req.body;

        // Guard against missing, empty, or whitespace-only inputs
        if (!medications || typeof medications !== 'string' || medications.trim().length < 2) {
            return res.status(400).json({
                error: 'Invalid input: At least one medication name is required.',
            });
        }

        const systemInstruction = `You are Malt AI, an advanced clinical decision support tool for medication alternatives and pharmacology analysis.

CRITICAL INSTRUCTIONS:
1. INPUT VALIDATION & NON-MEDICAL DATA GUARD:
   - Carefully evaluate the user's input ('medications', 'allergies', 'caseDetails').
   - If the input consists of conversational chit-chat, random gibberish, non-medical topics, or does not contain recognizable medications or clinical scenarios, set 'isValidInput' to false.
   - When 'isValidInput' is false, leave 'medicationAnalyses' as an empty array and provide a polite, dual-language explanation under 'regimenInteractionNotes':
     * 'clinical': "Input non-actionable. Please provide valid pharmacological or clinical case data for analysis."
     * 'patientFriendly': "I can only analyze medical data and medication regimens. Please enter valid medications to try again."

2. FOR VALID MEDICAL INPUTS (Set 'isValidInput' to true):
   - Parse 'medications' into individual target drugs and create a block under 'medicationAnalyses' for EACH listed drug.
   - For each target drug, provide 'medicationsToAvoid', 'primaryAlternatives', and 'secondaryAlternatives'.
   - Include dual explanations ('clinical' and 'patientFriendly') for every rationale, contraindication, and safety note.
   - Provide overall drug-drug interaction notes for the combined regimen under 'regimenInteractionNotes'.`;

        // 🛡️️ Safe string normalization (handles null or undefined cleanly)
        const cleanMeds = typeof medications === 'string' ? medications.trim() : '';
        const cleanAllergies = typeof allergies === 'string' && allergies.trim() ? allergies.trim() : 'None provided';
        const cleanDetails = typeof caseDetails === 'string' && caseDetails.trim() ? caseDetails.trim() : 'None provided';

        const userPrompt = `Patient Case Input:
    - Medications: ${cleanMeds}
    - Allergies/Sensitivities: ${cleanAllergies}
    - Clinical Context Details: ${cleanDetails}`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: userPrompt,
            config: {
                systemInstruction,
                responseMimeType: 'application/json',
                responseSchema: analysisResponseSchema,
            },
        });

        const rawText = response.text ?? '{}';
        let parsedData;

        // 🛡️ Safe JSON parse guard
        try {
            parsedData = JSON.parse(rawText);
        } catch (parseError) {
            console.error('Failed to parse Gemini response:', rawText);
            return res.status(502).json({ error: 'Received malformed JSON from AI engine.' });
        }

        // 🛡️ Reject off-topic / non-medical inputs cleanly
        if (parsedData.isValidInput === false) {
            const userMsg = parsedData.regimenInteractionNotes?.[0]?.patientFriendly 
                ?? 'I can only analyze medical data and medication regimens. Please try again.';
            return res.status(400).json({ error: userMsg });
        }

        // Ensure timestamp is populated
        if (!parsedData.meta?.timestamp) {
            parsedData.meta = {
                timestamp: new Date().toISOString(),
                model: 'gemini-2.5-flash',
            };
        }

        return res.json(parsedData);
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Failed to process clinical analysis.' });
    }
});

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Malt AI backend running on http://localhost:${PORT}`);
});