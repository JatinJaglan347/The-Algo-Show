import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bar from './components/bar/bar'
import Hero from './components/Hero/Hero'
import NavBar from './components/NavBar/NavBar'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer/Footer'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className=' bg-black min-h-screen flex flex-col justify-between'>
    <div className='mb-16'><NavBar/></div>
     <Outlet/>
     <Footer/>
    </div>
     
    </>
  )
}

export default App
