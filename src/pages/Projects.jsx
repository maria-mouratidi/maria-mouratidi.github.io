import React, { useState, useRef, useEffect } from "react";
import {
  FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight, 
  FaFilter, FaCode
} from "react-icons/fa";
import {
  SiPython, SiReact, SiTensorflow, SiPytorch, SiJupyter, 
  SiJavascript, SiScikitlearn
} from "react-icons/si";

import { useTheme } from "../ThemeContext";

// Theme Styles
const themeStyles = {
  icy: {
    cardBg: "bg-white/10 backdrop-blur-xl border-white/20",
    cardHover: "hover:bg-white/20 hover:border-cyan-300/40 hover:shadow-cyan-400/30",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-cyan-600",
    button: "bg-cyan-100/50 text-cyan-700 hover:bg-cyan-200/80",
    buttonOutline: "border border-cyan-300 text-cyan-700",
    glow: "shadow-cyan-500/10",
    tabBg: "bg-white/10",
    tabActive: "bg-white/30 text-gray-800",
    tabHover: "hover:bg-white/20",
    counter: "bg-cyan-400/20 text-cyan-800",
  },
  hot: {
    cardBg: "bg-white/10 backdrop-blur-xl border-white/20",
    cardHover: "hover:bg-white/20 hover:border-yellow-300/40 hover:shadow-yellow-400/30",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-yellow-600",
    button: "bg-yellow-100/50 text-yellow-700 hover:bg-yellow-200/80",
    buttonOutline: "border border-yellow-300 text-yellow-700",
    glow: "shadow-yellow-500/10",
    tabBg: "bg-white/10",
    tabActive: "bg-white/30 text-gray-800",
    tabHover: "hover:bg-white/20",
    counter: "bg-yellow-400/20 text-yellow-800",
  },
  dark: {
    cardBg: "bg-gray-900/70 backdrop-blur-xl border-gray-700/40",
    cardHover: "hover:bg-gray-800/90 hover:border-blue-500/50 hover:shadow-blue-500/30",
    text: "text-gray-100",
    textSecondary: "text-gray-300",
    accent: "text-blue-400",
    button: "bg-blue-900/30 text-blue-300 hover:bg-blue-800/60",
    buttonOutline: "border border-blue-700 text-blue-400",
    glow: "shadow-blue-500/10",
    tabBg: "bg-gray-800/60",
    tabActive: "bg-blue-900/80 text-white",
    tabHover: "hover:bg-gray-700/70",
    counter: "bg-blue-900/50 text-blue-200",
  },
};

// Tech icons mapping
const techIcons = {
  Python: <SiPython className="text-blue-500" />,
  React: <SiReact className="text-blue-500" />,
  TensorFlow: <SiTensorflow className="text-orange-500" />,
  PyTorch: <SiPytorch className="text-red-500" />,
  Jupyter: <SiJupyter className="text-orange-600" />,
  JavaScript: <SiJavascript className="text-yellow-500" />,
  "scikit-learn": <SiScikitlearn className="text-blue-500" />,
};

// Projects data
const projects = [
  {
    id: 1,
    title: "NLP Research Platform",
    description: "A comprehensive platform for natural language processing research, featuring sentiment analysis, text classification, and named entity recognition capabilities.",
    image: "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?auto=format&fit=crop&w=600&q=80",
    technologies: ["Python", "TensorFlow", "scikit-learn"],
    status: "Completed",
    github: "https://github.com/mariamouratidi/nlp-research",
    live: "https://nlp-research-demo.herokuapp.com/",
    forks: 8,
    stars: 15
  },
  {
    id: 2,
    title: "Cognitive Modeling Toolkit",
    description: "A toolkit for implementing and testing cognitive models based on psychological theories, with visualization tools for model outputs and comparisons.",
    image: "https://images.unsplash.com/photo-1507146153580-69a1fe6d8aa1?auto=format&fit=crop&w=600&q=80",
    technologies: ["Python", "PyTorch", "Jupyter"],
    status: "Ongoing",
    github: "https://github.com/mariamouratidi/cognitive-modeling",
    live: "#",
    forks: 5,
    stars: 12
  },
  {
    id: 3,
    title: "Interactive Research Dashboard",
    description: "A web-based dashboard for visualizing research data and allowing interactive exploration of AI model outputs and performance metrics.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
    technologies: ["React", "JavaScript", "Python"],
    status: "Completed",
    github: "https://github.com/mariamouratidi/research-dashboard",
    live: "https://research-dashboard-demo.netlify.app/",
    forks: 3,
    stars: 8
  },
  {
    id: 4,
    title: "Emotion Recognition System",
    description: "A system that combines facial expression and speech analysis to provide comprehensive emotion recognition capabilities for human-computer interaction.",
    image: "https://images.unsplash.com/photo-1601056639638-c51312ffcbd9?auto=format&fit=crop&w=600&q=80",
    technologies: ["Python", "TensorFlow", "PyTorch"],
    status: "Ongoing",
    github: "https://github.com/mariamouratidi/emotion-recognition",
    live: "#",
    forks: 2,
    stars: 7
  },
  {
    id: 5,
    title: "AI Ethics Framework",
    description: "A framework for evaluating and ensuring the ethical development and deployment of AI systems, with tools for bias detection and transparency.",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=600&q=80",
    technologies: ["Python", "Jupyter", "scikit-learn"],
    status: "Completed",
    github: "https://github.com/mariamouratidi/ai-ethics",
    live: "https://ai-ethics-toolkit.vercel.app/",
    forks: 6,
    stars: 14
  }
];

// Utility functions
const useIsMobile = (breakpoint = 640) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [breakpoint]);

  return isMobile;
};

// Function to calculate card positioning for carousel
const getCardStyle = (index, currentIndex, projects) => {
  const totalCards = projects.length;
  const normalizedIndex = (index - currentIndex + totalCards) % totalCards;
  let transform = '';
  let zIndex = 0;
  let opacity = 1;

  if (normalizedIndex === 0) {
    transform = 'translateX(0) scale(1)';
    zIndex = 10;
  } else if (normalizedIndex === 1 || normalizedIndex === totalCards - 1) {
    transform = normalizedIndex === 1 
      ? 'translateX(40%) scale(0.85)' 
      : 'translateX(-40%) scale(0.85)';
    zIndex = 9;
    opacity = 0.7;
  } else if (normalizedIndex === 2 || normalizedIndex === totalCards - 2) {
    transform = normalizedIndex === 2 
      ? 'translateX(75%) scale(0.7)' 
      : 'translateX(-75%) scale(0.7)';
    zIndex = 8;
    opacity = 0.4;
  } else {
    transform = 'translateX(0) scale(0.7)';
    zIndex = 0;
    opacity = 0;
  }

  return {
    transform,
    zIndex,
    opacity,
    transition: 'all 0.5s ease-out',
  };
};

// Mobile Card Component
const MobileCard = ({ project, styles, techIcons }) => {
  return (
    <div
      className={`
        mb-6 ${styles.cardBg} border rounded-2xl p-5
        ${styles.cardHover} transition-all duration-300
        ${styles.glow} shadow-lg
      `}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-48 object-cover rounded-xl mb-4"
        loading="lazy"
      />
      <h3 className={`text-xl font-bold ${styles.text} mb-2`}>{project.title}</h3>
      <p className={`${styles.textSecondary} text-sm mb-4 line-clamp-2`}>
        {project.description}
      </p>
      
      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map(tech => (
          <span
            key={tech}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${styles.button}`}
          >
            {techIcons[tech] || <FaCode />}
            <span>{tech}</span>
          </span>
        ))}
      </div>

      {/* Project links */}
      <div className="flex gap-3">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${styles.button} border px-3 py-2 rounded-lg
            flex items-center gap-2 text-xs font-medium
            transition-all duration-300 hover:scale-105
            flex-1 justify-center
          `}
        >
          <FaGithub />
          GitHub
        </a>
        <a
          href={project.live !== "#" ? project.live : "#"}
          target="_blank"
          rel={project.live !== "#" ? "noopener noreferrer" : ""}
          className={`
            ${styles.button} border px-3 py-2 rounded-lg
            flex items-center gap-2 text-xs font-medium
            transition-all duration-300 hover:scale-105
            flex-1 justify-center
            ${project.live === "#" ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          <FaExternalLinkAlt />
          Live
        </a>
      </div>
    </div>
  );
};

// Desktop Card
const DesktopCard = ({ project, index, currentIndex, filteredProjects, styles, techIcons, goToSlide }) => {
  const cardStyle = getCardStyle(index, currentIndex, filteredProjects);
  const isCenter = (index - currentIndex + filteredProjects.length) % filteredProjects.length === 0;
  return (
    <div
      className={`
        absolute top-0
        w-[340px] h-[470px]
        ${styles.cardBg} ${isCenter ? styles.cardHover : ''}
        border rounded-2xl p-7 ${styles.glow} shadow-2xl
        cursor-pointer select-none
        ${isCenter ? 'hover:scale-105' : ''}
      `}
      style={{
        transform: cardStyle.transform,
        zIndex: cardStyle.zIndex,
        opacity: cardStyle.opacity,
        transition: cardStyle.transition
      }}
      onClick={() => goToSlide(index)}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-40 object-cover rounded-xl mb-4"
        loading="lazy"
      />
      <h3 className={`text-xl font-bold ${styles.text} mb-2 line-clamp-1`}>{project.title}</h3>
      <p className={`${styles.textSecondary} text-sm mb-4 line-clamp-2`}>
        {project.description}
      </p>
      
      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map(tech => (
          <span
            key={tech}
            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${styles.button}`}
          >
            {techIcons[tech] || <FaCode />}
            <span>{tech}</span>
          </span>
        ))}
      </div>

      {/* Status badge */}
      <div className="my-4">
        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
          project.status === 'Completed' 
            ? 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400' 
            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400'
        }`}>
          {project.status}
        </span>
      </div>

      {/* Project links */}
      <div className="flex gap-3 mt-auto pt-4">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className={`
            ${styles.button} border px-3 py-2 rounded-lg
            flex items-center gap-2 text-xs font-medium
            transition-all duration-300 hover:scale-105
            flex-1 justify-center
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <FaGithub />
          GitHub
        </a>
        <a
          href={project.live !== "#" ? project.live : "#"}
          target="_blank"
          rel={project.live !== "#" ? "noopener noreferrer" : ""}
          className={`
            ${styles.button} border px-3 py-2 rounded-lg
            flex items-center gap-2 text-xs font-medium
            transition-all duration-300 hover:scale-105
            flex-1 justify-center
            ${project.live === "#" ? "opacity-50 cursor-not-allowed" : ""}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          <FaExternalLinkAlt />
          Live
        </a>
      </div>
    </div>
  );
};

// Main Component
const Projects = () => {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
  const isMobile = useIsMobile(768);

  const [activeStatus, setActiveStatus] = useState("All");
  
  // Initialize with first project
  const [currentIndex, setCurrentIndexState] = useState(0);

  // Create refs for carousel and sliding functionality
  const carouselRef = useRef(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isDraggingRef = useRef(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Filter projects based on selected status
  const filteredProjects = projects.filter(project => 
    activeStatus === "All" || project.status === activeStatus
  );

  // Update current index if needed after filtering
  useEffect(() => {
    if (currentIndex >= filteredProjects.length) {
      setCurrentIndexState(0);
    }
  }, [filteredProjects.length, currentIndex]);

  // Set current slide with transition
  const setCurrentIndex = (index) => {
    setIsTransitioning(true);
    setCurrentIndexState(index);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Go to specific slide
  const goToSlide = (index) => {
    if (isTransitioning) return;
    if ((index - currentIndex + filteredProjects.length) % filteredProjects.length === 0) {
      // Selected the current center slide, potentially handle differently
      return;
    }
    setCurrentIndex(index);
  };

  // Navigation functions
  const nextSlide = () => {
    if (isTransitioning) return;
    setCurrentIndex((currentIndex + 1) % filteredProjects.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setCurrentIndex((currentIndex - 1 + filteredProjects.length) % filteredProjects.length);
  };

  // Swipe handlers
  const handleStart = (e) => {
    if (isTransitioning) return;
    isDraggingRef.current = true;
    const clientX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    startXRef.current = clientX;
    startYRef.current = clientY;
  };

  const handleMove = (e) => {
    if (!isDraggingRef.current || isTransitioning) return;
    const clientX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === 'mousemove' ? e.clientY : e.touches[0].clientY;
    const diffX = startXRef.current - clientX;
    const diffY = startYRef.current - clientY;
    
    if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      isDraggingRef.current = false;
    }
  };

  const handleEnd = () => {
    isDraggingRef.current = false;
  };

  // Attach event listeners
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    carousel.addEventListener('touchstart', handleStart);
    carousel.addEventListener('touchmove', handleMove);
    carousel.addEventListener('touchend', handleEnd);
    carousel.addEventListener('mousedown', handleStart);
    carousel.addEventListener('mousemove', handleMove);
    carousel.addEventListener('mouseup', handleEnd);
    carousel.addEventListener('mouseleave', handleEnd);

    return () => {
      carousel.removeEventListener('touchstart', handleStart);
      carousel.removeEventListener('touchmove', handleMove);
      carousel.removeEventListener('touchend', handleEnd);
      carousel.removeEventListener('mousedown', handleStart);
      carousel.removeEventListener('mousemove', handleMove);
      carousel.removeEventListener('mouseup', handleEnd);
      carousel.removeEventListener('mouseleave', handleEnd);
    };
  }, [isTransitioning, filteredProjects.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isTransitioning]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 relative">
      {/* Header */}
      <div className="mb-16 flex flex-col items-center">
        <div className="text-center max-w-2xl">
          <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold ${styles.text} mb-4`}>
            My <span className={styles.accent}>Projects</span>
          </h1>
          <p className={`text-lg ${styles.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
            Explore my portfolio of AI research projects, cognitive modeling tools, and interactive applications.
          </p>
        </div>
      </div>

      {/* Project Filter */}
      <div className="flex justify-center mb-10">
        <div className={`inline-flex rounded-lg p-1 ${styles.tabBg}`}>
          {["All", "Completed", "Ongoing"].map(status => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium 
                transition-all duration-300
                ${activeStatus === status ? styles.tabActive : styles.tabHover}
                flex items-center gap-2
              `}
            >
              {status === "All" ? (
                <FaFilter className="text-xs" />
              ) : status === "Completed" ? (
                <span>✓</span>
              ) : (
                <span>⟳</span>
              )}
              {status}
              <span className={`text-xs px-1.5 py-0.5 rounded-full ${styles.counter}`}>
                {status === "All" 
                  ? projects.length 
                  : projects.filter(p => p.status === status).length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid/Carousel */}
      {isMobile ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <MobileCard 
              key={project.id}
              project={project}
              styles={styles}
              techIcons={techIcons}
            />
          ))}
        </div>
      ) : (
        <div className="relative h-[500px] my-10">
          <div 
            ref={carouselRef}
            className="absolute inset-0 flex items-center justify-center touch-pan-x"
          >
            {filteredProjects.map((project, idx) => (
              <DesktopCard
                key={project.id}
                project={project}
                index={idx}
                currentIndex={currentIndex}
                filteredProjects={filteredProjects}
                styles={styles}
                techIcons={techIcons}
                goToSlide={goToSlide}
              />
            ))}
          </div>
          
          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            disabled={isTransitioning}
            className={`
              absolute left-4 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 rounded-full flex items-center justify-center
              ${styles.button} border shadow-lg
              transition-all duration-300 hover:scale-110
              ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextSlide}
            disabled={isTransitioning}
            className={`
              absolute right-4 top-1/2 -translate-y-1/2 z-20
              w-10 h-10 rounded-full flex items-center justify-center
              ${styles.button} border shadow-lg
              transition-all duration-300 hover:scale-110
              ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <FaChevronRight />
          </button>
          
          {/* Carousel indicators */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-2">
            {filteredProjects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${idx === currentIndex 
                    ? `w-6 ${styles.accent} bg-current` 
                    : `bg-gray-400/40 hover:bg-gray-400/60`
                  }
                `}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className={`absolute top-20 left-10 w-32 h-32 ${styles.accent} opacity-10 rounded-full blur-3xl animate-pulse`} />
        <div className={`absolute bottom-20 right-10 w-24 h-24 ${styles.accent} opacity-10 rounded-full blur-2xl animate-pulse delay-1000`} />
        <div className={`absolute top-1/2 left-1/2 w-40 h-40 ${styles.accent} opacity-5 rounded-full blur-3xl animate-pulse delay-500`} />
      </div>
      <style>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .touch-pan-x {
          touch-action: pan-x;
        }
        .space-y-3 > :last-child {
          margin-bottom: 0 !important;
        }
      `}</style>
    </div>
  );
};

export default Projects;
