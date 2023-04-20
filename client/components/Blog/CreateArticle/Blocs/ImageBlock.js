import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import cls from './Blocks.module.scss';

export const ImageBlock = ({ src, onDrop, alt, onAltChange }) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: async (acceptedFiles) => {
            await onDrop(acceptedFiles);
        },
    });

    // Отображаем изображение, если оно доступно
    const imagePreview = src ? (
        <div className={cls.image}>
            <img src={src} alt="Uploaded" style={{ maxWidth: "100%" }} />
        </div>
    ) : null;

    const uploadField = (
        <div
            {...getRootProps()}
            style={{ border: "1px dashed #aaa", padding: "20px" }}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Déposez le fichier ici...</p>
            ) : (
                <p>Faites gliser la nouvelle photo</p>
            )}
        </div>
    );

    return (
    <div>
        {src ? imagePreview : uploadField}
        {src && (
            <input
                type="text"
                className={cls.altInput}
                value={alt}
                placeholder="Введите описание (alt) для изображения"
                onChange={(e) => onAltChange(e.target.value)}
            />
        )}
    </div>
    )

};
