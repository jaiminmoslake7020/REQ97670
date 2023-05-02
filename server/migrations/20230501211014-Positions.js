'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return queryInterface.bulkInsert('Positions', [
        {
          "title": "Director",
          "positionTypeId": 1
        },
        {
          "title": "Senior Manager",
          "positionTypeId": 2
        },
        {
          "title": "Manager",
          "positionTypeId": 3
        },
        {
          "title": "Senior Developer",
          "positionTypeId": 4
        },
        {
          "title": "Junior Developer",
          "positionTypeId": 5
        }
      ]
    );


  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
