import React, {useState} from 'react'
import {useSession} from "next-auth/react";
import {MainNavbar} from "../components/Navbars/MainNavbar/MainNavbar";
import {WineTastingList} from "../components/Degustation/WineTastingList/WineTastingList";
import {MainFooter} from "../components/Footers/MainFooter/MainFooter";
import axios from "axios";
import Head from "next/head";

export const degustations = ({tastings}) => {
    const {status, data} = useSession()
    const [active, setActive] = useState(false);


    if (status === "authenticated") {
        return (
            <div>
                <MainNavbar active={active} setActive={setActive}/>
                <WineTastingList tastings={tastings} />
                <MainFooter />
            </div>
        )
    } else {
        return (
            <>
                <Head>
                    <title>Dégustations chez Les Amoureuses - Bar à Vin à Paris</title>
                    <meta name="description" content="Explorez la liste des dégustations à venir chez Les Amoureuses, le meilleur bar à vin de Paris. Découvrez et apprenez-en davantage sur les vins à travers des événements de dégustation passionnants et éducatifs." />
                        <meta name="keywords" content="Dégustations, dégustation de vins, Les Amoureuses, bar à vin Paris, événements de dégustation, dégustation de vins à Paris, cave à vin Paris, soirée dégustation, expérience de dégustation" />
                            <meta charSet="utf-8"/>
                </Head>
                <MainNavbar  active={active} setActive={setActive} />
                <WineTastingList tastings={tastings}/>
                <MainFooter />
            </>

        )
    }
}


export async function getStaticProps() {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasting/get-tastings`);
        const tastings = await res.data;
        return {
            props: {
                tastings
            },
            revalidate: 60,
        };
}
export default degustations
