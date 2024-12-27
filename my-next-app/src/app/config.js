// src/config.js

const isLocalhost = window.location.hostname === "localhost";

const config = {
  GOOGLE_CLIENT_ID:
    process.env.REACT_APP_GOOGLE_CLIENT_ID ||
    "237955819357-gqlgrhjouanognt784u6lm05o9mur9p7.apps.googleusercontent.com",
  
  GOOGLE_REDIRECT_URL_ENDPOINT: isLocalhost
    ? "http://localhost:8000/api/auth/google/"
    : "https://taskprovider.strict-bdsm.com/api/auth/google/",
  
  API_ENDPOINT: isLocalhost
    ? "http://localhost:8000"
    : "https://taskprovider.strict-bdsm.com",

  WEBSOCKET_ENDPOINT: isLocalhost
    ? "ws://localhost:8000"
    : "wss://taskprovider.strict-bdsm.com",
};

export default config;