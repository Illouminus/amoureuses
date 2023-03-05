import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Map from '../components/Map'
import {ContactForm} from '../components/ContactForm'
import styles from '../styles/contact.module.css'
import Head from "next/head";
const contact = () => {



	const styleCard = { backgroundColor: '#fff0' }
	return (
		<>
			<Head>
				<title>Contact</title>
				<meta name="keywords" content="vin, bar, soiree, drinks, drink, night, vine"/>
				<meta name="description" content="this is a website of the vine bar"/>
				<meta charSet="utf-8"/>
			</Head>
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
