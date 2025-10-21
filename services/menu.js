const Menu = require('../models/menu');

class MenuServices {

  /**
   * @param {string} name - The search term for item name or description. Defaults to empty string.
   * @returns {Promise<Array<object>>} A promise resolving to an array of menu item rows.
   */
  async getMenu(name = '') {
    const searchPattern = `%${name}%`;

    return await Menu.query()
      .select('name', 'price', 'description')
      .where(builder => {
        if (name === '') {
          return;
        }
        builder.whereILike('name', searchPattern);
        builder.orWhereILike('description', searchPattern);
      });
  }

  //
  /**
   * @param {string} name - Name of the new menu item.
   * @param {number} price - Price of the new menu item.
   * @param {string|null} description - Optional description of the new menu item.
   * @returns {Promise<object|false>} The newly inserted row object, or false if a duplicate name exists.
   */
  async addItem(name, price, description) {
    const existingItem = await Menu.query()
      .where('name', 'ILIKE', name)
      .first();

    if (existingItem) {
      return false;
    }

    const newItem = await Menu.query()
      .insert({
        name: name,
        price: price,
        description: description 
      });
    return newItem;
  }

  //
  /**
   * @param {string} name - Name of the menu item to delete.
   * @returns {Promise<number>} The number of deleted rows.
   */
  async removeItem(name) {
    const deletedCount = await Menu.query()
      .where('name', 'ILIKE', name)
      .delete();
    return deletedCount;
  }
  /**
   * @param {string} name - The current name of the menu item to update.
   * @param {number|undefined} price - The new price, if provided.
   * @param {string|null|undefined} description - The new description, if provided.
   * @param {string|undefined} newName - The new name, if renaming the item.
   * @returns {Promise<number>} The number of updated rows (0 or 1).
   */
  async updateItem(name, price, description, newName) {
    const update = {};

    if (newName !== undefined) {
      update.name = newName; 
    }
    if (price !== undefined) {
      update.price = price;
    }
    if (description !== undefined) {
      update.description = description; 
    }

    const updatedCount = await Menu.query()
      .where('name', 'ILIKE', name) 
      .patch(update);
    return updatedCount;
  }
}
module.exports = new MenuServices();
