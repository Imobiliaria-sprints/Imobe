/**
 * @jest-environment ./typeorm-environment-jest
 */

import "reflect-metadata";

import request from "supertest";
import { app } from "../../app";

import { Server } from "http";

let server: Server;

describe("User", () => {
  beforeAll(async () => {
    server = app.listen(3000);
  });

  it("Should be able to create a new user", async () => {
    const response = await request(server)
      .post("/users")
      .field("name", "Test Name")
      .field("phone", "123456789")
      .field("email", "test@example01.com")
      .field("password", "test123456");

    console.log(response.body);

    expect(response.status).toBe(200);

    const user = await request(server).post("/users").send({
      name: "test1",
      phone: "12345678910",
      email: "olamundoo@test.com.br",
      password: "test1234312",
    });

    expect(user.body).toEqual({ message: "User already exists!" });
  });

  it("Should be able to authenticated a user", async () => {
    await request(server).post("/users").field({
      name: "lucas",
      phone: "123456789",
      email: "test@test.com.br",
      password: "test1234312",
    });

    const response = await request(server).post("/login").send({
      email: "test@test.com.br",
      password: "test1234312",
    });

    expect(response.status).toBe(200);
  });
});
