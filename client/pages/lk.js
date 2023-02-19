import React from 'react'
import Navbar from '../components/Navbar'
import {useSession} from "next-auth/react";

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
			<div>
				<Navbar styleOther={styleCard} />
				 <div>Не для тебя розочка растилась</div>
			</div>
		)
	}


}

export default lk
