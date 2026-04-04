import React, { useMemo } from "react";
import { useTheme } from "../ThemeContext";
import LightThemeBackground from "../themes/LightThemeBackground";
import DarkThemeBackground from "../themes/DarkThemeBackground";

export default function ThemeBackground({ activeSection }) {
  const { theme } = useTheme();

  return useMemo(() => {
    switch (theme) {
      case "dark":
        return <DarkThemeBackground activeSection={activeSection} />;
      case "light":
      default:
        return <LightThemeBackground activeSection={activeSection} />;
    }
  }, [theme, activeSection]);
}
