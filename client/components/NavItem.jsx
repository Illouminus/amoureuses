import Link from 'next/link'
import React, {useState} from 'react'
import { signOut } from "next-auth/react"

const NavItem = ({ href, text, active }) => {
	const exitHandler = async () => {
		const response = await signOut()
	}

	return (
		<Link href={href} style={{ textDecoration: 'none', color: 'white', opacity: '0.8' }} className={`nav__link ${active ? 'active' : ''}`}
			onClick={() => {
				text === 'Logout' && exitHandler()
			}}>{text}</Link>
	)
}

export default NavItem
