module.exports = {
    index: (req, res) => {
        return res.render('index')
    },
    cart: (req, res) => {
        return res.render('cart')
    },
    /*ruta temporal*/ 
    cartAdress: (req, res) => {
        return res.render('cartAdress')
    },
    cartPay: (req, res) => {
        return res.render('cartPay')
    }
}