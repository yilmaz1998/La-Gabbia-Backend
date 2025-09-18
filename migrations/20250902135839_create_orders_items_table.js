/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("order_items", (table) => {
        table.increments("id").primary();
        table.integer("order_id").unsigned().references("id").inTable("orders").onDelete("CASCADE");
        table.integer("menu_item_id").unsigned().references("id").inTable("menu_items").onDelete("CASCADE");
        table.integer("quantity").notNullable().defaultTo(1);
        table.decimal("price", 10, 2).notNullable();
        table.string("instruction");
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("order_items");
};
