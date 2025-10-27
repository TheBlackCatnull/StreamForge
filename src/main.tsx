import React, { lazy, StrictMode, Suspense, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'
import HomePage from './pages/Home'
import './index.css'

function Root() {
  return (

    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <>
            <Route index element={<HomePage />} />
            <Route path="/mobile" />
          </>
        </Routes>
      </BrowserRouter>

    </React.StrictMode>
  )
}
const container = document.getElementById('root')
container && createRoot(container).render(<Root />)
