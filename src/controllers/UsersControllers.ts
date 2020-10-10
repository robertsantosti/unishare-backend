import { Response, Request } from "express";
import bcrypt from "bcrypt";
import UserInterface from "../interfaces/User";
import User from "../models/User";
import Helpers from "../managers/Helpers";

export default class UsersController {
  async index(request: Request, response: Response) {
    const users = !request.query
      ? await User.get()
      : await User.get(request.query);

    return response.json({
      message: `${users.length} de usuários encontrados.`,
      data: users
    });
  }

  async show(request: Request, response: Response) {
    const user = await User.find(parseInt(request.params.user_id));

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
  }

  async store(request: Request, response: Response) {
    const {
      name,
      email,
      password,
      confirm_password,
      birthdate,
      type,
      avatar,
      phone,
      bio
    } = request.body;

    if (await User.exists({ email })) {
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

    const data: UserInterface = {
      name,
      email,
      password: bcrypt.hashSync(password, 10),
      birthdate,
      type,
      avatar,
      phone,
      bio
    };

    const user = await User.store(data);

    if (!user) {
      return false;
    }

    return response.json({
      message: `Usuário criado com sucesso`,
      data: user
    });
  }

  async update(request: Request, response: Response) {
    const user = User.find(parseInt(request.params.user_id));

    if (!user) {
      return response.status(404).json({
        message: `Usuário não cadastrado na base de dados`,
        data: null
      });
    }

    const success = await User.update(parseInt(request.params.user_id), request.body);

    if (!success) {
      return response.status(500).json({
        message: `Operação não pode ser realizada`,
        data: null
      });
    }

    return response.status(200).json({
      message: `Usuario atualizado com sucesso`,
      data: Helpers.first(success),
    });
  }

  async delete(request: Request, response: Response) {
    const user = await User.destroy(parseInt(request.params.user_id));

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
  }
}
