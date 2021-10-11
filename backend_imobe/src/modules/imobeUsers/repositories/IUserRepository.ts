import { UpdateResult } from "typeorm";

import { User } from "@entity/User";

export interface IUserDTO {
  avatar?: string;
  name: string;
  phone: string;
  email: string;
  password: string;
  admin?: boolean;
  password_reset_token?: string;
}

export interface IUserRepository {
  createUser({
    name,
    phone,
    email,
    password,
    admin,
    avatar,
  }: IUserDTO): Promise<User>;
  findOneUserByEmail(email: string): Promise<User>;
  findOneUserById(id: string): Promise<User>;
  updatedPasswordToken(id: string, token: string): Promise<UpdateResult | User>;
  updatePassword(id: string, password: string): Promise<UpdateResult | User>;
  findAllUser(): Promise<User[]>;
}
