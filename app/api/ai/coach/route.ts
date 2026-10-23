import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';
import { ThinkingLevel } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { prompt, mode = 'quick', currentHabits } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const ai = getGeminiClient();

    const systemPrompt = `You are LifeCommit AI — an elite productivity, chronobiology, and commit habit architect.
Your philosophy:
- "Build your day. See your progress. Keep going."
- Help users protect deep work, schedule tasks realistically, minimize context switching, and maintain long-term streaks without burnout.
- Provide crisp, direct, highly actionable advice. Format key suggestions with bullet points and bold actions.
- If suggesting a revised schedule, provide time slots (e.g. 09:00 - 11:00 Study DSA, 11:30 - 13:00 Core Work, 17:00 - 18:00 Workout, 21:00 Reflection).
Context habits if provided: ${JSON.stringify(currentHabits || [])}`;

    if (mode === 'deep_thinking') {
      // High thinking model: gemini-4-argon with ThinkingLevel.HIGH
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-4-argon',
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
            thinkingConfig: {
              thinkingLevel: ThinkingLevel.HIGH,
            },
          },
        });
        return NextResponse.json({
          text: response.text || 'Schedule optimized successfully.',
          modelUsed: 'gemini-4-argon (High Thinking)',
        });
      } catch (err: unknown) {
        console.warn('Fallback to gemini-3.8-flash for deep thinking:', err);
        const fallback = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
          },
        });
        return NextResponse.json({
          text: fallback.text || 'Schedule optimized successfully.',
          modelUsed: 'gemini-3.8-flash (Fallback)',
        });
      }
    } else {
      // Low-latency mode: gemini-3.1-flash-lite
      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.1-flash-lite',
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
          },
        });
        return NextResponse.json({
          text: response.text || 'Schedule adjusted.',
          modelUsed: 'gemini-3.1-flash-lite (Ultra Low Latency)',
        });
      } catch (err: unknown) {
        console.warn('Fallback to gemini-3.8-flash for low-latency:', err);
        const fallback = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: systemPrompt,
          },
        });
        return NextResponse.json({
          text: fallback.text || 'Schedule adjusted.',
          modelUsed: 'gemini-3.8-flash (Fallback)',
        });
      }
    }
  } catch (error: unknown) {
    console.error('AI Coach Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate schedule suggestion';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
