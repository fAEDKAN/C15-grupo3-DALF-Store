"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.belongsTo(models.Rol, {
                as: "rol",
                foreignKey: "rolId",
            });

            User.hasOne(models.Avatar, {
                as: "avatar",
                foreignKey: "userId",
            });

            User.hasMany(models.Order, {
                as: "order",
                foreignKey: "userId",
            });
        }
    }
    User.init(
        {
            userName: DataTypes.STRING,
            firstName: DataTypes.STRING,
            lastName: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            birthday: DataTypes.DATEONLY,
            aboutMe: DataTypes.TEXT,
            rolId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "User",
            onDelete: 'cascade'
        }
    );
    return User;
};
