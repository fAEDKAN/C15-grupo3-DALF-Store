const fs = require('fs');
const path = require('path');
//REQUIRE DATA BASE - VALIDATIONS 
const { loadProducts } = require('../data/dbModule');
const { validationResult } = require('express-validator');
const db = require('../database/models');
module.exports = {
    //Filter Products by id
    index: (req, res) => {
        return res.render("products", {
            products,
            toThousand
        });
    },
    //PRODUCT DETAIL
    productDetail: (req, res) => {
        const categories = db.Category.findAll({ attributes: ['id', 'name'] });
        const sections = db.Section.findAll({ attributes: ['id', 'name'] });
        const brands = db.Brand.findAll({ attributes: ['id', 'name'] });

        let product = db.Product.findByPk(req.params.id, {
            include: [
                {
                    association: 'image'
                }
            ]
        })
        Promise.all([product, categories, sections, brands,])
        .then(([product, categories, sections, brands]) => {
            return res.render('products/productDetail', { product, categories, sections, brands })
        })
        .catch(error => res.send(error))

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
    create: async (req, res) => {
        console.log(req);
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
            const { name, price, discount, category, section, company } = req.body;

            const product = await db.Product.create({
                ...req.body,
                name: name.trim(),
                price: +price,
                discount: +discount,
                categoryId: category,
                sectionId: section,
                brandId: company
            }).catch(error => console.log(error))
            
            if(req.files && req.files.length > 0){

            req.files.forEach(async element => {
                await db.Image.create({
                    file: element.filename,
                    productId: product.id
                })
            })
            }
            return res.redirect('/');
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
                .catch(error => console.log(error))
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
               
                return res.render('products/productEdit', { productToEdit, categories, sections, brands })
            })
            .catch(error => res.send(error))
        
    },
    update: async (req, res) => {
       
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const { name, price, discount, category, section, company } = req.body;
            /*if(req.files && req.files.length > 0){
                let product = await db.Product.findAll(req.params.id)
                req.files.forEach(async element => {
                    await db.Image.destroy(
                        { where: { productId: product.id }}
                    );
                    await db.Image.create({
                            file:element.filename,
                            productId: product.id
                        })
                    })
                }*/
            await db.Product.update(
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
        } else {
            let productToEdit = db.Product.findByPk(req.params.id);
            const categories = db.Category.findAll({ attributes: ['id', 'name'] });
            const sections = db.Section.findAll({ attributes: ['id', 'name'] });
            const brands = db.Brand.findAll({ attributes: ['id', 'name'] });

            Promise.all([categories, sections, brands, productToEdit])
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
        }
    },
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

