import { useContext } from "react";
import { SwitchThemeContext } from "../context/SwitchThemeContext";


export const useSwitchTheme = () => useContext(SwitchThemeContext);
