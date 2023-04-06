import React, {useState} from 'react'
import Navbar from '../components/Navbar'
import {useSession} from "next-auth/react";
import {MainNavbar} from "../components/Navbars/MainNavbar/MainNavbar";
import {MainFooter} from "../components/Footers/MainFooter/MainFooter";



const lk = () => {
	const {status, data} = useSession()
	const session = useSession()
	const [active, setActive] = useState(false)
	const styleCard = { backgroundColor: '#fff0' }
	if (status === "authenticated") {
		return (
			<div>
				<MainNavbar active={active} setActive={setActive}/>
				<MainFooter />
			</div>
		)
	} else {
		return (
				<>
					''
				</>

		)
	}


}

export default lk
