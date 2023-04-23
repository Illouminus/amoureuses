import React, { useState } from 'react';
import axios from 'axios';
import cls from './CreateTasting.module.scss'
import {ButtonProfile} from "../../ButtonProfile/ButtonProfile";
import SnackBar from "../../SnackBar";

export const CreateTasting = ({handleTasting}) => {
    const BUCKET_URL= "https://les-amoureuses.s3.eu-west-3.amazonaws.com/"

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState({
        status: '',
        message:''
    })

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
            let dataForm = { ...formData }
            if (file) {
                let { data } = await axios.post("/api/tasting/upload-photo", {
                    name: file.name,
                    type: file.type,
                });
                console.log('dataIn', data)
                let url = data.url;
                let photoUrl = BUCKET_URL + file.name;
                dataForm = { ...formData, photo: photoUrl };
                let { data: newData } = await axios.put(url, file, {
                    headers: {
                        "Content-type": file.type,
                        "Access-Control-Allow-Origin": "*",
                    },
                });
            }


            const response = await axios.post('/api/tasting/add', dataForm);
            console.log(response.data);
            if (response.status === 200) {
                setStatus({
                    status: 'success',
                    message:'La degustation a bien été crée'
                })
                setFormData({
                    date: '',
                    title: '',
                    description: '',
                    price: '',
                    places: '',
                });
                setFile(null);
                setTimeout(() => {
                    handleTasting()
                }, 1000)

            }

        } catch (error) {
            setStatus({
                status: 'error',
                message:'Une erreur est survenue lors de la creation'
            })

        }
        setOpen(true)
    };

    return (
        <>
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
            <SnackBar open={open} status={status.status} message={status.message} handleClose={() => setOpen(false)}/>
        </>

    );
};

