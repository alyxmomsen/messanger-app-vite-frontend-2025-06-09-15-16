import type { Document, WithId } from "mongodb"; // #temp #important

export interface IWebSocketService {
    /**
     * это свойство подлежит сокрытию.
     * пока что оно в интерфейсе, но
     * это временно
     */
    webSocket: WebSocket | null; // #temp
    connect(): void;
    addEventListener(
        eventType: TWebsocketServiceEventType,
        handler: TWebsocketServiceEventHandler,
    ): void;
    disconect(): void;
    onopen: (() => void) | null;
    onclose: (() => void) | null;
    // getReadyState(): number | undefined;
    send(textContent: string): void;
}

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

export type TIncommingMessageType = "simple-message" | "all-messages";

export type TWebsocketIncomingMessage =
    | ({
          type: "message/current";
          payload: null;
      } & {
          textContent: string;
          //   connectionId: string;
      })
    | ({
          type: "message/story";
          payload: WithId<Document>[];
      } & {
          textContent: string;
          //   connectionId: string;
      });

// Webso

export type TSerializedData = string;

export type TWebsocketServiceEventHandler = (payload: string) => void;

export type TWebsocketServiceEventType =
    | "message/new"
    | "story/update"
    | "open"
    | "close"
    | "sent";

export class WebSocketService implements IWebSocketService {
    webSocket: WebSocket | null;

    onopen: (() => void) | null;
    onclose: (() => void) | null;

    send(textContent: string): void {
        console.log("message sent");

        const ws = this.webSocket;
        if (ws === null) return;

        const wsmess: TWebsocketOutgoingMessage = {
            type: "message",
            payload: textContent,
        };

        ws.send(JSON.stringify(wsmess));

        this.emit("sent", "");
    }

    addEventListener(
        eventType: TWebsocketServiceEventType,
        handler: TWebsocketServiceEventHandler,
    ): void {
        const listeners = this.eventHandlersPool.get(eventType);

        if (listeners === undefined) {
            this.eventHandlersPool.set(eventType, []);
        }

        this.eventHandlersPool.get(eventType)?.push(handler);
    }

    private emit(
        eventType: TWebsocketServiceEventType,
        payload: TSerializedData,
    ): void {
        const listeners = this.eventHandlersPool.get(eventType);
        if (listeners === undefined) return;

        listeners.forEach((elem) => elem(payload));
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

        console.log({ host });
        this.webSocket = new WebSocket(host || "ws://127.0.0.1:8080");

        this.webSocket.onopen = () => {
            this.emit("open", "opened");
            console.log("websocket::open");
        };

        this.webSocket.addEventListener("message", () => {
            /**
             * для тестирования подходящего кейса
             */
        });

        this.webSocket.onmessage = (e) => {
            console.log("websocket::message", e.data);

            const stringdata = e.data as string;

            try {
                const parsedData = JSON.parse(
                    stringdata,
                ) as TWebsocketIncomingMessage;

                if (parsedData.type === "message/story") {
                    // const payload = JSON.parse(parsedData.payload);

                    console.log({ parsedData });

                    this.emit(
                        "story/update",
                        JSON.stringify(parsedData.payload),
                    );

                    // this.emit("message", parsedData);
                    return;
                }
            } catch (err) {
                console.log("data parsing error: ", err);
            }

            this.emit("message/new", stringdata);
        };

        this.webSocket.onclose = () => {
            console.log("websocket::close");
            // console.log((this.webSocket?.readyState)?.toString());
            // this.webSocket = null;
            this.onclose?.();

            this.emit("close", "");
        };

        this.webSocket.onerror = () => {
            console.log("websocket::error");
        };
    }

    private eventHandlersPool: Map<string, TWebsocketServiceEventHandler[]>;

    constructor() {
        this.eventHandlersPool = new Map();
        this.onclose = null;
        this.onopen = null;
        this.webSocket = null;
    }
}
