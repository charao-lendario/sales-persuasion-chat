'use client'

import { useEffect, useRef, useState } from 'react'
import { Avatar } from '@/components/ui/avatar'
import type { MessageSegment } from '@/lib/message-parser'

interface AgentSegmentProps {
  segment: MessageSegment
  index: number
  isStreaming: boolean
}

export function AgentSegment({ segment, index, isStreaming }: AgentSegmentProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), index * 150)
    return () => clearTimeout(timer)
  }, [index])

  const isHarvey = segment.agentId === 'harvey-specter'

  return (
    <div
      ref={ref}
      className={`
        flex gap-3 transition-all duration-500 ease-out
        ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}
      `}
    >
      {/* Avatar with glow */}
      <div className="relative shrink-0 pt-1">
        <div
          className={`
            absolute -inset-1 rounded-full blur-md transition-opacity duration-1000
            ${visible ? 'opacity-40' : 'opacity-0'}
          `}
          style={{ backgroundColor: segment.agent.color }}
        />
        <div className="relative">
          <Avatar
            src={segment.agent.avatar}
            alt={segment.agent.name}
            size={isHarvey ? 'md' : 'md'}
            borderColor={segment.agent.color}
          />
        </div>
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Agent name badge */}
        <div className="mb-1.5 flex items-center gap-2">
          <span
            className="text-xs font-bold tracking-wide uppercase"
            style={{ color: segment.agent.color }}
          >
            {segment.agent.name}
          </span>
          <span className="text-[10px] text-surface-500">
            {segment.agent.role}
          </span>
        </div>

        {/* Message card */}
        <div
          className={`
            rounded-2xl rounded-tl-sm px-4 py-3 text-sm leading-relaxed
            ${isHarvey
              ? 'bg-gradient-to-br from-gold-900/40 to-surface-800 border border-gold-800/30'
              : 'bg-surface-800/80 border border-surface-700/50'
            }
          `}
          style={{
            borderLeftColor: segment.agent.color,
            borderLeftWidth: '3px',
          }}
        >
          <div className="whitespace-pre-wrap text-surface-200">
            {segment.content}
          </div>
        </div>
      </div>
    </div>
  )
}
