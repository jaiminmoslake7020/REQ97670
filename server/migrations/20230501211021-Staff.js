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


    return queryInterface.bulkInsert('Staffs',
      [
        {
          "firstName": "Jaimin",
          "lastName": "MosLake"
        },
        {
          "firstName": "Apoorva",
          "lastName": "Sharma"
        },
        {
          "firstName": "Alka",
          "lastName": "Pandya"
        },
        {
          "firstName": "Sagar",
          "lastName": "Shukla"
        },
        {
          "firstName": "Sunny",
          "lastName": "Savaliya"
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
