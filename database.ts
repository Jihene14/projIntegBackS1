import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  database: "rhmangement",
  dialect: "mysql",
  username: "root",
  password: "",
  port: 3306,
  models: [__dirname + "/models"],
});

export default sequelize;
