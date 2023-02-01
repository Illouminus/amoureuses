import React, { useState } from 'react'
import Router from "next/router";
import styles from '../styles/login.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { getLogin } from '../store/user/actions'
import Navbar from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faKey, faLock } from '@fortawesome/free-solid-svg-icons'
import SnackBar from '../components/SnackBar'
import withAuth from '../components/Auth';


const login = () => {

	// MODAL HAND 
	const [open, setOpen] = useState(false);
	const [statusLogin, setStatusLogin] = useState('')
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}
		setOpen(false);
	};

	const dispatch = useDispatch();
	const [loginForm, setloginForm] = useState({ login: '', password: '' })
	const handleSubmit = async (e) => {
		e.preventDefault()
		const result = await dispatch(getLogin(loginForm))
		console.log('RETURN FROM DISPATCH', result.payload.status);
		if (result.payload.status === true) {
			setStatusLogin('success')
		} else {
			setStatusLogin('error')
		}
		setOpen(true)
	}

	const login = useSelector((state) => state.user.login);

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

export default withAuth(login)