import React, { useState, useEffect } from 'react';
import { MyContext } from '../context/Context';
import { useContext } from 'react';

const Homepage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [shadowArmy, setShadowArmy] = useState([]);
  const [particles, setParticles] = useState([]);
  const {user} = useContext(MyContext)
  useEffect(() => {
    setIsVisible(true);
    
    // Generate shadow army particles
    const army = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 2
    }));
    setShadowArmy(army);

    // Generate floating particles
    const particleArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
      duration: 4 + Math.random() * 3
    }));
    setParticles(particleArray);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/20 to-transparent animate-pulse"></div>
      </div>

      {/* Shadow Army Background Elements */}
      <div className="absolute inset-0">
        {shadowArmy.map((shadow) => (
          <div
            key={shadow.id}
            className="absolute w-8 h-16 bg-gradient-to-t from-purple-600/30 to-transparent rounded-full blur-sm"
            style={{
              left: `${shadow.x}%`,
              top: `${shadow.y}%`,
              animationDelay: `${shadow.delay}s`,
              animationDuration: `${shadow.duration}s`
            }}
          >
            <div className="w-full h-full animate-pulse opacity-60"></div>
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-blue-400 rounded-full animate-bounce opacity-70"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              boxShadow: `0 0 ${particle.size * 2}px rgba(59, 130, 246, 0.8)`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6">
        
        {/* Level Up Badge */}
        <div 
          className={`transform transition-all duration-1000 ${
            isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
          }`}
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-full blur-xl opacity-75 animate-pulse"></div>
            <div className="relative px-8 py-3 bg-gradient-to-r from-gray-900 to-gray-800 border-2 border-purple-500 rounded-full">
              <span className="text-purple-300 font-bold text-lg tracking-wider">LEVEL UP</span>
            </div>
          </div>
        </div>

        {/* Main Title Container */}
        <div 
          className={`relative transform transition-all duration-1500 delay-300 ${
            isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
          }`}
        >
          {/* Glowing Border Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-2xl blur-2xl opacity-75 animate-pulse"></div>
          
          {/* Main Card */}
          <div className="relative px-16 py-12 rounded-2xl border-2 border-purple-500 bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-sm">
            
            {/* Rank Indicator */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-400 px-6 py-2 rounded-full border-2 border-yellow-300">
                <span className="text-black font-bold text-sm tracking-widest">{user.rank}</span>
              </div>
            </div>

            {/* Welcome Text */}
            <div className="text-center">
              <h1 className="text-6xl md:text-7xl font-black uppercase mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
                Welcome
              </h1>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(147,51,234,0.7)]">
                Shadow Monarch
              </h2>
              
              {/* Subtitle */}
              <p className="text-xl text-gray-300 mb-8 tracking-wide">
                Arise and conquer the coding dungeons
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg font-bold text-white uppercase tracking-wider transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.8)]">
                <span className="relative z-10">Enter Dungeon</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <button className="group relative px-8 py-4 border-2 border-purple-500 rounded-lg font-bold text-purple-300 uppercase tracking-wider transform transition-all duration-300 hover:scale-105 hover:bg-purple-500/20">
                <span className="relative z-10">View Stats</span>
              </button>
            </div>
          </div>
        </div>

        {/* Power Level Indicator */}
        <div 
          className={`mt-12 transform transition-all duration-2000 delay-500 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="text-center">
            <p className="text-gray-400 text-sm mb-2">CURRENT POWER LEVEL</p>
            <div className="relative">
              <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-600 to-blue-500 rounded-full animate-pulse" style={{
  width: `${(user.exp /21320 ) * 100}%`
}}
></div>
              </div>
              <span className="absolute -right-2 -top-6 text-purple-400 font-bold">{user.exp}</span>
            </div>
          </div>
        </div>

        {/* Floating Combat Text */}
        <div className="absolute top-1/4 right-1/4 text-purple-400 font-bold text-lg animate-bounce opacity-75">
          +500 EXP
        </div>
        <div className="absolute bottom-1/3 left-1/4 text-blue-400 font-bold text-lg animate-bounce opacity-75" style={{animationDelay: '1s'}}>
          LEVEL UP!
        </div>
      </div>

      {/* Shadow Soldiers Silhouettes */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-30">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bottom-0 w-6 h-24 bg-gradient-to-t from-purple-900 to-transparent transform skew-x-12 animate-pulse"
            style={{
              left: `${i * 12 + 5}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: '2s'
            }}
          ></div>
        ))}
      </div>

      {/* Mystical Runes */}
      <div className="absolute top-10 left-10 text-purple-500 text-2xl opacity-50 animate-spin" style={{animationDuration: '8s'}}>
        ⚡
      </div>
      <div className="absolute top-20 right-20 text-blue-500 text-3xl opacity-50 animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}>
        ✧
      </div>
      <div className="absolute bottom-20 left-20 text-purple-400 text-2xl opacity-50 animate-pulse">
        ◆
      </div>
      <div className="absolute bottom-32 right-32 text-blue-400 text-2xl opacity-50 animate-pulse" style={{animationDelay: '1s'}}>
        ◇
      </div>
    </div>
  );
};

export default Homepage;