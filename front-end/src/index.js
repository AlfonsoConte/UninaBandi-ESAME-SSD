import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import KeycloakContext from "./KeycloakContext";
import keycloak from "./Keycloak";

const root = ReactDOM.createRoot(document.getElementById("root"));
keycloak
  .init({ onLoad: "check-sso", checkLoginIframe: false })
  .then((authenticated) => {
    console.log(authenticated);
    root.render(
      <KeycloakContext.Provider value={keycloak}>
        <App />
      </KeycloakContext.Provider>
    );
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
