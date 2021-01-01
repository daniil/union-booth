export default (users, question) => {
  const mapUserIdToEmail = userId => {
    return users.find(user => user.id === userId).email;
  }

  question.beingAnsweredByEmail = question.beingAnsweredBy.map(mapUserIdToEmail);
  question.answeredByEmail = question.answeredBy.map(mapUserIdToEmail);
}
