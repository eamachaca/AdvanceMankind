const express = require('express');
const router = express.Router();
const Lecturer = require('../database/models/Lecturer');
const Address = require("../database/models/Address");
const City = require("../database/models/City");
const State = require("../database/models/State");
const Street = require("../database/models/Street");
const Degree = require("../database/models/Degree");
const Book = require("../database/models/Book");

router.get('/', (request, response) => {
    response.send('Test DeIt0');
})

/*
**Lecturer
 */

function getDegreesCollection(degrees) {
    const retDegress = [];
    for (let degree of degrees) {
        retDegress.push({name: degree});
    }
    return retDegress;
}

function getLecturesCollection(lectures) {
    const retLectures = [];
    for (let lecture of lectures) {
        retLectures.push({name: lecture});
    }
    return retLectures;
}

router.post('/lecturers', (request, response) => {
    Lecturer.create({
        name: request.body.name,
        phone_number: request.body.phone_number,
        birthdate: request.body.birthdate,
        email: request.body.email,
        address: {
            number: request.body.house_number,
            city: {
                name: request.body.city_name,
            },
            state: {
                name: request.body.state_name,
            },
            street: {
                name: request.body.street_name,
            }
        },
        degrees: getDegreesCollection(request.body.degrees),
        books: getLecturesCollection(request.body.lectures)
    }, {
        include: [
            {
                model: Address,
                as: 'address',
                duplicating: false,
                include: ['city', 'state', 'street']//It has duplicating data, but I don't know how to solve it. It was my best (at the moment)
            },
            {
                model: Degree,//similar case, i don't know how to apply ignoreDuplicates and if it's to that
                as: 'degrees',
                duplicating: false,
            },
            {
                model: Book,//similar case, i don't know how to apply ignoreDuplicates and if it's to that
                as: 'books',
                duplicating: false,
            }]
    }).then(post => response.json(post));
});

router.get('/lecturers', (request, response) => {
    Lecturer.findAll({
        include: [{
            model: Address,
            as: "address",
            attributes: ['number'],
            include: [{
                model: City,
                as: "city",
                attributes: ['name']
            }, {
                model: State,
                as: "state",
                attributes: ['name']
            }, {
                model: Street,
                as: "street",
                attributes: ['name']
            }]
        }, {
            model: Book,
            as: "books",
            attributes: ['name'],
        }, {
            model: Degree,
            as: "degrees",
            attributes: ['name'],
        }],
        where: {
            deleted_at: null
        },
        attributes: ['id', 'name', 'phone_number', 'email', 'birthdate']
    }).then(posts => {
        for (let post of posts) {
            delete post.address
        }
        return response.json(posts)
    });
});

function whereHelper(name, value) {
    if (value)
        return {[name]: value};
    return null;
}

function whereObjectHelper(notDeleted, params) {
    let where = {};
    if (notDeleted)
        where = {'deleted_at': null};
    for (const paramsKey in params) {
        const value = params[paramsKey];
        if (value)
            where[paramsKey] = value;
    }
    return where;
}

function whereArrayHelper(name, arrays) {
    if (arrays && arrays.length > 0)
        return {
            [name]: {
                [Op.in]: arrays
            }
        };
    return null;
}

router.post('/lecturers/search', (request, response) => {
    Lecturer.findAll({
        include: [{
            model: Address,
            required: true,
            as: "address",
            attributes: ['number'],
            include: [{
                model: City,
                required: true,
                as: "city",
                attributes: ['name'],
                where: whereHelper('name', request.body.city_name)
            }, {
                model: State,
                required: true,
                as: "state",
                attributes: ['name'],
                where: whereHelper('name', request.body.state_name)
            }, {
                model: Street,
                required: true,
                as: "street",
                attributes: ['name'],
                where: whereHelper('name', request.body.street_name)
            }]
        }, {
            model: Book,
            required: true,//to apply inner join
            as: "books",
            attributes: ['name'],
            where: whereArrayHelper('name', request.body.lectures)
        }, {
            model: Degree,
            required: true,
            as: "degrees",
            attributes: ['name'],
            where: whereArrayHelper('name', request.body.degress)
        }],
        where: whereObjectHelper(true, {
            phone_number: request.body.phone_number,
            email: request.body.email
        }),
        attributes: ['id', 'name', 'phone_number', 'email', 'birthdate']
    }).then(posts => {
        for (let post of posts) {
            delete post.address
        }
        return response.json(posts)
    });
});
router.post('/lecturers/fetch', (request, response) => {
    Lecturer.findAll({
        include: [{
            model: Address,
            required: true,
            as: "address",
            attributes: ['number'],
            include: [{
                model: City,
                required: true,
                as: "city",
                attributes: ['name'],
            }, {
                model: State,
                required: true,
                as: "state",
                attributes: ['name'],
                where: whereHelper('name', request.body.state_name)
            }, {
                model: Street,
                required: true,
                as: "street",
                attributes: ['name'],
                where: whereHelper('name', request.body.street_name)
            }]
        }, {
            model: Book,
            required: true,//to apply inner join
            as: "books",
            attributes: ['name'],
            where: whereHelper('name', request.body.lecture)
        }, {
            model: Degree,
            required: true,
            as: "degrees",
            attributes: ['name'],
            where: whereArrayHelper('name', request.body.degress)
        }],
        where: whereObjectHelper(true, {
            phone_number: request.body.phone_number,
            email: request.body.email
        }),
        attributes: ['id', 'name', 'phone_number', 'email', 'birthdate']
    }).then(posts => {
        return response.json(posts.length)
    });
});


router.get('/lecturers/:id', (request, response) => {
    Lecturer.findByPk(request.params.id).then(post => response.json(post));
});


function updateLecturers(request, response) {
    Lecturer.update({
        name: request.body.name,
        address: request.body.address,
        phone_number: request.body.phone_number,
        birthdate: request.body.birthdate,
        email: request.body.email,
    }, {
        where: {
            id: request.params.id
        }
    }).then(post => response.json(post));
}

router.patch('/lecturers/:id', updateLecturers);
router.put('/lecturers/:id', updateLecturers);

router.delete('/lecturers/:id', (request, response) => {
    Lecturer.destroy({
        where: {
            id: request.params.id
        }
    }).then(result => response.json(result));
});
/*
** Emd Lecturer
 */
module.exports = router;