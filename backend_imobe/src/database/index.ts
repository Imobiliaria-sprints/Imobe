import { Connection, createConnection, getConnection } from "typeorm";

const connection = {
  async create(): Promise<void> {
    createConnection().then(() => console.log("Connection is running "));
  },

  async close(): Promise<void> {
    await getConnection().close();
  },

  async clear(): Promise<void> {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    await Promise.all(
      entities.map(async (entity) => {
        const repository = connection.getRepository(entity.name);
        await repository.query(`DELETE FROM ${entity.tableName}`);
      })
    );
  },
};

export default connection;
