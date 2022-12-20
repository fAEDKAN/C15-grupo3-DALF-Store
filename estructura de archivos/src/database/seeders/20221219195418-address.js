'use strict';

const localization = require('../../data/addressDB-migration.json');
const addresses= localization.map(({street, city, province, userId})=>{
  return {
    street,
    city,
    province,
    userId,
    createdAt : new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Addresses', addresses, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Addresses', null, {});
    
  }
};