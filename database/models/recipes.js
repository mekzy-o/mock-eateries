module.exports = (sequelize, DataTypes) => {
  const Recipes = sequelize.define(
    'Recipes',
    {
      categoryId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      recipeName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ingredients: {
        type: DataTypes.STRING,
        get() {
          return JSON.parse(this.getDataValue('ingredients'));
        },
        set(val) {
          return this.setDataValue('ingredients', JSON.stringify(val));
        },
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    {},
  );
  Recipes.associate = (models) => {
    // associations can be defined here
    // Recipes.belongsTo(models.Users, {
    //   foreignKey: 'createdBy',
    //   as: 'user',
    //   onDelete: 'CASCADE',
    //   onUpdate: 'CASCADE',
    // });
    Recipes.belongsTo(models.Categories, {
      foreignKey: 'categoryId',
      as: 'categories',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Recipes;
};
