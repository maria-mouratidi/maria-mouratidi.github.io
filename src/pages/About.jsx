import React, { useState } from "react";
import {
  FaBriefcase, FaGraduationCap, FaCode, FaTrophy, 
  FaServer, FaTools, FaDatabase, FaCheckCircle, FaExternalLinkAlt,
  FaMapMarkerAlt, FaCalendarAlt, FaJira
} from "react-icons/fa";
import {
  SiPython, SiJavascript, SiReact, SiJupyter, 
  SiTensorflow, SiPytorch, SiScikitlearn, SiMysql
} from "react-icons/si";
import { useTheme } from "../ThemeContext";

// Theme styles
const themeStyles = {
  icy: {
    cardBg: "bg-white/10 backdrop-blur-xl border-white/20",
    cardHover: "hover:bg-white/20 hover:border-cyan-300/40 hover:shadow-cyan-400/30",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-cyan-600",
    glow: "shadow-cyan-500/10",
    button: "bg-cyan-100/50 text-cyan-700 hover:bg-cyan-200/80",
    buttonOutline: "border border-cyan-300 text-cyan-700",
    tabBg: "bg-cyan-100/10",
    tabActive: "bg-cyan-500 text-white",
    tabHover: "hover:bg-cyan-100 hover:text-cyan-800",
  },
  hot: {
    cardBg: "bg-white/10 backdrop-blur-xl border-white/20",
    cardHover: "hover:bg-white/20 hover:border-yellow-300/40 hover:shadow-yellow-400/30",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-yellow-600",
    glow: "shadow-yellow-500/10",
    button: "bg-yellow-100/50 text-yellow-700 hover:bg-yellow-200/80",
    buttonOutline: "border border-yellow-300 text-yellow-700",
    tabBg: "bg-yellow-100/10",
    tabActive: "bg-yellow-500 text-white",
    tabHover: "hover:bg-yellow-100 hover:text-yellow-800",
  },
  dark: {
    cardBg: "bg-gray-900/70 backdrop-blur-xl border-gray-700/40",
    cardHover: "hover:bg-gray-800/90 hover:border-blue-500/50 hover:shadow-blue-500/30",
    text: "text-gray-100",
    textSecondary: "text-gray-300",
    accent: "text-blue-400",
    glow: "shadow-blue-500/10",
    button: "bg-blue-900/30 text-blue-300 hover:bg-blue-800/60",
    buttonOutline: "border border-blue-700 text-blue-400",
    tabBg: "bg-gray-800/60",
    tabActive: "bg-blue-600 text-white",
    tabHover: "hover:bg-gray-700 hover:text-blue-300",
  },
};

// Skill sections data
const skillSections = [
  {
    group: "Languages",
    icon: <FaCode className="text-yellow-500" />,
    keys: ["python", "javascript", "r"],
    items: [
      { name: "Python", level: 90, icon: <SiPython className="text-blue-500" /> },
      { name: "JavaScript", level: 75, icon: <SiJavascript className="text-yellow-500" /> },
      { name: "R", level: 70 }
    ]
  },
  {
    group: "AI & Machine Learning",
    icon: <SiPytorch className="text-orange-500" />,
    keys: ["tensorflow", "pytorch", "scikit-learn"],
    items: [
      { name: "TensorFlow", level: 85, icon: <SiTensorflow className="text-orange-500" /> },
      { name: "PyTorch", level: 80, icon: <SiPytorch className="text-red-500" /> },
      { name: "scikit-learn", level: 85, icon: <SiScikitlearn className="text-blue-500" /> },
      { name: "Jupyter", level: 90, icon: <SiJupyter className="text-orange-600" /> }
    ]
  },
  {
    group: "Web Development",
    icon: <SiReact className="text-blue-400" />,
    keys: ["react", "html", "css"],
    items: [
      { name: "React", level: 75, icon: <SiReact className="text-blue-400" /> },
      { name: "HTML", level: 80 },
      { name: "CSS", level: 75 }
    ]
  },
  {
    group: "Databases",
    icon: <FaDatabase className="text-green-500" />,
    keys: ["mysql", "postgresql"],
    items: [
      { name: "MySQL", level: 75, icon: <SiMysql className="text-blue-500" /> },
      { name: "PostgreSQL", level: 70 }
    ]
  },
  {
    group: "Tools & Platforms",
    icon: <FaTools className="text-gray-500" />,
    keys: ["git", "docker", "aws"],
    items: [
      { name: "Git", level: 80 },
      { name: "Docker", level: 65 },
      { name: "AWS", level: 60 }
    ]
  },
  {
    group: "Project Management",
    icon: <FaJira className="text-blue-500" />,
    keys: ["jira", "agile"],
    items: [
      { name: "Agile Methodology", level: 75 },
      { name: "JIRA", level: 70, icon: <FaJira className="text-blue-500" /> }
    ]
  }
];

// Highlights, experience, education data
const highlights = [
  { emoji: "🎓", text: "Master's degree in Cognitive Science with focus on AI", link: "" },
  { emoji: "🏅", text: "Published research on Natural Language Processing techniques", link: "" },
  { emoji: "🌟", text: "Led cross-functional AI research teams on multiple projects", link: "" },
  { emoji: "📄", text: "Authored papers on cognitive modeling and machine learning applications", link: "" }
];

const experienceGroups = [
  {
    label: "Research Institute",
    entries: [
      {
        title: "AI Research Scientist",
        company: "Cognitive Research Institute",
        location: "Athens, Greece",
        period: "Jan 2023 – Present",
        description: [
          "Led research initiatives focusing on Natural Language Processing and knowledge representation",
          "Developed machine learning models for text analysis and sentiment detection",
          "Published 2 papers in peer-reviewed international journals",
          "Collaborated with interdisciplinary teams on cognitive modeling projects",
          "Mentored junior researchers and supervised thesis projects"
        ],
        skills: [
          "Python",
          "TensorFlow",
          "PyTorch",
          "NLP",
          "Research Design",
          "Mentoring"
        ]
      }
    ]
  },
  {
    label: "Tech Company",
    entries: [
      {
        title: "Machine Learning Engineer",
        company: "TechSolutions Inc.",
        location: "Remote",
        period: "June 2021 – Dec 2022",
        description: [
          "Implemented machine learning algorithms for data analysis and predictive modeling",
          "Developed and maintained AI-based features for web applications",
          "Optimized model performance and reduced training time by 40%",
          "Collaborated with UX designers to create intuitive AI-powered interfaces",
          "Participated in Agile development cycles with biweekly sprints"
        ],
        skills: [
          "Python",
          "scikit-learn",
          "React",
          "PostgreSQL",
          "Git",
          "Agile"
        ]
      }
    ]
  }
];

const educationGroups = [
  {
    label: "Master's Degree",
    icon: <FaGraduationCap className="text-green-500 text-2xl" />,
    entries: [
      {
        degree: "MSc in Cognitive Science",
        institution: "National University of Athens",
        location: "Athens, Greece",
        period: "2019 - 2021",
        grade: "GPA: 3.9/4.0"
      }
    ]
  },
  {
    label: "Bachelor's Degree",
    icon: <FaGraduationCap className="text-blue-500 text-2xl" />,
    entries: [
      {
        degree: "BSc in Computer Science",
        institution: "Technical University of Athens",
        location: "Athens, Greece",
        period: "2015 - 2019",
        grade: "GPA: 3.7/4.0"
      }
    ]
  },
  {
    label: "Certifications",
    icon: <FaTrophy className="text-yellow-500 text-2xl" />,
    entries: [
      {
        degree: "Deep Learning Specialization",
        institution: "Coursera / DeepLearning.AI",
        location: "Online",
        period: "2020",
        grade: "Completed with Distinction"
      },
      {
        degree: "Machine Learning Engineer Nanodegree",
        institution: "Udacity",
        location: "Online",
        period: "2021",
        grade: "Completed with Excellence"
      }
    ]
  }
];

// Components
function MainTabBar({ activeTab, setActiveTab, styles }) {
  const tabs = [
    { id: "skills", label: "Skills", icon: <FaCode className="text-blue-500" /> },
    { id: "highlights", label: "Highlights", icon: <FaTrophy className="text-yellow-500" /> },
    { id: "experience", label: "Experience", icon: <FaBriefcase className="text-purple-600" /> },
    { id: "education", label: "Education", icon: <FaGraduationCap className="text-green-500" /> }
  ];
  return (
    <div className="grid grid-cols-4 md:flex md:flex-row items-center justify-center mb-8 md:mb-12 gap-2 md:gap-0">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            flex flex-col items-center p-2 md:p-3 rounded-xl md:mx-2
            transition-all duration-300 ${styles.tabHover}
            ${activeTab === tab.id ? styles.tabActive : `${styles.tabBg}`}
          `}
        >
          <div className="text-lg md:text-xl mb-1">
            {tab.icon}
          </div>
          <span className="text-xs md:text-sm font-medium">{tab.label}</span>
        </button>
      ))}
    </div>
  );
}

function SideTabBar({ groups, activeGroup, setActiveGroup, styles }) {
  return (
    <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-x-visible gap-2 md:w-48 mb-6 md:mb-0 pb-2 md:pb-0">
      {groups.map((section, idx) => (
        <button
          key={section.group}
          onClick={() => setActiveGroup(idx)}
          className={`
            flex items-center gap-2 p-2 md:p-3 rounded-xl
            whitespace-nowrap md:whitespace-normal
            transition-all duration-300 ${styles.tabHover}
            ${activeGroup === idx ? styles.tabActive : `${styles.tabBg}`}
          `}
        >
          <span className="text-lg">{section.icon || <FaCode />}</span>
          <span className="text-sm font-medium">{section.group}</span>
        </button>
      ))}
    </div>
  );
}

// Main component
export default function About() {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
  const [activeTab, setActiveTab] = useState("skills");
  const [skillsTab, setSkillsTab] = useState(0);
  const [expTab, setExpTab] = useState(0);
  const [eduTab, setEduTab] = useState(0);

  // Education heading styling per theme
  const edulabelStyle = `text-xl md:text-2xl font-bold ${styles.text}`;

  return (
    <section id="about" className="relative w-full max-w-7xl mx-auto px-4 py-8 md:py-16 scroll-mt-24">
      {/* About Me heading and description - always at the top */}
      <div className="text-center mb-8 pt-8">
        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold ${styles.text} mb-4`}>
          About <span className={styles.accent}>Me</span>
        </h1>
        <p className={`text-lg md:text-xl ${styles.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
          AI Researcher and Cognitive Scientist with expertise in Machine Learning and Natural Language Processing.
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
              activeGroup={skillsTab}
              setActiveGroup={setSkillsTab}
              styles={styles}
            />
            <div className="flex-1 grid gap-6 grid-cols-1 animate-slideup">
              {skillSections[skillsTab].items.map((skill, idx) => (
                <div
                  key={skill.name}
                  className={`${styles.cardBg} ${styles.cardHover} border rounded-xl p-4 transition-all duration-300 ${styles.glow} shadow-lg`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xl md:text-2xl">
                      {skill.icon || skillSections[skillsTab].icon}
                    </span>
                    <h3 className={`text-lg font-bold ${styles.text}`}>{skill.name}</h3>
                  </div>
                  <div className={`w-full bg-gray-200 rounded-full h-2.5 mb-1 dark:bg-gray-700`}>
                    <div
                      className="h-2.5 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${skill.level}%`,
                        backgroundColor: theme === "dark" ? "#3b82f6" : theme === "hot" ? "#f59e0b" : "#06b6d4"
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs mt-1">
                    <span className={styles.textSecondary}>Beginner</span>
                    <span className={styles.textSecondary}>Advanced</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Highlights */}
        {activeTab === "highlights" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-fadein">
            {highlights.map((highlight, idx) => (
              <a
                key={idx}
                href={highlight.link || "#"}
                target={highlight.link ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className={`
                  ${styles.cardBg} ${styles.cardHover} border rounded-xl p-5
                  flex items-start gap-4 transition-all duration-300
                  ${styles.glow} shadow-lg animate-slideup
                  ${highlight.link ? "cursor-pointer" : "cursor-default"}
                `}
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <span className="text-3xl md:text-4xl">{highlight.emoji}</span>
                <div>
                  <p className={`${styles.text}`}>{highlight.text}</p>
                  {highlight.link && (
                    <div className="flex items-center gap-1 mt-2 text-sm">
                      <span className={styles.accent}>Learn More</span>
                      <FaExternalLinkAlt className={`${styles.accent} text-xs`} />
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Experience */}
        {activeTab === "experience" && (
          <div className="animate-fadein">
            <SideTabBar
              groups={experienceGroups}
              activeGroup={expTab}
              setActiveGroup={setExpTab}
              styles={styles}
            />
            <div className="mt-6">
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
