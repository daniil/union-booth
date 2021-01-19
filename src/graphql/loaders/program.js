export const batchPrograms = async (keys, models) => {
  const programs = await models.Program.findAll({
    where: {
      id: keys
    }
  });

  return keys.map(key => programs.find(program => program.id === key));
};
