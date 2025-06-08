import "./App.css";
import { InputComponent } from "./components/input-component";
import { WebSocketConnection } from "./components/WebSocketConnection";
import CommonWrapper from "./components/wrappers/CommonWrapper";
import { MainContextProvider } from "./contexts/main-context/MainContext";

function App() {
    return (
        <MainContextProvider>
            <>
                <CommonWrapper>
                    <>
                        <WebSocketConnection />
                        <InputComponent />
                    </>
                </CommonWrapper>
            </>
        </MainContextProvider>
    );
}

export default App;
