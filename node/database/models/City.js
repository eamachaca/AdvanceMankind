const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db')

class City extends Model {
}

City.init({
    name: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'cities'
})

module.exports = City;