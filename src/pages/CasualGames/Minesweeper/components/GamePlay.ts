import type { BlockState, GameState, GameStateCallbacks, GameStatus } from '../types'

const directions = [
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
]

export class GamePlay {
  public width: number
  public height: number
  public mines: number
  private state: GameState
  private callbacks: GameStateCallbacks

  constructor(width: number, height: number, mines: number, callbacks: GameStateCallbacks, state: GameState) {
    this.width = width
    this.height = height
    this.mines = mines
    this.callbacks = callbacks
    this.state = state
    this.reset()
  }

  get board() {
    return this.state.board
  }

  reset(
    width = this.width,
    height = this.height,
    mines = this.mines,
  ) {
    this.width = width
    this.height = height
    this.mines = mines
    const newBoard: BlockState[][] = Array.from({ length: this.height }, (_, y) =>
      Array.from({ length: this.width }, (_, x): BlockState => ({
        x,
        y,
        adjacentMines: 0,
        revealed: false,
        mine: false,
        flagged: false,
      })))
    this.state = {
      ...this.state,
      board: newBoard,
      mineGenerated: false, // 重置雷生成状态
      status: 'ready' as GameStatus, // 重置游戏状态为进行中
    }
    this.callbacks.updateBoard(newBoard)
    this.callbacks.setMineGenerated(false)
    this.callbacks.setGameStatus('ready')
  }

  onClick1(block: BlockState) {
    if (!this.state.mineGenerated) {
      this.generateMines(this.board, block)
      this.callbacks.setMineGenerated(true)
      this.callbacks.updateBoard(this.board)
    }
  }

  expendZero(currentBoard: BlockState[][], block: BlockState) {
    if (block.adjacentMines)
      return

    this.getSiblings(currentBoard, block)
      .forEach((s) => {
        if (!s.revealed) {
          if (!s.flagged)
            s.revealed = true
          this.expendZero(currentBoard, s)
        }
      })
  }

  onClick(board: BlockState[][], mineGenerated: boolean, block: BlockState): {
    newBoard: BlockState[][]
    newMineGenerated: boolean
    newStatus?: GameStatus
  } {
    const newBoard = structuredClone(board) // 深拷贝避免直接修改原数组
    if (!mineGenerated) { // 第一个点击生成雷
      this.generateMines(newBoard, block)
      this.expendZero(newBoard, block)
      return { newBoard, newMineGenerated: true }
    }

    if (block.mine) { // 点击到雷
      return { newBoard, newMineGenerated: true, newStatus: 'lost' } // 踩雷失败
    }
    newBoard[block.y][block.x].revealed = true
    this.expendZero(newBoard, block)
    return { newBoard, newMineGenerated: mineGenerated }
  }

  randomRange(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  randomInt(min: number, max: number) {
    return Math.round(this.randomRange(min, max))
  }

  generateMines(state: BlockState[][], initial: BlockState) {
    const placeRandom = () => {
      const x = this.randomInt(0, this.width - 1)
      const y = this.randomInt(0, this.height - 1)
      const block = state[y][x]
      if (Math.abs(initial.x - block.x) <= 1 && Math.abs(initial.y - block.y) <= 1)
        return false
      if (block.mine)
        return false
      block.mine = true
      this.getSiblings(state, block).forEach((block) => {
        if (!block.mine) {
          block.adjacentMines += 1
        }
      })
      return true
    }
    Array.from({ length: this.mines }, () => null).forEach(() => {
      let placed = false
      while (!placed) {
        placed = placeRandom()
      }
    })
  }

  getSiblings(currentBoard: BlockState[][], block: BlockState) {
    return directions.map(([dx, dy]) => {
      const x2 = block.x + dx
      const y2 = block.y + dy
      if (x2 < 0 || x2 >= this.width || y2 < 0 || y2 >= this.height) {
        return undefined
      }
      return currentBoard[y2][x2]
    }).filter(Boolean) as BlockState[]
  }
}
