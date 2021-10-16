import { createConnection } from "typeorm";

createConnection().then(() => {
  console.log(
    `Create connection with database`
  );
});
