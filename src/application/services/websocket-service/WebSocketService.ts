export interface IWebSocketService {
    webSocket: WebSocket | null;
    connect(): void;
    addEventListener(): void;
    disconect(): void;
    onopen: (() => void) | null;
    onclose: (() => void) | null;
}

export class WebSocketService implements IWebSocketService {
    webSocket: WebSocket | null;

    onopen: (() => void) | null;
    onclose: (() => void) | null;

    addEventListener(): void {}

    emit() {}

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

        this.webSocket = new WebSocket("ws://127.0.0.1:8080");

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
