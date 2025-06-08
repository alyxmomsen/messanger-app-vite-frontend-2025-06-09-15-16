import React, { createContext, useContext, useEffect, useState } from "react";
import { MyApp } from "../../application/app/App";
import {
    WebSocketService,
    type IWebSocketService,
} from "../../application/services/websocket-service/WebSocketService";

export type TMainContex = {
    app: MyApp;
    webSocketService: IWebSocketService;
    messageText: string;
    setMessageText: (
        value: string,
    ) => void /* React.Dispatch<React.SetStateAction<string>> */;
};

export const MainContext = createContext<TMainContex | undefined>(undefined);

export function MainContextProvider({
    children,
}: {
    children: React.ReactElement;
}) {
    const [app] = useState<MyApp>(new MyApp());
    const [wss] = useState<IWebSocketService>(new WebSocketService());
    const [messageInputText, setMessageInputText] = useState("");

    useEffect(() => {
        // wss.addEventListener()

        console.log("main_context::mounted");

        return () => {
            console.log("main_context::UNmounted");
        };
    }, []);

    useEffect(() => {
        // console.log('message changed');
    }, [messageInputText]);

    return (
        <MainContext.Provider
            value={{
                app,
                webSocketService: wss,
                messageText: messageInputText,
                setMessageText: setMessageInputText,
            }}
        >
            {children}
        </MainContext.Provider>
    );
}

export function useMainContext() {
    const ctx = useContext(MainContext);

    if (ctx === undefined) throw new Error("no main context");

    return ctx;
}

// export function useWebsocketState() {
//     const { webSocketService } = useMainContext();

//     useEffect(() => {
//         webSocketService.
//     } , []);

//     const [open, setOpen] = useState(false);
//     const [closed, setClosed] = useState(false);
//     const [closing, setClosing] = useState(false);
//     const [connecting, setConnecting] = useState(false);

//     return {
//         open,
//         closed,
//         closing,
//         connecting,
//     };
// }
