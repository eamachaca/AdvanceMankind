const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db')

class State extends Model {
}

State.init({
    name: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'states'
})

module.exports = State;