import React, { useState, useEffect } from 'react';
import cls from './MainPage.module.scss';

export const MainPageBackground = () => {


    return (
        <div className={cls.divBackground}>
            <div style={{
                backgroundImage: `url('/img/carousel/03.jpg')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100%',
                height: '100%',
            }} />
        </div>
    );
};
