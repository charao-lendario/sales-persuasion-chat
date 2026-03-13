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
    role: 'Orquestrador e Fechador',
    avatar: '/avatars/harvey-specter.png',
    color: '#C9A96E',
    shortDescription: 'Estratégia, fechamento, coordenação',
  },
  {
    id: 'carnegie',
    name: 'Dale Carnegie',
    role: 'Relacionamento e Influência',
    avatar: '/avatars/carnegie.png',
    color: '#6EA8C9',
    shortDescription: 'Rapport, influência genuína, 30 princípios',
  },
  {
    id: 'milton',
    name: 'Milton Erickson',
    role: 'PNL e Neurolinguística',
    avatar: '/avatars/milton.png',
    color: '#8EC96E',
    shortDescription: 'PNL, ancoragem, metamodelo, perfil sensorial',
  },
  {
    id: 'voss',
    name: 'Chris Voss',
    role: 'Negociação Tática',
    avatar: '/avatars/voss.png',
    color: '#C96E6E',
    shortDescription: 'Empatia tática, FBI, Cisnes Negros',
  },
]

export function getAgent(id: string): Agent | undefined {
  return AGENTS.find((agent) => agent.id === id)
}

export function getOrchestratorAgent(): Agent {
  return AGENTS[0]
}
