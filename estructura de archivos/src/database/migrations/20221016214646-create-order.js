"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Orders", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            total: {
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Users",
                    },
                    key: "id",
                },
                onDelete: 'cascade'
            },
            stateId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "States",
                    },
                    key: "id",
                },
                onDelete: 'cascade'
            },
            payRoleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Payroles",
                    },
                    key: "id",
                },
                onDelete: 'cascade'
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
        await queryInterface.dropTable("Orders");
    },
};
