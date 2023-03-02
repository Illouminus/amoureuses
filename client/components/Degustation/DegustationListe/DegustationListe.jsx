import {useSession} from "next-auth/react";
import cls from './DegustationListe.module.scss'
import Image from "next/image";

export const DegustationList = () => {
    const {status, data} = useSession()
    const degustat = [
        {
            date: '26 mars 2023',
            name: 'Dégustation sur les hauteurs de Paris',
            place: 12,
            description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aperiam assumenda consectetur, cupiditate dolorum illum ipsum molestias mollitia nam nemo non voluptatem voluptatum! Doloremque incidunt ipsum molestias quod sunt.'
        },
        {
            date: '26 mars 2023',
            name: 'Dégustation sur les hauteurs de Paris',
            place: 12,
            description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aperiam assumenda consectetur, cupiditate dolorum illum ipsum molestias mollitia nam nemo non voluptatem voluptatum! Doloremque incidunt ipsum molestias quod sunt.'
        },
        {
            date: '26 mars 2023',
            name: 'Dégustation sur les hauteurs de Paris',
            place: 12,
            description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aperiam assumenda consectetur, cupiditate dolorum illum ipsum molestias mollitia nam nemo non voluptatem voluptatum! Doloremque incidunt ipsum molestias quod sunt.'
        },
        {
            date: '26 mars 2023',
            name: 'Dégustation sur les hauteurs de Paris',
            place: 12,
            description: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus animi aperiam assumenda consectetur, cupiditate dolorum illum ipsum molestias mollitia nam nemo non voluptatem voluptatum! Doloremque incidunt ipsum molestias quod sunt.'
        },
    ]

    return (
        <div
            style={{
                backgroundImage: `url('/img/Pergament.png')`,
            }}
            className={cls.container}>
            <h1>Les Amoureuses</h1>
            <h2>Espace de dégustation</h2>
            <span className={cls.spanLine}/>
            <span className={cls.spanLine}/>
            <div className={cls.contentContainer}>
                <p>
                    Rejoignez-nous pour une expérience de dégustation de vin inoubliable !
                    Découvrez une sélection exceptionnelle de vins provenant des meilleurs
                    vignobles du monde entier, accompagnés de délicieuses collations.
                    Notre équipe de sommeliers expérimentés sera là pour vous guider tout au long
                    de la dégustation, partageant des anecdotes fascinantes sur les vins et les régions viticoles.
                    Que vous soyez un amateur de vin passionné ou simplement curieux de découvrir de nouveaux goûts,
                    notre dégustation de vin est l'occasion parfaite pour élargir vos connaissances en matière de vin
                    tout en passant un moment agréable avec des amis
                    ou en rencontrant de nouvelles personnes. Venez découvrir notre bar à vin et laissez-nous vous
                    offrir une expérience de dégustation de vin unique et mémorable !
                </p>
                <span className={cls.spanLineMiddle}/>
                <p className={cls.degustationApproach}><span>Les degustations à venir</span></p>
                <span className={cls.spanLineMiddle}/>
                <div className={cls.owerflauBlock}>
            {degustat.map((item) =>
                <>
                    <div className={cls.containerList}>
                        <div className={cls.content_name}>{item.name}</div>
                        <div className={cls.content_date}><span>{item.date}</span></div>
                    </div>
                </>
            )}
                </div>
            </div>
        </div>
    )
}
