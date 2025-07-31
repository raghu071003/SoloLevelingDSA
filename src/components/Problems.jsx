import React from 'react'
// import ProblemCard from './ProblemCard'

// Mock ProblemCard component for demo (replace with your actual import)
const ProblemCard = ({ prob }) => {
    const getDifficulty = (difficulty) => {
        switch(difficulty?.toLowerCase()) {
            case 'easy': return { color: 'from-green-400 to-green-600', text: 'Easy', glow: 'shadow-green-500/30' };
            case 'medium': return { color: 'from-yellow-400 to-orange-500', text: 'Medium', glow: 'shadow-yellow-500/30' };
            case 'hard': return { color: 'from-red-400 to-red-600', text: 'Hard', glow: 'shadow-red-500/30' };
            default: return { color: 'from-gray-400 to-gray-600', text: 'Unknown', glow: 'shadow-gray-500/30' };
        }
    };
    
    const diffInfo = getDifficulty(prob.difficulty);
    
    return (
        <div className="group relative">
            <div className={`
                bg-gradient-to-r from-slate-800 to-slate-700
                border border-slate-600/50 rounded-lg p-4
                hover:border-slate-500 transition-all duration-300
                hover:shadow-lg ${diffInfo.glow}
                transform hover:scale-[1.02]
                cursor-pointer
            `}>
                <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold text-lg flex-1 pr-4">
                        {prob.name || prob.title || 'Unnamed Problem'}
                    </h3>
                    <div className={`
                        px-3 py-1 rounded-full text-xs font-bold text-white
                        bg-gradient-to-r ${diffInfo.color}
                        shadow-lg
                    `}>
                        {diffInfo.text}
                    </div>
                </div>
                
                {prob.description && (
                    <p className="text-slate-300 text-sm mt-2 line-clamp-2">
                        {prob.description}
                    </p>
                )}
                
                <div className="flex items-center justify-between mt-3 text-xs text-slate-400">
                    {prob.id && <span>#{prob.id}</span>}
                    {prob.solved && <span className="text-green-400">✓ Solved</span>}
                </div>
            </div>
        </div>
    );
};

const Problems = ({probs, onClose, name}) => {
    // Mock data for demo
    const mockProbs = probs || [
        { id: 1, name: 'Two Sum', difficulty: 'easy', solved: true },
        { id: 2, name: 'Add Two Numbers', difficulty: 'medium', solved: false },
        { id: 3, name: 'Longest Substring', difficulty: 'medium', solved: true },
        { id: 4, name: 'Median of Arrays', difficulty: 'hard', solved: false }
    ];
    
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={onClose}
            ></div>
            
            {/* Modal Content */}
            <div className="w-full max-w-4xl max-h-[90vh] mx-4">
                <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-2xl border border-slate-700/50 overflow-hidden">
                    {/* Header */}
                    <div className="relative p-6 border-b border-slate-700/50">
                        {/* Background effects */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"></div>
                        
                        <div className="relative flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                                    {name || 'Dungeon Challenges'}
                                </h1>
                                <p className="text-slate-400 mt-1">
                                    Select a challenge to begin your quest
                                </p>
                            </div>
                            
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="group relative w-10 h-10 flex items-center justify-center rounded-full
                                         bg-slate-800 hover:bg-slate-700 border border-slate-600/50
                                         transition-all duration-300 hover:scale-110"
                            >
                                <div className="w-5 h-5 relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                                    <svg className="relative w-5 h-5 text-slate-300 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                            </button>
                        </div>
                        
                        {/* Stats bar */}
                        <div className="relative mt-4 flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                                <span className="text-slate-300">Total: {mockProbs.length}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-green-600 rounded-full"></div>
                                <span className="text-slate-300">Solved: {mockProbs.filter(p => p.solved).length}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"></div>
                                <span className="text-slate-300">Remaining: {mockProbs.filter(p => !p.solved).length}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Problems Grid */}
                    <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        <div className="grid gap-4">
                            {mockProbs.map((prob, key) => {
                                return (
                                    <div 
                                        key={key}
                                        className="animate-fade-in"
                                        style={{
                                            animationDelay: `${key * 0.05}s`,
                                            animationFillMode: 'both'
                                        }}
                                    >
                                        <ProblemCard prob={prob} />
                                    </div>
                                );
                            })}
                        </div>
                        
                        {mockProbs.length === 0 && (
                            <div className="text-center py-12">
                                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-slate-700 to-slate-600 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-slate-300 text-lg font-semibold mb-2">No Challenges Available</h3>
                                <p className="text-slate-500">This dungeon appears to be empty.</p>
                            </div>
                        )}
                    </div>
                    
                    {/* Footer */}
                    <div className="p-4 border-t border-slate-700/50 bg-slate-900/50">
                        <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
                            <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                            <span>System Interface Active</span>
                            <div className="w-1 h-1 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out;
                }
                
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(51, 65, 85, 0.3);
                    border-radius: 3px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: linear-gradient(to bottom, #6366f1, #8b5cf6);
                    border-radius: 3px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to bottom, #4f46e5, #7c3aed);
                }
            `}</style>
        </div>
    )
}

export default Problems