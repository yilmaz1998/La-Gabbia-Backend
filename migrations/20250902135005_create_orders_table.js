/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("orders", function(table) {
        table.increments("id").primary();
        table.string("customer_name").notNullable();
        table.string("customer_address").notNullable();
        table.string("customer_phone").notNullable();
        table.decimal("total_price", 10, 2).notNullable().defaultTo(0);
        table.string("status").notNullable().defaultTo("pending");
        table.timestamps(true, true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists("orders");
};
