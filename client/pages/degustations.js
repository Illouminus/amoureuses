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
                    <title>Degustations</title>
                    <meta name="description" content="La liste des degustations à venir"/>
                    <meta name="keywords" content="Degustations, tasting, vins, Faire une degustation"/>
                    <meta charSet="utf-8"/>
                </Head>
                <MainNavbar  active={active} setActive={setActive} />
                <WineTastingList tastings={tastings}/>
                <MainFooter />
            </>

        )
    }
}


export async function getServerSideProps() {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasting/get-tastings`);
        const tastings = await res.data;
        return {
            props: {
                tastings
            },
        };
}
export default degustations
