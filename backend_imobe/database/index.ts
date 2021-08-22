import { createConnection, Connection } from "typeorm";

export default async (): Promise<Connection> => {
  console.log(
    `Create connection with database in mode ${process.env.NODE_ENV}`
  );
  return createConnection();
};
