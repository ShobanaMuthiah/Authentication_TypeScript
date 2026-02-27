
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Dashboard from './Page/Dashboard.tsx'
import SingUp from './Page/SingUp.tsx'
import ForgotPassword from './Page/ForgotPassword.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
<BrowserRouter>

  <GoogleOAuthProvider clientId={import.meta.env.VITE_client_id}>
<Routes>
    <Route index element={<App />}/>
    <Route path='dashboard' element={<Dashboard />}/>
    <Route path='signup' element={<SingUp/>}/>
    <Route path='reset' element={<ForgotPassword/>}/>
    </Routes>
    </GoogleOAuthProvider>
    </BrowserRouter>
  // </StrictMode>,
)
