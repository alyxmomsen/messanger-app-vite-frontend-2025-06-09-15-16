import React from "react";

/** *
 * компонент обернут в функцию React.memo
 * с целью предотвратить перерисовку компонента
 */
export const MessageItem = React.memo(
    ({ text, date }: { text: string; date: number }) => {
        const month = [
            "jan",
            "feb",
            "marth",
            "april",
            "may",
            "jun",
            "jule",
            "aug",
            "sep",
            "nov",
            "dec",
        ];

        const oDate = new Date(date);
        const hours = oDate.getHours();
        const minutes = oDate.getMinutes();
        const seconds = oDate.getSeconds();
        const dateString = `
        ${month[oDate.getMonth()]} 
        ${oDate.getDate()} 
        ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds} 
        `;

        return (
            <div
                style={{
                    backgroundColor: randomNumber(6),
                }}
                className="message__item"
            >
                <div className="message__item__date">{dateString}</div>
                <div className="message__item__text">{text}</div>
            </div>
        );
    },
);

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
