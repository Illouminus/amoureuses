const mongoose = require('mongoose');
const { sequelize } = require('./models');

module.exports = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    await sequelize.authenticate();
    console.log('Базы данных успешно подключены - обе! :)');
  } catch (error) {
    console.error('База данных не подключена:', error.message);
  }
};
