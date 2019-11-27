exports.getDocsByPage = async (Model, query = {}, page = 1, limit = 20) => {
  if (typeof limit === 'string') {
    limit = Number(limit);
  }

  const skip = (page - 1) * limit;

  // const movies = await Movie.find({}, { $slice: [skip, limit] });
  const docs = await Model.find(query)
    .skip(skip)
    .limit(limit);

  return docs;
};
