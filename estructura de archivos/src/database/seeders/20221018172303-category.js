'use strict';
const categorias = require('../../data/categories.json');
const categories= categorias.map(({name,createdAt})=>{
  return {
    name,
    createdAt
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Categories', categories, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Categories', null, {});
    
  }
};