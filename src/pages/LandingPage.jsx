import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useTheme } from "../ThemeContext";

const images = [
  "/images/profile0.png",
];

const accentsMap = {
  light: {
    highlight: "text-[#d97706]", // Lighter amber for better readability
    secondary: "text-amber-700", // Lighter than amber-800
    text: "text-amber-800", // Lighter than amber-900
    glassBackground: "bg-amber-50/50", // Very light amber background
    glassBorder: "border-amber-300/40", // Softer border
    buttonPrimary: "bg-amber-500 hover:bg-amber-600 text-white border-none", // Lighter amber button
    buttonSecondary: "bg-white/95 text-amber-700 hover:bg-amber-50 border-amber-200", // Lighter text
    imageBorder: "border-amber-300/25", // Softer image border
    shadowColor: "rgba(217, 119, 6, 0.12)", // Lighter shadow
    nameColor: "text-amber-600", // Lighter amber for name
    backdropBlur: "backdrop-blur-[20px]",
  },
  dark: {
    highlight: "text-[#8ba3d4]", // Lighter, softer blue
    secondary: "text-white/80",
    text: "text-white/90",
    glassBackground: "bg-[#1a1f2e]/[0.75]", // Dark blue background
    glassBorder: "border-[#5a6c9e]/[0.25]", // Lighter border
    buttonPrimary: "bg-[#5a6c9e]/80 hover:bg-[#6b7db0] text-white border-none", // Lighter button
    buttonSecondary: "bg-[#202942]/90 text-[#8ba3d4] hover:bg-[#2a365a] border-[#5a6c9e]/25", // Lighter text and border
    imageBorder: "border-[#5a6c9e]/[0.25]", // Lighter image border
    shadowColor: "rgba(90, 108, 158, 0.15)", // Lighter shadow
    nameColor: "text-[#8ba3d4]", // Lighter blue for name
    backdropBlur: "backdrop-blur-[20px]",
  }
};

const typewriterText = [
  "NLP Research",
  "AI Engineering", 
];

// Memoized floating elements component
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
          animationDuration: `${6 + i * 0.8}s`,
        }}
      />
    ))}
  </div>
));

// Memoized profile image component
const ProfileImages = React.memo(({ imgIdx, images }) => (
  <div
    className="flex items-center justify-center profile-pic-container"
    style={{
      marginTop: "-80px", // <-- Add this line
      flex: "0 0 auto",
      minWidth: "320px",
      minHeight: "320px", 
      width: "100%",
      height: "100%",
      maxWidth: "420px",
      maxHeight: "620px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}
  >
    <div
      className="rounded-3xl overflow-hidden bg-transparent relative flex items-center justify-center"
      style={{
        width: "100%",
        height: "100%",
        minHeight: 650,
        minWidth: 650,
        maxWidth: 650,
        maxHeight: 650,
        aspectRatio: "1/1",
      }}
    >
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`Profile ${i + 1}`}
          loading={i === 0 ? "eager" : "lazy"} // Load first image eagerly
          className={`
            absolute rounded-3xl w-full h-full object-contain object-center
            profile-img-fade
            ${imgIdx === i ? "opacity-100 z-10" : "opacity-0 z-0"}
          `}
          style={{
            transition: "opacity 2.4s cubic-bezier(.4,0,.2,1)",
            background: "transparent",
            borderRadius: "1.5rem"
          }}
        />
      ))}
    </div>
  </div>
));

// Memoized typewriter component
const TypewriterText = React.memo(({ currentText, accents }) => (
  <div className="h-8 flex items-center md:justify-start justify-center">
    <span className={`text-lg md:text-xl ${accents.secondary} font-mono`}>
      {currentText}
      <span className="animate-blink ml-1">|</span>
    </span>
  </div>
));

// Main component
function LandingPage() {
  const { theme } = useTheme();
  const accents = useMemo(() => accentsMap[theme] );

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

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const fullText = typewriterText[textIndex];

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < fullText.length) {
        setCurrentText(fullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setCurrentText(fullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === fullText.length) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setTextIndex((textIndex + 1) % typewriterText.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, textIndex]);

  // Optimized mouse parallax effect
  useEffect(() => {
    let rafId;
    const handleMouseMove = (e) => {
      if (rafId) return; // Skip if already scheduled
      
      rafId = requestAnimationFrame(() => {
        setMousePos({
          x: (e.clientX - window.innerWidth / 2) / 100,
          y: (e.clientY - window.innerHeight / 2) / 100
        });
        rafId = null;
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <main
      className="relative z-20 flex flex-col md:flex-row items-center justify-center min-h-[90vh] px-2 md:px-8 py-8 space-y-8 md:space-y-0 md:space-x-10 overflow-x-hidden"
      style={{ width: "100vw", minHeight: "82vh" }}
    >
      <FloatingElements />

      <ProfileImages imgIdx={0} images={images} />

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
            border-2 rounded-[2rem] p-8 md:p-10 lg:p-12 relative overflow-hidden
            hover:scale-[1.01] transition-all duration-700 ease-out
            shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]
            before:absolute before:inset-0 before:rounded-[2rem] before:p-[1px]
            before:bg-gradient-to-br before:from-white/20 before:via-white/10 before:to-transparent before:-z-10
            mx-auto
          `}
          style={{
            maxWidth: 580,
            minWidth: 0,
            minHeight: "400px",
            transform: `translate(${-mousePos.x * 0.2}px, ${-mousePos.y * 0.2}px)`
          }}
        >
          <div className="relative z-10">
            {/* Greeting */}
            <div className="mb-8 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 animate-fade-in flex">
                <img 
                  src="/images/pixel-comp.png" // Replace with the path to your custom icon
                  alt="Pixelated Computer Icon"
                  className="inline-block h-10 md:h-12 mr-3"
                />
                <span className="ml-3">Welcome!</span>
              </h1>

              <div className="text-lg md:text-xl lg:text-2xl mb-6">
                I'm{" "}
                <span
                  className={`font-bold text-2xl md:text-3xl lg:text-4xl ${accents.nameColor} drop-shadow-sm`}
                >
                  Maria Mouratidi
                </span>
              </div>

              <div className={`space-y-4 mb-10 ${accents.text} text-center md:text-left`}>
                {/* <p className="text-lg md:text-xl leading-relaxed animate-fade-in-up">
                  <span className={`${accents.highlight} font-semibold`}>NLP Research and AI Engineering</span>
                </p> */}
              </div>

              <TypewriterText currentText={currentText} accents={accents} />
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400 justify-center md:justify-start">
              <a
                href="/resume.pdf" // Replace with the actual path to your CV
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
        @media (max-width: 750px) {
          .profile-pic-container {
            min-width: 80vw !important;
            min-height: 80vw !important;
            max-width: 90vw !important;
            max-height: 90vw !important;
          }
          .profile-img-fade {
            max-width: 100vw !important;
            max-height: 100vw !important;
          }
        }
        @media (max-width: 640px) {
          .profile-pic-container {
            min-width: 92vw !important;
            min-height: 92vw !important;
            max-width: 99vw !important;
            max-height: 99vw !important;
          }
        }
        /* Prevent horizontal scroll on mobile */
        @media (max-width: 767px) {
          main {
            overflow-x: hidden !important;
          }
          .profile-pic-container {
            min-width: 0 !important;
            min-height: 0 !important;
            max-width: 96vw !important;
            max-height: 96vw !important;
            width: 90vw !important;
            height: 90vw !important;
          }
        }
      `}</style>
    </main>
  );
}

export default React.memo(LandingPage);