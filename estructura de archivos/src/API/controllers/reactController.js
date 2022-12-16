
const db = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            let products = await db.Product.findAll();

            products = products.map(product => {
                return {
                    name: product.name,
                    price: product.price,
                    ...product.dataValues,
                }
            })

            return res.status(200).json({
                ok: true,
                data: products,
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || "Comunicate con el administrador",
            });
        }
    },
};
