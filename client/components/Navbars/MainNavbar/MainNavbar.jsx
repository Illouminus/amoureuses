import cls from './MainNavbar.module.scss'
import {useSession} from "next-auth/react";
import Image from "next/image";
import smallLogo from '../../../public/img/logo.png'
const classNames = require('classnames');
export const MainNavbar = ({active, setActive}) => {
    const {status, data} = useSession()
    const login = status === "authenticated";

    const activeHedlear = (e) => {
        e.stopPropagation()
        setActive(!active)
    }

    const MENU_LIST = login ? [{ text: "Carte", href: '/carte' }, { text: "Contact", href: '/contact' }, { text: "Logout", href: '/', }] :
        [{ text: "Carte", href: '/carte' }, { text: "Contact", href: '/contact' }, { text: "Login", href: '/login' },]

    return (
        <nav className={cls.nav} >
            <a href="/" className={cls.logo}>
                <Image src={smallLogo} alt={smallLogo}  className={cls.logoImage} />
            </a>
            <div className={classNames(cls.toggle, {[cls.active]: active})} onClick={activeHedlear}/>
            <div className={classNames(cls.navbar, {[cls.active]: active})} >
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>

        </nav>

    )
}


