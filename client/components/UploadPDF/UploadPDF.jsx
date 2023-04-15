import React, { useCallback, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import cls from './UploadPDF.module.scss'
const UploadPDF = () => {
    const [uploadStatus, setUploadStatus] = useState("");

    const onDrop = useCallback(async (acceptedFiles) => {
        try {
            const formData = new FormData();

            formData.append("file", acceptedFiles[0]);
            console.log(formData)
            const response = await axios.post("/api/carte/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setUploadStatus("File uploaded successfully");
        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus("Error uploading file");
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });



    return (
        <div>
            <div>
                <div {...getRootProps()} style={{ border: "2px dashed #aaa", padding: "20px" }}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className={cls.dragActiveParagraph}>Déposez le fichier ici...</p>
                    ) : (
                        <p className={cls.dragActiveParagraph}>Faites gliser la nouvelle carte</p>
                    )}
                </div>
            </div>

            {uploadStatus && <p>{uploadStatus}</p>}
        </div>
    );
};

export default UploadPDF;
