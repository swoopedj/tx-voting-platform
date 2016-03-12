const ModelMocker = require('./model-mocker');

const getCollections = (collectionSchema) => {
  const collections = {};
  Object.keys(collectionSchema).forEach(name => {
    collections[name] = new ModelMocker(collectionSchema[name]);
  });
  return collections;
};

const DbMocker = (collectionSchema) => {
  const collections = getCollections(collectionSchema);
  return (collection) => {
    if(collections[collection] === undefined) {
      throw new Error(`${collection} collection doesnt exist`);
    }
    return collections[collection];
  };
};


module.exports = DbMocker;
