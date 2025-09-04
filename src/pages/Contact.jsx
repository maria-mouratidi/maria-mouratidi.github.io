import React from "react";
import { useTheme } from "../ThemeContext";
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, 
  FaLinkedin, FaTwitter, FaReact, FaHeart 
} from "react-icons/fa";

// Theme-specific styles
const themeStyles = {
  icy: {
    cardBg: "bg-white/10 backdrop-blur-xl border-white/20",
    cardHover: "hover:bg-white/20 hover:border-cyan-300/40 hover:shadow-cyan-400/20",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-cyan-600",
    button: "bg-cyan-500 hover:bg-cyan-400 text-white",
    buttonOutline: "border border-cyan-300 text-cyan-700 hover:bg-cyan-50",
    glow: "shadow-cyan-500/10",
    focus: "focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-50",
  },
  hot: {
    cardBg: "bg-white/10 backdrop-blur-xl border-white/20",
    cardHover: "hover:bg-white/20 hover:border-yellow-300/40 hover:shadow-yellow-400/20",
    text: "text-gray-800",
    textSecondary: "text-gray-600",
    accent: "text-yellow-600",
    button: "bg-yellow-500 hover:bg-yellow-400 text-white",
    buttonOutline: "border border-yellow-300 text-yellow-700 hover:bg-yellow-50",
    glow: "shadow-yellow-500/10",
    focus: "focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-50",
  },
  dark: {
    cardBg: "bg-gray-900/70 backdrop-blur-xl border-gray-700/40",
    cardHover: "hover:bg-gray-800/90 hover:border-blue-500/50 hover:shadow-blue-500/20",
    text: "text-gray-100",
    textSecondary: "text-gray-300",
    accent: "text-blue-400",
    button: "bg-blue-600 hover:bg-blue-500 text-white",
    buttonOutline: "border border-blue-700 text-blue-400 hover:bg-blue-900/50",
    glow: "shadow-blue-500/10",
    focus: "focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-gray-900",
  },
};

// Contact information
const contactInfo = [
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "maria.mouratidi@example.com",
    link: "mailto:maria.mouratidi@example.com",
    description: "For professional inquiries"
  },
  {
    icon: <FaPhone />,
    label: "Phone",
    value: "+30 123 456 7890",
    link: "tel:+301234567890",
    description: "Available weekdays 9am-5pm (GMT+2)"
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Athens, Greece",
    link: "https://maps.google.com/?q=Athens,Greece",
    description: "Currently based in"
  }
];

// Social media links
const socialLinks = [
  {
    icon: <FaGithub />,
    name: "GitHub",
    url: "https://github.com/maria-mouratidi",
    color: "text-gray-800 dark:text-gray-200",
    description: "Check out my code"
  },
  {
    icon: <FaLinkedin />,
    name: "LinkedIn",
    url: "https://linkedin.com/in/mariamouratidi",
    color: "text-blue-600",
    description: "Connect professionally"
  },
  {
    icon: <FaTwitter />,
    name: "Twitter",
    url: "https://twitter.com/mariamouratidi",
    color: "text-blue-400",
    description: "Latest updates"
  }
];

// Contact form component with validation
const ContactForm = ({ styles }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real implementation, this would send the form data
    alert("This form submission would be processed in a real implementation!");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className={`block text-sm font-medium ${styles.text}`}>
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className={`
            mt-1 block w-full rounded-lg shadow-sm
            border-gray-300 bg-white/60 backdrop-blur-sm
            dark:bg-gray-800/50 dark:text-white
            ${styles.focus}
          `}
        />
      </div>
      <div>
        <label htmlFor="email" className={`block text-sm font-medium ${styles.text}`}>
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className={`
            mt-1 block w-full rounded-lg shadow-sm
            border-gray-300 bg-white/60 backdrop-blur-sm
            dark:bg-gray-800/50 dark:text-white
            ${styles.focus}
          `}
        />
      </div>
      <div>
        <label htmlFor="message" className={`block text-sm font-medium ${styles.text}`}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="4"
          required
          className={`
            mt-1 block w-full rounded-lg shadow-sm
            border-gray-300 bg-white/60 backdrop-blur-sm
            dark:bg-gray-800/50 dark:text-white
            ${styles.focus}
          `}
        ></textarea>
      </div>
      <div>
        <button
          type="submit"
          className={`
            w-full flex justify-center py-2 px-4 border border-transparent rounded-lg
            shadow-sm text-sm font-medium ${styles.button}
            focus:outline-none ${styles.focus}
          `}
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default function Contact() {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.icy;
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-16 relative">
      {/* Header centered */}
      <div className="mb-16 flex flex-col items-center justify-center">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className={`text-5xl md:text-6xl font-bold ${styles.text} mb-4`}>
            Get In <span className={styles.accent}>Touch</span>
          </h1>
          <p className={`text-xl ${styles.textSecondary} max-w-3xl mx-auto leading-relaxed`}>
            Have a question or want to collaborate? Feel free to reach out!
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className={`text-2xl md:text-3xl font-bold ${styles.text}`}>
            Contact Information
          </h2>
        </div>
        
        {/* Contact cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactInfo.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target={item.link.startsWith("http") ? "_blank" : "_self"}
              rel="noopener noreferrer"
              className={`
                ${styles.cardBg} ${styles.cardHover} ${styles.glow}
                border rounded-2xl p-6 text-center
                transform transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
              `}
            >
              <div className={`text-3xl ${styles.accent} mb-4 flex justify-center`}>
                {item.icon}
              </div>
              <h3 className={`text-lg font-bold ${styles.text} mb-2`}>
                {item.label}
              </h3>
              <p className={`${styles.textSecondary} mb-1`}>{item.value}</p>
              <p className="text-xs text-gray-500 italic">{item.description}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className={`text-2xl md:text-3xl font-bold ${styles.text}`}>
            Find Me Online
          </h2>
        </div>
        
        {/* Social links grid */}
        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                ${styles.cardBg} ${styles.cardHover} ${styles.glow}
                border rounded-xl p-4
                flex items-center gap-3
                transform transition-all duration-300
                hover:-translate-y-1 hover:shadow-lg
                min-w-[180px]
              `}
            >
              <div className={`text-xl ${social.color}`}>
                {social.icon}
              </div>
              <div>
                <h3 className={`text-sm font-bold ${styles.text}`}>
                  {social.name}
                </h3>
                <p className="text-xs text-gray-500">{social.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div className="mb-16">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-2xl md:text-3xl font-bold ${styles.text}`}>
              Send Me a Message
            </h2>
            <p className={`${styles.textSecondary} mt-2`}>
              I'll get back to you as soon as possible.
            </p>
          </div>
          
          {/* Form */}
          <div className={`${styles.cardBg} border rounded-2xl p-6 md:p-8 ${styles.glow} shadow-lg`}>
            <ContactForm styles={styles} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-16 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <div className="flex flex-col items-center md:items-start">
                <h2 className={`text-xl font-bold ${styles.text} mb-1`}>Maria Mouratidi</h2>
                <p className={`${styles.textSecondary} text-sm`}>AI Researcher & Cognitive Scientist</p>
              </div>
            </div>
            
            {/* Footer links */}
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#home" className={`${styles.textSecondary} hover:${styles.accent} text-sm transition-colors`}>Home</a>
                <a href="#about" className={`${styles.textSecondary} hover:${styles.accent} text-sm transition-colors`}>About</a>
                <a href="#projects" className={`${styles.textSecondary} hover:${styles.accent} text-sm transition-colors`}>Projects</a>
                <a href="#contact" className={`${styles.textSecondary} hover:${styles.accent} text-sm transition-colors`}>Contact</a>
              </div>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 pb-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className={`text-sm ${styles.textSecondary} flex items-center gap-1 justify-center md:justify-start`}>
                  © {currentYear} Maria Mouratidi. Made with
                  <FaHeart className={`${styles.accent} animate-pulse`} />
                  in Greece
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
            .animate-spin-slow {
              animation: none;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
