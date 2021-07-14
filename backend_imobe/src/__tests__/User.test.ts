import "reflect-metadata";

import { getCustomRepository } from "typeorm";
import connection from "../database";

import { UserRepository } from "../repositories/UserRepository";

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

beforeEach(async () => {
  await connection.clear();
});

test("Should be able to create a new user", async () => {
  const userRepo = getCustomRepository(UserRepository);
  const user = userRepo.create({
    name: "test",
    phone: "6846542423",
    email: "test@example.com",
    password: "12345",
  });

  expect(user.name).toEqual("test");
});
