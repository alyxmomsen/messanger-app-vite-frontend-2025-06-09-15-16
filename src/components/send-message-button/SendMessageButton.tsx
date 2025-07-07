import { useEffect, useState } from "react";
import { useMainContext } from "../../contexts/main-context/MainContext";

const SendMessageButton = ({ style }: { style: object }) => {
    const { webSocketService, messageText /*  sendMessageButtonState */ } =
        useMainContext();

    const [, /* webSocketServiceIsOpen */ setWebSocketServiceIsOpen] =
        useState(false);

    useEffect(() => {
        webSocketService.addEventListener("close", () => {
            setWebSocketServiceIsOpen(false);
        });

        webSocketService.addEventListener("open", () => {
            setWebSocketServiceIsOpen(true);
        });
    }, []);

    return (
        <div style={style}>
            <button
                style={{
                    opacity: messageText.length < 1 ? 0.4 : 1,
                }}
                disabled={
                    /* !sendMessageButtonState || */ messageText.length <= 0
                }
                onClick={() => {
                    console.log("action::send-message");
                    // #hardcode
                    webSocketService.send(messageText);
                }}
            >
                &#9989;
            </button>
        </div>
    );
};

export default SendMessageButton;
