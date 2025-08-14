import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animateRows, setAnimateRows] = useState(false);

  // Rank tier system based on Solo Leveling
  const getRankTier = (rank) => {
    if (rank === 1) return { tier: "SHADOW MONARCH", color: "from-purple-600 to-black", glow: "purple" };
    if (rank === 2) return { tier: "NATIONAL LEVEL", color: "from-yellow-500 to-orange-600", glow: "yellow" };
    if (rank === 3) return { tier: "S-RANK", color: "from-red-500 to-red-700", glow: "red" };
    if (rank <= 10) return { tier: "A-RANK", color: "from-blue-500 to-blue-700", glow: "blue" };
    if (rank <= 25) return { tier: "B-RANK", color: "from-green-500 to-green-700", glow: "green" };
    if (rank <= 50) return { tier: "C-RANK", color: "from-gray-500 to-gray-700", glow: "gray" };
    return { tier: "E-RANK", color: "from-brown-500 to-brown-700", glow: "brown" };
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "👑";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    if (rank <= 10) return "⚔️";
    if (rank <= 25) return "🗡️";
    return "🔰";
  };

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await axios.post("https://backendsololevel.onrender.com/api/v1/user/leaderboard",{},{withCredentials:true});
        const data = response.data
        setPlayers(data);
        setTimeout(() => setAnimateRows(true), 500);
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
        setTimeout(() => setAnimateRows(true), 500);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4"></div>
            <div className="absolute inset-0 w-16 h-16 border-4 border-blue-400 border-b-transparent rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
          </div>
          <p className="text-purple-400 text-xl font-bold animate-pulse">Loading Hunter Rankings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-purple-900/30 to-black">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/10 to-transparent animate-pulse"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400 rounded-full opacity-30 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              boxShadow: `0 0 ${6 + Math.random() * 4}px rgba(147, 51, 234, 0.6)`
            }}
          ></div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 p-8">
        {/* Header */}
        <div className="text-center mb-12 mt-20">
          <div className="relative inline-block">
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-xl blur-xl opacity-75 animate-pulse"></div>
            <div className="relative px-8 py-4 bg-gradient-to-r from-gray-900 to-black border-2 border-purple-500 rounded-xl">
              <h1 className="text-5xl md:text-6xl font-black uppercase bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Hunter Rankings
              </h1>
              <p className="text-purple-300 text-lg mt-2 tracking-wider">SHADOW MONARCH'S LEADERBOARD</p>
            </div>
          </div>
        </div>

        {/* Leaderboard Container */}
        <div className="max-w-6xl mx-auto">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {players.slice(0, 3).map((player, index) => {
              const rank = index + 1;
              const rankInfo = getRankTier(rank);
              const actualIndex = rank === 1 ? 1 : rank === 2 ? 0 : 2; // Center the #1 player
              
              return (
                <div
                  key={player.fullName}
                  className={`relative order-${actualIndex} transform transition-all duration-1000 delay-${index * 200} ${
                    animateRows ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
                  }`}
                >
                  <div className={`relative p-6 rounded-2xl border-2 border-${rankInfo.glow}-500 bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-sm ${rank === 1 ? 'transform scale-110 md:scale-125' : ''}`}>
                    {/* Glowing Effect */}
                    <div className={`absolute -inset-1 bg-gradient-to-r ${rankInfo.color} rounded-2xl blur-lg opacity-75 animate-pulse`}></div>
                    
                    {/* Content */}
                    <div className="relative text-center">
                      <div className="text-4xl mb-2">{getRankIcon(rank)}</div>
                      <div className={`text-xs font-bold tracking-widest mb-2 text-${rankInfo.glow}-300`}>
                        {rankInfo.tier}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 truncate">{player.fullName}</h3>
                      <div className={`text-2xl font-black text-${rankInfo.glow}-400`}>
                        {player.exp.toLocaleString()} XP
                      </div>
                      <div className="text-xs text-gray-400 mt-1">RANK #{rank}</div>
                    </div>

                    {/* Special Effects for #1 */}
                    {rank === 1 && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-purple-600 to-black px-4 py-1 rounded-full border border-purple-400">
                          <span className="text-purple-200 text-xs font-bold tracking-widest">SHADOW MONARCH</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Remaining Rankings */}
          {players.length > 3 && (
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 rounded-2xl blur-xl"></div>
              <div className="relative bg-gradient-to-b from-gray-900/90 to-black/90 rounded-2xl border-2 border-purple-500/50 backdrop-blur-sm overflow-hidden">
                {/* Table Header */}
                <div className="bg-gradient-to-r from-purple-600/30 to-blue-600/30 px-6 py-4 border-b border-purple-500/50">
                  <div className="grid grid-cols-12 gap-4 text-white font-bold">
                    <div className="col-span-2 text-center">RANK</div>
                    <div className="col-span-2 text-center">TIER</div>
                    <div className="col-span-5">HUNTER NAME</div>
                    <div className="col-span-3 text-right">EXPERIENCE</div>
                  </div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-purple-500/20">
                  {players.slice(3).map((player, index) => {
                    const rank = index + 4;
                    const rankInfo = getRankTier(rank);
                    
                    return (
                      <div
                        key={player.fullName}
                        className={`grid grid-cols-12 gap-4 px-6 py-4 hover:bg-purple-500/10 transition-all duration-300 transform ${
                          animateRows ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
                        }`}
                        style={{ animationDelay: `${(index + 3) * 100}ms` }}
                      >
                        {/* Rank */}
                        <div className="col-span-2 text-center">
                          <div className="flex items-center justify-center">
                            <span className="text-2xl mr-2">{getRankIcon(rank)}</span>
                            <span className="text-white font-bold text-lg">#{rank}</span>
                          </div>
                        </div>

                        {/* Tier */}
                        <div className="col-span-2 text-center">
                          <div className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${rankInfo.color} text-white text-xs font-bold tracking-wider`}>
                            {rankInfo.tier}
                          </div>
                        </div>

                        {/* Name */}
                        <div className="col-span-5 flex items-center">
                          <span className="text-white font-semibold text-lg truncate">{player.fullName}</span>
                        </div>

                        {/* XP */}
                        <div className="col-span-3 text-right">
                          <span className={`text-${rankInfo.glow}-400 font-bold text-lg`}>
                            {player.exp.toLocaleString()}
                          </span>
                          <span className="text-gray-400 text-sm ml-1">XP</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Footer */}
        <div className="text-center mt-12">
          <div className="inline-block px-6 py-3 bg-gradient-to-r from-gray-900 to-black border border-purple-500/50 rounded-full">
            <span className="text-purple-300">
              Total Hunters: <span className="text-white font-bold">{players.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Mystical Runes */}
      <div className="absolute top-10 left-10 text-purple-500 text-3xl opacity-30 animate-spin" style={{animationDuration: '8s'}}>
        ⚡
      </div>
      <div className="absolute top-20 right-20 text-blue-500 text-4xl opacity-30 animate-spin" style={{animationDuration: '6s', animationDirection: 'reverse'}}>
        ✧
      </div>
      <div className="absolute bottom-20 left-20 text-purple-400 text-3xl opacity-30 animate-pulse">
        ◆
      </div>
      <div className="absolute bottom-32 right-32 text-blue-400 text-3xl opacity-30 animate-pulse" style={{animationDelay: '1s'}}>
        ◇
      </div>
    </div>
  );
}