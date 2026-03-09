'use client'

import { useEffect, useRef } from 'react'
import type { Message } from 'ai'
import { MessageBubble } from '@/components/chat/message-bubble'
import { TypingIndicator } from '@/components/chat/typing-indicator'
import { Avatar } from '@/components/ui/avatar'
import { getOrchestratorAgent } from '@/lib/agents'

interface MessageListProps {
  messages: Message[]
  isLoading: boolean
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)
  const agent = getOrchestratorAgent()

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            {/* Hero avatar with glow */}
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gold-500/20 blur-2xl animate-pulse" />
              <div className="relative">
                <Avatar
                  src={agent.avatar}
                  alt={agent.name}
                  size="lg"
                  borderColor={agent.color}
                />
              </div>
            </div>
            <h2 className="mt-6 text-xl font-bold text-gold-400 tracking-wide">
              Harvey Specter
            </h2>
            <p className="mt-1 text-sm text-surface-400">
              Lead Orchestrator & Closer
            </p>
            <p className="mt-4 max-w-md text-sm text-surface-500 italic">
              &ldquo;I don&apos;t play the odds, I play the man.&rdquo;
            </p>
            <div className="mt-8 flex items-center gap-3">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-surface-700 to-transparent" />
              <span className="text-[10px] text-surface-600 uppercase tracking-widest">Squad ativa</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-surface-700 to-transparent" />
            </div>
            <p className="mt-4 text-sm text-surface-400">
              Me conta o cenario. Reuniao, negociacao, pitch — tanto faz.
              <br />
              Eu e meu time vamos montar a estrategia.
            </p>
          </div>
        )}

        {messages
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .map((message, idx) => (
            <MessageBubble
              key={message.id}
              role={message.role as 'user' | 'assistant'}
              content={message.content}
              isStreaming={isLoading && idx === messages.length - 1 && message.role === 'assistant'}
            />
          ))}

        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex gap-3">
            <div className="relative shrink-0">
              <div className="absolute -inset-1 rounded-full bg-gold-500/30 blur-md animate-pulse" />
              <div className="relative">
                <Avatar
                  src={agent.avatar}
                  alt={agent.name}
                  size="md"
                  borderColor={agent.color}
                />
              </div>
            </div>
            <div className="rounded-2xl rounded-tl-sm bg-surface-800 border border-surface-700/50 px-4 py-3" style={{ borderLeftColor: agent.color, borderLeftWidth: '3px' }}>
              <span className="mb-1 block text-xs font-bold tracking-wide uppercase text-gold-400">
                {agent.name}
              </span>
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  )
}
