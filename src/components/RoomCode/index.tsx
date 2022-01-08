import copyImg from "../../assets/images/copy.svg";
import useWindowDimensions from "../../hooks/useWindowDimensions";

import { ButtonContainer } from "./styles";

interface RoomCodeProps {
  code: string;
}

export function RoomCode({code}: RoomCodeProps) {
  const { width } = useWindowDimensions();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <ButtonContainer onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar o código da sala" />
      </div>
      {width <= 600 
      ?
        <span>Copy Code</span>
      :     
        <span>Sala #{code}</span>
      }
    </ButtonContainer>
  );
}