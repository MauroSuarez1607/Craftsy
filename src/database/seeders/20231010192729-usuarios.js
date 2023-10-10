"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Admin",
          surname: "Craftsy",
          email: "admin@gmail.com",
          password:
            "$2a$10$gOF.CmC6znXxOIm1wl7rw.KWOjOqqC3.5bdUGbO1wiF6ywUJ6cdA2",
          image: null,
          roleId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "User",
          surname: "Craftsy",
          email: "user@gmail.com",
          password:
            "$2a$10$gOF.CmC6znXxOIm1wl7rw.KWOjOqqC3.5bdUGbO1wiF6ywUJ6cdA2",
          image: null,
          roleId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
