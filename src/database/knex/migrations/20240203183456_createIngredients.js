
exports.up = knex => knex.schema.createTable("ingredientes", table => {
    table.increments("id").primary();
    table.text("ingredientes").notNullable();
    table.integer("food_id").references("id").inTable("foods").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users")


})

exports.down = knex => knex.schema.dropTable("ingredientes")
