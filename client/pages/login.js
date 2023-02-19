import React, { useState } from 'react'
import {useRouter} from 'next/router'
import {signIn, useSession} from "next-auth/react"
import styles from '../styles/login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faLock } from '@fortawesome/free-solid-svg-icons'
import SnackBar from '../components/SnackBar'
import withAuth from '../components/Auth';



const login = () => {
	// MODAL HAND
	const [open, setOpen] = useState(false);
	const [statusLogin, setStatusLogin] = useState('')
	const {status, data} = useSession()
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};
	const router = useRouter()

	const [loginForm, setloginForm] = useState({ login: '', password: '' })
	const handleSubmit = async (e) => {
		e.preventDefault()
		const response = await signIn('credentials', {
			login: loginForm.login,
			password: loginForm.password,
			redirect: false
		})

		if (response.ok === true) {
			setStatusLogin('success')
			setTimeout(() => {
				router.push('/')
			}, 500)
		} else {
			setStatusLogin('error')
		}
		setOpen(true)
	}



	const styleCard = { backgroundColor: '#fff0' }
	return (
		<>
			<Navbar styleOther={styleCard} />
			<div className={styles.global}>
				<div className={styles.container}>
					<div className={styles.box}>
						<div className={styles.shadow}></div>
						<div className={styles.content}>
							<form className={styles.form} onSubmit={handleSubmit}>
								<h3 className={styles.logo}>
									<FontAwesomeIcon icon={faKey} />
								</h3>
								<h2>Sign in</h2>
								<div className={styles.inputBox}>
									<input type='text' required onChange={(e) => setloginForm({ ...loginForm, login: e.target.value })} />
									<i><FontAwesomeIcon icon={faUser} /></i>
									<span>Username</span>
								</div>
								<div className={styles.inputBox}>
									<input type='password' required onChange={(e) => setloginForm({ ...loginForm, password: e.target.value })} />
									<i><FontAwesomeIcon icon={faLock} /></i>
									<span>Password</span>
								</div>
								<div className={styles.inputBox}>
									<input type='submit' value="Login" style={{
										backgroundColor: "#444",
										color: "#fff",
										cursor: "pointer",
									}} onClick={handleSubmit} />
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<SnackBar open={open} status={statusLogin} handleClose={handleClose} />
		</>
	)
}

export default login
