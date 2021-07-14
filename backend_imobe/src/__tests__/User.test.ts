import "reflect-metadata";

import request from "supertest";
import { app } from "../app";
import { Connection, createConnection } from "typeorm";

let connection: Connection;

describe("App", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.query("DROP TABLE IF EXISTS users");
    await connection.query("DROP TABLE IF EXISTS migrations");

    await connection.runMigrations();
  });

  beforeEach(async () => {
    await connection.query("DELETE FROM users");
  });

  afterAll(async () => {
    await connection.close();
  });

  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      name: "test1",
      phone: "12345678910",
      email: "olamundoo@test.com.br",
      password: "test1234",
    });

    expect(response.status).toBe(201);
  });
});
