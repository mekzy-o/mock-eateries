module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    category: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    recipeName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Ingredients: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      defaultValue: [],
    },
    createdBy: {
      type: Sequelize.INTEGER,
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
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Recipes'),
};
