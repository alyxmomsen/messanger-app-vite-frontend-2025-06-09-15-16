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
                    <header className="flex flx__justify--around flx__aln--center">
                        <h2>CHAT</h2>
                        <WebsocketConnectionButton />
                    </header>
                    <div className="flex flex--col">
                        <div className="flex flx__justify--around flx__aln--center gap">
                            <InputComponent style={{ flex: 3 }} />
                            <SendMessageButton style={{ flex: 1 }} />
                        </div>
                        <MessageDisplay />
                    </div>
                </div>
            </CommonWrapper>
        </>
    );
}

export default App;
