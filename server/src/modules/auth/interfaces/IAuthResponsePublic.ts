import {ISaveUser} from "../../user/interfaces/ISaveUser";

export interface IAuthResponsePublic {
    accessToken: string;
    user: ISaveUser;
    idSession: string;
}
