import {BrowserRouter} from "react-router-dom";
import {AppRouter} from "./src/components/AppRouter.tsx";

function App() {
    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    )
}

export default App
