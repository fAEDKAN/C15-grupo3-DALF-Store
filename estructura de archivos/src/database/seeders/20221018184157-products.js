'use strict';

const productos = require('../../data/productsDB-migration.json');
const products= productos.map(({name,price,discount,description,categoryId,brandId,sectionId,stock,rating})=>{
  return {
    name,
    price,
    discount,
    description,
    categoryId,
    brandId,
    sectionId,
    stock,
    rating,
    createdAt : new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Products', products, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Products', null, {});
    
  }
};