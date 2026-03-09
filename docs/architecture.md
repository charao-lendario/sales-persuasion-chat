# Sales Persuasion Chat — Architecture

## Technical Summary

App de chat single-page onde o usuario conversa com Harvey Specter (orchestrator) que coordena 3 especialistas (Carnegie, Milton, Voss) nos bastidores. Frontend Next.js com App Router, backend via API Routes chamando OpenAI API com system prompts dos agentes. Deploy na Vercel. Sem banco de dados — historico de chat em memoria da sessao.

## High Level Architecture

```
User → Next.js App (Vercel)
         ├── Chat UI (React)
         │     ├── Sidebar com avatares dos 4 agentes
         │     └── Area de chat (mensagens + input)
         └── API Route /api/chat
               └── OpenAI SDK → OpenAI API
                     └── System prompt = Harvey Specter persona
                           (com instrucoes de consultar Carnegie, Milton, Voss)
```

## Tech Stack

| Category | Technology | Rationale |
|----------|-----------|-----------|
| Framework | Next.js 15 (App Router) | SSR, API Routes, Vercel-native |
| Language | TypeScript | Type safety |
| UI | Tailwind CSS 4 | Rapido de estilizar, sem overhead |
| AI SDK | Vercel AI SDK + OpenAI | Streaming nativo, hooks prontos |
| LLM | GPT-5 Mini (gpt-5-mini) | Rapido, economico, bom para roleplay |
| Icons | Lucide React | Leve, consistente |
| Deploy | Vercel | Zero-config para Next.js |
| Package Manager | pnpm | Rapido, disk-efficient |

## Data Models

```typescript
// Agente do squad
interface Agent {
  id: string;           // 'harvey-specter' | 'carnegie' | 'milton' | 'voss'
  name: string;         // 'Harvey Specter'
  role: string;         // 'Lead Orchestrator & Closer'
  avatar: string;       // '/avatars/harvey-specter.png'
  color: string;        // Cor tema do agente
}

// Mensagem no chat
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  agentId?: string;     // Qual agente respondeu (para avatar)
  timestamp: Date;
}
```

## API Specification

### POST /api/chat

```typescript
// Request
{
  messages: Message[];  // Historico da conversa
}

// Response: ReadableStream (SSE)
// Streaming de tokens via Vercel AI SDK
```

**System Prompt Strategy:**
- Harvey Specter e o agente principal no system prompt
- O prompt inclui as personas completas de Carnegie, Milton e Voss
- Harvey referencia os especialistas naturalmente nas respostas
- Exemplo: "Milton analisou o perfil dele e detectou um padrao visual..."

## Frontend Architecture

### Component Tree

```
app/
├── layout.tsx                 # Root layout
├── page.tsx                   # Chat page (unica pagina)
├── globals.css                # Tailwind + custom styles
├── api/
│   └── chat/
│       └── route.ts           # API Route → OpenAI
├── components/
│   ├── chat/
│   │   ├── chat-container.tsx # Container principal
│   │   ├── message-list.tsx   # Lista de mensagens
│   │   ├── message-bubble.tsx # Bolha individual
│   │   ├── chat-input.tsx     # Input de mensagem
│   │   └── typing-indicator.tsx
│   ├── sidebar/
│   │   ├── agent-sidebar.tsx  # Sidebar com agentes
│   │   └── agent-card.tsx     # Card individual do agente
│   └── ui/
│       └── avatar.tsx         # Componente avatar
├── lib/
│   ├── agents.ts              # Definicoes dos agentes
│   ├── system-prompt.ts       # System prompt do Harvey
│   └── utils.ts               # Utilities
└── public/
    └── avatars/               # Imagens dos agentes
        ├── harvey-specter.png
        ├── carnegie.png
        ├── milton.png
        └── voss.png
```

### Layout Principal

```
┌──────────────────────────────────────────────────┐
│  SALES PERSUASION SQUAD                          │
├────────────┬─────────────────────────────────────┤
│            │                                     │
│  [Harvey]  │  Harvey: Vamos la. Me conta o       │
│  ★ Online  │  cenario dessa reuniao.             │
│            │                                     │
│  [Carnegie]│  User: Tenho uma reuniao amanha     │
│  Influence │  com o CEO da empresa X...          │
│            │                                     │
│  [Milton]  │  Harvey: Perfeito. Milton analisou  │
│  NLP       │  o perfil dele — visual dominante.  │
│            │  Carnegie sugere comecar com...     │
│  [Voss]    │  Voss preparou um accusation audit. │
│  Tactical  │                                     │
│            │  ┌──────────────────────────────┐   │
│            │  │ Digite sua mensagem...    [→]│   │
│            │  └──────────────────────────────┘   │
├────────────┴─────────────────────────────────────┤
│  Harvey Specter • Lead Orchestrator & Closer     │
└──────────────────────────────────────────────────┘
```

### State Management

Minimo — usando `useChat` do Vercel AI SDK:

```typescript
const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
  api: '/api/chat',
});
```

Sem necessidade de state management externo. O hook `useChat` gerencia tudo.

## Backend Architecture (API Route)

```typescript
// app/api/chat/route.ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-5-mini'),
    system: buildSystemPrompt(),  // Harvey + especialistas
    messages,
  });

  return result.toDataStreamResponse();
}
```

## System Prompt Architecture

O system prompt e a peca central. Harvey Specter e o agente principal com instrucoes explicitas de quando e como referenciar cada especialista:

```
Voce e Harvey Specter...
[persona completa]

Voce tem 3 especialistas que consulta internamente:

CARNEGIE (Relationship & Influence):
[conhecimento completo - 30 principios, livros, tecnicas]

MILTON (NLP & Neurolinguistic):
[conhecimento completo - PNL, ancoragem, metamodelo, etc]

VOSS (Tactical Negotiation):
[conhecimento completo - tactical empathy, Ackerman, etc]

REGRAS:
- Voce e o unico que fala com o usuario
- Quando usar conhecimento de um especialista, cite-o naturalmente
- Ex: "Milton observou que...", "Carnegie diria que...", "Voss sugere..."
- Mantenha SEMPRE o tom e personalidade de Harvey Specter
- Seja direto, confiante, estrategico
```

## Project Structure (Final)

```
sales-persuasion/app/
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── .env.local              # OPENAI_API_KEY
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       └── chat/
│           └── route.ts
├── components/
│   ├── chat/
│   │   ├── chat-container.tsx
│   │   ├── message-list.tsx
│   │   ├── message-bubble.tsx
│   │   ├── chat-input.tsx
│   │   └── typing-indicator.tsx
│   ├── sidebar/
│   │   ├── agent-sidebar.tsx
│   │   └── agent-card.tsx
│   └── ui/
│       └── avatar.tsx
├── lib/
│   ├── agents.ts
│   ├── system-prompt.ts
│   └── utils.ts
├── public/
│   └── avatars/
│       ├── harvey-specter.png
│       ├── carnegie.png
│       ├── milton.png
│       └── voss.png
└── docs/
    └── architecture.md
```

## Deployment

```bash
# Development
pnpm dev

# Build
pnpm build

# Deploy
vercel --prod --yes
```

**Environment Variables (Vercel):**
- `OPENAI_API_KEY` — chave da API OpenAI

## Security

- API key apenas no server (API Route), nunca exposta no client
- Rate limiting via Vercel Edge (built-in)
- Sem dados persistidos (sem DB = sem data breach risk)
- CORS default do Next.js (same-origin)

## Checklist

- [x] Tech stack definido
- [x] Component architecture definido
- [x] API specification definido
- [x] System prompt strategy definido
- [x] Project structure definido
- [x] Deployment strategy definido
- [x] Security considerations definido
