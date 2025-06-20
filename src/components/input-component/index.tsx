import { useEffect, useState } from "react";
import { useMainContext } from "../../contexts/main-context/MainContext";

export const InputComponent = () => {
    const { messageText, setMessageText, webSocketService } = useMainContext();
    const [inputDisabled, setInputDisabled] = useState(true);

    useEffect(() => {
        webSocketService.addEventListener("open", () => {
            setInputDisabled(false);
        });

        webSocketService.addEventListener("close", () => {
            setInputDisabled(true);
        });

        webSocketService.addEventListener("sent", () => {
            // когда на сервисе произойдет событие,
            // поле для ввода будет очищено
            setMessageText("");
        });
    }, []);

    return (
        <div>
            <input
                disabled={inputDisabled}
                type="text"
                value={messageText}
                onInput={(e) => {
                    setMessageText(e.currentTarget.value);
                }}
                onKeyUp={(e) => {
                    const key = e.key;

                    if (key !== "Enter" || messageText.length < 1) return;

                    webSocketService.send(messageText);
                }}
            />
        </div>
    );
};
