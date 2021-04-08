import Sequelize from 'sequelize';

const faq = (sequelize, DataTypes) => {
  const FAQ = sequelize.define('faq', {
    id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      unique: true
    },
    question: {
      type: DataTypes.TEXT
    },
    answer: {
      type: DataTypes.TEXT
    }
  });

  return FAQ;
}

export default faq;