import { UpdateResult } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUser";
import { User } from "../entities/User";

export interface IUserRepository {
  createUser({ name, phone, email, password }: ICreateUserDTO): Promise<User>;
  findOneUserByEmail(email: string): Promise<User>;
  findOneUserById(id: string): Promise<User>;
  updatedPasswordToken(id: string, token: string): Promise<UpdateResult | User>;
  updatePassword(id: string, password: string): Promise<UpdateResult | User>;
}
