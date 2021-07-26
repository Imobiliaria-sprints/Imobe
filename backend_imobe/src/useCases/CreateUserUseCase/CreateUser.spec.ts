import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CrateUserUseCase } from "./CreateUserUseCase";
describe("Create user", () => {
  it("Should be able to a new user", () => {
    const userRepository = new UserRepositoryInMemory();

    const user = new CrateUserUseCase(userRepository);
  });
});
