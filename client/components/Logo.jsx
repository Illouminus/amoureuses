import React from 'react'
import Image from 'next/image'
import logo from '../public/img/logo.png'
const Logo = () => {
	return (
		<div className='reporty__logo-size'>
			<Image
				src={logo}
				alt="Logotip of the web-site"
				width="100%"
				height="100%"
				priority="high"
			/>
		</div>

	)
}

export default Logo