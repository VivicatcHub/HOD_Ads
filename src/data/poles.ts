export type PoleId = 'reflexion' | 'tcg' | 'societe' | 'jdr' | 'wargames' | 'poker' | 'mensonges'

export interface Pole {
  id: PoleId
  name: string
  short: string
  code: string
  colorName: string
  base: string
  deep: string
  light: string
  line: string
  ink: string
  inkSoft: string
  second: string
  examples: string[]
  pitch: string
}

export const POLES: Pole[] = [
  {
    id: 'reflexion',
    name: 'Jeux de Réflexion',
    short: 'Réflexion',
    code: 'REF',
    colorName: 'Blanc cassé',
    base: '#ede6d6',
    deep: '#cfc4ad',
    light: '#f8f4ea',
    line: '#c4b89d',
    ink: '#2b0a57',
    inkSoft: '#5a3f7e',
    second: '#1c1426',
    examples: ['Échecs', 'Go', "Rubik's Cube", 'Blitz du mardi', 'Tournoi d’échecs'],
    pitch: 'Débutants comme joueurs aguerris, plateaux et horloges fournis.',
  },
  {
    id: 'tcg',
    name: 'TCG',
    short: 'TCG',
    code: 'TCG',
    colorName: 'Bleu',
    base: '#1f5ad6',
    deep: '#0c2c7c',
    light: '#7fa7ff',
    line: '#3f74ea',
    ink: '#ffffff',
    inkSoft: '#d5e1ff',
    second: '#0a1f5c',
    examples: ['Magic: The Gathering', 'Lorcana', 'One Piece', 'Commander Night', 'Draft Lorcana'],
    pitch: 'Ramenez vos decks, on fournit les tables et les tapis.',
  },
  {
    id: 'societe',
    name: 'Jeux de société',
    short: 'Société',
    code: 'JDS',
    colorName: 'Orange',
    base: '#ff7417',
    deep: '#b2420a',
    light: '#ffb37a',
    line: '#ff8d3d',
    ink: '#2b0a57',
    inkSoft: '#4d1a1a',
    second: '#7a2a05',
    examples: ['Soirée jeux', 'Uno', 'Skyjo', 'Monopoly', 'Découverte de jeux'],
    pitch: 'Des dizaines de jeux sur les tables, venez seul ou à plusieurs.',
  },
  {
    id: 'jdr',
    name: 'Jeux de rôle',
    short: 'JDR',
    code: 'JDR',
    colorName: 'Bleu / Vert',
    base: '#0f8a7e',
    deep: '#08453f',
    light: '#7fd6c4',
    line: '#24a294',
    ink: '#ffffff',
    inkSoft: '#d2f3ec',
    second: '#1d5fb0',
    examples: ['Campagne', 'One-shot', 'Initiation au JDR', 'La Nuit des MJ', 'Donjons & Dragons'],
    pitch: 'Places limitées, inscription auprès du MJ.',
  },
  {
    id: 'wargames',
    name: 'Wargames',
    short: 'Wargames',
    code: 'WAR',
    colorName: 'Rouge',
    base: '#cc1f2b',
    deep: '#6a0b13',
    light: '#ff8a8f',
    line: '#dd3c47',
    ink: '#ffffff',
    inkSoft: '#ffd9db',
    second: '#3d060b',
    examples: ['Warhammer 40k', 'Age of Sigmar', 'Kill Team', 'Peinture de figurines', 'Escarmouche'],
    pitch: 'Ramenez vos armées, les tables et décors sont prêts.',
  },
  {
    id: 'poker',
    name: 'Poker',
    short: 'Poker',
    code: 'PKR',
    colorName: 'Vert',
    base: '#0f7a43',
    deep: '#063d21',
    light: '#7ed6a4',
    line: '#1f8f55',
    ink: '#ffffff',
    inkSoft: '#d6f5e2',
    second: '#c81e3a',
    examples: ['Poker', 'Texas Hold’em', 'Tournoi de poker', 'Cash game', 'Initiation au poker'],
    pitch: 'Jetons fournis, aucune mise en argent réel.',
  },
  {
    id: 'mensonges',
    name: 'Mensonges et Trahisons',
    short: 'Mensonges',
    code: 'M&T',
    colorName: 'Noir',
    base: '#131016',
    deep: '#000000',
    light: '#4a4152',
    line: '#2a2430',
    ink: '#ffffff',
    inkSoft: '#d8cfe2',
    second: '#a30af5',
    examples: ['Loup-Garou', 'Complot', 'Shadow Hunters', 'Blood on the Clocktower', 'Nuit des traîtres'],
    pitch: 'Un village, des loups, et personne n’est innocent.',
  },
]

export const HOD = {
  night: '#14062b',
  deep: '#2b0a57',
  royal: '#5a14a0',
  electric: '#a30af5',
  orchid: '#e58cf5',
  lilac: '#f3ecfb',
  dice: '#5566a8',
  gold: '#e9b949',
}

export const poleById = (id: PoleId) => POLES.find((p) => p.id === id) ?? POLES[0]
