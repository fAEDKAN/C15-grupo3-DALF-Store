const { check } = require('express-validator');

//PRODUCT VALIDATIONS
module.exports = [

    check('name')
    .notEmpty().withMessage('Es obligatorio establecer un nombre')
    .bail()
    .isLength({
        min: 5,
        max: 100
    }).withMessage('El minimo es de 5 caracteres'),

    check('price')
    .notEmpty().withMessage('Es obligatorio establecer un precio')
    .bail()
    .isNumeric({
        no_symbols: true,
    }).withMessage('Éste campo solo acepta numeros'),

    check('discount')
    .isInt({
        min: 0,
        max: 100,
    }).withMessage('El descuento no puede ser mayor de 100')
    .bail()
    .isNumeric({
        no_symbols: true,
    }).withMessage('Éste campo solo acepta numeros'),

    check('stock')
    .notEmpty().withMessage('El total no puede ser 0')
    .bail()
    .isNumeric({
        no_symbols: true,
    }).withMessage('Éste campo solo acepta numeros')
    .bail()
    .isInt({
        min: 1,
        max: 1000,
    }).withMessage('Sólo se aceptan entre 1 y 1000 productos'),

    check('section').notEmpty().withMessage('Es obligatorio establecer una sección'),

    check('category').notEmpty().withMessage('Es obligatorio establecer una categoría'),

    check('company').notEmpty().withMessage('Es obligatorio establecer una compania'),

    check('description')
    .notEmpty().withMessage('Es obligatorio establecer una descripción').bail()
    .isLength({
        min: 10,
        max: 250
    }).withMessage('La descripción tiene que tener entre 10 y 250 caracteres')
];