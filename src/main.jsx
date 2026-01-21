import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './assets/scss/all.scss'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/sweetbox-react">
      <App />
    </BrowserRouter>
  </StrictMode>
)
