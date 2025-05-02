import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AdminContextProvider from './context/AdminContext.jsx'
import CoachContextProvider from './context/CoachContext.jsx'
import AppContextProvider from './context/AppContext.jsx'
import { SidebarProvider } from './context/SidebarContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProvider>
      <CoachContextProvider>
        <AppContextProvider>
          <SidebarProvider>
            <App />
          </SidebarProvider>
        </AppContextProvider>
      </CoachContextProvider>
    </AdminContextProvider>
  </BrowserRouter>,
)
