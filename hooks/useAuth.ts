import { AuthenticationContext } from "@/app/context/AuthContext";
import axios from "axios";
import { getCookie } from "cookies-next";
import { get } from "http";
import { useContext } from "react";

const useAuth = () => {
  //useContext is a hook that references THE global context
  // that was created with createContext
  //destructure the different values from the context
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }, handleClose: ()=>void) => {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signin",
        {
          email,
          password,
        }
      );
      console.log(response);

      //can always modify the state of the context. This is the only way to modify the state
      //
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose()
    } catch (error: any) {
      //console log & find what shapethe error is to be able to use it here
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };

  const signup = async (
    {
      email,
      password,
      firstName,
      lastName,
      city,
      phone
    }: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      city: string;
      phone: string;
    }, handleClose: ()=>void
  ) => {
    setAuthState({
      data: null,
      loading: true,
      error: null,
    });
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        {
          email,
          password,
          firstName,
          lastName,
          city,
          phone
        }
      );
      console.log(response);

      //can always modify the state of the context. This is the only way to modify the state
      //
      setAuthState({
        data: response.data,
        error: null,
        loading: false,
      });
      handleClose()
    } catch (error: any) {
      //console log & find what shapethe error is to be able to use it here
      setAuthState({
        data: null,
        error: error.response.data.errorMessage,
        loading: false,
      });
    }
  };
  

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

    }catch(error){
      console.log(error)
    }
  }

  return { signin, signup };
};

export default useAuth;
