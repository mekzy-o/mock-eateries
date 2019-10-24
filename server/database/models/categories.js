module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define('Categories', {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  }, {});
  Categories.associate = (models) => {
    // associations can be defined here
    Categories.hasMany(models.Recipes, {
      foreignKey: 'categoryId',
      as: 'recipes',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    Categories.belongsTo(models.User, {
      foreignKey: 'createdBy',
      as: 'user',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Categories;
};
