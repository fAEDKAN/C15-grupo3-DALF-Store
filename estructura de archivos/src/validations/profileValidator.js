const { body, check } = require("express-validator");
const path = require("path");
const db = require("../database/models");

//PROFILE VALIDATIONS
module.exports = [
    body("avatarFile")
        .custom((value, { req }) => {
            if (!req.file) {
                return true;
            } else {
                const allowedExt = ["png", "jpg", "jpeg"];
                const extension = req.file.originalname.split(".")[1];
                if (!allowedExt.includes(extension)) {
                    return false;
                }
                return true;
            }
        })
        .withMessage("Sólo se admiten formatos png, jpg y jpeg"),

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
