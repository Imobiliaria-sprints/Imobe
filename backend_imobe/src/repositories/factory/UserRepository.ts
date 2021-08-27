import { EntityRepository, Repository, UpdateResult } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUser";
import { User } from "@entity/User";
import { IUserRepository } from "../IUserRepository";

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
  async createUser({
    name,
    phone,
    avatar,
    email,
    password,
    password_reset_token,
  }: ICreateUserDTO): Promise<User> {
    const user = this.create({
      name,
      phone,
      avatar,
      email,
      password,
      password_reset_token,
    });

    await this.save(user);

    return user;
  }
  async findOneUserByEmail(email: string): Promise<User> {
    const user = await this.findOne({ where: { email } });

    return user;
  }
  async findOneUserById(id: string): Promise<User> {
    const user = await this.findOne({ where: { id } });

    return user;
  }

  async updatedPasswordToken(
    id: string,
    token: string
  ): Promise<UpdateResult | User> {
    const user = await this.update(id, {
      password_reset_token: token,
    });

    return user;
  }

  async updatePassword(
    id: string,
    password: string
  ): Promise<User | UpdateResult> {
    const user = this.update(id, { password });

    return user;
  }
}

export { UserRepository };
