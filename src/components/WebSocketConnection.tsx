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
            <h4>web-socket connection</h4>
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
        </div>
    );
}
