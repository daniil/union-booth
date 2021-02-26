export const batchCohortQuestions = async (keys, models) => {
  const cohortQuestions = await models.CohortQuestion.findAll({
    where: {
      id: keys
    }
  });

  return keys.map(key => cohortQuestions.find(cohortQuestion => cohortQuestion.id === key));
};
