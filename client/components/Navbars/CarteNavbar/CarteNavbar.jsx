import cls from './CarteNavbar.module.scss'
import {useSession} from "next-auth/react";
import NavItem from "../../NavItem";
import Image from "next/image";
import logo from '../../../public/img/logo.png'
import Link from "next/link";

export const CarteNavbar = () => {
    const {status, data} = useSession()
    const login = status === "authenticated";


    const MENU_LIST = login ? [{ text: "Logout", href: '/', }] :
        [{ text: "Carte", href: '/carte' }, { text: "Contact", href: '/contact' }, { text: "Login", href: '/login' },]

    return (
        <nav className={cls.nav}>
            <ul>
                <li><Link href={'/'}> <Image src={logo} alt={'logotip'}  className={cls.navLogo}/></Link></li>
                {login && <li><NavItem text={"Logout"} href={'/'} /></li>}
            </ul>
        </nav>

    )
}


