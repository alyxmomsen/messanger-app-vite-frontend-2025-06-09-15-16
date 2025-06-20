import type React from "react";

// #dev::question: для чего нужен это элемент?

const CommonWrapper = ({ children }: { children: React.ReactElement }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {children}
        </div>
    );
};

export default CommonWrapper;
