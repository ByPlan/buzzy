"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Place extends Model {
    static associate(models) {
      models.Place.belongsTo(models.Meeting, {
        foreignKey: "meetingId",
      });
      models.Place.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
    }
  }
  Place.init(
    {
      name: DataTypes.STRING,
      coord: DataTypes.GEOMETRY,
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Place",
    }
  );
  return Place;
};
