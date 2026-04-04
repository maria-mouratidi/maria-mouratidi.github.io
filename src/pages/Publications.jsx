import React, { useState, useEffect, useRef } from "react";
import { FaExternalLinkAlt, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import { RiDoubleQuotesL } from "react-icons/ri";
import { useTheme } from "../ThemeContext";

// ===== THEME STYLES =====
const themeStyles = {
  light: {
    cardBg: "bg-white/60 backdrop-blur-md border-gray-200/30",
    cardHover: "hover:bg-white/80 hover:border-dusty-500/20 hover:scale-[1.02]",
    text: "text-gray-900",
    textSecondary: "text-gray-500",
    accent: "text-dusty-700",
    button: "bg-white/70 hover:bg-dusty-50 text-gray-700 border-gray-200/50 hover:border-dusty-500/30",
    badge: "bg-white/50 text-gray-600 border-gray-200/30",
    glow: "",
    linkButton: "bg-white/70 hover:bg-dusty-50 text-gray-700 border-gray-200/50 hover:border-dusty-500/30"
  },
  dark: {
    cardBg: "bg-neutral-900/60 backdrop-blur-md border-white/[0.08]",
    cardHover: "hover:bg-neutral-900/70 hover:border-dusty-600/20 hover:scale-[1.02]",
    text: "text-gray-100",
    textSecondary: "text-gray-400",
    accent: "text-dusty-600",
    button: "bg-white/[0.06] hover:bg-white/[0.10] text-gray-300 border-white/[0.10] hover:border-dusty-600/30",
    badge: "bg-white/[0.06] text-gray-400 border-white/[0.10]",
    glow: "",
    linkButton: "bg-white/[0.06] hover:bg-white/[0.10] text-gray-300 border-white/[0.10] hover:border-dusty-600/30"
  }
};

// ======= PUBLICATIONS DATA =======
const publications = [
  {
    id: 1,
    title: "Comparing Eye-gaze and Transformer Attention Mechanisms in Reading Tasks",
    conference: "Recent Advances in Natural Language Processing (RANLP) 2025",
    journal: "",
    place: "Varna, Bulgaria",
    year: "2025",
    authors: "Maria Mouratidi, Massimo Poesio",
    abstract: `As transformers become increasingly prevalent in NLP research, evaluating their cognitive alignment with human language processing has become essential for validating them as
                models of human language. This study compares eye-gaze patterns in human reading with
                transformer attention using different attention
                representations (raw attention, attention flow,
                gradient-based saliency). We employ both statistical correlation analysis and predictive modeling using PCA-reduced representations of
                eye-tracking features across two reading tasks.
                The findings reveal lower correlations and predictive capacity for the decoder model compared to the encoder model, with implications
                for the gap between behavioral performance
                and cognitive plausibility of different transformer designs.`,
    link: "https://aclanthology.org/2025.gaze4nlp-1.4/",
    type: "Conference Paper",
    status: "Accepted",
    image: "images/attn.png"
  },
  // Add more publications here
];

const PublicationCard = ({ publication, index }) => {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.light;
  const [isVisible, setIsVisible] = useState(false);
  const [showFullAbstract, setShowFullAbstract] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  const truncatedAbstract = publication.abstract?.length > 150 
    ? publication.abstract.substring(0, 150) + "..."
    : publication.abstract;

  return (
    <div
      className={`
        ${styles.cardBg} ${styles.cardHover} border rounded-2xl p-6
        transition-all duration-500 transform ${styles.glow} shadow-lg
        ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
        hover:scale-105
      `}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Publication Image/Preview */}
      {publication.image && (
        <div className="w-full h-48 rounded-xl overflow-hidden bg-white border mb-4 relative">
          <img
            src={publication.image}
            alt={publication.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <span className={`px-2 py-1 rounded-full border font-bold ${styles.badge} text-xs`}>
              {publication.type}
            </span>
          </div>
          {publication.status && (
            <div className="absolute top-2 left-2">
              <span className={`px-2 py-1 rounded-full border font-bold text-xs ${
                publication.status === 'Published' ? 'bg-green-100/80 text-green-800 border-green-400' :
                publication.status === 'Accepted' ? 'bg-blue-100/80 text-blue-800 border-blue-400' :
                'bg-yellow-100/80 text-yellow-800 border-yellow-400'
              }`}>
                {publication.status}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Publication Title */}
      <h3 className={`font-bold ${styles.text} text-xl leading-tight mb-3`}>
        {publication.title}
      </h3>

      {/* Authors */}
      <p className={`${styles.textSecondary} text-sm mb-3 italic`}>
        {publication.authors}
      </p>

      {/* Conference/Journal Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2">
          <span className={`${styles.accent} font-semibold text-sm`}>
            {publication.conference || publication.journal}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className={`${styles.textSecondary}`} />
            <span className={`${styles.textSecondary}`}>{publication.place}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className={`${styles.textSecondary}`} />
            <span className={`${styles.textSecondary}`}>{publication.year}</span>
          </div>
        </div>
      </div>

      {/* Abstract */}
      {publication.abstract && (
        <div className="mb-4">
          <h4 className={`${styles.text} font-semibold text-sm mb-2`}>Abstract:</h4>
          <p className={`${styles.textSecondary} text-sm leading-relaxed`}>
            {showFullAbstract ? publication.abstract : truncatedAbstract}
          </p>
          {publication.abstract.length > 150 && (
            <button
              onClick={() => setShowFullAbstract(!showFullAbstract)}
              className={`${styles.accent} text-sm font-medium mt-1 hover:underline`}
            >
              {showFullAbstract ? 'Show less' : 'Read more'}
            </button>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        {publication.link ? (
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${styles.linkButton} border px-4 py-2 rounded-lg text-sm font-medium
              transition-all duration-300 hover:scale-105 flex items-center gap-2
            `}
          >
            <FaExternalLinkAlt className="text-xs" />
            View Publication
          </a>
        ) : (
          <div
            className={`
              bg-gray-400/20 border border-gray-400/40 text-gray-500 px-4 py-2 rounded-lg text-sm font-medium
              flex items-center gap-2 cursor-not-allowed
            `}
          >
            <FaExternalLinkAlt className="text-xs" />
            View Publication
          </div>
        )}
      </div>
    </div>
  );
};

const Publications = () => {
  const { theme } = useTheme();
  const styles = themeStyles[theme] || themeStyles.light;
  const sectionRef = useRef(null);

  return (
    <div className="min-h-screen p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div id="publications" ref={sectionRef} className="pt-[120px] -mt-[120px]"></div>
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1
            className={`pt-10 text-4xl sm:text-5xl font-light tracking-tight ${styles.text} mb-4 flex flex-wrap items-center justify-center gap-2 break-words`}
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
              minWidth: 0,
              maxWidth: "100%",
              whiteSpace: "normal"
            }}
          >
            <RiDoubleQuotesL className={`shrink-0 ${styles.accent}`} />
            <span style={{ minWidth: 0, maxWidth: "100%" }}>Publications</span>
          </h1>
          <p className={`text-xl ${styles.textSecondary} max-w-3xl mx-auto`}>
          </p>
        </div>

        {/* Publications Grid */}
        <div className={`grid gap-8 ${publications.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {publications.map((publication, index) => (
            <PublicationCard
              key={publication.id}
              publication={publication}
              index={index}
            />
          ))}
        </div>

        {/* Empty State */}
        {publications.length === 0 && (
          <div className="text-center py-20">
            <div className={`text-6xl ${styles.textSecondary} mb-4`}>📚</div>
            <h3 className={`text-2xl font-bold ${styles.text} mb-2`}>No publications yet</h3>
            <p className={`${styles.textSecondary}`}>
              Publications will be displayed here as they become available.
            </p>
          </div>
        )}
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 767px) {
          .max-w-7xl, .grid, .flex, .publications-section {
            min-width: 0 !important;
            max-width: 100vw !important;
            box-sizing: border-box;
          }
          h1, .publications-title {
            min-width: 0 !important;
            max-width: 100vw !important;
            box-sizing: border-box;
            word-break: break-word;
            overflow-wrap: break-word;
          }
          .grid > div {
            min-width: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Publications;