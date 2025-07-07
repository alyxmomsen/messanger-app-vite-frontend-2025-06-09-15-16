import { useEffect, useState } from "react";
import { useMainContext } from "../../contexts/main-context/MainContext";

const SendMessageButton = () => {
    const { webSocketService, messageText, sendMessageButtonState } =
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
        <div>
            <button
                style={{
                    visibility:
                        !sendMessageButtonState /* || messageText.length <= 0 */
                            ? "hidden"
                            : "visible",
                }}
                disabled={
                    !sendMessageButtonState /* || messageText.length <= 0 */
                }
                onClick={() => {
                    console.log("action::send-message");
                    // #hardcode
                    webSocketService.send(
                        `frontend message. test : ${messageText}`,
                    );
                }}
            >
                &#9989;
            </button>
        </div>
    );
};

export default SendMessageButton;
