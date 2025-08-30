import React from "react";
import { useNavigate } from "react-router-dom";
import { Mic } from "lucide-react";

export default function Screen8(): JSX.Element {
  const navigate = useNavigate();
  const [answer, setAnswer] = React.useState("");
  
  const duoCharacters = [
    "/Duo Character 1.svg",
    "/Duo Character 2.svg", 
    "/Duo Character 3.svg",
    "/Duo Character 4.svg",
    "/Duo Character 5.svg"
  ];
  
  const [randomDuoCharacter] = React.useState(() => 
    duoCharacters[Math.floor(Math.random() * duoCharacters.length)]
  );

  const correctAnswer = "Querida Ana, ¿cómo estás?";

  const normalizeText = (text: string): string => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // Remove accents
      .replace(/[¿¡]/g, "") // Remove Spanish punctuation
      .replace(/[.,!?]/g, "") // Remove other punctuation
      .trim();
  };

  const handleCheck = () => {
    const normalizedAnswer = normalizeText(answer);
    const normalizedCorrect = normalizeText(correctAnswer);
    
    if (normalizedAnswer === normalizedCorrect) {
      navigate("/lesson/result?state=correct");
    } else {
      const encodedExpected = encodeURIComponent(correctAnswer);
      navigate(`/lesson/result?state=incorrect&expected=${encodedExpected}`);
    }
  };

  const handleMicClick = () => {
    console.log("record");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Main Canvas */}
      <div className="relative w-[390px] h-[844px] bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* Status Bar */}
        <div className="flex justify-between items-center px-4 py-3 h-[54px]">
          <div className="text-[17px] font-semibold text-[#454a53]">9:41</div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-3 bg-[#454a53] rounded-sm"></div>
            <div className="w-6 h-3 border border-[#454a53] rounded-sm"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center gap-4 px-4 mb-6">
          <button 
            className="w-8 h-8 flex items-center justify-center"
            onClick={() => navigate(-1)}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-[#6b7280]">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="flex-1 h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="w-3/5 h-full bg-[#58cc02] rounded-full"></div>
          </div>
        </div>

        {/* Level Badge */}
        <div className="flex items-center gap-3 px-6 mb-8">
          <div className="w-8 h-8 bg-[#ce82ff] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">6</span>
          </div>
          <span className="text-[#ce82ff] font-bold text-sm tracking-wider">LEVEL 6</span>
        </div>

        {/* Main Content */}
        <div className="px-6 pb-32">
          {/* Title */}
          <h1 className="text-2xl font-bold text-[#4b4b4b] mb-8">
            Translate this sentence
          </h1>

          {/* Character and Speech Bubble Row */}
          <div className="flex items-start gap-4 mb-8">
            {/* Duo Character */}
            <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
              <img 
                src={randomDuoCharacter} 
                alt="Duo character" 
                className="w-20 h-20 object-contain"
              />
            </div>
            
            {/* Speech Bubble */}
            <div className="flex-1 relative">
              <div className="bg-white border-2 border-[#e4e4e4] rounded-2xl p-4 shadow-sm relative">
                <div className="text-lg text-[#4b4b4b] font-medium">
                  "Dear Ana, how are you?"
                </div>
                {/* Speech bubble tail */}
                <div className="absolute left-[-8px] top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-[#e4e4e4]"></div>
                <div className="absolute left-[-6px] top-6 w-0 h-0 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-r-[8px] border-r-white"></div>
              </div>
            </div>
          </div>

          {/* Text Input with Mic */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Ana, como estas?"
                className="w-full h-14 px-4 pr-14 text-lg border-2 border-[#e4e4e4] rounded-xl bg-white shadow-sm focus:border-[#1cb0f6] focus:outline-none transition-colors"
              />
              <button
                onClick={handleMicClick}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-[#1cb0f6] rounded-full flex items-center justify-center shadow-sm hover:bg-[#1a9de6] transition-colors"
              >
                <Mic className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={handleCheck}
            disabled={answer.trim().length === 0}
            className="w-full h-12 rounded-xl text-white font-semibold active:translate-y-[2px] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: answer.trim().length > 0 ? '#2ec748' : '#86efac',
              boxShadow: answer.trim().length > 0 ? '0 3px 0 #27aa3d' : '0 3px 0 #6ee7b7'
            }}
          >
            CHECK
          </button>
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
          <div className="w-[134px] h-[5px] bg-black rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export { Screen8 };