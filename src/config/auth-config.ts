import AuthService from "../services/AuthService";
import AuthServiceFire from "../services/AUthServiceFire";
//import AuthServiceJWT from "../services/AuthServiceJWT";

export const AUTH_TOKEN_ITEM = "accessToken";
export const authService: AuthService =
    new AuthServiceFire();
//  export const authService: AuthService =
//  new AuthServiceJWT("http://localhost:3500/");