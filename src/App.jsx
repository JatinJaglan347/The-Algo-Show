import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Bar from './components/bar/bar'
import Hero from './components/Hero/Hero'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <div className=' w-full h-lvh bg-black'>
        <Hero/>
      </div>
    </>
  )
}

export default App
