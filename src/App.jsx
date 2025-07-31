import React from 'react'
import Homepage from './Pages/Homepage'
import Navbar from './components/Navbar'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import RoadMap from './Pages/RoadMap'

const App = () => {
  return (
    <>
      
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Homepage /> } />
          <Route path = '/roadmap' element={<RoadMap />} />
        </Routes>
      
      </BrowserRouter>
      
    </>
  )
}

export default App