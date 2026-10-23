import { NextRequest, NextResponse } from 'next/server';
import { getGeminiClient } from '@/lib/gemini';
import { GenerateVideosOperation } from '@google/genai';

export async function POST(req: NextRequest) {
  try {
    const { action = 'start', prompt, imageBase64, mimeType = 'image/png', aspectRatio = '16:9', operationName } = await req.json();
    const ai = getGeminiClient();

    if (action === 'start') {
      const cleanPrompt = prompt || 'Cinematic zoom out and subtle ambient motion of this productivity space, serene lighting';
      const safeRatio = (aspectRatio === '9:16' ? '9:16' : '16:9');

      let videoPayload: any = {
        model: 'veo-3.1-fast-generate-preview',
        prompt: cleanPrompt,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: safeRatio,
        },
      };

      if (imageBase64) {
        const rawBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');
        videoPayload.image = {
          imageBytes: rawBase64,
          mimeType,
        };
      }

      const operation = await ai.models.generateVideos(videoPayload);

      return NextResponse.json({
        operationName: operation.name,
        status: 'started',
      });
    }

    if (action === 'poll') {
      if (!operationName) {
        return NextResponse.json({ error: 'operationName is required' }, { status: 400 });
      }

      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });

      const downloadUri = updated.response?.generatedVideos?.[0]?.video?.uri;

      return NextResponse.json({
        done: Boolean(updated.done),
        videoUri: downloadUri || null,
        error: (updated as any).error || null,
      });
    }

    if (action === 'download') {
      if (!operationName) {
        return NextResponse.json({ error: 'operationName is required' }, { status: 400 });
      }

      const op = new GenerateVideosOperation();
      op.name = operationName;
      const updated = await ai.operations.getVideosOperation({ operation: op });
      const uri = updated.response?.generatedVideos?.[0]?.video?.uri;

      if (!uri) {
        return NextResponse.json({ error: 'Video URI not available yet' }, { status: 400 });
      }

      const apiKey = process.env.GEMINI_API_KEY || '';
      const videoRes = await fetch(uri, {
        headers: {
          'x-goog-api-key': apiKey,
        },
      });

      const videoBuffer = await videoRes.arrayBuffer();
      return new NextResponse(videoBuffer, {
        headers: {
          'Content-Type': 'video/mp4',
        },
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: unknown) {
    console.error('Veo video error:', error);
    const message = error instanceof Error ? error.message : 'Video generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
