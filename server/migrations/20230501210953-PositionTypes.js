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

    return queryInterface.bulkInsert('PositionTypes', [
        {
          "title": "Director",
          "level": 0
        },
        {
          "title": "Senior Manager",
          "level": 1
        },
        {
          "title": "Manager",
          "level": 2
        },
        {
          "title": "Senior Developer",
          "level": 3
        },
        {
          "title": "Junior Developer",
          "level": 4
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
