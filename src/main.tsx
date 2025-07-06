import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { MainContextProvider } from "./contexts/main-context/MainContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <MainContextProvider>
            <App />
        </MainContextProvider>
    </StrictMode>,
);
