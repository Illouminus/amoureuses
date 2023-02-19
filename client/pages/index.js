
import styles from '../styles/index.module.css'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import Head from 'next/head'


const Index = () => {
	const styleCard = { backgroundColor: 'inherit' }
	return (
		<>
			<Head>
				<title>Les Amoureuses</title>
				<meta name="keywords" content="vin, bar, soiree, drinks, drink, night, vine"/>
				<meta name="description" content="this is a website of the vine bar"/>
				<meta charSet="utf-8"/>
			</Head>
			<div style={{
				backgroundImage: `url('/img/carousel/03.jpg')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				width: '100vw',
				height: '100vh',
			}}>
				<Navbar styleMain={styleCard}/>
				<Link href={'/'} className={styles.href}>
					<span></span>
					<span></span>
					<span></span>
					<span></span>
					Contact

				</Link>


			</div>

		</>
	)

}

export default Index;
