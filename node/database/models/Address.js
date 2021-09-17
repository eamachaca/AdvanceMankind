const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db')

class Address extends Model {
}

Address.init({
    number: DataTypes.INTEGER,
}, {
    sequelize,
    modelName: 'addresses'
})

module.exports = Address;