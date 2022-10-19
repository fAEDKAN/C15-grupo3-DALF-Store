'use strict';
const usuarios = require('../../data/userDB-migration.json');
const avatar= usuarios.map(({avatar})=>{
  return {
    file: avatar,
    createdAt : new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Avatars', avatar, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Avatars', null, {});
    
  }
};