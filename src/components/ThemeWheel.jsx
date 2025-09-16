import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FaSnowflake, FaFire, FaMoon } from "react-icons/fa";
import { MdSunny } from "react-icons/md"; // <-- Add this import
import { useTheme } from "../ThemeContext";

// Helper: SVG arc path with enhanced precision
function describeArc(cx, cy, rOuter, rInner, startAngle, endAngle) {
  const startRad = (Math.PI / 180) * startAngle;
  const endRad = (Math.PI / 180) * endAngle;
  const x1 = cx + rOuter * Math.cos(startRad);
  const y1 = cy + rOuter * Math.sin(startRad);
  const x2 = cx + rOuter * Math.cos(endRad);
  const y2 = cy + rOuter * Math.sin(endRad);
  const x3 = cx + rInner * Math.cos(endRad);
  const y3 = cy + rInner * Math.sin(endRad);
  const x4 = cx + rInner * Math.cos(startRad);
  const y4 = cy + rInner * Math.sin(startRad);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return [
    "M", x1.toFixed(3), y1.toFixed(3),
    "A", rOuter, rOuter, 0, largeArc, 1, x2.toFixed(3), y2.toFixed(3),
    "L", x3.toFixed(3), y3.toFixed(3),
    "A", rInner, rInner, 0, largeArc, 0, x4.toFixed(3), y4.toFixed(3),
    "Z"
  ].join(" ");
}

const themeOrder = ["light", "dark"];
const themeColors = {
  light: "#e2e8f0",
  dark: "#475569",
};
const themeAccents = {
  light: "#fbbf24",
  dark: "#64748b",
};
const themeIcons = {
  light: <MdSunny color="#fbbf24" />, // <-- Use MdSunny for light theme
  dark: <FaMoon color="#64748b" />,
};

// Memoized theme arc component
const ThemeArc = React.memo(({ 
  theme, 
  isActive, 
  isHovered, 
  path, 
  size, 
  onThemeSelect, 
  onHover, 
  onLeave 
}) => (
  <g>
    {/* Main arc */}
    <path
      d={path}
  fill={isActive ? `url(#${theme}Gradient)` : (isHovered ? `url(#${theme}Gradient)` : "#f8fafc")}
      stroke={themeColors[theme]}
      strokeWidth={size * (isActive ? 0.015 : 0.012)}
      style={{
        transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
        cursor: isActive ? "default" : "pointer",
        transform: isHovered && !isActive ? "scale(1.08)" : "scale(1)",
        transformOrigin: `50% 50%`,
        filter: isActive ? "url(#activeGlow)" : "none",
        opacity: isActive ? 1 : (isHovered ? 0.9 : 0.8)
      }}
      onClick={isActive ? undefined : onThemeSelect}
      onMouseEnter={!isActive ? onHover : undefined}
      onMouseLeave={onLeave}
    />
    
    {/* Inner highlight */}
    <path
      d={path}
      fill="none"
      stroke={isActive ? "#ffffff" : themeAccents[theme]}
      strokeWidth={size * 0.008}
      style={{
        opacity: isActive ? 0.6 : 0.4,
        pointerEvents: "none",
        transition: "opacity 0.3s ease"
      }}
    />
    
    {/* Outer accent ring */}
    <path
      d={path}
      fill="none"
      stroke={theme === "light" ? "#f59e0b" : themeColors[theme]} // <-- Stronger yellow for light theme
      strokeWidth={size * 0.025} // <-- Slightly thicker for light theme
      style={{
        opacity: theme === "light" ? 0.7 : (isActive ? 0.3 : 0.15), // <-- Higher opacity for light theme
        pointerEvents: "none",
        transition: "opacity 0.3s ease"
      }}
    />
  </g>
));

// Memoized center button component
const CenterButton = React.memo(({ 
  theme, 
  customCursor, 
  isPressed, 
  size, 
  centerBg, 
  centerBorderColor, 
  disableCursorToggle, 
  onToggleCursor, 
  onMouseDown, 
  onMouseUp, 
  onMouseLeave 
}) => (
  <button
    aria-label="Toggle custom cursor"
    title={customCursor ? "Disable custom cursor" : "Enable custom cursor"}
    onClick={onToggleCursor}
    style={{
      position: "absolute",
      left: size/2 - size * 0.17,
      top: size/2 - size * 0.17,
      width: size * 0.34,
      height: size * 0.34,
      borderRadius: "50%",
      border: `${size * 0.027}px solid ${themeAccents[theme]}`, // Use accent for border
      background: centerBg,
      color: theme === "light" ? "#f59e0b" : "#64748b", // Strong color for icon
      fontWeight: 900,
      fontSize: size * 0.18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: customCursor
        ? `0 0 16px #10b98155, 0 4px 20px #047857aa, inset 0 1px 0 rgba(255,255,255,0.3)`
        : `0 0 16px ${themeAccents[theme]}55, 0 4px 20px ${themeColors[theme]}33, inset 0 1px 0 rgba(255,255,255,0.3)`,
      zIndex: 2,
      outline: "none",
      cursor: disableCursorToggle ? "not-allowed" : "pointer",
      userSelect: "none",
      transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
      transform: isPressed ? "scale(0.95)" : "scale(1)",
      backdropFilter: "blur(2px)",
    }}
    disabled={disableCursorToggle}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    onMouseLeave={onMouseLeave}
  >
    <div
      style={{
        transform: `scale(${isPressed ? 0.9 : 1})`,
        transition: "transform 0.15s ease",
        filter: `drop-shadow(0 2px 4px ${themeAccents[theme]}44)` // Use accent for shadow
      }}
    >
      {themeIcons[theme]}
    </div>
  </button>
));

export default function ThemeWheelArc({
  customCursor = false,
  setCustomCursor = () => {},
  introSpinning = false,
  disableCursorToggle = false,
  style = {},
  sidenavOpen = false,
}) {
  const { theme, setTheme } = useTheme();
  const [hoverTheme, setHoverTheme] = useState(null);
  const [isPressed, setIsPressed] = useState(false);

  // Enhanced responsive sizing with memoization
  const size = useMemo(() => {
    return window.innerWidth <= 750 ? 90 : 130;
  }, []);
  
  useEffect(() => {
    let resizeTimeout;
    function handleResize() {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Force re-render on significant resize
        window.dispatchEvent(new Event('themeWheelResize'));
      }, 150);
    }
    
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Memoized calculations
  const wheelConfig = useMemo(() => {
    const CENTER = size / 2;
    const OUTER_RADIUS = size * 0.45;
    const ARC_THICKNESS = size * 0.18;
    const INNER_RADIUS = OUTER_RADIUS - ARC_THICKNESS;
  const angles = [90, 270];
  return { CENTER, OUTER_RADIUS, INNER_RADIUS, angles };
  }, [size]);

  // Memoized gradients and styles
  const centerStyles = useMemo(() => {
    const centerBg =
      theme === "light"
        ? "radial-gradient(circle at 40% 60%, #fffbeb 30%, #fef3c7 60%, #f59e0b 100%)"
        : "radial-gradient(circle at 30% 70%, #f8fafc 30%, #e2e8f0 60%, #475569 100%)";

    const centerBorderColor = customCursor ? "#10b981" : themeColors[theme];
    const centerGlowColor = customCursor ? "#10b981" : themeAccents[theme];
    return { centerBg, centerBorderColor, centerGlowColor };
  }, [theme, customCursor]);

  // Memoized callbacks
  const handleThemeSelect = useCallback((selectedTheme) => {
    setTheme(selectedTheme);
  }, [setTheme]);

  const handleHover = useCallback((hoveredTheme) => {
    setHoverTheme(hoveredTheme);
  }, []);

  const handleLeave = useCallback(() => {
    setHoverTheme(null);
  }, []);

  const handleToggleCursor = useCallback((e) => {
    e.stopPropagation();
    if (!disableCursorToggle && setCustomCursor) {
      setCustomCursor(v => !v);
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 150);
    }
  }, [disableCursorToggle, setCustomCursor]);

  const handleMouseDown = useCallback(() => {
    if (!disableCursorToggle) setIsPressed(true);
  }, [disableCursorToggle]);

  const handleMouseUp = useCallback(() => {
    setIsPressed(false);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 16,
        left: 16,
        zIndex: sidenavOpen ? 1 : 30,
        width: size,
        height: size,
        userSelect: "none",
        pointerEvents: sidenavOpen ? "none" : "auto",
        filter: `drop-shadow(0 4px 12px rgba(0,0,0,0.15)) drop-shadow(0 0 8px ${centerStyles.centerGlowColor}22)`,
        willChange: "transform",
        contain: "layout style paint",
        ...style,
      }}
      className="theme-wheel-fixed"
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          top: -4,
          left: -4,
          width: size + 8,
          height: size + 8,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${centerStyles.centerGlowColor}15 0%, transparent 70%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <svg 
        width={size} 
        height={size} 
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          zIndex: 1,
          transform: introSpinning ? "rotate(360deg)" : "rotate(0deg)",
          transition: introSpinning ? "transform 2s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
          willChange: "transform"
        }}
      >
        <defs>
          {/* Gradients for each theme */}
          <radialGradient id="lightGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#fefce8" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#fbbf24" /> {/* <-- Strong accent at edge */}
          </radialGradient>
          <radialGradient id="darkGradient" cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="60%" stopColor="#475569" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>
          
          {/* Glow filter for active theme */}
          <filter id="activeGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {themeOrder.map((t, i) => {
          // Remove the gap and 60-degree offset
          const angleStart = wheelConfig.angles[i];
          const angleEnd = wheelConfig.angles[i] + 180;
          const path = describeArc(
            wheelConfig.CENTER, 
            wheelConfig.CENTER, 
            wheelConfig.OUTER_RADIUS, 
            wheelConfig.INNER_RADIUS,
            angleStart, 
            angleEnd
          );
          const isActive = theme === t;
          const isHovered = hoverTheme === t;
          
          return (
            <ThemeArc
              key={t}
              theme={t}
              isActive={isActive}
              isHovered={isHovered}
              path={path}
              size={size}
              onThemeSelect={() => handleThemeSelect(t)}
              onHover={() => handleHover(t)}
              onLeave={handleLeave}
            />
          );
        })}
      </svg>

      <CenterButton
        theme={theme}
        customCursor={customCursor}
        isPressed={isPressed}
        size={size}
        centerBg={centerStyles.centerBg}
        centerBorderColor={centerStyles.centerBorderColor}
        disableCursorToggle={disableCursorToggle}
        onToggleCursor={handleToggleCursor}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      <style>
        {`
        .theme-wheel-fixed {
          will-change: transform;
        }
        
        .theme-wheel-fixed svg path {
          vector-effect: non-scaling-stroke;
        }
        
        @media (max-width: 750px) {
          .theme-wheel-fixed {
            top: 8px !important;
            left: 8px !important;
            width: 90px !important;
            height: 90px !important;
            min-width: 60px !important;
            min-height: 60px !important;
          }
        }
        
        @media (prefers-reduced-motion: reduce) {
          .theme-wheel-fixed * {
            transition: none !important;
            animation: none !important;
          }
        }
        `}
      </style>
    </div>
  );
}