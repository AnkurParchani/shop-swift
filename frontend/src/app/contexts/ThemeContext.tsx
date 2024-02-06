import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type ThemeContextType = {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
};

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>("");

  // Getting theme from localStorage, if not then setting default theme (theme_pink)
  useEffect(() => {
    function checkTheme() {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) setTheme(storedTheme);
      else setTheme("theme_pink-dark");
    }
    checkTheme();

    window.addEventListener("storage", checkTheme);

    return () => window.removeEventListener("storage", checkTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

// Exporting the useContext to directly access it
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context)
    throw new Error("useTheme must be used within a useThemeProvider");

  return context;
};
