"use strict";
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Meeting extends Model {
    static associate(models) {
      models.Meeting.belongsTo(models.Group);
      models.Meeting.belongsToMany(models.Activity, {
        through: "MeetingActivities",
        as: "activities",
        foreignKey: "meetingId",
      });
      models.Meeting.belongsToMany(models.User, {
        through: "UserMeetings",
        as: "users",
        foreignKey: "meetingId",
      });
      models.Meeting.hasMany(models.Place, {
        foreignKey: "meetingId",
      });
      models.Meeting.hasOne(models.Post, {
        foreignKey: "meetingId",
      });
    }
  }
  Meeting.init(
    {
      name: DataTypes.STRING,
      start: DataTypes.DATE,
      end: DataTypes.DATE,
      allDay: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Meeting",
    }
  );
  return Meeting;
};
