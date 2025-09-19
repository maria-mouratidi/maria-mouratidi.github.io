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
  icy: {
    cardBg: "bg-white/10 backdrop-blur-xl border-white/20",
    cardHover: "hover:bg-white/20 hover:border-cyan-300/40 hover:shadow-cyan-400/30",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-cyan-600",
    button: "bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-800 border-cyan-400/40",
    badge: "bg-cyan-100/30 text-cyan-800 border-cyan-300/40",
    glow: "shadow-cyan-400/20",
    filterActive: "bg-cyan-500/30 text-cyan-800 border-cyan-400/60",
    bg: ""
  },
  hot: {
    cardBg: "bg-yellow-50/10 backdrop-blur-xl border-yellow-300/20",
    cardHover: "hover:bg-yellow-50/20 hover:border-yellow-400/40 hover:shadow-yellow-400/30",
    text: "text-yellow-900",
    textSecondary: "text-yellow-800",
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
    title: "Blog App",
    description: "Django blog app with GitHub OAuth login, users can upload text and images, comment, and favorite posts.",
    image: "https://plus.unsplash.com/premium_photo-1720744786849-a7412d24ffbf?auto=format&fit=crop&w=600&q=80",
    technologies: ["Django", "Bootstrap", "SQLite"],
    status: "Completed",
    github: "https://github.com/ab007shetty/dj4e",
    live: "https://ab007shetty.pythonanywhere.com/",
    forks: 16,
    stars: 26
  },
  {
    id: 2,
    title: "EAttendance – Attendance Management System",
    description: "Real-time student attendance system using face recognition module, built on dlib's ResNet-34 model.",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80",
    technologies: ["Node.js", "MongoDB", "OpenCV"],
    status: "Completed",
    github: "https://github.com/ab007shetty/eattendance",
    live: "http://eattendance2021.herokuapp.com/",
    forks: 4,
    stars: 12
  },
  {
    id: 3,
    title: "Crop Management System",
    description: "ML-based system that predicts crops, recommends fertilizers, and provides rainfall and yield forecasts.",
    image: "https://images.unsplash.com/uploads/141247613151541c06062/c15fb37d?auto=format&fit=crop&w=600&q=80",
    technologies: ["PHP", "Python", "Pandas"],
    status: "Completed",
    github: "https://github.com/ab007shetty/crop-management-system",
    live: "#",
    forks: 13,
    stars: 26
  },
  {
    id: 4,
    title: "EClassroom",
    description: "Django based Student Teacher portal for communication and submitting assignments.",
    image: "https://images.unsplash.com/photo-1649920442906-3c8ef428fb6e?auto=format&fit=crop&w=600&q=80",
    technologies: ["Django", "Bootstrap", "Python"],
    status: "Completed",
    github: "https://github.com/ab007shetty/eclassroom-django",
    live: "https://eclassroom.pythonanywhere.com/",
    forks: 9,
    stars: 22
  },
  {
    id: 5,
    title: "ViMusic – Web based Music Player",
    description: "Web-based solution for ViMusic Android player. Features: Favorites, playlists, DB import/export, Firebase login.",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    technologies: ["Node.js", "React", "Firebase"],
    status: "Completed",
    github: "https://github.com/ab007shetty/ViMusic",
    live: "https://vimusic.vercel.app/",
    forks: 0,
    stars: 5
  },
  {
    id: 6,
    title: "Gemini – Chatbot",
    description: "Single page serverless site for Google's AI language and vision model.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80",
    technologies: ["Ajax", "Postman", "JavaScript"],
    status: "Completed",
    github: "https://github.com/ab007shetty/Gemini",
    live: "https://ab007shetty.github.io/Gemini/?key=AIzaSyDz83LLl7dKzYsCZoATDd5boMlgjbRvhhE",
    forks: 13,
    stars: 28
  },
  {
    id: 7,
    title: "Life Share – Blood Bank Management System",
    description: "Node.js-based API server connecting donors and recipients, with multi-language support and chatbot.",
    image: "https://images.unsplash.com/photo-1615461066159-fea0960485d5?auto=format&fit=crop&w=600&q=80",
    technologies: ["Node.js", "Bootstrap", "MongoDB"],
    status: "Completed",
    github: "https://github.com/ab007shetty/lifeshare",
    live: "https://lifeshare2021.herokuapp.com/",
    forks: 0,
    stars: 4
  },
  {
    id: 8,
    title: "Quiz Master – Online Quiz Management System",
    description: "Real-time quiz platform for schools with live scores, leaderboards, OTP-based, Domain restricted login.",
    image: "https://plus.unsplash.com/premium_photo-1678216286021-e81f66761751?auto=format&fit=crop&w=600&q=80",
    technologies: ["PHP", "Bootstrap", "MySQL"],
    status: "Completed",
    github: "https://github.com/ab007shetty/quiz-master-2",
    live: "http://quizmaster.epizy.com/",
    forks: 2,
    stars: 6
  },
  {
    id: 9,
    title: "Tweet Align",
    description: "ML model predicting political alignment (left/right) based on users' tweets and likes.",
    image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=600&q=80",
    technologies: ["Python", "Scikit-learn", "Pandas"],
    status: "Ongoing",
    github: "https://github.com/ab007shetty/TweetAlign",
    live: "#",
    forks: 0,
    stars: 0
  },
  {
    id: 10,
    title: "Chowkabara",
    description: "Digitize a native board game into an online multiplayer experience.",
    image: "https://www.three-mens-morris.com/images/morris.png?auto=format&fit=crop&w=600&q=80",
    technologies: ["Node.js", "React", "Socket.io"],
    status: "Ongoing",
    github: "https://github.com/ab007shetty/chowkabara",
    live: "#",
    forks: 0,
    stars: 0
  },
  {
    id: 11,
    title: "Revel",
    description: "New Gen Event Booking Platform for Bangalore based Startup.",
    image: "https://media.licdn.com/dms/image/v2/D4D22AQG8z3H3S5DYsw/feedshare-shrink_2048_1536/B4DZjSyWLAH4A0-/0/1755883089159?e=1758758400&v=beta&t=631R3lMJefAji-o4upccMOg1hmaGnPXklWrS8iVUVKk",
    technologies: ["Node.js", "React", "Firebase", "Tailwind CSS"],
    status: "Completed",
    github: "https://github.com/ab007shetty/revel",
    live: "https://therevel.co/",
    forks: 0,
    stars: 0
  },
  {
    id: 12,
    title: "Task Planner",
    description: "A Month View Task Planner with drag & drop functionality, task scheduling, and filtering capabilities.",
    image: "https://plus.unsplash.com/premium_photo-1706544427087-9f8747c5c675?auto=format&fit=crop&w=600&q=80",
    technologies: ["Node.js", "React", "react-dnd", "Tailwind CSS"],
    status: "Completed",
    github: "https://github.com/ab007shetty/planner",
    live: "https://ab007shetty.github.io/planner/",
    forks: 0,
    stars: 0
  },
  {
    id: 13,
    title: "Learn MERN",
    description: "A comprehensive guide to learning the MERN stack (MongoDB, Express.js, React.js, Node.js) through code snippets and puzzles.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
    technologies: ["Node.js", "React", "Tailwind CSS"],
    status: "Completed",
    github: "https://github.com/ab007shetty/learnMERN",
    live: "https://ab007shetty.github.io/learnMERN/",
    forks: 0,
    stars: 0
  },
  {
    id: 14,
    title: "Snap 3D",
    description: "Images to 3D model rendering using Meshroom and Open3D.",
    image: "https://images.unsplash.com/photo-1644158767445-79390e879319?auto=format&fit=crop&w=600&q=80",
    technologies: ["Nvidia CUDA", "Open3D", "Meshroom", "Node.js", "React"],
    status: "Ongoing",
    github: "https://github.com/ab007shetty/snap3d",
    live: "https://ab007shetty.github.io/snap3d/",
    forks: 0,
    stars: 0
  }
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
        </div>
      </div>
    </div>
  );
};

// ========== Main Component ==========
const Projects = () => {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
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
      if (diffX > 0) nextSlide();
      else prevSlide();
      isDraggingRef.current = false;
    }
  };

  const handleEnd = () => { isDraggingRef.current = false; };

  useEffect(() => {
    if (isMobile) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isTransitioning, filteredProjects.length, isMobile]);

  return (
    <div className={styles.bg + " min-h-screen relative overflow-hidden"}>
      <div className="relative z-10 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className={`pt-10 text-4xl md:text-5xl font-bold ${styles.text} mb-4 flex items-center justify-center gap-4`}>
              <FaCode className={styles.accent} />
              My Projects
            </h1>
            <p className={`text-lg md:text-xl ${styles.textSecondary} max-w-3xl mx-auto`}>
              A collection of my academic personal and freelance projects.
            </p>
          </div>
          {/* Status Filter */}
          <div className="flex flex-wrap gap-4 justify-center mb-0">
            <span className="flex items-center gap-2">
              <FaFilter className={`${styles.textSecondary}`} />
              <span className={`${styles.text} font-medium`}>Filter by Status:</span>
            </span>
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`
                  px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-300
                  ${activeStatus === status
                    ? styles.filterActive + " ring-2 ring-offset-2 ring-cyan-400"
                    : `${styles.button} hover:scale-105`
                  }
                `}
              >
                {status}
                <span className={`ml-2 inline-block px-1.5 py-0.5 rounded-full text-xs font-bold ${
                  activeStatus === status 
                    ? 'bg-white/20 text-current' 
                    : 'bg-black/10 text-current'
                }`}>
                  {getProjectCount(status)}
                </span>
                {activeStatus === status && (
                  <span className="ml-2 inline-block text-xs font-bold text-green-600">✓</span>
                )}
              </button>
            ))}
          </div>
          {/* Mobile View */}
          {isMobile ? (
            <div className="relative mt-8">
              <div
                className="w-full"
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
              >
                {filteredProjects.length > 0 && (
                  <MobileCard
                    project={filteredProjects[currentIndex]}
                    onPrev={prevSlide}
                    onNext={nextSlide}
                    isTransitioning={isTransitioning}
                    styles={styles}
                    techIcons={techIcons}
                  />
                )}
              </div>
              {/* Mobile Dots Indicator */}
              <div className="flex justify-center mt-6 gap-2">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndexState(index)}
                    className={`
                      w-2 h-2 rounded-full transition-all duration-300
                      ${index === currentIndex
                        ? `${styles.accent} w-6`
                        : `${styles.textSecondary} opacity-50`
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          ) : (
            /* Desktop View */
            <div className="relative mt-16">
              {/* Desktop Cards Container */}
              <div
                ref={containerRef}
                className="w-[1000px] h-[540px] mx-auto relative"
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
              >
                {filteredProjects.map((project, index) => (
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
                ))}
                {/* Navigation Buttons on card sides */}
                <button
                  onClick={prevSlide}
                  disabled={isTransitioning}
                  className={`
                    absolute left-0 top-1/2 -translate-y-1/2 z-40
                    p-4 rounded-full transition-all duration-300
                    ${styles.button} hover:scale-110 shadow-xl
                    ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  style={{ marginLeft: '-10px' }}
                >
                  <FaChevronLeft className="text-xl" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isTransitioning}
                  className={`
                    absolute right-0 top-1/2 -translate-y-1/2 z-40
                    p-4 rounded-full transition-all duration-300
                    ${styles.button} hover:scale-110 shadow-xl
                    ${isTransitioning ? 'opacity-50 cursor-not-allowed' : ''}
                  `}
                  style={{ marginRight: '-10px' }}
                >
                  <FaChevronRight className="text-xl" />
                </button>
              </div>
              {/* Desktop Dots Indicator */}
              <div className="flex justify-center mt-8 gap-3">
                {filteredProjects.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`
                      w-3 h-3 rounded-full transition-all duration-300 hover:scale-125
                      ${index === currentIndex
                        ? `${styles.accent} shadow-lg`
                        : `${styles.textSecondary} opacity-60 hover:opacity-80`
                      }
                    `}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className={`text-6xl ${styles.textSecondary} mb-4`}>🔍</div>
              <h3 className={`text-2xl font-bold ${styles.text} mb-2`}>No projects found</h3>
              <p className={`${styles.textSecondary}`}>
                Try adjusting your filters to see more projects.
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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