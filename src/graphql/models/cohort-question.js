const cohortQuestion = (sequelize, DataTypes) => {
  const CohortQuestion = sequelize.define('cohort-question', {
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