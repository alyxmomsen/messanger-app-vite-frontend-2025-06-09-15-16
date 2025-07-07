import { useEffect, useState } from "react";
import { useMainContext } from "../../contexts/main-context/MainContext";

export const InputComponent = () => {
    const {
        messageText: mt,
        // setMessageText: smt,
        webSocketService,
        setSendMessageButton,
    } = useMainContext();
    const [inputDisabled, setInputDisabled] = useState(true);

    const [messageText, setMessageText] = useState(mt);
    console.log("input component");

    // useEffect(() => {

    // } , [messageText]);

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
                    // e;`
                    // setMessageText(e.currentTarget.value);
                    const value = e.currentTarget.value;
                    console.log(value);
                    setMessageText((curr) => {
                        if (curr.length < 1 && value !== "") {
                            setSendMessageButton(true);
                        } else if (curr.length > 0 && value == "") {
                            setSendMessageButton(false);
                        }
                        return value;
                    });
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
