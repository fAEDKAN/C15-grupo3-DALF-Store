const fs = require('fs');
const path = require('path');
//REQUIRE DATA BASE - VALIDATIONS 
const { loadProducts, storeProducts } = require('../data/dbModule');
const { validationResult } = require('express-validator');
const db = require('../database/models');
const { Association } = require('sequelize');

module.exports = {
    //??????
    index: (req, res) => {
        let products = loadProducts();
        return res.render("products", {
            products,
            toThousand
        });
    },
    //PRODUCT DETAIL
    productDetail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [
                {
                    association: 'image'
                }
            ]
        })
            .then(product => {
                res.render("products/productDetail", { product })
            })
            .catch(error => res.send(error))

        /*let products = loadProducts();
        let product = products.find(product => product.id === +req.params.id);
        return res.render("products/productDetail",{
            product
        });*/
    },
    //CARGA DE PRODUCTOS 
    productsLoad: (req, res) => {
        const categories = db.Category.findAll({ attributes: ['id', 'name'] });
        const sections = db.Section.findAll({ attributes: ['id', 'name'] });
        const brands = db.Brand.findAll({ attributes: ['id', 'name'] });

        Promise.all([categories, sections, brands])
            .then(([categories, sections, brands]) => {
                return res.render('products/productsLoad', { categories, sections, brands })
            })
            .catch(error => res.send(error))
    },
    create: (req, res) => {
        let errors = validationResult(req);
        errors = errors.mapped();
        if (req.fileValidationError) {
            errors = {
                ...errors,
                images: {
                    msg: req.fileValidationError
                }
            };
        };
        if (Object.entries(errors).length === 0) {
            /*const products = loadProducts();*/
            const { name, price, discount, } = req.body;
            db.Product.create({
                ...req.body,
                name: name.trim(),
                price: +price,
                discount: +discount
            })
                .then(() => {
                    return res.redirect('/')
                })
                .catch(error => res.send(error))
            /*const {name,price,discount} = req.body;
            const id = products[products.length - 1].id;
            let images;
            if (req.files.length > 0){ images = req.files.map(image => image.filename) };
            
            const newProduct = {
                id : id + 1,
                ...req.body,
                name: name.trim(),
                price : +price,
                discount : +discount,
                image: images ? images:['default-product-image.jpg']
            };
            const productsNew = [...products,newProduct];
    
            storeProducts(productsNew);
    
            return res.redirect('/');*/
        } else {
            if (req.files.length > 0) {
                req.files.forEach(({ filename }) => {
                    fs.existsSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', filename)) && fs.unlinkSync(path.resolve(__dirname, '..', '..', 'public', 'images', 'products', filename));
                })
            };

            const categories = db.Category.findAll({ attributes: ['id', 'name'] });
            const sections = db.Section.findAll({ attributes: ['id', 'name'] });
            const brands = db.Brand.findAll({ attributes: ['id', 'name'] });

            Promise.all([categories, sections, brands])
                .then(([categories, sections, brands]) => {
                    return res.render('products/productsLoad', {
                        categories,
                        sections,
                        brands,
                        errors,
                        old: req.body
                    })
                })
                .catch(error => res.send(error))
        }
    },
    //EDICION DE PRODUCTOS 
    productEdit: (req, res) => {
        let productToEdit = db.Product.findByPk(req.params.id);
        let categories = db.Category.findAll({ attributes: ['id', 'name'] });
        let sections = db.Section.findAll({ attributes: ['id', 'name'] });
        let brands = db.Brand.findAll({ attributes: ['id', 'name'] });

        Promise.all([productToEdit, categories, sections, brands])
            .then(([productToEdit, categories, sections, brands]) => {
                //return res.send(productToEdit)
                return res.render('products/productEdit', { productToEdit, categories, sections, brands })
            })
            .catch(error => res.send(error))
        /*let productToEdit = loadProducts().find(product => product.id === +req.params.id);
        return res.render('products/productEdit',{
            productToEdit
        });*/
    },
    update: (req, res) => {
        /* const products = loadProducts();
         const {id}= req.params;*/
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const { name, price, discount, category, section, company } = req.body;
            db.Product.update(
                {
                    ...req.body,
                    name: name.trim(),
                    price: +price,
                    discount: +discount,
                    categoryId: category,
                    sectionId: section,
                    brandId: company
                },
                {
                    where: { id: req.params.id }
                })
                .then(() => {
                    return res.redirect("/products/productDetail/" + req.params.id)
                })
                .catch(error => res.send(error))
            /* const {name,price,discount} = req.body;
             let productsModify = products.map(product =>{
                 if(product.id === +req.params.id){
                     return {
                         id : product.id,
                         ...req.body,
                         name: name.trim(),
                         price : +price,
                         discount : +discount,
                         image: product.image
                     };
                 };
                 return product;
             });
             storeProducts(productsModify);
             return res.redirect("/products/productDetail/" + req.params.id);*/
        } else {
            let productToEdit = db.Product.findByPk(req.params.id);
            const categories = db.Category.findAll({ attributes: ['id', 'name'] });
            const sections = db.Section.findAll({ attributes: ['id', 'name'] });
            const brands = db.Brand.findAll({ attributes: ['id', 'name'] });

            Promise.all([categories, sections, brands,productToEdit])
                .then(([categories, sections, brands, productToEdit]) => {
                    return res.render('products/productEdit', {
                        productToEdit,
                        categories,
                        sections,
                        brands,
                        errors: errors.mapped(),
                        old: req.body
                    })
                })
                .catch(error => res.send(error))
    }},
    //DELETE PRODUCTS
    destroy: (req, res) => {
        db.Product.destroy(
            {
                where: { id: req.params.id }
            })
            .then(() => {
                return res.redirect('/')
            })
            .catch(error => res.send(error))
        /*let productsModify = loadProducts().filter(product => product.id !== +req.params.id);

        storeProducts(productsModify);
        return res.redirect('/');*/
    },
    //CART
    cart: (req, res) => {
        return res.render('products/cart');
    },
    cartAdress: (req, res) => {
        return res.render('products/cartAdress');
    },
    cartPay: (req, res) => {
        return res.render('products/cartPay');
    }

}

