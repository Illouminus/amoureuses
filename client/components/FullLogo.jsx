import React from 'react'
import Image from 'next/image'
import logoMiddle from '../public/img/FullLogo.png'
const FullLogo = () => {
	return (
		<div className='reporty__logo-middle-size'>
			<Image
				src={logoMiddle}
				alt="Logotip of the web-site"
				width="100%"
				height="100%"
				layout='responsive'
			/>
		</div>

	)
}

export default FullLogo