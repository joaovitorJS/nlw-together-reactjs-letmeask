import { FormEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ref, push, onValue } from "firebase/database";

import { useAuth } from "../hooks/useAuth";
import { database } from "../services/firebase";

import logoImg from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";


import "../styles/room.scss";


type FirebaseQuestions = Record<string, {
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}>

type Question = {
  id: string;
  author: {
    name: string;
    avatar: string;
  },
  content: string;
  isHighlighted: boolean;
  isAnswered: boolean;
}

export function Room() {
  const { id } = useParams();
  const { user } = useAuth(); 
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const roomRef = ref(database, `rooms/${id}`);

    onValue(roomRef, room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
        }
      });

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);

    });
  }, [id]);

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

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={id || ""}/>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>{title}</h1>
          { questions.length > 0 &&
            <span>{questions.length} {questions.length === 1 ? 'pergunta': 'perguntas'}</span>
          }
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea 
            placeholder="O que você quer perguntar?"
            value={newQuestion}
            onChange={event => setNewQuestion(event.target.value)}
          />

          <div className="form-footer">
            { user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>Para enviar uma pergunta, <button>faça seu login</button>.</span>
            )
            }
            <Button type="submit" disabled={!user}>Enviar pergunta</Button>
          </div>
        </form>

      </main>
    </div>
  );
}