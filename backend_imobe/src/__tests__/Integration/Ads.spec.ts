/**
 * @jest-environment ./typeorm-environment-jest
 */

import "reflect-metadata";

import request from "supertest";
import { app } from "../../app";

import { Server } from "http";

let server: Server;

describe("Ads", () => {
  beforeAll(async () => {
    server = app.listen(3000);
  });

  it("Should be able to create a new ads", async () => {
    await request(server).post("/users").send({
      name: "test1",
      phone: "12345678910",
      email: "olamundoo@test.com.br",
      password: "test12345",
    });
    const authenticatedUser = await request(server).post("/login").send({
      email: "olamundoo@test.com.br",
      password: "test12345",
    });
    const [, token] = Object.keys(authenticatedUser.body).map((key) => [
      key,
      authenticatedUser.body[key],
    ])[0];

    const response = await request(server)
      .post("/ads")
      .send({
        title: "House test for created ads",
        rooms: 3,
        price: 350000.0,
        square_meters: 57.2,
      })
      .set("Authorization", `bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
