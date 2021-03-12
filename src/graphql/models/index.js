import Sequelize, { DataTypes } from 'sequelize';
import programModel from './program';
import cohortModel from './cohort';
import topicModel from './topic';
import cohortTopicModel from './cohort-topic';
import cohortQuestionModel from './cohort-question';
import cohortAnswerModel from './cohort-answer';
import cohortAnswerInProgressModel from './cohort-answer-in-progress';
import userModel from './user';
import { setupAssociations } from './associations';

const { DATABASE, DATABASE_USER, DATABASE_PASSWORD, NODE_ENV, DATABASE_URL } = process.env;

let sequelize;

if (NODE_ENV === 'production') {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false
    }
});
} else {
  sequelize = new Sequelize(
    DATABASE,
    DATABASE_USER,
    DATABASE_PASSWORD,
    { dialect: 'postgres' }
  );
}

const models = {
  Program: programModel(sequelize, DataTypes),
  Cohort: cohortModel(sequelize, DataTypes),
  Topic: topicModel(sequelize, DataTypes),
  CohortTopic: cohortTopicModel(sequelize, DataTypes),
  CohortQuestion: cohortQuestionModel(sequelize, DataTypes),
  CohortAnswer: cohortAnswerModel(sequelize, DataTypes),
  CohortAnswerInProgress: cohortAnswerInProgressModel(sequelize, DataTypes),
  User: userModel(sequelize, DataTypes)
};

setupAssociations(models);

sequelize.sync({ alter: true });

export { sequelize };

export default models;