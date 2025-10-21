const fs = require('fs');
const path = require('path');

/**
 * @param { import("knex").Knex } knex
 */
exports.seed = async function(knex) {
  const jsonFilePath = path.join(__dirname, 'menu.json');

  const fileContents = fs.readFileSync(jsonFilePath, 'utf8');

  const menuData = JSON.parse(fileContents);

  await knex('molloyEats.menu').del(); 

  return knex('molloyEats.menu').insert(menuData);
};
