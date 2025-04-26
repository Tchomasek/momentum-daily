module.exports = (sequelize, DataTypes) => {
  const Completions = sequelize.define("Completions", {
    date: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    task: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Completions;
};
