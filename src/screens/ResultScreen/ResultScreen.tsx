import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Share2, X } from "lucide-react";

export default function ResultScreen(): JSX.Element {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const state = searchParams.get("state");
  const expected = searchParams.get("expected");
  const userAnswer = searchParams.get("answer");
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

  const handleShare = async () => {
    if (expected) {
      try {
        await navigator.clipboard.writeText(decodeURIComponent(expected));
      } catch (err) {
        console.log("Could not copy to clipboard");
      }
    }
  };

  const handleContinue = () => {
    if (isCorrect) {
      navigate("/lesson/translate");
    } else {
      // Clear input and return to lesson
      navigate("/lesson/translate", { state: { clearInput: true } });
    }
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
          {/* Back Button */}
          <button 
            className="w-8 h-8 flex items-center justify-center"
            onClick={() => navigate("/lesson/translate")}
          >
            <X className="w-5 h-5 text-[#6b7280]" />
          </button>
          
          {/* Progress Bar */}
          <div className="flex-1 h-3 bg-[#e5e7eb] rounded-full overflow-hidden">
            <div className="w-3/5 h-full bg-[#58cc02] rounded-full"></div>
          </div>
        </div>

        {/* Level Badge with Review Tag */}
        <div className="flex items-center justify-between px-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ce82ff] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">6</span>
            </div>
            <span className="text-[#ce82ff] font-bold text-sm tracking-wider">LEVEL 6</span>
          </div>
          
          {/* Review Tag for Incorrect Answers */}
          {!isCorrect && (
            <div className="bg-orange-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              Review in 2 days
            </div>
          )
        </div>
          }
        {/* Main Content - Different layouts for correct vs incorrect */}
        {isCorrect ? (
          <div className="flex flex-col items-center justify-center h-[600px] px-6">
            {/* Result Icon and Character */}
            <div className="mb-8">
              <img 
                src="/excited-owl.gif" 
                alt="Excited Duo" 
                className="w-32 h-32 object-contain"
              />
            </div>

            {/* Result Message */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-4 text-[#58cc02]">
                ¡Correcto!
              </h1>
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
                    Great job!
                  </div>
                  {/* Speech bubble tail */}
                  <div className="absolute left-[-8px] top-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-[#e4e4e4]"></div>
                  <div className="absolute left-[-6px] top-4 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[6px] border-r-white"></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="px-6 pb-40">
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

            {/* User's Answer Textarea */}
            <div className="mb-6">
              <textarea
                value={userAnswer ? decodeURIComponent(userAnswer) : ""}
                disabled
                className="w-full h-20 px-4 py-3 text-lg border-2 border-gray-300 rounded-xl bg-gray-100 text-gray-600 resize-none"
                readOnly
              />
            </div>
          </div>
        )}

        {/* Sticky Error Card for Incorrect Answers */}
        {!isCorrect && (
          <div className="absolute bottom-20 left-0 right-0 bg-red-50 border-t-2 border-red-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <X className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-bold text-red-700">Incorrect</h3>
                </div>
                <div className="text-sm text-red-600 mb-1">Correct Answer:</div>
                <div className="text-base font-medium text-red-800 underline">
                  {expected ? decodeURIComponent(expected) : ""}
                </div>
              </div>
              <button
                onClick={handleShare}
                className="ml-4 w-8 h-8 bg-red-100 hover:bg-red-200 rounded-full flex items-center justify-center transition-colors"
              >
                <Share2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </div>
        )}

        {/* Footer Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <button
            onClick={handleContinue}
            className="w-full h-12 rounded-xl text-white font-semibold active:translate-y-[2px] transition-all"
            style={{
              backgroundColor: isCorrect ? '#2ec748' : '#ff4757',
              boxShadow: isCorrect ? '0 3px 0 #27aa3d' : '0 3px 0 #e74c3c'
            }}
          >
            {isCorrect ? "CONTINUE" : "GOT IT"}
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