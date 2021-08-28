import { CreateUserUseCase } from "@cases/CreateUserUseCase/CreateUserUseCase";
import { ReturnUserAuthenticatedUseCase } from "@cases/ReturnUserAuthenticatedUseCase/ReturnUserAuthenticatedUseCase";
import { UserRepositoryInMemory } from "@repos/in-memory/UserRepositoryInMemory";
import { IUserRepository } from "@repos/IUserRepository";

let userRepository: IUserRepository;
let createUserUseCase: CreateUserUseCase;
let returnUserAuthenticatedUseCase: ReturnUserAuthenticatedUseCase;

beforeAll(() => {
  userRepository = new UserRepositoryInMemory();
  returnUserAuthenticatedUseCase = new ReturnUserAuthenticatedUseCase(
    userRepository
  );
  createUserUseCase = new CreateUserUseCase(userRepository);
});

describe("Test find one user by email", () => {
  it("Should be able to find one user by email", async () => {
    const createUser = await createUserUseCase.execute(
      "Test Name",
      "1234564879",
      "test@example.com",
      "123456789test"
    );

    const findUser = await returnUserAuthenticatedUseCase.execute(
      createUser.id
    );

    expect(findUser.name).toEqual("Test Name");
    expect(findUser).toHaveProperty("id");
  });
});
