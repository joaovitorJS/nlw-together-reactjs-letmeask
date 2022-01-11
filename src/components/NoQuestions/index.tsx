import emptyQuestions from "../../assets/images/empty-questions.svg";
import { Container } from "./styles";

export function NoQuestions() {
  return (
    <Container>
      <div>
        <img src={emptyQuestions} alt="Sem perguntas" />   
        <h2>Nenhuma pergunta por aqui...</h2>
        <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
      </div>
    </Container>
  );
}