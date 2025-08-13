import React, { useState, useEffect } from "react";

// Mock ReactMarkdown component for demonstration
const ReactMarkdown = ({ children }) => {
  return <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: children?.replace(/\n/g, '<br/>') }} />;
};

export default function ProblemHelperModal({ isOpen, onClose, url }) {
  const [loading, setLoading] = useState(false);
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (isOpen && url) {
      setModalVisible(true);
      fetchExplanation();
    } else if (!isOpen) {
      setModalVisible(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, url]);

  const fetchExplanation = async () => {
    setError("");
    setExplanation("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:8090/api/v1/user/getHelp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ url }),
        }
      );
      const data = await response.json();
      setExplanation(data.explanation || "The Shadow Archive is currently unreachable. Please try again, Hunter.");
    } catch (err) {
      console.error(err);
      setError("The Shadow Archive is currently unreachable. Please try again, Hunter.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setModalVisible(false);
    setTimeout(() => onClose(), 300); // Delay to allow exit animation
  };

  if (!isOpen) return null;

  return (
    <div className={` reading-font fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm z-50 transition-all duration-500 ${modalVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Mystical Particles */}
      <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-purple-400 rounded-full opacity-20 animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: `0 0 ${8 + Math.random() * 6}px rgba(147, 51, 234, 0.6)`
            }}
          ></div>
        ))}
      </div>

      {/* Main Modal */}
      <div className={`relative w-full max-w-4xl mx-4 transform transition-all duration-500 ${modalVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-10'}`}>
        {/* Glowing Border Effect */}
        <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-3xl blur-xl opacity-75 animate-pulse"></div>
        
        {/* Modal Content */}
        <div className="relative bg-gradient-to-b from-gray-900/95 to-black/95 backdrop-blur-md rounded-3xl border-2 border-purple-500/50 shadow-2xl overflow-hidden">
          
          {/* Header */}
          <div className="relative px-8 py-6 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-purple-600/20 border-b border-purple-500/30">
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-6 w-8 h-8 flex items-center justify-center text-purple-300 hover:text-white hover:bg-purple-600/20 rounded-full transition-all duration-300 transform hover:scale-110 text-3xl"
            >
              ✕
            </button>

            {/* Title */}
            <div className="text-center">
              <div className="inline-block relative">
                <h1 className="text-4xl font-black uppercase bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Shadow Archive
                </h1>
                <p className="text-purple-300 text-2xl mt-2 tracking-wider">Ancient Knowledge Unsealed</p>
              </div>
            </div>

            {/* Mystical Runes in Header */}
            <div className="absolute top-4 left-6 text-purple-400 text-2xl opacity-60 animate-spin" style={{animationDuration: '8s'}}>
              ⚡
            </div>
            <div className="absolute bottom-4 right-16 text-blue-400 text-2xl opacity-60 animate-pulse">
              ✧
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">
            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="relative inline-block">
                  <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-blue-400 border-b-transparent rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
                </div>
                <p className="text-purple-300 text-2xl mt-6 animate-pulse">Consulting the Shadow Archive...</p>
                <p className="text-gray-400 text-xl mt-2">The ancient spirits are deciphering your query</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-8">
                <div className="relative inline-block p-6 rounded-2xl bg-gradient-to-r from-red-900/30 to-red-800/30 border-2 border-red-500/50">
                  <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl blur opacity-50"></div>
                  <div className="relative">
                    <div className="text-4xl mb-4">⚠️</div>
                    <p className="text-red-300 text-2xl">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Explanation Content */}
            {explanation && !loading && (
              <div className="relative">
                {/* Content Container */}
                <div className="relative bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl border border-purple-500/30 backdrop-blur-sm">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur"></div>
                  
                  <div className="relative p-6 max-h-96 overflow-auto scrollbar-thin scrollbar-track-gray-900 scrollbar-thumb-purple-600">
                    <div className="prose prose-invert prose-lg max-w-none">
                      <div className="text-gray-200 text-2xl leading-relaxed">
                        <ReactMarkdown>{explanation}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Knowledge Source Footer */}
                <div className="mt-6 text-center">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-full border border-purple-500/30">
                    <div className="text-purple-400 text-xl mr-2">📜</div>
                    <span className="text-purple-300 text-xl">Knowledge bestowed by the Shadow Monarch</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {!loading && explanation && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={handleClose}
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white text-2xl font-black uppercase tracking-wider transform transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(147,51,234,0.8)]"
                >
                  <span className="relative z-10">Return to Battle</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}
          </div>

          {/* Bottom Mystical Border */}
          <div className="h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>

        {/* Floating Mystical Elements */}
        <div className="absolute -top-4 -right-4 text-purple-400 text-3xl opacity-50 animate-spin" style={{animationDuration: '6s'}}>
          ◆
        </div>
        <div className="absolute -bottom-4 -left-4 text-blue-400 text-3xl opacity-50 animate-pulse">
          ◇
        </div>
      </div>
    </div>
  );
}   