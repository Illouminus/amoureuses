import '../styles/global.css'
import { Provider } from 'react-redux';
import { store } from '../store/index';
import { useEffect } from 'react';
import { dataSlicer } from '../store/user';
import { SessionProvider } from "next-auth/react"




export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<Provider store={store}>
				<SessionProvider session={pageProps.session}>
				<Component {...pageProps} />
				</SessionProvider>
			</Provider>
		</>
	)
}
