import React from 'react'
import Navbar from '../components/Navbar'
import {useSession} from "next-auth/react";
import {MainNavbar} from "../components/Navbars/MainNavbar/MainNavbar";
import {MainPage} from "../components/MainPage/MainPage";

const lk = () => {
	const {status, data} = useSession()
	const session = useSession()
	console.log(session)
	const styleCard = { backgroundColor: '#fff0' }
	if (status === "authenticated") {
		return (
			<div>
				<Navbar styleOther={styleCard} />
				<button>Создать нового пользователя</button>
			</div>
		)
	} else {
		return (
				<>
					 <MainNavbar />
						<MainPage />
				</>

		)
	}


}

export default lk
