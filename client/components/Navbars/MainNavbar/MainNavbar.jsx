import cls from './MainNavbar.module.scss'
import {useSession} from "next-auth/react";
import { isMobile } from "react-device-detect";
import Image from "next/image";
import smallLogo from '../../../public/img/logo.png'
import NavItem from "./NavItem";
const classNames = require('classnames');
export const MainNavbar = ({active, setActive}) => {
    const {status, data} = useSession()
    const login = status === "authenticated";

    const activeHedlear = (e) => {
        e.stopPropagation()
        setActive(!active)
    }



    const MENU_LIST = login ? [
            { text: "Carte", href: '/carte' },
            { text: "Dégustation", href: '/degustations' },
            { text: "Déconnexion", href: '/'},
            {text: "Admin", href: '/lk'},
            { text: "Blog", href: '/blog' },
        ]
        :
        [
            { text: "Carte", href: '/carte' },
            { text: "Dégustation", href: '/degustations' },
            { text: "Connexion", href: '/login' },
            { text: "Blog", href: '/blog' }, ]


    return (
        <nav className={cls.nav} >
            <a href="/" className={cls.logo}>
                <Image src={smallLogo} alt={smallLogo}  className={cls.logoImage} />
            </a>
            <div className={classNames(cls.toggle, {[cls.active]: active})} onClick={activeHedlear}/>
            <div className={classNames(cls.navbar, {[cls.active]: active})} onClick={activeHedlear}>
                <ul>
                    {MENU_LIST.map((item) => (
                        <li key={item.text}><NavItem href={item.href} text={item.text}/></li>
                    ))}
                </ul>
            </div>

        </nav>

    )
}


