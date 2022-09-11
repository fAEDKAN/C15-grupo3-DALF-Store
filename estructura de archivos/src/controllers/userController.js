const { loadUsers, storeUsers }=require('../data/dbModule')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

module.exports = {
    login: (req, res) => {
        return res.render('users/login')
    },
    /**CARGA DE USUARIOS**/
    register: (req, res) => {
        return res.render('users/register')
    },
    userStore : (req,res) => {
        const users = loadUsers();
        const {fullName,pass} = req.body;
        const id = users[users.length - 1].id;

        const newUser = {
            id : id + 1,
            ...req.body,
            fullName: fullName.trim(),
            pass: bcryptjs.hashSync(pass.trim(),10),
        }
        
        const usersNew = [...users, newUser];

        storeUsers(usersNew)

        return res.redirect('/')
    },
    /*EDITAR USUARIO */
    shopping: (req, res) => {
        return res.render('users/shopping')
    },
    profile: (req, res) => {
        return res.render('users/userProfile')
    }
}