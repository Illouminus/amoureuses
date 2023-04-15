import cls from './MainPage.module.scss'
import { isMobile } from "react-device-detect";
import {MainPageBackground} from "./MainPageBackground";
import {MainFooter} from "../Footers/MainFooter/MainFooter";
import Link from "next/link";
import Image from "next/image";
import clock from '../../public/img/clock.svg'
import map from '../../public/img/map-pin.svg'
import logo from '../../public/img/FullLogo.png'
import {MainNavbar} from "../Navbars/MainNavbar/MainNavbar";
import {useState} from "react";
import { useRouter } from 'next/navigation';
const classNames = require('classnames');
export const MainPage = () => {
    const [active, setActive] = useState(false)
    const [downloadLink, setDownloadLink] = useState("");
    const { push } = useRouter();
    const handleButtonClick = () => {
        if (isMobile) {
            setDownloadLink('/carte/Carte.pdf');
            window.open('https://les-amoureuses.s3.eu-west-3.amazonaws.com/menu.pdf', "_blank");
        } else {
            push('/carte')
        }
    };
    return (
        <>
        <MainNavbar active={active} setActive={setActive}/>
        <MainPageBackground />
            <div className={classNames(cls.container, {[cls.active]: active})}>
                <div className={cls.container_mainContent}>
                    <h1>
                        <Image src={logo} alt={'logo'} />
                    </h1>
                </div>
                <div className={cls.description}>
                    <div className={cls.description_clock}>
                        <Image src={clock} alt='icon of clock' className={cls.clockDot}/>
                        <p>Mercredi-Dimanche 18h - 00h</p>

                    </div>
                    <div className={cls.description_location}>
                        <Image src={map} alt='icon of map pin' className={cls.clockDot}/>
                        <Link href={"https://goo.gl/maps/nkrz51aR41jbDTwu6"} target={"_blank"}><p>3 rue des Tournelles, 75004 Paris</p></Link>
                    </div>
                </div>
                <button className={`${cls.buttonLaCarte}`} onClick={handleButtonClick}>La carte</button>
            </div>

        <MainFooter />
        </>
    )
}


