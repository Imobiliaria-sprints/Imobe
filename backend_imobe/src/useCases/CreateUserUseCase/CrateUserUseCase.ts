import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";
import { getCustomRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUser";
import { User } from "../../entities/User";
import { UserRepository } from "../../repositories/UserRepository";

class CrateUserUseCase {
  private userRepository: Repository<User>;
  constructor() {
    this.userRepository = getCustomRepository(UserRepository);
  }

  async create(name: string, phone: string, email: string, password: string) {
    const userAlreadyExists = await this.userRepository.findOne({ email });

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      phone,
      email,
      password: passwordHash,
    });

    await this.userRepository.save(user);

    return classToPlain(user);
  }
}

export { CrateUserUseCase };
