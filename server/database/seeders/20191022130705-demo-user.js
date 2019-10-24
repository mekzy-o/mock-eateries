import { config } from 'dotenv';
import Helper from '../../utils/helpers';

config();

const password = Helper.hashPassword(process.env.password);

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    id: 'ffe25dbe-29ea-4759-8461-ed116f6739dd',
    name: 'mekzy',
    email: 'admin@eatery.com',
    password: `${password}`,
    isAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};
