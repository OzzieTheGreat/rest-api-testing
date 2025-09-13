'use strict';

module.exports = [
    {
        method: 'GET',
        path: '/gened/{gened_category_code}',
        handler: (request, h) => {
            return request.params.gened_category_code;
        }
    }
];
