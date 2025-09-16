import { createContext } from "react";
import UserStore from "./components/store/UserStore.ts";

export interface AppContextType {
    userStore: UserStore;
}

const userStore = new UserStore();

export const Context = createContext<AppContextType>({
    userStore,
});

export { userStore };
