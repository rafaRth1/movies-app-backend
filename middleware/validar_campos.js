const { validationResult } = require('express-validator');

const validar_campos = (req, res, next) => {
	// Manejo de errores
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({
			ok: false,
			errors: errors.mapped(),
		});
	}

	next();
};

module.exports = {
	validar_campos,
};
