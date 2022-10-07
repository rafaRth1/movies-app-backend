const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// Cors
app.use(cors());

// Directorio Publico
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Ruta
app.use('/api/auth', require('./routes/auth'));

app.listen(process.env.PORT, () => {
	console.log('Servidor corriendo en puerto ' + process.env.PORT);
});
