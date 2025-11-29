import React, { useEffect, useState } from 'react'
import SidebarContentLayout from '@/components/Layout/SidebarContentLayout'
import Content from './components/Content'

const Minesweeper: React.FC = () => {
  return (
    <SidebarContentLayout>
      <main className="py-2 text-center">
        <Content />
      </main>
    </SidebarContentLayout>

  )
}

export default Minesweeper
