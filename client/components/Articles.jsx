import React, { useState } from 'react'
import classnames from 'classnames';
import Link from 'next/link'
import styles from '../styles/carte.module.css'
import { useSelector, useDispatch } from 'react-redux';
import { deleteValue } from '../store/carte/actions'




const Articles = ({ category, findId, setOpen, menu }) => {
	console.log(category)
	const dispatch = useDispatch();
	//const menu = useSelector((state) => state.carte.menu)
	const [activeDelete, setactiveDelete] = useState(0)
	
	const calculateWidth = () => {
		return menu.reduce((max, el) => {
			return el.name.length > max.length ? el.name : max;
		}, "");
	}
	//const length = calculateWidth().length * 5;
	const length = 60 * 5



	const deleteHendler = (id) => {
		setactiveDelete(id)
		setTimeout(() => {
			dispatch(deleteValue(id))
		}, 1000);
	}



	const login = useSelector((state) => state.user.login);

	return (
		<>
			<h2 className={styles.carte__vins}>{category.name}</h2>
			{menu.map(item => category._id === item.category && (
				<div className={styles.link} key={item._id}>


					<li style={{ width: length }} className={styles.list}>{item.name}<span className={styles.vins__prix}>{`${item.price} €`}</span></li>
					<div className={styles.spanGroup}>
						{login && <span className={classnames(styles.contour__delete, activeDelete === item.id && styles.active)} onClick={() => {
							deleteHendler(item._id)
						}}>
							<span></span><p className={styles.contour__delete__text}>Delete</p>
						</span>}
						{login && <span className={styles.editSpan} onClick={() => {
							findId(item._id)
							setOpen(true)
						}}>
							<svg
								width="20"
								height="20"
								viewBox="0 0 24 24"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									clipRule="evenodd"
									d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 
								2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 
								5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 
								7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 
								17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z"
									fill="currentColor"
								/>
								<path
									d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z"
									fill="currentColor"
								/>
							</svg>
							<p>

								Edit</p>
						</span>}
					</div>
				</div>
			))}
		</>
	)
}

export default Articles