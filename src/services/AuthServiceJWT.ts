import { Observable, lastValueFrom, of } from "rxjs";
import { map } from 'rxjs/operators'
import LoginData from "../models/common/LoginData";
import UserData from "../models/UserData";
import AuthService from "./AuthService";
import Axios from "axios-observable";
import { AUTH_TOKEN_ITEM } from "../config/auth-config";

export default class AuthServiceJWT implements AuthService {
    constructor(private url: string) { }
    supportedAuthNetworks(): string[] {
        return [];
    }    
    
    getUserData(): Observable<UserData> {
        const accessToken = localStorage.getItem(AUTH_TOKEN_ITEM);
        if (!accessToken) {
            return of({ username: '', isAdmin: false, displayName: '' });
        }
        const rowPayload = accessToken.split(".")[1]; //xxx.payload.xxx
        const payload = JSON.parse(atob(rowPayload)); //payload.email, payload.exp
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem(AUTH_TOKEN_ITEM);
            return of({ username: '', isAdmin: false, displayName: '' });
        }
        return Axios.get<string[]>(`${this.url}/administrators`)
            .pipe(map(response => {
                const administrators = response.data;
                return {
                    username: payload.email,
                    isAdmin: administrators.includes(payload.email), displayName: payload.email
                }
            }));

    }
    async login(loginData: LoginData): Promise<boolean> {
        try {
            const response = await lastValueFrom(Axios.post(`${this.url}/login`,
                loginData));
            localStorage.setItem(AUTH_TOKEN_ITEM, response.data.accessToken);
            return true;
        } catch (err) {
            return false;
        }

    }
    async logout(): Promise<boolean> {
        localStorage.removeItem(AUTH_TOKEN_ITEM);
        return true;
    }

}