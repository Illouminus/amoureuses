import React, {useEffect, useState} from 'react'
import {useSession} from "next-auth/react";
import axios from "axios";
import Head from "next/head";
import {MainNavbar} from "../components/Navbars/MainNavbar/MainNavbar";
import {Carte} from "../components/CartePDF/Carte";
import {MainFooter} from "../components/Footers/MainFooter/MainFooter";

const carte = () => {
	// Get initials data, parse and sate states

	// Get login status from next-auth
	const {status, data} = useSession()

	// State for find the actual item after click and set it or add a new item
	const [menuItem, setMenuItem] = useState({})


	// const [isLoading, setIsLoading] = useState(false)
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

	return (
		<div>
			<Head>
				<title>Carte</title>
				<meta name="keywords" content="vin, bar, soiree, drinks, drink, night, vine"/>
				<meta name="description" content="this is a website of the vine bar"/>
				<meta charSet="utf-8"/>
			</Head>
			<MainNavbar />
			<Carte />
			<MainFooter />

		</div>
	)
}

export default carte


