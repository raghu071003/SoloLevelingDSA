import React, { useContext } from 'react'
import sheet from '../data/progress.json'
import Topic from '../components/Topic'
import { MyContext } from '../context/Context'
import Problems from '../components/Problems'
const RoadMap = () => {
    const {open,onClose} = useContext(MyContext); 
    const totalDone = sheet.reduce((sum, topic) => sum + topic.doneQuestions, 0);
    const overallProgress = totalDone > 0 ? (totalDone / 450) * 100 : 0;
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
            {open && <Problems onClose={onClose}/>}
            {/* Background effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)]"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
            
            {/* Floating particles */}
            <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400/40 rounded-full animate-ping"></div>
            <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-cyan-400/20 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            
            <div className="relative z-10 p-8">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                        Hunter's Progress
                    </h1>
                    <div className="flex items-center justify-center space-x-8 mb-6">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{totalDone}</div>
                            <div className="text-xl text-slate-400">Challenges Cleared</div>
                        </div>
                        <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-white">{}</div>
                            <div className="text-xl text-slate-400">Total Dungeons</div>
                        </div>
                        <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-600 to-transparent"></div>
                        <div className="text-center">
                            <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                S
                            </div>
                            <div className="text-xl text-slate-400">Rank</div>
                        </div>
                    </div>
                    
                    {/* Overall progress bar */}
                    <div className="max-w-md mx-auto">
                        <div className="w-full bg-slate-800/50 rounded-full h-3 overflow-hidden border border-slate-700/50">
                            <div 
                                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 transition-all duration-1000 rounded-full relative"
                                style={{ width: `${overallProgress}%` }}
                            >
                                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Cards Grid */}
                <div className="flex flex-wrap gap-6 items-center justify-center max-w-7xl mx-auto">
                    {sheet.map((topic, key) => {
                        return (
                            <div 
                                key={key}
                                className="animate-fade-in"
                                style={{
                                    animationDelay: `${key * 0.1}s`,
                                    animationFillMode: 'both'
                                }}
                            >
                                <Topic 
                                    name={topic.topicName} 
                                    done={topic.doneQuestions} 
                                    started={topic.started} 
                                    problem={topic.questions}
                                />
                            </div>
                        );
                    })}
                </div>
                
                {/* Bottom decorative line */}
                <div className="mt-16 max-w-4xl mx-auto">
                    <div className="h-px bg-gradient-to-r from-transparent via-slate-600 to-transparent"></div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.6s ease-out;
                }
            `}</style>
        </div>
    )
}

export default RoadMap