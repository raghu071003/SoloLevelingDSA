import React, { useContext, useEffect,useState } from 'react'
// import sheet from '../data/progress.json'
import Topic from '../components/Topic'
import { MyContext } from '../context/Context'
import Problems from '../components/Problems'
import axios from 'axios'
const RoadMap = () => {
    const [sheet,setSheet] = useState([]);
    const {open,onClose,user,setLoading} = useContext(MyContext); 
    const totalDone = sheet.reduce((sum, topic) => sum + topic.doneQuestions, 0);
    const overallProgress = totalDone > 0 ? (totalDone / 450) * 100 : 0;

    useEffect(()=>{
        fetchSheet()
    },[])
    const fetchSheet = async()=>{
        // console.log("fetching");
        setLoading(true)
        
        try {
            const res = await axios.post("https://backendsololevel.onrender.com/api/v1/user/getProgress",{},{withCredentials:true});
            // console.log(res);
            
        if(res.status === 201){
            // console.log(res.data);
            
            setSheet(res.data.progress);
        }
        } catch (error) {
        }finally{
            setLoading(false)

        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden solo-level">
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
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mt-20">
                        Hunter's Progress
                    </h1>
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