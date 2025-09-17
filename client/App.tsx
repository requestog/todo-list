import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./src/components/AppRouter.tsx";
import {useContext, useEffect} from "react";
import {Context} from "./src/AppContext.ts";

function App() {
    const {userStore} = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem('accessToken')) {
            userStore.checkAuth();
        }
    }, []);

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    )
}

export default App
