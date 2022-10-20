//REQUIRE DATA BASE - VALIDATOR - BCRYPTJS
const { check, body } = require("express-validator");
const { loadUsers } = require("../data/dbModule");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");

//VALIDATIONS
module.exports = [
    check("email")
        .notEmpty()
        .withMessage("El campo no puede estar vacío")
        .bail()
        .isEmail()
        .withMessage("Ingresá un email válido")
        .bail(),

    body("password")
        .notEmpty()
        .withMessage("El campo no puede estar vacío")
        .bail()
        /*.custom((value, { req }) => {
            let user = loadUsers().find(
                (user) =>
                    user.email === req.body.email &&
                    bcryptjs.compareSync(value, user.password)
            );
            return user ? true : false;
        })
        .withMessage("El email o la contraseña no coinciden"), */
        .custom((value, { req }) => {
            let user = db.User.findOne({ email }).then(
                (user) =>
                    user.email === req.body.email &&
                    bcryptjs.compareSync(value, user.password)
            );
            return user ? true : false;
        })
        .withMessage("El email o la contraseña no coinciden"),
];
