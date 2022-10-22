'use strict';
const productos = require('../../data/productsDB-migration.json');
const images= productos.map(({id,image})=>{
  return {
    productId: id,
    file: image,
    createdAt : new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Images', images, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Images', null, {});
    
  }
};