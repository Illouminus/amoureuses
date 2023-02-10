import React, { useEffect, useState } from 'react'
import styles from '../styles/carte.module.css'
import buttelOfVine from '../public/img/buttleOfVine.png'
import Image from 'next/image'
import Modal from '../components/Modal'
import Button from '@mui/material/Button';
import Articles from '../components/Articles';
import { useSelector, useDispatch } from 'react-redux';
import { getInitialValue, deleteCategory } from '../store/carte/actions'
import Navbar from '../components/Navbar'
const carte = () => {
	const dispatch = useDispatch();
	const category = useSelector((state) => state.carte.category)
	const menu = useSelector((state) => state.carte.menu)
	const [menuItem, setMenuItem] = useState({})
	const [isLoading, setIsLoading] = useState(true)
	const [open, setOpen] = useState(false);


	useEffect(() => {
		dispatch(getInitialValue())
	}, [])

	useEffect(() => {
		if (category && category.length) {
			setIsLoading(false)
		} else {
			setIsLoading(true)
		}
	}, [category, category.length])

	const deleteCategoryInside = (id) => {
		dispatch(deleteCategory(id))
	}

	const login = useSelector((state) => state.user.login);

	function unicId() {
		return Math.floor(Math.random() * 100000) + 10000;
	}
	const findId = (id) => {
		console.log('FINDID', id)
		const findMenuItem = menu.filter(el => el._id === id)
		console.log(findMenuItem)
		const findCategory = category.filter(el => el._id === findMenuItem[0].category)
		const obj = { ...findMenuItem[0], category: findCategory[0].name }
		console.log('OBJJJJJJ',obj)
		setMenuItem(obj)
	}

	const styleCard = { backgroundColor: '#fff0' }
	return (
		<div>
			<Navbar styleOther={styleCard} />
			<Modal open={open} handleClose={() => setOpen(false)} menuItem={menuItem} setMenuItem={setMenuItem} />
			{!isLoading && (
				<div className={styles.container}>
					<div className={styles.buttle}>
						<Image
							src={buttelOfVine}
							alt="Take a vin"
							width="100%"
							height="100%"
							priority="low"
						/>
					</div>
					<div>
					</div>
					<div className={styles.carte}>
						<h1>DECOUVREZ NOTRE CARTE</h1>
						{login && <Button onClick={() => setOpen(true)} style={{ textDecoration: 'none', color: 'white', opacity: '0.8', border: '1px solid #000', position: 'relative', top: '40px',  background: 'rgb(68, 4, 31)' }}>Add article</Button>}
						<div className={styles.carteTop} >
							{category.map((item) =>
								<div key={unicId()}>
									<Articles category={item} key={unicId()} findId={findId} setOpen={setOpen} />
									{login && <button onClick={() => deleteCategoryInside(item._id)}>Delete Category</button>}
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default carte