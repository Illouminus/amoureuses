import React, { useState, useEffect } from 'react';
import cls from './MainPage.module.scss';

export const MainPageBackground = () => {

    const images = [
        '/img/carousel/01.jpg',
        '/img/carousel/02.jpg',
        '/img/carousel/03.jpg',
        '/img/carousel/04.jpg',
        '/img/carousel/05.jpg',
        '/img/carousel/06.jpg',
        '/img/carousel/08.jpg',
        // Add more image paths as needed
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);


    useEffect(() => {
        const changeImage = () => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        };

        changeImage();

        const timer = setInterval(() => {
            changeImage()

        }, 300000); // Change image every 5 minutes

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div className={cls.divBackground}>
            {images.map((image, index) => (
                <div
                    key={image}
                    className={`${cls.backgroundImage} ${index === currentImageIndex ? cls.active : ''} `}
                    style={index === currentImageIndex ? { animation: 'fadeInOut 10s linear' } : {}}
                >
                    <img src={image} alt={`Background image ${index + 1}`} className={cls.backgroundImageImg} />
                </div>
            ))}
        </div>
    );
};
