import { createContext, ReactNode, useState, useEffect } from "react";

import { auth } from "../services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";


interface AuthContextProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextType {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
      
        const { displayName, photoURL, uid } = user;
  
        if (!displayName || !photoURL) {
          throw new Error("Missing information from Google Account.");
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
    });

    return () => {
      unsubscribe();
    }
  },[]);
  
  async function signInWithGoogle () {
    // Autenticação do usuário
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account.");
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
      
  }

  return (
    <AuthContext.Provider value={{user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  );
}

