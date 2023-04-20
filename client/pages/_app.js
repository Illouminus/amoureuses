import '../styles/global.css'
import { SessionProvider } from "next-auth/react"
import Router from "next/router"
import {useEffect, useState} from "react";
import {Loader} from "../components/Loader/Loader";
import Head from 'next/head'


export default function MyApp({ Component, pageProps }) {
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		const start = () => {
			setLoading(true)
		}
		const end = () => {
			setLoading(false);
		};
		Router.events.on("routeChangeStart", start);
		Router.events.on("routeChangeComplete", end);
		Router.events.on("routeChangeError", end);
		return () => {
			Router.events.off("routeChangeStart", start);
			Router.events.off("routeChangeComplete", end);
			Router.events.off("routeChangeError", end);
		};
	}, [])
	return (
		<>
		<Head>
			<title>Les Amoureuses bar à vin Paris</title>
			<meta name="description" content="le meilleur bar a vin de paris. Les Amoureuses. Bar à vin Les Amoureuses.
			 Bar à vin Paris. Dégustation de vin à Paris. Passer une soirée en amoureux. Soirée à Paris."/>
			<link rel="shortcut icon" href="/favicon.png" />
			<meta name="keywords" content="Bar à vin, achat vin, Les Amoureuses,  bar à vin les amoureuses, passer une soirée, degustation de vin, bar à vin Paris, bar Paris, belle soirée, evénement sur paris"/>
			<meta name="theme-color" content="##5e5b46" />
			<meta name="google-site-verification" content="lzPGZz3-s1GFv-EX0YmME6vvW0nLamrkyxM07hm_oQo" />

			<meta charSet="utf-8"/>
		</Head>
			{loading ? (
				<div className="center_loader">
					<Loader />
				</div>
			): (
				<SessionProvider session={pageProps.session}>
					<Component {...pageProps} />
					{/*<div style={{*/}
					{/*	display: "flex",*/}
					{/*	alignItems: "center",*/}
					{/*	justifyContent: "center",*/}
					{/*	width: "100vw",*/}
					{/*	height: "100vh",*/}
					{/*}}>*/}
					{/*	Site en cours de maintenance*/}
					{/*</div>*/}

				</SessionProvider>
			)}
		</>
	)
}
