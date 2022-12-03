const fs = require("fs");
const path = require("path");
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
        try {
            if (errors.isEmpty()) {
                const { id, userName, email, password } = req.body;
                // Si no hay errores creamos usuario y levantamos sesión
                const user = await db.User.create({
                    id,
                    userName: userName.trim(),
                    email: email.trim(),
                    password: bcryptjs.hashSync(password.trim(), 10),
                    birthday: null,
                    rolId: 2,
                });
                db.Address.create({
                    userId: user.id,
                });
                req.session.userLogin = {
                    id: user.id,
                    userName: user.userName,
                    avatarFile: user.avatar
                        ? user.avatar.filename
                        : "DEFAULT-IMAGE.jpg",
                    rol: user.rolId,
                };
                return res.redirect("/");
            } else {
                return res.render("users/register", {
                    errors: errors.mapped(),
                    old: req.body,
                });
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    //USERS LOGIN
    login: (req, res) => {
        // Se renderiza la vista del form de login
        return res.render("users/login");
    },

    processLogin: async (req, res) => {
        let errors = validationResult(req);
        try {
            const { email } = req.body;
            // Buscamos un usuario cuyo email coincida con el que viene desde el form
            const user = await db.User.findOne({
                where: {
                    email: email,
                },
            });
            if (
                !user ||
                !bcryptjs.compareSync(req.body.password, user.password)
            ) {
                // Si el usuario no existe o la contraseña no es correcta, mostramos los errores en la vista
                return res.render("users/login", {
                    errors: errors.mapped(),
                });
            } else {
                // Si todo está OK creamos sesión
                req.session.userLogin = {
                    id: user.id,
                    userName: user.userName,
                    avatarFile: user.avatar
                        ? user.avatar.filename
                        : "DEFAULT-IMAGE.jpg",
                    rol: user.rolId,
                };
                if (req.body.remember) {
                    // Si el usuario lo desea, guardamos sus datos en una cookie
                    res.cookie("userDalfStore", req.session.userLogin, {
                        maxAge: 10000 * 60,
                    });
                }
                return res.redirect("/");
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    //USER PROFILE
    profile: async (req, res) => {
        try {
            // Traemos al usuario guardado en session
            const user = await db.User.findByPk(req.session.userLogin.id, {
                include: [
                    {
                        association: "avatar",
                    },
                    {
                        association: "address",
                    },
                ],
            });
            // Renderizamos la vista del perfil
            return res.render("users/profile", {
                user,
                moment,
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    //USER EDIT
    profileUpdate: async (req, res) => {
        try {
            // Traemos al usuario guardado en session
            const user = await db.User.findByPk(req.session.userLogin.id, {
                include: [
                    {
                        association: "avatar",
                    },
                    {
                        association: "address",
                    },
                ],
            });
            // Renderizamos la vista de edición de perfil de usuario
            return res.render("users/profileUpdate", {
                user,
                moment,
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    //USER UPDATE
    update: async (req, res) => {
        let errors = validationResult(req);

        try {
            if (errors.isEmpty()) {
                const {
                    userName,
                    firstName,
                    lastName,
                    birthday,
                    street,
                    city,
                    province,
                    aboutMe,
                } = req.body;
                // Traemos al usuario guardado en session
                const user = await db.User.findByPk(req.session.userLogin.id, {
                    include: [{ association: "avatar" }],
                });
                // Si existe una imagen cuyo userId coincide con el ID del usuario, la traemos
                if (req.file) {
                    const avatar = await db.Avatar.findOne({
                        where: {
                            userId: user.id,
                        },
                    });
                    // Si el usuario sube otra imagen, la anterior se elimina de local storage
                    if (fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'users', avatar.file))) {
                        fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'users', avatar.file))
                    }
                    // Si existe la actualizamos
                    if (avatar) {
                        await avatar.update({
                            file: req.file.filename,
                        });
                    } else {
                        // Y sino creamos una nueva
                        await db.Avatar.create({
                            file: req.file.filename,
                            userId: user.id,
                        });
                    }
                }

                await db.Address.update(
                    {
                        street: street.trim(),
                        city: city,
                        province: province,
                    },
                    {
                        where: {
                            userId: req.session.userLogin.id,
                        },
                    }
                );
                // Actualizamos los datos del usuario
                await user.update({
                    userName: userName.trim(),
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    birthday: birthday,
                    aboutMe,
                });
                return res.redirect("/users/profile");
            } else {
                let user = await db.User.findByPk(req.session.userLogin.id, {
                    include: [
                        {
                            association: "avatar",
                        },
                        {
                            association: "address",
                        },
                    ],
                });
                // Si hay errores los mostramos en la vista
                return res.render("users/profileUpdate", {
                    errors: errors.mapped(),
                    old: req.body,
                    user,
                    moment,
                });
            }
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    //MY SHOPPING
    shopping: (req, res) => {
        return res.render("users/shopping");
    },

    //LOGOUT
    logout: (req, res) => {
        // Deslogueamos al usuario
        req.session.destroy();
        res.cookie("userDalfStore", null, {
            maxAge: -1,
        });
        return res.redirect("/");
    },

    //DELETE ACCOUNT
    deleteAcc: async (req, res) => {
        try {
            // Traemos al usuario guardado en session
            const user = await db.User.findByPk(req.session.userLogin.id);
            // Renderizamos la vista de advertencia
            return res.render("users/deleteAcc", {
                user,
            });
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },

    remove: async (req, res) => {
        try {
            // Traemos al usuario guardado en session
            const user = await db.User.findByPk(req.session.userLogin.id, {
                include: [{ association: "avatar" }],
            });
            // Traemos el avatar cuyo userId coincida con el ID del usuario
            const avatar = await db.Avatar.findOne({
                where: {
                    userId: user.id,
                },
            });
            // Primero eliminamos el avatar, ya que sino dará error por la FK
            avatar.destroy({
                file: req.file
                    ? req.file.filename
                    : req.session.userLogin.avatarFile,
            });
            // Luego procedemos a eliminar el usuario cuyo ID coincida con el ID que viene por parámetro
            user.destroy(
                {
                    where: {
                        id: req.params.id,
                    },
                },
                {
                    include: [{ association: "avatar" }],
                }
            );
            // Destruimos cookie y session
            req.session.destroy();
            res.cookie("userDalfStore", null, {
                maxAge: -1,
            });
            return res.redirect("/");
        } catch (error) {
            console.log(error);
            res.send(error);
        }
    },
};
