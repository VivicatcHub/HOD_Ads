import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/anybody/wdth.css'
import '@fontsource-variable/hanken-grotesk'
import './styles/app.css'
import './styles/poster.css'
import './styles/poster-sober.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
