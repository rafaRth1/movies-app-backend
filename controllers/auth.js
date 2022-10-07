const { response, request } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');

const loginUser = async (req = request, res = response) => {
	const { username, username: email, password } = req.body;

	try {
		const usuario = !username.includes('@')
			? await Usuario.findOne({ username })
			: await Usuario.findOne({ email });

		console.log(usuario);

		if (!usuario) {
			return res.status(400).json({
				ok: false,
				msg: 'El usuario no existe',
			});
		}

		// Configurar los password
		const validPassword = bcrypt.compareSync(password, usuario.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Password Incorrecto',
			});
		}

		// Generar JWT
		const token = await generarJWT(usuario.id, usuario.name);

		res.json({
			ok: true,
			uid: usuario.id,
			name: usuario.firstname,
			lastname: usuario.lastname,
			token,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};

const createUser = async (req = request, res = response) => {
	const { username, email, password } = req.body;

	try {
		let usuario = await Usuario.findOne({ email });
		let userUsername = await Usuario.findOne({ username });

		if (usuario || userUsername) {
			return res.status(400).json({
				ok: false,
				msg: 'Ya existe este correo',
			});
		}

		usuario = new Usuario(req.body);

		// Encriptar password
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt);

		await usuario.save();

		// Generar JWT
		const token = await generarJWT(usuario.id, usuario.name);

		res.status(201).json({
			ok: true,
			uid: usuario.id,
			firstname: usuario.firstname,
			lastname: usuario.lastname,
			username: usuario.username,
			email: usuario.email,
			token,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			ok: false,
			msg: 'Por favor hable con el administrador',
		});
	}
};

module.exports = {
	loginUser,
	createUser,
};
