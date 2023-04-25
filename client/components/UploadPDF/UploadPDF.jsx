import React, { useCallback, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import cls from './UploadPDF.module.scss'
const UploadPDF = () => {
    const BUCKET_URL= "https://les-amoureuses.s3.eu-west-3.amazonaws.com/"
    const [uploadStatus, setUploadStatus] = useState("");
    const [uploadedFile, setUploadedFile] = useState();
    const onDrop = useCallback(async (acceptedFiles) => {
        let { data } = await axios.post("/api/carte/uploadAws", {
            name: acceptedFiles[0].name,
            type: acceptedFiles[0].type,
        });
        const url = data.url;

        let { data: newData } = await axios.put(url, acceptedFiles[0], {
            headers: {
                "Content-type": acceptedFiles[0].type,
                "Access-Control-Allow-Origin": "*",
            },
        });

        setUploadedFile(BUCKET_URL + acceptedFiles[0].name);

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
