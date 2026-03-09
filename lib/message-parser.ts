import { type Agent, AGENTS } from '@/lib/agents'

export interface MessageSegment {
  agentId: string
  agent: Agent
  content: string
}

const AGENT_MAP: Record<string, string> = {
  HARVEY: 'harvey-specter',
  CARNEGIE: 'carnegie',
  MILTON: 'milton',
  VOSS: 'voss',
}

export function parseAgentMessage(raw: string): MessageSegment[] {
  const segments: MessageSegment[] = []
  const regex = /<<(HARVEY|CARNEGIE|MILTON|VOSS)>>([\s\S]*?)<<\/\1>>/g
  let match: RegExpExecArray | null

  while ((match = regex.exec(raw)) !== null) {
    const tag = match[1]
    const content = match[2].trim()
    if (!content) continue

    const agentId = AGENT_MAP[tag]
    const agent = AGENTS.find((a) => a.id === agentId)
    if (agent) {
      segments.push({ agentId, agent, content })
    }
  }

  // If no markers found, treat entire message as Harvey
  if (segments.length === 0 && raw.trim()) {
    const harvey = AGENTS[0]
    segments.push({ agentId: 'harvey-specter', agent: harvey, content: raw.trim() })
  }

  return segments
}
