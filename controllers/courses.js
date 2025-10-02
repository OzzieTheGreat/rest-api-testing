'use strict'
const coursesServices = require('../services/courses.js')

class CourseController{
    async getCoursesBySubject(request) {
        const subject = request.params.subject;
        const result = await coursesServices.getCoursesBySubject(subject);
        return JSON.stringify(result);
    }
    async getGenEdCoursesByCategory(request){
        const genedCategoryCode = request.params.gened_category_code;
        const result = await coursesServices.getCoursesByGenEdCategory(genedCategoryCode);
        return JSON.stringify(result);
    }
}
module.exports = new CourseController();
