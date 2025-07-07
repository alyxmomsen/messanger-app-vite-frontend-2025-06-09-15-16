// import type { Document, WithId } from "mongodb"; // #temp #important

export interface IWebSocketService {
    /**
     * это свойство подлежит сокрытию.
     * пока что оно в интерфейсе, но
     * это временно
     */
    webSocket: WebSocket | null; // #temp
    connect(): void;
    addEventListener<E extends keyof EvntArgsMap>(
        eventType: E,
        handler: (args: EvntArgsMap[E]) => void,
    ): void;
    disconect(): void;
    onopen: (() => void) | null;
    onclose: (() => void) | null;
    // getReadyState(): number | undefined;
    send(textContent: string): void;
}

export type TIncomingMessage =
    | {
          type: "message/new";
          payload: {
              message: string;
              date: number;
          };
      }
    | {
          type: "message/story";
          payload: /* WithId<Document> */ {
              _id: string;
              date: number;
              message: string;
          }[];
      };

// Такой же тип должен быть на бекенд
export type TWebsocketOutgoingMessage =
    | {
          type: "message";
          payload: string;
      }
    | {
          type: "command";
          payload: {
              action: { type: "insert"; payload: string };
          };
      };

export type TSerializedData = string;

export type TWebsocketServiceEventListener = () => void;

export type TWebsocketServiceEventType =
    | "message/new"
    | "story/update"
    | "open"
    | "close"
    | "sent";

export type TMessageNewEventListener = (ev: {
    message: string;
    date: number;
}) => void;
export type TStoryUpdateEventListener = (ev: string) => void;
export type TOpenEventListener = (ev: string) => void;
export type TCloseEventListener = (ev: string) => void;
export type TSentEventListener = (ev: string) => void;

export interface EvntArgsMap {
    "message/new": { message: string; date: number };
    "story/update": { message: string; date: number }[];
    open: string;
    close: string;
    sent: string;
}

export interface IWebsocketServiceEventListenerMap {
    "message/new": TMessageNewEventListener;
    "story/update": TStoryUpdateEventListener;
    open: TOpenEventListener;
    close: TCloseEventListener;
    sent: TSentEventListener;
}

export class WebSocketService implements IWebSocketService {
    webSocket: WebSocket | null;

    onopen: (() => void) | null;
    onclose: (() => void) | null;

    send(textContent: string): void {
        // console.log("message sent");

        const ws = this.webSocket;
        if (ws === null) return;

        const wsmess: TWebsocketOutgoingMessage = {
            type: "message",
            payload: textContent,
        };

        ws.send(JSON.stringify(wsmess));

        this.emit("sent", "message was sent");
    }

    addEventListener<E extends keyof EvntArgsMap>(
        eventType: E,
        handler: (args: EvntArgsMap[E]) => void,
    ): void {
        const listeners = this.eventListenersPool.get(eventType) || [];
        listeners.push(handler);
        this.eventListenersPool.set(eventType, listeners);
    }

    private emit<K extends keyof EvntArgsMap>(
        eventType: K,
        ev: EvntArgsMap[K],
    ): void {
        const listeners = this.eventListenersPool.get(eventType);
        if (listeners === undefined) return;

        listeners.forEach((elem: (args: EvntArgsMap[K]) => void) => {
            elem(ev);
        });
    }

    disconect(): void {
        if (
            this.webSocket &&
            (this.webSocket.readyState === this.webSocket.CLOSING ||
                this.webSocket.readyState === this.webSocket.CONNECTING)
        ) {
            return;
        }

        if (this.webSocket) {
            this.webSocket.close();
        }
    }

    connect(): void {
        /**
         * исключение вероятности открытия соединения,
         * если прредыдущее соединение еще не закрыто, либо
         * если находится в процесси закрытия или открытия
         */
        if (
            this.webSocket &&
            (this.webSocket.readyState === this.webSocket.OPEN ||
                this.webSocket.readyState === this.webSocket.CLOSING ||
                this.webSocket.readyState === this.webSocket.CONNECTING)
        ) {
            return;
        }

        /**
         * получения переменной окружения
         */
        const host = import.meta.env.VITE_BACKEND_HOST_URL;

        // console.log({ host });
        this.webSocket = new WebSocket(host || "ws://127.0.0.1:8080");

        this.webSocket.addEventListener("open", () => {
            console.log("opened");
            this.emit("open", "connection is opened");
        });

        this.webSocket.addEventListener("close", () => {
            console.log("closed");
            this.emit("close", "connection is closed");
        });

        this.webSocket.addEventListener("message", (event) => {
            console.log(event.data);

            try {
                const parsedData = JSON.parse(event.data) as TIncomingMessage;

                console.log({ parsedData });

                switch (parsedData.type) {
                    case "message/new": {
                        this.emit("message/new", {
                            message: parsedData.payload.message,
                            date: parsedData.payload.date,
                        });
                        break;
                    }
                    case "message/story": {
                        this.emit("story/update", parsedData.payload);
                        break;
                    }
                }
            } catch (err) {
                // alert(err);
                console.log("message parse error");
            }
        });

        this.webSocket.addEventListener("error", () => {
            console.log("error");
        });
    }

    private eventListenersPool: Map<keyof EvntArgsMap, Array<any>>;

    constructor() {
        this.eventListenersPool = new Map<
            keyof EvntArgsMap,
            ((args: EvntArgsMap[keyof EvntArgsMap]) => void)[]
        >();
        this.onclose = null;
        this.onopen = null;
        this.webSocket = null;
    }
}

// export type MyMap<K extends keyof IWebsocketServiceEventListenerMap> = Map<K, IWebsocketServiceEventListenerMap[K][]>;

// const myMap: MyMap<keyof IWebsocketServiceEventListenerMap> = new Map();

// myMap.set('message/new', []);

// const arr = myMap.get('message/new')
