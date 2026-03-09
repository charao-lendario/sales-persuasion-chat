import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'
import { buildSystemPrompt } from '@/lib/system-prompt'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = streamText({
    model: openai('gpt-5-mini'),
    system: buildSystemPrompt(),
    messages,
  })

  return result.toDataStreamResponse()
}
