import Sequelize, { DataTypes } from 'sequelize';
import programModel from './program';
import cohortModel from './cohort';
import topicModel from './topic';
import cohortTopicModel from './cohort-topic';
import cohortQuestionModel from './cohort-question';
import cohortAnswerModel from './cohort-answer';
import cohortAnswerInProgressModel from './cohort-answer-in-progress';
import topicFAQModel from './topic-faq';
import userModel from './user';
import { setupAssociations } from './associations';

const { DATABASE, DATABASE_USER, DATABASE_PASSWORD, NODE_ENV, QOVERY_DATABASE_UNION_BOOTH_CONNECTION_URI } = process.env;

let sequelize;

const poolSettings = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000
};

if (NODE_ENV === 'production') {
  sequelize = new Sequelize(QOVERY_DATABASE_UNION_BOOTH_CONNECTION_URI, {
    dialect: 'postgres',
    protocol: 'postgres',
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    pool: poolSettings
});
} else {
  sequelize = new Sequelize(
    DATABASE,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
      dialect: 'postgres',
      pool: poolSettings
    }
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
  TopicFAQ: topicFAQModel(sequelize, DataTypes),
  User: userModel(sequelize, DataTypes)
};

setupAssociations(models);

sequelize.sync({ alter: true });

export { sequelize };

export default models;