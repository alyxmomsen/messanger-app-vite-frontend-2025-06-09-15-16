import { useEffect, useState } from "react";
import { useMainContext } from "../contexts/main-context/MainContext";

export function WebSocketConnection() {
    const { webSocketService } = useMainContext();
    const [connectButtonDisabled, setConnectButtonDisabled] = useState(false);
    const [disconButtonDisabled, setDisconButtonDisabled] = useState(
        webSocketService.webSocket
            ? webSocketService.webSocket.readyState ===
              webSocketService.webSocket.CLOSED
                ? true
                : false
            : true,
    );

    useEffect(() => {
        console.log("test-component::mounted");

        webSocketService.onopen = () => {
            setConnectButtonDisabled(true);
            setDisconButtonDisabled(false);
        };

        webSocketService.onclose = () => {
            setConnectButtonDisabled(false);
            setDisconButtonDisabled(true);
        };

        return () => console.log("test-component::UnMounted");
    }, []);

    return (
        <div>
            <div>
                <button onClick={() => {
                    console.log('action::send-message');
                    // #hardcode
                    webSocketService.send('hello from frontend any text');
                }}>send message</button>
            </div>
            <div>

                <button
                    disabled={connectButtonDisabled}
                    onClick={() => {
                        console.log("action::connect");
                        webSocketService.connect();
                    }}
                >
                    connect
                </button>
                <button
                    disabled={disconButtonDisabled}
                    onClick={() => {
                        console.log("action::disconect");
                        webSocketService.disconect();
                        // webSocketService.
                    }}
                >
                    disconect
                </button>
            </div>
            <p>web-socket connection</p>
        </div>
    );
}
