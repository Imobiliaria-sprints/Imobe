import { IAdsRepository } from "@repos/IAdsRepository";
import { AdsRepositoryInMemory } from "@repos/in-memory/AdsRepositoryInMemory";
import { UserRepositoryInMemory } from "@repos/in-memory/UserRepositoryInMemory";
import { IUserRepository } from "@repos/IUserRepository";
import { CreateUserUseCase } from "@cases/CreateUserUseCase/CreateUserUseCase";
import { CreateAdsUseCase } from "@cases/CreateAdsUseCase/CreateAdsUseCase";

let adsRepository: IAdsRepository;
let userRepository: IUserRepository;
let createAdsUseCase: CreateAdsUseCase;
let createUserUseCase: CreateUserUseCase;
beforeAll(() => {
  adsRepository = new AdsRepositoryInMemory();
  userRepository = new UserRepositoryInMemory();
  createAdsUseCase = new CreateAdsUseCase(adsRepository, userRepository);
  createUserUseCase = new CreateUserUseCase(userRepository);
});

describe("Create ads", () => {
  it("Should be able create a new ads", async () => {
    const user = await createUserUseCase.execute(
      "Test create ads",
      "135215",
      "test@gmail.com",
      "12345"
    );

    const ads = await createAdsUseCase.execute(
      "Casa de teste",
      5000.45,
      2,
      53,
      user.id
    );

    expect(ads).toHaveProperty("id");
  });

  it("Should be not able to create a new ads with invalid user", async () => {
    await expect(
      createAdsUseCase.execute(
        "Casa de teste",
        5000.45,
        2,
        53,
        "1d856sa4684test#54616445%"
      )
    ).rejects.toEqual(new Error("User not found"));
  });
});
