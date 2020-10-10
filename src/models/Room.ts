import knex from "../database/connection";
import RoomInterface from "../interfaces/Room";
import Helpers from "../managers/Helpers";

const table = "rooms";

export default class Room {
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

  static async store(data: RoomInterface) {
    const room = await knex(table)
      .insert(data)
      .returning("*");

    return Helpers.first(room);
  }

  static async update(id: number, data: Object) {
    const room = await this.find(id);

    if (!room) {
      return false;
    }

    return await knex
      .table(table)
      .where({ id: room.id })
      .update(data, [
        "title",
        "city",
        "location",
        "value",
        "description",
        "pictures"
      ]);
  }

  static async destroy(id: number) {
    const room = await this.find(id);

    return await knex
      .table(table)
      .where({ id: room.id })
      .del();
  }

  static async exists(data: Object) {
    const type = await knex(table)
      .where(data)
      .first();

    return type != null;
  }
}
