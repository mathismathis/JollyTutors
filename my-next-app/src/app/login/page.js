"use client"; 

import { useCallback, useEffect, useState } from 'react';

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check for the access token when the component mounts
  useEffect(() => {
    const accessToken = localStorage.getItem('access_token'); // or use sessionStorage or cookies if needed
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  const openGoogleLoginPage = useCallback(() => {
    const googleAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";

    const scope = [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" ");

    const params = new URLSearchParams({
      response_type: "code",
      client_id: '237955819357-gqlgrhjouanognt784u6lm05o9mur9p7.apps.googleusercontent.com',
      redirect_uri: 'http://localhost:8000/api/auth/google/',
      prompt: "select_account",
      access_type: "online",
      scope,
    });

    const url = `${googleAuthUrl}?${params}`;
    window.location.href = url;
  }, []);

  const goToMainPage = () => {
    window.location.href = '/'; // or the desired route
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>You're already logged in!</p>
          <button
            onClick={goToMainPage}
            style={{
              backgroundColor: '#4285F4', 
              color: 'white', 
              fontSize: '16px', 
              padding: '10px 20px', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer'
            }}
          >
            Go to Main Page
          </button>
        </div>
      ) : (
        <button
          onClick={openGoogleLoginPage}
          style={{
            backgroundColor: '#34a853', 
            color: 'white', 
            fontSize: '16px', 
            padding: '10px 20px', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer'
          }}
        >
          Sign in with Google
        </button>
      )}
    </div>
  );
};

export default Home;
