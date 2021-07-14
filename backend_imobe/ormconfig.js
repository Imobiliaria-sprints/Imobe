const dotenv = require("dotenv");

dotenv.config({
  path: process.env.NODE_ENV === "dev" ? ".env.dev" : ".env.production",
});

module.exports = {
  type: process.env.TYPEORM_DATABASE,
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "server_imobe_flex",
  logging: false,
  entities: [process.env.TYPEORM_ENTITY],
  migrations: [process.env.TYPEORM_MIGRATION],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: process.env.TYPEORM_MIGRATION_DIR,
  },
};
