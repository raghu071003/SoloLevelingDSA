import React from 'react';

export default function PulseLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-6">
        
        {/* Pulse Wave Animation */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full animate-ping opacity-75"></div>
          <div className="absolute w-10 h-10 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center">
          <p className="text-xl font-medium text-gray-700 animate-pulse">
            Please wait...
          </p>
        </div>
        
      </div>
    </div>
  );
}