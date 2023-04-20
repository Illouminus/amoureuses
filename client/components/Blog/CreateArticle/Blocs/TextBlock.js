import React from "react";
import cls from './Blocks.module.scss'
export const TextBlock = ({ content, onChange }) => {
    return (
         <textarea
          value={content}
          onChange={e => onChange(e.target.value)}
          placeholder="Введите текст"
          className={cls.textarea}
      />

    );
};
