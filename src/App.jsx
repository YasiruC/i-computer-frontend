import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard.jsx'
import AdminPage from './pages/adminPage.jsx'
import HomePage from './pages/homePage.jsx'
import LoginPage from './pages/loginPage.jsx'
import { Toaster } from "react-hot-toast"
import RegisterPage from './pages/registerPage.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {

  return (
    <GoogleOAuthProvider clientId="983175074569-im97lvh7kt5etoa6bbcmt45d4u40pd6u.apps.googleusercontent.com">
      <div className='w-full h-screen bg-primary text-secondary'>
        <Toaster position='top-center' />
        <Routes>
          <Route path='/*' element={<HomePage />} />
          <Route path='/admin/*' element={<AdminPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  )
}

export default App
