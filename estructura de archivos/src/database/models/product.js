"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Product.belongsTo(models.Category, {
                as: "category",
                foreignKey: "categoryId",
            });

            Product.hasMany(models.Image, {
                as: "image",
                foreignKey: "productId",
            });

            Product.hasOne(models.Brand, {
                as: "brand",
                foreignKey: "brandId",
            });

            Product.belongsTo(models.Section, {
                as: "section",
                foreignKey: "sectionId",
            });

            Product.hasMany(models.Cart, {
                as: "cart",
                foreignKey: "productId",
            });
        }
    }
    Product.init(
        {
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            discount: DataTypes.INTEGER,
            description: DataTypes.TEXT,
            rating: DataTypes.DECIMAL,
            categoryId: DataTypes.INTEGER,
            sectionId: DataTypes.INTEGER,
            brandId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Product",
        }
    );
    return Product;
};
