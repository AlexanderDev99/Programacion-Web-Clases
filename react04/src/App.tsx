import './App.css'

import Home from './pages/Home.tsx'
import Contact from './pages/Contact.tsx'
import { Link, Route, Routes } from 'react-router-dom'

function App() {
  
  return (
    <>
    <nav>
      <Link to='/home'>Home</Link>
      <Link to='/contact'>Contact</Link>
    </nav>
    
    <Routes>
      <Route path='/home' element={<Home/>} />
      <Route path='/contact' element={<Contact/>} />
      </Routes>
    
    </>
  )
}

export default App
