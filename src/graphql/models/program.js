import Sequelize from 'sequelize';
import SequelizeSlugify from 'sequelize-slugify';

const program = (sequelize, DataTypes) => {
  const Program = sequelize.define('program', {
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
    },
    isSelected: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  SequelizeSlugify.slugifyModel(Program, {
    source: ['title']
  });

  return Program;
}

export default program;