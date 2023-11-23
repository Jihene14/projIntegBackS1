import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'rhmangement',
  dialect: 'mysql',
  username: 'root',
  password: '',
  models: [__dirname + '/models'],
});

export default sequelize;
