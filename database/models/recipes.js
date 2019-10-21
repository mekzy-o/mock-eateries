module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define(
    'Recipes',
    {
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recipeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Ingredients: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [],
      },
      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {},
  );
  Recipes.associate = (models) => {
    // associations can be defined here
    Recipes.belongsTo(models.Users, {
      foreignKey: 'createdBy',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Recipes.belongsTo(models.Categories, {
      foreignKey: 'category',
      as: 'categoryName',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Recipes;
};
