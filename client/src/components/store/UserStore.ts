import type IUser from "../../models/IUser.ts";
import { makeAutoObservable} from "mobx";
import type {IAuthResponse} from "../../models/IAuthResponse.ts";
import {AuthService} from "../../services/AuthService.ts";
import $api from "../../http";

export default class UserStore {
    user = {} as IUser;
    isAuth: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async registration(username: string, password: string): Promise<void> {
        try {
            const response: IAuthResponse = await AuthService.registration(
                username,
                password,
            );
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("idSession", response.idSession);
            this.setIsAuth(true);
            this.setUser(response.user);
        } catch (error) {
            console.log("registration error: ", error);
        }
    }

    async login(username: string, password: string): Promise<void> {
        try {
            const response: IAuthResponse = await AuthService.login(username, password);
            localStorage.setItem("accessToken", response.accessToken);
            localStorage.setItem("idSession", response.idSession);
            this.setIsAuth(true);
            this.setUser(response.user);
        } catch (error) {
            console.error("login error:", error);
        }
    }

    async logout(): Promise<void> {
        try {
            await AuthService.logout(localStorage.getItem("idSession"));
            localStorage.removeItem("accessToken");
            localStorage.removeItem("idSession");
            this.setIsAuth(false);
            this.setUser({} as IUser);
        } catch (error) {
            console.error("logout error:", error);
        }
    }

    async checkAuth(): Promise<void> {
        try {
            const response = await $api.get("api/auth/me");
            this.setIsAuth(true);
            this.setUser(response.data);
        } catch (error) {
            console.error("checkAuth error:", error);
        }
    }

    setIsAuth(bool: boolean): void {
        this.isAuth = bool;
    }

    setUser(user: IUser): void {
        this.user = user;
    }

}