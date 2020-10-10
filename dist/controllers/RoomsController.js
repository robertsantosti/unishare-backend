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
const Helpers_1 = __importDefault(require("../managers/Helpers"));
const Room_1 = __importDefault(require("../models/Room"));
class RoomsController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const rooms = !request.query
                ? yield Room_1.default.get()
                : yield Room_1.default.get(request.query);
            return response.json({
                message: `${rooms.length} de quartos encontrados.`,
                data: rooms
            });
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield Room_1.default.find(parseInt(request.params.room_id));
            if (!room) {
                return response.json({
                    message: `Quarto #${request.params.room_id} não encontrado.`,
                    data: null
                });
            }
            return response.json({
                message: `Quarto ${room.id} encotrado com sucesso`,
                data: room
            });
        });
    }
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, city, location, value, description, pictures } = request.body;
            if (yield Room_1.default.exists({ city, location })) {
                return response.status(200).json({
                    message: `Quarto ${location + city} já se encontra cadastrado.`,
                    data: null
                });
            }
            const data = {
                title,
                city,
                location,
                value,
                description,
                pictures: pictures.toString(),
            };
            const room = yield Room_1.default.store(data);
            if (!room) {
                return false;
            }
            return response.json({
                message: `Quarto criado com sucesso`,
                data: room
            });
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = Room_1.default.find(parseInt(request.params.room_id));
            if (!room) {
                return response.status(404).json({
                    message: `Quarto não cadastrado na base de dados`,
                    data: null
                });
            }
            const success = yield Room_1.default.update(parseInt(request.params.room_id), request.body);
            if (!success) {
                return response.status(500).json({
                    message: `Operação não pode ser realizada`,
                    data: null
                });
            }
            return response.status(200).json({
                message: `Quarto atualizado com sucesso`,
                data: Helpers_1.default.first(success)
            });
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield Room_1.default.destroy(parseInt(request.params.room_id));
            if (!room) {
                return response.status(404).json({
                    message: `Quarto não cadastrado na base de dados`,
                    data: null
                });
            }
            return response.json({
                message: `Quarto ${request.params.room_id} excluido com sucesso`,
                data: null
            });
        });
    }
}
exports.default = RoomsController;
