import React from 'react'
import cls from './ButtonProfile.module.scss'
export const ButtonProfile = ({text, onClick, width, marginTop}) => {

    return (
        <button className={cls.button} onClick={onClick} style={{
            width: width,
            marginTop: marginTop,
        }}>{text}</button>
    )
}


