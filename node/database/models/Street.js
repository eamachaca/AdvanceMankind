const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db')

class Street extends Model {
}

Street.init({
    name: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'streets'
})

module.exports = Street;