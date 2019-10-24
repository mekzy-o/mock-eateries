module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'Cart',
    {
      recipeId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      recipeCount: {
        type: DataTypes.INTEGER,
      },
      createdBy: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    }, {}
);
  Cart.associate = function (models) {
    // associations can be defined here
    Cart.belongsTo(models.Recipes, {
      foreignKey: 'recipeId',
      as: 'cartRecipes',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return Cart;
};
