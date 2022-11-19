//REQUIRE DATA BASE - VALIDATOR - BCRYPTJS
const { check, body } = require("express-validator");
/* const { loadUsers } = require("../data/dbModule"); */
const bcryptjs = require("bcryptjs");
const db = require("../database/models");

// LOGIN VALIDATIONS
module.exports = [
    check("email")
        .notEmpty()
        .withMessage("El campo no puede estar vacío")
        .bail()
        .isEmail()
        .withMessage("Ingresá un email válido")
        .bail()
        .custom(async (value, { req }) => {
            let user = await db.User.findAll({ email });
            user.email !== value || req.body.email;
            return user ? false : true;
        })
        .withMessage("El email no está registrado")
        .bail(),

    body("password")
        .notEmpty()
        .withMessage("El campo no puede estar vacío")
        .bail()
        .custom(async (value, { req }) => {
            let user = await db.User.findOne({ email });
            user.email === req.body.email &&
                bcryptjs.compareSync(value, user.password);
            return user ? true : false;
        })
        .withMessage("El email o la contraseña no coinciden")
        .bail(),
];
