import cls from './MainFooter.module.css'
import Image from "next/image";
import instagram from '../../../public/img/camera.svg'
import mail from '../../../public/img/envelope.svg'
import telegram from '../../../public/img/chat.svg'
import Link from "next/link";

export const MainFooter = () => {
    return (
        <>
            <footer className={cls.footer}>
                <div className={cls.social}>
                    <Image
                        src={mail}
                        alt="Icon of email"
                        priority="high"
                        className={cls.filterColorIcon}
                    />
                    <Link href={'https://instagram.com/lesamoureuses.bar?igshid=YmMyMTA2M2Y='} target={"_blank"} ><Image
                       src={instagram}
                       alt="Icon of Instagram"
                       priority="high"
                       className={cls.filterColorIcon}
                      />
                    </Link>



                    <Link href={'https://t.me/Blueberrrynights'} target={"_blank"} ><Image
                        src={telegram}
                        alt="Icon of Telegram"
                        priority="high"
                        className={cls.filterColorIcon}
                    />
                    </Link>
                </div>
            </footer>
        </>
    )
}


