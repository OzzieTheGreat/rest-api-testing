'use strict';

const coursesModel = require('../models/courses');
const genedModel = require('../models/gened');

class CourseServices {
    async getCoursesBySubject(subject) {
        const criteria = (course) => course.course_code.startsWith(subject);
        return await coursesModel.find(criteria);
    }

    async getCoursesByGenEdCategory(category) {
        const genedCourses = await genedModel.find(
            (genedCourse) => genedCourse.code === category
        );
        const availableCourses = await coursesModel.find(
            (course) => course.status === 'Open' || course.status === 'Full'
        );
        const availableCourseCodes = new Set(
            availableCourses.map((course) => course.course_code)
        );
        return genedCourses.filter((genedCourse) =>
            availableCourseCodes.has(genedCourse.code)
        );
    }
}

module.exports = new CourseServices();
