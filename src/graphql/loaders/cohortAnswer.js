export const batchCohortAnswers = async (keys, models) => {
  const cohortAnswers = await models.CohortAnswer.findAll({
    where: {
      id: keys
    }
  });

  return keys.map(key => cohortAnswers.find(cohortAnswer => cohortAnswer.id === key));
};
