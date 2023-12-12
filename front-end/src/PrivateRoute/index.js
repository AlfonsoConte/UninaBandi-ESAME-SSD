import React, { useContext } from "react";
import KeycloakContext from "../KeycloakContext";

import { Navigate } from "react-router-dom";
import { isTokenExpired } from "../utility/isTokenExpired";

const PrivateRoute = ({ children }) => {
  const keycloak = useContext(KeycloakContext);
  console.log(keycloak);
  console.log("sono nella private route");

  if (keycloak.authenticated) {
    console.log("sono nell if");
    console.log(" token ", keycloak.token);

    if (isTokenExpired(keycloak.token)) {
      console.log("sono nel secondo if");
      keycloak
        .updateToken(5)
        .then(() => {
          console.log("successfully got a new token", keycloak.token);

          return children;
        })
        .catch(() => {
          console.log("ERRORE NEL REFRESHING DEL TOKEN RISOLUZIONE");
          return <Navigate to="/signin" />;
        });
    }
    return children;
  } else {
    return <Navigate to="/signin" />;
  }
};

export default PrivateRoute;
