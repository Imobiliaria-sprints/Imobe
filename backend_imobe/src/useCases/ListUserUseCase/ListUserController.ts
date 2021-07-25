import { Request, Response } from "express";
import { ListUserUseCase } from "./ListUserUseCase";

class ListUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;

    const listUserUseCase = new ListUserUseCase();

    const users = await listUserUseCase.execute(user_id);

    return response.json(users);
  }
}

export default new ListUserController();
