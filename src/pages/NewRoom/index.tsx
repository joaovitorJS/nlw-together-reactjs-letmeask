import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { ref, push } from "firebase/database";

import { Container, Main, MainContent } from "./styles";

import logoImg from "../../assets/images/logo.svg";
import whiteLogoImg from "../../assets/images/white-logo.svg";

import { Button } from "../../components/Button";
import { Aside } from "../../components/Aside";
import { useSwitchTheme } from "../../hooks/useSwitchTheme";


export function NewRoom() {
  const navigate = useNavigate();
  const { user } = useAuth()
  const [newRoom, setNewRoom] = useState("");
  const { theme } = useSwitchTheme();


  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom?.trim() === "") {
      return;
    }

    const roomRef = ref(database, 'rooms');

    const firebaseRoom = await push(roomRef, {
      title: newRoom,
      authorId: user?.id,
    });

    navigate(`/rooms/${firebaseRoom.key}`);
  }

  return (
    <Container>
      <Aside />

      <Main>
        <MainContent>
          <img src={theme.title === "dark" ? whiteLogoImg : logoImg} alt="Letmeask" />

          <h2>Criar uma nova sala</h2>
      
          <form onSubmit={handleCreateRoom}>
            <input 
              type="text" 
              placeholder="Nome da sala"
              value={newRoom}
              onChange={event => setNewRoom(event.target.value)}
            />
            <Button type="submit">
              Criar salas
            </Button>
          </form>

          <p>Quer entrar em uma sala já existente? <Link to="/">Clique aqui</Link></p>
        </MainContent>
      </Main>
    </Container>
  );
}