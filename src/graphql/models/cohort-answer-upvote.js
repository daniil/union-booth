const cohortAnswerUpvote = (sequelize) => {
  const CohortAnswerUpvote = sequelize.define('cohort-answer-upvote');

  return CohortAnswerUpvote;
}

export default cohortAnswerUpvote;