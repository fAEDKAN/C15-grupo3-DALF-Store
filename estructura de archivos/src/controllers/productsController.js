const {loadProducts, storeProducts, loadUsers}=require('../data/dbModule')

module.exports = {
    productDetail: (req, res) => {
        return res.render('products/productDetail')
    },
    /**CARGA DE PRODUCTOS **/
    productsLoad: (req, res) => {
        return res.render('products/productsLoad')
    },
    store : (req,res) => {
        const products = loadProducts();
        const {name,price,discount} = req.body;
        const id = products[products.length - 1].id;

        const newProduct = {
            id : id + 1,
            ...req.body,
            name: name.trim(),
            price : +price,
            discount : +discount,
        }
        const productsNew = [...products,newProduct];

        storeProducts(productsNew)

        return res.redirect('/')
    },
    /**EDICION DE PRODUCTOS **/
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