
var mysql = require("mysql2");
const Sequelize = require('sequelize');

const sequelize = new Sequelize('vication_project', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;
