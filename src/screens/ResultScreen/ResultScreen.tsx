import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function ResultScreen(): JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const state = searchParams.get("state");
  const expected = searchParams.get("expected");
  const isCorrect = state === "correct";

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

  React.useEffect(() => {
    if (isCorrect) {
      // Play correct answer sound
      const correctSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Correct%20answer%20sound%20effect.mp3");
      correctSound.play().catch(() => {
        console.log("Could not play correct answer sound");
      });
    } else {
      // Play incorrect answer sound
      const incorrectSound = new Audio("https://raw.githubusercontent.com/cjeon94/duolingo-sound-assets/main/Voicy_Bad%20answer.mp3");
      incorrectSound.play().catch(() => {
        console.log("Could not play incorrect answer sound");
      });
    }
  }, [isCorrect]);

  const handleContinue = () => {
    // Navigate back to lesson or next lesson
    navigate("/lesson/translate");
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
            onClick={() => navigate("/lesson/translate")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" className="text-[#6b7280]">
              <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <div className="flex-1 h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="w-3/5 h-full bg-[#58cc02] rounded-full"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center h-[600px] px-6">
          {/* Result Icon and Character */}
          <div className="mb-8">
            <img 
              src={isCorrect ? "/excited-owl.gif" : "/Duolingo Hello.gif"} 
              alt={isCorrect ? "Excited Duo" : "Sad Duo"} 
              className="w-32 h-32 object-contain"
            />
          </div>

          {/* Result Message */}
          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold mb-4 ${isCorrect ? 'text-[#58cc02]' : 'text-[#ff4b4b]'}`}>
              {isCorrect ? "¡Correcto!" : "Incorrect"}
            </h1>
            
            {!isCorrect && expected && (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="text-sm text-gray-600 mb-2">Correct answer:</p>
                <p className="text-lg font-medium text-[#4b4b4b]">
                  {decodeURIComponent(expected)}
                </p>
              </div>
            )}
          </div>

          {/* Character with Speech Bubble */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
              <img 
                src={randomDuoCharacter} 
                alt="Duo character" 
                className="w-16 h-16 object-contain"
              />
            </div>
            
            <div className="relative">
              <div className="bg-white border-2 border-[#e4e4e4] rounded-2xl p-3 shadow-sm relative">
                <div className="text-base text-[#4b4b4b]">
                  {isCorrect ? "Great job!" : "Keep practicing!"}
                </div>
                {/* Speech bubble tail */}
                <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[#e4e4e4]"></div>
                <div className="absolute left-[-6px] top-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-white"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={handleContinue}
            className="w-full h-12 rounded-xl text-white font-semibold active:translate-y-[2px] transition-all bg-[#2ec748] shadow-[0_3px_0_#27aa3d]"
          >
            CONTINUE
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

export { ResultScreen };