import React from 'react'
import ReactDOM from 'react-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { UserContextProvider } from './context/UserContext.jsx'
import { PostContextProvider } from './context/PostContext.jsx'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
    <PostContextProvider>
          <App />
    </PostContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)
