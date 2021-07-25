import { Connection, createConnection } from "typeorm";
import { Server } from "http";
import { app } from "../app";

let connection: Connection;
let server: Server;

describe("Create connection", () => {
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
});
