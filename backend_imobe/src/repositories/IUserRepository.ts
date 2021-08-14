import { ICreateUserDTO } from "../dtos/ICreateUser";
import { User } from "../entities/User";

export interface IUserRepository {
  createUser({ name, phone, email, password }: ICreateUserDTO): Promise<User>;
  findOneUserByEmail(email: string): Promise<boolean>;
  findOneUserById(id: string): Promise<User>;
}
