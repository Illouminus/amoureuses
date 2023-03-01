
import cls from './MainNavbar.module.scss'
import {NavbarLeaf} from "./NavbarLeaf";
import {useSession} from "next-auth/react";

export const MainNavbar = () => {
    const {status, data} = useSession()
    const login = status === "authenticated";


    const MENU_LIST = login ? [{ text: "Carte", href: '/carte' }, { text: "Contact", href: '/contact' }, { text: "Logout", href: '/', }] :
        [{ text: "Carte", href: '/carte' }, { text: "Contact", href: '/contact' }, { text: "Login", href: '/login' },]

    return (
        <nav className={cls.nav}>
            <ul>
                {/*<li><a href="#">Home</a></li>*/}
                {/*<li><a href="#">About</a></li>*/}
                {/*<li><a href="#">Services</a></li>*/}
                {/*<NavbarLeaf />*/}
                {/*<li><a href="#">Contact</a></li>*/}
            </ul>
        </nav>

    )
}


