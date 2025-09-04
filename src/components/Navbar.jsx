import React, { useState, useEffect, useCallback } from "react";
import { useTheme } from "../ThemeContext";

const themeStyles = {
  icy: {
    bg: "bg-white/20 backdrop-blur-lg",
    border: "border border-cyan-300/60",
    link: "text-gray-800",
    active: "bg-white/80 text-gray-900",
    hover: "hover:bg-white/40 hover:text-gray-900",
    fill: "bg-white/60",
    outline: "ring-cyan-400",
    highlight: "bg-cyan-400/70",
    toggleBtn: "bg-black text-white hover:bg-black/80",
  },
  hot: {
    bg: "bg-yellow-50/20 backdrop-blur-lg",
    border: "border border-yellow-400/60",
    link: "text-black",
    active: "bg-white/80 text-black",
    hover: "hover:bg-yellow-100/40 hover:text-black",
    fill: "bg-yellow-100/70",
    outline: "ring-yellow-400",
    highlight: "bg-yellow-400/70",
    toggleBtn: "bg-black text-white hover:bg-black/80",
  },
  dark: {
    bg: "bg-gray-900/80 backdrop-blur-lg",
    border: "border border-gray-700/60",
    link: "text-white",
    active: "bg-gray-700/80 text-white",
    hover: "hover:bg-gray-800/70 hover:text-white",
    fill: "bg-gray-800/70",
    outline: "ring-blue-400",
    highlight: "bg-blue-400/70",
    toggleBtn: "bg-white text-black hover:bg-white/80",
  },
};

export default function Navbar({ sections = [], onNavClick }) {
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const themeStyle = themeStyles[theme] || themeStyles.icy;

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMenuClose = useCallback(() => setMenuOpen(false), []);
  const handleMenuToggle = useCallback(() => setMenuOpen(prev => !prev), []);

  // Close menu when escape key is pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        handleMenuClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [handleMenuClose]);

  // Prevent scrolling when menu is open on mobile
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // Calculate show nav based on scroll direction
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showNav, setShowNav] = useState(true);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > 100) {
        if (window.scrollY > lastScrollY) {
          setShowNav(false);
        } else {
          setShowNav(true);
        }
      } else {
        setShowNav(true);
      }
      setLastScrollY(window.scrollY);
    };

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          controlNavbar();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const navClass = `
    fixed top-0 left-0 right-0 z-50
    transition-all duration-300 ease-in-out
    ${showNav ? 'translate-y-0' : '-translate-y-full'}
    ${scrollY > 50 ? `${themeStyle.bg} ${themeStyle.border} shadow-lg` : ''}
  `;

  return (
    <>
      <nav className={navClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="text-lg font-medium tracking-wide">
                <span className="hidden md:inline">Maria Mouratidi</span>
                <span className="inline md:hidden">MM</span>
              </div>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {sections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => onNavClick(id)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-300
                    ${themeStyle.link} ${themeStyle.hover}
                    ${id === 'home' && scrollY < 100 ? 'opacity-0' : 'opacity-100'}
                  `}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={handleMenuToggle}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 focus:outline-none"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {/* Hamburger icon */}
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`md:hidden fixed top-0 right-0 bottom-0 z-50 w-64
          rounded-l-2xl border-l px-6 py-8 shadow-2xl
          ${themeStyle.bg} ${themeStyle.border}
          ${menuOpen ? 'translate-x-0' : 'translate-x-full pointer-events-none'}
          transition-transform duration-300
        `}
        style={{ minWidth: 220 }}
      >
        <button
          onClick={handleMenuClose}
          className="absolute top-4 right-4 text-lg rounded-full p-1 hover:bg-black/60 text-white bg-black/40 transition-colors"
          aria-label="Close menu"
        >
          <svg width={22} height={22} viewBox="0 0 22 22" aria-hidden="true">
            <line x1="5" y1="5" x2="17" y2="17" stroke="currentColor" strokeWidth={2} />
            <line x1="17" y1="5" x2="5" y2="17" stroke="currentColor" strokeWidth={2} />
          </svg>
        </button>
        <div className="flex flex-col space-y-2 mt-8">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => {
                onNavClick(id);
                handleMenuClose();
              }}
              className={`
                px-4 py-3 rounded-lg text-base font-medium
                transition-all duration-300
                ${themeStyle.link} ${themeStyle.hover}
                text-left
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Backdrop for mobile menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={handleMenuClose}
        />
      )}
    </>
  );
}
