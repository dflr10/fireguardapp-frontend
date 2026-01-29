import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "leaflet/dist/leaflet.css";
import "./map/leaflet-icons";
import './index.css'
import App from './App.tsx'
import { EmergencyProvider } from './context/EmergencyContext.tsx';

document.documentElement.classList.add("dark");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <EmergencyProvider>
      <App />
    </EmergencyProvider>
  </StrictMode>,
)
