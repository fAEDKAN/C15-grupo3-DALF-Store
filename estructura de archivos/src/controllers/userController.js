const fs = require("fs");
const path = require("path");
const moment = require("moment");

//REQUIRE DATA BASE - VALIDATIONS - BCRYPTJS
const { loadUsers, storeUsers } = require("../data/dbModule");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const provinces = require("../data/provinces");
const db = require("../database/models");

module.exports = {
    //USERS REGISTER
    register: (req, res) => {
        // Se renderiza la vista del form de registro
        return res.render("users/register");
    },

    processRegister: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { userName, email, password } = req.body;
            // Creamos usuario cuyos datos completados en el form coinciden con los de los campos requeridos por la DB
            db.User.create({
                userName: userName.trim(),
                email: email.trim(),
                password: bcryptjs.hashSync(password.trim(), 10),
                rolId: 2,
            })
                .then((user) => {
                    // Creando el objeto en la tabla Address ya se le asigna un ID cuyo valor coincide con la relación con User
                    db.Address.create({
                        userId: user.id,
                    }).then((user) => {
                        return res.redirect("login");
                    });
                })
                .catch((error) => console.log(error));
        } else {
            return res.render("users/register", {
                errors: errors.mapped(),
                old: req.body,
            });
        }
    },

    //USERS LOGIN
    login: (req, res) => {
        return res.render("users/login");
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);
        const { email } = req.body;
        // Buscamos usuario cuyo email coincida con el que viene desde el formulario
        db.User.findOne({
            where: {
                email: email,
            },
        }).then((user) => {
            if (
                !user ||
                !bcryptjs.compareSync(req.body.password, user.password)
            ) {
                // Si el usuario no existe o la contraseña no es correcta volvemos al login y mostramos los errores
                return res.render("users/login", {
                    errors: errors.mapped(),
                });
            } else {
                // Se crea una sesión para el usuario y si desea recordar sus datos los guardamos en una cookie
                req.session.userLogin = {
                    id: user.id,
                    userName: user.userName,
                };
                if (req.body.remember) {
                    res.cookie("userDalfStore", req.session.userLogin, {
                        maxAge: 1000 * 60,
                    });
                }
                // Redirigimos al usuario a la página principal
                return res.redirect("/");
            }
        });
    },

    //USER PROFILE
    profile: (req, res) => {
        // Traemos el usuario guardado en session
        db.User.findByPk(req.session.userLogin.id, {
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
        })
            // Renderizamos la vista del perfil
            .then((user) => {
                res.render("users/profile", {
                    user,
                    provinces,
                    moment,
                });
            })
            .catch((error) => console.log(error));
    },

    //USER EDIT
    update: (req, res) => {
        const { userName, firstName, lastName, birthday, aboutMe } = req.body;
        db.User.findByPk(req.session.userLogin.id)
            .then(user => {
                db.User.update(
                    {
                        userName,
                        firstName,
                        lastName,
                        birthday,
                        aboutMe,
                        avatar: req.file ? req.file.filename : user.avatar
                    },
                    {
                        where : {
                            id : req.session.userLogin.id
                        }
                    }
                )
                .then(() => {
                    return res.redirect('/users/profile')
                })
            })
            .catch(error => console.log(error))
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
        const user = loadUsers().find(
            (user) => user.id === req.session.userLogin.id
        );
        return res.render("users/deleteAcc", {
            user,
        });
    },

    remove: (req, res) => {
        const users = loadUsers();
        const usersModify = users.filter((user) => user.id !== +req.params.id);
        storeUsers(usersModify);
        req.session.destroy();
        res.cookie("userDalfStore", null, {
            maxAge: -1,
        });
        return res.redirect("/");
    },
};
