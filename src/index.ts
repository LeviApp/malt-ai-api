import express, { type Request, type Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenAI, Type, type Schema } from '@google/genai';

dotenv.config();

if (!process.env.GEMINI_API_KEY) {
  console.error("❌ ERROR: GEMINI_API_KEY is missing from environment variables.");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

interface PatientContextPayload {
  medications: string;
  allergies?: string;
  contextDetails?: string;
}

// Define Structured Output Schema for Clinical Response
const alternativeResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    suggestedAlternatives: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          drugName: { type: Type.STRING },
          drugClass: { type: Type.STRING },
          clinicalRationale: { type: Type.STRING },
          safetyConsiderations: { type: Type.STRING },
        },
        required: ['drugName', 'drugClass', 'clinicalRationale', 'safetyConsiderations'],
      },
    },
    primaryWarnings: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
    },
    monitoringParameters: {
      type: Type.STRING,
    },
  },
  required: ['suggestedAlternatives', 'primaryWarnings', 'monitoringParameters'],
};

// Landing endpoint
app.get('', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'malt-ai-api up and running!' });
});

// Healthcheck endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', service: 'malt-ai-api health check!' });
});

// Main Clinical Analysis Endpoint
app.post('/api/analyze', async (req: Request<{}, {}, PatientContextPayload>, res: Response) => {
  try {
    const { medications, allergies, contextDetails } = req.body;

    if (!medications || !medications.trim()) {
      return res.status(400).json({ error: 'Medications field is required.' });
    }

    const systemInstruction = `
      You are an expert clinical pharmacologist assisting healthcare providers. 
      Analyze the provided patient details (current medications, allergies, and clinical context) and evaluate potential medication alternatives.
      Provide evidence-based alternatives, flag potential cross-reactivities or contraindications, and provide key monitoring parameters.
      Always adhere strictly to the JSON schema requested.
    `;

    const userPrompt = `
      Patient Current Medications: ${medications}
      Known Allergies: ${allergies || 'None reported'}
      Case Details & Symptoms: ${contextDetails || 'None reported'}
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: alternativeResponseSchema,
        temperature: 0.2,
      },
    });

    if (!response.text) {
      throw new Error('No content returned from Gemini.');
    }

    const structuredData = JSON.parse(response.text);
    return res.json(structuredData);

  } catch (error: any) {
    console.error('Error analyzing medication alternatives:', error);
    return res.status(500).json({ 
      error: 'Failed to process clinical analysis.', 
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`⚡️ [malt-ai-api] Server running at http://localhost:${port}`);
});