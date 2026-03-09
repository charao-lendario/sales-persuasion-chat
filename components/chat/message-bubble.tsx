import { User } from 'lucide-react'
import { parseAgentMessage } from '@/lib/message-parser'
import { AgentSegment } from '@/components/chat/agent-segment'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
  isStreaming?: boolean
}

export function MessageBubble({ role, content, isStreaming = false }: MessageBubbleProps) {
  const isUser = role === 'user'

  if (isUser) {
    return (
      <div className="flex gap-3 flex-row-reverse">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-surface-600 bg-surface-800">
          <User className="h-4 w-4 text-surface-400" />
        </div>
        <div className="max-w-[80%] rounded-2xl rounded-tr-sm bg-gold-800/30 text-gold-100 px-4 py-3 text-sm leading-relaxed">
          <div className="whitespace-pre-wrap">{content}</div>
        </div>
      </div>
    )
  }

  // Parse assistant message into agent segments
  const segments = parseAgentMessage(content)

  return (
    <div className="space-y-4">
      {segments.map((segment, i) => (
        <AgentSegment
          key={`${segment.agentId}-${i}`}
          segment={segment}
          index={i}
          isStreaming={isStreaming}
        />
      ))}
    </div>
  )
}
