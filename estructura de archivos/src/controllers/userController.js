const { loadUsers, storeUsers }=require('../data/dbModule')
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const fs = require("fs");
const path = require("path");

module.exports = {

    /**REGISTRO DE USUARIOS**/
    register : (req, res) => {
        return res.render('users/register')
    },

    processRegister : (req,res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            const { userName, email, pass } = req.body;
            const users = loadUsers();

            const newUser = {
                id: users[users.length - 1] ? users[users.length - 1].id + 1 : 1,
                userName : userName.trim(),
                email : email.trim(),
                pass : bcryptjs.hashSync(pass.trim(),10),
                avatar : null
            }
            const usersModify = [...users, newUser];

            storeUsers(usersModify);
            return res.redirect('/users/login');
        } else {
            return res.render('users/register', {
                errors : errors.mapped(),
                old : req.body
            })
        }
    },

    /*INGRESO DE USUARIOS*/
    login : (req, res) => {
        return res.render('users/login')
    },

    processLogin: (req, res) => {
        let errors = validationResult(req);

        if(errors.isEmpty()){
            let { id, userName, avatar } = loadUsers().find((user) => user.email === req.body.email);

            req.session.userLogin = {
                id,
                userName,
                avatar
            };

            if(req.body.remember) {
                res.cookie('userDalfStore', req.session.userLogin, {
                    maxAge: 1000 * 60
                });
            }

            return res.redirect('/')
        } else {
            return res.render('users/login', {
                errors : errors.mapped()
            });
        }
    },
        
    /*EDITAR USUARIO */
    shopping: (req, res) => {
        return res.render('users/shopping')
    },

    profile: (req, res) => {
        let user = loadUsers().find(
            (user) => user.id === req.session.userLogin.id
        );
        return res.render('users/profile', {
            user
        });
    },

    update: (req, res) => {
        const { userName } = req.body;

        let usersModify = loadUsers().map((user) => {
            if(user.id === +req.params.id) {
                return {
                    ...user,
                    ...req.body,
                    avatar: req.file ? req.file.filename : req.session.userLogin.avatar
                };
            }
            return user;
        });

        if(req.file && req.session.userLogin.avatar) {
            if (
                fs.existsSync(path.resolve(__dirname, '..', 'public', 'images', 'users', req.session.userLogin.avatar))
            ) {
                console.log(">>>>>>", req.session.userLogin.avatar);
                fs.unlinkSync(path.resolve(__dirname, '..', 'public', 'images', 'users', req.session.userLogin.avatar));
            }
        }

        req.session.userLogin = {
            ...req.session.userLogin,
            userName,
            avatar: req.file ? req.file.filename : req.session.userLogin.avatar
        };

        storeUsers(usersModify);
        return res.redirect('/');
    },

    logout: (req, res) => {
        req.session.destroy();
        return res.redirect('/');
    }
}