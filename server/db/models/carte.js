'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Carte extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			this.belongsTo(models.Category, { foreignKey: 'category_id', onDelete: 'CASCADE' })
		}
	}
	Carte.init({
		category_id: DataTypes.INTEGER,
		name: DataTypes.STRING,
		price: DataTypes.DECIMAL,
		origin: DataTypes.STRING,
		description: DataTypes.TEXT
	}, {
		sequelize,
		modelName: 'Carte',
	});
	return Carte;
};