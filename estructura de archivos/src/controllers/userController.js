const {loadProducts, storeProducts, loadUsers, storeUsers}=require('../data/dbModule')
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
        const {name} = req.body;
        const id = users[users.length - 1].id;

        const newUser = {
            id : id + 1,
            ...req.body,
            name: name.trim()
        }
        
        const usersNew = [...users,newUser];

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