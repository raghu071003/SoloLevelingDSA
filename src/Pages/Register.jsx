import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../components/GoogleLogin';

const Register = () => {
  const [formData, setFormData] = useState({
    hunterName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [isHovered, setIsHovered] = useState(false)
  const [error,setError] = useState('');
  const navigate = useNavigate();
  const handleInputChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleRegister = async(e)=>{
    e.preventDefault();
    if(!formData.email || !formData.hunterName || !formData.confirmPassword || !formData.password){
        setError("Fill all the fields")
        return;
    }
    if(formData.password != formData.confirmPassword) {
        setError("Passwords Dont Match")
        return;
    }
    try {
        setIsHovered(true)
        const res = await axios.post('https://backendsololevel.onrender.com/api/v1/user/signup',{email:formData.email,password:formData.password,fullName:formData.hunterName})
        if(res.status == 200){
            navigate('/login');
        }else{
            setError(res)
        }
    } catch (error) {
        console.log(error);
        setError("User aldready exists")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Matrix-like falling code effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-xl text-blue-400 opacity-20 font-mono animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {Math.random().toString(36).substring(2, 8).toUpperCase()}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-lg">
        {/* Main registration container */}
        <div className="bg-black/50 backdrop-blur-lg border border-indigo-500/30 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-600 bg-clip-text text-transparent mb-2">
                HUNTER
              </h1>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                REGISTRATION
              </h2>
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-25"></div>
            </div>
            <p className="text-gray-300 text-xl font-medium tracking-wider mt-3">
              [ SYSTEM AWAKENING PROTOCOL ]
            </p>
          </div>

          {/* Registration form */}
          <div className="space-y-6">
              <>
                {/* Hunter Name */}
                <div className="relative">
                  <label className="block text-xl font-medium text-indigo-300 mb-2 tracking-wide">
                    HUNTER NAME
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="hunterName"
                      value={formData.hunterName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-indigo-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                      placeholder="Enter your hunter name..."
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-xl font-medium text-indigo-300 mb-2 tracking-wide">
                    SYSTEM EMAIL
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-indigo-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                      placeholder="hunter@system.net"
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Password */}
                <div className="relative">
                  <label className="block text-xl font-medium text-indigo-300 mb-2 tracking-wide">
                    ACCESS CODE
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-indigo-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                      placeholder="Create access code..."
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <label className="block text-xl font-medium text-indigo-300 mb-2 tracking-wide">
                    CONFIRM CODE
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-gray-900/50 border border-indigo-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/20 transition-all duration-300"
                      placeholder="Confirm access code..."
                    />
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-600/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>

                <div className='text-xl text-red-600'>{error}</div>
                <div
                  className="w-full relative group cursor-pointer"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                  <div className="relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg text-white text-xl tracking-wider transition-all duration-300 group-hover:shadow-lg group-hover:shadow-indigo-500/25 text-center" onClick={(e)=>handleRegister(e)}>
                   {isHovered ? "Accessing the System" : "Proceed to Awakening" }
                  </div>
                </div>
              </>
          </div>

          <GoogleLoginButton />
          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-xl text-gray-500">
              Already awakened? <Link to='/login' className="text-indigo-400 hover:text-indigo-300 transition-colors">Return to System</Link>
            </p>
          </div>
        </div>

        {/* Bottom system message */}
        <div className="mt-4 text-center">
          <p className="text-xl text-gray-500 font-mono">
            [ HUNTER REGISTRY ]
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;