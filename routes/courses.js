'use strict';

const Joi = require('@hapi/joi')
const Joi = require('joi')
const coursesController = require('../controllers/courses.js');
module.exports = [
    {
        method: 'GET',
        path: '/courses/{subject}',
        handler: coursesController.getCoursesBySubject     
    },
    {
        method: 'GET',
        path: '/courses/credits/{number}',
        handler: coursesController.getCoursesbySubject
        
    },
    {
        method: 'GET',
        path: '/courses/credits/{number}',
        handler: coursesController.getGenEdCoursesByCategory
    }
];
