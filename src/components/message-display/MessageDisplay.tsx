import { useEffect, useState } from "react";
import { useMainContext } from "../../contexts/main-context/MainContext";

const MessageDisplay = () => {
    const { webSocketService } = useMainContext();

    const [messages, setMesages] = useState<string[]>([]);

    useEffect(() => {
        webSocketService.addEventListener("message", (payload) => {
            console.log(payload);
            setMesages((curr) => [...curr, payload]);
        });
    }, []);

    return (
        <div>
            <h5>messages</h5>
            <div>
                {messages.map((elem) => (
                    <li>{elem}</li>
                ))}
            </div>
        </div>
    );
};

export default MessageDisplay;
