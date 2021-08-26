import { IAdsRepository } from "../../../../repositories/IAdsRepository";
import { AdsRepositoryInMemory } from "../../../../repositories/in-memory/AdsRepositoryInMemory";
import { UserRepositoryInMemory } from "../../../../repositories/in-memory/UserRepositoryInMemory";
import { IUserRepository } from "../../../../repositories/IUserRepository";
import { CreateUserUseCase } from "../../../.@cases/CreateUserUseCase/CreateUserUseCase";
import { CreateAdsUseCase } from "../../../.@cases/CreateAdsUseCase/CreateAdsUseCase";

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
});
