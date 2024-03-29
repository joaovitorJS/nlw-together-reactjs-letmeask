import { FormEvent, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ref, push, remove } from "firebase/database";

import { useRoom } from "../../hooks/useRoom";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";

import { Content, Form, FormFooter, Header, HeaderContent, QuestionList, RoomTitle, UserInfo } from "./styles";

import logoImg from "../../assets/images/logo.svg";
import whiteLogoImg from "../../assets/images/white-logo.svg";

import { Button } from "../../components/Button";
import { RoomCode } from "../../components/RoomCode";
import { Question } from "../../components/Question";
import { SwitchTheme } from "../../components/SwitchTheme";
import { useSwitchTheme } from "../../hooks/useSwitchTheme";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { NoQuestions } from "../../components/NoQuestions";



export function Room() {
  const { id } = useParams();
  const { user } = useAuth(); 
  const [newQuestion, setNewQuestion] = useState("");
  const { questions, title } = useRoom(id);
  const { theme } = useSwitchTheme();
  const { width } = useWindowDimensions();


  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion?.trim() === "") {
      return;
    }

    if (!user) {
      throw new Error("You must be logged in");
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false,
    };

    const questionsRef = await ref(database, `rooms/${id}/questions`);
    await push(questionsRef, question);

    setNewQuestion("");
  }

  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (likeId) {
      await remove(ref(database, `rooms/${id}/questions/${questionId}/likes`));
    } else {
      await push(ref(database, `rooms/${id}/questions/${questionId}/likes`), {
        authorId: user?.id,
      });
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

        <Form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={event => setNewQuestion(event.target.value)}
          />

          <FormFooter>
            { user ? (
              <UserInfo>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </UserInfo>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )
            }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </FormFooter>
        </Form>
            
        {questions.length > 0 
        ? 
          <QuestionList>
            { questions.map(question => (
                <Question 
                  key={question.id}  
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  { !question.isAnswered &&
                    <button
                    className={`like-button ${question.likeId ? 'liked': ''}`}
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() => handleLikeQuestion(question.id, question.likeId)}
                  >
                    { question.likeCount > 0 && <span>{question.likeCount}</span> }
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                  </button>       
                  }

                </Question>
              ))
            }
          </QuestionList>     
        :
          <NoQuestions />
        }    

      </Content>
    </>
  );
}