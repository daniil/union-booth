import Sequelize from 'sequelize';
import SequelizeSlugify from 'sequelize-slugify';

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
    slug: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  SequelizeSlugify.slugifyModel(Topic, {
    source: ['title']
  });

  return Topic;
}

export default topic;