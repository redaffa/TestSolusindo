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
   await queryInterface.sequelize.query(`CREATE OR REPLACE FUNCTION get_user_by_username(
    username_ varchar
)
RETURNS SETOF "Users" AS
$$
BEGIN
	RETURN query SELECT * From "Users" where username = username_;
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
    await queryInterface.sequelize.query(`drop function if exists get_user_by_username`)
  }
};
