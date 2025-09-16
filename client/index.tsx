import { createRoot } from "react-dom/client";
import App from "./App";
import { Context, userStore } from "./src/AppContext";

const root = createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <Context.Provider value={{ userStore }}>
        <App />
    </Context.Provider>
);