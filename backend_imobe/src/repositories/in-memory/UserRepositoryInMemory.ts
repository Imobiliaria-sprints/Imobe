import { User } from "../../entities/User";
import { v4 as uuid } from "uuid";
import { Repository } from "typeorm";
import { IUserRepository } from "../IUserRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUser";

class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async createUser(user: User): Promise<User> {
    Object.assign(user);

    this.users.push(user);

    return user;
  }

  async findOneUser(email: string): Promise<boolean> {
    const user = this.users.some((user) => user.email === email);

    return user;
  }
}

export { UserRepositoryInMemory };
