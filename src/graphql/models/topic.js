import Sequelize from 'sequelize';

const topic = (sequelize, DataTypes) => {
  const Topic = sequelize.define('Topic', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  });

  return Topic;
}

export default topic;