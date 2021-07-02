// user_vacations
const Sequelize = require('sequelize');
const sequelize = require('../utils/databse')

const UserVacations = sequelize.define('user_vacations', {
    userId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
    },
    vacationId: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        primaryKey: true,
    },
});
module.exports = UserVacations;




