import cls from './MainCarte.module.scss'
import {MainFooter} from "../Footers/MainFooter/MainFooter";
import Articles from "./Articles/Articles";
import React from "react";
import {useSession} from "next-auth/react";
import Image from "next/image";
import add from '../../public/img/Add.svg'
import back from '../../public/img/back.svg'
import {useRouter} from "next/router";
export const MainCarte = ({category, menu, deleteItem, setOpen, key, findId, deleteCategoryInside}) => {
    const {status, data} = useSession()
    const router = useRouter();
    function ReturnButton() {
            router.back();
        }

    return (
        <>
            <div style={{
                backgroundImage: `url('/img/Carte.png')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                width: '100vw',
                height: '100vh',
            }}>
                <Image
                    src={back}
                    alt="Go back"
                    priority="high"
                    width="40px"
                    height="40px"
                    className={cls.backButton}
                    onClick={ReturnButton}
                />
                <div className={cls.backgroundCarte}
                     style={{backgroundImage: `url('/img/CleanCarte.png')`,}}
                >
                    <div className={cls.contentContainer}>
                        <h1>La carte a vins *</h1>
                        {status === "authenticated" &&
                            <Image
                            src={add}
                            alt="Icon of email"
                            priority="high"
                            className={cls.buttonAddArticle}
                            onClick={() => setOpen(true)}
                        />}
                        <div className={cls.categoryContainer}>
                            {category.map((item) =>
                                <div key={key} className={cls.containerDeleteCategory}>
                                    <Articles category={item} key={key} findId={findId} setOpen={setOpen} menu={menu} deleteItem={deleteItem}/>
                                    {status === "authenticated" && <button onClick={() => deleteCategoryInside(item._id)} className={cls.deleteCategory}>Delete Category</button>}
                                </div>
                            )}
                        </div>
                    </div>
                    <p className={cls.descriptionVente}>* Nous vous proposons nos vins à la vente.</p>
                </div>
            </div>

            <MainFooter />
        </>
    )
}


