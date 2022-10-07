// Rutas de usuario / Auth
// Host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const { validar_campos } = require('../middleware/validar_campos');
const { loginUser, createUser } = require('../controllers/auth');

const router = Router();

router.post(
	'/',
	[check('username', 'El username es obligatorio').not().isEmpty(), validar_campos],
	loginUser
);
router.post(
	'/new-user',
	[
		check('firstname', 'El nombre es obligatorio').isString().isLength({ min: 2 }),
		check('lastname', 'El apellido es obligatorio').isString().isLength({ min: 2 }),
		check('username', 'El username es obligatorio').not().isEmpty(),
		check('email', 'El email es obligatorio').isEmail(),
		check('password', 'El password es obligatorio').isLength({ min: 6 }),
		validar_campos,
	],
	createUser
);

// router.get('/renew', validarJWT, revalidarToken);

module.exports = router;
