import { Request, Response } from "express";
import UserTypeInterface from "../interfaces/UserType";
import Helpers from "../managers/Helpers";
import UserType from "../models/UserType";

export default class UserTypesController {
  async index(request: Request, response: Response) {
    const types = !request.query
      ? await UserType.get()
      : await UserType.get(request.query);

    return response.json({
      message: `${types.length} tipos de usuários encontrados.`,
      data: types
    });
  }

  async show(request: Request, response: Response) {
    const type = await UserType.find(parseInt(request.params.type_id));

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
  }

  async store(request: Request, response: Response) {
    const { name, description } = request.body;

    const data: UserTypeInterface = {
      name,
      description
    };

    if (await UserType.exists({ name })) {
      return response.status(200).json({
        message: `Tipo de usuario ${name} já se encontra cadastrado.`,
        data: null
      });
    }

    const type = await UserType.store(data);

    if (!type) {
      return false;
    }

    return response.json({
      message: `Tipo de usuario criado com sucesso`,
      data: type
    });
  }

  async update(request: Request, response: Response) {
    const type = await UserType.find(parseInt(request.params.type_id));

    if (!type) {
      return response.status(404).json({
        message: `Tipo de usuário não cadastrado na base de dados`,
        data: null
      });
    }

    const success = await UserType.update(
      parseInt(request.params.type_id),
      request.body
    );

    if (!success) {
      return response.status(500).json({
        message: `Operação não pode ser realizada`,
        data: null
      });
    }

    return response.status(200).json({
      message: `Tipo de usuário ${type.email} atualizado com sucesso`,
      data: Helpers.first(success)
    });
  }

  async delete(request: Request, response: Response) {
    const type = await UserType.destroy(parseInt(request.params.type_id));

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
  }

  async status(request: Request, response: Response) {
    const type = await UserType.find(parseInt(request.params.type_id));

    let fields = {
      active: !type.active
    };

    const data = await UserType.update(type.id, fields);
    return response.status(200).json({
      message: `Tipo de usuário ${
        type.active ? "destivado" : "ativado"
      } com sucesso.`,
      data: Helpers.first(data)
    });
  }
}
