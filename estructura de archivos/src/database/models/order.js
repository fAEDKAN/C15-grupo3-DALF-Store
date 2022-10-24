"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Order.belongsTo(models.User, {
                as: "user",
                foreignKey: "userId",
            });

            Order.hasOne(models.State, {
                as: "state",
                foreignKey: "stateId",
            });

            Order.hasMany(models.Payrole, {
                as: "payrole",
                foreignKey: "payRoleId",
            });

            Order.hasMany(models.Cart, {
                as: "cart",
                foreignKey: "orderId",
            });
        }
    }
    Order.init(
        {
            total: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            stateId: DataTypes.INTEGER,
            payRoleId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Order",
            onDelete: "cascade",
        }
    );
    return Order;
};
