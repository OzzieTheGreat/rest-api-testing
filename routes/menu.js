const Joi = require('@hapi/joi');
const MenuController = require('../controllers/menu');
const ADMIN_AUTH_CONFIG = {
    strategy: 'jwt',
    scope: ['admin']
};

const handlerWithCredentials = async (request, h, controllerMethod) => {
  try {
      const result = await controllerMethod(request, h);
      if (request.auth.isAuthenticated) {
          return {
              result: result,
              authenticatedUser: request.auth.credentials
          };
      }
      return result;
      
  } catch (error) {
      console.error('CRASH IN HANDLER WITH CREDENTIALS:', error.stack || error);
      if (error.isBoom) {
          return h.response(error.output.payload).code(error.output.statusCode);
      }
      return h.response({
          statusCode: 500,
          error: 'Internal Server Error',
          message: 'A critical error occurred while processing the request.'
      }).code(500);
  }
};


module.exports = [
  {
    method: 'GET',
    path: '/menu',
    handler: (request, h) => handlerWithCredentials(request, h, MenuController.getMenu),
    options: {
      auth: {
        strategy: 'jwt',
        mode: 'optional'
      },
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
    handler: (request, h) => handlerWithCredentials(request, h, MenuController.addItem),
    options: {
      auth: ADMIN_AUTH_CONFIG,
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
    handler: (request, h) => handlerWithCredentials(request, h, MenuController.removeItem), 
    options: {
      auth: ADMIN_AUTH_CONFIG,
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
    handler: (request, h) => handlerWithCredentials(request, h, MenuController.updateItem),
    options: {
      auth: ADMIN_AUTH_CONFIG,
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
