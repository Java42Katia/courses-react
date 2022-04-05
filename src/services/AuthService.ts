import { Observable } from "rxjs";
import LoginData from "../models/common/LoginData";
import UserData from "../models/UserData";

export default interface AuthService {
    getUserData(): Observable<UserData>;
    login(loginData: LoginData): Promise<boolean>;
    logout(): Promise<boolean>;
    supportedAuthNetworks():string[]
}