import * as Knex from "knex";
const table = "user_types";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, t => {
    t.bigIncrements("id").notNullable();
    t.string("name").notNullable();
    t.string("description");
    t.boolean("active")
      .defaultTo(true)
      .notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}
