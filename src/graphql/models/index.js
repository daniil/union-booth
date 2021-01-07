import Sequelize, { DataTypes } from 'sequelize';
import topicModel from './topic';
import userModel from './user';

let sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
  },
);

const models = {
  Topic: topicModel(sequelize, DataTypes),
  User: userModel(sequelize, DataTypes)
};

// TODO: Move associations to a separate file
models.User.hasMany(models.Topic, {
  foreignKey: {
    allowNull: false
  }
});
models.Topic.belongsTo(models.User);

sequelize.sync({ alter: true });

export { sequelize };

export default models;