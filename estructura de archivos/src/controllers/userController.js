/* const fs = require("fs");
const path = require("path"); */
const moment = require("moment");

//REQUIRE DATA BASE - VALIDATIONS - BCRYPTJS
/* const { loadUsers, storeUsers } = require("../data/dbModule"); */
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");

module.exports = {
    //USERS REGISTER
    register: (req, res) => {
        // Se renderiza la vista del form de registro
        return res.render("users/register");
    },

    processRegister: async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.render("users/register", {
                errors: errors.mapped(),
                old: req.body
            });
        } else { 
            try {
                const { userName, email, password } = req.body;
                // Creamos usuario cuyos datos completados en el form coinciden con los de los campos requeridos por la DB
                await db.User.create({
                    userName: userName.trim(),
                    email: email.trim(),
                    password: bcryptjs.hashSync(password.trim(), 10),
                    birthday: null,
                    rolId: 2,
                });
                return res.redirect("login");
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        }
    },

    //USERS LOGIN
    login: (req, res) => {
        return res.render("users/login");
    },

    processLogin: async (req, res) => {
        let errors = validationResult(req);
        try {
            const { email } = req.body;
            // Buscamos un usuario cuyo email coincida con el que viene desde el form
            const user = await db.User.findOne({
                where: {
                    email: email
                }
            });
            if (!user || !bcryptjs.compareSync(req.body.password, user.password)) {
                // Si el usuario no existe o la contraseña no es correcta volvemos al login y mostramos los errores
                return res.render("users/login", {
                    errors: errors.mapped(),
                });
            } else {
                // Se crea una sesión para el usuario y si desea recordar sus datos los guardamos en una cookie
                req.session.userLogin = {
                    id: user.id,
                    userName: user.userName,
                    avatarFile: user.avatar ? user.avatar.filename : 'DEFAULT-IMAGE.jpg',
                    rol: user.rolId,
                };
                if (req.body.remember) {
                    res.cookie("userDalfStore", req.session.userLogin, {
                        maxAge: 10000 * 60,
                    });
                }
                // Redirigimos al usuario a la página principal
                return res.redirect("/");
            }
        } catch (error) {
            console.log(error);
            res.send(error)
        }
    },

    //USER PROFILE
    profile: async (req, res) => {
        try {
            // Traemos el usuario guardado en session
            const user = await db.User.findByPk(req.session.userLogin.id, {
                include: [{ association: "avatar"}]
            })
            // Renderizamos la vista del perfil
            return res.render("users/profile", {
                user,
                moment
            })
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    //USER EDIT
    profileUpdate: async (req, res) => {
        try {
            // Traemos el usuario guardado en session
            const user = await db.User.findByPk(req.session.userLogin.id, {
                include: [{ association: "avatar"}]
            })
            // Renderizamos la vista de edición de perfil de usuario
            return res.render("users/profileUpdate", {
                user,
                moment
            })
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    //USER UPDATE
    update: async (req, res) => {
        let errors = validationResult(req);
        if (!errors.isEmpty) {
            return res.render("users/profileUpdate", {
                errors: errors.mapped(),
                old: req.body,
            });
        } else { 
            try {
                const { userName, firstName, lastName, birthday, aboutMe } = req.body;
                const user = await db.User.findByPk(req.session.userLogin.id, {
                    include: [{ association: "avatar"}]
                });
                if (req.file) {
                    const avatar = await db.Avatar.findOne({
                        where: {
                            userId: user.id
                        }
                    });
                    if (avatar) {
                        await avatar.update({
                            file: req.file.filename
                        })
                    } else {
                        await db.Avatar.create({
                            file: req.file.filename,
                            userId: user.id
                        })
                    }
                }
                await user.update({
                    userName: userName.trim(),
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    birthday: birthday ? birthday : user.birthday,
                    aboutMe
                })
                return res.redirect("/users/profile");
            } catch (error) {
                console.log(error);
                res.send(error);
            }
        }
    },

    //MY SHOPPING
    shopping: (req, res) => {
        return res.render("users/shopping");
    },

    //LOGOUT
    logout: (req, res) => {
        req.session.destroy();
        res.cookie("userDalfStore", null, {
            maxAge: -1,
        });
        return res.redirect("/");
    },

    //DELETE ACCOUNT
    deleteAcc: (req, res) => {
        // Traemos el usuario guardado en session
        db.User.findByPk(req.session.userLogin.id)
            // Renderizamos la vista de advertencia
            .then((user) => {
                return res.render("users/deleteAcc", {
                    user,
                });
            })
            .catch((error) => console.log(error));
    },

    remove: (req, res) => {
        db.User.findByPk(req.session.userLogin.id, {
            include: [{ association: "avatar" }],
        }).then((user) => {
            user.avatar
                .destroy({
                    file: req.file
                        ? req.file.filename
                        : req.session.userLogin.avatarFile,
                })
                .catch((error) => console.log(error));
            user.destroy(
                {
                    where: {
                        id: req.params.id,
                    },
                },
                {
                    include: [{ association: "avatar" }],
                }
            )
                .then(() => {
                    req.session.destroy();
                    res.cookie("userDalfStore", null, {
                        maxAge: -1,
                    });
                    return res.redirect("/");
                })
                .catch((error) => console.log(error));
        });
    },
};
