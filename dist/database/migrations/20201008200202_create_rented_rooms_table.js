"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const table = "rented_rooms";
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex.schema.dropTable(table);
    });
}
exports.down = down;
