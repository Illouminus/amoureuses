import Head from 'next/head'
import {MainPage} from "../components/MainPage/MainPage";


const Index = () => {
	return (
		<>
			<Head>
				<title>Les Amoureuses</title>
				<meta name="keywords" content="vin, bar, soiree, drinks, drink, night, vine"/>
				<meta name="google-site-verification" content="lzPGZz3-s1GFv-EX0YmME6vvW0nLamrkyxM07hm_oQo" />
				<meta name="description" content="le meilleur bar a vin de paris"/>
				<meta charSet="utf-8"/>
			</Head>
			<MainPage />
		</>
	)
}

export default Index
