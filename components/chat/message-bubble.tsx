import { Avatar } from '@/components/ui/avatar'
import { getOrchestratorAgent } from '@/lib/agents'
import { User } from 'lucide-react'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
}

export function MessageBubble({ role, content }: MessageBubbleProps) {
  const isUser = role === 'user'
  const agent = getOrchestratorAgent()

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      {/* Avatar */}
      {isUser ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-surface-600 bg-surface-800">
          <User className="h-4 w-4 text-surface-400" />
        </div>
      ) : (
        <Avatar
          src={agent.avatar}
          alt={agent.name}
          size="sm"
          borderColor={agent.color}
        />
      )}

      {/* Bubble */}
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed
          ${isUser
            ? 'bg-gold-800/30 text-gold-100 rounded-tr-sm'
            : 'bg-surface-800 text-surface-200 rounded-tl-sm'
          }
        `}
      >
        {!isUser && (
          <span className="mb-1 block text-[11px] font-semibold text-gold-400">
            {agent.name}
          </span>
        )}
        <div className="whitespace-pre-wrap">{content}</div>
      </div>
    </div>
  )
}
