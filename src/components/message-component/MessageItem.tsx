export const MessageItem = ({ text, date }: { text: string; date: number }) => {
    return (
        <div
            style={{
                backgroundColor: randomNumber(6),
            }}
            className="message__item"
        >
            <div>{new Date(date).toDateString()}</div>
            <div>{text}</div>
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
