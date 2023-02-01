const e = require('express')
const { where } = require('sequelize')
const { Carte, Category } = require('../../db/models')



const initialValues = async (req, res) => {
	const findResulutCategory = await Category.findAll()
	const findResultCarte = await Carte.findAll()
	res.send([findResulutCategory, findResultCarte])

}



const addArticle = async (req, res) => {
	const { category, name, description, price, origin } = req.body;
	const uperName = name.charAt(0).toUpperCase() + name.slice(1)
	const uperCategory = category.charAt(0).toUpperCase() + category.slice(1)
	let id = req.body.id ? req.body.id : 0
	try {
		const writeType = await Category.findOrCreate({
			where: { name: uperCategory },
			raw: true
		})
		const findMenuItem = await Carte.findOne({ where: id })
		let article;
		if (!findMenuItem) {
			const createArticle = await Carte.create({
				name: uperName, description, price, origin, category_id: writeType[0].id
			})
			article = await Carte.findByPk(createArticle.id)
		} else {
			const updateArticle = await Carte.update(
				{
					name: uperName, description, price, origin, category_id: writeType[0].id
				},
				{
					where: { id }
				}
			)
			article = await Carte.findByPk(id)
		}
		res.send({ menu: article, category: writeType })

	} catch (error) {
		console.log(error)
	}
}



const deleteArticle = async (req, res) => {
	const { id } = req.body
	console.log(id);
	try {
		const findItem = await Carte.destroy({
			where: { id }
		})
		res.send({ findItem })
	} catch (error) {
		console.log(error);
	}
}

const deleteCat = async (req, res) => {
	const { idCategory } = req.body
	try {
		const findItem = await Category.destroy({
			where: { id: idCategory }
		})
		res.send({ findItem })
	} catch (error) {
		console.log(error);
	}
}

module.exports = { addArticle, initialValues, deleteArticle, deleteCat }