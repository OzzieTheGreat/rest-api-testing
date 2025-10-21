const MenuServices = require('../services/menu'); 

class MenuController {
  static async getMenu(request, h) {
    try {
      const name = request.query.name; 
      const menuItems = await MenuServices.getMenu(name);
      return h.response(menuItems).code(200);

    } catch (error) {
      console.error('Error fetching menu:', error);
      return h.response({ 
        statusCode: 500, 
        error: 'Internal Server Error',
        message: 'Could not fetch menu items.' 
      }).code(500);
    }
  }

  static async addItem(request, h) {
    const { name, price, description } = request.payload;

    try {
      const result = await MenuServices.addItem(name, price, description);
      if (result === false) {
        return h.response({ 
          statusCode: 409, 
          error: 'Conflict',
          message: `A menu item with the name '${name}' already exists (case-insensitive check).` 
        }).code(409);

      } 
      else {
        return h.response(result).code(201);
      }
      
    } catch (error) {
      console.error('Error adding new menu item:', error);
      return h.response({ 
        statusCode: 500, 
        error: 'Internal Server Error',
        message: 'Could not add the menu item due to a server error.' 
      }).code(500);
    }
  }
  static async removeItem(request, h) {
    const { name } = request.payload;
    try {
      const deletedCount = await MenuServices.removeItem(name);
      if (deletedCount === 0) {
        return h.response({ 
          statusCode: 404, 
          error: 'Not Found',
          message: `Error: An item with the name '${name}' does not exist.` 
        }).code(404);

      } else {
        return h.response({
            statusCode: 200,
            message: `${deletedCount} row(s) removed successfully.`
        }).code(200);
      }
      
    } catch (error) {
      console.error('Error removing menu item:', error);
      return h.response({ 
        statusCode: 500, 
        error: 'Internal Server Error',
        message: 'Could not remove the menu item due to a server error.' 
      }).code(500);
    }
  }
  static async updateItem(request, h) {
    const { name, price, description, newName } = request.payload;
    try {
      const updatedCount = await MenuServices.updateItem(name, price, description, newName);
      if (updatedCount === 0) {
        return h.response({ 
          statusCode: 404, 
          error: 'Not Found',
          message: `Error: An item with the name '${name}' does not exist and could not be updated.` 
        }).code(404);

      } else {
        return h.response({
            statusCode: 200,
            message: `${updatedCount} row(s) updated successfully.`
        }).code(200);
      }
      
    } catch (error) {
      console.error('Error updating menu item:', error);
      return h.response({ 
        statusCode: 500, 
        error: 'Internal Server Error',
        message: 'Could not update the menu item due to a server error.' 
      }).code(500);
    }
  }
}
module.exports = MenuController;
