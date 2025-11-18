const Menu = require('../models/menu');

class MenuServices {

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

  async removeItem(name) {
    const deletedCount = await Menu.query()
      .where('name', 'ILIKE', name)
      .delete();
    return deletedCount;
  }

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
