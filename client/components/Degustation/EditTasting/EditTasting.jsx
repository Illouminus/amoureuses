import React, {useEffect, useState} from 'react';
import axios from "axios";
import cls from './EditTasting.module.scss'
import {formatDateForInput} from "../../../utils/FormatingData";
import {ButtonProfile} from "../../ButtonProfile/ButtonProfile";
export const EditTasting = ({ tasting, onTastingUpdate,  }) => {
    const [formData, setFormData] = useState({ ...tasting });

    useEffect(() => {
        setFormData({ ...tasting });
    }, [tasting]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.put("/api/tasting/update", formData);
        const updatedTasting = response.data;
        onTastingUpdate(updatedTasting);
    };

    return (
        <form onSubmit={handleSubmit} className={cls.editForm}>
            <label htmlFor="date">Date:</label>
            <input
                type="datetime-local"
                id="date"
                name="date"
                value={formatDateForInput(formData.date)}
                onChange={handleChange}
                required
            />

            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />

            <label htmlFor="description">Description:</label>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
            />

            <label htmlFor="price">Price:</label>
            <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
            />

            <label htmlFor="places">Places:</label>
            <input
                type="number"
                id="places"
                name="places"
                value={formData.places}
                onChange={handleChange}
                placeholder={'places'}
            />
            <ButtonProfile type="submit" text={"Réactualiser"} />
        </form>
    );
};

