import { observer } from "mobx-react";
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../routes";
import { AUTH_ROUTE, MAIN_ROUTE } from "../utils/consts";
import {Context} from "../AppContext.ts";

export const AppRouter = observer(() => {
    const { userStore } = useContext(Context);

    return (
        <Routes>
            {!userStore.isAuth
                ? publicRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))
                : privateRoutes.map(({ path, Component }) => (
                    <Route key={path} path={path} element={<Component />} />
                ))
            }
            <Route
                path="*"
                element={
                    !userStore.isAuth
                        ? <Navigate to={AUTH_ROUTE} />
                        : <Navigate to={MAIN_ROUTE} />
                }
            />
        </Routes>
    );
});
