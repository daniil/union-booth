import Sequelize, { DataTypes } from 'sequelize';
import topicModel from './topic';

let sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  Topic: topicModel(sequelize, DataTypes)
};

sequelize.sync();

export { sequelize };

export default models;