//REQUIRE DATA BASE - VALIDATOR - BCRYPTJS
const { check, body } = require('express-validator');
const { loadUsers } = require('../data/dbModule');
const bcryptjs = require('bcryptjs');

//VALIDATIONS
module.exports = [

    check('email')
        .notEmpty().withMessage('El campo no puede estar vacío').bail()
        .isEmail().withMessage('Ingrese un e-mail válido').bail(),

    body('pass')
        .notEmpty().withMessage('El campo no puede estar vacío').bail()
        .custom((value, {req}) => {
            let user = loadUsers().find(user => user.email === req.body.email && bcryptjs.compareSync(value, user.pass));
            return user ? true : false
        }).withMessage('El email o la contraseña no coinciden')
];