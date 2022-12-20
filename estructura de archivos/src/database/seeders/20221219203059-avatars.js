'use strict';

const avatars = require('../../data/avatarDB-migration.json');
const userImage= avatars.map(({file, userId})=>{
  return {
    file,
    userId,
    createdAt : new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Avatars', userImage, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Avatars', null, {});
    
  }
};