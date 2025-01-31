import React from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
// import { get } from "mongoose";


const Login = () =>{
  const { loginWithRedirect } = useAuth0();    

    return (
        <button className="items-center justify-center gap-2 btn btn-md btn-primary hidden lg:inline-flex" onClick={(e) => loginWithRedirect()}>Login</button>
    )
}

export default Login;