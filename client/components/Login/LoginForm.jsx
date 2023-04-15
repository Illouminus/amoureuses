import React, {useState} from "react";
import {useRouter} from "next/router";
import {signIn} from "next-auth/react";
import SnackBar from "../SnackBar";
import cls from './LoginForm.module.scss'
import Image from "next/image";
import loginImg from '../../public/img/login_img.png'
import {ButtonProfile} from "../ButtonProfile/ButtonProfile";

export const LoginForm = () => {
    const [loginForm, setLoginForm] = useState({ login: '', password: '' })
    const [error, setError] = useState('')
    const [open, setOpen] = useState(false);

    const [statusLogin, setStatusLogin] = useState({
        status: '',
        message:''
    })

    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { login, password } = loginForm

        const response = await signIn('credentials', {
            login,
            password,
            redirect: false,
        })

        if (response.ok) {
            setStatusLogin({
                status: 'success',
                message: 'success login'
            })
            setOpen(true)
            setTimeout(() => {
                router.push('/')
            }, 500)
        } else {
            setStatusLogin({
                status: 'error',
                message: 'Wrong password or login'
            })
        }
        setOpen(true)
    }
    const handleInputChange = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    return (
        <>
            <div className={cls.container}>
                <img src={'/img/login_img.png'}/>
                <form onSubmit={handleSubmit} className={cls.form}>
                        <input type="text" name="login" onChange={handleInputChange} placeholder={"Identifiant"}/>
                        <input type="password" name="password" onChange={handleInputChange} placeholder={"Mot de passe"}/>
                    {error && <div>{error}</div>}
                    <ButtonProfile type="submit" text={"Connexion"} />
                </form>
            </div>

            <SnackBar open={open} status={statusLogin.status}  message={statusLogin.message}/>
        </>


    )
}
