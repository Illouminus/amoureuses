import React, {useState} from 'react'
import {  useSession } from "next-auth/react"

import {LoginForm} from "../components/Login/LoginForm";
import {MainFooter} from "../components/Footers/MainFooter/MainFooter";
import {MainNavbar} from "../components/Navbars/MainNavbar/MainNavbar";
import {Loader} from "../components/Loader/Loader";

const Login = () => {
	const { data: session } = useSession()
	const [active, setActive] = useState(false);

	return (
		<>
		<div>
			{session ? (
					<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100vh", flexDirection: 'column'}}>
						<Loader />
						<p>Déjà connecte</p>
					</div>

			) : (
				<>
					<MainNavbar active={active} setActive={setActive} />
					<LoginForm />
					<MainFooter />
				</>

			)}
		</div>

		</>
	)
}

export default Login
