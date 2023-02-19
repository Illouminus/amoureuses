import React from 'react'
import Image from 'next/image'
import logoMiddle from '../public/img/FullLogo.png'
const FullLogo = () => {
	return (
		<div className='reporty__logo-middle-size'>
			<Image
				src={logoMiddle}
				alt="Logotip of the web-site"
				width="40px"
				height="40px"
				priority="high"
			/>
		</div>

	)
}

export default FullLogo
