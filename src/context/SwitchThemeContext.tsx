import { createContext, ReactNode } from "react"
import light from "../styles/themes/light";
import dark from "../styles/themes/dark";
import { DefaultTheme } from "styled-components";
import usePersistedState from "../hooks/usePersistedState";

interface SwitchThemeProviderProps {
  children: ReactNode;
}

interface SwitchThemeContextType {
  toggleTheme: () => void;
  title: string;
  theme: DefaultTheme;
}

export const SwitchThemeContext = createContext({} as SwitchThemeContextType);

export function SwitchThemeProvider({ children }: SwitchThemeProviderProps) {
  const [theme, setTheme] = usePersistedState<DefaultTheme>("theme", light);

  const toggleTheme = () => {
    setTheme(theme.title === "light" ? dark : light)
  }

  return (
    <SwitchThemeContext.Provider value={{
      toggleTheme,
      title: theme.title,
      theme
    }}>
      {children}
    </SwitchThemeContext.Provider>
  );
}