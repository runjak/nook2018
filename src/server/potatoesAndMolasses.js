module.exports.types = `
union PotatoeOrMolasses = Potatoe | Molasses

type Potatoe {
  size: Int!
}

type Molasses {
  size: Int!
  sweetness: Sweetness!
}

enum Sweetness {
  SWEET
  BITTER
}
`;

function coin() {
  return Boolean(Math.round(Math.random()));
}

function size() {
    return Math.floor(5 * Math.random());
}

function sweetness() {
  return coin() ? 'SWEET' : 'BITTER';
}

function potatoe() {
  return {
    __typename: 'Potatoe',
    size: size(),
  };
}

function molasses() {
  return {
    __typename: 'Molasses',
    sweetness: sweetness(),
    size: size(),
  };
}

function potatoesAndMolasses(count) {
  return Array(count).fill().map(() => (
    coin() ? potatoe() : molasses()
  ));
}

module.exports.potatoesAndMolasses = potatoesAndMolasses;

module.exports.resolvers = {
  PotatoeOrMolasses: {
    __resolveType(obj, context, info) {
      if (obj.__typename) {
        return obj.__typename;
      }

      return null;
    }
  },
};
