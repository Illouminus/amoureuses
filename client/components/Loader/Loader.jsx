import React from 'react'

import backLoader from '../../public/img/loader.png'
import Image from "next/image";
import cls from './Loader.module.scss'
export const Loader = () => {
    return (
        <div className={cls.loader}>
            <Image src={backLoader} alt={backLoader} />
        </div>
    )
}


