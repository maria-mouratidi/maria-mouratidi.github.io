import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useTheme } from "../ThemeContext";

// Theme-specific accent colors and styles
const accentsMap = {
  icy: {
    highlight: "text-cyan-500",
    secondary: "text-gray-700",
    text: "text-gray-800",
    glassBackground: "bg-white/[0.15]",
    glassBorder: "border-white/[0.25]",
    buttonPrimary: "bg-cyan-500/90 hover:bg-cyan-400 text-white border-none",
    buttonSecondary: "bg-white/90 text-cyan-700 hover:bg-cyan-100 border-none",
    imageBorder: "border-white/[0.2]",
    shadowColor: "rgba(0, 188, 212, 0.1)",
    nameColor: "text-blue-400",
    backdropBlur: "backdrop-blur-[20px]",
  },
  hot: {
    highlight: "text-yellow-500",
    secondary: "text-gray-700",
    text: "text-white/90",
    glassBackground: "bg-white/[0.08]",
    glassBorder: "border-white/[0.15]",
    buttonPrimary: "bg-yellow-400/90 hover:bg-yellow-300 text-yellow-900 border-none",
    buttonSecondary: "bg-white/90 text-yellow-700 hover:bg-yellow-100 border-none",
    imageBorder: "border-white/[0.2]",
    shadowColor: "rgba(255, 255, 255, 0.1)",
    nameColor: "text-yellow-600",
    backdropBlur: "backdrop-blur-[20px]",
  },
  dark: {
    highlight: "text-blue-400",
    secondary: "text-white/80",
    text: "text-white/90",
    glassBackground: "bg-white/[0.08]",
    glassBorder: "border-white/[0.15]",
    buttonPrimary: "bg-blue-600/90 hover:bg-blue-500 text-white border-none",
    buttonSecondary: "bg-white/90 text-blue-900 hover:bg-blue-100 border-none",
    imageBorder: "border-white/[0.2]",
    shadowColor: "rgba(255, 255, 255, 0.1)",
    nameColor: "text-blue-400",
    backdropBlur: "backdrop-blur-[20px]",
  }
};

const typewriterText = [
  "AI Enthusiast",
  "Cognitive Scientist", 
  "Developer",
  "Researcher",
  "Problem Solver"
];

// Floating elements component
const FloatingElements = React.memo(() => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="absolute w-1 h-1 rounded-full animate-float opacity-40"
        style={{
          background: 'rgba(255, 255, 255, 0.4)',
          left: `${15 + i * 18}%`,
          top: `${20 + (i % 3) * 20}%`,
          animationDelay: `${i * 1.2}s`,
        }}
      />
    ))}
  </div>
));

// Profile images component with fade effect
const ProfileImages = React.memo(({ imgIdx, images }) => (
  <div 
    className="relative profile-pic-container mx-auto mb-8 md:mb-0 md:mr-8"
    style={{ 
      minWidth: '240px',
      minHeight: '240px',
      maxWidth: '340px',
      maxHeight: '340px',
    }}
  >
    <div className="relative w-full h-full">
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt="Maria Mouratidi"
          className={`
            absolute inset-0 w-full h-full object-cover rounded-full
            border-[3px] shadow-2xl
            transition-opacity duration-1000
            ${idx === imgIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}
          `}
        />
      ))}
    </div>
  </div>
));

// Typewriter effect component
const TypewriterText = React.memo(({ currentText, accents }) => (
  <div className="text-lg md:text-xl leading-relaxed animate-fade-in-up">
    <span className={`${accents.highlight} font-semibold`}>
      {currentText}
    </span>
  </div>
));

// Main component
function LandingPage() {
  const { theme } = useTheme();
  const accents = useMemo(() => accentsMap[theme] || accentsMap.icy, [theme]);

  // Profile image animation
  const [imgIdx, setImgIdx] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Typewriter effect
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mouse position for subtle parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Memoized scroll handler
  const handleScrollToContact = useCallback(() => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // Image rotation effect
  useEffect(() => {
    let timeout;
    const rotateImages = () => {
      setImgIdx(prevIdx => (prevIdx + 1) % 3);
      timeout = setTimeout(rotateImages, 3000);
    };
    
    // Start rotation after a delay
    timeout = setTimeout(() => {
      setIsLoaded(true);
      rotateImages();
    }, 600);

    return () => clearTimeout(timeout);
  }, []);

  // Typewriter effect logic
  useEffect(() => {
    const text = typewriterText[textIndex];
    let typingTimer;

    // Type or delete characters
    if (!isDeleting) {
      if (charIndex < text.length) {
        typingTimer = setTimeout(() => {
          setCurrentText(text.substring(0, charIndex + 1));
          setCharIndex(prevCharIndex => prevCharIndex + 1);
        }, 100);
      } else {
        // Start deleting after pause
        typingTimer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      if (charIndex > 0) {
        typingTimer = setTimeout(() => {
          setCurrentText(text.substring(0, charIndex - 1));
          setCharIndex(prevCharIndex => prevCharIndex - 1);
        }, 50);
      } else {
        setIsDeleting(false);
        setTextIndex((prevIndex) => (prevIndex + 1) % typewriterText.length);
      }
    }

    return () => clearTimeout(typingTimer);
  }, [textIndex, charIndex, isDeleting]);

  // Mouse move effect for subtle parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Profile image array
  const images = [
    "/assets/images/avatar.png",
  ];

  return (
    <main
      className="relative z-20 flex flex-col md:flex-row items-center justify-center min-h-[90vh] px-2 md:px-8 py-8 space-y-8 md:space-y-0 md:space-x-10 overflow-x-hidden"
      style={{ width: "100vw", minHeight: "82vh" }}
    >
      <FloatingElements />

      <ProfileImages imgIdx={imgIdx} images={images} />

      {/* Content Section */}
      <div
        className={`
          relative transition-all duration-1000 ease-out delay-200 w-full max-w-[580px]
          flex justify-center mx-auto
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        `}
      >
        <div
          className={`
            ${accents.glassBackground} ${accents.backdropBlur} ${accents.glassBorder}
            border rounded-2xl px-6 py-8 md:px-8 md:py-10 w-full max-w-[500px]
            flex flex-col items-center md:items-start text-center md:text-left
          `}
          style={{
            boxShadow: `0 25px 50px -12px ${accents.shadowColor}`,
            transform: `translate(${mousePos.x * -5}px, ${mousePos.y * -5}px)`,
            transition: 'transform 0.4s ease-out'
          }}
        >
          <div className={`space-y-4 ${accents.text}`}>
              {/* Welcome section */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in">
                <span className="wave-animation inline-block">👋</span>
                <span className="ml-3">Hello!</span>
              </h1>

              <div className="text-lg md:text-xl lg:text-2xl mb-6">
                I'm{" "}
                <span
                  className={`font-bold text-2xl md:text-3xl lg:text-4xl ${accents.nameColor} drop-shadow-sm`}
                >
                  Maria Mouratidi
                </span>
              </div>
              {/* Description */}
            <div className={`space-y-4 mb-10 ${accents.text} text-center md:text-left`}>
              <p className="text-lg md:text-xl leading-relaxed animate-fade-in-up">
                 <span className={`${accents.highlight} font-semibold`}>AI and Cognitive Science Specialist</span>
              </p>

              <TypewriterText currentText={currentText} accents={accents} />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400 justify-center md:justify-start">
              <a
                href="/resume.pdf"
                download
                className={`
                  group px-8 py-4 rounded-2xl font-semibold transition-all duration-300
                  ${accents.buttonPrimary}
                  transform hover:scale-105 hover:-translate-y-1
                  shadow-lg hover:shadow-xl
                  relative overflow-hidden text-center
                  whitespace-nowrap flex-1 sm:flex-none min-w-[200px]
                `}
              >
                <span className="relative z-10">Download Resume</span>
                <div className="freeze-effect" />
              </a>

              <button
                type="button"
                className={`
                  group px-8 py-4 rounded-2xl font-semibold transition-all duration-300
                  ${accents.buttonSecondary}
                  transform hover:scale-105 hover:-translate-y-1
                  shadow-lg hover:shadow-xl
                  relative overflow-hidden text-center
                  whitespace-nowrap flex-1 sm:flex-none min-w-[200px]
                `}
                onClick={handleScrollToContact}
              >
                <span className="relative z-10">Let's Connect</span>
                <div className="freeze-effect" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-10deg); }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .freeze-effect {
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, 
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,0.4) 50%,
            rgba(255,255,255,0) 100%
          );
          transform: translateX(-100%);
          transition: transform 0.6s ease-out;
        }

        .group:hover .freeze-effect {
          transform: translateX(100%);
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .wave-animation { animation: wave 2s ease-in-out infinite; }
        .animate-blink { animation: blink 1s infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }

        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }

        .profile-img-fade {
          transition: opacity 2.4s cubic-bezier(.4,0,.2,1);
        }

        @media (max-width: 1023px) {
          .profile-pic-container {
            min-width: 190px !important;
            min-height: 190px !important;
            max-width: 250px !important;
            max-height: 250px !important;
          }
        }
      `}</style>
    </main>
  );
}

export default React.memo(LandingPage);
