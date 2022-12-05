"use strict";
const { hashSync } = require("bcryptjs");
const usuarios = require("../../data/userDB-migration.json");
const users = usuarios.map(
    ({
        userName,
        firstName,
        lastName,
        email,
        password,
        birthday,
        aboutMe,
        rolId,
    }) => {
        return {
            userName,
            firstName,
            lastName,
            email,
            password: hashSync(password, 10),
            birthday,
            aboutMe,
            rolId,
            createdAt: new Date(),
        };
    }
);
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Users", users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Users", null, {});
    },
};
