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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connection_1 = __importDefault(require("../database/connection"));
const Helpers_1 = __importDefault(require("../managers/Helpers"));
const table = "rooms";
class Room {
    static get(condition = null) {
        return __awaiter(this, void 0, void 0, function* () {
            if (condition) {
                return yield connection_1.default(table)
                    .where(condition)
                    .select("*");
            }
            return yield connection_1.default(table).select(["*"]);
        });
    }
    static find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield connection_1.default(table)
                .where("id", id)
                .first();
        });
    }
    static store(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield connection_1.default(table)
                .insert(data)
                .returning("*");
            return Helpers_1.default.first(room);
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.find(id);
            if (!room) {
                return false;
            }
            return yield connection_1.default
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
        });
    }
    static destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield this.find(id);
            return yield connection_1.default
                .table(table)
                .where({ id: room.id })
                .del();
        });
    }
    static exists(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield connection_1.default(table)
                .where(data)
                .first();
            return type != null;
        });
    }
}
exports.default = Room;
