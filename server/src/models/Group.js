import { Sequelize } from "sequelize";

module.exports = (sequelize, Sequelize) => {
  const Group = sequelize.define("groups", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    userNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    groupCode: {
      type: Sequelize.UUID,
      allowNull: false,
      unique: true,
    },
  });
  return Group;
};