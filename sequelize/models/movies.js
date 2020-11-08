/* jshint indent: 2 */

const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('movies', {
    movieId: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: true,
      primaryKey: true
    },
    imdbId: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    overview: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    productionCompanies: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    releaseDate: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    budget: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    revenue: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    runtime: {
      type: DataTypes.REAL,
      allowNull: true
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    genres: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'movies',
    timestamps: false
  });
};
