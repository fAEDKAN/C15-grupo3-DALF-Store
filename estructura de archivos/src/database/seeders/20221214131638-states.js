'use strict';
const estados = [
  {
    id:1,
    state:"pendiente"
  },{
    id:2,
    state:"finalizado"
  },{
    id:3,
    state:"cancelado"
  }
]
const states= estados.map(({state})=>{
  return {
    state,
    createdAt : new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('States', states, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('States', null, state)
    
  }
};