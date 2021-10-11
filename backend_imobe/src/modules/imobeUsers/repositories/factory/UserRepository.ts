import { EntityRepository, Repository, UpdateResult } from "typeorm";
import { User } from "@entity/User";
import { IUserRepository } from "../IUserRepository";

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
  async createUser({
    name,
    phone,
    email,
    password,
    admin,
    avatar,
    password_reset_token,
  }: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
    const user = this.create({
      name,
      phone,
      avatar,
      email,
      password,
      admin,
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

  async findAllUser(): Promise<User[]> {
    const user = await this.find();

    return user;
  }
}

export { UserRepository };
