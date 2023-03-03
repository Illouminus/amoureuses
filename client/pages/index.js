import Head from 'next/head'
import {MainPage} from "../components/MainPage/MainPage";


const Index = () => {
	return (
		<>
			<Head>
				<title>Les Amoureuses</title>
				<meta name="keywords" content="vin, bar, soiree, drinks, drink, night, vine"/>
				<meta name="description" content="le meilleur bar a vin de paris"/>
				<meta charSet="utf-8"/>
			</Head>
			<MainPage />
		</>
	)
}

export default Index;
