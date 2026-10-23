import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';

export async function POST(req: NextRequest) {
  try {
    const { prompt, aspectRatio = '1:1', imageBase64, mimeType = 'image/png' } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const ai = getGeminiClient();

    // Valid aspect ratios supported
    const supportedAspectRatios = ['1:1', '3:4', '4:3', '9:16', '16:9', '2:3', '3:2', '21:9'];
    let safeRatio = supportedAspectRatios.includes(aspectRatio) ? aspectRatio : '1:1';
    // If nano banana accepts standard or mapped ratios:
    if (safeRatio === '21:9') safeRatio = '16:9'; // fallback mapping if needed

    if (imageBase64) {
      // Image editing mode
      const rawBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, '');
      const response = await ai.models.generateContent({
        model: 'gemini-nano-banana-2.1',
        contents: {
          parts: [
            {
              inlineData: {
                data: rawBase64,
                mimeType,
              },
            },
            {
              text: prompt,
            },
          ],
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData?.data) {
          return NextResponse.json({
            imageUrl: `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`,
            modelUsed: 'gemini-nano-banana-2.1',
          });
        }
      }

      return NextResponse.json({
        text: response.text || 'Image processed.',
        modelUsed: 'gemini-nano-banana-2.1',
      });
    } else {
      // Image generation mode
      const response = await ai.models.generateContent({
        model: 'gemini-nano-banana-2.1',
        contents: {
          parts: [{ text: prompt }],
        },
        config: {
          imageConfig: {
            aspectRatio: safeRatio as any,
            imageSize: '1K',
          },
        },
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData?.data) {
          return NextResponse.json({
            imageUrl: `data:${part.inlineData.mimeType || 'image/png'};base64,${part.inlineData.data}`,
            modelUsed: 'gemini-nano-banana-2.1',
          });
        }
      }

      return NextResponse.json({
        text: response.text || 'Image generated.',
        modelUsed: 'gemini-nano-banana-2.1',
      });
    }
  } catch (error: unknown) {
    console.error('AI Image Error:', error);
    const message = error instanceof Error ? error.message : 'Failed to generate or edit image';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
