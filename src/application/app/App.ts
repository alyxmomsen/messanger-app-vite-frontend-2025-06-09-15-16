import {
    WebSocketService,
    type IWebSocketService,
} from "../services/websocket-service/WebSocketService";

export type TEventListenerParam = Record<string, Record<string, string>>;

export type TMyAppEventListener = (data: TEventListenerParam) => void;

export type TMyAppEventType = "message/incoming" | "messge/outgoing";

export class MyApp {
    // collections

    private eventListenersPool: Map<string, TMyAppEventListener[]>;

    private webSocketService: IWebSocketService;

    addEventListener(
        eventType: TMyAppEventType,
        eventListener: TMyAppEventListener,
    ) {
        const listeners = this.eventListenersPool.get(eventType);

        if (listeners === undefined) {
            this.eventListenersPool.set(eventType, []);
        }

        this.eventListenersPool.get(eventType)?.push(eventListener);
    }

    emit(eventType: TMyAppEventType, data: TEventListenerParam) {
        const listeners = this.eventListenersPool.get(eventType);

        if (listeners === undefined) return;

        listeners.forEach((elem) => elem(data));
    }

    constructor() {
        this.eventListenersPool = new Map();
        this.webSocketService = new WebSocketService();
    }
}
