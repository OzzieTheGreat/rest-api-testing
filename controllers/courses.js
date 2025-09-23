'use strict'
const coursesServices = require('../services/courses.js')

class CourseController{
    getCoursesBySubject(request) {
        const subject = request.params.subject;
        const result = coursesServices.getCoursesBySubject(subject);
        return JSON.stringify(result);
    }
    getGenEdCoursesByCategory(request){
        const genedCategoryCode = request.params.gened_category_code;
        const result = coursesServices.getCoursesByGenEdCategory(genedCategoryCode);
        return JSON.stringify(result);
    }
}
module.exports = new CourseController();