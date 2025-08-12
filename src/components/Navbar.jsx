import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MyContext } from '../context/Context';

const Navbar = () => {
  const navigate = useNavigate();
  const { setLoggedIn } = useContext(MyContext);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) {
      // scrolling down
      setShow(false);
    } else {
      // scrolling up
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const handleSignOut = async () => {
    try {
      const res = await axios.post('http://localhost:8090/api/v1/user/logout', {}, { withCredentials: true });
      if (res.status === 200) {
        navigate('/login')
        setLoggedIn(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav
      className={`fixed w-full bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg transition-all duration-300 z-50 ${
        show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-white tracking-tight">
                LevelUp
              </h1>
            </div>
            <div className="hidden md:flex space-x-6">
              <button
                onClick={() => navigate("/roadmap")}
                className="text-white/90 hover:text-white text-lg font-medium transition-all duration-200 hover:scale-105 relative group"
              >
                RoadMap
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </button>
              <button className="text-white/90 hover:text-white text-lg font-medium transition-all duration-200 hover:scale-105 relative group" onClick={() => navigate("/leaderboard")}>
                Leaderboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
              </button>
            </div>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate("/profile")}
              className="text-white/90 hover:text-white text-lg font-medium transition-all duration-200 hover:scale-105 relative group"
            >
              Profile
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
            </button>
            <button
              onClick={handleSignOut}
              className="bg-gradient-to-r from-red-500/80 to-red-600/80 hover:from-red-500 hover:to-red-600 text-white px-6 py-2 rounded-full text-lg font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg backdrop-blur-sm border border-red-400/30"
            >
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white/90 hover:text-white transition-colors duration-200">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle gradient overlay for enhanced transparency effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none"></div>
    </nav>
  )
}

export default Navbar