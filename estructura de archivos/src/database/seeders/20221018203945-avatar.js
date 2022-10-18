'use strict';
const usuarios = require('../../data/userDB.json');
const avatar= usuarios.map(({avatar, id})=>{
  return {
    file: avatar,
    //userId: id,
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