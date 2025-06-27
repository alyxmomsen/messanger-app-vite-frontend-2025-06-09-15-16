import "./App.css";
import { InputComponent } from "./components/input-component";
import MessageDisplay from "./components/message-display/MessageDisplay";
import SendMessageButton from "./components/send-message-button/SendMessageButton";
import { WebsocketConnectionButton } from "./components/WebsocketConnectionButton";
import CommonWrapper from "./components/wrappers/CommonWrapper";
import { MainContextProvider } from "./contexts/main-context/MainContext";

function App() {
    return (
        <MainContextProvider>
            <>
                <CommonWrapper>
                    <div>
                        <header className="flex justify--right">
                            <div>web-socket connection</div>
                            <WebsocketConnectionButton />
                        </header>
                        <div className="flex flex-col">
                            <div>
                                <div className="flex">
                                    <InputComponent />
                                    <SendMessageButton />
                                </div>
                            </div>
                            <div>
                                <MessageDisplay />
                            </div>
                        </div>
                    </div>
                </CommonWrapper>
            </>
        </MainContextProvider>
    );
}

export default App;
