import React, { useContext } from 'react'
import Homepage from './Pages/Homepage'
import Navbar from './components/Navbar'
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import RoadMap from './Pages/RoadMap'
import { ContextProvider, MyContext } from './context/Context'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import Leaderboard from './Pages/Leaderboard'
import GoogleLoginButton from './components/GoogleLogin'
import LoginSuccess from './components/LoginSuccess'
import LevelUpLoading from './Pages/LoadingPage'
const App = () => {
  const {loggedin,loading} = useContext(MyContext)
  return (
      <BrowserRouter>
      {loading && <LevelUpLoading />}
      <Navbar />
        <Routes>
          <Route path='/' element={loggedin ? <Homepage /> : <Login/> } />
          <Route path = '/roadmap' element={loggedin ? <RoadMap /> : <Login />} />
          <Route path = '/profile' element={loggedin ? <Profile /> : <Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element = {loggedin ? <RoadMap></RoadMap> : <Register />} />
          <Route path='/leaderboard' element = {loggedin ? <Leaderboard /> : <Login />} />
          <Route path='/googlelogin' element = {<GoogleLoginButton />} />
          <Route path='/loginSuccess' element = {loggedin ? <Homepage /> : <LoginSuccess />} />
        </Routes>
      
      </BrowserRouter>
      
  )
}

export default App