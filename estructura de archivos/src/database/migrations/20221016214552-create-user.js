"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userName: {
                type: Sequelize.STRING,
            },
            firstName: {
                type: Sequelize.STRING,
            },
            lastName: {
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            password: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            birthday: {
                type: Sequelize.DATE,
            },
            aboutMe: {
                type: Sequelize.TEXT,
            },
            rolId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Rols",
                    },
                    key: "id",
                },
            },
            avatarId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Avatars",
                    },
                    key: "id",
                },
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                type: Sequelize.DATE,
            },
            deletedAt: {
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Users");
    },
};
