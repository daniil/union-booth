import Sequelize from 'sequelize';

const resource = (sequelize, DataTypes) => {
  const Resource = sequelize.define('resource', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true
    },
    url: {
      type: DataTypes.TEXT
    },
    title: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    isInactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Resource;
}

export default resource;