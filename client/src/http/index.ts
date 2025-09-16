import axios from "axios";
import {AuthService} from "../services/AuthService";
import type {IAuthResponse} from "../models/IAuthResponse.ts";

const $api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._isRetry
        ) {
            try {
                const response: IAuthResponse = await AuthService.refresh();
                localStorage.setItem("accessToken", response.accessToken);
                return $api(originalRequest);
            } catch (error) {
                console.error("Unauthorized:", error);
            }
        }
        throw error;
    },
);

export default $api;
