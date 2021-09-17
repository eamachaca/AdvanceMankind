const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db')

class Lecture extends Model {
}

Lecture.init({
}, {
    sequelize,
    modelName: 'lectures'
})

module.exports = Lecture;