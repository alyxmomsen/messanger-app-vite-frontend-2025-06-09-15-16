import type React from "react";

const CommonWrapper = ({ children }: { children: React.ReactElement }) => {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {children}
        </div>
    );
};

export default CommonWrapper;
