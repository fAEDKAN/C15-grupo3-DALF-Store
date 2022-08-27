const { render } = require("ejs");
const {loadProducts, storeProducts, loadUsers}=require('../data/dbModule')

module.exports = {
    productDetail: (req, res) => {
        let products = loadProducts();
        let product = products.find(product => product.id === +req.params.id);
        return res.render("products/productDetail",{
            product
        })
    },
    /**CARGA DE PRODUCTOS **/
    productsLoad: (req, res) => {
        return res.render('products/productsLoad')
    },
    create : (req,res) => {
        const products = loadProducts();
        const {name,price,discount} = req.body;
        const id = products[products.length - 1].id;

        const newProduct = {
            id : id + 1,
            ...req.body,
            name: name.trim(),
            price : +price,
            discount : +discount
        }
        const productsNew = [...products,newProduct];

        storeProducts(productsNew)

        return res.redirect('/')
    },
    /**EDICION DE PRODUCTOS **/
    productEdit: (req, res) => {
        let productToEdit = loadProducts().find(product => product.id === +req.params.id)
        return res.render('products/productEdit',{
            productToEdit
        })
    },
    update: (req, res) => {
        const {name,price,discount} = req.body;
        let productsModify = loadProducts().map(product =>{
            if(product.id === parseInt(Id)){
                return {
                    id : product.id,
                    ...req.body,
                    name: name.trim(),
                    price : +price,
                    discount : +discount,
                }
            }
            return products;
        })
        storeProducts(productsModify);
        return res.redirect("/products/detail/" + req.params.id)
    },
    delete: (req, res) => {},
    


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
    productDelete : (req, res) => {
        
		let productsModify = loadProducts().filter(product => product.id !== +req.params.id);
        
		storeProducts(productsModify);
		return res.redirect('/products/')
	}
}