import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { buildSystemPrompt } from '@/lib/system-prompt'

export const maxDuration = 60

export async function POST(req: Request) {
  if (!process.env.OPENAI_API_KEY) {
    return new Response(
      JSON.stringify({ error: 'OPENAI_API_KEY not configured' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const { messages } = await req.json()

  const result = streamText({
    model: openai('gpt-4o-mini'),
    system: buildSystemPrompt(),
    messages,
  })

  return result.toDataStreamResponse()
}
