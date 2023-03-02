import React from 'react'
import Navbar from '../components/Navbar'
import {useSession} from "next-auth/react";
import {MainDegusation} from "../components/Degustation/MainDegusation";
import {CarteNavbar} from "../components/Navbars/CarteNavbar/CarteNavbar";
import {MainFooter} from "../components/Footers/MainFooter/MainFooter";
export const degustations = () => {
    const {status, data} = useSession()
    const session = useSession()

    if (status === "authenticated") {
        return (
            <div>

            </div>
        )
    } else {
        return (
            <>
                <CarteNavbar />
                <MainDegusation />
                <MainFooter />
            </>

        )
    }


}

export default degustations
