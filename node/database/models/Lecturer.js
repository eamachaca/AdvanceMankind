const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db')

class Lecturer extends Model {
}

Lecturer.init({
    name: DataTypes.STRING,
    phone_number: DataTypes.STRING,
    email: DataTypes.STRING,
    birthdate: DataTypes.DATEONLY,
}, {
    sequelize,
    modelName: 'lecturers'
})

module.exports = Lecturer;