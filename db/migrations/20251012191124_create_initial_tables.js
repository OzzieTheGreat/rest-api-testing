/**
 * @param { import("knex").Knex } knex
 */
exports.up = async function(knex) {
    await knex.raw('CREATE SCHEMA IF NOT EXISTS "molloyEats";');
    return knex.schema
        .withSchema('molloyEats')
        .createTable('menu', (table) => {
            table.increments('id').primary(); 
            table.string('name').notNullable(); 
            table.string('description');
            table.specificType('price', 'numeric(8, 2)').notNullable(); 
        })
        .catch((error) => {
            console.error("Error creating molloyEats.menu table:", error);
        });
};

/**
 * @param { import("knex").Knex } knex
 */
exports.down = function(knex) {
    return knex.schema
        .withSchema('molloyEats')
        .dropTableIfExists('menu')
        .catch((error) => {
            console.error("Error dropping molloyEats.menu table:", error);
            throw error;
        });
};
