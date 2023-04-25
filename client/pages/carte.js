import React, { useState} from 'react'
import Head from "next/head";
import {MainNavbar} from "../components/Navbars/MainNavbar/MainNavbar";
import {Carte} from "../components/CartePDF/Carte";
import {MainFooter} from "../components/Footers/MainFooter/MainFooter";

const carte = () => {

	// Get login status from next-auth
	const [active, setActive] = useState(false)

	return (
		<div>
			<Head>
				<title>La carte des vins chez Les Amoureuses - Découvrez notre sélection</title>
				<meta name="description" content="Explorez la carte des vins chez Les Amoureuses, un bar à vin à Paris proposant une sélection soignée de vins français et internationaux pour accompagner vos repas et dégustations." />
				<meta name="keywords" content="Les Amoureuses, carte des vins, bar à vin Paris, sélection de vins, vins français, vins internationaux, dégustation de vin, cave à vin, vin rouge, vin blanc, vin rosé, champagne" />
			</Head>
			<MainNavbar  active={active} setActive={setActive}/>
			<Carte  />
			<MainFooter />

		</div>
	)
}

export default carte


