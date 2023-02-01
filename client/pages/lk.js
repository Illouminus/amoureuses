import React from 'react'
import Navbar from '../components/Navbar'
const lk = () => {
	const styleCard = { backgroundColor: '#fff0' }
	return (
		<div>
			<Navbar styleOther={styleCard} />
			<button>Создать нового пользователя</button>
		</div>
	)
}

export default lk