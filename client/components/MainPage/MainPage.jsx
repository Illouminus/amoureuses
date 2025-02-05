import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import cls from './MainPage.module.scss';
import { isMobile } from "react-device-detect";
import { MainPageBackground } from "./MainPageBackground";
import { MainFooter } from "../Footers/MainFooter/MainFooter";
import Link from "next/link";
import Image from "next/image";
import clock from '../../public/img/clock.svg';
import map from '../../public/img/map-pin.svg';
import logo from '../../public/img/FullLogo.png';
import { MainNavbar } from "../Navbars/MainNavbar/MainNavbar";

const classNames = require('classnames');

export const MainPage = () => {
	const [active, setActive] = useState(false);
	const [downloadLink, setDownloadLink] = useState("");
	const [loading, setLoading] = useState(true);
	const { push } = useRouter();

	useEffect(() => {
		const scriptId = "zenchef-sdk";

		if (!document.getElementById(scriptId)) {
			const script = document.createElement("script");
			script.id = scriptId;
			script.src = "https://sdk.zenchef.com/v1/sdk.min.js";
			script.async = true;
			document.body.appendChild(script);
		}
	}, []);

	const handleImageLoad = () => {
		setLoading(false);
	};

	const handleButtonClick = () => {
		if (isMobile) {
			setDownloadLink('/carte/Carte.pdf');
			window.open('https://les-amoureuses.s3.eu-west-3.amazonaws.com/menu.pdf', "_blank");
		} else {
			push('/carte');
		}
	};

	return (
		<>
			<MainNavbar active={active} setActive={setActive} />
			<MainPageBackground onImageLoad={handleImageLoad} loading={loading} />
			<h1 style={{ opacity: "0" }}>Les Amoureuses - un bar à vin chaleureux au cœur de Paris</h1>
			<h2 style={{ opacity: "0" }}>Les Amoureuses vous invite à plonger dans l'ambiance d'un véritable bar à vin parisien, où la convivialité et la passion pour le vin règnent en maîtres.</h2>

			{!loading && (
				<div className={classNames(cls.container, { [cls.active]: active })}>
					<div className={cls.container_mainContent}>
						<Image src={logo} alt="logo" />
					</div>
					<div className={cls.description}>
						<div className={cls.description_clock}>
							<Image src={clock} alt="Nos horaires d'ouverture" className={cls.clockDot} />
							<p>Tous les jours</p>
							<p>18h-00h</p>
						</div>
						<div className={cls.description_location}>
							<Image src={map} alt="Nous trouver sur la carte" className={cls.clockDot} />
							<Link href="https://goo.gl/maps/nkrz51aR41jbDTwu6" target="_blank">
								<p>3 rue des Tournelles, 75004 Paris</p>
							</Link>
						</div>
					</div>
					<button className={cls.buttonLaCarte} onClick={handleButtonClick}>La carte</button>
				</div>
			)}

			{/* Zenchef Widget */}
			<div className="zc-widget-config" data-restaurant="373833" data-open="2000"></div>

			<MainFooter />
		</>
	);
};