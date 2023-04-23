import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

const ChangePassword = ({ handleChangePassword }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        handleChangePassword(oldPassword, newPassword);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Box mb={2}>
                    <TextField
                        label="Ancien mot de passe"
                        type="password"
                        fullWidth
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                    />
                </Box>
                <Box mb={2}>
                    <TextField
                        label="Nouveau mot de passe"
                        type="password"
                        fullWidth
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </Box>
                <Button variant="contained" color="primary" type="submit">
                    Changer le mot de passe
                </Button>
            </form>
        </div>
    );
};

export default ChangePassword;
