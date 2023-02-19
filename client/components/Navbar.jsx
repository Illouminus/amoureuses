import Link from 'next/link'
import React from 'react'
import { useState } from 'react'
import FullLogo from './FullLogo'
import Logo from './Logo'
import NavItem from './NavItem'
import {useSession} from "next-auth/react";


const Navbar = ({ styleOther, styleMain}) => {
	const [styleIn, setStyleIn] = useState(styleMain)
	const {status, data} = useSession()
	const [navActive, setNavActive] = useState(false)
	const [activateIdx, setActivateIdx] = useState(0)


	//List of menu item
	const login = status === "authenticated";
	const MENU_LIST = login ? [{ text: "Carte", href: '/carte' }, { text: "Contact", href: '/contact' }, { text: "Logout", href: '/', }] :
		[{ text: "Carte", href: '/carte' }, { text: "Contact", href: '/contact' }, { text: "Login", href: '/login' },]

	return (
		<header className={`${styleIn ? 'active_header' : "active_not_header"}`} >
			<nav className='nav' style={styleOther}>
				<Link href={'/'} style={{ textDecoration: 'none' }} onClick={() => setActivateIdx(0)}><Logo /></Link>
				<div onClick={() => setNavActive(!navActive)}  className={`${navActive ? 'active_burger' : ""} nav__menu-bar`}>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<Link href={'/'} style={{ textDecoration: 'none' }} onClick={() => setActivateIdx(0)}><div className='nav__logo-middle'><FullLogo /></div></Link>
				<div className={`${navActive ? 'active' : ""} nav__menu-list ${styleIn ? 'active_main' : "active_rest"}`} >
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
