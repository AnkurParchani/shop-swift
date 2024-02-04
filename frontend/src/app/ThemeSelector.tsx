"use client";

import { useTheme } from "./contexts/ThemeContext";

const ThemeSelector = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();

  return (
    <div
      className={`min-h-screen bg-background text-foreground ${
        theme || "pink-dark"
      }`}
    >
      {children}
    </div>
  );
};

export default ThemeSelector;
