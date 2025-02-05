import cls from './MainFooter.module.css'
import Image from "next/image";
import instagram from '../../../public/img/camera.svg'
import mail from '../../../public/img/envelope.svg'
import telegram from '../../../public/img/chat.svg'
import Link from "next/link";
import Modal from "../../Modal";
import { useState } from "react";

export const MainFooter = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Modal open={open} handleClose={() => {
				setOpen(false)
			}} isContactForm={true} />

			<footer className={cls.footer}>
				<div className={cls.social}>
					<Image
						src={mail}
						alt="Nous contacter par le formualire de contact"
						priority="high"
						className={cls.filterColorIcon}
						onClick={setOpen}

					/>
					<Link href={'mailto:pariswinesociety@gmail.com'} target={"_blank"} ><Image
						src={instagram}
						alt="Nous suivre sur instargar"
						priority="high"
						className={cls.filterColorIcon}
					/>
					</Link>



					<Link href={'https://t.me/Blueberrrynights'} target={"_blank"} ><Image
						src={telegram}
						alt="Nous contacter via Telegram"
						priority="high"
						className={cls.filterColorIcon}
					/>
					</Link>
				</div>
			</footer>
		</>
	)
}


