const { check } = require('express-validator');

module.exports = [

    check('fullName')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isLength({
            min : 10,
            max : 30
        }).withMessage('Sólo se acepta un máximo de 30 caracteres').bail()
        .isAlpha('es-ES').withMessage('Solo caracteres alfabéticos'),

    check('email')
        .notEmpty().withMessage('Éste campo es obligatorio').bail()
        .isEmail().withMessage('Ingrese un e-mail válido').bail()
        .custom((value, {req}) => {
            const user = loadUsers().find(user => user.email === value);

            if(user){
                return false
            }else {
                return true
            }
        }).withMessage('El email ya se encuentra registrado'),

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