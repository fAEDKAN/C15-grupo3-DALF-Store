'use strict';
const seccion = [
  {
    id: 1,
    name: "Ofertas"
  }, {
    id: 2,
    name: "Recomendados"
  }, {
    id: 3,
    name: "Novedades"
  }
]
const section = seccion.map(({ name }) => {
  return {
    name,
    createdAt: new Date()
  }
})
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Sections', section, {});

  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete('Sections', null, {});

  }
};
