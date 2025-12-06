'use strict';

const coursesController = require('../controllers/courses.js');
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
        path: '/courses/{subject}',
        handler: (request, h) => handlerWithCredentials(request, h, coursesController.getCoursesBySubject),
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional'
            }
        }
    },
    {
        method: 'GET',
        path: '/courses/credits/{number}',
        handler: (request, h) => handlerWithCredentials(request, h, coursesController.getGenEdCoursesByCategory),
        options: {
            auth: {
                strategy: 'jwt',
                mode: 'optional'
            }
        }
    }
];
