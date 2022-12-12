
const db = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            let categories = await db.Category.findAll({
                include: ['products']
            });

            categories = categories.map(category => {
                return {
                    totalProducts: category.products.length,
                    ...category.dataValues
                }
            })

            return res.status(200).json({
                ok: true,
                data: {
                    categories,

                },
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || "Comunicate con el administrador",
            });
        }
    },
};
