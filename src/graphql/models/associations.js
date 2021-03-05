const foreignKeyNonNull = {
  foreignKey: {
    allowNull: false
  }
};

export const setupAssociations = models => {
  models.Program.hasMany(models.Topic, foreignKeyNonNull);
  models.Program.hasMany(models.Cohort, foreignKeyNonNull);
  models.Program.hasMany(models.User, { foreignKey: 'selectedProgram', constraints: false });
  models.Program.belongsTo(models.User);

  models.Cohort.hasMany(models.CohortTopic, { onDelete: 'cascade', hooks: true });
  models.Cohort.hasMany(models.CohortQuestion, foreignKeyNonNull);
  models.Cohort.hasMany(models.User, { constraints: false });
  models.Cohort.belongsTo(models.User);
  models.Cohort.belongsTo(models.Program);
  models.Cohort.belongsToMany(models.Topic, { through: models.CohortTopic });

  models.Topic.hasMany(models.CohortTopic, foreignKeyNonNull);
  models.Topic.hasMany(models.CohortQuestion, foreignKeyNonNull);
  models.Topic.belongsTo(models.User);
  models.Topic.belongsTo(models.Program);
  models.Topic.belongsToMany(models.Cohort, { through: models.CohortTopic });

  models.CohortTopic.belongsTo(models.Cohort);
  models.CohortTopic.belongsTo(models.Topic);

  models.CohortQuestion.hasMany(models.CohortAnswer, foreignKeyNonNull);
  models.CohortQuestion.hasMany(models.CohortAnswerInProgress, foreignKeyNonNull);
  models.CohortQuestion.belongsTo(models.Cohort);
  models.CohortQuestion.belongsTo(models.Topic);
  models.CohortQuestion.belongsTo(models.User);
  models.CohortQuestion.belongsToMany(models.User, { through: models.CohortAnswerInProgress });

  models.CohortAnswer.belongsTo(models.CohortQuestion);
  models.CohortAnswer.belongsTo(models.User);

  models.CohortAnswerInProgress.belongsTo(models.User);
  models.CohortAnswerInProgress.belongsTo(models.CohortQuestion);
  
  models.User.hasMany(models.Program, foreignKeyNonNull);
  models.User.hasMany(models.Cohort, foreignKeyNonNull);
  models.User.hasMany(models.Topic, foreignKeyNonNull);
  models.User.hasMany(models.CohortQuestion, foreignKeyNonNull);
  models.User.hasMany(models.CohortAnswer, foreignKeyNonNull);
  models.User.hasMany(models.CohortAnswerInProgress, foreignKeyNonNull);
  models.User.belongsTo(models.Program, { foreignKey: 'selectedProgram', constraints: false });
  models.User.belongsTo(models.Cohort, { constraints: false });
  models.User.belongsToMany(models.CohortQuestion, { through: models.CohortAnswerInProgress });
}
