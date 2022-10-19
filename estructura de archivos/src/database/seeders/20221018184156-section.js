'use strict';
const seccion = [
  {
    id:1,
    name:"in-sale"
  },{
    id:2,
    name:"recommended"
  },{
    id:3,
    name:"of-users"
  }
]
const section= seccion.map(({name})=>{
  return {
    name,
    createdAt : new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Sections', section, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Sections', null, {});
    
  }
};
