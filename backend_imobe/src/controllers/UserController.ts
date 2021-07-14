import { Request, Response } from "express";
import { UserService } from "../service/UserService";

class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const userService = new UserService();

    const { name, phone, email, password } = request.body;
    try {
      const user = await userService.create(name, phone, email, password);

      return response.status(201).json({ user });
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

export default new UserController();
