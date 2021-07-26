import { ICreateUserDTO } from "../dtos/ICreateUser";
import { User } from "../entities/User";

export interface IUserRepository {
  createUser({ name, phone, email, password }: ICreateUserDTO): Promise<User>;
  findOneUser(email: string): Promise<boolean>;
}
