import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App';
import './i18n';
import appConfig from './config/app.json';

// Set page title from config
document.title = appConfig.app.name;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
