import Knex from "knex";
const table = "user_rooms";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, t => {
    t.bigIncrements("id").notNullable();
    t.bigInteger("user_id").notNullable();
    t.foreign("user_id")
      .references("id")
      .inTable("users");
    t.bigInteger("room_id").notNullable();
    t.foreign("room_id")
      .references("id")
      .inTable("rooms");
    t.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}
