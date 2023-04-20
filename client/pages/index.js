import Head from 'next/head'
import {MainPage} from "../components/MainPage/MainPage";


const Index = () => {

	return (
<>
	<Head>
		<title>Accueil</title>
		<meta name="description" content="La page principale. Voir la Carte. Note bar à vin"/>
		<meta name="keywords" content="Bar à vin, page principale, accueil"/>
		<meta charSet="utf-8"/>
	</Head>
	<MainPage />
</>

	)
}

export default Index
