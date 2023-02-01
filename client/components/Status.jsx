import React from 'react'
import styles from '../styles/contact.module.css'
const Status = (status) => {
	return (
		<div className={styles.container_status}>
			{status ?
				<div className={styles.status_contactForm}>
					<h2>Merci, votre message a bien été envoyé</h2>
				</div>
				: <div>
					<h2>Un problème est survenu lors de l'envoi d'un e-mail à ce contact</h2>
				</div>
			}
		</div>

	)
}

export default Status