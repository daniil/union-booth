const cohortAnswerInProgress = (sequelize, DataTypes) => {
  const CohortAnswerInProgress = sequelize.define('cohort-answer-in-progress', {
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    freezeTableName: true
  });

  return CohortAnswerInProgress;
}

export default cohortAnswerInProgress;