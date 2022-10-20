const fs = require("fs");
const path = require("path");
const moment = require("moment");

//REQUIRE DATA BASE - VALIDATIONS - BCRYPTJS
const { loadUsers, storeUsers } = require("../data/dbModule");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const db = require("../database/models");

module.exports = {
    //USERS REGISTER
    register: (req, res) => {
        return res.render("users/register");
    },

    processRegister: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            const { userName, email, password } = req.body;
            db.User.create({
                userName: userName.trim(),
                email: email.trim(),
                password: bcryptjs.hashSync(password.trim(), 10),
                rolId: 2,
            })
                .then((user) => {
                    db.Address.create({
                        userId: user.id,
                    }).then(() => {
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
        db.User.findByPk(req.session.userLogin.id, {
            attributes: {
                exclude: ["createdAt", "updatedAt", "deletedAt"],
            },
        })
            .then((user) => {
                res.render("users/profile", {
                    user,
                    provinces: require("../data/provinces"),
                    moment,
                });
            })
            .catch((error) => console.log(error));

        /*         db.Avatar.findByPk({
            where : id === avatar
        }) */
        /* .then((user) => {
                return res.render("users/profile", {
                    user,
                    provinces: require("../data/provinces"),
                });
            }) */
    },

    //USER EDIT
    update: (req, res) => {
        let user = db.User.findByPk(req.params.id, {
            include: ["avatar"],
        });
        let userAvatar;
        Promise.all([user]).then(([userUpdate]) => {
            userAvatar = db.Avatar.findAll();
            Promise.all([userAvatar])
                .then(([updatedUser]) =>
                    res.render("/users/profile", {
                        userUpdate,
                        updatedUser,
                    })
                )
                .catch((error) => console.log(error));
        });
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
