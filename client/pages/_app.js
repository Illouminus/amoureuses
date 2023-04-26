import '../styles/global.css'
import { SessionProvider } from "next-auth/react"
import Router from "next/router"
import {useEffect, useState} from "react";
import 'react-quill/dist/quill.snow.css';
import {Loader} from "../components/Loader/Loader";
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';


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
			<title>Les Amoureuses - Bar à Vin à Paris pour une soirée inoubliable</title>
			<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
			<meta name="description" content="Découvrez Les Amoureuses, le meilleur bar à vin de Paris, pour passer une soirée en amoureux ou entre amis. Profitez d'une dégustation de vin et d'événements spéciaux dans un cadre chaleureux et convivial." />
			<link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png"/>
				<link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png"/>
					<link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png"/>
						<link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png"/>
							<link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png"/>
								<link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png"/>
									<link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png"/>
										<link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png"/>
											<link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png"/>
												<link rel="icon" type="image/png" sizes="192x192"  href="/favicon/android-icon-192x192.png"/>
													<link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png"/>
														<link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png"/>
															<link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png"/>
																<link rel="manifest" href="/favicon/manifest.json" />
																	<meta name="msapplication-TileColor" content="#ffffff" />
																		<meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
																			<meta name="theme-color" content="#ffffff" />
			<meta name="keywords" content="Bar à vin, Les Amoureuses, bar à vin Les Amoureuses, passer une soirée, dégustation de vin, bar à vin Paris, bar Paris, belle soirée, événement sur Paris, soirée en amoureux, cave à vin Paris" />
			<meta name="theme-color" content="rgba(1, 0, 0, 0.8)" />
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
				</SessionProvider>
			)}
			<Analytics />
		</>
	)
}
