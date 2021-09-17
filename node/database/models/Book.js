const {Model, DataTypes} = require('sequelize');
const sequelize = require('../db')

class Book extends Model {
}

Book.init({
    name: DataTypes.STRING,
}, {
    sequelize,
    modelName: 'books'
})

module.exports = Book;