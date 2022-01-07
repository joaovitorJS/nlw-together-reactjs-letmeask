import Switch from "react-switch";
import { BsFillMoonStarsFill, BsSun } from "react-icons/bs";
import { IconContainer } from "./styles";
import { useSwitchTheme } from "../../hooks/useSwitchTheme";


export function SwitchTheme () {
  const { toggleTheme, title } = useSwitchTheme();


  return (
    <Switch 
      onChange={toggleTheme}
      checked={title === "dark"}
      checkedIcon={<IconContainer><BsFillMoonStarsFill /></IconContainer>}
      uncheckedIcon={<IconContainer><BsSun /></IconContainer>}
      onColor="#000"
    />
  );
}