"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Products", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            price: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
            discount: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            description: {
                allowNull: false,
                type: Sequelize.TEXT,
            },
            rating: {
                type: Sequelize.DECIMAL,
            },
            categoryId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Categories",
                    },
                    key: "id",
                },
            },
            sectionId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Sections",
                    },
                    key: "id",
                },
            },
            brandId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: "Brands",
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
        await queryInterface.dropTable("Products");
    },
};
