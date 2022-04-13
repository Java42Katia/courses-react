import { Observable, lastValueFrom, of } from "rxjs";
import { map } from 'rxjs/operators'
import LoginData from "../models/common/LoginData";
import UserData from "../models/UserData";
import AuthService from "./AuthService";
import Axios from "axios-observable";
import { AUTH_TOKEN_ITEM } from "../config/auth-config";
const USER_DATA_ITEM = "user_data";
type LoginResponse = {
    accessToken: string;
    role: string;
}
export default class AuthServiceRest implements AuthService {
    constructor(private url: string) { }
    supportedAuthNetworks(): string[] {
        return [];
    }

    getUserData(): Observable<UserData> {
        const userDataJson = localStorage.getItem(USER_DATA_ITEM);
        if (!userDataJson) {
            return of({ username: '', isAdmin: false, displayName: '' });
        }
        return of(JSON.parse(userDataJson));


    }
    async login(loginData: LoginData): Promise<boolean> {
        try {
            const response = await lastValueFrom(Axios.post(`${this.url}/login`,
                loginData));
            const loginResponse: LoginResponse = response.data;

            localStorage.setItem(AUTH_TOKEN_ITEM, loginResponse.accessToken);
            const userData: UserData = {
                username: loginData.email,
                isAdmin: loginResponse.role == "ADMIN", displayName: loginData.email
            };
            localStorage.setItem(USER_DATA_ITEM, JSON.stringify(userData));


            return true;
        } catch (err) {
            return false;
        }

    }
    async logout(): Promise<boolean> {
        localStorage.removeItem(AUTH_TOKEN_ITEM);
        localStorage.removeItem(USER_DATA_ITEM);
        return true;
    }

}