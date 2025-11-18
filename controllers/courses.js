'use strict'
const coursesServices = require('../services/courses.js')

class CourseController{
    async getCoursesBySubject(request) {
        const subject = request.params.subject;
        const status = request.query.status;
        const result = await coursesServices.getCoursesBySubject(subject, status);
        return JSON.stringify(result);
    }
    async getGenEdCoursesByCategory(request){
        const genedCategoryCode = request.params.gened_category_code;
        const status = request.query.status;
        const result = await coursesServices.getCoursesByGenEdCategory(genedCategoryCode, status);
        return JSON.stringify(result);
    }
}
module.exports = new CourseController();
