import { Observable, of } from "rxjs";
import LoginData from "../models/common/LoginData";
import UserData from "../models/UserData";
import AuthService from "./AuthService";
export default class AuthServiceNoAuth implements AuthService {
    getUserData(): Observable<UserData> {
       return of({username: "admin@tel-ran.co.il",isAdmin: true, displayName: "administrator"});
    }
    login(loginData: LoginData): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    logout(): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    supportedAuthNetworks(): string[] {
        return [];
    }
    
}