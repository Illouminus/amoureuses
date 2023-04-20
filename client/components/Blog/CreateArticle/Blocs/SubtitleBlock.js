import React from "react";
import cls from './Blocks.module.scss'
export const SubtitleBlock = ({ content, onChange }) => {
    return (

            <h2
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onChange(e.currentTarget.textContent)}
                placeholder="Введите текст подзаголовка"
                className={cls.h2}
            >
                {content}
            </h2>

    );
};


