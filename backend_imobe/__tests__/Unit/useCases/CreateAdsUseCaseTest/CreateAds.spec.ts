import { IAnnouncementRepository } from "@modules/imobeAnnouncement/repositories/IAnnouncementRepository";
import { AnnouncementRepositoryInMemory } from "@modules/imobeAnnouncement/repositories/in-memory/AnnouncementRepositoryInMemory";
import { UserRepositoryInMemory } from "@modules/imobeUsers/repositories/in-memory/UserRepositoryInMemory";
import { IUserRepository } from "@modules/imobeUsers/repositories/IUserRepository";
import { CreateUserUseCase } from "@modules/imobeUsers/useCases/CreateUserUseCase/CreateUserUseCase";
import { CreateAnnouncementUseCase } from "@modules/imobeAnnouncement/useCases/CreateAnnouncementUseCase/CreateAnnouncementUseCase";

let announcementRepository: IAnnouncementRepository;
let userRepository: IUserRepository;
let createAnnouncementUseCase: CreateAnnouncementUseCase;
let createUserUseCase: CreateUserUseCase;

beforeAll(() => {
  announcementRepository = new AnnouncementRepositoryInMemory();
  userRepository = new UserRepositoryInMemory();
  createAnnouncementUseCase = new CreateAnnouncementUseCase(
    announcementRepository,
    userRepository
  );
  createUserUseCase = new CreateUserUseCase(userRepository);
});

describe("Create Announcement", () => {
  it("Should be able create a new Announcement", async () => {
    const user = await createUserUseCase.execute(
      "Test create Announcement",
      "135215",
      "test@gmail.com",
      "12345"
    );



    const announcement = await createAnnouncementUseCase.execute(
      "Casa de teste",
      "casa-de-teste",
      "5000.45",
      2,
      53,
      [],
      user.id
    );

    expect(announcement).toHaveProperty("id");
  });

  it("Should be not able to create a new Announcement with invalid user", async () => {
    await expect(
      createAnnouncementUseCase.execute(
          "Casa de teste",
          "casa-de-teste",
          "5000.45",
          2,
          53,
          [],
          "1d856sa4684test#54616445%"
      )
    ).rejects.toEqual(new Error("User not found"));
  });
});
