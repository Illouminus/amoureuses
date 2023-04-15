import React, { useState} from 'react';
import { useSession } from 'next-auth/react';
import { MainNavbar } from '../components/Navbars/MainNavbar/MainNavbar';
import { MainFooter } from '../components/Footers/MainFooter/MainFooter';
import Account from '../components/Account/Account';
import {Loader} from "../components/Loader/Loader";
import cls from '../styles/lk.module.scss'



const lk = () => {
	const { data:session, status, update } = useSession();
	const [active, setActive] = useState(false);

	const updateSession = async (obj) => {
		await update(obj)
	}


	if (status === 'loading') {
		return <Loader />
	}

	if (status === 'authenticated') {

		return (
		<div className={cls.containerLk}>
				<MainNavbar active={active} setActive={setActive} />
				{session.user && <Account session={session.user} updateSession={updateSession} />}
				<MainFooter />
		</div>
		);

	} else {

		return null

	}
};

export default lk;
