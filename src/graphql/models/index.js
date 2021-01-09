import Sequelize, { DataTypes } from 'sequelize';
import topicModel from './topic';
import userModel from './user';
import { setupAssociations } from './associations';

const { DATABASE, DATABASE_USER, DATABASE_PASSWORD } = process.env;

let sequelize = new Sequelize(
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  Topic: topicModel(sequelize, DataTypes),
  User: userModel(sequelize, DataTypes)
};

setupAssociations(models);

sequelize.sync({ alter: true });

export { sequelize };

export default models;