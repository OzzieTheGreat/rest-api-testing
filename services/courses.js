'use strict';

const coursesModel = require('../models/courses');
const genedModel = require('../models/gened');

class CourseServices {
    async getCoursesBySubject(subject) {
        return await coursesModel.find((course) => course.course_code.startsWith(subject));
    }

    async getCoursesByGenEdCategory(category) {
        const [genedCategory] = await genedModel.find(
            (gened) => gened.category === category
        );
        if(!genedCategory) {
            return [];
        }
        const allRequiredCourseNames = genedCategory.req.flatMap((subcategory) => subcategory.course_code || []
        );
        if (allRequiredCourseNames.length === 0){
            return [];
        }
        const allCourses = await coursesModel.find(
            (course) => course.status === 'Open' || course.status === 'Full'
        );
        const availableCourseNames = new Set(
            allCourses.map((course) => course.course_code.substring(0, course.course_code.lastIndexOf(' ')))
        );
        return allRequiredCourseNames.filter((courseName) =>
            availableCourseNames.has(courseName)
        );
    }
}

module.exports = new CourseServices();
