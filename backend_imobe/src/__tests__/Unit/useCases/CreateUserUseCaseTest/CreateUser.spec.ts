import { UserRepositoryInMemory } from "../../../../repositories/in-memory/UserRepositoryInMemory";
import { IUserRepository } from "../../../../repositories/IUserRepository";
import { CreateUserUseCase } from "../../../.@cases/CreateUserUseCase/CreateUserUseCase";

describe("Create user", () => {
  let userRepository: IUserRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeAll(() => {
    userRepository = new UserRepositoryInMemory();

    createUserUseCase = new CreateUserUseCase(userRepository);
  });

  it("Should be able to a new user", async () => {
    const user = await createUserUseCase.execute(
      "Test Create User",
      "123456789",
      "test@example.com",
      "test"
    );

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("created_at");
    expect(user).toHaveProperty("updated_at");
  });

  it("Should not be able to create an existing user", async () => {
    await createUserUseCase.execute(
      "Test Existing User",
      "121313456789",
      "testexisting@example.com",
      "testexisting"
    );

    await expect(
      createUserUseCase.execute(
        "Test Existing User",
        "121313456789",
        "testexisting@example.com",
        "testexisting"
      )
    ).rejects.toEqual(new Error("User already exists!"));
  });
});
