import * as Knex from "knex";
const table = "user_types";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex(table).del();

  // Inserts seed entries
  await knex(table).insert([
    {
      id: 1,
      name: "Padrão",
      description: "Usuário que procura um quarto para alugar"
    },
    {
      id: 2,
      name: "Locador",
      description: "Usuário que possui um quarto para alugar"
    }
  ]);
}
