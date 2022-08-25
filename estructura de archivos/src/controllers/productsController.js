module.exports = {
    productDetail: (req, res) => {
        return res.render('products/productDetail')
    },
    productsLoad: (req, res) => {
        return res.render('products/productsLoad')
    },
    productEdit: (req, res) => {
        return res.render('products/productEdit')
    },
    cart: (req, res) => {
        return res.render('products/cart')
    },
    /*ruta temporal*/ 
    cartAdress: (req, res) => {
        return res.render('products/cartAdress')
    },
    cartPay: (req, res) => {
        return res.render('products/cartPay')
    },
    productDelete: (req, res) => {
        return res.render('products/productDelete')
    }
}