import { EntityRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../dtos/ICreateUser";
import { User } from "../entities/User";
import { IUserRepository } from "./IUserRepository";

@EntityRepository(User)
class UserRepository extends Repository<User> implements IUserRepository {
  async createUser({
    name,
    phone,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = this.create({
      name,
      phone,
      email,
      password,
    });

    await this.save(user);

    return user;
  }
  async findOneUser(email: string): Promise<boolean> {
    const user = await this.findOne({ where: { email } });

    return !!user;
  }
}

export { UserRepository };
