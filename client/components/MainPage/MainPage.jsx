import cls from './MainPage.module.scss'
import Head from "next/head";
import {MainPageBackground} from "./MainPageBackground";
import {MainFooter} from "../Footers/MainFooter/MainFooter";
import Link from "next/link";
import Image from "next/image";
import clock from '../../public/img/clock.svg'
import map from '../../public/img/map-pin.svg'
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
                    <Image src={clock} alt='icon of clock' className={cls.clockDot}/>
                    <p>Mercredi-Dimanche 18h - 00h</p>

                </div>
                <div className={cls.description_location}>
                    <Image src={map} alt='icon of map pin' className={cls.clockDot}/>
                    <Link href={"https://goo.gl/maps/nkrz51aR41jbDTwu6"} target={"_blank"}><p>3 rue des Tournelles, 75004 Paris</p></Link>
                </div>
            </div>

                <Link href={'/carte'} className={`${cls.buttonLaCarte}`}>La carte</Link>
                <Link href={'/degustations'} className={cls.buttonDegustation}><span>Dégustation</span></Link>


        <MainFooter />
        </>
    )
}


