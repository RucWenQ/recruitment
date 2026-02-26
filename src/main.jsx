import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { ExperimentProvider } from './context/ExperimentContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ExperimentProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ExperimentProvider>
  </StrictMode>
)