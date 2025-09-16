import React, { useMemo } from "react";
import { useTheme } from "../ThemeContext";
import LightThemeBackground from "../themes/LightThemeBackground";
import DarkThemeBackground from "../themes/DarkThemeBackground";

// Memoized static background components
const LightStaticBackground = React.memo(() => (
  <div className="fixed inset-0 -z-10 transition-all duration-700"
    style={{
      background: "linear-gradient(120deg, #fafdff 0%, #fefce8 60%, #e2e8f0 100%)",
      backdropFilter: "blur(28px)",
      WebkitBackdropFilter: "blur(28px)",
    }}
  />
));

const DarkStaticBackground = React.memo(() => (
  <div className="fixed inset-0 -z-10 transition-all duration-700"
    style={{
      background: "linear-gradient(135deg, #101a2b 0%, #223053 60%, #0c1726 100%)",
      backdropFilter: "blur(22px)",
      WebkitBackdropFilter: "blur(22px)",
    }}
  />
));

// Memoized background selector
const BackgroundSelector = React.memo(({ theme, activeSection }) => {
  // Landing page: animated backgrounds
  if (activeSection === "home") {
    switch (theme) {
      case "light":
        return <LightThemeBackground />;
      case "dark":
        return <DarkThemeBackground />;
      default:
        return <LightThemeBackground />;
    }
  }

  // Other pages: static backgrounds for better performance
  switch (theme) {
    case "light":
      return <LightStaticBackground />;
    case "dark":
      return <DarkStaticBackground />;
    default:
      return <LightStaticBackground />;
  }
});

export default function ThemeBackground({ activeSection }) {
  const { theme } = useTheme();
  
  // Memoize the background selection to prevent unnecessary re-renders
  const backgroundComponent = useMemo(() => (
    <BackgroundSelector theme={theme} activeSection={activeSection} />
  ), [theme, activeSection]);

  return backgroundComponent;
}