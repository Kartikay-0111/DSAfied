import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const LoginCallback = () =>{
    const { handleRedirectCallback, user, getAccessTokenSilently } = useAuth0();
    const navigate = useNavigate();
   
    useEffect(() => {
        let isMounted = true;
        // console.log("LoginCallback");
        const callback = async () =>{
          try{
              if (isMounted) {
              await handleRedirectCallback();
              const token = await getAccessTokenSilently({
                audience: 'http://localhost/',
                scope: 'openid profile email offline_access',
              });
              // localStorage.setItem("token", token);
              // console.log(token);
              const response = await axios.post("http://localhost:3000/api/users/check-user",{},
                {
                  headers: { Authorization: `Bearer ${token}` }
                }
              );
              console.log(response.data);
              if(response.data.message === "User already exists") navigate("/potd");
              else navigate("/onboard");
              }
          }
          catch(err){
            console.log(err);
          }
        }
        callback();
        return () => { isMounted = false };

    }, [handleRedirectCallback, navigate, getAccessTokenSilently]);

      return (
          <Loader />
      )
  }
  
  export default LoginCallback;
