const { check, body } = require('express-validator');

const { loadUsers } = require('../data/dbModule');

const bcryptjs = require('bcryptjs');

module.exports = [

    check('email')
        .notEmpty().withMessage('El campo no puede estar vacío').bail()
        .isEmail().withMessage('Ingrese un e-mail válido'),

    check('pass')
        .notEmpty().withMessage('El campo no puede estar vacío').bail()

]