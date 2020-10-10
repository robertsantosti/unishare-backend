import knex from "../database/connection";
import UserInterface from "../interfaces/User";
import Helpers from "../managers/Helpers";

const table = "users";

export default class User {
  static async get(condition: any = null) {
    if (condition) {
      return await knex(table)
        .where(condition)
        .select("*");
    }

    return await knex(table).select(["*"]);
  }

  static async find(id: number) {
    return await knex(table)
      .where("id", id)
      .first();
  }

  static async store(data: UserInterface) {
    const user = await knex(table)
      .insert(data)
      .returning("*");

    return Helpers.first(user);
  }

  static async update(id: number, data: Object) {
    const user = await this.find(id);

    if (!user) {
      return false;
    }

    return await knex
      .table(table)
      .where({ id: user.id })
      .update(data, [
        "id",
        "name",
        "email",
        "birthdate",
        "type",
        "phone",
        "bio",
        "avatar"
      ]);
  }

  static async destroy(id: number) {
    const user = await this.find(id);

    return await knex
      .table(table)
      .where({ id: user.id })
      .del();
  }

  static async exists(data: Object) {
    const type = await knex(table)
      .where(data)
      .first();

    return type != null;
  }
}
