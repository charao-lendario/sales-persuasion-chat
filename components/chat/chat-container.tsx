'use client'

import { useChat } from '@ai-sdk/react'
import { MessageList } from '@/components/chat/message-list'
import { ChatInput } from '@/components/chat/chat-input'

export function ChatContainer() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: '/api/chat',
  })

  return (
    <div className="flex flex-1 flex-col min-h-0">
      <MessageList messages={messages} isLoading={isLoading} />
      {error && (
        <div className="mx-auto max-w-3xl px-4 py-2">
          <div className="rounded-lg bg-red-900/30 border border-red-800/50 px-4 py-3 text-sm text-red-300">
            Erro: {error.message || 'Falha ao conectar com a API. Verifique a chave OpenAI.'}
          </div>
        </div>
      )}
      <ChatInput
        input={input}
        isLoading={isLoading}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
