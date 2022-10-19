'use strict';
const marcas = require('../../data/brands.json');
const brands= marcas.map(({name,createdAt})=>{
  return {
    name,
    createdAt: new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Brands', brands, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Brands', null, {});
    
  }
};
