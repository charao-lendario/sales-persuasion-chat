'use client'

import { type FormEvent, useRef, useEffect } from 'react'
import { SendHorizonal } from 'lucide-react'

interface ChatInputProps {
  input: string
  isLoading: boolean
  onInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}

export function ChatInput({ input, isLoading, onInputChange, onSubmit }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`
    }
  }, [input])

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const form = e.currentTarget.form
      if (form && input.trim() && !isLoading) {
        form.requestSubmit()
      }
    }
  }

  return (
    <div className="border-t border-surface-800 bg-surface-900/80 backdrop-blur-sm px-4 py-3 md:px-8">
      <form
        onSubmit={onSubmit}
        className="mx-auto flex max-w-3xl items-end gap-3"
      >
        <div className="flex-1 rounded-xl border border-surface-700 bg-surface-800 px-4 py-3 focus-within:border-gold-700 transition-colors">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={onInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Descreva o cenario da sua negociacao..."
            rows={1}
            className="w-full resize-none bg-transparent text-sm text-surface-200 placeholder-surface-500 outline-none"
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-700 text-surface-950 transition-all hover:bg-gold-600 disabled:opacity-30 disabled:hover:bg-gold-700"
        >
          <SendHorizonal className="h-4 w-4" />
        </button>
      </form>
      <p className="mx-auto mt-2 max-w-3xl text-center text-[10px] text-surface-600">
        Harvey Specter coordena Carnegie, Milton e Voss para montar sua estrategia.
      </p>
    </div>
  )
}
