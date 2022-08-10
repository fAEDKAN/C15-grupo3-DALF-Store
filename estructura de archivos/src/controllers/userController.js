module.exports = {
    login: (req, res) => {
        return res.render('login')
    },
    register: (req, res) => {
        return res.render('register')
    },
    shopping: (req, res) => {
        return res.render('shopping')
    }
}