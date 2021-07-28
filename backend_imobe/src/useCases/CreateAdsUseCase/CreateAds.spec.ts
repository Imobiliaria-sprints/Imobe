import { AdsRepositoryInMemory } from "../../repositories/in-memory/AdsRepositoryInMemory";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../CreateUserUseCase/CreateUserUseCase";
import { CreateAdsUseCase } from "./CreateAdsUseCase";

describe("Create ads", () => {
  it("Should be able create a new ads", async () => {
    const adsRepositoryInMemory = new AdsRepositoryInMemory();
    const userRepositoryInMemory = new UserRepositoryInMemory();
    const createAdsUseCase = new CreateAdsUseCase(
      adsRepositoryInMemory,
      userRepositoryInMemory
    );

    const createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);

    const user = await createUserUseCase.execute(
      "Test create ads",
      "135215",
      "test@gmail.com",
      "12345"
    );
    console.log(user);
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
