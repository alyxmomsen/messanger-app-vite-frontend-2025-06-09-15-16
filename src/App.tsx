import "./App.css";
import { InputComponent } from "./components/input-component";
import MessageDisplay from "./components/message-display/MessageDisplay";
import SendMessageButton from "./components/send-message-button/SendMessageButton";
import { WebsocketConnectionButton } from "./components/WebsocketConnectionButton";
import CommonWrapper from "./components/wrappers/CommonWrapper";

function App() {
    console.log("app updated");

    return (
        <>
            <CommonWrapper>
                <div>
                    <header className="flex justify--right">
                        <div>web-socket connection</div>
                        <WebsocketConnectionButton />
                    </header>
                    <div className="flex flex--col">
                        <div className="flex">
                            <InputComponent />
                            <SendMessageButton />
                        </div>
                        <MessageDisplay />
                    </div>
                </div>
            </CommonWrapper>
        </>
    );
}

export default App;
