'use strict';

const coursesController = require('../controllers/courses');
const handlerWithCredentials = async (request, h, controllerMethod) => {
    const result = await controllerMethod(request, h);
    if (request.auth.isAuthenticated) {
        return {
            result: result,
            authenticatedUser: request.auth.credentials
        };
    }
    return result;
};


module.exports = [
    {
        method: 'GET',
        path: '/gened/{gened_category_code}',
        handler: (request, h) => handlerWithCredentials(request, h, coursesController.getGenEdCoursesByCategory),
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional'
            }
        }
    }
];
