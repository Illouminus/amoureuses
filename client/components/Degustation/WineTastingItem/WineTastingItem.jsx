import React from 'react';
import cls from './WineTastingItem.module.scss'
import {formatDateToFrench} from "../../../utils/FormatingData";

export const WineTastingItem = ({ wineTasting }) => {
    const { date, title, description, photo, price, places } = wineTasting;


    return (
        <div className={cls.containerDate}>
            <div>{formatDateToFrench(date)}</div>
            <div className={cls.container}>
                <div className={cls.descriptionConatainer}>
                    <div className={cls.title}>{title}</div>
                    <div className={cls.description}>{description}</div>
                    <div className={cls.priceContainer}>
                        <div>Prix : {price} €</div>
                        <div>Places : {places}</div>
                    </div>
                </div>
                <div className={cls.imageContainer}>
                    <img
                        src={photo}
                        alt={`Photo of ${title}`}
                    />
                </div>

            </div>
        </div>

    );
};


