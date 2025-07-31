import React from 'react'

const Homepage = () => {
  return (
     <div className="min-h-screen flex items-center justify-center
      bg-gradient-to-b from-[#181817] to-[#0a1543] relative overflow-hidden">
      <div className="relative px-12 py-14 rounded-xl border-2 border-[#021fa0]
        shadow-[0_0_64px_16px_rgba(27,69,215,0.45)] bg-[#181817cc]">
        <h1 className="text-5xl font-extrabold uppercase bg-clip-text 
          bg-gradient-to-r text-white
          drop-shadow-[0_0_24px_#1b45d7] mb-1 transition duration-300">
          Welcome Coder!
        </h1>
      </div>
    </div>
  )
}

export default Homepage