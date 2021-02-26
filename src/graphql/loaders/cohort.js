export const batchCohorts = async (keys, models) => {
  const cohorts = await models.Cohort.findAll({
    where: {
      id: keys
    }
  });

  return keys.map(key => cohorts.find(cohort => cohort.id === key));
};
