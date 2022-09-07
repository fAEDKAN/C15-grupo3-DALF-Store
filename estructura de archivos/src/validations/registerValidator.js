const { check } = require('express-validator');

module.exports = [

    check('fullName')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isLength({
            min : 10,
            max : 25
        }).withMessage('Sólo se acepta un máximo de 25 caracteres'),

    check('email')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isEmail().withMessage('Ingrese un e-mail válido'),

    check('userName')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isLength({
            min : 5,
            max : 15
        }).withMessage('El nombre de usuario debe contener entre 5 y 15 caracteres'),

    check('bday')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isDate(),

    check('pass')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isStrongPassword({
            minLength : 8,
            maxLength : 30,
            minLowercase : 1,
            minUppercase : 1,
            minNumbers : 1
        }).withMessage('La contraseña debe contener entre 8 y 30 caracteres, al menos una mayúscula, una minúscula y un número'),

    check('repass')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
]