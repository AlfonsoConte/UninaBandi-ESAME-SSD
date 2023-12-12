import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://localhost:80/auth",
  realm: "SSD_REALM",
  clientId: "application-rest-api",
  alwaysRefreshToken: false,
});

export default keycloak;
