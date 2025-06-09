import { useEffect, useState } from "react";
import { useMainContext } from "../../contexts/main-context/MainContext";

const SendMessageButton = () => {
    const { webSocketService, messageText } = useMainContext();

    const [webSocketServiceIsOpen, setWebSocketServiceIsOpen] = useState(false);

    useEffect(() => {
        webSocketService.addEventListener("close", () => {
            setWebSocketServiceIsOpen(false);
        });

        webSocketService.addEventListener("open", () => {
            setWebSocketServiceIsOpen(true);
        });
    }, []);

    return (
        <div>
            <button
                style={{
                    visibility:
                        !webSocketServiceIsOpen || messageText.length <= 0
                            ? "hidden"
                            : "visible",
                }}
                disabled={!webSocketServiceIsOpen || messageText.length <= 0}
                onClick={() => {
                    console.log("action::send-message");
                    // #hardcode
                    webSocketService.send(
                        `frontend message. test : ${messageText}`,
                    );
                }}
            >
                send message
            </button>
        </div>
    );
};

export default SendMessageButton;
