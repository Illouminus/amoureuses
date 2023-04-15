import React, { useState } from 'react';
import axios from 'axios';
import cls from './CreateTasting.module.scss'
import {ButtonProfile} from "../../ButtonProfile/ButtonProfile";

export const CreateTasting = ({handleTasting}) => {
    const [formData, setFormData] = useState({
        date: '',
        title: '',
        description: '',
        price: '',
        places: '',
        photo: '',
    });
    const [file, setFile] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let photoUrl = '';
            if (file) {
                const photoData = new FormData();
                photoData.append('photo', file);
                const photoResponse = await axios.post('/api/tasting/upload-photo', photoData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                photoUrl = photoResponse.data.photoUrl;
            }
            const data = { ...formData, photo: photoUrl };

            const response = await axios.post('/api/tasting/add', data);
            console.log(response.data);
            if (response.status === 200) {
                alert('Tasting created successfully');
                setFormData({
                    date: '',
                    title: '',
                    description: '',
                    price: '',
                    places: '',
                });
                setFile(null);
                handleTasting()
            }

        } catch (error) {
            alert('Error creating tasting: ' + error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cls.form}>
            <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder={"Date"}
                required
            />
            <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder={"Title"}
                required
            />
            <textarea
                id="description"
                name="description"
                value={formData.description}
                placeholder={"Description"}
                onChange={handleChange}
            />
            <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                placeholder={"Price"}
                onChange={handleChange}
            />
            <input
                type="number"
                id="places"
                name="places"
                placeholder={"Places"}
                value={formData.places}
                onChange={handleChange}
            />
            <div className={cls.file_input}>
                <label htmlFor="photo">Photo</label>
                <input
                    type="file"
                    id="photo"
                    name="photo"
                    accept="image/jpeg, image/png"
                    onChange={handleFileChange}
                    className={cls.file}
                />
            </div>

            <ButtonProfile type="submit" text={"Créer"} />
        </form>
    );
};
