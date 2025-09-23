'use strict'
const fs = require('fs').promises;
const path = require('path');

class gened {
    async find(criteria = () => true){
        const genedPath = path.join(__dirname, 'gened.json');
        const data = await fs.readFile(genedPath, 'utf8');
        const gened = JSON.parse(data);
        return gened.filter(criteria);
    }
}
module.exports = new gened();