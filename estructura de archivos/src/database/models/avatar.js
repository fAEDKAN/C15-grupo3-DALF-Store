"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Avatar extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Avatar.belongsTo(models.User, {
                as: "avatar",
                foreignKey: "userId",
            });
        }
    }
    Avatar.init(
        {
            file: DataTypes.STRING,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Avatar",
            onDelete: "cascade",
        }
    );
    return Avatar;
};
