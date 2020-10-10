import * as Knex from "knex";
const table = "rooms";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, t => {
    t.bigIncrements("id").notNullable();
    t.string("title").notNullable();
    t.string("city").notNullable();
    t.string("location").notNullable();
    t.decimal("value").notNullable();
    t.string("description").notNullable();
    t.text("pictures").notNullable();
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}
