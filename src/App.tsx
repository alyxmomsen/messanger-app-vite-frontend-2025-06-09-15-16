import "./App.css";
import { InputComponent } from "./components/input-component";
import MessageDisplay from "./components/message-display/MessageDisplay";
import SendMessageButton from "./components/send-message-button/SendMessageButton";
import { WebSocketConnection } from "./components/WebSocketConnection";
import CommonWrapper from "./components/wrappers/CommonWrapper";
import { MainContextProvider } from "./contexts/main-context/MainContext";

function App() {
    return (
        <MainContextProvider>
            <>
                <CommonWrapper>
                    <>
                        <MessageDisplay />
                        <WebSocketConnection />
                        <InputComponent />
                        <SendMessageButton />
                    </>
                </CommonWrapper>
            </>
        </MainContextProvider>
    );
}

export default App;
