import React, { useState, useRef, useEffect } from "react";
import {
  FaGithub, FaExternalLinkAlt, FaCodeBranch, FaStar, FaChevronLeft, FaChevronRight, FaRocket, FaFilter, FaCode,
} from "react-icons/fa";
import {
  SiReact, SiNodedotjs, SiMongodb, SiBootstrap, SiPython, SiPhp, SiDjango, SiMysql, SiScikitlearn, SiPandas, SiOpencv, SiFirebase,
  SiSocketdotio, SiOpenai, SiWhatsapp, SiFastapi, SiCplusplus, SiPytorch,
  SiNumpy, SiScipy, SiArduino, SiTensorflow
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
  Python: <SiPython className="text-yellow-500" />,
  "Scikit-learn": (<img src="/images/scikit-learn-logo.png" alt="Scikit-learn" />),
  Pandas: <SiPandas className="text-black" />,
  MySQL: <SiMysql className="text-blue-700" />,
  "OpenAI API": <SiOpenai className="text-black-500" />,
  "WhatsApp API": <SiWhatsapp className="text-green-500" />,
  FastAPI: <SiFastapi className="text-green-500" />,
  "Gensim": (<img src="/images/gensim-circle.png" alt="Gensim" />),
  NLTK: (<img src="/images/nltk-logo.png" alt="NLTK" />),
  networkx: (<img src="/images/networkx-logo.png" alt="networkx" />),
  SciPy: <SiScipy className="text-blue-500" />,
  NumPy: <SiNumpy className="text-blue-500" />,
  "C++": <SiCplusplus className="text-blue-600" />,
  FLTK: (<img src="/images/fltk-logo.png" alt="FLTK" />),
  Arduino: <SiArduino className="text-blue-400" />,
  R: (<img src="/images/r-logo.png" alt="R" />),
  NetLogo: (<img src="/images/netlogo.png" alt="NetLogo" />),
  PyTorch: <SiPytorch className="text-orange-600" />,
  "HuggingFace": (<img src="/images/huggingface-logo.png" alt="HuggingFace" />),
  TensorFlow: <SiTensorflow className="text-orange-600" />,
  OWL: (<img src="/images/owl-logo.png" alt="OWL" />),
  SPARQL: (<img src="/images/sparql-logo.png" alt="SPARQL" />),
};

// ========== Projects ========== 
const projects = [
  {
    id: 2,
    title: "CRM in your WhatsApp",
    description: "WhatsApp-integrated lead management system with automated follow-up scheduling and reminder notifications.",
    image: "https://images.unsplash.com/photo-1719204718581-5c95889c8ec9?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["FastAPI", "OpenAI API", "WhatsApp API"],
    status: "Technical",
    github: "https://github.com/maria-mouratidi/whatsapp-crm",
    live: "https://github.com/maria-mouratidi/whatsapp-crm#readme",
    // forks: 16,
    // stars: 26
  },
    {
    id: 3,
    title: "Judge a book by its cover",
    description: "Multi-modal ML for book genre classification using text, numerical and image data.",
    image: "https://images.unsplash.com/photo-1755541608494-5c02cf56e1f4?q=80&w=657&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image: "https://images.unsplash.com/photo-1713124893221-59a4133cf6ed?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["Python", "Scikit-learn", "Pandas"],
    status: "Technical",
    github: "https://github.com/maria-mouratidi/book-classification.git",
    live: ""
    // forks: 0,
    // stars: 0
  },
  {
    id: 4,
    title: "What's the language?",
    description: "Spoken language classification CNN model of 6 European languages.",
    image: "https://images.unsplash.com/photo-1579010269379-6168cf383a68?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["PyTorch", "NumPy"],
    status: "Technical",
    github: "https://github.com/maria-mouratidi/spoken-lang-detect.git",
    live: ""
  },
  {
  id: 5,
  title: "Fact-Checking Agent",
  description: "Intelligent agent that fact-checks statements using ontology reasoning and LLMs with trust-based ranking.",
  image: "https://images.unsplash.com/photo-1516382799247-87df95d790b7?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  technologies: [ "NLTK", "OWL", "SPARQL"],
  status: "Technical",
  github: "https://github.com/maria-mouratidi/factchecking-agent.git",
  live: ""
},
  {
  id: 6,
  title: "Social Media Censorship and Rebellion Simulation",
  description: "Multi-agent simulation on how social media censorship affects rebellion outbreaks, extending Epstein's classic model.",
 //image: "images/network.png",
  image: "https://plus.unsplash.com/premium_photo-1677997799184-da1ce07cf70f?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  technologies: ["NetLogo", "R"],
  status: "Research",
  github: "https://github.com/maria-mouratidi/rebellion-simulation.git",
  live: "https://github.com/maria-mouratidi/rebellion-simulation.git#readme"
  // forks: 0,
  // stars: 0
},
{
  id: 7,
  title: "BipBop Breakout Game",
  description: "Classic Breakout-style game with realistic ball physics, paddle controls and progressive brick destruction.",
  image: "https://plus.unsplash.com/premium_photo-1687980926467-d59979447f76?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  technologies: ["C++", "FLTK"],
  status: "Technical",
  github: "https://github.com/maria-mouratidi/bipbop-game.git",
  live: "https://github.com/maria-mouratidi/bipbop-game.git#readme"
  // forks: 0,
  // stars: 0
},
{
  id: 8,
  title: "Marco Polo Robot",
  description: "Arduino-based autonomous robot that plays Marco Polo using dual sound sensors for directional audio detection, ultrasonic obstacle avoidance, and interrupt-driven responses for real-time interaction.",
  image: "https://images.unsplash.com/photo-1561144257-e32e8efc6c4f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  technologies: ["Arduino", "C++"],
  status: "Technical",
  github: "https://github.com/maria-mouratidi/marco-polo.git",
  live: ""
  // forks: 0,
  // stars: 0
},
  {
    id: 9,
    title: "Twitter Opinion Dynamics",
    description: "Cognitive maps of twitter opinion groups and modeling their presence dynamics",
    image: "https://plus.unsplash.com/premium_photo-1684225764726-44b41eabc363?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    technologies: ["NLTK", "networkx", "Gensim",],
    status: "Research",
    github: "https://github.com/maria-mouratidi/simulating-twitter-communities",
    live: "",
    // forks: 16,
    // stars: 26
  },
  {
  id: 10,
  title: "Restaurant Recommendation Dialogue System",
  description: "AI-powered dialogue system investigating choice variety effects on user satisfaction in restaurant recommendations.",
  image: "https://plus.unsplash.com/premium_photo-1726729343701-00ed5b8148b1?q=80&w=725&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  technologies: ["TensorFlow", "Scikit-learn", "Word2Vec"],
  status: "Research",
  github: "https://github.com/maria-mouratidi/restaurant-rec.git",
  live: ""
  // forks: 0,
  // stars: 0
},
  {
  id: 11,
  title: "GPT-2 Fine-tuning",
  description: "Fine-tuning on human next-word prediction to better approximate human language prediction patterns.",
  image: "https://plus.unsplash.com/premium_photo-1727674259884-98d2c054b217?q=80&w=1112&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  technologies: ["PyTorch", "HuggingFace"],
  status: "Research",
  github: "https://github.com/maria-mouratidi/cloze-finetuning.git",
  live: ""
  // forks: 0,
  // stars: 0
},
  {
    id: 12,
    title: "EEG analysis in syntactic processing",
    description: "EEG time-frequency analysis of syntactic processing in monolingual vs bilingual populations.",
    image: "https://images.unsplash.com/photo-1617994452722-4145e196248b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    image: "https://thumbs.dreamstime.com/b/electroencephalogram-result-paper-close-up-brain-activity-test-diagnosis-epilepsy-electroencephalogram-result-paper-158185773.jpg?w=992",
    technologies: ["Python", "SciPy", "NumPy"],
    status: "Research",
    github: "https://github.com/maria-mouratidi/sentence-oscillations.git",
    live: ""
    // forks: 8,
    // stars: 15

  },
  {
  id: 13,
  title: "Spell Wizard",
  description: "Spell correction using edit distance, frequency analysis, and n-gram language model perplexity for context-aware text correction.",
  image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.0.1&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  technologies: ["Python", "NLTK"],
  status: "Technical",
  github: "https://github.com/maria-mouratidi/spellchecker.git",
  live: "https://github.com/maria-mouratidi/spellchecker/blob/main/examples/demo.ipynb"
  // forks: 0,
  // stars: 0
},
  // {
  //   id: ,
  //   title: "Fair airfare",
  //   description: "An algorithm predicting dynamic pricing from airlines to help with booking.",
  //   image: "https://images.unsplash.com/photo-1567748534085-467f8a8a475d?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   technologies: ["Python", "Pandas"],
  //   status: ["In Progress"],
  //   github: "",
  //   live: ""
  //   // forks: 8,
  //   // stars: 15

  // },
  //   {
  //   id: ,
  //   title: "Wolf in AI clothing",
  //   description: "AI agents that play the conversation game Werewolf (Mafia) inspired by the AIWolfDial2025 challenge.",
  //   image: "",
  //   technologies: ["Python", "Pandas"],
  //   status: "In Progress",
  //   github: "",
  //   live: ""
  //   // forks: 8,
  //   // stars: 15

  // }
];


// ========== Statuses ==========
const statuses = [
  "All",
  "Technical",
  "Research",
  //"In Progress"
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
              Demo
            </a>
          ) : (
            <div
              className={`
                bg-gray-400/20 border border-gray-400/40 text-gray-500 px-3 py-2 rounded-lg
                flex items-center gap-2 text-xs font-medium
                flex-1 justify-center cursor-not-allowed
              `}
            >
              <FaExternalLinkAlt />
              Demo
            </div>
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
              Demo
            </a>
          ) : (
            <div
              className={`
                bg-gray-400/20 border border-gray-400/40 text-gray-500 px-3 py-2 rounded-lg
                flex items-center gap-2 text-xs font-medium
                flex-1 justify-center cursor-not-allowed
              `}
            >
              <FaExternalLinkAlt />
              Demo
            </div>
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

  const [activeStatus, setActiveStatus] = useState("All");
  
  const getInitialIndex = () => {
    const revelIndex = projects.findIndex(p => p.id === 1);
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
    const revelIdx = filteredProjects.findIndex(p => p.id === 1);
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