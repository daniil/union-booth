const foreignKeyNonNull = {
  foreignKey: {
    allowNull: false
  }
};

export const setupAssociations = models => {
  models.Program.hasMany(models.Topic, foreignKeyNonNull);
  models.Program.hasMany(models.Cohort, foreignKeyNonNull);
  models.Program.belongsTo(models.User);

  models.Cohort.hasMany(models.CohortTopic);
  models.Cohort.belongsTo(models.User);
  models.Cohort.belongsTo(models.Program);
  models.Cohort.belongsToMany(models.Topic, { through: models.CohortTopic });

  models.Topic.hasMany(models.CohortTopic);
  models.Topic.belongsTo(models.User);
  models.Topic.belongsTo(models.Program);
  models.Topic.belongsToMany(models.Cohort, { through: models.CohortTopic });

  models.CohortTopic.belongsTo(models.Cohort);
  models.CohortTopic.belongsTo(models.Topic);

  models.User.hasMany(models.Program, foreignKeyNonNull);
  models.User.hasMany(models.Cohort, foreignKeyNonNull);
  models.User.hasMany(models.Topic, foreignKeyNonNull);
}
