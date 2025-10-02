import React, { useState, useEffect } from "react";
import {
  FaRegEnvelope, FaLocationArrow, FaHeart, FaReact,
   FaLinkedin,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoCall } from "react-icons/io5";
import { SiGithub } from "react-icons/si";
import { useTheme } from "../ThemeContext";

// =================== Theme Styles ===================
const themeStyles = {
  light: {
    cardBg: "bg-white/15 backdrop-blur-xl border-yellow-200/20",
    cardHover: "hover:bg-yellow-50/25 hover:border-yellow-400/40",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-yellow-600",
    icon: "text-yellow-600",
    footerBg: "bg-gradient-to-t from-yellow-50/20 to-yellow-50/10 backdrop-blur-xl border-t border-yellow-200/20",
    primaryButton: "bg-yellow-500 hover:bg-yellow-600 text-white",
    glow: "shadow-yellow-400/20"
  },
  dark: {
    cardBg: "bg-gray-900/15 backdrop-blur-xl border-gray-700/20",
    cardHover: "hover:bg-gray-900/25 hover:border-blue-500/40",
    text: "text-gray-100",
    textSecondary: "text-gray-300",
    accent: "text-blue-400",
    icon: "text-blue-400",
    footerBg: "bg-gradient-to-t from-gray-900/20 to-gray-900/10 backdrop-blur-xl border-t border-gray-700/20",
    primaryButton: "bg-blue-600 hover:bg-blue-700 text-white",
    glow: "shadow-blue-400/20"
  }
};

const emailInitial = "mouratidi.m";
const emailDomains = [
  { domain: "gmail.com", color: "#06b622" },
  { domain: "gmail.com", color: "#ec4899" },
  { domain: "gmail.com", color: "#a56635" }
];

// Update the contactInfo array to remove direct values
const contactInfo = [
  {
    icon: <MdEmail />,
    name: "Email",
    url: "mailto:mouratidi.m@gmail.com",
    color: "text-blue-500",
    description: "I prefer email :)"
  },
  {
    icon: <IoCall />,
    name: "Phone",
    url: "tel:+31653490108",
    color: "text-green-500",
    description: "Call or text"
  },
  {
    icon: <FaLocationArrow />,
    name: "Location",
    url: "https://maps.google.com/?q=Utrecht,Netherlands",
    color: "text-red-500",
    description: "Utrecht, Netherlands"
  }
];

const socialLinks = [
  {
    icon: <SiGithub />,
    name: "GitHub",
    url: "https://github.com/maria-mouratidi",
    color: "text-gray-800 dark:text-gray-200",
    description: "Find my projects"
  },
  {
    icon: <FaLinkedin />,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/maria-mouratidi",
    color: "text-blue-600",
    description: "Let's connect"
  },
];

// Social card (old card grid style)
const SocialCard = ({ social, index, theme }) => {
  const [isVisible, setIsVisible] = useState(false);
  const styles = themeStyles[theme];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 120);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <a
      href={social.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`block p-4 rounded-xl border transition-all duration-500 ${styles.cardBg} ${styles.cardHover} shadow-lg transform ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} group`}
      style={{ transitionDelay: `${index * 75}ms` }}
      aria-label={social.name}
      title={social.name}
    >
      <div className="text-center">
        <div className={`inline-flex p-3 rounded-lg ${styles.cardBg} border mb-3 group-hover:scale-110 transition-transform duration-300`}>
          <span className={`text-2xl ${social.color}`}>{social.icon}</span>
        </div>
        <h3 className={`font-semibold ${styles.text} mb-1`}>{social.name}</h3>
        <p className={`text-xs ${styles.textSecondary}`}>{social.description}</p>
      </div>
    </a>
  );
};

export default function Contact() {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.light;
  const currentYear = new Date().getFullYear();
  
  // Combine contactInfo and socialLinks into a single array
  const allLinks = [...contactInfo, ...socialLinks];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 relative">
      {/* Header centered */}
      <div className="mb-8 flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className={`text-5xl md:text-6xl font-bold ${styles.text} mb-4`}>
            Get In <span className={styles.accent}>Touch</span>
          </h1>
          <p className={`text-xl ${styles.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
            I'm open to new opportunities!
          </p>
        </div>
      </div>

      {/* Combined Contact Information & Social Links in one grid */}
      <div className="mb-16">
        
        {/* Centered container for all links */}
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-20xl">
            {allLinks.map((item, index) => (
              <SocialCard key={item.name} social={item} index={index} theme={theme} />
            ))}
          </div>
        </div>
      </div>

      {/* Footer remains unchanged */}
      <footer className={`relative mt-20 ${styles.footerBg}`}>
        <div className={`border-t border-opacity-20 ${styles.cardBg} backdrop-blur-xl`}>
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className={`text-sm ${styles.textSecondary} text-center md:text-left break-words w-full`}>
                <p className="flex items-center justify-center md:justify-start gap-2 flex-wrap break-all w-full">
                  {currentYear} Maria Mouratidi
                  <FaHeart className={`${styles.accent} animate-pulse`} />
                </p>
                <p className="text-xs mt-1 opacity-60">
                  Design adapted from{" "}
                  <a 
                    href="https://abshetty.in/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`${styles.accent} hover:underline`}
                  >
                    A.B. Shetty
                  </a>
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm whitespace-nowrap">
                <span className={styles.textSecondary}>Powered by</span>
                <FaReact className={`${styles.accent} animate-spin-slow`} />
                <span className={styles.textSecondary}>React</span>
              </div>
            </div>
          </div>
        </div>
        {/* Custom CSS for animations */}
        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg);}
            to { transform: rotate(360deg);}
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .animate-spin-slow, .animate-pulse { animation: none; }
          }
        `}</style>
      </footer>
    </div>
  );
}