import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Profile() {
  const [currentExp, setCurrentExp] = useState(0);
  const [maxExp, setMaxExp] = useState(0);
  const [level, setLevel] = useState(47);
  const [rank, setRank] = useState('E-Rank');
  const [name, setName] = useState('');
  const [animateProgress, setAnimateProgress] = useState(false);
  const [loading, setLoading] = useState(true);

  const progressPercentage =
    maxExp > 0 ? (currentExp / maxExp) * 100 : 0;

  const fetchData = async () => {
    try {
      const res = await axios.post(
        'http://localhost:8090/api/v1/user/profile',
        {},
        { withCredentials: true }
      );

      const user = res.data.userProfile || {};
      setName(user.fullName || '');
      setRank(user.rank || 'E-Rank');
      setCurrentExp(Number(user.exp || 0));
      setMaxExp(Number(user.maxExp || 1)); // Avoid divide-by-zero
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
      setAnimateProgress(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleExpIncrease = () => {
    setCurrentExp(prev => Math.min(prev + 150, maxExp));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white text-2xl">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
      </div>

      <div className="relative max-w-md w-full">
        <div className="bg-gradient-to-br from-gray-800/90 via-gray-900/95 to-black/90 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-8 shadow-2xl relative z-10">
          {/* Profile Avatar */}
          <div className="text-center mb-8">
            <div className="inline-block p-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-4">
              <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-full flex items-center justify-center text-white text-2xl">
                  {name ? name[0] : '?'}
                </div>
              </div>
            </div>

            <h1 className="text-3xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              {name}
            </h1>

            {/* Rank Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
              <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-pulse"></div>
              <span className="text-xl text-yellow-300">{rank}</span>
            </div>
          </div>

          {/* Level */}
          <div className="mb-6 text-center">
            <div className="text-6xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-2">
              {level}
            </div>
            <div className="text-xl text-gray-300 font-medium">LEVEL</div>
          </div>

          {/* Experience Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xl text-gray-300">
                EXPERIENCE
              </span>
              <span className="text-xl text-cyan-300">
                {(currentExp ?? 0).toLocaleString()} / {(maxExp ?? 0).toLocaleString()}
              </span>
            </div>

            <div className="relative">
              <div className="w-full h-6 bg-gray-700/50 rounded-full border border-gray-600/30 overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative ${
                    animateProgress ? 'animate-pulse' : ''
                  }`}
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                </div>
              </div>

              {/* Percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm text-white drop-shadow-lg">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 text-center">
              <div className="text-2xl text-red-400 mb-1">1,247</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                Monsters Defeated
              </div>
            </div>
            <div className="bg-gray-800/50 border border-gray-600/30 rounded-lg p-4 text-center">
              <div className="text-2xl text-green-400 mb-1">89</div>
              <div className="text-sm text-gray-400 uppercase tracking-wide">
                Dungeons Cleared
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleExpIncrease}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white text-xl rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
          >
            GAIN EXPERIENCE
          </button>

          {/* Status */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-lg text-green-300 font-medium">
              ACTIVE HUNTER
            </span>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
      </div>
    </div>
  );
}
