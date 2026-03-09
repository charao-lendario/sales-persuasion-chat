import { AGENTS } from '@/lib/agents'
import { AgentCard } from '@/components/sidebar/agent-card'
import { X } from 'lucide-react'

interface AgentSidebarProps {
  onClose: () => void
}

export function AgentSidebar({ onClose }: AgentSidebarProps) {
  const orchestrator = AGENTS[0]
  const specialists = AGENTS.slice(1)

  return (
    <div className="flex h-full flex-col border-r border-surface-800 bg-surface-900">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-surface-800 px-5 py-4">
        <div>
          <h1 className="text-sm font-bold tracking-widest text-gold-400 uppercase">
            Sales Persuasion
          </h1>
          <p className="mt-0.5 text-[11px] text-surface-500">Squad de Vendas</p>
        </div>
        <button
          onClick={onClose}
          className="text-surface-500 hover:text-surface-300 transition-colors lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Orchestrator */}
      <div className="px-3 pt-4 pb-2">
        <AgentCard agent={orchestrator} isOrchestrator />
      </div>

      {/* Divider */}
      <div className="mx-5 my-2 border-t border-surface-800" />

      {/* Specialists */}
      <div className="px-3 pb-2">
        <p className="mb-2 px-3 text-[10px] font-semibold tracking-widest text-surface-500 uppercase">
          Especialistas
        </p>
        <div className="space-y-1">
          {specialists.map((agent) => (
            <AgentCard key={agent.id} agent={agent} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto border-t border-surface-800 px-5 py-3">
        <p className="text-[10px] text-surface-600 text-center">
          Powered by Harvey Specter & Team
        </p>
      </div>
    </div>
  )
}
