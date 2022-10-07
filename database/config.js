const mongoose = require('mongoose');

const dbConnection = async () => {
	await mongoose.connect(process.env.DB_CNN);

	console.log(typeof process.env.DB_CNN);

	console.log('DB Online');

	try {
	} catch (error) {
		console.log(error);
		throw new Error('Error a la hora de conectar a la base de datos');
	}
};

module.exports = {
	dbConnection,
};
