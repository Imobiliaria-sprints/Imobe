const dotenv = require("dotenv");

dotenv.config({
  path:
    process.env.NODE_ENV === "dev"
      ? ".env.dev"
      : process.env.NODE_ENV === "production"
      ? ".env.production"
      : ".env.test",
});

module.exports = {
  type: "postgres",
  database: process.env.TYPEORM_DATABASE,
  logging: false,
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  entities: [process.env.TYPEORM_MIGRATION],
  migrations: [process.env.TYPEORM_ENTITY],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: process.env.TYPEORM_MIGRATION_DIR,
  },
};
