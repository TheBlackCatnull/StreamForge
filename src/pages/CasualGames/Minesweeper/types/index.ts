export type GameStatus = 'ready' | 'play' | 'won' | 'lost'
export interface BlockState {
  x: number
  y: number
  revealed: boolean
  mine?: boolean
  flagged?: boolean
  adjacentMines: number
}
export interface GameState {
  board: BlockState[][]
  mineGenerated: boolean
  status: GameStatus
  startMS?: number
  endMS?: number
}
export interface GameStateCallbacks {
  setMineGenerated: (flag: boolean) => void
  updateBoard: (newBoard: BlockState[][]) => void
  setGameStatus: (status: GameStatus) => void
  setTimeRange: (startMS?: number, endMS?: number) => void
}
