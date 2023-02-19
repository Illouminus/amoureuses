import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import FullLogo from './FullLogo'
import Logo from './Logo'
import NavItem from './NavItem'
import { useSelector, useDispatch } from 'react-redux';
import {useSession} from "next-auth/react";


const Navbar = ({ styleOther }) => {
	const {status, data} = useSession()
	const [navActive, setNavActive] = useState(false)
	const [activateIdx, setActivateIdx] = useState(0)
	const login = status === "authenticated";
	const MENU_LIST = login ? [{ text: "Carte", href: '/carte' }, { text: "Contact", href: '/contact' }, { text: "Logout", href: '/', }] :
		[{ text: "Carte", href: '/carte' }, { text: "Contact", href: '/contact' }, { text: "Login", href: '/login' },]

	return (
		<header>
			<nav className='nav' style={styleOther}>
				<Link href={'/'} style={{ textDecoration: 'none' }} onClick={() => setActivateIdx(0)}><Logo /></Link>
				<div onClick={() => setNavActive(!navActive)} className='nav__menu-bar' >
					<div></div>
					<div></div>
					<div></div>
				</div>
				<Link href={'/'} style={{ textDecoration: 'none' }} onClick={() => setActivateIdx(0)}></Link>
				<div className={`${navActive ? 'active' : ""} nav__menu-list`} style={styleOther}>
					{MENU_LIST.map((menu, idx) => {
						return <div
							onClick={() => {
								setActivateIdx(idx)
								setNavActive(false)
							}}
							key={menu.text}>
							<NavItem active={activateIdx === idx} {...menu} />
						</div>
					})
					}
				</div>
			</nav>
		</header>
	)
}

export default Navbar
