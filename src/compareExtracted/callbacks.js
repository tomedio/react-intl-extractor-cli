const callbacks = {
  equal: (id, messageObject, oldMessageObject) => null,
  changed: (id, messageObject, oldMessageObject) => null,
  added: (id, messageObject) => null,
  removed: (id, messageObject) => null,
};

const createCallbacks = (definedCallbacks = {}) => ({
  ...callbacks,
  ...definedCallbacks,
});

export { createCallbacks };
