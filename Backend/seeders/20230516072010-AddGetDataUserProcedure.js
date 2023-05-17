'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.sequelize.query(`CREATE OR REPLACE FUNCTION register_user(
    username varchar,
    password VARCHAR,
    age integer
)
RETURNS VOID AS
$$
BEGIN
    INSERT INTO "Users" ("username" , "password",age , "createdAt","updatedAt")
    VALUES (username ,"password",age, NOW() , NOW());
END;
$$
LANGUAGE plpgsql;`)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.sequelize.query(`DROP FUNCTION IF EXISTS register_user`)
  }
};
