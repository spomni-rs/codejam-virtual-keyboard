module.exports = {
  object: (duck) => typeof duck === 'object'
    && duck !== null,

  primitive: (duck) => typeof duck === 'number'
    || typeof duck === 'string'
    || typeof duck === 'boolean'
    || duck === undefined
    || duck === null,
};
