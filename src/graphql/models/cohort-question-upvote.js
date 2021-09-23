const cohortQuestionUpvote = (sequelize) => {
  const CohortQuestionUpvote = sequelize.define('cohort-question-upvote');

  return CohortQuestionUpvote;
}

export default cohortQuestionUpvote;