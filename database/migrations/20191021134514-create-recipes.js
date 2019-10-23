module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
    .then(() => queryInterface.createTable('Recipes', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()'),
      },
      categoryId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      recipeName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ingredients: {
        type: Sequelize.STRING,
        get() {
          return JSON.parse(this.getDataValue('myArrayField'));
        },
        set(val) {
          return this.setDataValue('myArrayField', JSON.stringify(val));
        },
      },
      createdBy: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Recipes'),
};
