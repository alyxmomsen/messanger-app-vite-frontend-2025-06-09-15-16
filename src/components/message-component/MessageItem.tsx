export const MessageItem = ({ text }: { text: string }) => {
    return (
        <div
            style={{
                backgroundColor: randomNumber(6),
            }}
            className="message__item"
        >
            {text}
        </div>
    );
};

function randomNumber(numberOfItems: number) {
    const str = "0123456789abcdef";
    return (
        "#" +
        new Array(numberOfItems)
            .fill(1)
            .map(() => str[Math.floor(Math.random() * str.length)])
            .join("")
    );
}
