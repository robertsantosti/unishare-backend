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
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../models/User"));
const Helpers_1 = __importDefault(require("../managers/Helpers"));
class UsersController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = !request.query
                ? yield User_1.default.get()
                : yield User_1.default.get(request.query);
            return response.json({
                message: `${users.length} de usuários encontrados.`,
                data: users
            });
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.find(parseInt(request.params.user_id));
            if (!user) {
                return response.json({
                    message: `Usuario #${request.params.user_id} não encontrado.`,
                    data: null
                });
            }
            return response.json({
                message: `Usuário ${user.email} encotrado com sucesso`,
                data: user
            });
        });
    }
    store(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, confirm_password, birthdate, type, avatar, phone, bio } = request.body;
            if (yield User_1.default.exists({ email })) {
                return response.status(200).json({
                    message: `Usuario ${email} já se encontra cadastrado.`,
                    data: null
                });
            }
            if (password !== confirm_password) {
                return response.status(400).json({
                    message: `Senhas não conferem`,
                    data: null
                });
            }
            const data = {
                name,
                email,
                password: bcrypt_1.default.hashSync(password, 10),
                birthdate,
                type,
                avatar,
                phone,
                bio
            };
            const user = yield User_1.default.store(data);
            if (!user) {
                return false;
            }
            return response.json({
                message: `Usuário criado com sucesso`,
                data: user
            });
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = User_1.default.find(parseInt(request.params.user_id));
            if (!user) {
                return response.status(404).json({
                    message: `Usuário não cadastrado na base de dados`,
                    data: null
                });
            }
            const success = yield User_1.default.update(parseInt(request.params.user_id), request.body);
            if (!success) {
                return response.status(500).json({
                    message: `Operação não pode ser realizada`,
                    data: null
                });
            }
            return response.status(200).json({
                message: `Usuario atualizado com sucesso`,
                data: Helpers_1.default.first(success),
            });
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.destroy(parseInt(request.params.user_id));
            if (!user) {
                return response.status(404).json({
                    message: `Usuário não cadastrado na base de dados`,
                    data: null
                });
            }
            return response.json({
                message: `Usuário ${request.params.user_id} excluido por sucesso`,
                data: null
            });
        });
    }
}
exports.default = UsersController;
