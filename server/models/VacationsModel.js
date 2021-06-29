const Sequelize = require('sequelize');
const sequelize = require('../utils/databse')

const Vacations = sequelize.define('vacations', {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    destination: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    start_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    end_date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    price: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    picture: {
        type: Sequelize.STRING,
        defaultValue:"defult.jpg"
    },
    num_of_followers: {
        type: Sequelize.INTEGER(11),
        defaultValue:0
    },
});
module.exports = Vacations;




