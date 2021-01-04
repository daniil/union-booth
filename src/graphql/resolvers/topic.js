export default {
  Query: {
    topics: async(_, __, { models }) => {
      const topics = await models.Topic.findAll();
      return topics;
    }
  }
}