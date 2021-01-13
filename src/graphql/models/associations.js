const foreignKeyNonNull = {
  foreignKey: {
    allowNull: false
  }
};

export const setupAssociations = models => {
  models.Program.hasMany(models.Topic, foreignKeyNonNull);
  models.Program.hasMany(models.Cohort, foreignKeyNonNull);
  models.Program.belongsTo(models.User);

  models.Cohort.belongsTo(models.Program);

  models.Topic.belongsTo(models.User);
  models.Topic.belongsTo(models.Program);

  models.User.hasMany(models.Program, foreignKeyNonNull);
  models.User.hasMany(models.Topic, foreignKeyNonNull);
}