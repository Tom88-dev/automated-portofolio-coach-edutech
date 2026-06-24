const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    projectName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    projectUrl: {
      type: DataTypes.STRING,
    },

    description: {
      type: DataTypes.TEXT,
    },

    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Project;