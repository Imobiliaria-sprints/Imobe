import "reflect-metadata";

import request from "supertest";
import { app } from "../app";
import { Connection, createConnection } from "typeorm";
import { Server } from "http";

let connection: Connection;
let server: Server;

describe("App", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.query("DROP TABLE IF EXISTS ads");
    await connection.query("DROP TABLE IF EXISTS migrations");
    await connection.query("DROP TABLE IF EXISTS users");

    await connection.runMigrations();

    server = app.listen(3333);
  });

  beforeEach(async () => {
    await connection.query("DELETE FROM users");
    await connection.query("DELETE FROM ads");
  });

  afterAll(async () => {
    server && server.close();
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

    const user = await request(app).post("/users").send({
      name: "test1",
      phone: "12345678910",
      email: "olamundoo@test.com.br",
      password: "test1234",
    });

    expect(user.body).toEqual({ message: "User already exists!" });
  });

  it("Should be able to authenticated a user", async () => {
    await request(app).post("/users").send({
      name: "lucas",
      phone: "123456789",
      email: "test@test.com.br",
      password: "test1234",
    });

    const response = await request(app).post("/login").send({
      email: "test@test.com.br",
      password: "test1234",
    });

    expect(response.status).toBe(201);
  });
});
