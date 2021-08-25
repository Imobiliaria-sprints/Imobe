import { UpdateResult } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  private users: User[] = [];

  async createUser(user: User): Promise<User> {
    Object.assign(user, {
      id: uuid(),
      created_at: Date,
      updated_at: Date,
    });

    this.users.push(user);

    return user;
  }

  async findOneUserByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findOneUserById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async updatedPasswordToken(
    id: string,
    token: string
  ): Promise<User | UpdateResult> {
    const findUser = this.users.find((user) => user.id === id);

    const user = Object.assign(findUser, {
      password_reset_token: token,
    });

    return user;
  }

  async updatePassword(
    id: string,
    password: string
  ): Promise<User | UpdateResult> {
    const findUser = this.users.find((user) => user.id === id);
    const user = Object.assign(findUser, {
      password,
    });

    return user;
  }
}

export { UserRepositoryInMemory };
