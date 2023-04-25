import React from "react";
import {  TextField } from "@mui/material";
import cls from './Account.module.scss'
const AccountInfo = ({ user, isEditable, onSubmit, firstName, handleFirstNameChange, lastName, handleLastNameChange }) => {


    return (
        <div className={cls.containerAccountInfo}>
            <TextField
                label="Login"
                value={user.login}
                variant="outlined"
                margin="normal"
                disabled={true}
            />
            <TextField
                label="Nom"
                value={firstName}
                onChange={handleFirstNameChange}
                variant="outlined"
                margin="normal"
                InputProps={{ readOnly: !isEditable }}
            />
            <TextField
                label="Prénom"
                value={lastName}
                onChange={handleLastNameChange}
                variant="outlined"
                margin="normal"
                InputProps={{ readOnly: !isEditable }}
            />
        </div>
    );
};

export default AccountInfo;
