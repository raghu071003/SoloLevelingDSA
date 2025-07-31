import React from 'react'
import Homepage from './Pages/Homepage'
import Navbar from './components/Navbar'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import RoadMap from './Pages/RoadMap'
import { ContextProvider } from './context/Context'
const App = () => {
  return (
    <ContextProvider>
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Homepage /> } />
          <Route path = '/roadmap' element={<RoadMap />} />
        </Routes>
      
      </BrowserRouter>
      
    </ContextProvider>
  )
}

export default App