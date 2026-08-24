import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { answers, primaryMizaj, language } = await req.json();

    const systemInstruction = `
You are the Chief Diagnostic Hakeem at "Tameer-e-Sehat" Dawakhana Karachi. 
You specialize in evaluating body temperament (Mizaj) based on classical Unani Tibb and prescribing holistic lifestyle (Asbab-e-Sittah Zarooriyah), seasonal regimen, customized diet chart, and authentic herbal botanicals.
`;

    const promptText = `
User Mizaj Assessment Results:
Dominant Temperament Identified: ${primaryMizaj}
User Answers to Diagnostic Questions: ${JSON.stringify(answers)}
Response Language: ${language === 'ur' ? 'Urdu' : 'English'}

Generate a personalized, comprehensive, beautifully structured Temperament & Wellness Report containing:
1. Deep Insight into their Mizaj (${primaryMizaj}) and what it means for their digestion, energy, and susceptibility.
2. 7-Day Ideal Dietary Guide (Morning, Lunch, Dinner, Drinks) tailored to balance their humors.
3. Top 3 Tameer-e-Sehat herbal remedies recommended for their specific type (e.g. Arq Kasni, Himalayan Salajeet, Gond Katira, Asgandh, Kashmiri Zafran, Ispaghol).
4. Daily Wellness Rituals (sleep timing, physical activity, water intake, breathing).
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.5,
      }
    });

    return NextResponse.json({ 
      report: response.text,
      status: 'success'
    });
  } catch (error: any) {
    console.error('Error in Mizaj analysis API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate Mizaj analysis. Please try again or chat directly with our Hakeem on WhatsApp.',
        fallback: true
      }, 
      { status: 500 }
    );
  }
}
