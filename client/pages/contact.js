import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Map from '../components/Map'
import ContactForm from '../components/ContactForm'
import styles from '../styles/contact.module.css'
const contact = () => {



	const styleCard = { backgroundColor: '#fff0' }
	return (
		<>
			<Navbar styleOther={styleCard} />
			<div className={styles.container_page}>
				<ContactForm />
				<div className={styles.container_map}>
					<Map />
				</div>
			</div>
		</>
	)
}

export default contact