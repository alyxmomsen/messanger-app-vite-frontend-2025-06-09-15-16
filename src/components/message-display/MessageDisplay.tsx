import { useEffect, useState } from "react";
import { useMainContext } from "../../contexts/main-context/MainContext";
import type { Document, WithId } from "mongodb";
import { MessageItem } from "../message-component/MessageItem";

const MessageDisplay = () => {
    const { webSocketService } = useMainContext();

    const [messages, setMesages] = useState<string[]>([]);

    useEffect(() => {
        /**
         *
         */
        webSocketService.addEventListener("message/new", (payload) => {
            console.log({ payload: payload, typeof: typeof payload }); // #temp

            setMesages((curr) => [...curr, payload]); // #temp #warning
        });

        webSocketService.addEventListener("story/update", (payload) => {
            try {
                const result = JSON.parse(payload) as WithId<Document>[]; // #temp

                setMesages(result.map((el) => el?.message));
            } catch (err) {
                console.log("message display addevent listener error::", err);
            }
        });

        /**
         * пустой массив, переданый вторым параметром в данную функцию
         * обеспечивает одноразовый вызов, при первом монтировании компонента
         */
    }, []);

    return (
        <div className="bdr gap flex flex--col">
            {listReverseUtil(messages).map((elem) => (
                <MessageItem text={elem} />
            ))}
        </div>
    );
};

export default MessageDisplay;

function listReverseUtil(arr: string[]) {
    const newArr = [...arr];
    return newArr.reverse();
}
