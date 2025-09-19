import React, { useState, useRef, useEffect } from "react";
import {
  FaGithub, FaExternalLinkAlt, FaCodeBranch, FaStar, FaChevronLeft, FaChevronRight, FaRocket, FaFilter, FaCode
} from "react-icons/fa";
import {
  SiReact, SiNodedotjs, SiMongodb, SiBootstrap, SiPython, SiPhp, SiDjango, SiMysql, SiScikitlearn, SiPandas, SiOpencv, SiFirebase,
  SiSocketdotio
} from "react-icons/si";

import { useTheme } from "../ThemeContext";

// ========== Theme Styles ==========
const themeStyles = {
  light: {
    cardBg: "bg-white/10 backdrop-blur-xl border-yellow-200/20",
    cardHover: "hover:bg-yellow-50/20 hover:border-yellow-400/40 hover:shadow-yellow-400/30",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-yellow-600",
    button: "bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-900 border-yellow-500/40",
    badge: "bg-yellow-100/30 text-yellow-900 border-yellow-400/40",
    glow: "shadow-yellow-400/20",
    filterActive: "bg-yellow-500/30 text-yellow-900 border-yellow-500/60",
    bg: ""
  },
  dark: {
    cardBg: "bg-gray-900/10 backdrop-blur-xl border-gray-700/20",
    cardHover: "hover:bg-gray-900/20 hover:border-blue-500/40 hover:shadow-blue-400/30",
    text: "text-gray-100",
    textSecondary: "text-gray-300",
    accent: "text-blue-400",
    button: "bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 border-blue-500/40",
    badge: "bg-blue-900/30 text-blue-200 border-blue-500/40",
    glow: "shadow-blue-400/20",
    filterActive: "bg-blue-600/30 text-blue-200 border-blue-500/60",
    bg: ""
  }
};

// ========== Tech Icons ==========
const techIcons = {
  React: <SiReact className="text-blue-500" />,
  "Node.js": <SiNodedotjs className="text-green-600" />,
  MongoDB: <SiMongodb className="text-green-500" />,
  Bootstrap: <SiBootstrap className="text-purple-700" />,
  Python: <SiPython className="text-yellow-500" />,
  PHP: <SiPhp className="text-indigo-400" />,
  Django: <SiDjango className="text-green-900" />,
  SQLite: <SiMysql className="text-blue-700" />,
  "OpenCV": <SiOpencv className="text-blue-400" />,
  "Scikit-learn": <SiScikitlearn className="text-yellow-600" />,
  Pandas: <SiPandas className="text-black" />,
  Firebase: <SiFirebase className="text-yellow-500" />,
  MySQL: <SiMysql className="text-blue-700" />,
  Ajax: <FaCode className="text-orange-500" />,
  Postman: <FaCode className="text-orange-600" />,
  "Tailwind CSS": <SiReact className="text-teal-500" />,
  "Socket.io": <SiSocketdotio className="text-black" />,
  "react-dnd": <SiReact className="text-blue-500" />,
  "Nvidia CUDA": <FaCode className="text-green-500" />,
  "Open3D": <FaCode className="text-blue-600" />,
  "Meshroom": <FaCode className="text-purple-600" />,
  "JavaScript": <FaCode className="text-yellow-500" />
};

// ========== Projects ==========
const projects = [
  {
    id: 1,
    title: "CRM in your WhatsApp",
    description: "WhatsApp-integrated lead management system with automated follow-up scheduling and reminder notifications.",
    image: "https://images.unsplash.com/photo-1719204718581-5c95889c8ec9?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["FastAPI", "OpenAI API", "WhatsApp API"],
    status: "Completed",
    github: "https://github.com/maria-mouratidi/whatsapp-crm",
    // live: "",
    // forks: 16,
    // stars: 26
  },
];


// ========== Statuses ==========
const statuses = [
  "All",
  "Completed",
  "Ongoing"
];

// ========== Responsive Helper ==========
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < breakpoint : false);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);
  return isMobile;
}

// ========== Mobile Card ==========
const MobileCard = ({ project, onPrev, onNext, isTransitioning, styles, techIcons }) => {
  if (!project) return null;
  return (
    <div className={`
      w-full max-w-sm mx-auto
      ${styles.cardBg} ${styles.cardHover}
      border rounded-2xl p-5 ${styles.glow} shadow-2xl
      transition-transform duration-300
      relative
    `}>
      <div className="w-full h-40 rounded-xl mb-4 relative overflow-hidden group">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <button
          onClick={onPrev}
          disabled={isTransitioning}
          className={`
            absolute left-2.5 top-1/2 -translate-y-1/2 p-1.5 bg-white/70 hover:bg-white/90 rounded-full shadow
            ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}
            z-10
          `}
          aria-label="Previous"
          style={{ minWidth: 34, minHeight: 34 }}
        >
          <FaChevronLeft className="text-base text-gray-700" />
        </button>
        <button
          onClick={onNext}
          disabled={isTransitioning}
          className={`
            absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 bg-white/70 hover:bg-white/90 rounded-full shadow
            ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}
            z-10
          `}
          aria-label="Next"
          style={{ minWidth: 34, minHeight: 34 }}
        >
          <FaChevronRight className="text-base text-gray-700" />
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className={`text-lg font-bold ${styles.text} mb-1`}>{project.title}</h3>
          <p className={`${styles.textSecondary} text-sm leading-relaxed`}>
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className={`${styles.badge} border px-2 py-1 rounded-full text-xs flex items-center gap-1 font-medium`}
            >
              {techIcons[tech] && <span className="w-3 h-3">{techIcons[tech]}</span>}
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className={`${styles.badge} border px-2 py-1 rounded-full text-xs font-medium`}>
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className={`${styles.textSecondary} flex items-center gap-1`}>
            <FaRocket className="text-xs" />
            {project.status}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-gray-700">
              <FaCodeBranch className="text-xs" />
              {project.forks}
            </span>
            <span className="flex items-center gap-1 text-yellow-600">
              <FaStar className="text-xs" />
              {project.stars}
            </span>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
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
            Code
          </a>
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                ${styles.button} border px-3 py-2 rounded-lg
                flex items-center gap-2 text-xs font-medium
                transition-all duration-300 hover:scale-105
                flex-1 justify-center
              `}
            >
              <FaExternalLinkAlt />
              Live
            </a>
          ) : (
            <button
              disabled
              className={`
                bg-gray-300/20 border border-gray-400/20 px-3 py-2 rounded-lg
                flex items-center gap-2 text-xs font-medium
                flex-1 justify-center opacity-50 cursor-not-allowed
                ${styles.textSecondary}
              `}
            >
              <FaExternalLinkAlt />
              Not deployed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ========== Desktop Card ==========
const DesktopCard = ({ project, index, currentIndex, filteredProjects, styles, techIcons, goToSlide }) => {
  const totalCards = filteredProjects.length;
  const normalizedIndex = (index - currentIndex + totalCards) % totalCards;
  let transform = '';
  let zIndex = 0;
  let opacity = 1;

if (normalizedIndex === 0) {
  transform = 'translateX(-50%) scale(1.1)';
  zIndex = 10;
} else if (normalizedIndex === 1 || normalizedIndex === totalCards - 1) {
  transform = normalizedIndex === 1 
    ? 'translateX(calc(-50% + 150px)) scale(0.95)' 
    : 'translateX(calc(-50% - 150px)) scale(0.95)';
  zIndex = 9;
  opacity = 0.7;
} else if (normalizedIndex === 2 || normalizedIndex === totalCards - 2) {
  transform = normalizedIndex === 2 
    ? 'translateX(calc(-50% + 300px)) scale(0.8)' 
    : 'translateX(calc(-50% - 300px)) scale(0.8)';
  zIndex = 8;
  opacity = 0.4;
} else {
  transform = 'translateX(-50%) scale(0.8)';
  zIndex = 0;
  opacity = 0;
}

  const cardStyle = {
    transform,
    zIndex,
    opacity,
    transition: 'all 0.5s ease-out',
    left: '50%',
  };

  const isCenter = normalizedIndex === 0;
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
        ...cardStyle,
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden'
      }}
      onClick={() => !isCenter && goToSlide(index)}
    >
      <div className="w-full h-44 rounded-xl mb-4 flex items-center justify-center relative overflow-hidden group">
        <img
          src={project.image}
          alt={project.title}
          className="object-cover w-full h-full absolute inset-0 transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <div className="space-y-4">
        <div>
          <h3 className={`text-lg font-bold ${styles.text} mb-1 line-clamp-1`}>{project.title}</h3>
          <p className={`${styles.textSecondary} text-sm leading-relaxed line-clamp-2`}>
            {project.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-1">
          {project.technologies.slice(0, 3).map((tech, techIndex) => (
            <span
              key={techIndex}
              className={`${styles.badge} border px-2 py-1 rounded-full text-xs flex items-center gap-1 font-medium`}
            >
              {techIcons[tech] && <span className="w-3 h-3">{techIcons[tech]}</span>}
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className={`${styles.badge} border px-2 py-1 rounded-full text-xs font-medium`}>
              +{project.technologies.length - 3}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className={`${styles.textSecondary} flex items-center gap-1`}>
            <FaRocket className="text-xs" />
            {project.status}
          </span>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-gray-700">
              <FaCodeBranch className="text-xs" />
              {project.forks}
            </span>
            <span className="flex items-center gap-1 text-yellow-600">
              <FaStar className="text-xs" />
              {project.stars}
            </span>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
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
            Code
          </a>
          {project.live ? (
            <a
              href={project.live}
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
              <FaExternalLinkAlt />
              Live
            </a>
          ) : (
            <button
              disabled
              className={`
                bg-gray-300/20 border border-gray-400/20 px-3 py-2 rounded-lg
                flex items-center gap-2 text-xs font-medium
                flex-1 justify-center opacity-50 cursor-not-allowed
                ${styles.textSecondary}
              `}
            >
              <FaExternalLinkAlt />
              Not deployed
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ========== Main Component ==========
const Projects = () => {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.light;
  const isMobile = useIsMobile(768);

  const [activeStatus, setActiveStatus] = useState("Completed");
  
  // Updated to default to Revel (id: 11)
  const getInitialIndex = () => {
    const revelIndex = projects.findIndex(p => p.id === 11);
    return revelIndex === -1 ? 0 : revelIndex;
  };

  const [currentIndex, setCurrentIndexState] = useState(getInitialIndex());
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isDraggingRef = useRef(false);

  const filteredProjects = projects.filter(p => activeStatus === "All" ? true : p.status === activeStatus);
  
  // Get count for each status
  const getProjectCount = (status) => {
    if (status === "All") return projects.length;
    return projects.filter(p => p.status === status).length;
  };

  useEffect(() => {
    let newIndex = 0;
    const revelIdx = filteredProjects.findIndex(p => p.id === 11);
    if (revelIdx !== -1) {
      newIndex = revelIdx;
    }
    setCurrentIndexState(Math.min(newIndex, Math.max(filteredProjects.length - 1, 0)));
  }, [activeStatus, filteredProjects.length]);

  useEffect(() => {
    if (currentIndex >= filteredProjects.length) {
      setCurrentIndexState(Math.max(filteredProjects.length - 1, 0));
    }
  }, [filteredProjects.length]);

  const nextSlide = () => {
    if (isTransitioning || filteredProjects.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndexState((prev) => (prev + 1) % filteredProjects.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning || filteredProjects.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndexState((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndexState(index);
    setTimeout(() => setIsTransitioning(false), 500);
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
    if (isTransitioning) return;
    isDraggingRef.current = false;
  };

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        {/* Status Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`
                  ${styles.button} border px-4 py-2 rounded-lg
                  flex items-center gap-2 text-sm font-medium
                  transition-all duration-300
                  flex-1 text-center
                  ${activeStatus === status ? `${styles.filterActive} scale-105` : ''}
                `}
              >
                {status} 
                {getProjectCount(status) > 0 && (
                  <span className="bg-gray-800 text-white rounded-full px-2 py-0.5 text-xs font-semibold">
                    {getProjectCount(status)}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Container */}
        <div className="relative">
          <div
            ref={containerRef}
            className="w-full flex overflow-hidden touch-manipulation"
            onMouseDown={handleStart}
            onTouchStart={handleStart}
            onMouseMove={handleMove}
            onTouchMove={handleMove}
            onMouseUp={handleEnd}
            onTouchEnd={handleEnd}
            style={{ cursor: isTransitioning ? 'wait' : 'grab' }}
          >
            {filteredProjects.map((project, index) => (
              isMobile ? (
                <MobileCard
                  key={project.id}
                  project={project}
                  onPrev={prevSlide}
                  onNext={nextSlide}
                  isTransitioning={isTransitioning}
                  styles={styles}
                  techIcons={techIcons}
                />
              ) : (
                <DesktopCard
                  key={project.id}
                  project={project}
                  index={index}
                  currentIndex={currentIndex}
                  filteredProjects={filteredProjects}
                  styles={styles}
                  techIcons={techIcons}
                  goToSlide={goToSlide}
                />
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;