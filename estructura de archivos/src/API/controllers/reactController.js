
const db = require("../../database/models");

module.exports = {
    list: async (req, res) => {
        try {
            let products = await db.Product.findAll();

            return res.status(200).json({
                ok: true,
                data: products
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || "Comunicate con el administrador",
            });
        }
    },

    last: async (req, res) => {
        try {
            let product = await db.Product.findAll({
                include: [{
                    association: 'image'
                }],
                limit: 1,
                order: [[
                    'createdAt', 'DESC'
                ]]
            });

            return res.status(200).json({
                ok: true,
                data: product
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || "Comunicate con el administrador",
            });
        }
    },

    userList: async (req, res) => {
        try {
            let users = await db.User.findAll({
                include: [{
                    association: 'avatar'
                }]
            });

            return res.status(200).json({
                ok: true,
                data: users
            });
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                msg: error.message || "Comunicate con el administrador",
            });
        }
    },
};
