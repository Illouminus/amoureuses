import Link from 'next/link'
import React from 'react'
import {  useDispatch } from 'react-redux';
import { logoutThunk } from '../store/user/actions'
import { signOut } from "next-auth/react"

const NavItem = ({ href, text, active }) => {
	const dispatch = useDispatch()

	const exitHandler = async () => {
		// dispatch(logoutThunk());
		const response = await signOut()
		console.log(response)
		localStorage.clear();
		console.log('EXIT')
	}

	return (
		<Link href={href} style={{ textDecoration: 'none', color: 'white', opacity: '0.8' }} className={`nav__link ${active ? 'active' : ''}`}
			onClick={() => text === 'Logout' && exitHandler()}>{text}</Link>
	)
}

export default NavItem
