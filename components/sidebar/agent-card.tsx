import type { Agent } from '@/lib/agents'
import { Avatar } from '@/components/ui/avatar'

interface AgentCardProps {
  agent: Agent
  isOrchestrator?: boolean
}

export function AgentCard({ agent, isOrchestrator = false }: AgentCardProps) {
  return (
    <div
      className={`
        flex items-center gap-3 rounded-lg px-3 py-3 transition-colors
        ${isOrchestrator
          ? 'bg-gold-900/30 border border-gold-800/40'
          : 'hover:bg-surface-800/60'
        }
      `}
    >
      <Avatar
        src={agent.avatar}
        alt={agent.name}
        size={isOrchestrator ? 'lg' : 'md'}
        borderColor={agent.color}
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`font-medium truncate ${isOrchestrator ? 'text-gold-300 text-base' : 'text-surface-200 text-sm'}`}
          >
            {agent.name}
          </span>
          {isOrchestrator && (
            <span className="shrink-0 inline-flex items-center rounded-full bg-gold-800/40 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-gold-400 uppercase">
              Lead
            </span>
          )}
        </div>
        <p className="text-xs text-surface-400 truncate">{agent.role}</p>
        {!isOrchestrator && (
          <p className="mt-0.5 text-[11px] text-surface-500 truncate">
            {agent.shortDescription}
          </p>
        )}
      </div>
    </div>
  )
}
