const cohortTopic = (sequelize, DataTypes) => {
  const CohortTopic = sequelize.define('cohort-topic', {
    isLive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    isUnlocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: false
  });

  return CohortTopic;
}

export default cohortTopic;