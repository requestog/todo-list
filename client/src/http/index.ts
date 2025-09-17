import axios from "axios";
import {AuthService} from "../services/AuthService";
import type {IAuthResponse} from "../models/IAuthResponse.ts";

const $api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

$api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

$api.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response: IAuthResponse = await AuthService.refresh();
                localStorage.setItem("accessToken", response.accessToken);

                originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;
                return $api(originalRequest);
            } catch (e) {
                console.error("Refresh token expired or invalid:", e);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("idSession");
            }
        }

        throw error;
    }
);

export default $api;
