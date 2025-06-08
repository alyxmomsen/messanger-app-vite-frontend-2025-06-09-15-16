export interface IWebSocketService {
    /**
     * это свойство подлежит сокрытию.
     * пока что оно в интерфейсе, но 
     * это временно
     */
    webSocket: WebSocket | null; // #temp
    connect(): void;
    addEventListener(): void;
    disconect(): void;
    onopen: (() => void) | null;
    onclose: (() => void) | null;
    getReadyState(): number | undefined;
    send(message:string): void;
}

export type TWebSocketMessage = {
    message:string,
}

export class WebSocketService implements IWebSocketService {
    webSocket: WebSocket | null;

    onopen: (() => void) | null;
    onclose: (() => void) | null;

    send(message:string): void {

        const ws = this.webSocket;
        if (ws === null) return;
        
        const wsmess:TWebSocketMessage = {
            message,
        }

        ws.send(JSON.stringify(wsmess));

    }

    addEventListener(): void {}

    emit() {}

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

        const host = "ws://127.0.0.1:8080";
        // const host = "ws://morally-rational-mastodon.cloudpub.ru:8080"; // #note :: dont work
        this.webSocket = new WebSocket(host);

        this.webSocket.onopen = () => {
            if (this.onopen) {
                this.onopen();
            }

            console.log("websocket::open");
        };

        this.webSocket.onmessage = () => {
            console.log("websocket::message");
        };

        this.webSocket.onclose = () => {
            console.log("websocket::close");
            // console.log((this.webSocket?.readyState)?.toString());
            // this.webSocket = null;
            this.onclose?.();
        };

        this.webSocket.onerror = () => {
            console.log("websocket::error");
        };
    }

    constructor() {
        this.onclose = null;
        this.onopen = null;
        this.webSocket = null;
    }
}
