import axios from 'axios';
import React, { useState } from 'react';
import styles from '../styles/contact.module.css'
import Status from './Status';


export const ContactForm = () => {
	const [sendEmail, setSendEmail] = useState(false)
	const [statusEmail, setstatusEmail] = useState()
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		telephone: '',
		message: '',
	});

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await axios.post('/api/contact/sendMail', formData)
		if (response.data.status === true) {
			setstatusEmail(true)
		} else {
			setstatusEmail(false)
		}
		setSendEmail(true)
		setTimeout(() => {
			setSendEmail(false)
			setFormData({})
		}, 2000);

	};

	return !sendEmail ?
		<div className={styles.container_contact_form}>
			<form onSubmit={handleSubmit}>
				<div className={styles.row100}>
					<div className={styles.col}>
						<div className={styles.inputBox}>
							<input
								type="text"
								name="firstName"
								required="required"
								value={formData.firstName}
								onChange={handleChange}
							/>
							<span className={styles.text}>Nom</span>
							<span className={styles.line}></span>
						</div>
					</div>
					<div className={styles.col}>
						<div className={styles.inputBox}>
							<input
								type="text"
								name="lastName"
								required="required"
								value={formData.lastName}
								onChange={handleChange}
							/>
							<span className={styles.text}>Prenom</span>
							<span className={styles.line}></span>
						</div>
					</div>
				</div>
				<div className={styles.row100}>
					<div className={styles.col}>
						<div className={styles.inputBox}>
							<input
								type="email"
								name="email"
								required="required"
								value={formData.email}
								onChange={handleChange}
							/>
							<span className={styles.text}>Email</span>
							<span className={styles.line}></span>
						</div>
					</div>
					<div className={styles.col}>
						<div className={styles.inputBox}>
							<input
								type="text"
								name="telephone"
								required="required"
								value={formData.telephone}
								onChange={handleChange}
							/>
							<span className={styles.text}>Telephone</span>
							<span className={styles.line}></span>
						</div>
					</div>
				</div>
				<div className={styles.row100}>
					<div className={styles.col}>
						<div className={`${styles.inputBox} ${styles.textarea}`}>
							<textarea
								name="message"
								required="required"
								value={formData.message}
								onChange={handleChange}
							/>
							<span className={styles.text}>Ecrivez votre message</span>
							<span className={styles.line}></span>
						</div>
					</div>
				</div>
				<div className={styles.row100}>
					<div className={styles.col}>
						<input type="submit" value="Send" className={styles.inputSendForm} />
					</div>
				</div>
			</form>
		</div>
		: <Status status={statusEmail} />






};


