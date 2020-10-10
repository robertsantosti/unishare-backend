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
const UserType_1 = __importDefault(require("../models/UserType"));
class UserTypesController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const types = !request.query
                ? yield UserType_1.default.get()
                : yield UserType_1.default.get(request.query);
            return response.json({
                message: `${types.length} tipos de usuários encontrados.`,
                data: types
            });
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield UserType_1.default.find(parseInt(request.params.type_id));
            if (!type) {
                return response.json({
                    message: `Tipo de usuario ${request.params.type_id} não encontrado.`,
                    data: null
                });
            }
            return response.json({
                message: `Tipo de usuário encotrado com sucesso`,
                data: type
            });
        });
    }
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = request.body;
            const data = {
                name,
                description
            };
            if (yield UserType_1.default.exists({ name })) {
                return response.status(200).json({
                    message: `Tipo de usuario ${name} já se encontra cadastrado.`,
                    data: null
                });
            }
            const type = yield UserType_1.default.store(data);
            if (!type) {
                return false;
            }
            return response.json({
                message: `Tipo de usuario criado com sucesso`,
                data: type
            });
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield UserType_1.default.find(parseInt(request.params.type_id));
            if (!type) {
                return response.status(404).json({
                    message: `Tipo de usuário não cadastrado na base de dados`,
                    data: null
                });
            }
            const success = yield UserType_1.default.update(parseInt(request.params.type_id), request.body);
            if (!success) {
                return response.status(500).json({
                    message: `Operação não pode ser realizada`,
                    data: null
                });
            }
            return response.status(200).json({
                message: `Tipo de usuário ${type.email} atualizado com sucesso`,
                data: Helpers_1.default.first(success)
            });
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield UserType_1.default.destroy(parseInt(request.params.type_id));
            if (!type) {
                return response.status(404).json({
                    message: `Tipo de usuário não cadastrado na base de dados`,
                    data: null
                });
            }
            return response.json({
                message: `Tipo de usuário ${request.params.type_id} excluido por sucesso`,
                data: null
            });
        });
    }
    status(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const type = yield UserType_1.default.find(parseInt(request.params.type_id));
            let fields = {
                active: !type.active
            };
            const data = yield UserType_1.default.update(type.id, fields);
            return response.status(200).json({
                message: `Tipo de usuário ${type.active ? "destivado" : "ativado"} com sucesso.`,
                data: Helpers_1.default.first(data)
            });
        });
    }
}
exports.default = UserTypesController;
