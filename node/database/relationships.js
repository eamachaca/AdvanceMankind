const Address = require('./models/Address');
const Street = require('./models/Street');
const City = require('./models/City');
const State = require('./models/State');
const Lecturer = require("./models/Lecturer");
const Graduate = require("./models/Graduate");
const Degree = require("./models/Degree");
const Book = require("./models/Book");
const Lecture = require("./models/Lecture");


Address.hasOne(Lecturer, {as: "lecturer"});

Lecturer.belongsTo(Address, {as: "address"});

Street.hasMany(Address, {
    as: "addresses",
    foreignKey: "street_id"
});

Address.belongsTo(Street, {as: "street"});

State.hasMany(Address, {
    as: "addresses",
    foreignKey: "state_id"
});

Address.belongsTo(State, {as: "state"});

City.hasMany(Address, {
    as: "addresses",
    foreignKey: "city_id"
});

Address.belongsTo(City, {as: "city"});

Degree.belongsToMany(Lecturer, {through: Graduate});
Lecturer.belongsToMany(Degree, {through: Graduate});
Book.belongsToMany(Lecturer, {through: Lecture});
Lecturer.belongsToMany(Book, {through: Lecture});