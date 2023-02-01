import Navbar from '../components/Navbar'
import '../styles/global.css'
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { useEffect } from 'react';
import { dataSlicer } from '../store/user';




export default function MyApp({ Component, pageProps }) {
	useEffect(() => {
		const stored = localStorage.getItem('user')
		if (stored) {
			store.dispatch(dataSlicer.actions.checkInitLogin(true))
		}
	}, [])

	return (
		<>
			<Provider store={store}>
				<Component {...pageProps} />
			</Provider>
		</>
	)
}