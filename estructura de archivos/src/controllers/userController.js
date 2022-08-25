module.exports = {
    login: (req, res) => {
        return res.render('users/login')
    },
    register: (req, res) => {
        return res.render('users/register')
    },
    shopping: (req, res) => {
        return res.render('users/shopping')
    },
    profile: (req, res) => {
        return res.render('users/userProfile')
    }
}