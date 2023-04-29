import React, { useState, useEffect } from 'react';

import Image from 'next/image'
import cls from './MainPage.module.scss';
import {Loader} from "../Loader/Loader";

export const MainPageBackground = ({onImageLoad, loading}) => {

    const handleImageLoad = () => {
        onImageLoad();
    };
    return (
        <div className={cls.divBackground}>
            {loading && (
                <div className={cls.spinnerContainer}>
                    <Loader />
                </div>
            )}

            <div
                style={{
                    backgroundImage: loading ? 'none' : `url('/img/carousel/03.jpg')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    width: '100%',
                    height: '100%',
                    opacity: loading ? 0 : 1,
                    transition: 'opacity 0.5s',
                }}>
                <Image
                    src="/img/carousel/03.jpg"
                    alt="Main page background"
                    fill={true}
                    onLoad={handleImageLoad}
                    className={cls.hiddenImage}
                />
            </div>
        </div>
    );
};
