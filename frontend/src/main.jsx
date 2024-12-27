import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { AppProvider } from './AppContext';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <StrictMode>
      <App />
    </StrictMode>,
  </AppProvider>
)