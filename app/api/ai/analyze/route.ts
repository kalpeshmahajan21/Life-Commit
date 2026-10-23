import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { prompt, fileBase64, mimeType = 'image/png', fileType = 'image' } = await req.json();

    if (!fileBase64) {
      return NextResponse.json({ error: 'File data is required for analysis' }, { status: 400 });
    }

    const ai = getGeminiClient();
    const cleanBase64 = fileBase64.replace(/^data:[^;]+;base64,/, '');

    const defaultPrompt = fileType === 'video'
      ? (prompt || 'Analyze this focus session video. Identify the user focus level, interruptions, screen habits, and provide 3 key productivity takeaways.')
      : (prompt || 'Analyze this desk and work environment photo. Assess ergonomics, lighting, clutter index, and suggest 3 optimizations to protect focus and daily commit streaks.');

    const mediaPart = {
      inlineData: {
        data: cleanBase64,
        mimeType: mimeType || (fileType === 'video' ? 'video/mp4' : 'image/jpeg'),
      },
    };

    const textPart = {
      text: defaultPrompt,
    };

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-4-argon',
        contents: {
          parts: [mediaPart, textPart],
        },
      });

      return NextResponse.json({
        analysis: response.text || 'Analysis completed.',
        modelUsed: 'gemini-4-argon',
      });
    } catch (err: unknown) {
      console.warn('Fallback to gemini-3.8-flash for analysis:', err);
      const fallback = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: {
          parts: [mediaPart, textPart],
        },
      });

      return NextResponse.json({
        analysis: fallback.text || 'Analysis completed.',
        modelUsed: 'gemini-3.8-flash (Fallback)',
      });
    }
  } catch (error: unknown) {
    console.error('Analysis error:', error);
    const message = error instanceof Error ? error.message : 'Failed to analyze media';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
