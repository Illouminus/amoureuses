import React from "react";
import cls from "./Blocks.module.scss";

export const AltBlock = ({ content, onChange }) => {
    return (
        <div className={cls.altBlock}>
            <label htmlFor="alt-text">La description:</label>
            <input
                type="text"
                id="alt-text"
                value={content}
                onChange={(e) => onChange(e.target.value)}
                width={"400px"}
            />
        </div>
    );
};
