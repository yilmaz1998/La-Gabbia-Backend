/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("menu_items", function(table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.float("price").notNullable();
    table.string("image_url");
    table.text("description");
    table.string("type");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
