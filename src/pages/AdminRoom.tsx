import { useParams, useNavigate } from "react-router-dom";
import { ref, remove, update } from "firebase/database";

import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";
import checkImg from "../assets/images/check.svg";
import answerImg from "../assets/images/answer.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { Question } from "../components/Question";

import "../styles/room.scss";


export function AdminRoom() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { questions, title } = useRoom(id);

  async function handleEndRoom() {
    update(ref(database, `rooms/${id}`), {
      endedAt: new Date(),
    });

    navigate("/");
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

  async function  hanldeDeleteQuestion(questionId: string) {
    if (window.confirm("Você tem certeza que você deseja excluir está perguntar?")) {
      await remove(ref(database, `rooms/${id}/questions/${questionId}`));
    }
  }


  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={id || ""}/>
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          { questions.length > 0 &&
            <span>{questions.length} {questions.length === 1 ? 'pergunta': 'perguntas'}</span>
          }
        </div>
        
        <div className="question-list">
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
                  onClick={() => hanldeDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Deletar" />
                </button>
              </Question>
            ))
          }
        </div>
      </main>
    </div>
  );
}