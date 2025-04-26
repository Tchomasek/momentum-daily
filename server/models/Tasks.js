module.exports = (sequelize, DataTypes) => {
  const Tasks = sequelize.define("Tasks", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Tasks;
};
