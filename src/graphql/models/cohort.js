import Sequelize from 'sequelize';
import SequelizeSlugify from 'sequelize-slugify';

const cohort = (sequelize, DataTypes) => {
  const Cohort = sequelize.define('cohort', {
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

  SequelizeSlugify.slugifyModel(Cohort, {
    source: ['title']
  });

  return Cohort;
}

export default cohort;