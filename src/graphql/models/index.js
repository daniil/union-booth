import Sequelize, { DataTypes } from 'sequelize';
import programModel from './program';
import cohortModel from './cohort';
import topicModel from './topic';
import cohortTopicModel from './cohort-topic';
import cohortQuestionModel from './cohort-question';
import cohortAnswerModel from './cohort-answer';
import userModel from './user';
import { setupAssociations } from './associations';

const { DATABASE, DATABASE_USER, DATABASE_PASSWORD } = process.env;

let sequelize = new Sequelize(
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  { dialect: 'postgres' }
);

const models = {
  Program: programModel(sequelize, DataTypes),
  Cohort: cohortModel(sequelize, DataTypes),
  Topic: topicModel(sequelize, DataTypes),
  CohortTopic: cohortTopicModel(sequelize, DataTypes),
  CohortQuestion: cohortQuestionModel(sequelize, DataTypes),
  CohortAnswer: cohortAnswerModel(sequelize, DataTypes),
  User: userModel(sequelize, DataTypes)
};

setupAssociations(models);

sequelize.sync({ alter: true });

export { sequelize };

export default models;