'use strict';
const fs = require('fs').promises;
const path = require('path');

class Courses {
    async find(criteria = () => true) {
        const coursesPath = path.join(__dirname, 'courses.json');
        return JSON.parse(await fs.readFile(coursesPath,'utf8')).filter(criteria);      
    }
}
module.exports = new Courses();
