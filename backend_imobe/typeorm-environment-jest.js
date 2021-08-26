const NodeEnvironment = require("jest-environment-node");
const { resolve } = require("path");
const { execSync } = require("child_process");
const { createConnection } = require("typeorm");

require("dotenv").config({
  path: resolve(__dirname, ".env.test"),
});

/**
 * @Lucas-Duarte-dev
 */
class CustomEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    this.connectionString = process.env.DATABASE_URL;
  }

  async setup() {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    const client = await createConnection({
      name: "test",
      type: process.env.TYPEORM_DATABASE,
      url: this.connectionString,
    });

    await client.runMigrations();
  }

  async teardown() {
    const client = await createConnection({
      type: process.env.TYPEORM_DATABASE,
      url: this.connectionString,
    });

    await client.query("DROP TABLE IF EXISTS ads");
    await client.query("DROP TABLE IF EXISTS migrations");
    await client.query("DROP TABLE IF EXISTS users");
    await client.query("DROP TABLE IF EXISTS address");

    await client.close();
  }
}

module.exports = CustomEnvironment;
