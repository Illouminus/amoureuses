import React from "react";
import { Box, Avatar as MuiAvatar } from "@mui/material";
import { useDropzone } from "react-dropzone";

const Avatar = (props) => {


    const {
        src,
        onChange,
        onDrop,
        isModalAvatarOpen
    } = props;


    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    return (
        isModalAvatarOpen ? (
            <div>
                <div {...getRootProps()} style={{ border: "2px dashed #aaa", padding: "20px" }}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Déposez le fichier ici...</p>
                    ) : (
                        <p>Faites gliser la nouvelle photo</p>
                    )}
                </div>
            </div>
        ) : (
                <Box display="flex" flexDirection="column" alignItems="center">
                    <MuiAvatar src={src || "/icons/default-avatar.png"} alt="User Avatar" sx={{ width: 100, height: 100 }}/>
                    <input
                        accept="image/*"
                        type="file"
                        id="avatar"
                        name="avatar"
                        style={{ display: "none" }}
                        onChange={onChange}
                    />
                </Box>
            )

    );
};

export default Avatar;
