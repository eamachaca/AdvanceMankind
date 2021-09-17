const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db')

class Degree extends Model {
}

Degree.init({
    name: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'degrees'
})

module.exports = Degree;