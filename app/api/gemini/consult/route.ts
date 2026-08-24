import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { query, language, userContext } = await req.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    const systemInstruction = `
You are the Senior Tibbi Advisor & Virtual Hakeem at "Tameer-e-Sehat" (a premier Pakistani Unani Dawakhana & Herbal Store established in Karachi since 1990).
Your goal is to provide authentic, respectful, medically sound, and compassionate natural wellness advice rooted in Unani Tibb (Tibb-e-Unani & Tibb-e-Nabawi) while adhering to modern health safety standards.

Key Knowledge & Guidelines:
1. Always be polite, warm, and professional. You can speak in ${language === 'ur' ? 'Urdu (using authentic respectful Urdu)' : 'English with Unani terms'}.
2. Recommend natural remedies, dietary modifications (Parhez/Ghiza), herbal teas, and authentic herbs available at Tameer-e-Sehat (e.g., Pure Himalayan Salajeet, Tahiri Marham, Arq Kasni, Asgandh Nagori, Gond Katira, Safoof-e-Mughaliz, Kashmiri Zafran, Ispaghol Husk, Amla, Kalonji).
3. If the user mentions serious symptoms (e.g., severe chest pain, extreme sudden breathlessness, acute emergency), immediately advise consulting an emergency allopathic hospital.
4. Provide practical dosages, preparation methods (e.g., soaked overnight, boiled with fennel, taken with warm milk), and temperament (Mizaj) considerations.
5. Emphasize Tameer-e-Sehat's core values: 100% pure organic herbs, no steroids, established 1990 in Karachi, direct Hakeem consultations on WhatsApp (+92 318 2311310).
6. Format your response cleanly with markdown headers, bullet points, and practical steps.
`;

    const promptText = `
User Query: "${query}"
Language Preferred: ${language === 'ur' ? 'Urdu' : 'English'}
User Details (if provided): ${JSON.stringify(userContext || {})}

Please provide a structured, practical, and empathetic Tibbi response including:
1. Understanding the Root Cause according to Unani principles (Mizaj & Humors - Dam, Balgham, Safra, Sawda)
2. Recommended Pure Herbal Remedies & Tameer-e-Sehat recommendations
3. Dietary Rules & Parhez (What to eat vs. what to avoid)
4. Lifestyle & Routine Advice (Tibb-e-Nabawi principles)
5. Disclaimer reminding the user of personal Hakeem consultation for complex cases.
`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: promptText,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.6,
      }
    });

    return NextResponse.json({ 
      text: response.text || 'Thank you for reaching out to Tameer-e-Sehat. Please contact our senior Hakeem on WhatsApp for direct guidance.',
      status: 'success'
    });
  } catch (error: any) {
    console.error('Error in AI Hakeem consultation API:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate consultation response. Please connect directly with our Hakeem on WhatsApp +92 318 2311310.',
        fallback: true
      }, 
      { status: 500 }
    );
  }
}
