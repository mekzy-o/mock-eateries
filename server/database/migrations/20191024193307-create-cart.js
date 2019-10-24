module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => queryInterface.createTable('Carts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      recipeId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      recipeCount: {
        type: Sequelize.INTEGER,
      },
      createdBy: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Carts'),
};
