"use client";

import { useTheme } from "./contexts/ThemeContext";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const mainTheme = theme.split("-")[0];
  const bgMode = theme.split("-")[1] || "dark";

  return (
    <div
      className={`min-h-screen ${
        bgMode === "dark"
          ? "bg-background text-foreground"
          : bgMode === "interface"
            ? "bg-foreground text-background"
            : "bg-content1-foreground text-background"
      } ${mainTheme}`}
    >
      {children}
    </div>
  );
};

export default ThemeProvider;
