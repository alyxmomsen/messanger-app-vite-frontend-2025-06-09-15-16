import "./App.css";
import { WebSocketConnection } from "./components/WebSocketConnection";
import { MainContextProvider } from "./contexts/main-context/MainContext";

function App() {
    return (
        <MainContextProvider>
            <WebSocketConnection />
        </MainContextProvider>
    );
}

export default App;
