import Link from 'next/link'
import React, {useState} from 'react'
import { signOut } from "next-auth/react"
import {useRouter} from "next/router";
import { isMobile } from "react-device-detect";

const NavItem = ({ href, text }) => {
	const [active, setActive] = useState(false)
	const router = useRouter();
	const exitHandler = async () => {
		await signOut({redirect: false});
		await router.push('/')
	}


	const handleCarteClick = async () => {
		if (isMobile) {
			window.open("https://les-amoureuses.s3.eu-west-3.amazonaws.com/menu.pdf", "_blank");
		} else {
			await router.push("/carte");
		}
	};

	const handleNavItemClick = async (e) => {
		setActive(true);
		console.log(text);
		if (text === "Déconnexion") {
			e.preventDefault()
			await exitHandler();
		} else if (text === "Carte") {
			e.preventDefault()
			await handleCarteClick();
		} else {
			e.preventDefault()
			await router.push(href);
		}
	};

	return (
		<Link
			href={href} style={{ textDecoration: 'none' }}
			className={`${active ? 'active' : ''} nav__link`}
			onClick={handleNavItemClick}>
			{text}
		</Link>
	)
}

export default NavItem
