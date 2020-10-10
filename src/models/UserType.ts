import knex from "../database/connection";
import UserTypeInterface from "../interfaces/UserType";
import Helpers from "../managers/Helpers";

const table = "user_types";

export default class UserType {
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

  static async store(data: UserTypeInterface) {
    const type = await knex(table)
      .insert(data)
      .returning("*");

    return Helpers.first(type);
  }

  static async update(id: number, data: Object) {
    const type = await this.find(id);

    if (!type) {
      return false;
    }

    return await knex
      .table(table)
      .where({ id: type.id })
      .update(data, ["id", "name", "active"]);
  }

  static async destroy(id: number) {
    const type = await this.find(id);

    return await knex
      .table(table)
      .where({ id: type.id })
      .del();
  }

  static async exists(data: Object) {
    const type = await knex(table)
      .where(data)
      .first();

    return type != null;
  }
}
