'use strict';
const fs = require('fs').promises;
const path = require('path');

class Gened {
    async find(criteria = () => true){
        const genedPath = path.join(__dirname, 'gened.json');
        return JSON.parse(await fs.readFile(genedPath, 'utf8')).filter(criteria);
    }
}
module.exports = new Gened();
