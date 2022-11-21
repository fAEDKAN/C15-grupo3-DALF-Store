const fs = require('fs');
const path = require('path');
//REQUIRE DATA BASE - VALIDATIONS 
const { validationResult } = require('express-validator');
const { createError } = require('../helpers/index')
const db = require('../../database/models');
const { literal, Op, Sequelize } = require('sequelize');

module.exports = {
    productsList: async (req, res) => {
        let options = {
            attributes: {
                exclude: ["createdAt", "updatedAt"],
                include: [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/productDetail/', productId)`), 'productURL']]
            },
            include: [
                {
                    association: 'image',
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                        include: [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/image/', file)`), 'imageURL']]
                    }
                },
                {
                    association: 'category',
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ]
        }

        try {
            let { count: total, rows: products } = await db.Product.findAndCountAll(options);
            let categories = await db.Category.findAll({
                attributes: {
                    exclude: ["createdAt", "updatedAt", "id"]
                }
            })
            ///////////////////////////////////////////////////////////////////

            let productsByCategory = await db.Product.count({
                include: [
                    {
                        association: 'category',
                        attributes: {
                            exclude: ["createdAt", "updatedAt"]
                        }
                    }
                ],
                group: ["categoryId"]
            })
            

            /* intento de juli
            let CountPByC8 = await db.Product.findAll({
                attributes: {
                    include: [[Sequelize.fn("COUNT", Sequelize.col("category.id")), "categoryCount"]]
                },
                include: [{
                    model: "Category", attributes: []
                }],
                group: ['category.id']
            })

            /*let CountPByC =
                categories.forEach(async category => {
                    let result = await db.Product.count({
                        where: {
                            [Op.or]: [{
                                categoryId: {
                                    [Op.substring]: category.id //id de categoria
                                }
                            }]
                        }
                    })


                });  */
            //intento funciona de manera individual probado en map
            /*let productsCountByCategory = 
            categories.map(async category => {
                 let result= await db.Product.count({
                where: {
                    [Op.or]: [{
                        categoryId: {
                            [Op.substring]: category.id //id de categoria
                        }
                    }]
                }
            })
            return {
                category: category.name,
                count :result
            }
            });*/
            /*let productsCountByCategory =async ()=>{
                let categories= await db.Category.findAll()
                await db.Product.count({
                    include: [
                        {
                            association: 'category',
                            attributes: {
                                exclude: ["createdAt", "updatedAt"]
                            }
                        }
                    ],
                    group: ["categoryId"]
                })
                return {
                    category: categories.name,
                    count :result
                }}*/
           
           

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200.,
                    //categories,
                    //productsCountByCategory
                    productsByCategory
                },
                data: {
                    total,
                    products
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message,
            });
        }

    },
    productDetail: async (req, res) => {
        const { id } = req.params
        try {
            if (isNaN(id)) {
                let error = new Error("El id debe ser un numero");
                error.status = 400;
                throw error;
            }

            let options = {
                attributes: {
                    exclude: ["createdAt", "updatedAt", "categoryId", "sectionId", "brandId", "id"],
                    include: [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/productDetail/', productId)`), 'productURL']]
                },
                include: [
                    {
                        association: 'image',
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "productId", "id"],
                            include: [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/products/image/', file)`), 'imageURL']]
                        }
                    },
                    {
                        association: 'category',
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "id"]
                        }
                    },
                    {
                        association: 'section',
                        attributes: {
                            exclude: ["createdAt", "updatedAt", "id"]
                        }
                    }
                    /*, no funciona revisar
                    {
                        association: 'brand',
                        attributes: {
                            attributes: ['id', 'name'],
                            exclude: ["createdAt", "updatedAt"]
                        }
                    }*/
                ]
            }
            let product = await db.Product.findByPk(req.params.id, options)

            if (!product) {
                let error = new Error('No hay un producto con ese id');
                error.status = 404;
                throw error;
            }

            return res.status(200).json({
                ok: true,
                meta: {
                    status: 200
                },
                data: {
                    product
                }
            })
        } catch (error) {
            console.log(error);
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message
            })
        }
    },
    image: async (req, res) => {
        console.log(req.params.image);
        return res.sendFile(path.join(__dirname, '..', '..','..', 'public', 'images', 'products', req.params.image))
    },
    //CARGA DE PRODUCTOS 
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

            if (req.files && req.files.length > 0) {
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
        }
    },
    //EDICION DE PRODUCTOS 
    
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

    }
}

