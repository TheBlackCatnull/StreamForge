import type { BlockState, GameState } from '../types'
import { useCallback, useEffect, useRef, useState } from 'react'
import Timer from '~icons/carbon/timer'
import Mine from '~icons/mdi/mine'
import IconGithub from '~icons/simple-icons/github'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/ui'
import { GamePlay } from './GamePlay'

const numberColors = [
  'text-transparent',
  'text-blue-500',
  'text-green-500',
  'text-yellow-500',
  'text-orange-500',
  'text-red-500',
  'text-purple-500',
  'text-pink-500',
  'text-teal-500',
]
const Content: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    board: [],
    mineGenerated: false,
    status: 'ready',
  })
  // const gameRef = useRef<GamePlay>()
  const play = useRef<GamePlay>(null)
  useEffect(() => {
    play.current = new GamePlay(9, 9, 10, {
      setMineGenerated: flag => setGameState(prev => ({ ...prev, mineGenerated: flag })),
      updateBoard: newBoard => setGameState(prev => ({ ...prev, board: newBoard })),
      setGameStatus: status => setGameState(prev => ({ ...prev, status })),
      setTimeRange: (startMS, endMS) => setGameState(prev => ({
        ...prev,
        startMS: startMS ?? prev?.startMS,
        endMS: endMS ?? prev?.endMS,
      })),
    }, gameState)
  }, [])

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('color-mode') === 'dark',
  )
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }
    // 保存模式到 localStorage，下次打开页面时保持状态
    localStorage.setItem('color-mode', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])
  const newGameClick = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    switch (difficulty) {
      case 'easy':
        play.current?.reset(9, 9, 10)
        break
      case 'medium':
        play.current?.reset(16, 16, 40)
        break
      case 'hard':
        play.current?.reset(25, 16, 60)
        break
    }
  }, [])
  const getBlockClass = useCallback((block: BlockState) => {
    if (block.flagged)
      return 'bg-gray-500/10'
    if (!block.revealed)
      return 'bg-gray-500/10 hover:bg-gray-500/20'

    return block.mine
      ? 'bg-red-500/50'
      : numberColors[block.adjacentMines]
  }, [])
  const handleBlockClick = (block: BlockState) => {
    if (!play.current)
      return
    const { newBoard, newMineGenerated, newStatus } = play.current.onClick(
      gameState.board,
      gameState.mineGenerated,
      block,
    )
    // 只更新变化的状态
    setGameState(prev => ({
      ...prev,
      board: newBoard,
      mineGenerated: newMineGenerated,
      status: newStatus || prev.status,
    }))
  }
  return (
    <div>
      <p>Easy</p>
      <div className="flex justify-center gap-1 p-2">
        <Button onClick={() => newGameClick('easy')}>
          Easy
        </Button>
        <Button onClick={() => newGameClick('medium')}>Medium</Button>
        <Button onClick={() => newGameClick('hard')}>Herd</Button>
        <Button
          onClick={() => setIsDarkMode(!isDarkMode)}
          // 可以使用你定义的 buttonVariants 样式

        >
          {isDarkMode ? '切换到浅色模式' : '切换到深色模式'}
        </Button>

      </div>
      <div className="flex gap-10 justify-center">
        <div className="font-mono text-2xl flex items-center">
          <Timer />
          {100}
        </div>
        <div className="font-mono text-2xl flex items-center">
          <Mine />
          {100}
        </div>

      </div>
      <div className="p-2 w-full overflow-auto">
        {gameState.board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center justify-center w-max mx-auto">
            {row.map((block, colIndex) => (
              <div
                key={colIndex}
                className={cn(
                  'items-center justify-center cursor-pointer flex',
                  'border-[0.5px] border-gray-400/10 gray-400/10',
                  'min-w-8 min-h-8 ',
                  getBlockClass(block),
                )}
                onClick={() => handleBlockClick(block)}
              >
                {block.revealed ? block.mine ? <Mine /> : <div className="font-semibold">{block.adjacentMines}</div> : ''}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Content
