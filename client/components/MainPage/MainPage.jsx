import cls from './MainPage.module.scss'
import Head from "next/head";
import {MainPageBackground} from "./MainPageBackground";
import {MainFooter} from "../Footers/MainFooter/MainFooter";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faClock, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
export const MainPage = () => {
    return (
        <>
        <MainPageBackground />
            <div className={cls.container_mainContent}>
                <h2>Bar a vin</h2>
                <h1>Les Amoureuses</h1>
            </div>
            <div className={cls.description}>
                <div className={cls.description_clock}>
                    <FontAwesomeIcon icon={faClock} className={cls.clockDot}/>
                    <p>Mercredi-Dimanche 18h - 00h</p>
                </div>
                <div className={cls.description_location}>
                    <FontAwesomeIcon icon={faLocationDot} className={cls.locationDot}/>
                    <Link href={"https://goo.gl/maps/nkrz51aR41jbDTwu6"} target={"_blank"}><p>3 rue des Tournelles, 75004 Paris</p></Link>
                </div>
            </div>
            <Link href={'/carte'} className={cls.buttonLaCarte}>La carte</Link>
        <MainFooter />
        </>
    )
}


