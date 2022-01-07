import illustrationImg from "../../assets/images/illustration.svg";

import { Container } from "./styles";

export function Aside() {
  return (
    <Container>
      <img src={illustrationImg} alt="Ilustração simbolizzando peguntas e respostas" />
      <strong>Crie salas de Q&amp;A ao-vivo</strong>
      <p>Tire as dúvidas da sua audiência em tempo-real</p>
    </Container>
  );
}