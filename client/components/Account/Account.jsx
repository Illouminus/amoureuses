import React, { useState} from "react";
import AccountInfo from "./AccountInfo";
import Avatar from "./Avatar";
import ChangePassword from "./ChangePassword";
import { styled } from "@mui/system";
import axios from "axios";
import ModalWindow from "../ModalWindow";
import cls from './Account.module.scss'
import {ButtonProfile} from "../ButtonProfile/ButtonProfile";
import UploadPDF from "../UploadPDF/UploadPDF";
import {CreateTasting} from "../Degustation/CreateTasting/CreateTasting";
import {ArticleForm} from "../Blog/CreateArticle/ArticleFrom";



const Account = ({ session, updateSession }) => {

    const BUCKET_URL= "https://les-amoureuses.s3.eu-west-3.amazonaws.com/"

    // STATE IF THE BUTTON EDIT IS ACTIVE
    const [isEditable, setIsEditable] = useState(false);
    // STATES MODAL STATUS PASSWORD && AVATAR
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAvatarOpen, setIsModalAvatarOpen] = useState(false);
    const [isModalTastingOpen, setIsModalTastingOpen] = useState(false);
    const [isModalArticleOpen, setIsModalArticleOpen] = useState(false);
    const [isPasswordChanging, setIsPasswordChanging] = useState(false)
    //STATES CHANGE NAME USER
    const [firstName, setFirstName] = useState(session.firstName);
    const [lastName, setLastName] = useState(session.lastName);

    // STATE FOR UPLOAD AVATAR
    const [uploadStatus, setUploadStatus] = useState("");

    //HANDLERS FOR CHANGE NAME
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
    const handleSubmit = async () => {
       await handleInfoSubmit({ firstName, lastName });
    };

    const handleTasting = () => {
        setIsModalTastingOpen(false)
    }
    //HANDLE FOR CHANGE STATE IF THE BUTTON EDIT IS ACTIVE
    const handleEditClick = () => {
        setIsEditable(!isEditable);
    };


    // HANDLER FOR CHANGE USER INFO - LOGIC BACKEND
    const handleInfoSubmit = async (updatedInfo) => {
        try {
            if (!session.sub) {
                throw new Error("Not authenticated");
            }
            const response = await axios.put(`/api/users/${session.sub}`, updatedInfo)
            if (response.status === 200) {
                const updatedUser = {
                    login: session.login,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    avatar: session.avatar,
                    sub: session.sub,
                };

                updateSession(updatedUser)

            } else {
                throw new Error("Error updating user data");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    // HANDLER FOR CHANGE USER AVATAR - LOGIC BACKEND
    const handleAvatarChange = async (acceptedFiles) => {

        let url = ''
        let urlBD = ''
        console.log(acceptedFiles)
        try {
            let { data } = await axios.post("/api/tasting/upload-photo", {
                name: acceptedFiles[0].name,
                type: acceptedFiles[0].type,
            });
            url = data.url
            urlBD = BUCKET_URL + acceptedFiles[0].name

            let { data: newData } = await axios.put(url, acceptedFiles[0], {
                headers: {
                    "Content-type": acceptedFiles[0].type,
                    "Access-Control-Allow-Origin": "*",
                },
            });


            const response = await axios.post(`/api/users/${session.sub}/avatar`, {url: urlBD});
            if (response.status === 200) {
                console.log(response.data)
                updateSession({
                    login: session.login,
                    firstName: session.firstName,
                    lastName: session.lastName,
                    avatar: response.data.avatarUrl,
                    sub: session.sub,

                })
                setUploadStatus("File uploaded successfully");
            }

        } catch (error) {
            console.log(error)
            setUploadStatus("Error uploading file");
        }
    };

    // HANDLER FOR CHANGE USER PASSWORD - LOGIC BACKEND
    const handleChangePassword = async (oldPassword, newPassword) => {
        try {
            const response = await axios.put(`/api/users/${session.sub}/password`, { oldPassword, newPassword});
            if (response.status === 200) {
                setIsPasswordChanging(true)
                setTimeout(() => {
                    setIsModalOpen(false)
                    setIsEditable(false)
                    setIsPasswordChanging(false)
                }, 500)
            } else {
                alert('Wrong old password')
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };


    return (
        <div className={cls.container}>
            { isModalOpen &&(
                <ModalWindow onClose={() => setIsModalOpen(false)}>
                    <ChangePassword handleChangePassword={handleChangePassword} isPasswordChanging={isPasswordChanging}/>
                </ModalWindow>
            )}
            { isModalArticleOpen &&(
                <ModalWindow onClose={() => setIsModalArticleOpen(false)}>
                    <ArticleForm />
                </ModalWindow>
            )}
            { isModalTastingOpen &&(
                <ModalWindow onClose={() => setIsModalTastingOpen(false)}>
                    <CreateTasting handleTasting={handleTasting} />
                </ModalWindow>
            )}
            { isModalAvatarOpen &&(
                <ModalWindow onClose={() => setIsModalAvatarOpen(false)}>
                    <Avatar
                        src={session.avatar}
                        onChange={isEditable ? handleAvatarChange : null}
                        isEditable={isEditable}
                        onDrop={handleAvatarChange}
                        isModalAvatarOpen={isModalAvatarOpen}
                    />
                </ModalWindow>
            )}

            <div className={cls.containerProfile}>
                <Avatar src={session.avatar} onChange={isEditable ? handleAvatarChange : null} isEditable={isEditable}/>
                {
                    isEditable &&
                    <ButtonProfile onClick={() => setIsModalAvatarOpen(true)} text={"Changer d'avatar"} />
                }
                <AccountInfo
                    user={session}
                    isEditable={isEditable}
                    firstName={firstName}
                    lastName={lastName}
                    handleFirstNameChange={handleFirstNameChange}
                    handleLastNameChange={handleLastNameChange}
                />

                <ButtonProfile variant="contained" color="primary" onClick={handleEditClick}  text={`${isEditable ? "Annuler" : "Modifier"}`} />

                {isEditable && <ButtonProfile variant="contained" color="primary" onClick={handleSubmit} text={"Enregistrer"}/> }
            </div>
            <div className={cls.containerUtils}>
                <UploadPDF />
                <ButtonProfile onClick={() => setIsModalTastingOpen(true)} text={"Ajoutez une dégustation"} width={'300px'}/>
                <ButtonProfile onClick={() => setIsModalArticleOpen(true)} text={"Ajoutez un article"} width={'300px'}/>
                {
                    isEditable &&
                    <>
                        <ButtonProfile onClick={() => setIsModalOpen(true)} text={"Changer le mot de passe"} width={'300px'}/>
                    </>

                }
            </div>

        </div>

    );
};

export default Account;
