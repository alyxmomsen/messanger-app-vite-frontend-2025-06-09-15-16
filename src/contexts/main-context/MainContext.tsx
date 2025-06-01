import React, { createContext, useContext, useEffect, useState } from "react";
import { MyApp } from "../../application/app/App";
import {
    WebSocketService,
    type IWebSocketService,
} from "../../application/services/websocket-service/WebSocketService";

export type TMainContex = {
    app: MyApp;
    webSocketService: IWebSocketService;
};

export const MainContext = createContext<TMainContex | undefined>(undefined);

export function MainContextProvider({
    children,
}: {
    children: React.ReactElement;
}) {
    const [app] = useState<MyApp>(new MyApp());
    const [wss] = useState<IWebSocketService>(new WebSocketService());

    useEffect(() => {
        console.log("main_context::mounted");

        return () => {
            console.log("main_context::UNmounted");
        };
    }, []);

    return (
        <MainContext.Provider value={{ app, webSocketService: wss }}>
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

//     const state1 = useState();

//     return {
//         state1,
//     }
// }
