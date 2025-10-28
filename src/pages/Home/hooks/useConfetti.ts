import { useEffect } from 'react'

export function useConfetti(state: boolean) {
  // state 变为 true 时触发
  useEffect(() => {
    return () => {

    }
  }, [state])
}
