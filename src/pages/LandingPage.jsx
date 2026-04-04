import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useTheme } from "../ThemeContext";

const accentsMap = {
  light: {
    highlight: "text-teal-700",
    secondary: "text-gray-500",
    text: "text-gray-600",
    buttonPrimary: "bg-gray-900 hover:bg-gray-800 text-white border-none",
    buttonSecondary: "text-gray-500 hover:text-teal-700 border-gray-200/50 hover:border-teal-500/30",
    nameColor: "text-teal-700",
  },
  dark: {
    highlight: "text-teal-600",
    secondary: "text-gray-400",
    text: "text-gray-400",
    buttonPrimary: "bg-white hover:bg-gray-100 text-gray-900 border-none",
    buttonSecondary: "text-gray-400 hover:text-teal-600 border-white/[0.10] hover:border-teal-600/30",
    nameColor: "text-teal-600",
  }
};

const typewriterText = [
  "AI Research",
  "AI Engineering",
];

// Memoized typewriter component
const TypewriterText = React.memo(({ currentText, accents }) => (
  <div className="h-7 flex items-center">
    <span className={`text-base md:text-lg ${accents.secondary} font-light tracking-wide font-mono`}>
      {currentText}
      <span className="animate-blink ml-0.5 opacity-60">|</span>
    </span>
  </div>
));

function LandingPage() {
  const { theme } = useTheme();
  const accents = useMemo(() => accentsMap[theme] );

  const [isLoaded, setIsLoaded] = useState(false);

  // Typewriter effect
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

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

  return (
    <main
      className="relative z-20 flex items-center min-h-[90vh] px-6 md:px-16 lg:px-24 overflow-x-hidden"
      style={{ width: "100vw", minHeight: "82vh" }}
    >
      {/* Left-aligned content */}
      <div
        className={`
          max-w-2xl transition-all duration-1000 ease-out
          ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
        `}
      >
        {/* Name & Title */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mb-3 animate-fade-in">
            <span className={accents.nameColor}>Maria Mouratidi</span>
          </h1>

          <TypewriterText currentText={currentText} accents={accents} />
        </div>

        {/* Subtitle */}
        <p className={`text-base md:text-lg ${accents.text} font-light leading-relaxed mb-10 max-w-lg animate-fade-in-up`}>
          Researching how AI can model human language and designing intelligent systems.
        </p>

        {/* Small, refined buttons */}
        <div className="flex items-center gap-6 animate-fade-in-up delay-400">
          <a
            href="/resume.pdf"
            download
            className={`
              px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300
              ${accents.buttonPrimary}
              hover:scale-105
            `}
          >
            Resume
          </a>

          <button
            type="button"
            className={`
              px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300
              border ${accents.buttonSecondary}
              hover:scale-105
            `}
            onClick={handleScrollToContact}
          >
            Let's Talk
          </button>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .animate-blink { animation: blink 1s infinite; }
        .animate-fade-in { animation: fade-in 0.8s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </main>
  );
}

export default React.memo(LandingPage);
