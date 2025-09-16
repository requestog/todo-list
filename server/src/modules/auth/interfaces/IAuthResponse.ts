import {ISaveUser} from "../../user/interfaces/ISaveUser";
import {ITokens} from "./ITokens";

export interface IAuthResponse {
    tokens: ITokens;
    user: ISaveUser;
    idSession: string;
}