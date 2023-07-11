"use client";

import { useState, createContext } from "react";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
}

//interface for the context
interface State {
  loading: boolean;
  error: string | null;
  data: User | null;
}

interface AuthState extends State {
    setAuthState: React.Dispatch<React.SetStateAction<State>>;
  }

  export const AuthenticationContext = createContext<AuthState>({
    loading: false,
    error: null,
    data: null,
    setAuthState: () => {},
  });

  //use client because we are using the context hook
export default function AuthContext({
    children,
  }: {
    children: React.ReactNode;
  }) {
    //we have 3 states, loading, data, error
    //but it needs to be GLOBAL, so we need to use context
    const [authState, setAuthState] = useState<State>({
      loading: false,
      data: null,
      error: null,
    });
  
    //value is the state of the context
    //ALL children have access to this state
    return (
      <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
        {children}
      </AuthenticationContext.Provider>
    );
  }