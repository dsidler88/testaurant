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

//our context (GLOBAL state) is of type AuthState
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
  //as discussed, we have 3 states, loading, data, error
  //but it needs to be GLOBAL, so we need to use context
  //if we didn't make this of type State, values would be stuck false and null
  const [authState, setAuthState] = useState<State>({
    loading: false,
    data: null,
    error: null,
  });

  //value is the state of the context
  //ALL children have access to this state
  //the children are the components that are wrapped by the context provider
  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
}

//if server components are children of the context provider, then we can have a parent client
//and they can access the state

//so look in layout.tsx. We just wrap the components we want to have access to the context aka everythign
//so everything has access to the state.
