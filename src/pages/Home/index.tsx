import { useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";

import { useAuth } from "../../hooks/useAuth";
import { ref, get } from "firebase/database";
import { database } from "../../services/firebase";

import { Container, Main, MainContent, ButtonGoogle, Separator } from "./styles";

import logoImg from "../../assets/images/logo.svg";
import googleIconImg from "../../assets/images/google-icon.svg";
import whiteLogoImg from "../../assets/images/white-logo.svg";

import { FiLogIn } from "react-icons/fi";

import { Button } from "../../components/Button";
import { Aside } from "../../components/Aside";
import { useSwitchTheme } from "../../hooks/useSwitchTheme";
import useWindowDimensions from "../../hooks/useWindowDimensions";


export function Home() {
  const navigate = useNavigate();
  const { user, signInWithGoogle } = useAuth();
  const [roomCode, setRoomCode] = useState("");
  const { theme } = useSwitchTheme();
  const { width } = useWindowDimensions();

  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    
    navigate("/rooms/new");
  }
  
  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode?.trim() === "") {
      return;
    }

    const roomRef = ref(database, `rooms/${roomCode}`);
    const room = await get(roomRef);

    if (!room.exists()) {
      alert("Room does not exists.");
      setRoomCode("");
      return;
    }   

    
    if (room.val().endedAt) {
      alert("Room already closed.");
      return;
    }

   
    if (user?.id === room.val().authorId) {
      navigate(`/admin/rooms/${roomCode}`);
    } else {
      navigate(`/rooms/${roomCode}`);
    }

  }

  return (
    <Container>
      {width > 768 &&
        <Aside />
      }

      <Main>
        <MainContent>
          <img src={theme.title === "dark" ? whiteLogoImg : logoImg} alt="Letmeask" />
          <ButtonGoogle onClick={handleCreateRoom}>
            <img src={googleIconImg} alt="Logo do Google" />
            Crie sua sala com o Google
          </ButtonGoogle>

          <Separator>
            ou entre em uma sala
          </Separator>

          <form onSubmit={handleJoinRoom}>
            <input 
              type="text" 
              placeholder="Digite o cógido da sala"
              value={roomCode}
              onChange={event => setRoomCode(event.target.value)}
            />
            <Button type="submit">
              <FiLogIn />
              Entrar na sala
            </Button>
          </form>
        </MainContent>
      </Main>
    </Container>
  );
}