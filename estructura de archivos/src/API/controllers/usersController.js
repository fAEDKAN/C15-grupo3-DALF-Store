const db = require('../../database/models');
const path = require('path')
const sequelizeError = require('../helpers/sequelizeError');
const { literal } = require('sequelize');
const { createError } = require('../helpers');

module.exports = {

    getAvatar : (req,res) => {
        return res.sendFile(path.join(__dirname, '..','..','..','public','images','users', req.params.file ))
    },

    getAllUsers: async (req, res) => {
        try {
            let rules = {
                include: [
                    {
                        association: 'avatar',
                        attributes: {
                            exclude: ['id', 'file', 'userId', 'createdAt', 'updatedAt', 'deletedAt'],
                            include: [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/users/avatar/',file)`), 'avatarURL']]
                        }
                    }
                ],
                attributes: {
                    exclude: ['password', 'rolId', 'createdAt', 'updatedAt', 'deletedAt'],
                    include: [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/users/',User.id)`), 'userDetail']]
                }
            }
            let {count, rows: users} = await db.User.findAndCountAll(rules);
            return res.status(200).json({
                ok: true,
                meta: {
                    'total de usuarios': count
                },
                data: users
            })
        } catch (error) {
            let errors = sequelizeError(error);
            return res.status(error.status || 500).json({
                ok: false,
                errors
            });
        }
    },

    getUsersById: async (req, res) => {
        try {
            const { id } = req.params;
            let rules = {
                attributes: {
                    exclude: ['password', 'rolId', 'createdAt', 'updatedAt', 'deletedAt'],
                    include: [[literal(`CONCAT('${req.protocol}://${req.get('host')}/api/users/avatar/', file)`), 'avatarURL']]
                },
                include: [
                    {
                        association: 'avatar',
                        attributes: {
                            exclude: ['id', 'file', 'userId', 'createdAt', 'updatedAt', 'deletedAt'],
                        }
                    }
                ]
            }
            let user = await db.User.findByPk(id, rules);
            if (!user) {
                throw createError(404, 'Usuario inexistente')
            } else {
                return res.status(200).json({
                    ok: true,
                    status: 200,
                    data: user
                })
            }
        } catch (error) {
            let errors = sequelizeError(error);
            return res.status(error.status || 500).json({
                ok: false,
                errors
            });
        }
    },

    verifyUserName: async (req, res) => {
        try {
            const { userName } = req.body;
            let user = await db.User.findOne({
                where: {
                    userName
                }
            })
            return res.status(200).json({
                ok: true,
                verified: user ? true : false
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                error: error.message
            })
        }
    },

    verifyEmail: async (req, res) => {
        try {
            const { email } = req.body;
            let user = await db.User.findOne({
                where: {
                    email
                }
            })
            return res.status(200).json({
                ok: true,
                verified: user ? true : false
            })
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                error: error.message
            })
        }
    },

    removeUsers: async (req, res) => {
        try {
            
        } catch (error) {
            return res.status(error.status || 500).json({
                ok: false,
                error: error.message
            })
        }
    }

}