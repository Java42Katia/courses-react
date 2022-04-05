import AuthService from "./AuthService";
import { Observable, of } from "rxjs";
import firebase from "firebase";
import appFire from "../config/firebase-config";
import { authState } from "rxfire/auth";
import { map, mergeMap } from "rxjs/operators"
import LoginData from "../models/common/LoginData";
import UserData from "../models/UserData";
import { collectionData } from "rxfire/firestore";
const authNetworks: { name: string, provider: firebase.auth.AuthProvider }[] = [
    { name: 'google', provider: new firebase.auth.GoogleAuthProvider() },
    { name: 'facebook', provider: new firebase.auth.FacebookAuthProvider() },
    { name: 'twitter', provider: new firebase.auth.TwitterAuthProvider() },

]

export default class AuthServiceFire implements AuthService {
    authFire: firebase.auth.Auth;
    adminsDB: firebase.firestore.CollectionReference;
    constructor() {
        this.authFire = appFire.auth();
        this.adminsDB = appFire.firestore().collection("administrators")
    }
    supportedAuthNetworks(): string[] {
        return authNetworks.map(n => n.name);
    }
    getUserData(): Observable<UserData> {
        return authState(this.authFire).pipe(mergeMap(fireUser => {
            return fireUser ? this.getUserDataWithAdminCheck(fireUser) :
                of({ username: '', isAdmin: false, displayName: '' })
        }))

    }
    private getUserDataWithAdminCheck(fireUser: firebase.User):
        Observable<UserData> {
        console.log(fireUser)
        return collectionData<{ uid: string }>(this.adminsDB)
            .pipe(map(admins => {
                if (admins.find(a => a.uid === fireUser.uid)) {
                    return { username: fireUser.uid, isAdmin: true, displayName: this.getDisplayName(fireUser) };
                } else {
                    if (fireUser.emailVerified || fireUser.displayName) {
                        return { username: fireUser.uid, isAdmin: false, displayName: this.getDisplayName(fireUser) };
                    }
                    else {
                        return { username: '', isAdmin: false, displayName: '' }
                    }
                }
            }))
    }
    private getDisplayName(fireUser: firebase.User): string {
        return fireUser.displayName ? fireUser.displayName : fireUser.email as string
    }
    async login(loginData: LoginData): Promise<boolean> {
        return loginData.password ? this.passwordAuth(loginData) :
            this.networkAuth(loginData.email);
    }
    logout(): Promise<boolean> {
        return this.authFire.signOut().then(() => true).catch(() => false)
    }
    private async passwordAuth(loginData: LoginData): Promise<boolean> {
        let res: boolean;

        try {

            await this.authFire
                .signInWithEmailAndPassword(loginData.email, loginData.password);
            res = true;

        } catch (error) {
            res = false;
        }
        return res;
    }
    private async networkAuth(networkName: string): Promise<boolean> {
        const provider = this.getNetworkProvider(networkName);
        let res: boolean = false;
        if (provider) {

            try {
                await this.authFire.signInWithPopup(provider);
                res = true;
            } catch (error) {
                res = false
            }
        }
        return res
    }
    getNetworkProvider(networkName: string): firebase.auth.AuthProvider | null {
        const index = authNetworks.findIndex(n => n.name === networkName);
        return index < 0 ? null : authNetworks[index].provider
    }

}