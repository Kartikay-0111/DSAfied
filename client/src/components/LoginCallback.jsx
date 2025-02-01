import React, { useEffect } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const LoginCallback = () => {
  const { isAuthenticated, isLoading, user, handleRedirectCallback, getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    let isMounted = true;

    const callback = async () => {
      try {
        if (isLoading) {
          return;
        }

        // ✅ Check if URL has query parameters (for Auth0 redirect)
        const searchParams = new URLSearchParams(window.location.search);
        if (searchParams.has('code') && searchParams.has('state')) {
          console.log("✅ Auth0 Redirect Detected. Running `handleRedirectCallback()`...");
          await handleRedirectCallback();
        } else {
          console.log("⚠️ No Auth0 redirect params found. Skipping `handleRedirectCallback()`...");
        }

        if (!isAuthenticated || !user) {
          console.log("🚨 User not authenticated yet...");
          return;
        }

        console.log("🆔 User authenticated:", user.email);

        const token = await getAccessTokenSilently({
          audience: 'http://localhost/',
          scope: 'openid profile email offline_access',
        });

        const response = await axios.post(
          `${BASE_URL}/api/users/check-user`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.message === "User already exists") {
          navigate("/potd");
        } else {
          navigate("/onboard");
        }
      } catch (err) {
        console.error("❌ Auth Callback Error:", err);
      }
    };

    callback();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user, isLoading, handleRedirectCallback, navigate, getAccessTokenSilently]);

  return <Loader />;
};

export default LoginCallback;
