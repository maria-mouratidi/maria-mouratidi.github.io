import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";

// Pages
import LandingPage from "./pages/LandingPage";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

// Components
import Navbar from "./components/Navbar";
import ThemeProvider, { useTheme } from "./ThemeContext";

// Loading component for lazy loading
const PageLoader = React.memo(() => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-70 backdrop-blur-sm">
    <div className="relative">
      <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-blue-300 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
    </div>
  </div>
));

// Theme styles for ScrollToTop
const themeStyles = {
  icy: {
    primaryButton: "bg-cyan-500 hover:bg-cyan-600 text-white",
  },
  hot: {
    primaryButton: "bg-yellow-500 hover:bg-yellow-600 text-white",
  },
  dark: {
    primaryButton: "bg-blue-600 hover:bg-blue-700 text-white",
  }
};

// ScrollToTop component
const ScrollToTop = ({ theme, activeSection }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const styles = themeStyles[theme] || themeStyles.icy;

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Don't show on landing page
  if (!showScrollTop || activeSection === "home") return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 p-3 rounded-full ${styles.primaryButton} shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50`}
      aria-label="Scroll to top"
    >
      <FaArrowUp className="text-lg" />
    </button>
  );
};

// Theme background component
const ThemeBackground = ({ activeSection }) => {
  return (
    <div className="fixed inset-0 z-0 transition-colors duration-1000">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100"></div>
    </div>
  );
};

const SECTIONS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function Portfolio() {
  const { theme } = useTheme();
  const sectionRefs = SECTIONS.reduce((acc, { id }) => {
    acc[id] = useRef();
    return acc;
  }, {});

  const [introDone, setIntroDone] = useState(true);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const [isLeavingLanding, setIsLeavingLanding] = useState(false);
  const [loadedSections, setLoadedSections] = useState(new Set(['home', 'about', 'projects', 'contact']));

  useEffect(() => {
    const handler = () => {
      const offset = window.innerHeight / 2;
      let current = SECTIONS[0].id;
      
      for (const { id } of SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < offset) {
          current = id;
        }
      }
      
      setActiveSection(current);
      setIsLeavingLanding(current !== "home");
    };

    let ticking = false;
    const throttledHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handler();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandler, { passive: true });
    handler(); // Initial call
    return () => window.removeEventListener("scroll", throttledHandler);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: "smooth", 
        block: "start",
        inline: "nearest"
      });
    }
  };

  // Render each section
  const renderSection = React.useCallback((id) => {
    if (id === "home") {
      return (
        <div
          className={`flex w-full h-full items-center justify-center transition-all duration-700 ${
            isLeavingLanding
              ? "opacity-0 translate-y-24 pointer-events-none"
              : "opacity-100 translate-y-0"
          }`}
        >
          <LandingPage />
        </div>
      );
    }

    return (
      <React.Suspense fallback={<PageLoader />}>
        {id === "about" && <About />}
        {id === "projects" && <Projects />}
        {id === "contact" && <Contact />}
      </React.Suspense>
    );
  }, [isLeavingLanding]);

  return (
    <>
      <ThemeBackground activeSection={activeSection} />
      
      <Navbar sections={SECTIONS} onNavClick={scrollToSection} />

      {/* ScrollToTop component - shows in all sections except home */}
      <ScrollToTop theme={theme} activeSection={activeSection} />

      {/* Main content */}
      <div className="relative">
        {SECTIONS.map(({ id, label }) => (
          <section
            key={id}
            id={id}
            ref={sectionRefs[id]}
            className={`min-h-screen flex items-center justify-center ${
              id === "contact" ? "pb-0" : ""
            }`}
            style={{
              scrollSnapAlign: "start"
            }}
          >
            {renderSection(id, label)}
          </section>
        ))}
      </div>
    </>
  );
}

// Memoized main Portfolio component
const MemoizedPortfolio = React.memo(Portfolio);

// Redirect handler for GitHub Pages
const Redirector = () => {
  useEffect(() => {
    window.location.replace('/');
  }, []);
  return <PageLoader />;
};

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<MemoizedPortfolio />} />
          <Route path="/:slug" element={<Redirector />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
