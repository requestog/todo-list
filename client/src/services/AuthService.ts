import type {IAuthResponse} from "../models/IAuthResponse.ts";
import $api from "../http";
import axios from "axios";

export class AuthService {
    static async registration(username: string, password: string): Promise<IAuthResponse> {
        const {data} = await $api.post<IAuthResponse>("/auth/registration", {
            username,
            password,
        });
        return data;
    }

    static async refresh(): Promise<IAuthResponse> {
        const response = await axios.get<IAuthResponse>(
            `${import.meta.env.REACT_APP_API_URL}/auth/refresh`,
            {withCredentials: true},
        );
        return response.data;
    }
}