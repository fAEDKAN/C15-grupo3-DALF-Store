const fs =require('fs');
const path=require('path')
const { loadProducts, storeProducts } = require('../data/dbModule')
const { validationResult } = require('express-validator');

module.exports = {
    index: (req, res) => {
        // Do the magic
        let products = loadProducts();
        return res.render("products", {
            products,
            toThousand
        })
    },

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
        let errors = validationResult(req)
        errors = errors.mapped();
        if(req.fileValidationError){
            errors = {
                ...errors,
                images : {
                    msg : req.fileValidationError
                }
            }
        }
        if(Object.entries(errors).length === 0){
            const products = loadProducts();
            const {name,price,discount} = req.body;
            const id = products[products.length - 1].id;
            let images;
            if (req.files.length > 0){ images = req.files.map(image => image.filename) }
            
            const newProduct = {
                id : id + 1,
                ...req.body,
                name: name.trim(),
                price : +price,
                discount : +discount,
                image: images ? images:['default-product-image.jpg']
            }
            const productsNew = [...products,newProduct];
    
            storeProducts(productsNew)
    
            return res.redirect('/')
        }else{
            if(req.files.length > 0){
                req.files.forEach(({filename}) => {
                    fs.existsSync(path.resolve(__dirname,'..','..','public','images','products',filename)) &&  fs.unlinkSync(path.resolve(__dirname,'..','..','public','images','products',filename))
                })
            }
            return res.render('products/productsLoad', {
                errors,
                old: req.body
            })
        }
    },
    /**EDICION DE PRODUCTOS **/
    productEdit: (req, res) => {
        let productToEdit = loadProducts().find(product => product.id === +req.params.id)
        return res.render('products/productEdit',{
            productToEdit
        })
    },
    update: (req, res) => {

        const products = loadProducts();
        const {id}= req.params;
        const errors = validationResult (req);

        if (errors.isEmpty()) {

        const {name,price,discount} = req.body;

        let productsModify = products.map(product =>{
            if(product.id === +req.params.id){
                return {
                    id : product.id,
                    ...req.body,
                    name: name.trim(),
                    price : +price,
                    discount : +discount,
                }
            }
            return product;
        })
        storeProducts(productsModify);
        return res.redirect("/products/productDetail/" + req.params.id)
        }else{
            return res.render('products/productEdit', {
                errors: errors.mapped(),
                productToEdit: loadProducts().find(product => product.id === +req.params.id),
                old: req.body,
            })
        }
    },

    destroy : (req, res) => {
        
		let productsModify = loadProducts().filter(product => product.id !== +req.params.id);
        
		storeProducts(productsModify);
		return res.redirect('/')
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
    
}

