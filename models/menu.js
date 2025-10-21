const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');
const knex = Knex(knexConfig.development);
Model.knex(knex);

class Menu extends Model {
  static get tableName() {
    return 'molloyEats.menu';
  }
  static get idColumn() {
    return 'id'; 
  }
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'price'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        description: { type: ['string', 'null'], maxLength: 1000 },
        price: { type: ['number', 'string'] } 
      }
    };
  }
}
module.exports = Menu;
