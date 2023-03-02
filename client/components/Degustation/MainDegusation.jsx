import cls from './MainDegustation.module.scss'
import React from "react";
import {useSession} from "next-auth/react";
import {DegustationList} from "./DegustationListe/DegustationListe";

export const MainDegusation = () => {
    const {status, data} = useSession()
    return (
        <>
            <div style={{
                backgroundImage: `url('/img/Degustation.png')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh',
            }}>
                <DegustationList />
            </div>
        </>
    )
}
