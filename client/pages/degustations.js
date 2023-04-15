import React, {useState} from 'react'
import {useSession} from "next-auth/react";
import {MainNavbar} from "../components/Navbars/MainNavbar/MainNavbar";
import {WineTastingList} from "../components/Degustation/WineTastingList/WineTastingList";
import {MainFooter} from "../components/Footers/MainFooter/MainFooter";
import axios from "axios";

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
                <MainNavbar  active={active} setActive={setActive} />
                <WineTastingList tastings={tastings}/>
                <MainFooter />
            </>

        )
    }
}


export async function getStaticProps() {
    try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tasting/get-tastings`);
        const tastings = await res.data;
        return {
            props: {
                tastings,
            },
        };
    } catch (error) {
        console.error("Error fetching tastings:", error);
        return {
            props: {
                tastings: [], // Fallback value for tastings in case of an error
            },
        };
    }
}
export default degustations
