require("dotenv");

const databases = {
  dev: "server_imobe_flex",
  production: "server_imobe_flex",
  test: "server_imobeflex_test",
};

module.exports = {
  type: process.env.TYPEORM_DATABASE,
  url: `${process.env.DATABASE_URL}${databases[process.env.NODE_ENV]}`,
  database: databases[process.env.NODE_ENV],
  logging: false,
  entities: [process.env.TYPEORM_ENTITY],
  migrations: [process.env.TYPEORM_MIGRATION],
  cli: {
    entitiesDir: "src/entities",
    migrationsDir: "src/database/migration",
  },
};
