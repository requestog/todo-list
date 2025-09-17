import type IUser from "./IUser.ts";

export interface IAuthResponse {
    accessToken: string;
    user: IUser;
    idSession: string;
}