import React, { useState } from "react";
import {
  FaBriefcase, FaGraduationCap, FaCode, FaTrophy, FaBuilding, FaSchool, FaUniversity,
  FaServer, FaTools, FaDatabase, FaCheckCircle, FaExternalLinkAlt,
  FaMapMarkerAlt, FaCalendarAlt, FaReact, FaNodeJs, FaGitAlt, FaDocker, FaJira, FaBug, FaJava, FaCloud
} from "react-icons/fa";
import {
  SiPython, SiJavascript, SiC, SiCsharp, SiPhp, SiRedux, SiPostman, SiBootstrap, SiTailwindcss, SiExpress, SiMysql, SiMongodb, SiJest, SiBitbucket, SiFirebase, SiRailway, SiVercel, SiDjango, SiMicrosoftsqlserver, SiCloudera
} from "react-icons/si";
import { FaChrome } from "react-icons/fa";
import { useTheme } from "../ThemeContext";

// ========== THEME STYLES (certificate style) ==========
const themeStyles = {
  light: {
    cardBg: "bg-white/15 backdrop-blur-xl border-yellow-200/20",
    cardHover: "hover:bg-yellow-50/25 hover:border-yellow-400/40 hover:shadow-yellow-400/20",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-yellow-600",
    cardTitle: "font-bold text-gray-800",
    cardDesc: "font-normal text-gray-700",
    percent: "text-yellow-600",
    barBg: "bg-yellow-100/50",
    bar: "from-yellow-400 to-yellow-200",
    button: "bg-yellow-400/20 hover:bg-yellow-400/30 text-yellow-900 border-yellow-500/40",
    glow: "shadow-yellow-400/20",
    badge: "bg-yellow-100/30 text-yellow-900 border-yellow-400/40",
    filterActive: "bg-yellow-500/30 text-yellow-900 border-yellow-500/60",
    sidebarActive: "bg-yellow-400/20 text-yellow-900 border-yellow-500/40 font-bold",
    sidebar: "text-yellow-900 hover:text-yellow-700"
  },
  dark: {
    cardBg: "bg-gray-900/15 backdrop-blur-xl border-gray-700/20",
    cardHover: "hover:bg-gray-900/25 hover:border-blue-500/40 hover:shadow-blue-400/20",
    text: "text-gray-100",
    textSecondary: "text-gray-300",
    accent: "text-blue-400",
    cardTitle: "font-bold text-gray-100",
    cardDesc: "font-normal text-gray-300",
    percent: "text-blue-400",
    barBg: "bg-blue-900/50",
    bar: "from-blue-400 to-blue-900",
    button: "bg-blue-600/20 hover:bg-blue-600/30 text-blue-200 border-blue-500/40",
    glow: "shadow-blue-400/20",
    badge: "bg-blue-900/30 text-blue-200 border-blue-500/40",
    filterActive: "bg-blue-600/30 text-blue-200 border-blue-500/60",
    sidebarActive: "bg-blue-600/20 text-blue-200 border-blue-500/40 font-bold",
    sidebar: "text-blue-200 hover:text-blue-400"
  }
};

const allSkillDetails = [
  { key: "python", name: "Python", icon: <SiPython className="text-yellow-500"/>, desc: "Programming Language", percent: 90 },
  { key: "java", name: "Java", icon: <FaJava className="text-red-500"/>, desc: "Programming Language", percent: 85 },
  { key: "js", name: "Javascript", icon: <SiJavascript className="text-yellow-400"/>, desc: "Programming Language", percent: 92 },
  { key: "php", name: "PHP", icon: <SiPhp className="text-indigo-400"/>, desc: "Programming Language", percent: 80 },
  { key: "sql", name: "SQL", icon: <SiMicrosoftsqlserver className="text-red-800"/>, desc: "Programming Language", percent: 75 },
  { key: "react", name: "React.js", icon: <FaReact className="text-cyan-400"/>, desc: "Front-End Framework", percent: 88 },
  { key: "redux", name: "Redux.js", icon: <SiRedux className="text-purple-600"/>, desc: "State Management", percent: 78 },
  { key: "bootstrap", name: "Bootstrap", icon: <SiBootstrap className="text-purple-700"/>, desc: "CSS Framework", percent: 82 },
  { key: "tailwind", name: "Tailwind", icon: <SiTailwindcss className="text-cyan-400"/>, desc: "CSS Framework", percent: 84 },
  { key: "nodejs", name: "Node.js", icon: <FaNodeJs className="text-green-600"/>, desc: "Backend Runtime", percent: 85 },
  { key: "express", name: "Express.js", icon: <SiExpress className="text-black dark:text-white"/>, desc: "Backend Framework", percent: 80 },
  { key: "django", name: "Django", icon: <SiDjango className="text-green-900"/>, desc: "Backend Framework", percent: 75 },
  { key: "restapi", name: "RESTful APIs", icon: <FaServer className="text-blue-400"/>, desc: "API Design", percent: 82 },
  { key: "gcp", name: "Google Cloud Platform", icon: <FaCloud className="text-blue-400"/>, desc: "Cloud Platform", percent: 72 },
  { key: "mongodb", name: "MongoDB", icon: <SiMongodb className="text-green-500"/>, desc: "NoSQL Database", percent: 84 },
  { key: "mysql", name: "MySQL", icon: <SiMysql className="text-blue-700"/>, desc: "RDBMS", percent: 80 },
  { key: "firebase", name: "Firebase", icon: <SiFirebase className="text-yellow-500"/>, desc: "Cloud Database", percent: 77 },
  { key: "cloudera", name: "Cloudera", icon: <SiCloudera className="text-yellow-900"/>, desc: "Big Data Platform", percent: 70 },
  { key: "jest", name: "Jest", icon: <SiJest className="text-pink-600"/>, desc: "Testing", percent: 78 },
  { key: "postman", name: "Postman", icon: <SiPostman className="text-orange-500"/>, desc: "API Testing", percent: 86 },
  { key: "chromedevtools", name: "Chrome Dev Tools", icon: <FaChrome className="text-blue-500"/>, desc: "Debugging", percent: 85 },
  { key: "git", name: "Git", icon: <FaGitAlt className="text-orange-700"/>, desc: "Version Control", percent: 92 },
  { key: "bitbucket", name: "Bitbucket", icon: <SiBitbucket className="text-blue-600"/>, desc: "Version Control", percent: 72 },
  { key: "docker", name: "Docker", icon: <FaDocker className="text-blue-500"/>, desc: "Containerization", percent: 85 },
  { key: "railway", name: "Railway", icon: <SiRailway className="text-indigo-400"/>, desc: "Cloud Deployment", percent: 69 },
  { key: "vercel", name: "Vercel", icon: <SiVercel className="text-black dark:text-white"/>, desc: "Cloud Deployment", percent: 72 },
  { key: "jira", name: "Jira", icon: <FaJira className="text-blue-500"/>, desc: "Project Management", percent: 78 },
  { key: "agile", name: "Agile & Scrum", icon: <FaTools className="text-green-600"/>, desc: "Methodology", percent: 80 },
];

// GROUPS
const skillSections = [
  { group: "Programming Languages", icon: <FaCode className="text-yellow-600" />, keys: ["python", "C++"] }, //TODO: add C++ graphics
  // { group: "Front-End Development", icon: <FaReact className="text-cyan-400" />, keys: ["react", "redux", "bootstrap", "tailwind"] },
  { group: "Back-End Development", icon: <FaServer className="text-blue-500" />, keys: [ "restapi"] },
  // { group: "Databases", icon: <FaDatabase className="text-orange-700" />, keys: ["mongodb", "mysql", "firebase", "cloudera"] },
  // { group: "Testing & Debugging", icon: <FaBug className="text-red-500" />, keys: ["jest", "postman", "chromedevtools"] },
  { group: "DevOps & Deployment", icon: <FaTools className="text-green-600" />, keys: ["git", "docker"] },
  { group: "Project Management", icon: <FaJira className="text-blue-500" />, keys: ["jira", "agile"] }
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
          "Handled full-stack web application development for logistics and healthcare SaaS products.",
          "Developed and maintained core features while ensuring scalability and performance improvements.",
          "Integrated REST APIs and optimized data flow for smooth user experience.",
          "Actively participated in Agile ceremonies, including sprint planning and retrospectives.",
          "Conducted code reviews and improved overall code quality.",
          "Gave product demos to US-based clients and incorporated feedback effectively."
        ],
        skills: [
          "Node.js",
          "React.js",
          "MongoDB",
          "Firebase",
          "MySQL",
          "GCP",
          "Firebase",
          "REST APIs",
          "Agile",
          "Code Reviews",
          "Client Demos"
        ]
      }
    ]
  },
  {
    label: "Utrecht University",
    entries: [
      {
        title: "Teaching Assistant - Human Centered Machine Learning",
        company: "Utrecht University",
        location: "Utrecht, Netherlands",
        period: "04/2025 – 08/2025",
        description: [
          "Leading lab sessions",
          "Supporting students with assignments",
          "Grading coursework",
        ],
        skills: [
          "Node.js",
          "React.js",
          "MongoDB",
          "Firebase",
          "MySQL",
          "GCP",
          "Firebase",
          "REST APIs",
          "Agile",
          "Code Reviews",
          "Client Demos"
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
          "Supporting first-year students",
          "Helping with university integration, admin, team building, socializing",
        ],
        skills: [
          "Mentoring",
          "Presenting",
          "Communication",
        ]
      },
      {
        title: "Research Intern",
        company: "Tilburg University",
        location: "Tilburg, Netherlands",
        period: "Aug 2021 – Apr 2023",
        description: [
          "Finetuning GPT-2 with human next-word prediction",
          "Analyzed generazability of the finetuned model across datasets",
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
    icon: <FaGraduationCap className="text-yellow-600" />,
    entries: [{  institution: "Utrecht University", period: "2025", location: "Utrecht, Netherlands", grade: "8.2 GPA", }]
  },
  {
    label: "BSc Cognitive Science and Artificial Intelligence",
    icon: <FaUniversity className="text-blue-500" />,
    entries: [{  institution: "Tilburg University", period: "2023", location: "Tilburg, Netherlands", grade: "8 GPA, Cum Laude" }]
  }
];

// ========== COMPONENTS ==========
function MainTabBar({ activeTab, setActiveTab, styles }) {
  const tabs = [
    { id: "skills", label: "Skills", icon: <FaCode className="text-blue-500" /> },
    // { id: "highlights", label: "Highlights", icon: <FaTrophy className="text-yellow-500" /> },
    { id: "experience", label: "Experience", icon: <FaBriefcase className="text-purple-600" /> },
    { id: "education", label: "Education", icon: <FaGraduationCap className="text-green-500" /> }
  ];
  return (
    <div className="grid grid-cols-4 md:flex md:flex-row items-center justify-center mb-8 md:mb-12 gap-2 md:gap-0">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-1 md:gap-2 px-3 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 justify-center text-sm md:text-base
            ${activeTab === tab.id
              ? `${styles.button} border ${styles.glow} shadow-lg scale-105`
              : `${styles.textSecondary} hover:${styles.text}`
            }`}
          style={{ minWidth: "auto" }}
        >
          <span className="text-base md:text-lg flex items-center">
            {tab.icon}
          </span>
          <span className="hidden sm:inline">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

function SideTabBar({ groups, activeIndex, setActiveIndex, iconMap = {} }) {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.light;
  return (
    <div className="grid grid-cols-2 md:flex md:flex-col gap-2 md:pr-6 mb-4 md:mb-0 w-full md:w-auto">
      {groups.map((g, idx) => (
        <button
          key={g.label || g.group}
          onClick={() => setActiveIndex(idx)}
          className={`
            text-left px-3 md:px-5 py-2 md:py-3 rounded-xl font-semibold transition-all duration-300 border flex items-center gap-1 md:gap-2 justify-left md:justify-start text-xs md:text-base
            ${activeIndex === idx
              ? `${styles.sidebarActive} border-2`
              : `${styles.sidebar} border-transparent`}
          `}
        >
          {iconMap && iconMap[g.label || g.group] ? iconMap[g.label || g.group] : g.icon}
          <span className="whitespace-nowrap text-xs md:text-lg leading-tight">{g.label || g.group}</span>
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
        minHeight: 110,
        padding: "1.2rem 1.4rem",
        border: "1.5px solid rgba(0,195,255,0.11)",
        backdropFilter: "blur(7px)"
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-3xl">{skill.icon}</span>
          <div>
            <div className={`text-[18px] ${styles.cardTitle}`}>{skill.name}</div>
            <div className={`text-[15px] ${styles.cardDesc}`} style={{marginTop: -2}}>{skill.desc}</div>
          </div>
        </div>
        <div className={`font-bold text-xl ${styles.percent}`}>{skill.percent}%</div>
      </div>
      {/* Progress Bar */}
      <div className="w-full mt-2 mb-1">
        <div className={`h-[6px] rounded-full relative overflow-hidden ${styles.barBg}`}>
          <div
            className={`absolute top-0 left-0 h-full rounded-full transition-all duration-300 ${styles.bar}`}
            style={{
              width: `${skill.percent}%`,
              background: styles.bar === "from-cyan-400 to-cyan-200"
                ? "linear-gradient(90deg, #22d3ee 25%, #a5f3fc 100%)"
                : styles.bar === "from-yellow-400 to-yellow-200"
                ? "linear-gradient(90deg, #facc15 25%, #fef08a 100%)"
                : "linear-gradient(90deg, #60a5fa 25%, #1e3a8a 100%)"
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

// ========== MAIN ==========
export default function About() {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
  const [activeTab, setActiveTab] = useState("skills");
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
        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold ${styles.text} mb-4`}>
          About <span className={styles.accent}>Me</span>
        </h1>
        <p className={`text-lg md:text-xl ${styles.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
          AI Researcher and Engineer, focused on Natural Language Processing.
        </p>
      </div>
      {/* Main Tabs */}
      <MainTabBar activeTab={activeTab} setActiveTab={setActiveTab} styles={styles} />
      <div className="min-h-[400px] md:min-h-[600px] transition-all duration-500">
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
              <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-2 gap-5">
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
        {/* Highlights */}
        {activeTab === "highlights" && (
          <div className="w-full transition-all duration-500 animate-fadein">
            <div className={`w-full mx-auto ${styles.cardBg} ${styles.cardHover} border rounded-2xl shadow-xl p-4 md:p-7 ${styles.glow} transition-all duration-500`}>
              <div className="flex items-center mb-4 md:mb-6 gap-3">
                <FaTrophy className={`text-2xl md:text-3xl ${styles.accent}`} />
                <h2 className={`text-2xl md:text-3xl font-bold ${styles.text}`}>Highlights</h2>
              </div>
              <ul className="flex flex-col gap-4 md:gap-6 w-full">
                {highlights.map((ach, i) => (
                  <li key={i} className="flex gap-3 md:gap-4 items-start animate-slideup" style={{ animationDelay: `${i * 0.11}s` }}>
                    <span className="text-xl md:text-2xl mt-1 leading-none select-none">{ach.emoji}</span>
                    <div className="flex flex-col w-full">
                      <div className="flex items-center gap-2 text-sm md:text-lg font-medium">
                        <span className={`${styles.text}`}>{ach.text}</span>
                        {ach.link &&
                          <a
                            href={ach.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`ml-1 ${styles.accent} hover:underline inline-flex items-center`}
                          >
                            <FaExternalLinkAlt className="text-xs md:text-sm" />
                          </a>
                        }
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
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
                        <span className="mt-1 text-cyan-400">
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
        {/* Education */}
        {activeTab === "education" && (
          <div className="flex flex-col md:flex-row gap-4 md:gap-7 items-stretch animate-fadein">
            {educationGroups.map((edu, idx) => (
              <div
                key={edu.label}
                className={`flex-1 min-w-[200px] mb-6 md:mb-0 p-4 md:p-6 rounded-2xl border ${styles.cardBg} ${styles.cardHover} ${styles.glow} shadow-lg flex flex-col gap-3 md:gap-4 items-center animate-slideup`}
                style={{ animationDelay: `${idx * 0.16}s` }}
              >
                <div className="mb-2 flex items-center gap-2">
                  {edu.icon}
                  <span className={edulabelStyle}>{edu.label}</span>
                </div>
                {edu.entries.map((entry, idy) => (
                  <div key={idy} className="flex flex-col items-center text-center">
                    <div className="text-base md:text-lg font-bold mb-1 flex items-center gap-2">
                      <FaGraduationCap className="text-cyan-500" />
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