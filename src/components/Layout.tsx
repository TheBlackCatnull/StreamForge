import type React from 'react'
import { cn } from '@/utils/ui'
import Footer from './Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className={cn(
      'w-full h-full flex flex-col gap-4 rounded-lg shadow-custom overflow-hidden bg-mywhite',
      process.env.NODE_ENV === 'development' && 'w-[1340px] h-[750px]',
    )}
    >
      {children}
      <Footer />
    </main>
  )
}
