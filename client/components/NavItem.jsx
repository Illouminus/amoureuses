import Link from 'next/link'
import React, {useState} from 'react'
import { signOut } from "next-auth/react"

const NavItem = ({ href, text }) => {
	const [active, setActive] = useState(false)
	const exitHandler = async () => {
		await signOut({ callbackUrl: '/' });
	}

	return (
		<Link href={href} style={{ textDecoration: 'none',  }} className={`${active ? 'active' : ''} nav__link`}
			onClick={() => {
				setActive(true)
				console.log(text)
				text === 'Déconnexion' && exitHandler()
			}}>
			{text}
		</Link>
	)
}

export default NavItem
