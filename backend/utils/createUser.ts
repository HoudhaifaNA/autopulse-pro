import readline from "node:readline";
import bcrypt from "bcrypt";

import db from "../database";

const createUser = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter username: ", (username: string) => {
    rl.question("Enter password: ", (password: string) => {
      const hashedPassword = bcrypt.hashSync(password, 12);

      const params = { username, password: hashedPassword };
      const createUserQuery = `INSERT INTO users
      (username, password)
      VALUES(@username, @password)
      `;
      db.prepare(createUserQuery).run(params);

      console.log("created user successfully");
      rl.close();
    });
  });
};

createUser();
