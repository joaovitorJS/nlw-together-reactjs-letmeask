import copyImg from "../../assets/images/copy.svg";

import { ButtonContainer } from "./styles";

interface RoomCodeProps {
  code: string;
}

export function RoomCode({code}: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(code);
  }

  return (
    <ButtonContainer onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copiar o código da sala" />
      </div>
      <span>Sala #{code}</span>
    </ButtonContainer>
  );
}