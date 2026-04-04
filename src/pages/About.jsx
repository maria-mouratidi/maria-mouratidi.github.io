import React, { useState } from "react";
import {
  FaBriefcase, FaGraduationCap, FaCode, FaTrophy, FaBuilding, FaSchool,
  FaServer, FaTools, FaDatabase, FaCheckCircle, FaExternalLinkAlt,
  FaMapMarkerAlt, FaCalendarAlt, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJira,
} from "react-icons/fa";
import {
  SiPython, SiJavascript, SiCplusplus, SiMysql, SiMongodb, SiPostgresql,
  SiFastapi, SiPydantic, SiOpenai, SiTerraform, SiPytorch, SiTensorflow,
  SiGithub,
} from "react-icons/si";
import {DiProlog
} from "react-icons/di";
import {VscAzure
} from "react-icons/vsc";
import { useTheme } from "../ThemeContext";

// ========== THEME STYLES (certificate style) ==========
const themeStyles = {
  light: {
    cardBg: "bg-white/60 backdrop-blur-md border-gray-200/30",
    cardHover: "hover:bg-white/80 hover:border-dusty-500/20 hover:scale-[1.02]",
    text: "text-gray-900",
    textSecondary: "text-gray-500",
    accent: "text-dusty-700",
    cardTitle: "font-medium text-gray-900",
    cardDesc: "font-light text-gray-500",
    button: "bg-white/70 hover:bg-dusty-50 text-gray-700 border-gray-200/50 hover:border-dusty-500/30",
    glow: "",
    badge: "bg-white/50 text-gray-600 border-gray-200/30",
    filterActive: "bg-dusty-50 text-dusty-800 border-dusty-500/40",
    sidebarActive: "bg-dusty-50 text-dusty-800 border-dusty-500/30 font-medium",
    sidebar: "text-gray-600 hover:text-dusty-700"
  },
  dark: {
    cardBg: "bg-neutral-900/60 backdrop-blur-md border-white/[0.08]",
    cardHover: "hover:bg-neutral-900/70 hover:border-dusty-600/20 hover:scale-[1.02]",
    text: "text-gray-100",
    textSecondary: "text-gray-400",
    accent: "text-dusty-600",
    cardTitle: "font-medium text-gray-100",
    cardDesc: "font-light text-gray-400",
    button: "bg-white/[0.06] hover:bg-white/[0.10] text-gray-300 border-white/[0.10] hover:border-dusty-600/30",
    glow: "",
    badge: "bg-white/[0.06] text-gray-400 border-white/[0.10]",
    filterActive: "bg-dusty-500/10 text-dusty-500 border-dusty-600/30",
    sidebarActive: "bg-dusty-500/10 text-dusty-500 border-dusty-600/30 font-medium",
    sidebar: "text-gray-400 hover:text-dusty-600"
  }
};

const allSkillDetails = [
  // Backend & APIs
  { key: "python", name: "Python", icon: <SiPython className="text-yellow-500"/>, desc: "Programming Language" },
  { key: "fastapi", name: "FastAPI", icon: <SiFastapi className="text-green-500"/>, desc: "Web Framework" },
  { key: "pydantic", name: "Pydantic", icon: <SiPydantic className="text-red-500"/>, desc: "Data Validation" },
  { key: "asyncio", name: "AsyncIO", icon: <SiPython className="text-blue-500"/>, desc: "Concurrent Programming" },
  // GenAI & LLMs
  { key: "azureopenai", name: "Azure OpenAI", icon: <VscAzure className="text-blue-600"/>, desc: "LLM Provider" },
  { key: "openai", name: "OpenAI API", icon: <SiOpenai className="text-black"/>, desc: "LLM Provider" },
  { key: "langchain", name: "LangChain", icon: <FaCode className="text-green-600"/>, desc: "LLM Framework" },
  { key: "langraph", name: "LangGraph", icon: <FaCode className="text-blue-500"/>, desc: "Agent Framework" },
  { key: "n8n", name: "n8n", icon: <FaTools className="text-orange-500"/>, desc: "Workflow Automation" },
  // Databases
  { key: "postgres", name: "PostgreSQL", icon: <SiPostgresql className="text-blue-600"/>, desc: "RDBMS" },
  { key: "mysql", name: "MySQL", icon: <SiMysql className="text-blue-700"/>, desc: "RDBMS" },
  // DevOps
  { key: "docker", name: "Docker", icon: <FaDocker className="text-blue-500"/>, desc: "Containerization" },
  { key: "azure", name: "Azure Container Apps", icon: <VscAzure className="text-blue-600"/>, desc: "Cloud Platform" },
  { key: "terraform", name: "Terraform", icon: <SiTerraform className="text-purple-600"/>, desc: "Infrastructure as Code" },
  { key: "githubactions", name: "GitHub Actions", icon: <SiGithub className="text-black"/>, desc: "CI/CD Pipelines" },
  { key: "git", name: "Git", icon: <FaGitAlt className="text-orange-700"/>, desc: "Version Control" },
  // ML & NLP
  { key: "pytorch", name: "PyTorch", icon: <SiPytorch className="text-orange-600"/>, desc: "ML Framework" },
  { key: "tensorflow", name: "TensorFlow", icon: <SiTensorflow className="text-orange-500"/>, desc: "ML Framework" },
  { key: "huggingface", name: "HuggingFace", icon: <FaCode className="text-yellow-500"/>, desc: "Transformers Library" },
  { key: "scikitlearn", name: "scikit-learn", icon: <FaCode className="text-orange-400"/>, desc: "ML Library" },
  // Other
  { key: "jira", name: "Jira", icon: <FaJira className="text-blue-500"/>, desc: "Project Management" },
];

// GROUPS
const skillSections = [
  { group: "Backend & APIs", icon: <FaServer />, keys: ["python", "fastapi", "pydantic", "restapi"] },
  { group: "GenAI & LLMs", icon: <FaCode />, keys: ["azureopenai", "openai", "langchain", "langraph", "n8n"] },
  { group: "Databases", icon: <FaDatabase />, keys: ["postgres", "mysql", "mongodb"] },
  { group: "DevOps", icon: <FaTools />, keys: ["docker", "azure", "terraform", "git"] },
  { group: "ML & NLP", icon: <FaCode />, keys: ["pytorch", "tensorflow", "huggingface", "scikitlearn"] },
  { group: "Other", icon: <FaJira />, keys: ["jira"] }
];

// HIGHLIGHTS, EXPERIENCE, EDUCATION
const highlights = [
  // { emoji: "🎓", text: "Completed 100+ courses on Coursera.", link: "https://www.coursera.org/user/9a1f6f65c70233a4cbf41887f48e0c06" },
  // { emoji: "☁️", text: "Google Cloud Arcade Champion — completed 400+ Google Cloud Qwiklabs.", link: "https://www.cloudskillsboost.google/public_profiles/a71f17d6-36af-4e30-b70f-8771bf211324" },
  // { emoji: "🏅", text: "Hackothsav National Finalist: Consolation prize winner in a national-level hackathon.", link: "" },
  // { emoji: "🌟", text: "Ranked among Top 6000 GitHub developers (India) with 170+ stars and 50+ forks.", link: "https://stardev.io/developers/ab007shetty#country-badge" },
  // { emoji: "📄", text: 'Authored a research paper: "Facial Recognition Using Haar Cascade and LBP Classifiers", 130+ citations (Elsevier).', link: "https://scholar.google.com/citations?user=i1vJxMYAAAAJ" }
];

const experienceGroups = [
  {
    label: "Next Epoch",
    entries: [
      {
        title: "AI Engineer",
        company: "Next Epoch",
        location: "Rotterdam, Netherlands",
        period: "12/2023 – Present",
        description: [
          "Developing end-to-end LLM-based applications in production to automate business operations"
        ],
        skills: [
          "Python",
          "FastAPI",
          "Pydantic",
          "Azure OpenAI",
          "PostgreSQL",
          "Docker",
          "Azure Container Apps",
          "Git",
        ]
      }
    ]
  },
  {
    label: "University of Thessaly",
    entries: [
      {
        title: "Motion Capture Researcher — HERMES Team",
        company: "University of Thessaly",
        location: "Remote",
        period: "11/2025 – Present",
        description: [
          "Implementing Deep Learning models for gait prediction and motion classification for integration with biomechanical models for the HERMES exoskeleton system",
        ],
        skills: [
          "Deep Learning",
          "Motion Capture",
          "PyTorch",
          "Research",
        ]
      }
    ]
  },
  {
    label: "Utrecht University",
    entries: [
      {
        title: "Teaching Assistant — Human-Centered Machine Learning",
        company: "Utrecht University",
        location: "Utrecht, Netherlands",
        period: "04/2025 – 06/2025",
        description: [
        "Supported Master AI students with assignments in fair machine learning and explainable AI",
        "Hosted lab sessions where I explained explainable AI concepts and provided feedback"
        ],
        skills: [
          "Machine Learning",
          "Explainable AI",
          "Algorithmic Fairness",
          "Teaching",
          "Communication",
        ]
      }
    ]
  },
  {
    label: "Tilburg University",
    entries: [
      {
        title: "Student Assistant",
        company: "Tilburg University",
        location: "Tilburg, Netherlands",
        period: "Aug 2021 – Apr 2023",
        description: [
          "Hosted weekly meetings to support first-year students with university integration, admin, team-building, and socializing."
        ],
        skills: [
          "Mentoring",
          "Presentation",
          "Communication",
        ]
      },
      {
        title: "Research Intern",
        company: "Tilburg University",
        location: "Tilburg, Netherlands",
        period: "Aug 2021 – Apr 2023",
        description: [
          "Finetuned GPT-2 with human next-word prediction",
          "Analyzed generalizability of the finetuned model across datasets",
        ],
        skills: [
          "Model finetuning",
          "Model probing",
          "Model evaluation",
        ]
      }
    ]
  },
];


const educationGroups = [
  // {
  //   label: "SSLC (10th Grade)",
  //   icon: <FaSchool className="text-cyan-500" />,
  //   entries: [{  institution: "Maryknoll High School, Udupi", period: "2015", location: "Udupi, Karnataka", grade: "96.16% – Secured 6th place at the district level in Kannada medium." }]
  // },
  {
    label: "MSc Artificial Intelligence",
    logo: "/images/uu-logo.svg",
    entries: [{  institution: "Utrecht University", period: "2025", location: "Utrecht, Netherlands", grade: "8.2 GPA", }]
  },
  {
    label: "BSc Cognitive Science and AI",
    logo: "/images/tilburg-logo.svg",
    logoSize: 52,
    entries: [{  institution: "Tilburg University", period: "2023", location: "Tilburg, Netherlands", grade: "8 GPA, Cum Laude" }]
  }
];

// ========== COMPONENTS ==========
function MainTabBar({ activeTab, setActiveTab, styles }) {
  const tabs = [
    { id: "education", label: "Education", icon: <FaGraduationCap /> },
    { id: "experience", label: "Experience", icon: <FaBriefcase /> },
    { id: "skills", label: "Skills", icon: <FaCode /> },
    // { id: "highlights", label: "Highlights", icon: <FaTrophy className="text-yellow-500" /> }
  ];
  return (
    <div className="flex flex-row items-center justify-center mb-8 md:mb-12 gap-2 md:gap-0">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl font-medium transition-all duration-300 justify-center text-xs md:text-base
            ${activeTab === tab.id
              ? `${styles.button} border ${styles.glow} shadow-lg scale-105`
              : `${styles.textSecondary} hover:${styles.text}`
            }`}
          style={{ minWidth: "auto" }}
        >
          <span className={`text-sm md:text-lg flex items-center ${styles.accent}`}>
            {tab.icon}
          </span>
          <span>{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

function SideTabBar({ groups, activeIndex, setActiveIndex, iconMap = {} }) {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.light;
  return (
    <div className="flex flex-wrap md:flex-col gap-1.5 md:gap-2 md:pr-6 mb-4 md:mb-0 w-full md:w-auto justify-center md:justify-start">
      {groups.map((g, idx) => (
        <button
          key={g.label || g.group}
          onClick={() => setActiveIndex(idx)}
          className={`
            px-2.5 md:px-5 py-1.5 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-300 border flex items-center gap-1.5 md:gap-2 justify-center md:justify-start text-xs md:text-base
            ${activeIndex === idx
              ? `${styles.sidebarActive} border-2`
              : `${styles.sidebar} border-transparent`}
          `}
        >
          <span className={styles.accent}>{iconMap && iconMap[g.label || g.group] ? iconMap[g.label || g.group] : g.icon}</span>
          <span className="whitespace-nowrap text-xs md:text-base leading-tight">{g.label || g.group}</span>
        </button>
      ))}
    </div>
  );
}

function SkillCard({ skill, styles, isMobile = false }) {
  if (isMobile) {
    // Mobile version - only show icon
    return (
      <div
        className={`
          ${styles.cardBg} ${styles.cardHover} border rounded-xl
          transition-all duration-300 transform ${styles.glow} shadow-lg
          hover:scale-105 flex items-center justify-center
        `}
        style={{
          minHeight: 60,
          padding: "1rem",
          border: "1.5px solid rgba(0,195,255,0.11)",
          backdropFilter: "blur(7px)",
          aspectRatio: "1"
        }}
      >
        <span className="text-2xl">{skill.icon}</span>
      </div>
    );
  }

  // Desktop version - full card
  return (
    <div
      className={`
        ${styles.cardBg} ${styles.cardHover} border rounded-2xl
        transition-all duration-300 transform ${styles.glow} shadow-lg
        hover:scale-105
      `}
      style={{
        padding: "0.8rem 1rem",
        border: "1.5px solid rgba(0,195,255,0.11)",
        backdropFilter: "blur(7px)"
      }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{skill.icon}</span>
        <div>
          <div className={`text-[15px] ${styles.cardTitle}`}>{skill.name}</div>
          <div className={`text-[13px] ${styles.cardDesc}`} style={{marginTop: -1}}>{skill.desc}</div>
        </div>
      </div>
    </div>
  );
}

// ========== MAIN ==========
export default function About() {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
  const [activeTab, setActiveTab] = useState("education");
  const [skillsTab, setSkillsTab] = useState(0);
  const [expTab, setExpTab] = useState(0);
  const [eduTab, setEduTab] = useState(0);

  const experienceIcons = { Infosys: <FaBuilding />, "Digitran Technologies": <FaBuilding /> };
  const skillGroupIcons = {};
  skillSections.forEach(s => { skillGroupIcons[s.group] = s.icon; });

  // Education heading coloring per theme
  const edulabelStyle = `text-xl md:text-2xl font-bold ${styles.text}`;

  return (
    <section id="about" className="relative w-full max-w-7xl mx-auto px-4 py-8 md:py-16 scroll-mt-24">
      {/* About Me heading and description - always at the top */}
      <div className="text-center mb-8 pt-8">
        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-light tracking-tight ${styles.text} mb-4`}>
          About <span className={styles.accent}>Me</span>
        </h1>
        <p className={`text-lg md:text-xl ${styles.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
          AI Engineer with experience integrating LLM workflows directly into clients' systems, enabling language-based business intelligence with a human-centered approach.
        </p>
      </div>
      {/* Main Tabs */}
      <MainTabBar activeTab={activeTab} setActiveTab={setActiveTab} styles={styles} />
      <div className="min-h-[400px] md:min-h-[600px] transition-all duration-500">
        {/* Education */}
        {activeTab === "education" && (
          <div className="flex flex-col md:flex-row gap-4 md:gap-7 items-stretch animate-fadein">
            {educationGroups.map((edu, idx) => (
              <div
                key={edu.label}
                className={`flex-1 min-w-[200px] mb-6 md:mb-0 p-4 md:p-6 rounded-2xl border ${styles.cardBg} ${styles.cardHover} ${styles.glow} shadow-lg flex flex-col gap-3 md:gap-4 items-center animate-slideup`}
                style={{ animationDelay: `${idx * 0.16}s` }}
              >
                {edu.logo && (
                  <img
                    src={edu.logo}
                    alt=""
                    className={`object-contain ${theme === 'dark' ? 'invert brightness-75 opacity-60' : 'grayscale opacity-80'}`}
                    style={{ width: edu.logoSize || 44, height: edu.logoSize || 44 }}
                  />
                )}
                <div className={`${styles.accent}`}>
                  <span className={edulabelStyle}>{edu.label}</span>
                </div>
                {edu.entries.map((entry, idy) => (
                  <div key={idy} className="flex flex-col items-center text-center">
                    <div className={`text-base md:text-lg font-bold mb-1 flex items-center gap-2 ${styles.accent}`}>
                      <FaGraduationCap />
                      {entry.degree}
                    </div>
                    <div className={`text-sm md:text-base font-semibold ${styles.accent}`}>{entry.institution}</div>
                    <div className="flex flex-wrap gap-2 md:gap-3 justify-center text-xs md:text-sm items-center my-2">
                      <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FaCalendarAlt className="text-xs" />
                        {entry.period}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                        <FaMapMarkerAlt className="text-xs" />
                        {entry.location}
                      </span>
                    </div>
                    <div className={`text-sm md:text-base font-semibold ${styles.text} mt-2`}>
                      {entry.grade}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {/* Experience */}
        {activeTab === "experience" && (
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 animate-fadein">
            <SideTabBar
              groups={experienceGroups}
              activeIndex={expTab}
              setActiveIndex={setExpTab}
              iconMap={experienceIcons}
            />
            <div className="flex-1">
              {experienceGroups[expTab].entries.map((exp, idx) => (
                <div
                  key={idx}
                  className={`mb-6 md:mb-8 p-4 md:p-6 rounded-2xl border ${styles.cardBg} ${styles.cardHover} ${styles.glow} shadow-lg animate-slideup`}
                  style={{ animationDelay: `${idx * 0.12}s` }}
                >
                  <div className="flex flex-col md:flex-row md:flex-wrap gap-2 mb-3 md:items-center">
                    <span className={`text-lg md:text-lg font-bold ${styles.text}`}>{exp.title}</span>
                    <span className={`text-base font-semibold ${styles.accent}`}>{exp.company}</span>
                    <span className={`flex items-center gap-2 text-sm ${styles.textSecondary}`}>
                      <FaCalendarAlt className="text-xs" />
                      {exp.period}
                    </span>
                    <span className={`flex items-center gap-2 text-sm ${styles.textSecondary}`}>
                      <FaMapMarkerAlt className="text-xs" />
                      {exp.location}
                    </span>
                  </div>
                  <ul className={`mb-3 pl-0 flex flex-col gap-2`}>
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex gap-2 items-start">
                        <span className={`mt-1 ${styles.accent}`}>
                          <FaCheckCircle className="text-sm md:text-base" />
                        </span>
                        <span className={`${styles.textSecondary} text-sm md:text-base`}>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill, i) => (
                      <span key={i} className={`px-2 md:px-3 py-1 rounded-full text-xs ${styles.button} border`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Skills */}
        {activeTab === "skills" && (
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 animate-fadein">
            <SideTabBar
              groups={skillSections}
              activeIndex={skillsTab}
              setActiveIndex={setSkillsTab}
              iconMap={skillGroupIcons}
            />
            <div className="flex-1 transition-all duration-500">
              <div className="mb-4 md:mb-6 flex items-center gap-2">
                {skillSections[skillsTab].icon}
                <h2 className={`text-lg md:text-2xl font-bold ${styles.text} mb-3`}>
                  {skillSections[skillsTab].group}
                </h2>
              </div>
              {/* Mobile Grid - 4 columns */}
              <div className="grid grid-cols-4 gap-3 md:hidden">
                {skillSections[skillsTab].keys.map((key) => {
                  const skill = allSkillDetails.find(s => s.key === key);
                  if (!skill) return null;
                  return (
                    <SkillCard key={key} skill={skill} styles={styles} isMobile={true} />
                  );
                })}
              </div>
              {/* Desktop Grid - 2 columns */}
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {skillSections[skillsTab].keys.map((key) => {
                  const skill = allSkillDetails.find(s => s.key === key);
                  if (!skill) return null;
                  return (
                    <SkillCard key={key} skill={skill} styles={styles} isMobile={false} />
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Animation styles */}
      <style>{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideup {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein {
          animation: fadein 0.6s ease-out forwards;
        }
        .animate-slideup {
          animation: slideup 0.8s ease-out forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </section>
  );
}