'use strict';

const coursesController = require('../controllers/courses');
module.exports = [
    {
        method: 'GET',
        path: '/gened/{gened_category_code}',
        handler: coursesController.getGenEdCoursesByCategory
    }
];
