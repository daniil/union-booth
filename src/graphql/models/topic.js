import Sequelize from 'sequelize';

const topic = (sequelize, DataTypes) => {
  const Topic = sequelize.define('topic', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Topic;
}

export default topic;