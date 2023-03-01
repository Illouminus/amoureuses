import '../styles/global.css'
import { SessionProvider } from "next-auth/react"
import Router from "next/router"
import {useEffect, useState} from "react";
import {Loader} from "../components/Loader";
import Layout from "../components/Layout";


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
			{loading ? (
				<div className="center_loader">
					<Loader />
				</div>
			): (
				<SessionProvider session={pageProps.session}>
					<Component {...pageProps} />
				</SessionProvider>
			)}
		</>
	)
}
