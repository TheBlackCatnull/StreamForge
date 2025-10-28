import { useEffect, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import ReturnButton from '@/components/ui/returnbutton'
import { cn } from '@/utils/ui'

function App() {
  useEffect(() => {
  }, [])
  return (
    <>
      <div
        className={cn(
          'w-full h-full flex justify-center align-center rounded-lg app-drag shadow-custom overflow-hidden bg-mywhite',
          process.env.NODE_ENV === 'development' && 'w-[1340px] h-[750px]',
        )}
      >

        {/* 红色滑块 + 禁用状态 */}
        <Alert variant="destructive" className="relative">
          <AlertTitle>操作成功</AlertTitle>
          <AlertDescription>您的设置已保存，请刷新页面查看更新。</AlertDescription>
        </Alert>
      </div>
    </>
  )
}

export default App
