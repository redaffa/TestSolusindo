"use strict"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const data = [
            {
                name: "Kevin",
                score: 80,
                emotion: "Happy",
                created: "2020-02-20",
            },
            { name: "Josh", score: 90, emotion: "Sad", created: "2020-02-20" },
            {
                name: "Kevin",
                score: 85,
                emotion: "Happy",
                created: "2020-02-20",
            },
            { name: "Kevin", score: 75, emotion: "Sad", created: "2020-02-20" },
            {
                name: "Josh",
                score: 65,
                emotion: "Angry",
                created: "2020-02-20",
            },
            {
                name: "David",
                score: 85,
                emotion: "Happy",
                created: "2020-02-21",
            },
            { name: "Josh", score: 90, emotion: "Sad", created: "2020-02-21" },
            { name: "David", score: 75, emotion: "Sad", created: "2020-02-21" },
            { name: "Josh", score: 85, emotion: "Sad", created: "2020-02-21" },
            {
                name: "Josh",
                score: 70,
                emotion: "Happy",
                created: "2020-02-21",
            },
            {
                name: "Kevin",
                score: 80,
                emotion: "Sad",
                created: "2020-02-21",
            },
            {
                name: "Kevin",
                score: 73,
                emotion: "Sad",
                created: "2020-02-22",
            },
            {
                name: "Kevin",
                score: 75,
                emotion: "Angry",
                created: "2020-02-22",
            },
            {
                name: "David",
                score: 82,
                emotion: "Sad",
                created: "2020-02-22",
            },
            {
                name: "David",
                score: 65,
                emotion: "Sad",
                created: "2020-02-22",
            },
        ]
        const userDataWithDate = data.map((el) => {
            el.createdAt = new Date()
            el.updatedAt = new Date()
            return el
        })
        await queryInterface.bulkInsert("UsersWithScores", userDataWithDate)
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("UsersWithScores")
    },
}
