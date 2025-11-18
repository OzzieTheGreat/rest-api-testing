'use strict';

const coursesModel = require('../models/courses');
const genedModel = require('../models/gened');

class CourseServices {
    async getCoursesBySubject(subject, filterStatus) {
        const subjectCriteria = (course) => 
            course.course_code.startsWith(subject.toUpperCase());
        let courses = await coursesModel.find(subjectCriteria);

        if (filterStatus) {
            const lowerCaseStatus = filterStatus.toLowerCase(); 
            courses = courses.filter(course => 
                course.status.toLowerCase() === lowerCaseStatus
            );
        }
        return courses;
    }

    async getCoursesByGenEdCategory(category, filterStatus) {
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
        
        let allCoursesCriteria = (course) => true;
        
        if (filterStatus) {
            const lowerCaseStatus = filterStatus.toLowerCase();
            allCoursesCriteria = (course) => 
                course.status.toLowerCase() === lowerCaseStatus;
        } else {
             allCoursesCriteria = (course) => 
                course.status === 'Open' || course.status === 'Full';
        }
        
        const availableCourses = await coursesModel.find(allCoursesCriteria);
        const availableCourseNames = new Set(
            availableCourses.map((course) => course.course_code.substring(0, course.course_code.lastIndexOf(' ')))
        );
        return allRequiredCourseNames.filter((courseName) =>
            availableCourseNames.has(courseName)
        );
    }
}
module.exports = new CourseServices();
