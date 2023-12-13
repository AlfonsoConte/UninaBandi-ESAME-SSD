import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "https://bandiunina.it/auth",
  realm: "SSD_REALM",
  clientId: "application-rest-api",
  alwaysRefreshToken: false,
});

export default keycloak;
