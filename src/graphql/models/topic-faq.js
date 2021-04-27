import Sequelize from 'sequelize';

const topicFAQ = (sequelize, DataTypes) => {
  const TopicFAQ = sequelize.define('topic-faq', {
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
    },
    isInactive: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return TopicFAQ;
}

export default topicFAQ;