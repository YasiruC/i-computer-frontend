import { Route, Routes } from 'react-router-dom'
import './App.css'
import ProductCard from './components/productCard.jsx'
import AdminPage from './pages/adminPage.jsx'
import HomePage from './pages/homePage.jsx'
import LoginPage from './pages/loginPage.jsx'
import { Toaster } from "react-hot-toast"

function App() {

  return (
    <div className='w-full h-screen bg-primary text-secondary'>
      <Toaster position='top-center' />
      <Routes>
        <Route path='/' element = { <HomePage/>} />
        <Route path='/admin/*' element = { <AdminPage/>} />
        <Route path='/login' element = { <LoginPage/>} />
      </Routes> 
    </div>
  )
}

export default App
