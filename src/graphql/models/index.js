import Sequelize, { DataTypes } from 'sequelize';
import programModel from './program';
import cohortModel from './cohort';
import topicModel from './topic';
import cohortTopicModel from './cohort-topic';
import cohortQuestionModel from './cohort-question';
import cohortQuestionUpvoteModel from './cohort-question-upvote';
import cohortAnswerModel from './cohort-answer';
import cohortAnswerUpvoteModel from './cohort-answer-upvote';
import cohortAnswerInProgressModel from './cohort-answer-in-progress';
import topicFAQModel from './topic-faq';
import resourceModel from './resource';
import userModel from './user';
import { setupAssociations } from './associations';
import Logger from 'lib/logger';

const {
  NODE_ENV,
  ENV_TYPE,
  DATABASE,
  DATABASE_USER,
  DATABASE_PASSWORD,
  PROD_POSTGRES_DATABASE,
  PROD_POSTGRES_USER,
  PROD_POSTGRES_PASSWORD,
  PROD_POSTGRES_HOST,
  PROD_POSTGRES_PORT
} = process.env;

let sequelize;

const poolSettings = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};

if (NODE_ENV === 'production') {
  if (ENV_TYPE === 'qovery') {
    sequelize = new Sequelize(
      PROD_POSTGRES_DATABASE,
      PROD_POSTGRES_USER,
      PROD_POSTGRES_PASSWORD,
      {
        host: PROD_POSTGRES_HOST,
        port: PROD_POSTGRES_PORT,
        dialect: 'postgres',
        protocol: 'postgres',
        pool: poolSettings,
        logging: msg => Logger.info(msg)
      }
    );
  } else {
    // Custom production config
    sequelize = new Sequelize(
      DATABASE,
      DATABASE_USER,
      DATABASE_PASSWORD,
      {
        dialect: 'postgres',
        pool: poolSettings,
        logging: msg => Logger.info(msg)
      }
    );
  }
} else {
  sequelize = new Sequelize(
    DATABASE,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
      dialect: 'postgres',
      pool: poolSettings,
      logging: msg => Logger.info(msg)
    }
  );
}

const models = {
  Program: programModel(sequelize, DataTypes),
  Cohort: cohortModel(sequelize, DataTypes),
  Topic: topicModel(sequelize, DataTypes),
  CohortTopic: cohortTopicModel(sequelize, DataTypes),
  CohortQuestion: cohortQuestionModel(sequelize, DataTypes),
  CohortQuestionUpvote: cohortQuestionUpvoteModel(sequelize, DataTypes),
  CohortAnswer: cohortAnswerModel(sequelize, DataTypes),
  CohortAnswerUpvote: cohortAnswerUpvoteModel(sequelize, DataTypes),
  CohortAnswerInProgress: cohortAnswerInProgressModel(sequelize, DataTypes),
  TopicFAQ: topicFAQModel(sequelize, DataTypes),
  Resource: resourceModel(sequelize, DataTypes),
  User: userModel(sequelize, DataTypes)
};

setupAssociations(models);

sequelize.sync({ alter: true });

export { sequelize };

export default models;