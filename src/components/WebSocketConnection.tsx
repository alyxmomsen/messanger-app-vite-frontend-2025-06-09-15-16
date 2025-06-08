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

    const [sendButtonState, setSendButtonState] = useState(false);

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

        webSocketService.addEventListener("close", () => {
            setSendButtonState(true);
        });

        webSocketService.addEventListener("open", () => {
            setSendButtonState(false);
        });

        return () => console.log("test-component::UnMounted");
    }, []);

    const { messageText } = useMainContext();

    return (
        <div>
            <div>
                <button
                    disabled={sendButtonState}
                    onClick={() => {
                        console.log("action::send-message");
                        // #hardcode
                        webSocketService.send(
                            `hello from frontend. this is my own test text: ${messageText}`,
                        );
                    }}
                >
                    send message
                </button>
            </div>
            <div>
                {connectButtonDisabled ? (
                    disconButtonDisabled ? (
                        <></>
                    ) : (
                        <button
                            disabled={disconButtonDisabled}
                            onClick={() => {
                                console.log("action::disconect");
                                webSocketService.disconect();
                            }}
                        >
                            disconect
                        </button>
                    )
                ) : (
                    <button
                        disabled={connectButtonDisabled}
                        onClick={() => {
                            console.log("action::connect");
                            webSocketService.connect();
                        }}
                    >
                        connect
                    </button>
                )}
            </div>
            <p>web-socket connection</p>
        </div>
    );
}
