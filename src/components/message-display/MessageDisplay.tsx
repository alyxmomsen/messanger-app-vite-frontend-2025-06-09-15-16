import { useEffect, useState } from "react";
import { useMainContext } from "../../contexts/main-context/MainContext";
// import type { Document, WithId } from "mongodb";
import { MessageItem } from "../message-component/MessageItem";

export type TMessage = {
    message: string;
    date: number;
};

const MessageDisplay = () => {
    const { webSocketService } = useMainContext();

    const [messages, setMesages] = useState<TMessage[]>([]);

    console.log("message display component updated");

    // useEffect(() => {
    //     console.log(messages);
    // }, [messages]);

    useEffect(() => {
        /**
         *
         */
        webSocketService.addEventListener(
            "message/new",
            ({ message, date }: { message: string; date: number }) => {
                // console.log({ payload: payload, typeof: typeof payload }); // #temp
                setMesages((curr) => [...curr, { message, date }]); // #temp #warning
            },
        );

        webSocketService.addEventListener("story/update", (args) => {
            console.log("update the story of the messages");
            console.log(args);
            setMesages(args);
        });

        /**
         * пустой массив, переданый вторым параметром в данную функцию
         * обеспечивает одноразовый вызов, при первом монтировании компонента
         */
        return () => console.log("component `Message Display` unmount");
    }, []);

    return (
        <div className="gap flex flex--col">
            {listReverseUtil(messages).map((elem) => (
                <MessageItem
                    key={elem.date}
                    text={elem.message}
                    date={elem.date}
                />
            ))}
        </div>
    );
};

export default MessageDisplay;

function listReverseUtil(arr: TMessage[]) {
    const newArr = [...arr];
    return newArr.reverse();
}
