import Knex from "knex";
const table = "users";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, t => {
    t.bigIncrements("id").notNullable();
    t.string("name").notNullable();
    t.string("email").notNullable();
    t.string("password").notNullable();
    t.date("birthdate").notNullable();
    t.integer("type")
      .defaultTo(1)
      .notNullable();
    t.string("phone");
    t.string("bio");
    t.string("avatar");
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}
