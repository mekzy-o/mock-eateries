module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    isAdmin: {
      defaultValue: false,
      type: DataTypes.BOOLEAN,
    },
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
