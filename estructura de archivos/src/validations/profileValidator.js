const { body, check } = require("express-validator");
const path = require("path");
const db = require("../database/models");

//PROFILE VALIDATIONS
module.exports = [
    body("avatarFile")
        .custom((value, { req }) => {
            let file = req.file;
            let allowedExt = [".jpg", ".jpeg", ".png"];
            if (!file) {
                null;
            } else {
                let fileExt = path.extname(file.originalname);
                if (!allowedExt.includes(fileExt)) {
                    return false;
                }
                return true;
            }
        })
        .withMessage("Sólo se admiten formatos .jpg, .jpeg y .png"),

    check("userName")
        .notEmpty()
        .withMessage("Éste campo es obligatorio")
        .bail()
        .isLength({
            min: 3,
            max: 15,
        })
        .withMessage(
            "El nombre de usuario debe contener entre 3 y 15 caracteres"
        )
        .bail()
        .isAlpha("es-ES")
        .withMessage("Sólo caracteres alfabéticos"),

    body("userName").custom(function (value) {
        return db.User.findOne({
            where: {
                userName: value,
            },
        }).then((user) => {
            if (user) {
                return Promise.reject(
                    "El nombre de usuario ya se encuentra registrado"
                );
            }
        });
    }),

    check("firstName")
        .isLength({
            min: 3,
            max: 15,
        })
        .withMessage("El nombre debe contener entre 3 y 15 caracteres")
        .bail()
        .isAlpha("es-ES")
        .withMessage("Sólo caracteres alfabéticos"),

    check("lastName")
        .isLength({
            min: 2,
            max: 15,
        })
        .withMessage("El apellido debe contener entre 2 y 15 caracteres")
        .bail()
        .isAlpha("es-ES")
        .withMessage("Sólo caracteres alfabéticos"),
];
