"use client";

import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useState, createContext, useEffect } from "react";

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
//so AuthenticationContext IS createContext, of type AuthState, with this initial value
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
  //if we didn't make this of type State, values would be stuck false and null
  //set loading true initially because we are always trying to fetch the user
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  //from our custom hook, call fetchUser as soon as we render (as soon as context is created)
  //const {fetchUser} = useAuth()

  //that didn't work coming from our custom hook. so we'll just put the fetchUser function here
  //immediately check if the user has a JWT token
  const fetchUser = async () =>{
    setAuthState({
      data: null,
      error: null,
      loading:true
    })
    try{
      const jwt = getCookie("jwt")
      if(!jwt){
        return setAuthState({
          data: null,
          error: null,
          loading:false
        })
      }

      const response = await axios.get("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      })

      //grab the jwt token from the cookie and append it to the header in all requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${jwt}`

      //if the user is logged in, we will get a response and can set the state
      setAuthState({
        data: response.data,
        error: null,
        loading:false
      })

    }catch(error:any){
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading:false
      })
    }
  }

  useEffect(() => {
    fetchUser();
  }, [])

  //value is the state of the context
  //ALL children have access to this state
  //the children are the components that are wrapped by the context provider
  //just remember value is required and it is the global state of the context
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
