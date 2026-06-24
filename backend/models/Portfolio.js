const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Portfolio = sequelize.define('Portfolio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    generatedTitle: {
        type: DataTypes.STRING
    },

    summary: {
        type: DataTypes.TEXT
    },

    skillsList: {
        type: DataTypes.TEXT
    },

    projectHighlights: {
        type: DataTypes.TEXT
    }

}, {
    timestamps: true
});

module.exports = Portfolio;