const cohortAnswerInProgress = (sequelize) => {
  const CohortAnswerInProgress = sequelize.define('cohort-answer-in-progress', {}, {
    freezeTableName: true
  });

  return CohortAnswerInProgress;
}

export default cohortAnswerInProgress;