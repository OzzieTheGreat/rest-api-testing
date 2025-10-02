'use strict';

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
        handler: coursesController.getGenEdCoursesByCategory
    }
];
