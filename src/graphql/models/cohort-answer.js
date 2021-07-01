import Sequelize from 'sequelize';

const cohortAnswer = (sequelize, DataTypes) => {
  const CohortAnswer = sequelize.define('cohort-answer', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true
    },
    answer: {
      type: DataTypes.TEXT
    },
    isInactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return CohortAnswer;
}

export default cohortAnswer;