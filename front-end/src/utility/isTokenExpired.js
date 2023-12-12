import jwt_decode from "jwt-decode";

function isTokenExpired(token) {
  let decodedToken = jwt_decode(token);
  console.log("Decoded Token", decodedToken);
  let currentDate = new Date();

  if (decodedToken.exp * 1000 < currentDate.getTime()) {
    console.log("Token expired.");
    return true;
  } else {
    console.log("Valid token");
    return false;
  }
}

export { isTokenExpired };
