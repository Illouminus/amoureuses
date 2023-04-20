import React from 'react';
import cls from './Blocks.module.scss'
export const TitleBlock = ({ content, onChange }) => {
    return (

            <h1
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) => onChange(e.currentTarget.textContent)}
                placeholder="Введите текст заголовка"
                className={cls.h1}

            >
                {content}
            </h1>

    );
};


