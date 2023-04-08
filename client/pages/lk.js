import React, {useState} from 'react'
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
					<div>

							<title>PDF Viewer</title>
							<div>PAPAP</div>
						<embed src="/carte/Carte.pdf" width="100%" height="800px" type="application/pdf" />
					</div>

				</>

		)
	}

}

export default lk
