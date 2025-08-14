import React, { useContext, useEffect, useState } from 'react'
import Problems from './Problems';
import { MyContext } from '../context/Context';

const Topic = ({name, started, done,problem}) => {
    // Calculate completion percentage if started is provided
    const {prob,setProb,setOpen,setName} = useContext(MyContext);
    const completionRate = started ? (done / 450) * 100 : 0;

    
    const handleClick =()=>{
        setProb(problem)
        setOpen(true);
        setName(name)
    }    
    return (
        <div>    
        
        <div className="relative group hover:cursor-pointer" onClick={handleClick}>
            
            <div className={`
                relative overflow-hidden
                bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900
                border border-slate-700/50 rounded-lg
                shadow-2xl
                transform transition-all duration-300 hover:scale-105
                hover:shadow-2xl hover:border-slate-600
                w-fit p-6 min-w-64
                before:absolute before:inset-0 
                before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent
                before:translate-x-[-100%] hover:before:translate-x-[100%]
                before:transition-transform before:duration-700
            `}>
                
                {/* Title section */}
                <div className="mb-4">
                    <h3 className="text-4xl tracking-widest text-white text-center  pr-10 ">
                        {name}
                    </h3>
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent mt-2"></div>
                </div>
                
                {/* Stats section */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-slate-300 text-xl font-medium">Challenges Won</span>
                        <span className={`text-lg font-bold text-gray-300 bg-gradient-to-r bg-clip-text`}>
                            {done}
                        </span>
                    </div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-slate-600/50 to-transparent"></div>
                
                <div className="absolute top-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-75"></div>
                <div className="absolute bottom-4 right-12 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.7s'}}></div>
            </div>
            
            <div className={`
                absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300
                bg-gradient-to-br blur-xl -z-10 scale-110 
            `}></div>
        </div>
        </div>
    )
}

export default Topic