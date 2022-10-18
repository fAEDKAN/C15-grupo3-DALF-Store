'use strict';
const roles = [
  {
    id:1,
    name:"admin"
  },{
    id:2,
    name:"user"
  }
]
const role= roles.map(({name})=>{
  return {
    name,
    createdAt : new Date()
  }
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('Rols', role, {});
    
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.bulkDelete('Rols', null, {});
    
  }
};
