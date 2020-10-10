import { Request, Response } from "express";
import RoomInterface from "../interfaces/Room";
import Helpers from "../managers/Helpers";
import Room from "../models/Room";

export default class RoomsController {
  async index(request: Request, response: Response) {
    const rooms = !request.query
      ? await Room.get()
      : await Room.get(request.query);

    return response.json({
      message: `${rooms.length} de quartos encontrados.`,
      data: rooms
    });
  }

  async show(request: Request, response: Response) {
    const room = await Room.find(parseInt(request.params.room_id));

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
  }

  async store(request: Request, response: Response) {
    const {
      title,
      city,
      location,
      value,
      description,
      pictures
    } = request.body;

    if (await Room.exists({ city, location })) {
      return response.status(200).json({
        message: `Quarto ${location + city} já se encontra cadastrado.`,
        data: null
      });
    }

    const data: RoomInterface = {
      title,
      city,
      location,
      value,
      description,
      pictures: pictures.toString(),
    };

    const room = await Room.store(data);

    if (!room) {
      return false;
    }

    return response.json({
      message: `Quarto criado com sucesso`,
      data: room
    });
  }

  async update(request: Request, response: Response) {
    const room = Room.find(parseInt(request.params.room_id));

    if (!room) {
      return response.status(404).json({
        message: `Quarto não cadastrado na base de dados`,
        data: null
      });
    }

    const success = await Room.update(parseInt(request.params.room_id), request.body);

    if (!success) {
      return response.status(500).json({
        message: `Operação não pode ser realizada`,
        data: null
      });
    }

    return response.status(200).json({
      message: `Quarto atualizado com sucesso`,
      data: Helpers.first(success)
    });
  }

  async delete(request: Request, response: Response) {
    const room = await Room.destroy(parseInt(request.params.room_id));

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
  }
}
