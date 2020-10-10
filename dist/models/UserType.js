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
const table = "user_types";
class UserType {
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
            const type = yield connection_1.default(table)
                .insert(data)
                .returning("*");
            return Helpers_1.default.first(type);
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield this.find(id);
            if (!type) {
                return false;
            }
            return yield connection_1.default
                .table(table)
                .where({ id: type.id })
                .update(data, ["id", "name", "active"]);
        });
    }
    static destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield this.find(id);
            return yield connection_1.default
                .table(table)
                .where({ id: type.id })
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
exports.default = UserType;
