import { useEffect } from "react";
import "./App.css";
import { InputComponent } from "./components/input-component";
import MessageDisplay from "./components/message-display/MessageDisplay";
import SendMessageButton from "./components/send-message-button/SendMessageButton";
import { WebsocketConnectionButton } from "./components/WebsocketConnectionButton";
import CommonWrapper from "./components/wrappers/CommonWrapper";
import {
    useMainContext,
    // useMainContext,
} from "./contexts/main-context/MainContext";

function App() {
    const { webSocketService } = useMainContext();

    // const [isConnected /* , setIsConnected */] = useState(true);

    useEffect(() => {
        webSocketService.addEventListener("open", (payload: string) => {
            console.log(payload);
        });

        webSocketService.addEventListener("close", (payload: string) => {
            console.log(payload);
        });

        return () => alert();
    }, []);

    return (
        <>
            <span>hello world</span>
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
