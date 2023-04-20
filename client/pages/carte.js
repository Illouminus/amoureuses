import React, {useEffect, useState} from 'react'
import {useSession} from "next-auth/react";
import axios from "axios";
import Head from "next/head";
import {MainNavbar} from "../components/Navbars/MainNavbar/MainNavbar";
import {Carte} from "../components/CartePDF/Carte";
import {MainFooter} from "../components/Footers/MainFooter/MainFooter";

const carte = () => {

	// Get login status from next-auth
	const {status, data} = useSession()
	const [active, setActive] = useState(false)

	return (
		<div>
			<Head>
				<title>Carte</title>
				<meta name="description" content="C'est notre carte de vins"/>
				<meta name="keywords" content="Carte à vin, liste de vins, vin"/>
				<meta charSet="utf-8"/>
			</Head>
			<MainNavbar  active={active} setActive={setActive}/>
			<Carte  />
			<MainFooter />

		</div>
	)
}

export default carte


