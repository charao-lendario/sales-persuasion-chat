'use client'

import { useState, useRef } from 'react'
import { ChatContainer } from '@/components/chat/chat-container'
import { AgentSidebar } from '@/components/sidebar/agent-sidebar'
import { Menu } from 'lucide-react'

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const resetRef = useRef<(() => void) | null>(null)

  const handleNewConversation = () => {
    resetRef.current?.()
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen bg-surface-950">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-30 w-72 transform transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <AgentSidebar onClose={() => setSidebarOpen(false)} onNewConversation={handleNewConversation} />
      </aside>

      {/* Main content */}
      <main className="flex flex-1 flex-col min-w-0">
        {/* Mobile header */}
        <div className="flex items-center gap-3 border-b border-surface-800 px-4 py-3 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-surface-400 hover:text-surface-200 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="text-sm font-semibold text-gold-400 tracking-wide uppercase">
            Sales Persuasion Squad
          </h1>
        </div>

        <ChatContainer resetRef={resetRef} />
      </main>
    </div>
  )
}
