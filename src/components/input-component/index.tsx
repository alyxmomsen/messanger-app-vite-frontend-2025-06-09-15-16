import { useEffect, useState } from "react";
import { useMainContext } from "../../contexts/main-context/MainContext";

export const InputComponent = ({ style }: { style: Object }) => {
    const {
        messageText,
        setMessageText,
        webSocketService,
        // setSendMessageButton,
    } = useMainContext();
    const [inputDisabled, setInputDisabled] = useState(true);

    // const [, /* messageText */ setMessageText] = useState(mt);
    console.log("input component");

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
        <div style={style}>
            <input
                style={{ width: "100%" }}
                disabled={inputDisabled}
                type="text"
                value={/* messageText */ messageText}
                onInput={(e) => {
                    // e;`
                    // setMessageText(e.currentTarget.value);
                    const value = e.currentTarget.value;
                    console.log(value);
                    // setMessageText((curr) => {
                    //     if (curr.length < 1 && value !== "") {
                    //         // setSendMessageButton(true);
                    //         // smt()
                    //     } else if (curr.length > 0 && value == "") {
                    //         setSendMessageButton(false);
                    //     }
                    //     return value;
                    // });

                    setMessageText(value);
                }}
                onKeyUp={(e) => {
                    const key = e.key;

                    if (
                        key !== "Enter" ||
                        /* messageText */ messageText.length < 1
                    )
                        return;

                    webSocketService.send(/* messageText */ messageText);
                }}
            />
        </div>
    );
};
