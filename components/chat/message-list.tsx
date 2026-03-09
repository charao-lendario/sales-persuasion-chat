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
            <Avatar
              src={agent.avatar}
              alt={agent.name}
              size="lg"
              borderColor={agent.color}
            />
            <h2 className="mt-4 text-lg font-semibold text-gold-400">
              Harvey Specter
            </h2>
            <p className="mt-1 text-sm text-surface-400">
              Lead Orchestrator & Closer
            </p>
            <p className="mt-4 max-w-md text-sm text-surface-500 italic">
              &ldquo;I don&apos;t play the odds, I play the man.&rdquo;
            </p>
            <p className="mt-6 text-sm text-surface-400">
              Me conta o cenario. Reuniao, negociacao, pitch — tanto faz.
              <br />
              Eu e meu time vamos montar a estrategia.
            </p>
          </div>
        )}

        {messages
          .filter((m) => m.role === 'user' || m.role === 'assistant')
          .map((message) => (
            <MessageBubble
              key={message.id}
              role={message.role as 'user' | 'assistant'}
              content={message.content}
            />
          ))}

        {isLoading && messages[messages.length - 1]?.role === 'user' && (
          <div className="flex gap-3">
            <Avatar
              src={agent.avatar}
              alt={agent.name}
              size="sm"
              borderColor={agent.color}
            />
            <div className="rounded-2xl rounded-tl-sm bg-surface-800 px-4 py-3">
              <span className="mb-1 block text-[11px] font-semibold text-gold-400">
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
