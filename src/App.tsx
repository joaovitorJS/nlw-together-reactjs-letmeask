import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ThemeProvider } from "styled-components";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";
import { AdminRoom } from "./pages/AdminRoom";

import GlobalStyle from "./styles/global";
import { useSwitchTheme } from "./hooks/useSwitchTheme";

function App() {
  const { theme } = useSwitchTheme();

  return (
    <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <AuthContextProvider>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="rooms/new" element={<NewRoom />}/>
            <Route path="rooms/:id" element={<Room />}/>
            
            <Route path="admin/rooms/:id" element={<AdminRoom />}/>
          </Routes>
          
          </AuthContextProvider>
        </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
