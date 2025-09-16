import type IUser from "../../models/IUser.ts";
import {makeAutoObservable} from "mobx";
import type {IAuthResponse} from "../../models/IAuthResponse.ts";
import {AuthService} from "../../services/AuthService.ts";

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
        } catch (error) {
            console.log("registrationn error: ", error);
        }
    }

}