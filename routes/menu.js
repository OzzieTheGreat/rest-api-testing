const Joi = require('@hapi/joi');
const MenuController = require('../controllers/menu'); 
/**
 * An array of route objects for menu-related requests.
 * @type {Array<object>}
 */
module.exports = [
  {
    method: 'GET',
    path: '/menu',
    handler: MenuController.getMenu,
    options: {
      validate: {
        query: Joi.object({
          name: Joi.string().optional()
        })
      }
    }
  },

  {
    method: 'POST',
    path: '/menu/add', 
    handler: MenuController.addItem, 
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(), 
          price: Joi.number().required(), 
          description: Joi.string().optional().allow(null, '') 
        })
      }
    }
  },

  {
    method: 'DELETE',
    path: '/menu/remove', 
    handler: MenuController.removeItem, 
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required()
        })
      }
    }
  },

  {
    method: 'PUT',
    path: '/menu/update',
    handler: MenuController.updateItem,
    options: {
      validate: {
        payload: Joi.object({
          name: Joi.string().required(),
          price: Joi.number().optional(), 
          description: Joi.string().optional().allow(null, ''),
          newName: Joi.string().optional()
        })
        .or('price', 'description', 'newName') 
      }
    }
  }
];
