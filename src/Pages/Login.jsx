import React, { useContext, useState } from 'react';
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../context/Context';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate()
  const {setLoggedIn} = useContext(MyContext)

  const handleLogin = async()=>{
    try {
        setIsHovered(true)
        const res = await axios.post('http://localhost:8090/api/v1/user/login',{email,password},{withCredentials:true});
        if(res.status === 200){
            navigate('/');
            setLoggedIn(true)
        }
    } catch (error) {
        console.log(error);
        
    } finally{
        setIsHovered(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main login container */}
        <div className="bg-black/40 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent mb-2">
                SYSTEM
              </h1>
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25"></div>
            </div>
            <p className="text-gray-300 text-xl font-medium tracking-wider">
              [ HUNTER AUTHENTICATION REQUIRED ]
            </p>
          </div>

          {/* Login form */}
          <div className="space-y-6">
            {/* Email field */}
            <div className="relative">
              <label className="block text-xl font-medium text-purple-300 mb-2 tracking-wide">
                HUNTER ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  placeholder="Enter your hunter ID..."
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Password field */}
            <div className="relative">
              <label className="block text-xl font-medium text-purple-300 mb-2 tracking-wide">
                ACCESS CODE
              </label>
              <div className="relative">
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all duration-300"
                  placeholder="Enter access code..."
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between text-xl">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only" />
                <div className="relative">
                  <div className="w-4 h-4 bg-gray-700 border border-purple-500/50 rounded"></div>
                  <div className="absolute inset-0 w-4 h-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded opacity-0 hover:opacity-100 transition-opacity duration-200"></div>
                </div>
                <span className="ml-2 text-gray-300">Remember Hunter</span>
              </label>
              <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                Forgot Code?
              </a>
            </div>

            {/* Login button */}
            <div
              className="w-full relative group cursor-pointer"
              onClick={() => {handleLogin()}}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className=" text-xl relative px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white tracking-widest transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/25">
                <span className="relative z-10">
                  {isHovered ? '[ ACCESSING SYSTEM ]' : '[ LOGIN ]'}
                </span>
                {isHovered && (
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-lg opacity-20 animate-pulse"></div>
                )}
              </div>
            </div>
          </div>

          {/* Stats/Level indicator */}
          <div className="mt-8 pt-6 border-t border-purple-500/30">
            <div className="flex justify-between items-center text-xs text-gray-400">
              <span>SYSTEM STATUS</span>
              <span className="text-green-400">● ONLINE</span>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xl text-gray-500">
              New Hunter? <Link to='/register' className="text-purple-400 hover:text-purple-300 transition-colors">Register for System Access</Link>
            </p>
          </div>
        </div>

        {/* Bottom system message */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500 font-mono">
            [ SYSTEM v2.1.4 ] 
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;