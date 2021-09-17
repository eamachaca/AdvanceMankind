const {Sequelize} = require('sequelize');
const {database} = require('../config/app');

const sequelize = new Sequelize(
    database.database,
    database.username,
    database.password,
    {
        host: database.host,
        dialect: 'mysql',
        port: database.port,
        define: {
            underscored: true,
            paranoid: true
        },
    }
);
module.exports = sequelize;