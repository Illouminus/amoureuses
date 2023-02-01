
import styles from '../styles/index.module.css'
import Navbar from '../components/Navbar'
import Link from 'next/link'


const Index = () => {
	return (
		<>
			<div style={{
				backgroundImage: `url('/img/carousel/03.jpg')`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				width: '100vw',
				height: '100vh',
			}}>
				<Navbar />
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