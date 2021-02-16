import Sequelize from 'sequelize';

const cohortQuestion = (sequelize, DataTypes) => {
  const CohortQuestion = sequelize.define('cohort-question', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true
    },
    isAnonymous: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    question: {
      type: DataTypes.TEXT
    }
  });

  return CohortQuestion;
}

export default cohortQuestion;