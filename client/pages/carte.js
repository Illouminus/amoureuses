import React, {useEffect, useState} from 'react'
import styles from '../styles/carte.module.css'
import buttelOfVine from '../public/img/buttleOfVine.png'
import {useSession} from "next-auth/react";
import Image from 'next/image'
import Modal from '../components/Modal'
import Button from '@mui/material/Button';
import Articles from '../components/Articles';
import { useSelector, useDispatch } from 'react-redux';
import {setData} from '../store/carte/index'
import {  deleteCategory } from '../store/carte/actions'
import Navbar from '../components/Navbar'
import dbConnect from "../utils/mangoDB"
import Category from "../models/Category";
import Carte from "../models/Carte"
import axios from "axios";

const carte = ({initialProps}) => {
	// Get initials data, parse and sate states
	const initial = JSON.parse(initialProps)
	const [category, setCategory] = useState(initial.findResultCategory)
	const [menu, setMenu] = useState(initial.findResultCarte)

	// Get login status from next-auth
	const {status, data} = useSession()

	// State for find the actual item after click and set it or add a new item
	const [menuItem, setMenuItem] = useState({})


	const [isLoading, setIsLoading] = useState(false)
	const [open, setOpen] = useState(false);




	// Function for deleting category from DataBase en set Status
	const deleteCategoryInside = async (id) => {
		const response = await axios.post('/api/carte/deleteCategory', {id});
		console.log(response)
		if (response.data.findItem) {
			setCategory((prev) => prev.filter((el) => el._id !== id))
		}
	}

	// Function for edit or add some item or category
	const edditOrAdd = async (newItem) => {
		const response = await axios.post('/api/carte/addItem', newItem);
		let categoryIndex = category.findIndex((el) => el._id === response.data.category._id);
		let menuIndex = menu.findIndex((el) => el._id === response.data.menu._id);
		if (categoryIndex !== -1) {
			const newCategory = [...category];
			newCategory[categoryIndex] = response.data.category;
			setCategory(newCategory);
		} else {
			setCategory(prev => [...prev, response.data.category])
		}
		if (menuIndex !== -1) {
			const newMenu = [...menu];
			newMenu[menuIndex] = response.data.menu;
			setMenu(newMenu);
		} else {
			setMenu(prev => [...prev, response.data.menu]);
		}
	}

	const deleteItem = async (id) => {
		console.log(id)
		const response = await axios.post('/api/carte/delete', {id});
		console.log(response)
		if (response.data.findItem) {
			setMenu(prev => prev.filter((el) => el._id !== id))
		}
	}

	function unicId() {
		return Math.floor(Math.random() * 100000) + 10000;
	}

	// Function for find the actual item after OnClick and setSate with this item
	const findId = (id) => {
		const findMenuItem = menu.filter(el => el._id === id)
		const findCategory = category.filter(el => el._id === findMenuItem[0].category)
		const obj = { ...findMenuItem[0], category: findCategory[0].name }
		setMenuItem(obj)
	}

	const styleCard = { backgroundColor: '#fff0' }
	return (
		<div>
			<Navbar styleOther={styleCard} />
			<Modal open={open} handleClose={() => setOpen(false)} menuItem={menuItem} setMenuItem={setMenuItem} edditOrAdd={edditOrAdd} />
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
						{status === "authenticated" && <Button onClick={() => setOpen(true)} style={{ textDecoration: 'none', color: 'white', opacity: '0.8', border: '1px solid #000', position: 'relative', top: '40px',  background: 'rgb(68, 4, 31)' }}>Add article</Button>}
						<div className={styles.carteTop} >
							{category.map((item) =>
								<div key={unicId()}>
									<Articles category={item} key={unicId()} findId={findId} setOpen={setOpen} menu={menu} deleteItem={deleteItem}/>
									{status === "authenticated" && <button onClick={() => deleteCategoryInside(item._id)}>Delete Category</button>}
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

export async function getServerSideProps(context) {
	await dbConnect();
	const [findResultCategory, findResultCarte] = await Promise.all([
		Category.find({}),
		Carte.find({}),
	]);

	return {
		props: { initialProps: JSON.stringify({ findResultCategory, findResultCarte }) },
	};
}
