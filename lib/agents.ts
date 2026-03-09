export interface Agent {
  id: string
  name: string
  role: string
  avatar: string
  color: string
  shortDescription: string
}

export const AGENTS: Agent[] = [
  {
    id: 'harvey-specter',
    name: 'Harvey Specter',
    role: 'Lead Orchestrator & Closer',
    avatar: '/avatars/harvey-specter.png',
    color: '#C9A96E',
    shortDescription: 'Estrategia, fechamento, coordenacao',
  },
  {
    id: 'carnegie',
    name: 'Carnegie',
    role: 'Relationship & Influence',
    avatar: '/avatars/carnegie.png',
    color: '#6EA8C9',
    shortDescription: 'Rapport, influencia genuina, 30 principios',
  },
  {
    id: 'milton',
    name: 'Milton',
    role: 'NLP & Neurolinguistic',
    avatar: '/avatars/milton.png',
    color: '#8EC96E',
    shortDescription: 'PNL, ancoragem, metamodelo, perfil',
  },
  {
    id: 'voss',
    name: 'Chris Voss',
    role: 'Tactical Negotiation',
    avatar: '/avatars/voss.png',
    color: '#C96E6E',
    shortDescription: 'Tactical empathy, FBI, Black Swans',
  },
]

export function getAgent(id: string): Agent | undefined {
  return AGENTS.find((agent) => agent.id === id)
}

export function getOrchestratorAgent(): Agent {
  return AGENTS[0]
}
