const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db')

class Graduate extends Model {
}

Graduate.init({
}, {
    sequelize,
    modelName: 'graduates'
})

module.exports = Graduate;