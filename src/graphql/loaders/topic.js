export const batchTopics = async (keys, models) => {
  const topics = await models.Topic.findAll({
    where: {
      id: keys
    }
  });

  return keys.map(key => topics.find(topic => topic.id === key));
};
