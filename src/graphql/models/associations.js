export const setupAssociations = models => {
  models.User.hasMany(models.Topic, {
    foreignKey: {
      allowNull: false
    }
  });
  models.Topic.belongsTo(models.User);
}