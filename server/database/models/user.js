module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        required: true,
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isAdmin: {
        defaultValue: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {},
  );
  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Categories, {
      foreignKey: 'createdBy',
      as: 'usercategories',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
    User.hasMany(models.Recipes, {
      foreignKey: 'createdBy',
      as: 'recipes',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return User;
};
