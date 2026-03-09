import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { buildSystemPrompt } from '@/lib/system-prompt'

export const maxDuration = 60

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const result = streamText({
      model: openai('gpt-4o-mini'),
      system: buildSystemPrompt(),
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
