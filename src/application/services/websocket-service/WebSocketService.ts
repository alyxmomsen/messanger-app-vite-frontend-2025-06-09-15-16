export interface IWebSocketService {
    /**
     * это свойство подлежит сокрытию.
     * пока что оно в интерфейсе, но
     * это временно
     */
    webSocket: WebSocket | null; // #temp
    connect(): void;
    addEventListener(
        eventType: string,
        eventListener: (payload: string) => void,
    ): void;
    disconect(): void;
    onopen: (() => void) | null;
    onclose: (() => void) | null;
    getReadyState(): number | undefined;
    send(textContent: string): void;
}

export type TWebSocketMessage = {
    textContent: string;
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
        eventType: string,
        eventListener: (payload: string) => void,
    ): void {
        console.log("event type: " + eventType);

        const listeners = this.eventListenersPool.get(eventType);

        if (listeners === undefined) {
            this.eventListenersPool.set(eventType, []);
        }

        this.eventListenersPool.get(eventType)?.push(eventListener);
    }

    emit(eventType: string, payload: string): void {
        console.log({ payload });
        const listeners = this.eventListenersPool.get(eventType);

        if (listeners === undefined) return;

        listeners.forEach((elem) => elem(payload));

        console.log(eventType);
    }

    /**
     *
     * @returns number | undefined
     */
    getReadyState() {
        return this.webSocket?.readyState;
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
        if (
            this.webSocket &&
            (this.webSocket.readyState === this.webSocket.OPEN ||
                this.webSocket.readyState === this.webSocket.CLOSING ||
                this.webSocket.readyState === this.webSocket.CONNECTING)
        ) {
            return;
        }

        const host = import.meta.env.VITE_BACKEND_HOST_URL;
        console.log({ host });
        this.webSocket = new WebSocket(host || "ws://127.0.0.1:8080");

        this.webSocket.onopen = () => {
            if (this.onopen) {
                this.onopen();

                this.emit("open", "");
            }

            console.log("websocket::open");
        };

        this.webSocket.onmessage = (e) => {
            console.log("websocket::message", e.data);

            const data = e.data as string;

            this.emit("message", data);
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

    private eventListenersPool: Map<string, ((payload: string) => void)[]>;

    constructor() {
        this.eventListenersPool = new Map();
        this.onclose = null;
        this.onopen = null;
        this.webSocket = null;
    }
}
