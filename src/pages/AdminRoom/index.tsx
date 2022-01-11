import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ref, remove, update } from "firebase/database";
import { database } from "../../services/firebase";

/*Hooks*/
import { useRoom } from "../../hooks/useRoom";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { useSwitchTheme } from "../../hooks/useSwitchTheme";

/*Components*/
import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import { SwitchTheme } from "../../components/SwitchTheme";
import { Modal } from "../../components/Modal";

/*Images*/
import logoImg from "../../assets/images/logo.svg";
import deleteImg from "../../assets/images/delete.svg";
import checkImg from "../../assets/images/check.svg";
import answerImg from "../../assets/images/answer.svg";
import whiteLogoImg from "../../assets/images/white-logo.svg";
import emptyQuestions from "../../assets/images/empty-questions.svg";
import endRoom from "../../assets/images/end-room.svg";

/*Styles*/
import { Content,  Header, HeaderContent, NoQuestions, QuestionList, RoomTitle, ContentModal } from "./styles";

export function AdminRoom() {
  const navigate = useNavigate();
  
  const { id } = useParams();
  const { questions, title } = useRoom(id);
  const { theme } = useSwitchTheme();
  const { width } = useWindowDimensions();

  const [isOpenModalEndRoom, setIsOpenModalEndRoom] = useState(false);
  const [isOpenModalDeleteQuestion, setIsOpenModalDeleteQuestion] = useState(false);
  const [questionIdFromDelete, setQuestionIdFromDelete] = useState<string | null>(null)
  

  function hanldeCloseModalEndRoom() {
    setIsOpenModalEndRoom(false);
  }

  function hanldeOpenModalEndRoom() {
    setIsOpenModalEndRoom(true);
  }

  function handleCloseModalDeleteQuestion() {
    setQuestionIdFromDelete(null);
    setIsOpenModalDeleteQuestion(false);
  }

  function handleOpenModalDeleteQuestion(questionId: string) {
    setQuestionIdFromDelete(questionId);
    setIsOpenModalDeleteQuestion(true);
  }

  async function handleEndRoom() {
    update(ref(database, `rooms/${id}`), {
      endedAt: new Date(),
    });

    navigate("/");
    setIsOpenModalEndRoom(false);
  }

  async function  hanldeCheckQuestionAsAnswered(questionId: string) {
    update(ref(database, `rooms/${id}/questions/${questionId}`), {
      isAnswered: true,
    });
  }

  async function  hanldeHighlightQuestion(questionId: string) {
    update(ref(database, `rooms/${id}/questions/${questionId}`), {
      isHighlighted: true,
    });
  }

  async function  hanldeDeleteQuestion() {
    if (questionIdFromDelete !== null) {
      await remove(ref(database, `rooms/${id}/questions/${questionIdFromDelete}`));
      // add message confirmation

      setIsOpenModalDeleteQuestion(false);
    }

  }

  return (
    <>
      <Header>
        <HeaderContent>
          <Link to="/">
            <img src={theme.title === "dark" ? whiteLogoImg : logoImg} alt="Letmeask" />
          </Link>
          <div>
            {width > 768 &&
              <SwitchTheme />
            }
            <RoomCode code={id || ""}/>
            <Button isOutlined onClick={hanldeOpenModalEndRoom}>Encerrar sala</Button>   
          </div>
        </HeaderContent>
      </Header>

      <Content>
        <RoomTitle>
          <div>
            <h1>{title}</h1>
            { questions.length > 0 &&
              <span>{questions.length} {questions.length === 1 ? 'pergunta': 'perguntas'}</span>
            }
          </div>
          {width <= 768 &&
            <SwitchTheme /> 
          }
        </RoomTitle>
        
        {questions.length === 0 
          ? 
          <NoQuestions>
            <div>
              <img src={emptyQuestions} alt="Sem perguntas" />   
              <h2>Nenhuma pergunta por aqui...</h2>
              <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
            </div>
          </NoQuestions>
          :
          <QuestionList>
            { questions.map(question => (
                <Question 
                  key={question.id}  
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  { !question.isAnswered && (
                      <>
                        <button
                          type="button"
                          aria-label="Marcar pergunta como respondida"
                          onClick={() => hanldeCheckQuestionAsAnswered(question.id)}
                        >
                          <img src={checkImg} alt="Marcar pergunta como respondida" />
                        </button>
                        <button
                          type="button"
                          aria-label="Dar destaque à pergunta"
                          onClick={() => hanldeHighlightQuestion(question.id)}
                        >
                          <img src={answerImg} alt="Dar destaque à pergunta" />
                        </button>
                      </>
                    )
                  }
                  <button
                    type="button"
                    aria-label="Remover Pergunta"
                    onClick={() => handleOpenModalDeleteQuestion(question.id)}
                  >
                    <img src={deleteImg} alt="Deletar" />
                  </button>
                </Question>
              ))
            }
          </QuestionList>
        }
      </Content>

      <Modal 
        isOpen={isOpenModalEndRoom}
        contentLabel="Modal de confirmação para encerrar uma sala"
        aria={{
          labelledby: "Encerrar sala",
          describedby: "Botão cancelar, faz o cancelamento de encerrar sala"
        }}
      >
        <ContentModal>
          <img src={endRoom} alt="Encerrar sala" />
          <h2>Encerrar sala</h2>
          <p>Tem certeza que você deseja encerrar esta sala?</p> 
          <div className="buttons">
            <button onClick={hanldeCloseModalEndRoom}>Cancelar</button>
            <button className="red" onClick={handleEndRoom}>Sim, encerrar</button>
          </div>
        </ContentModal>
      </Modal>

      <Modal 
        isOpen={isOpenModalDeleteQuestion}
        contentLabel="Modal de confirmação para excluir uma pergunta"
        aria={{
          labelledby: "Excluir pergunta",
          describedby: "Botão cancelar, faz o cancelamento de excluir pergunta"
        }}
      >
        <ContentModal>
          <img src={endRoom} alt="Excluir pergunta" />
          <h2>Excluir pergunta</h2>
          <p>Tem certeza que você deseja excluir esta pergunta?</p> 
          <div className="buttons">
            <button onClick={handleCloseModalDeleteQuestion}>Cancelar</button>
            <button className="red" onClick={hanldeDeleteQuestion}>Sim, excluir</button>
          </div>
        </ContentModal>
      </Modal>
    </>
  );
} 