import AuthService from "../services/AuthService";
import AuthServiceFire from "../services/AUthServiceFire";
import AuthServiceNoAuth from "../services/AuthServiceNoAuth";
import AuthServiceRest from "../services/AuthServiceRest";
//import AuthServiceJWT from "../services/AuthServiceJWT";

export const AUTH_TOKEN_ITEM = "accessToken";
// export const authService: AuthService =
//     new AuthServiceFire();
// export const authService: AuthService =
//     new AuthServiceNoAuth();
 export const authService: AuthService =
 new AuthServiceRest("http://localhost:8080");