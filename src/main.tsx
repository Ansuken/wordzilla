import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Words} from "./Words.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Words />
  </StrictMode>,
)
