import React, { lazy, StrictMode, Suspense, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  BrowserRouter,
  Navigate,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom'
import router from './router'
import './index.css'

function Root() {
  return (

    <React.StrictMode>

      <RouterProvider router={router} />

    </React.StrictMode>
  )
}
const container = document.getElementById('root')
container && createRoot(container).render(<Root />)
