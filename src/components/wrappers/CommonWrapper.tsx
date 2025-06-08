import type React from "react";

const CommonWrapper = ({ children }: { children: React.ReactElement }) => {
    return <div>{children}</div>;
};

export default CommonWrapper;
